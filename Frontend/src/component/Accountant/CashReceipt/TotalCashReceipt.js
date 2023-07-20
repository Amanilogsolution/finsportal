import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { getUserRolePermission } from '../../../api'
import LoadingPage from '../../loadingPage/loadingPage';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const TotalCashReceipt = () => {
    const [financialstatus, setFinancialstatus] = useState('Lock');
    const [loading, setLoading] = useState(false);
    const [userRightsData, setUserRightsData] = useState([]);
    const [data, setData] = useState([])

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

        const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'bank_recp')
        setUserRightsData(UserRights)

        if (UserRights.bank_recp_create === 'true') {
            document.getElementById('addcashRecepbtn').style.display = "block";
            if (financstatus === 'Lock') {
                document.getElementById('addcashRecepbtn').style.background = '#7795fa';
            }
        }
    }
    const columns = []

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
                            <h3 className="px-5">Total Cash (Receipt)</h3>
                            <button type="button " style={{ display: "none" }} id='addcashRecepbtn' onClick={() => { financialstatus === 'Lock' ? alert('You cannot Add in This Financial Year') : window.location.href = "./AddCashReceipt" }} className="btn btn-primary mx-4">Add Cash Receipt</button>
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

export default TotalCashReceipt;