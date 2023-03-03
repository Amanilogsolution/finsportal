import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalAccountName, AccountnameStatus, ImportAccountName, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/tbl_account_major_major .xlsx';
import customStyles from '../../customTableStyle';

function ShowAccountname() {
    const [data, setData] = useState([])
    const [importdata, setImportdata] = useState([]);
    let [errorno, setErrorno] = useState(0);
    const [duplicateData, setDuplicateDate] = useState([])
    const [backenddata, setBackenddata] = useState(false);
    const [financialstatus, setFinancialstatus] = useState('Lock')


    useEffect(() => {
        const fetchdate = async () => {
            const result = await TotalAccountName(localStorage.getItem('Organisation'))
            setData(result)
            fetchRoles()
        }
        fetchdate();
    }, [])

    const fetchRoles = async () => {
        const org = localStorage.getItem('Organisation')

        const financstatus = localStorage.getItem('financialstatus')
        setFinancialstatus(financstatus);
        if (financstatus === 'Lock') {
            document.getElementById('addaccountnam').style.background = '#7795fa';
        }

        const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'chartof_accounts')
        localStorage["RolesDetais"] = JSON.stringify(UserRights)

        if (UserRights.chartof_accounts_create === 'true') {
            document.getElementById('addaccountnam').style.display = "inline";
            if (financstatus !== 'Lock') {
                document.getElementById('uploadaccountnam').style.display = "inline";
            }
        }
    }

    const columns = [
        {
            name: 'Account Type',
            selector: 'account_type',
            sortable: true,
            cell: (row) => {
                if (localStorage.getItem('financialstatus') === 'Lock') {
                    return <p title='Edit Account Major Code  is Lock'>{row.account_type}</p>
                }
                else {
                    let role = JSON.parse(localStorage.getItem('RolesDetais'))
                    if (!role) {
                        fetchRoles()
                    }
                    if (role.chartof_accounts_edit === 'true') {
                        return (
                            <a title='Edit Account Major Code ' className='pb-1' href="EditAccountname" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('AccountTypeCode', `${row.account_type_code}`)}
                                style={{ borderBottom: '3px solid blue' }}>{row.account_type}</a>
                        );
                    }
                    else {
                        return <p title='Not Access to Edit Account Major Code '>{row.account_type}</p>
                    }

                }
            }
        },
        {
            name: 'Account Type Code',
            selector: 'account_type_code',
            sortable: true
        },
        {
            name: 'Account Type Description',
            selector: 'account_description',
            sortable: true
        },
        {
            name: 'Status',
            sortable: true,
            selector: 'null',
            cell: (row) => {
                if (localStorage.getItem('financialstatus') === 'Lock') {
                    return (
                        <div className='droplist'>
                            <p>{row.status}</p>
                        </div>
                    )
                }
                else {
                    let role = JSON.parse(localStorage.getItem('RolesDetais'))
                    if (!role) {
                        fetchRoles()
                        window.location.reload()
                    }
                    else {
                        if (role.chartof_accounts_delete === 'true') {
                            return (
                                <div className='droplist'>
                                    <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                                        const status = e.target.value;
                                        await AccountnameStatus(localStorage.getItem("Organisation"), status, row.account_type_code)
                                        window.location.href = '/ShowAccountname'
                                    }}>
                                        <option value={row.status} hidden> {row.status}</option>
                                        <option value='Active'>Active</option>
                                        <option value='Deactive' >Deactive</option>
                                    </select>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className='droplist'>
                                    <p>{row.status}</p>
                                </div>
                            )
                        }
                    }
                }
            }
        }
    ]





    //##########################  Upload data start  #################################

    const uploaddata = async () => {

        document.getElementById("uploadbtn").disabled = true;
        importdata.map((d) => {
            if (!d.account_type_code || !d.account_type) {
                setErrorno(errorno++);
            }
        })

        if (errorno > 0) {
            alert("Please! fill the mandatory data");
            document.getElementById("showdataModal").style.display = "none";
            window.location.reload()
        }
        else {
            const result = await ImportAccountName(importdata, localStorage.getItem("Organisation"), localStorage.getItem("User_id"));
            if (!(result == "Data Added")) {
                setBackenddata(true);
                setDuplicateDate(result)
            }
            else if (result == "Data Added") {
                setBackenddata(false);
                document.getElementById("showdataModal").style.display = "none";
                alert("Data Added")
                window.location.href = './ShowAccountname'
            }

        }

    };
    //##########################   Upload data end  #################################

    //##########################  for convert array to json start  #################################

    const datatojson = () => {
        const array = JSON.stringify(importdata)
        const datas = JSON.parse(array)
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



    const tableData = {
        columns, data
    }

    return (
        <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
            </div>
            <Header />
            <div className={`content-wrapper `}>
                <div className='d-flex justify-content-between py-4 px-4'>
                    <h3 className="text-left ml-5">Account Major Code </h3>
                    <div>
                        <button type="button" id='uploadaccountnam' style={{ display: 'none' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
                        <button type="button" id='addaccountnam' style={{ display: 'none' }} onClick={() => {
                            financialstatus !== 'Lock' ? window.location.href = "./InsertAccountType" : alert('You are not in Current Financial Year')
                        }} className="btn btn-primary mx-3">Add Account Name</button>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className={`card mb-0  w-100`} >
                        <article className="card-body py-1">
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
                            <div className=" ">
                                <label
                                    htmlFor="user_name"
                                    className=" col-form-label font-weight-normal"
                                >
                                    <span >Select the file</span>
                                </label>
                                <div className=" ">
                                    <input
                                        id=""
                                        type="file"
                                        onChange={onChange}
                                        className="form-control"
                                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        required="required"
                                    />
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
                            <button type="button"
                                onClick={datatojson}
                                className="btn btn-primary"
                                data-dismiss="modal"
                                data-toggle="modal"
                                data-target=".bd-example-modal-lg"
                            >
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

                <div className="" style={{ height: "550px", width: "50%", overflow: "auto", margin: "auto" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="exampleModalLabel">
                                Uploaded Excel file
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true" className='text-danger'
                                    onClick={() => {
                                        document.getElementById("showdataModal").style.display = "none";
                                        window.location.reload()
                                    }}>
                                    &times;</span>
                            </button>
                        </div>
                        {/* <div className="modal-body"> */}
                        <div className="" style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>
                            {

                                backenddata ?
                                    <>
                                        <h5>This data already exist</h5>
                                        <table className='text-danger' style={{ margin: "auto" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ border: "1px solid black" }}>account_type_code</th>
                                                    <th style={{ border: "1px solid black" }}>account_type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    duplicateData.map((d) => (
                                                        <tr style={{ border: "1px solid black" }}>
                                                            <td style={{ border: "1px solid black", textAlign: "center" }}>{d.account_type_code}</td>
                                                            <td style={{ border: "1px solid black", textAlign: "center" }}>{d.account_type}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <br /><br />
                                        </table>
                                    </>
                                    : null
                            }

                            <table >
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid black" }}>account_type</th>
                                        <th style={{ border: "1px solid black" }}>account_type_code</th>
                                        <th style={{ border: "1px solid black" }}>account_description</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        importdata.map((d) => (
                                            <tr style={{ border: "1px solid black" }}>
                                                <td style={{ border: "1px solid black" }}>{d.account_type}</td>
                                                <td style={{ border: "1px solid black" }}>{d.account_type_code}</td>
                                                <td style={{ border: "1px solid black" }}>{d.account_description}</td>

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
                            onClick={uploaddata}
                            id="uploadbtn"
                            className="btn btn-primary">
                            Upload
                        </button>
                    </div>
                </div>
            </div>
            {/* ------------------ Modal end -----------------------------*/}
        </div>
    )
}

export default ShowAccountname
