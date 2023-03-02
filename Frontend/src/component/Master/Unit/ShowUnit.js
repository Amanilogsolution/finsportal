import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalUnit, deleteUnit, ImportUnit, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../../excelformate/unit Formate.xlsx';
import * as XLSX from "xlsx";
import customStyles from '../../customTableStyle';

const ShowUnit = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const Token = localStorage.getItem('Token')
      const org = localStorage.getItem('Organisation');
      const result = await TotalUnit(Token, org)
      setData(result)
      fetchRoles()
   
      // }
      // if (UserRights.unit_delete === 'true') {
      //   for (let i = 0; i < result.length; i++) {
      //     document.getElementById(`deletebtn${result[i].sno}`).style.display = "block"
      //   }
      // }
    }
    fetchdata()
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'unit')
    localStorage["RolesDetais"] = JSON.stringify(UserRights)

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    if (financstatus === 'Lock') {
      document.getElementById('addunitbtn').style.background = '#7795fa';
    }
    if (UserRights.unit_create === 'true') {
      document.getElementById('addunitbtn').style.display = "block";
      if (financstatus !== 'Lock') {
        document.getElementById('uploadunitbtn').style.display = "block";
      }
    }
  }

  const columns = [
    {
      name: 'Unit Name',
      selector: 'null',
      sortable: true,

      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Unit is Lock'>{row.unit_name}</p>
        }
        else {
          let role = JSON.parse(localStorage.getItem('RolesDetais'))
          if (!role) {
            fetchRoles()
          }
          if (role.unit_edit === 'true') {
            return (
              <a title='Edit Unit' className='pb-1' href="EditUnit" id={`editactionbtns${row.sno}`}
                onClick={() => localStorage.setItem('unitSno', `${row.sno}`)} style={{ borderBottom: '3px solid blue' }}> {row.unit_name}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Unit'>{row.unit_name}</p>
          }

        }
      }
    },
    {
      name: 'Unit Symbol',
      selector: 'unit_symbol',
      sortable: true
    },

    {
      name: 'Status',
      selector: 'null',
      cell: (row) =>

      {
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
            if (role.unit_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await deleteUnit(row.sno, status, localStorage.getItem('Organisation'))
                    window.location.href = 'ShowUnit'
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
      
      // [

      //   <div className='droplist' id={`deletebtn${row.sno}`} style={{ display: "none" }}>
      //     <select onChange={async (e) => {
      //       const status = e.target.value;
      //       await deleteUnit(row.sno, status,)
      //       window.location.href = ''
      //     }}>
      //       <option value={row.status} hidden> {row.status}</option>
      //       <option value='Active'>Active</option>
      //       <option value='Deactive' >Deactive</option>
      //     </select>
      //   </div>
      // ]
    }

  ]






  //##########################  Upload data start  #################################

  const uploaddata = async () => {

    document.getElementById("uploadbtn").disabled = true;
    importdata.map((d) => {
      if (!d.unit_name || !d.unit_symbol) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportUnit(importdata, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
      if (!(result == "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result == "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.href = 'ShowUnit'
      }
    }

  };
  //##########################   Upload data end  #################################

  //##########################  for convert array to json start  #################################

  const handleClick = () => {
    if (importdata.length == 0) {
      alert("please select the file")
      window.location.reload();
    }
    else {
      const array = JSON.stringify(importdata)
      const datas = JSON.parse(array)
      setImportdata(datas);
    }
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
      <div className={`content-wrapper `}>
        <div className='d-flex justify-content-between px-4 py-4'>
          <h3 className=" ml-5">Unit</h3>
          <div className='d-flex  px-3'>
            <button type="button" id='uploadunitbtn' style={{ display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <button type="button" id='addunitbtn' style={{ display: "none" }} onClick={() => {  financialstatus === 'Active' ? window.location.href = "./AddUnit": alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-3">Add Unit</button>
          </div>
        </div>
        <div className="container-fluid">
          <div className="card mb-0 w-100">
            <article className={`card-body py-0`}>
              <DataTableExtensions
                {...tableData}>
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
      <Footer/>
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
          <div className={`modal-content `}>
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
            <div className={`modal-body `}>

              <div className=" ">
                <label
                  htmlFor="excel"
                  className=" col-form-label font-weight-normal"
                >
                  <span >Select the file</span>
                </label>
                <div className=" ">
                  <input
                    id=""
                    type="file"
                    className={`form-control `}
                    onChange={onChange}
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                </div><br />
                <span className='text-danger'>
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

        <div className="" style={{ height: "550px", width: "50%", overflow: "auto", margin: "auto" }}>
          <div className={`modal-content `}>
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
            {/* <div className="modal-body"> */}
            <div style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>
              {

                backenddata ?
                  <>
                    <h5>This data already exist</h5>
                    <table className='text-danger'>
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid black", padding: "5px" }}>unit_name</th>
                          <th style={{ border: "1px solid black", padding: "5px" }}>unit_symbol</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          duplicateData.map((d) => (
                            <tr style={styleborder}>
                              <td style={styleborder}>{d.unit_name}</td>
                              <td style={styleborder}>{d.unit_symbol}</td>
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
                    <th style={{ border: "1px solid black", padding: "5px" }}>unit_name</th>
                    <th style={{ border: "1px solid black", padding: "5px" }}>unit_symbol</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    importdata.map((d) => (
                      <tr style={styleborder}>
                        <td style={styleborder}>{d.unit_name}</td>
                        <td style={styleborder}>{d.unit_symbol}</td>
                      </tr>
                    ))
                  }</tbody>
              </table>
            </div>
          </div>
          <div className={`modal-footer bg-white`} >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("showdataModal").style.display = "none";
                window.location.reload()
              }}>
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

export default ShowUnit
