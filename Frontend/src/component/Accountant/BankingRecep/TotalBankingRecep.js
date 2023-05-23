import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';
import { getUserRolePermission } from '../../../api'

const TotalBankingReceipt = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [userRightsData, setUserRightsData] = useState([]);
    const [financialstatus, setFinancialstatus] = useState('Lock')


    useEffect(() => {
        const fetchdata = async () => {

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

        // const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'journal_voucher')
        // setUserRightsData(UserRights)
        // localStorage["RolesDetais"] = JSON.stringify(UserRights)

        // if (UserRights.journal_voucher_create === 'true') {
        //     document.getElementById('addJvbtn').style.display = "block";
        // }
    }

    const columns = [ ]

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
                            <h3 className="px-5">Total Banking (Receipts)</h3>
                            <button type="button " id='addbankingrecebtn'  onClick={() => { financialstatus === 'Lock' ? alert('You cannot Add in This Financial Year') : window.location.href = "./AddBankingReceipt" }} className="btn btn-primary mx-4">Add Banking Receipts</button>
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

export default TotalBankingReceipt;
