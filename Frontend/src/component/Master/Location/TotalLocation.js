import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { totalLocation, Locationstatus, ImportLocationMaster, ImportLocationAddress, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import Addbtn from '../../../images/add-btn.png'
import Editbtn from '../../../images/edit.png'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/tbl_location_master.xlsx';
import Excelfile2 from '../../../excelformate/tbl_location_address.xlsx';
import customStyles from '../../customTableStyle';
import './location.css'

const TotalLocation = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [btntype, setBtntype] = useState(true);
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);


  useEffect(() => {
    async function fetchdata() {
      const result = await totalLocation(localStorage.getItem('Organisation'))
      setData(result)

      fetchRoles();
    }
    fetchdata();
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    if (financstatus === 'Lock') {
      document.getElementById('addbranchbtn').style.background = '#7795fa';
    }
    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'branch')
    setUserRightsData(UserRights)
    localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.branch_create === 'true') {
      document.getElementById('addbranchbtn').style.display = "block";
      if (financstatus !== 'Lock') {
        document.getElementById('uploadlocabtn').style.display = "block";
        document.getElementById('uploadlocaddbtn').style.display = "block";
      }
    }
  }

  const styleborder = {
    border: "1px solid black"
  }

  const columns = [
    {
      name: 'Location Name',
      selector: 'location_name',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Location is Lock'>{row.location_name}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.branch_edit === 'true') {
            return (
              <a title='Edit Location' className='pb-1' href="EditLocation" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.location_name}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Location'>{row.location_name}</p>
          }

        }
      }
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true
    },
    {
      name: 'State',
      selector: 'state',
      sortable: true
    },
    {
      name: 'GST Number',
      selector: 'gstin_no',
      sortable: true
    },
    {
      name: 'Contact Name1',
      selector: 'contact_name1',
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
          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (userRightsData.branch_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await Locationstatus(localStorage.getItem("Organisation"), row.location_id, status)
                    window.location.href = 'TotalLocation'
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
    },

    {
      name: "Actions",
      sortable: false,
      selector: "null",
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.branch_create === 'true') {
            return (
              <div id={`editactionbtns${row.sno}`}>
                <a title="Add location Address" href="AddOrgAddress" className='px-0'>
                  <button type="button" className="btn "
                    onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}>
                    <img src={Addbtn} style={{ width: "20px", height: "20px" }} alt="add Icon" />
                  </button></a>
                <a title="Edit location Address" href="EditOrgAddress" className='px-0'>
                  <button type="button" className="btn "
                    onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}>
                    <img src={Editbtn} style={{ width: "20px", height: "20px" }} alt="Edit Icon" />
                  </button>
                </a>
              </div>
            );
          }
          else {
            return
          }

        }
      }


    }
  ]




  const btntype1 = () => {
    setBtntype(true)

  }
  const btntype2 = () => {
    setBtntype(false)
  }
  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    if (btntype) {

      importdata.map((d) => {
        if (!d.location_name || !d.gstin_no) {
          setErrorno(errorno++);
        }
      })

      if (errorno > 0) {
        alert("Please! fill the mandatory data");
        document.getElementById("showdataModal").style.display = "none";
        window.location.reload()
      }
      else {
        const result = await ImportLocationMaster(localStorage.getItem('Organisation'), importdata, localStorage.getItem('User_id'));
        if (result === "Data Added") {
          document.getElementById("showdataModal").style.display = "none";
          alert("Data Added")
          window.location.href = './TotalLocation'
        }
      }
    }
    else {

      importdata.map((d) => {
        if (!d.location_name || !d.gstin_no || !d.from_date || !d.to_date) {
          setErrorno(errorno++);
        }
      })

      if (errorno > 0) {
        alert("Please! fill the mandatory data");
        document.getElementById("showdataModal").style.display = "none";
        window.location.reload()
      }
      else {
        const result = await ImportLocationAddress(localStorage.getItem('Organisation'), importdata, localStorage.getItem('User_id'));
        if (result === "Data Added") {
          document.getElementById("showdataModal").style.display = "none";
          alert("Data Added")
          window.location.href = './TotalLocation'
        }
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
  };

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>

        <div className='d-flex justify-content-between py-2 px-3 location-div'>
          <h3 className="ml-5">Location</h3>
          <div className='d-flex'>
            <button type="button" id='uploadlocaddbtn' style={{ display: "none" }} className="btn btn-success " data-toggle="modal" data-target="#exampleModal" onClick={btntype2}>Import Location Address</button>
            <button type="button" id='uploadlocabtn' style={{ display: "none" }} className="btn btn-success mx-3" data-toggle="modal" data-target="#exampleModal" onClick={btntype1}>Import Location</button>
            <button type="button" id='addbranchbtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./AddLocation" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-3">Add Location</button>

          </div>
        </div>


        <div className="container-fluid">
          <div className="card my-2 w-100">
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
                    className="form-control"
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    required="required"
                  />
                </div><br />
                <span style={{ color: "red" }}>
                  {btntype ? <a href={Excelfile} download> Download formate </a>
                    : <a href={Excelfile2} download> Download formate </a>}

                </span>

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
                onClick={datatojson}
                className="btn btn-primary"
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
        aria-hidden="true">

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
                aria-label="Close">
                <span aria-hidden="true" style={{ color: "red" }}
                  onClick={() => {
                    document.getElementById("showdataModal").style.display = "none";
                    window.location.reload()
                  }}>
                  &times;</span>
              </button>
            </div>
            <div className="" style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>
              {btntype ?
                <table >
                  <thead>
                    <tr>
                      <th style={styleborder}>Country</th>
                      <th style={styleborder}>location_name</th>
                      <th style={styleborder}>gstin_no</th>
                      <th style={styleborder}>location_id</th>
                      <th style={styleborder}>contact_name1</th>
                      <th style={styleborder}>contact_name2</th>
                      <th style={styleborder}>contact_phone_no1</th>
                      <th style={styleborder}>contact_phone_no2</th>
                    </tr>

                  </thead>
                  <tbody>
                    {
                      importdata.map((d) => (
                        <tr style={styleborder}>
                          <td style={styleborder}>{d.country}</td>
                          <td style={styleborder}>{d.location_name}</td>
                          <td style={styleborder}>{d.gstin_no}</td>
                          <td style={styleborder}>{d.location_id}</td>
                          <td style={styleborder}>{d.contact_name1}</td>
                          <td style={styleborder}>{d.contact_name2}</td>
                          <td style={styleborder}>{d.contact_phone_no1}</td>
                          <td style={styleborder}>{d.contact_phone_no2}</td>

                        </tr>
                      ))
                    }</tbody>
                  <tfoot></tfoot>
                </table>
                :
                <table >
                  <thead>
                    <tr>
                      <th style={styleborder}>location_id</th>
                      <th style={styleborder}>location_name</th>
                      <th style={styleborder}>gstin_no</th>
                      <th style={styleborder}>location_add1</th>
                      <th style={styleborder}>location_add2</th>
                      <th style={styleborder}>location_city</th>
                      <th style={styleborder}>location_state</th>
                      <th style={styleborder}>location_pin</th>
                      <th style={styleborder}>location_country</th>
                      <th style={styleborder}>from_date</th>
                      <th style={styleborder}>to_date</th>
                    </tr>

                  </thead>
                  <tbody>
                    {
                      importdata.map((d) => (
                        <tr style={styleborder}>
                          <td style={styleborder}>{d.location_id}</td>
                          <td style={styleborder}>{d.location_name}</td>
                          <td style={styleborder}>{d.gstin_no}</td>
                          <td style={styleborder}>{d.location_add1}</td>
                          <td style={styleborder}>{d.location_add2}</td>
                          <td style={styleborder}>{d.location_city}</td>
                          <td style={styleborder}>{d.location_state}</td>
                          <td style={styleborder}>{d.location_pin}</td>
                          <td style={styleborder}>{d.location_country}</td>
                          <td style={styleborder}>{d.from_date}</td>
                          <td style={styleborder}>{d.to_date}</td>

                        </tr>
                      ))
                    }</tbody>
                  <tfoot></tfoot>
                </table>
              }
            </div>
          </div>
          <div className="modal-footer" style={{ background: "white" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("showdataModal").style.display = "none";
                window.location.reload()
              }}>Cancel</button>
            <button type="button"
              onClick={uploaddata}
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

export default TotalLocation

