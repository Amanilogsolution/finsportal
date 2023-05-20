import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';
import { getUserRolePermission } from '../../../api'

const TotalJVoucher = () => {
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
            name: 'Item Type',
            selector: 'item_type',
            sortable: true
        },

        {
            name: 'Unit',
            selector: 'item_unit',
            sortable: true
        },

        {
            name: 'Minor Code',
            selector: 'minor_code',
            sortable: true
        },
        {
            name: 'Chart of Account',
            selector: 'chart_of_account',
            sortable: true
        },
        {
            name: 'Tax Preference',
            selector: 'tax_preference',
            sortable: true
        },
        {
            name: 'GST Rate(in %)',
            selector: 'gst_rate',
            sortable: true
        },


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
                        <div className='d-flex justify-content-between pt-3 px-4 '>
                            <h3 className="px-5">Total Journal Voucher</h3>
                            <button type="button " id='addJvbtn' style={{ display: "none" }} onClick={() => { financialstatus === 'Lock' ? alert('You cannot Add in This Financial Year') : window.location.href = "./JVoucher" }} className="btn btn-primary mx-4">Add Journal Voucher</button>
                        </div>
                        <div className="container-fluid mt-2">
                            <div className="card mb-2 w-100">
                                <article className={`card-body py-0`}>
                                    <DataTableExtensions
                                        {...tableData}
                                    >
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
