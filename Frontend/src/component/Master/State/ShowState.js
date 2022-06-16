import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { getstates } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deletestate, ImportState } from '../../../api';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/tbl_states.xlsx';



const columns = [
  {
    name: 'Country Name',
    selector: 'country_name',
    sortable: true
  },
  {
    name: 'State Name',
    selector: 'state_name',
    sortable: true
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
    name: 'Status',
    sortable: true,
    selector: 'null',
    cell: (row) => [
      <div className='droplist'>
        <select onChange={async (e) => {
          const status = e.target.value;
          await deletestate(row.sno, status)
          window.location.href = 'ShowState'
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
  //             await deletestate(row.sno,checkvalue)
  //                 window.location.href='ShowState'

  //           }
  //           else{
  //             const checkvalue ='Active'
  //             await deletestate(row.sno,checkvalue)
  //                 window.location.href='ShowState'
  //           }
  //          }} />
  //   ]
  // },
  {
    name: "Actions",
    sortable: false,

    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditState">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('stateSno', `${row.sno}`)} >Edit</button></a>

    ]
  }
];


const ShowState = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);

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
      const result = await ImportState(importdata);
      console.log(result.length)
      if (!(result == "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result == "Data Added") {
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
    console.log(datas)
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
      console.log("excel", result)
      setImportdata(result);
    };
    reader.readAsBinaryString(file);
  };
  //##########################  for convert excel to array end #################################


  useEffect(async () => {
    const result = await getstates();
    setData(result)
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
  }

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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '3%' }} onClick={() => { window.location.href = "./StateMaster" }} className="btn btn-primary">Add State</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '3%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>

            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">State</h3>
              <br />
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <DataTableExtensions
                        {...tableData} >
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
        {/* ------------------ Modal start -----------------------------*/}\
        {/* <Modal excel={Excelfile} importdatas={setImportdata} /> */}
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
                      <h5>This data already exist</h5>
                      <table style={{ color: "red", margin: "auto" }}>
                        <thead>
                          <tr>
                            {/* <th style={{ border: "1px solid black" }}>country_name</th> */}
                            <th style={{ border: "1px solid black" }}>state_name</th>
                            <th style={{ border: "1px solid black" }}>state_code</th>
                            <th style={{ border: "1px solid black" }}>state_short_name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            duplicateData.map((d) => (

                              <tr style={{ border: "1px solid black" }}>
                                {/* <td style={{ border: "1px solid black" }}>{d.country_name}</td> */}
                                <td style={{ border: "1px solid black", textAlign: "center" }}>{d.state_name}</td>
                                <td style={{ border: "1px solid black", textAlign: "center" }}>{d.state_code}</td>
                                <td style={{ border: "1px solid black", textAlign: "center" }}>{d.state_short_name}</td>
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
                      <th style={{ border: "1px solid black" }}>country_name</th>
                      <th style={{ border: "1px solid black" }}>state_name</th>
                      <th style={{ border: "1px solid black" }}>state_code</th>
                      <th style={{ border: "1px solid black" }}>state_short_name</th>
                    </tr>

                  </thead>
                  <tbody>
                    {
                      importdata.map((d) => (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{d.country_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.state_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.state_code}</td>
                          <td style={{ border: "1px solid black" }}>{d.state_short_name}</td>

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
    </div>
  )
}

export default ShowState
