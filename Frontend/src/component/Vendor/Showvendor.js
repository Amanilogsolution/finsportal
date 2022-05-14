import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { ShowVendor, DeleteVendor,ImportVendor } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../excelformate/tbl_currency.xlsx';
import * as XLSX from "xlsx";


const columns = [
    {
        name: 'Name',
        selector: 'vend_name',
        sortable: true
    },
    {
        name: 'Company Name',
        selector: 'company_name',
        sortable: true
    },
    {
        name: 'Email',
        selector: 'vend_email',
        sortable: true
    },
    {
        name: 'Work Phone',
        selector: 'vend_work_phone',
        sortable: true
    },
    {
        name: 'Source of Supply',
        selector: 'source_of_supply',
        sortable: true
    },

    {
        name: 'Status',
        selector: 'null',
        cell: (row) => [

            <div className='droplist'>
                <select onChange={async (e) => {
                    const status = e.target.value;
                    await DeleteVendor(row.sno, status)
                    window.location.href = 'ShowVendor'
                }
                }>
                    <option selected disabled hidden> {row.status}</option>


                    <option value='Active'>Active</option>
                    <option value='DeActive' >DeActive</option>
                </select>
            </div>
        ]
    },
    //   {
    //     name:'Active',
    //     selector: 'null',
    //     cell: (row) => [
    //         <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
    //           {
    //             if(row.status == 'Active'){
    //               const checkvalue ='Deactive'
    //               await DeleteVendor(row.sno,checkvalue)
    //                   window.location.href='ShowVendor'

    //             }
    //             else{
    //               const checkvalue ='Active'
    //               await DeleteVendor(row.sno,checkvalue)
    //                   window.location.href='ShowVendor'
    //             }
    //            }} />
    //     ]
    //   },

    {
        name: "Actions",
        sortable: false,

        selector: "null",
        cell: (row) => [

            <a title='View Document' href="Editvendor">
                <button className="editbtn btn-success " onClick={() => localStorage.setItem('VendorSno', `${row.sno}`)} >Edit</button></a>

        ]
    }
]






