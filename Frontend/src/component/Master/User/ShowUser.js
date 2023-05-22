import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deleteUser, ImportUser, TotalUser, getUserRolePermission } from '../../../api';
import Excelfile from '../../../excelformate/User Sheet.xlsx';
import * as XLSX from "xlsx";
import customStyles from '../../customTableStyle';


const ShowUser = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalUser(localStorage.getItem('Organisation'))
      setData(result)
      fetchRoles();
    }

    fetchdata()
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')


    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    if (financstatus === 'Lock') {
      document.getElementById('adduserbtn').style.background = '#7795fa';
    }

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'users')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.users_create === 'true') {
      document.getElementById('adduserbtn').style.display = "block";
      if (financstatus !== 'Lock') {
        document.getElementById('exceluserbtn').style.display = "block";
      }
    }
  }

  const columns = [
    {
      name: 'UserId',
      selector: 'null',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Unit is Lock'>{row.user_id}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.users_edit === 'true') {
            return (
              <a title='Edit User' className='pb-1' href="EditUser" id={`editactionbtns${row.sno}`}
                onClick={() => localStorage.setItem('userSno', `${row.sno}`)} style={{ borderBottom: '3px solid blue' }}> {row.user_id}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Unit'>{row.user_id}</p>
          }

        }
      }
    },
    {
      name: 'Employee Name',
      selector: row => row.employee_name,
      sortable: true
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true
    },

    {
      name: 'Warehouse',
      selector: row => row.warehouse,
      sortable: true
    },
    {
      name: 'Email Id',
      selector: row => row.email_id,
      sortable: true
    },
    {
      name: 'Customer',
      selector: row => row.customer,
      sortable: true
    },
    {
      name: 'Status',
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
          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (userRightsData.users_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await deleteUser(row.sno, status)
                    window.location.href = 'ShowUser'
                  }}>
                    <option value={row.status} hidden> {row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive' >Deactive</option>
                  </select>
                </div>
              );
            } else {
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
      const result = await ImportUser(importdata, localStorage.getItem('Organisation'), localStorage.getItem('Organisation Name'), localStorage.getItem('User_id'));
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
  };

  const styleborder = {
    border: "1px solid black"
  }
  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper`}>
        <button type="button" id='adduserbtn' style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./AddUser" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary">ADD User</button>
        <button type="button" id='exceluserbtn' style={{ float: "right", marginRight: '2%', marginTop: '2%', display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
        <div className="container-fluid">
          <br />
          <h3 className=" ml-5">Total User</h3>
          <br />
          <div className="card" >
            <article className={`card-body py-1`}>

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
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className={`modal-content`}>
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
                    className={`form-control`}
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
          <div className={`modal-content`}>
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="exampleModalLabel" >
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
            <div className="" style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>
              {

                backenddata ?
                  <>
                    <h5 style={{ margin: "auto" }}>This data already exist</h5>
                    <table className='text-danger text-center' style={{ margin: "auto" }}>
                      <thead>
                        <tr>
                          <th style={styleborder}>user_name</th>
                          <th style={styleborder}>email_id</th>
                          <th style={styleborder}>phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          duplicateData.map((d, index) => (

                            <tr key={index} style={styleborder}>
                              <td style={styleborder}>{d.user_name}</td>
                              <td style={styleborder}>{d.email_id}</td>
                              <td style={styleborder}>{d.phone}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    <br /><br />
                  </>
                  : null
              }
              <table >
                <thead>
                  <tr>
                    <th style={styleborder}>employee_name</th>
                    <th style={styleborder}>role</th>
                    <th style={styleborder}>warehouse</th>
                    <th style={styleborder}>user_name</th>
                    <th style={styleborder}>password</th>
                    <th style={styleborder}>email_id</th>
                    <th style={styleborder}>phone</th>
                    <th style={styleborder}>operate_mode</th>
                    <th style={styleborder}>customer</th>
                    <th style={styleborder}>reporting_to</th>
                    <th style={styleborder}>designation</th>
                    <th style={styleborder}>user_profile_url</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    importdata.map((d, index) => (
                      <tr key={index} style={styleborder}>
                        <td style={styleborder}>{d.employee_name}</td>
                        <td style={styleborder}>{d.role}</td>
                        <td style={styleborder}>{d.warehouse}</td>
                        <td style={styleborder}>{d.user_name}</td>
                        <td style={styleborder}>{d.password}</td>
                        <td style={styleborder}>{d.email_id}</td>
                        <td style={styleborder}>{d.phone}</td>
                        <td style={styleborder}>{d.operate_mode}</td>
                        <td style={styleborder}>{d.customer}</td>
                        <td style={styleborder}>{d.reporting_to}</td>
                        <td style={styleborder}>{d.designation}</td>
                        <td style={styleborder}>{d.user_profile_url}</td>
                      </tr>
                    ))
                  }</tbody>
              </table>
            </div>
          </div>
          <div className={`modal-footer`} >
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
  )
}

export default ShowUser
