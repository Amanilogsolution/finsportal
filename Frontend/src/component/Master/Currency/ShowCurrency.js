import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Totalcurrency, ImportCurrency, deleteCurrency, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../../excelformate/tbl_currency.xlsx';
import * as XLSX from "xlsx";
import customStyles from '../../customTableStyle'


const ShowCurrency = () => {
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
      name: 'Currency Name',
      selector: 'currency_name',
      sortable: true
    },
    {
      name: 'Currency Code',
      selector: 'currency_code',
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: "null",
      cell: (row) => [
        <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
          <select onChange={async (e) => {
            const status = e.target.value;
            await deleteCurrency(row.sno, status, localStorage.getItem("Organisation"))
            window.location.href = 'ShowCurrency'
          }}>
            <option hidden value={row.status}> {row.status}</option>
            <option>Active</option>
            <option>Deactive</option>
          </select>
        </div>
      ]
    },
    {
      name: "Action",
      sortable: false,
      selector: "null",
      cell: (row) => [

        <a title='View Document' href="EditCurrency" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
          <button className="editbtn btn-success px-1" onClick={() => localStorage.setItem('CurrencySno', `${row.sno}`)} >Edit</button></a>
      ]
    }
  ]



  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    document.getElementById("uploadbtn").disabled = true;
    importdata.map((d) => {
      if (!d.country_name || !d.currency_code || !d.currency_name) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportCurrency(importdata, localStorage.getItem("Organisation"), localStorage.getItem("User_id"));
      if (!(result === "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result === "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.href = 'ShowCurrency'
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
      const result = await Totalcurrency(localStorage.getItem('Organisation'))
      setData(result);

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addcurrencybtn').style.background = '#7795fa';
      }


      const UserRights = await getUserRolePermission(localStorage.getItem('Organisation'), localStorage.getItem('Role'), 'currency')
      if (UserRights.currency_create === 'true') {
        document.getElementById('addcurrencybtn').style.display = "block";
        document.getElementById('uploadcurrencybtn').style.display = "block";
      }
      if (UserRights.currency_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }
      if (UserRights.currency_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";
        }
      }
    }
    fetchdata();


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
        <button type="button" id='addcurrencybtn' style={{ float: "right", marginRight: '10%', marginTop: '1%', display: "none" }} onClick={() => {  financialstatus !== 'Lock' ? window.location.href = "./AddCurrency": alert('You cannot Add in This Financial Year')  }} className="btn btn-primary">Add Currency</button>
        <button type="button" id='uploadcurrencybtn' style={{ float: "right", marginRight: '2%', marginTop: '1%', display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
        <div className="container-fluid">
          <br />
          <h3 className="ml-5">Currency</h3>
          <div className="card mb-0">
            <article className={`card-body py-1`} >
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
            <div className={`modal-footer `}>
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
                          duplicateData.map((d) => (
                            <tr style={styleborder}>
                              <td style={styleborder}>{d.country_code}</td>
                              <td style={styleborder}>{d.country_id}</td>
                              <td style={styleborder}>{d.country_name}</td>
                              <td style={styleborder}>{d.country_phonecode}</td>
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
                    <th style={styleborder}>country_code</th>
                    <th style={styleborder}>country_name</th>
                    <th style={styleborder}>currency_code</th>
                    <th style={styleborder}>currency_name</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    importdata.map((d) => (
                      <tr style={styleborder}>
                        <td style={styleborder}>{d.country_code}</td>
                        <td style={styleborder}>{d.country_name}</td>
                        <td style={styleborder}>{d.currency_code}</td>
                        <td style={styleborder}>{d.currency_name}</td>

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
export default ShowCurrency