const Showvendor = () => {
    const [data, setData] = useState([])
    const [importdata, setImportdata] = useState([]);
    let [errorno, setErrorno] = useState(0);
    const [duplicateData, setDuplicateDate] = useState([])
    const [backenddata, setBackenddata] = useState(false);


    //##########################  Upload data start  #################################

    const uploaddata = async () => {
        document.getElementById("uploadbtn").disabled = true;
        importdata.map((d) => {
            if (!d.vend_name || !d.vend_email || !d.vend_phone || !d.gst_treatment || !d.pan_no || !d.currency) {
                setErrorno(errorno++);
            }
        })

        if (errorno > 0) {
            alert("Please! fill the mandatory data");
            document.getElementById("showdataModal").style.display = "none";
            window.location.reload()
        }
        else {
              const result = await ImportVendor(importdata);
            console.log("result.length",result)
            if (!(result == "Data Added")) {
                setBackenddata(true);
                console.log("backenddata",backenddata)
                setDuplicateDate(result)
                console.log("duplicatedata",duplicateData)
            }
            else if (result == "Data Added") {
                setBackenddata(false);
                document.getElementById("showdataModal").style.display = "none";
                alert("Data Added")
                window.location.href = 'Showvendor'
            }
        }

    };
    //##########################   Upload data end  #################################

    //##########################  for convert array to json start  #################################

    const handleClick = () => {
        const array = JSON.stringify(importdata)
        const datas = JSON.parse(array)
        // console.log(datas)
        setImportdata(datas);

    };
    //##########################  for convert array to json end  #################################

    //##########################  for convert excel to array start  #################################
    const onChange = (e) => {
        
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            var lines = data.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            for (var i = 1; i < lines.length - 1; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            setImportdata(result);
        };
        reader.readAsBinaryString(file);
    };
    //##########################  for convert excel to array end #################################


    useEffect(async () => {
        const result = await ShowVendor()
        setData(result)
    }, [])

    const tableData = {
        columns, data
    };
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
                        <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./Vendor" }} className="btn btn-primary">Add Vendor</button>
                        <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '2%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
                        <div className="container-fluid">
                            <br />
                            <h3 className="text-left ml-5">Vendor</h3>
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

                {/* ------------------ Modal start -----------------------------*/}\
                {/* <Modal excel={Excelfile} importdatas={setImportdata} /> */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Import excel file
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
                                        className=" col-form-label font-weight-normal">
                                        <span >Select the file</span>
                                    </label>
                                    <div className=" ">
                                        <input
                                            id=""
                                            type="file"
                                            onChange={onChange}
                                            className="form-control "
                                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                                    </div><br />
                                    <span style={{ color: "red" }}>
                                        <a href={Excelfile} download> Download formate</a>
                                    </span><br />
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
                                <button type="button" onClick={handleClick} className="btn btn-primary"
                                    data-dismiss="modal"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------ Modal end -----------------------------*/}
                {/* ------------------ Data show Modal start -----------------------------*/}
                <div class="modal fade bd-example-modal-lg "
                    id="showdataModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                >
                    <div class="" style={{ height: "550px", width: "95%", overflow: "auto", margin: "auto" }}>
                        <div class="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel" style={{ color: "red" }}>
                                    Uploaded Excel file
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true" style={{ color: "red" }}
                                        onClick={() => {
                                            document.getElementById("showdataModal").style.display = "none";
                                            window.location.reload()
                                        }}>
                                        &times;</span>
                                </button>
                            </div>
                            {/* <div className="modal-body"> */}
                            <div className="" style={{ margin: "0px 8px", paddingBottom: "20px", overflow: "auto" }}>
                                {

                                    backenddata ?
                                        <>
                                            <h5 style={{margin:"auto"}}>This data already exist</h5>
                                            <table style={{ color: "red",margin:"auto" }}>
                                                <thead>
                                                <tr>
                                                    <th style={{ border: "1px solid black" }}>vend_email</th>
                                                    <th style={{ border: "1px solid black" }}>vend_phone</th>
                                                    <th style={{ border: "1px solid black" }}>gstin_uin</th>
                                                    <th style={{ border: "1px solid black" }}>pan_no</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        duplicateData.map((d) => (

                                                            <tr style={{ border: "1px solid black" }}>
                                                                <td style={{ border: "1px solid black" }}>{d.vend_email}</td>
                                                                <td style={{ border: "1px solid black" }}>{d.vend_phone}</td>
                                                                <td style={{ border: "1px solid black" }}>{d.gstin_uin}</td>
                                                                <td style={{ border: "1px solid black" }}>{d.pan_no}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                                <tfoot></tfoot>
                                                <br /><br />
                                            </table>
                                        </>
                                        : null
                                }
                                <table >
                                    <thead>
                                        <th style={{ border: "1px solid black" }}>mast_id</th>
                                        <th style={{ border: "1px solid black" }}>vend_id</th>
                                        <th style={{ border: "1px solid black" }}>vend_name</th>
                                        <th style={{ border: "1px solid black" }}>company_name</th>
                                        <th style={{ border: "1px solid black" }}>vend_display_name</th>
                                        <th style={{ border: "1px solid black" }}>vend_email</th>
                                        <th style={{ border: "1px solid black" }}>vend_work_phone</th>
                                        <th style={{ border: "1px solid black" }}>vend_phone</th>
                                        <th style={{ border: "1px solid black" }}>skype_detail</th>
                                        <th style={{ border: "1px solid black" }}>designation</th>
                                        <th style={{ border: "1px solid black" }}>department</th>
                                        <th style={{ border: "1px solid black" }}>website</th>
                                        <th style={{ border: "1px solid black" }}>gst_treatment</th>
                                        <th style={{ border: "1px solid black" }}>gstin_uin</th>
                                        <th style={{ border: "1px solid black" }}>pan_no</th>
                                        <th style={{ border: "1px solid black" }}>source_of_supply</th>
                                        <th style={{ border: "1px solid black" }}>currency</th>
                                        <th style={{ border: "1px solid black" }}>opening_balance</th>
                                        <th style={{ border: "1px solid black" }}>payment_terms</th>
                                        <th style={{ border: "1px solid black" }}>tds</th>
                                        <th style={{ border: "1px solid black" }}>facebook_url</th>
                                        <th style={{ border: "1px solid black" }}>twitter_url</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_attention</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_country</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_city</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_state</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_pincode</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_phone</th>
                                        <th style={{ border: "1px solid black" }}>billing_address_fax</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_name</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_email</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_work_phone</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_phone</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_skype</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_designation</th>
                                        <th style={{ border: "1px solid black" }}>contact_person_department</th>
                                        <th style={{ border: "1px solid black" }}>remark</th>
                                    </thead>
                                    <tbody>
                                        {
                                            importdata.map((d) => (
                                                <tr style={{ border: "1px solid black" }}>
                                                    <td style={{ border: "1px solid black" }}>{d.mast_id}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.vend_id}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.vend_name}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.company_name}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.vend_display_name}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.vend_email}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.vend_work_phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.vend_phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.skype_detail}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.designation}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.department}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.website}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.gst_treatment}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.gstin_uin}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.pan_no}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.source_of_supply}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.currency}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.opening_balance}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.payment_terms}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.tds}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.facebook_url}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.twitter_url}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_attention}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_country}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_city}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_state}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_pincode}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.billing_address_fax}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_name}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_email}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_work_phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_skype}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_designation}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.contact_person_department}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.remark}</td>
                                                </tr>
                                            ))
                                        }</tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </div>
                        {/* </div> */}
                        <div className="modal-footer" style={{ background: "white" }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    document.getElementById("showdataModal").style.display = "none";
                                    window.location.reload()
                                }}
                            >
                                Cancel
                            </button>
                            <button type="button"
                                id="uploadbtn"
                                onClick={uploaddata}
                                className="btn btn-primary"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                {/* ------------------ Modal end -----------------------------*/}
            </div>
        </div>
    )
}

export default Showvendor;