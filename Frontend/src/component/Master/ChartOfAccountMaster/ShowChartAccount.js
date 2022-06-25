import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalChartOfAccount, ChartOfAccountStatus } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';



const columns = [
    {
        name: 'Account Type Code',
        selector: row => row.account_type_code,
        sortable: true
    },
    {
        name: 'Account Name Code',
        selector: row => row.account_name_code,
        sortable: true
    },
    {
        name: 'Account Sub Name',
        selector: row => row.account_sub_name,
        sortable: true
    },
    {
        name: 'Account Sub Name Code',
        selector: row => row.account_sub_name_code,
        sortable: true
    },
  
    {
        name: 'Status',
        sortable: true,
        selector: row => row.null,
        cell: (row) => [
            <div className='droplist'>
                <select onChange={async (e) => {
                    const org = localStorage.getItem("Organisation")
                    const status = e.target.value;
                    await ChartOfAccountStatus(org, status, row.sno)
                    window.location.href = 'ShowChartAccount'
                }
                }>
                    <option hidden selected={row.status}> {row.status}</option>
                    <option >Active</option>
                    <option >DeActive</option>
                </select>
            </div>
        ]
    },

    {
        name: "Actions",
        sortable: false,

        selector: row => row.null,
        cell: (row) => [

            <a title='View Document' href="EditChartAccount">
                <button className="editbtn btn-success "
                    onClick={() => localStorage.setItem('ChartAccountsno', `${row.sno}`)}
                >Edit</button> </a>

        ]
    }


]


function ShowChartAccount() {

    const [data, setData] = useState([])

    useEffect(async () => {
        const result = await TotalChartOfAccount(localStorage.getItem('Organisation'))
        setData(result)
        console.log(result)
    }, [])

    const tableData = {
        columns, data
    }

    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <Menu />
                <div>
                    <div className="content-wrapper">
                        {/* <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./InsertAccountType" }} className="btn btn-primary">Add Account Name</button> */}
                        <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>


                        <div className="container-fluid">
                            <br />

                            <h3 className="text-left ml-5">Chart Of Account</h3>
                            <br />
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <DataTableExtensions
                                                {...tableData}
                                            >
                                                <DataTable
                                                    noHeader
                                                    defaultSortField="id"
                                                    defaultSortAsc={false}
                                                    pagination
                                                    highlightOnHover
                                                />
                                            </DataTableExtensions>

                                        </article>

                                    </div>
                                    {/* card.// */}
                                </div>
                                {/* col.//*/}
                            </div>
                            {/* row.//*/}
                        </div>
                    </div>
                </div>
               
                <Footer />
            </div>
        </div>
    )
}

export default ShowChartAccount
