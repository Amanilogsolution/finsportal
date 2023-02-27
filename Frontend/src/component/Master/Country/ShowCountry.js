import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../../excelformate/tbl_countries.xlsx';
import { deletecountry, ImportCountry, Totalcountry, getUserRolePermission } from '../../../api';
import * as XLSX from "xlsx";
import customStyles from '../../customTableStyle'

const ShowCountry = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const themetype = localStorage.getItem('themetype')

  const columns = [
    {
      name: 'Country Name',
      selector: 'country_name',
      sortable: true
    },
    {
      name: 'Country Code',
      selector: 'country_code',
      sortable: true
    },
    {
      name: 'Country Id',
      selector: 'country_id',
      sortable: true
    },
    {
      name: 'Country phone code',
      selector: 'country_phonecode',
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => [
        <div className='droplist'>
          <select className='bg-white' id={`deleteselect${row.sno}`} style={{ display: "none" }} onChange={async (e) => {
            const status = e.target.value;
            await deletecountry(row.sno, status)
            window.location.href = 'ShowCountry'
          }}>
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
        <a title='View Document' href="EditCountry" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
          <button className="editbtn btn-success px-1" onClick={() => localStorage.setItem('countrySno', `${row.sno}`)} >Edit</button></a>
      ]
    }
  ]

  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    importdata.map((d) => {
      if (!d.country_code || !d.country_name) {
        setErrorno(errorno++);
      }
    })
    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportCountry(importdata, localStorage.getItem("User_id"));
      if (!(result === "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result === "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.reload()
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
  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addcountrybtn').style.background = '#7795fa';
      }

      const result = await Totalcountry()
      setData(result)


      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'country')
      if (UserRights.country_create === 'true') {
        document.getElementById('addcountrybtn').style.display = "block";
        document.getElementById('uploadcountrybtn').style.display = "block";
      }
      if (UserRights.country_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }
      if (UserRights.country_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";
        }
      }
    }
    fetchdata();
  }, [])

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
        <div className='d-flex py-3 px-5  justify-content-between'>
          <h3 className="ml-5">Country</h3>
          <div className='d-flex '>
            <button type="button" id='uploadcountrybtn' style={{ display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <button type="button" id='addcountrybtn' style={{ display: "none" }} onClick={() => { financialstatus === 'Active' ? window.location.href = "./AddCountry" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-4">Add Country</button>
          </div>
        </div>
        <div className="container-fluid">
          <div className="card mb-0">
            <article className={`card-body py-1`}>
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
      <Footer theme={themetype} />
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
              <div>
                <label
                  htmlFor="user_name"
                  className=" col-form-label font-weight-normal">
                  <span >Select the file</span>
                </label>
                <div>
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
              <button type="button"
                onClick={handleClick}
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
          <div className={`modal-content`}>
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
                    <h5>This data already exist</h5>
                    <table style={{ color: "red" }}>
                      <thead>
                        <tr>
                          <th style={styleborder}>country_code</th>
                          <th style={styleborder}>country_id</th>
                          <th style={styleborder}>country_name</th>
                          <th style={styleborder}>country_phonecode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          duplicateData.map((d, index) => (

                            <tr key={index} style={styleborder}>
                              <td style={styleborder}>{d.country_code}</td>
                              <td style={styleborder}>{d.country_id}</td>
                              <td style={styleborder}>{d.country_name}</td>
                              <td style={styleborder}>{d.country_phonecode}</td>
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
                <thead><tr>
                  <th style={styleborder}>country_code</th>
                  <th style={styleborder}>country_id</th>
                  <th style={styleborder}>country_name</th>
                  <th style={styleborder}>country_phonecode</th>
                </tr>
                </thead>
                <tbody>
                  {
                    importdata.map((d, index) => (
                      <tr key={index} style={styleborder}>
                        <td style={styleborder}>{d.country_code}</td>
                        <td style={styleborder}>{d.country_id}</td>
                        <td style={styleborder}>{d.country_name}</td>
                        <td style={styleborder}>{d.country_phonecode}</td>
                      </tr>
                    ))
                  }</tbody>
                <tfoot></tfoot>
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

export default ShowCountry
