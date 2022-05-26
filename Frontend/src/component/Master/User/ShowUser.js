import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalUser } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deleteUser,ImportUser } from '../../../api';
import Excelfile from '../../../excelformate/User Sheet.xlsx';
import * as XLSX from "xlsx";


const columns = [
  {
    name: 'Employee Name',
    selector: row=>row.employee_name,
    sortable: true
  },
  {
    name: 'Role',
    selector: row=>row.role,
    sortable: true
  },

  {
    name: 'Warehouse',
    selector: row=>row.warehouse,
    sortable: true
  },
  {
    name: 'UserId',
    selector: row=>row.user_id,
    sortable: true
  },
  // {
  //   name: 'Password',
  //   selector: 'password',
  //   sortable: true
  // },
  {
    name: 'Email Id',
    selector: row=>row.email_id,
    sortable: true
  },
  {
    name: 'Phone',
    selector: row=>row.phone,
    sortable: true
  },
  {
    name: 'Status',
    selector: 'null',
    cell: (row) => [

      <div className='droplist'> 
        <select onChange={async (e) => {
          const status = e.target.value;
          await deleteUser(row.sno, status)
          window.location.href = 'ShowUser'
        }
        }>
          <option selected disabled hidden> {row.status}</option>


          <option value='Active'>Active</option>
          <option value='DeActive' >DeActive</option>
        </select>
      </div>
    ]
  },
  // {
  //   name:'Active',
  //   selector: 'null',
  //   cell: (row) => [
  //       <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
  //         {
  //           if(row.status == 'Active'){
  //             const checkvalue ='Deactive'
  //             await deleteUser(row.sno,checkvalue)
  //                 window.location.href='ShowUser'

  //           }
  //           else{
  //             const checkvalue ='Active'
  //             await deleteUser(row.sno,checkvalue)
  //                 window.location.href='ShowUser'
  //           }
  //          }} />
  //   ]
  // },
  {
    name: 'Operate Mode',
    selector: row=>row.operate_mode,
    sortable: true
  },
  {
    name: 'Customer',
    selector: row=>row.customer,
    sortable: true
  },
  {
    name: 'Reporting to',
    selector: row=>row.reporting_to,
    sortable: true
  },
  {
    name: 'Designation',
    selector: row=>row.designation,
    sortable: true
  },
  {
    name: 'Two factor authentication',
    selector: row=>row.two_factor_authentication,
    sortable: true
  },

  {
    name: "Actions",
    sortable: false,

    selector: row=>row.null,
    cell: (row) => [

      <a title='View Document' href="EditUser">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('userSno', `${row.sno}`)} >Edit</button></a>

    ]
  }
]


const ShowUser = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);


  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    document.getElementById("uploadbtn").disabled = true;
    importdata.map((d) => {
      if (!d.employee_name || !d.role || !d.warehouse || !d.user_name || !d.password || !d.email_id || !d.operate_mode || !d.customer) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {

      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportUser(importdata,localStorage.getItem('Organisation'),localStorage.getItem('Organisation Name'));
        console.log(result.length)
      if (!(result === "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result === "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.href = 'ShowUser'
      }
    }

  };
  //##########################   Upload data end  #################################

  //##########################  for convert array to json start  #################################

  const handleClick = () => {
    const array = JSON.stringify(importdata)
    const datas = JSON.parse(array)
    console.log('dates',datas)
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
    const result = await TotalUser()
    setData(result)
    // console.log(result)
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./AddUser" }} className="btn btn-primary">ADD User</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '2%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">User</h3>
              <br />
              <div className="row ">
                <div className="col">
                  <div className="card" >
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
              {/* <div className="modal-body"> */}
              <div className="" style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>
                {

                  backenddata ?
                    <>
                      <h5 style={{margin:"auto"}}>This data already exist</h5>
                      <table style={{ color: "red",textAlign:"center",margin:"auto" }}>
                        <thead>
                          <tr>
                          <th style={{ border: "1px solid black" }}>user_name</th>
                          <th style={{ border: "1px solid black" }}>email_id</th>
                          <th style={{ border: "1px solid black" }}>phone</th>
                        </tr>
                        </thead>
                        <tbody>
                          {
                            duplicateData.map((d) => (

                              <tr style={{ border: "1px solid black" }}>
                              
                                <td style={{ border: "1px solid black" }}>{d.user_name}</td>
                                <td style={{ border: "1px solid black" }}>{d.email_id}</td>
                                <td style={{ border: "1px solid black" }}>{d.phone}</td>
                         
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
                    <tr>
                    <th style={{ border: "1px solid black" }}>employee_name</th>
                    <th style={{ border: "1px solid black" }}>role</th>
                    <th style={{ border: "1px solid black" }}>warehouse</th>
                    <th style={{ border: "1px solid black" }}>user_name</th>
                    <th style={{ border: "1px solid black" }}>password</th>
                    <th style={{ border: "1px solid black" }}>email_id</th>
                    <th style={{ border: "1px solid black" }}>phone</th>
                    <th style={{ border: "1px solid black" }}>operate_mode</th>
                    <th style={{ border: "1px solid black" }}>customer</th>
                    <th style={{ border: "1px solid black" }}>reporting_to</th>
                    <th style={{ border: "1px solid black" }}>designation</th>
                    <th style={{ border: "1px solid black" }}>user_profile_url</th>
                    </tr>

                  </thead>
                  <tbody>
                    {
                      importdata.map((d) => (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{d.employee_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.role}</td>
                          <td style={{ border: "1px solid black" }}>{d.warehouse}</td>
                          <td style={{ border: "1px solid black" }}>{d.user_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.password}</td>
                          <td style={{ border: "1px solid black" }}>{d.email_id}</td>
                          <td style={{ border: "1px solid black" }}>{d.phone}</td>
                          <td style={{ border: "1px solid black" }}>{d.operate_mode}</td>
                          <td style={{ border: "1px solid black" }}>{d.customer}</td>
                          <td style={{ border: "1px solid black" }}>{d.reporting_to}</td>
                          <td style={{ border: "1px solid black" }}>{d.designation}</td>
                          <td style={{ border: "1px solid black" }}>{d.user_profile_url}</td>

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

export default ShowUser
