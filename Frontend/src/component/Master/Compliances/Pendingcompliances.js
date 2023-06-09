import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { PendingCompliances, UpdatePendingCompliances, UploadData } from '../../../api'




function PandingCompliances() {
    const [data, setData] = useState([]);
    const [remark, setRemark] = useState('')
    const [date, setDate] = useState()
    const [file, setFile] = useState()
    const [sno, setSno] = useState()


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
            name: 'Document Uploaded',
            selector: 'document_status',
            sortable: true,
            cell: (row) => [
                <input type="checkbox" checked={(row.document_status === 'true') ? true : false} />,
            ]
        },
        {
            name: 'remark',
            selector: 'remark',
            sortable: true,
            // cell: (row) => [
            //     <textarea type="text" value={row.remark} id="remarkdata" />
            // ]
        },

        {
            name: 'due_date',
            selector: 'due_date',
            sortable: true,
            // cell: (row) => [
            //     <input type="date" value={row.due_date} id="due_date" defaultValue
            //     onChange={(e)=>{setDate(e.target.value)}}
            //     />
            // ]
        },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => [

                // <a title='View Document' href="#">
                //     <button className="editbtn btn-success " onClick={async() => {
                //         const valueremark = document.getElementById("remarkdata").value
                //         const result = await UpdatePendingCompliances(date,localStorage.getItem('Organisation'),valueremark,row.sno)
                //         console.log(result)
                //         if(result){
                //             window.location.reload();
                //         }
                //     }}>Update</button>
                // </a>,
                <button className="editbtn btn-primary ml-3 p-1 rounded border-0" onClick={() => {
                    if (row.remark == null) {
                        setRemark('')
                        setDate(row.due_date)
                        setSno(row.sno)

                    } else {
                        setRemark(row.remark)
                        setDate(row.due_date)
                        setSno(row.sno)

                    }
                }} data-toggle="modal" data-target="#exampleModal">Upload document</button>
            ]
        }
    ]

    const handleClickUpload = async (e) => {
        e.preventDefault()
        const Remark = document.getElementById('Remarkes').value
        const NewDate = document.getElementById('NewDate').value
        const data = new FormData();
        data.append("images", file)
        const UploadLink = await UploadData(data)
        if (UploadLink) {
            const result = await UpdatePendingCompliances(date, localStorage.getItem('Organisation'), remark, sno, UploadLink)
            if (result) {
                window.location.reload()
            }
        }
    }

    const handleChangeRemark = (e) => {
        setRemark(e.target.value)
    }
    const handleChangeDate = (e) => {
        setDate(e.target.value)

    }

    useEffect(() => {
        const fetchdata = async () => {
            const result = await PendingCompliances(localStorage.getItem("Organisation"));
            setData(result);
        }
        fetchdata();
    }, [])

    const tableData = {
        columns, data
    };

    return (
        <>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div className="content-wrapper">
                    <h3 className=" ml-5 py-3">Pending Compliances</h3>
                    <div className="container-fluid">
                        <div className="card w-100">
                            <article className="card-body py-0">
                                <DataTableExtensions
                                    {...tableData}>
                                    <DataTable
                                        noHeader
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        dense
                                        highlightOnHover
                                    />
                                </DataTableExtensions>
                            </article>
                        </div>
                    </div>
                </div>
                <Footer />
                {/* ------------------ Modal start -----------------------------*/}
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
                                    <label htmlFor="user_name" className=" col-form-label font-weight-normal" >
                                        <span >Select the file</span>
                                    </label>
                                    <div className=" ">
                                        <input id="filedoc" type="file" className="form-control" onChange={event => {
                                            const document = event.target.files[0];
                                            setFile(document)
                                        }} />
                                    </div><br />
                                </div>
                                <div className=" ">
                                    <label htmlFor="user_name" className=" col-form-label font-weight-normal">
                                        <span>Remark:-</span>
                                    </label>
                                    <div className=" ">
                                        <textarea id="Remarkes" className="form-control" value={remark} onChange={handleChangeRemark} />
                                    </div>
                                    <br />
                                </div>
                                <div className=" ">
                                    <label htmlFor="user_name" className=" col-form-label font-weight-normal">
                                        <span>Date:-</span>
                                    </label>
                                    <div className=" ">
                                        <input id="NewDate" className="form-control " type="date" value={date} onChange={handleChangeDate} />
                                    </div>

                                    <br />

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
                                    onClick={handleClickUpload}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------ Modal end -----------------------------*/}

            </div>
        </>
    )
}

export default PandingCompliances;