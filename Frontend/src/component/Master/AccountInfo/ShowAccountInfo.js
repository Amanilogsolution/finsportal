import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { AllAccountInfo } from '../../../api';


const columns = [
    {
        name: 'Account Info Name',
        selector: 'account_info_name',
        sortable: true
    },

    {
        name: 'Account Info Type',
        selector: 'account_info_type',
        sortable: true
    },

    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => [
        <div className='droplist'>
          <select onChange={async (e) => {
            const status = e.target.value;
            // await (row.sno, status)
            window.location.href = 'ShowCity'
          }
          }>
            <option selected disabled hidden> {row.status}</option>


            <option value='Active'>Active</option>
            <option value='DeActive' >DeActive</option>
          </select>
        </div>
      ]
    },

    {
        name: "Actions",
        sortable: false,

        selector: "null",
        cell: (row) => [

            <a title='View Document' href="">
                <button className="editbtn btn-success " >Edit</button></a>

        ]
    }


]
function ShowAccountInfo() {
    const [data, setData] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const result = await AllAccountInfo(localStorage.getItem("Organisation"));
            console.log(result)
            setData(result)
        }
        fetch();


    }, [])

    const tableData = {
        columns, data
    }
    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    <Menu />
                    <div>
                        <div className="content-wrapper">
                            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className="btn btn-primary">Add Account Info</button>

                            <div className="container-fluid">
                                <br />

                                <h3 className="text-left ml-5">Account Info</h3>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    )
}

export default ShowAccountInfo;