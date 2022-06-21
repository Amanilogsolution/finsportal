import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { PendingCompliances } from '../../../api'



const columns = [
    {
        name: 'compliance_type',
        selector: 'compliance_type',
        sortable: true
    },
    {
        name: 'period',
        selector: 'period',
        sortable: true
    },
    {
        name: 'remark',
        selector: 'remark',
        sortable: true,
        cell: (row) => [

            <textarea type="text" value={row.remark} id="remarkdata"/>

        ]

    },

    {
        name: 'due_date',
        selector: 'due_date',
        sortable: true,
        cell: (row) => [

            <input type="date" value={row.due_date} />
        ]
    },
    {
        name: "Actions",
        sortable: false,
        selector: "null",
        cell: (row) => [

            <a title='View Document' href="#">
                <button className="editbtn btn-success " onClick={()=>{
                    const valueremark= document.getElementById("remarkdata");
                    console.log(valueremark)
                }}>Update</button>
                <button className="editbtn btn-primary ml-3" onClick={() => localStorage.setItem('Pendingcompsno', `${row.sno}`)} data-toggle="modal" data-target="#exampleModal">Upload document</button>
            </a>

        ]
    }
]


function PandingCompliances() {
    const [data, setData] = useState([]);
    const [dataremark, setDataremark] = useState();

    const updatedata=(sno)=>{
           console.log(sno)
    }

    useEffect(() => {
        const fetchdata = async () => {
            const result = await PendingCompliances(localStorage.getItem("Organisation"));
            console.log(result)
            setData(result);
        }
        fetchdata();
    }, [])

    const tableData = {
        columns, data
    };

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
                            <div className="container-fluid">
                                <br />
                                <h3 className="text-left ml-5">Pending Compliances</h3>
                                <br />
                                <div className="row ">
                                    <div className="col ml-5">
                                        <div className="card" style={{ width: "100%" }}>
                                            {
                                                data.map((item) => {
                                                    console.log(item.compliance_type)
                                                })
                                            }
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
                    {/* ------------------ Modal start -----------------------------*/}\
                    {/* <Modal excel={Excelfile} importdatas={setImportdata} /> */}
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Upload document for Pending Compliance
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <div className=" ">
                                        <label
                                            htmlFor="user_name"
                                            className=" col-form-label font-weight-normal"
                                        >
                                            <span >Select the file</span>
                                        </label>
                                        <div className=" ">
                                            <input
                                                id="filedoc"
                                                type="file"
                                                className="form-control "
                                            />
                                        </div><br />

                                    </div>
                                    <div className=" ">
                                        <label
                                            htmlFor="user_name"
                                            className=" col-form-label font-weight-normal"
                                        >
                                            <span>Remark:-</span>
                                        </label>
                                        <div className=" ">
                                            <textarea
                                                id="remark"
                                                className="form-control "
                                            />
                                        </div><br />

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="button"
                                        className="btn btn-primary"
                                        data-dismiss="modal"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------ Modal end -----------------------------*/}

                </div>
            </div>
        </>
    )
}

export default PandingCompliances;