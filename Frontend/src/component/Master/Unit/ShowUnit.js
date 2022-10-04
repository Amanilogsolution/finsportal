import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalUnit, deleteUnit, ImportUnit, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../../excelformate/unit Formate.xlsx';
import * as XLSX from "xlsx";


const ShowUnit = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);

  const themetype = localStorage.getItem('themetype')

const columns = [
  {
    name: 'Unit Name',
    selector: 'unit_name',
    sortable: true
  },
  {
    name: 'Unit Symbol',
    selector: 'unit_symbol',
    sortable: true
  },

  {
    name: 'Status',
    selector: 'null',
    cell: (row) => [

      <div className='droplist' id={`deletebtn${row.sno}`} style={{ display: "none" }}>
        <select className={`bg-${themetype}`} onChange={async (e) => {
          const status = e.target.value;
          await deleteUnit(row.sno, status, localStorage.getItem('Organisation'))
          window.location.href = 'ShowUnit'
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

      <a title='View Document' id={`editbtn${row.sno}`} href="EditUnit" style={{ display: "none" }}>
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('unitSno', `${row.sno}`)} >Edit</button></a>

    ]
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


  useEffect(async () => {
    const Token = localStorage.getItem('Token')
    const org = localStorage.getItem('Organisation');
    const result = await TotalUnit(Token, org)
    setData(result)

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'unit')
    if (UserRights.unit_create === 'true') {
      document.getElementById('addunitbtn').style.display = "block"
      document.getElementById('uploadunitbtn').style.display = "block"
    }
    if (UserRights.unit_edit === 'true') {
      for (let i = 0; i < result.length; i++) {
        document.getElementById(`editbtn${result[i].sno}`).style.display = "block"
      }
    }
    if (UserRights.unit_delete === 'true') {
      for (let i = 0; i < result.length; i++) {
        document.getElementById(`deletebtn${result[i].sno}`).style.display = "block"
      }
    }


  }, [])

  const tableData = {
    columns, data
  };
  const styleborder = {
    border: "1px solid black"
  }

  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themetype}`}>
            <button type="button" id='addunitbtn' style={{ float: "right", marginRight: '10%', marginTop: '2%',display:"none" }} onClick={() => { window.location.href = "./AddUnit" }} className="btn btn-primary">Add Unit</button>
            <button type="button" id='uploadunitbtn' style={{ float: "right", marginRight: '2%', marginTop: '2%',display:"none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">Unit</h3>
              <br />
              <div className="row ">
                <div className="col">
                  <div className="card">
                    <article className={`card-body bg-${themetype}`}>
                      <DataTableExtensions
                        {...tableData}>
                        <DataTable
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                          theme={themetype}
                        />
                      </DataTableExtensions>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themetype}/>
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
            <div className={`modal-content bg-${themetype}`}>
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
              <div className={`modal-body bg-${themetype}`}>

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
                      className={`form-control bg-${themetype}`}
                      onChange={onChange}
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

          <div className="" style={{ height: "550px", width: "50%", overflow: "auto", margin: "auto" }}>
            <div className={`modal-content bg-${themetype}`}>
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
            <div className={`modal-footer bg-${themetype}`} style={{ background: "white" }}>
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
    </div>
  )
}

export default ShowUnit
