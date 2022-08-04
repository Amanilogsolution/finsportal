import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { Getfincialyearid, Vendor, DeleteVendor, ImportVendor, TotalVendId, Checkmidvalid, IdcountMaster, UpdateIdcountmaster, UpdatefinancialTwocount, InsertIdcountmaster } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../excelformate/tbl_currency.xlsx';
import * as XLSX from "xlsx";

const Showvendor = () => {
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
                        await DeleteVendor(row.sno, status, localStorage.getItem('Organisation'))
                        window.location.href = 'ShowVendor'
                    }}>
                        <option selected disabled hidden> {row.status}</option>
                        <option value='Active'>Active</option>
                        <option value='Deactive' >Deactive</option>
                    </select>
                </div>
            ]
        },
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


    const [data, setData] = useState([])
    const [importdata, setImportdata] = useState([]);
    let [errorno, setErrorno] = useState(0);
    const [duplicateData, setDuplicateDate] = useState([])
    const [backenddata, setBackenddata] = useState(false);
    const [finsyear, setFinsyear] = useState(0);
    const [mvendid, setMvendid] = useState(0);
    const [vendid, setVendid] = useState(0);


    //##########################  Upload data start  #################################

    const uploaddata = async () => {
        // document.getElementById("uploadbtn").disabled = true;

        // importdata.map((d) => {
        //     if (!d.existing || !d.vend_name || !d.vend_email || !d.vend_phone || !d.gst_treatment || !d.pan_no || !d.currency) {
        //         setErrorno(errorno++);
        //     }
        // })

        let arry = [];
        importdata.map((d) => {
            if (d.existing === 'y') {
                arry.push(d.mast_id)
            }
        })

        if (errorno > 0) {
            alert("Please! fill the mandatory data");
            document.getElementById("showdataModal").style.display = "none";
            window.location.reload()
        }
        else {

            const org = localStorage.getItem('Organisation')
            const result = await Checkmidvalid(arry, org, 'tbl_new_vendor');

            // ######## Check which data does not exist    ##########
            const duplicate = (arry, result) => {
                let res = []
                res = arry.filter(el => {
                    return !result.find(obj => {
                        return el === obj.master_id
                    })
                })
                return res
            }
            const duplicatearry = duplicate(arry, result);
            setDuplicateDate(duplicatearry)
            //    #############################################

            if (duplicatearry.length > 0) {
                setBackenddata(true)

            }
            else {

                let countmvendid = mvendid;
                let countvendid = vendid;
                for (let i = 0; i < importdata.length; i++) {

                    if (importdata[i].existing === 'y') {
                        const createvendid = async () => {

                            let numid = Number(countvendid);
                            var increid = numid + 1;
                            countvendid = increid;
                            increid = '' + increid;
                            increid = increid.padStart(4, '0');
                            const generatevendid = "VEND" + finsyear + increid;
                            Object.assign(importdata[i], { "vend_id": generatevendid })
                        }

                        createvendid();

                    }
                    else if (importdata[i].existing === 'n') {
                        const createnotexistid = async () => {

                            let mvendidy = countmvendid + 1;
                            countmvendid = mvendidy
                            mvendidy = '' + mvendidy;
                            mvendidy = mvendidy.padStart(4, '0');

                            let vendidy = countvendid + 1;
                            countvendid = vendidy;
                            vendidy = '' + vendidy;
                            vendidy = vendidy.padStart(4, '0');
                            const generatemvend = "MVEND" + finsyear + mvendidy;
                            const generatevend = "VEND" + finsyear + vendidy;
                            Object.assign(importdata[i], { "vend_id": generatevend }, { "mast_id": generatemvend })

                        }
                        createnotexistid();

                    }


                }

                const updatefinstable = await UpdatefinancialTwocount(org, 'mvend_count', countmvendid, 'vend_count', countvendid);
                const result = await ImportVendor(importdata, org, localStorage.getItem("User_id"));

                if (!(result === "Data Added")) {
                    setBackenddata(true);
                    setDuplicateDate(result)
                }
                else if (result === "Data Added") {
                    document.getElementById("showdataModal").style.display = "none";
                    setBackenddata(false);
                    alert("Data Added")
                    window.location.reload()
                }


            }


        }

    };
    //##########################   Upload data end  #################################

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


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
            const financialyear = await Getfincialyearid(org)
            setFinsyear(financialyear[0].year)
            const mvendid = parseInt(financialyear[0].mvend_count);
            const vendid = parseInt(financialyear[0].vend_count);
            setMvendid(mvendid)
            setVendid(vendid)
            const year = financialyear[0].year;
            const result = await Vendor(org)
            setData(result)
        }
        fetchdata();

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

                {/* ------------------ Modal start -----------------------------*/}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
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
                                <div>
                                    <label
                                        htmlFor="user_name"
                                        className=" col-form-label font-weight-normal">
                                        <span >Select the file</span>
                                    </label>
                                    <div>
                                        <input
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
                                <button type="button" className="btn btn-primary"
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
                <div className="modal fade bd-example-modal-lg "
                    id="showdataModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                >
                    <div className="" style={{ height: "550px", width: "95%", overflow: "auto", margin: "auto" }}>
                        <div className="modal-content">
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
                            <div style={{ margin: "0px 8px", paddingBottom: "20px", overflow: "auto" }}>
                                {
                                    backenddata ?
                                        <>
                                            <h5 style={{ margin: "auto" }}>This Master id does Not exist</h5>
                                            <table style={{ color: "red", margin: "auto" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: "1px solid black" }}>Master id</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        duplicateData.map((d, index) => (

                                                            <tr key={index} style={{ border: "1px solid black" }}>
                                                                <td style={{ border: "1px solid black" }}>{d}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                                <tfoot></tfoot>

                                            </table>
                                            <br /><br />
                                        </>
                                        : null
                                }
                                <table >
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid black" }}>Existing</th>
                                            <th style={{ border: "1px solid black" }}>Master Id</th>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            importdata.map((d, index) => (
                                                <tr key={index} style={{ border: "1px solid black" }}>
                                                    <td style={{ border: "1px solid black" }}>{d.existing}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.mast_id}</td>
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