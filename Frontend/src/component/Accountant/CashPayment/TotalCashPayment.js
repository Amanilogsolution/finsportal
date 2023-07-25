import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { getUserRolePermission, AllCashPayment } from '../../../api'
import LoadingPage from '../../loadingPage/loadingPage';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const TotalCashPayment = () => {
    const [financialstatus, setFinancialstatus] = useState('Lock');
    const [loading, setLoading] = useState(false);
    const [userRightsData, setUserRightsData] = useState([]);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const cashAllData = await AllCashPayment(localStorage.getItem('Organisation'))
            setData(cashAllData.result)
            setLoading(true)
            fetchRoles();
        }

        fetchdata();
    }, [])

    const fetchRoles = async () => {
        const org = localStorage.getItem('Organisation')

        const financstatus = localStorage.getItem('financialstatus')
        setFinancialstatus(financstatus);

        const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'cash_payt')
        setUserRightsData(UserRights)

        if (UserRights.cash_payt_create === 'true') {
            document.getElementById('addcashPaybtn').style.display = "block";
            if (financstatus === 'Lock') {
                document.getElementById('addcashPaybtn').style.background = '#7795fa';
            }
        }
    }
    const columns = [
        {
            name: 'Cash Payment Id',
            selector: 'cash_payment_id',
            sortable: true,
            cell: (row) => {
                if (financialstatus === 'Lock') {
                    return <p title="Edit Cash Payment is lock">{row.cash_payment_id}</p>
                }
                else {
                    if (!userRightsData) {
                        fetchRoles()
                    }
                    if (userRightsData.cash_payt_edit === 'true') {
                        return (
                            <a title="Edit Cash Payment" className='pb-1' href="EditJVoucher" onClick={() => localStorage.setItem('cashPayId', row.cash_payment_id)}
                                style={{ borderBottom: '3px solid blue' }}>{row.cash_payment_id}</a>
                        )
                    } else {
                        return <p title="do not have Access">{row.cash_payment_id}</p>
                    }
                }
            }
        },

        {
            name: 'Cash Payment Date',
            selector: 'cash_paymentDate',
            sortable: true
        },
        {
            name: 'Remark',
            selector: 'remarks',
            sortable: true
        },
        // {
        //     name: 'Status',
        //     selector: 'status',
        //     sortable: true,
        //     cell:(row) => {
        //         if(localStorage.getItem('financialstatus') === 'Lock'){
        //             return <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled />
        //         }
        //         else{
        //             if (!userRightsData) {
        //                 fetchRoles()
        //               }
        //               if(userRightsData.journal_voucher_delete === 'true'){
        //                 return (
        //                     <input title={row.status} type="checkbox" className='cursor-pointer' id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} 
        //                     onChange={async () => {
        //                       const result = await UpdateJVStatus(localStorage.getItem('Organisation'),row.status === 'Active' ? 'Deactive' : 'Active',row.jv_no )
        //                       if (result === 'done') { window.location.href = "./TotalJVoucher" }
        //                     }} 

        //                     />
        //                   );
        //               }
        //               else {
        //                 return <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled />
        //               }
        //         }
        //     }
        // }
    ]

    const tableData = {
        columns, data
    }
    return (
        <div className="wrapper">
            <Header />
            {
                loading ?
                    <div className="content-wrapper">
                        <div className='d-flex justify-content-between pt-3 px-4'>
                            <h3 className="px-5">Total Cash (Payment)</h3>
                            <button type="button " style={{ display: "none" }} id='addcashPaybtn' onClick={() => { financialstatus === 'Lock' ? alert('You cannot Add in This Financial Year') : window.location.href = "./AddCashPayment" }} className="btn btn-primary mx-4">Add Cash Payment</button>
                        </div>
                        <div className="container-fluid mt-2">
                            <div className="card mb-2 w-100">
                                <article className='card-body py-0'>
                                    <DataTableExtensions
                                        {...tableData}>
                                        <DataTable
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            dense
                                            customStyles={customStyles}
                                        />
                                    </DataTableExtensions>
                                </article>
                            </div>
                        </div>
                    </div>
                    : <LoadingPage />
            }
            <Footer />
        </div>
    )
}

export default TotalCashPayment;