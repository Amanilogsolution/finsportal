import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getstates } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deletestate, ImportState, getUserRolePermission } from '../../../api';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/tbl_states.xlsx';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const ShowState = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getstates();
      setData(result);
      fetchRoles()

    }
    fetchdata()
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'state')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    setLoading(true)

    if (financstatus === 'Lock') {
      document.getElementById('addstatebtn').style.background = '#7795fa';
    }
    if (UserRights.state_create === 'true') {
      document.getElementById('addstatebtn').style.display = "block";
      if (financstatus !== 'Lock') {
        document.getElementById('uploadstatebtn').style.display = "block";
      }
    }
  }
  const columns = [
    {
      name: 'State Name',
      selector: 'null',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit State is Lock'>{row.state_name}</p>
        } else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.state_edit === 'true') {
            return (
              <a title='Edit State' className='pb-1' href="EditState" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('stateSno', `${row.sno}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.state_name}</a>
            );
          } else {
            return <p title='Not Access to Edit State'>{row.state_name}</p>
          }

        }
      }
    },
    {
      name: 'State Code',
      selector: 'state_code',
      sortable: true
    },
    {
      name: 'State Short Name',
      selector: 'state_short_name',
      sortable: true
    },
    {
      name: 'Type',
      selector: 'state_type',
      sortable: true
    },
    {
      name: 'Country Name',
      selector: 'country_name',
      sortable: true
    },
    {
      name: "Status",
      sortable: true,
      selector: "null",
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
            if (userRightsData.state_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await deletestate(row.sno, status)
                    setAlertObj({ type: 'success', text:`Status-${status}`, url: '/ShowState' })
                    // window.location.href = 'ShowState'
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

    // {
    //   name: "Actions",
    //   sortable: false,
    //   selector: "null",
    //   cell: (row) => {
    //     if (localStorage.getItem('financialstatus') === 'Lock') {
    //       return
    //     } else {
    //       let role = JSON.parse(localStorage.getItem('RolesDetais'))
    //       if (!role) {
    //         fetchRoles()
    //       }
    //       if (role.state_edit === 'true') {
    //         return (
    //           <a title='Edit State' href="EditState" id={`editactionbtns${row.sno}`} >
    //             <button className="editbtn btn-success px-1" onClick={() => localStorage.setItem('stateSno', `${row.sno}`)} >Edit</button></a>
    //         );
    //       } else {
    //         return
    //       }

    //     }
    //   }

    // }
  ];




  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    importdata.map((d) => {
      if (!d.country_name || !d.state_name || !d.state_code || !d.state_short_name || !d.state_type) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportState(importdata, localStorage.getItem('User_id'));
      if (!(result === "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result === "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.href = './ShowState'
      }

      // ImportState(importdata);
      // document.getElementById("showdataModal").style.display="none";
      // window.location.reload()
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
  const styleborder = {
    border: "1px solid black"
  }

  return (
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className='d-flex justify-content-between px-3 py-3'>
              <h3 className="ml-5">State</h3>
              <div className='d-flex '>
                <button type="button" id='uploadstatebtn' style={{ display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
                <button type="button" id='addstatebtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./StateMaster" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-4">Add State</button>
              </div>
            </div>

            <div className="container-fluid">
              <div className="card mb-0 w-100 mb-2">
                <article className='card-body pt-1 pb-0'>
                  <DataTableExtensions
                    {...tableData} >
                    <DataTable
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      dense
                      highlightOnHover
                      customStyles={customStyles}
                    />
                  </DataTableExtensions>
                </article>
              </div>
            </div>
            {
              alertObj.type ? <AlertsComp data={alertObj} /> : null
            }
          </div>
          : <LoadingPage />
      }
      {/* ------------------ Modal start -----------------------------*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
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
                    className={`form-control `}
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
        aria-hidden="true"
      >

        <div className="" style={{ height: "550px", width: "50%", overflow: "auto", margin: "auto" }}>
          <div className={`modal-content `}>
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
            <div className="" style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>
              {

                backenddata ?
                  <>
                    <h5>This data already exist</h5>
                    <table style={{ color: "red", margin: "auto" }}>
                      <thead>
                        <tr>
                          <th style={styleborder}>state_name</th>
                          <th style={styleborder}>state_code</th>
                          <th style={styleborder}>state_short_name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          duplicateData.map((d) => (

                            <tr style={styleborder}>
                              <td className='text-center' style={styleborder}>{d.state_name}</td>
                              <td className='text-center' style={styleborder}>{d.state_code}</td>
                              <td className='text-center' style={styleborder}>{d.state_short_name}</td>
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
                    <th style={styleborder}>country_name</th>
                    <th style={styleborder}>state_name</th>
                    <th style={styleborder}>state_code</th>
                    <th style={styleborder}>state_short_name</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    importdata.map((d) => (
                      <tr style={styleborder}>
                        <td style={styleborder}>{d.country_name}</td>
                        <td style={styleborder}>{d.state_name}</td>
                        <td style={styleborder}>{d.state_code}</td>
                        <td style={styleborder}>{d.state_short_name}</td>

                      </tr>
                    ))
                  }</tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
          <div className={`modal-footer `} >
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
              className="btn btn-primary"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {/* ------------------ Modal end -----------------------------*/}
      <Footer />
    </div>
  )
}

export default ShowState
