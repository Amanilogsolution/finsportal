import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';
import { getUserRolePermission,TotalJV,UpdateJVStatus } from '../../../api'

const TotalJVoucher = () => {
    const [loading, setLoading] = useState(false)
    const [userRightsData, setUserRightsData] = useState([]);
    const [financialstatus, setFinancialstatus] = useState('Lock')
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')

            const totalresult = await TotalJV(org)
            setData(totalresult)
            setLoading(true)
            fetchRoles();
        }

        fetchdata();
    }, [])

    const fetchRoles = async () => {
        const org = localStorage.getItem('Organisation')

        const financstatus = localStorage.getItem('financialstatus')
        setFinancialstatus(financstatus);

        if (financstatus === 'Lock') {
            document.getElementById('addJvbtn').style.background = '#7795fa';
        }

        const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'journal_voucher')
        console.log(UserRights)
        setUserRightsData(UserRights)
        localStorage["RolesDetais"] = JSON.stringify(UserRights)

        if (UserRights.journal_voucher_create === 'true') {
            document.getElementById('addJvbtn').style.display = "block";
        }
    }

    const columns = [
        {
            name: 'JV NUMBER',
            selector: 'jv_no',
            sortable: true,
            cell: (row) =>{
                if(financialstatus === 'Lock'){
                    return <p title="Edit JV is lock">{row.jv_no}</p>
                }
                else{
                    if(!userRightsData){
                        fetchRoles() 
                    }
                    if(userRightsData.journal_voucher_edit === 'true'){
                        return (
                            <a title="Edit JV" className='pb-1' href="EditJVoucher" onClick={() => localStorage.setItem('jvNo', row.jv_no)}
                            style={{ borderBottom: '3px solid blue' }}>{row.jv_no}</a>
                        )
                    } else{
                        return <p title="do not have Access">{row.jv_no}</p>
                    }
                }
            }
        },

        {
            name: 'JV Date',
            selector: 'Jv_date',
            sortable: true
        },
        {
            name: 'Remark',
            selector: 'narration',
            sortable: true
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            cell:(row) => {
                if(localStorage.getItem('financialstatus') === 'Lock'){
                    return <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled />
                }
                else{
                    if (!userRightsData) {
                        fetchRoles()
                      }
                      if(userRightsData.journal_voucher_delete === 'true'){
                        return (
                            <input title={row.status} type="checkbox" className='cursor-pointer' id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} 
                            onChange={async () => {
                              const result = await UpdateJVStatus(localStorage.getItem('Organisation'),row.status === 'Active' ? 'Deactive' : 'Active',row.jv_no )
                              if (result === 'done') { window.location.href = "./TotalJVoucher" }
                            }} 

                            />
                          );
                      }
                      else {
                        return <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled />
                      }
                }
            }
        }
      


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
                            <h3 className="px-5">Total Journal Voucher</h3>
                            <button type="button " id='addJvbtn' style={{ display: "none" }} onClick={() => { financialstatus === 'Lock' ? alert('You cannot Add in This Financial Year') : window.location.href = "./JVoucher" }} className="btn btn-primary mx-4">Add Journal Voucher</button>
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

export default TotalJVoucher;
