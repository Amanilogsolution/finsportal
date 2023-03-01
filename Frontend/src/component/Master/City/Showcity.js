import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Totalcity } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deleteCity, ImportCity, getUserRolePermission } from '../../../api';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/tbl_cities.xlsx';
import customStyles from '../../customTableStyle';

const Showcity = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const columns = [
    {
      name: 'Country Name',
      selector: 'country_name',
      sortable: true
    },

    {
      name: 'State Code',
      selector: 'state_name',
      sortable: true
    },

    {
      name: 'City Name',
      selector: 'city_name',
      sortable: true
    },
    {
      name: 'City ID',
      selector: 'city_id',
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => [
        <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
          <select onChange={async (e) => {
            const status = e.target.value;
            await deleteCity(row.sno, status)
            window.location.href = 'ShowCity'
          }
          }>
            <option value={row.status} hidden> {row.status}</option>
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

        <a title='View Document' href="EditCity" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
          <button className="editbtn btn-success px-1" onClick={() => localStorage.setItem('citySno', `${row.sno}`)} >Edit</button></a>

      ]
    }


  ]



  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    importdata.map((d) => {
      if (!d.country_name || !d.state_name || !d.city_id || !d.city_name) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportCity(importdata, localStorage.getItem('User_id'));
      if (!(result === "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result === "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.href = './Showcity'
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

  useEffect(() => {
    async function fetchdata() {
      const result = await Totalcity()
      setData(result)

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addcitybtn').style.background = '#7795fa';
      }

      const UserRights = await getUserRolePermission(localStorage.getItem('Organisation'), localStorage.getItem('Role'), 'city')
      if (UserRights.city_create === 'true') {
        document.getElementById('addcitybtn').style.display = "block";
        document.getElementById('uploadcitybtn').style.display = "block";
      }
      if (UserRights.city_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
          console.log(`editactionbtns${result[i].sno}`)

        }
      }
      if (UserRights.city_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";
        }
      }
    }
    fetchdata()
  }, [])

  const tableData = {
    columns, data
  }

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
        <div className='d-flex justify-content-between px-3 py-3'>
          <h3 className="ml-5">City</h3>
          <div className='d-flex '>
            <button type="button" id='uploadcitybtn' style={{ display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <button type="button" id='addcitybtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./Addcity" : alert('You are not in Current Financial Year') }} className="btn btn-primary mx-4">Add City</button>
          </div>
        </div>

        <div className="container-fluid">
          <div className="card">
            <article className={`card-body  py-1`}>
              <DataTableExtensions
                {...tableData}
              >
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
      </div>
      <Footer  />
      {/* ------------------ Modal start -----------------------------*/}
      {/* <Modal excel={Excelfile} importdatas={setImportdata} /> */}
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
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    required="required"
                  />
                </div><br />
                <span style={{ color: "red" }}>
                  <a href={Excelfile} download> Download formate</a>
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

                          <th style={styleborder}>city_id</th>
                          <th style={styleborder}>city_name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          duplicateData.map((d, index) => (
                            <tr key={index} style={styleborder}>

                              <td className='text-center' style={styleborder}>{d.city_id}</td>
                              <td className='text-center' style={styleborder}>{d.city_name}</td>
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
                    <th style={styleborder}>city_id</th>
                    <th style={styleborder}>city_name</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    importdata.map((d, index) => (
                      <tr key={index} style={styleborder}>
                        <td style={styleborder}>{d.country_name}</td>
                        <td style={styleborder}>{d.state_name}</td>
                        <td style={styleborder}>{d.city_id}</td>
                        <td style={styleborder}>{d.city_name}</td>

                      </tr>
                    ))
                  }</tbody>
              </table>
            </div>
          </div>
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
    </div>
  )

}

export default Showcity
