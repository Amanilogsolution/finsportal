import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { totalLocation, Locationstatus, ImportLocationMaster,ImportLocationAddress } from '../../../api';
import DataTable from 'react-data-table-component';
import Addbtn from '../../../images/add-btn.png'
import Editbtn from '../../../images/edit.png'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/tbl_location_master.xlsx';
import Excelfile2 from '../../../excelformate/tbl_location_address.xlsx';


const columns = [
  {
    name: 'Location Name',
    selector: 'location_name',
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
    name: 'Contact Phone1',
    selector: 'contact_phone_no1',
    sortable: true
  },

  {
    name: 'Contact Name2',
    selector: 'contact_name2',
    sortable: true
  },

  // {
  //   name: 'Contact Phone2',
  //   selector: 'contact_phone_no2',
  //   sortable: true
  // },
  {
    name: 'Status',
    sortable: true,
    selector: 'null',
    cell: (row) => [
      <div className='droplist'>
        <select onChange={async (e) => {
          const org = localStorage.getItem("Organisation");
          const status = e.target.value;
          await Locationstatus(org, row.location_id, status)
          window.location.href = 'TotalLocation'
        }
        }>
          <option selected disabled hidden> {row.status}</option>
          <option >Active</option>
          <option >DeActive</option>
        </select>
      </div>
    ]
  },

  {
    name: "Actions",
    sortable: false,
    selector: "null",
    cell: (row) => [

      <a title='Edit Location' href="EditLocation">
        <button className="editbtn btn-success "
          onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
        >Edit</button></a>,
      <a title='View Document' href="AddOrgAddress">
      <button type="button" class="btn " data-toggle="tooltip" data-placement="top" title="Add location Address"
      onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}>
        <img src={Addbtn} style={{ width: "20px", height: "20px" }} alt="add Icon" />
      </button></a>,
      <a title='View Document' href="EditOrgAddress">
       <button type="button" class="btn " data-toggle="tooltip" data-placement="top" title="Edit location Address"
       onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}>
        <img src={Editbtn} style={{ width: "20px", height: "20px" }} alt="Edit Icon" />
      </button></a>

      // <a title='View Document' href="EditLocation">
      //   <button className="editbtn btn-success "
      //    onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
      //     >Edit</button></a>,
      //   <a title='View Document' href="AddOrgAddress">
      //   <button className="editbtn btn-success ml-2"
      //   onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
      //    >Add Address</button></a>,
      //  <a title='View Document' href="EditOrgAddress">
      //  <button className="editbtn btn-success ml-2"
      //   onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
      //    >Edit Address</button></a>,
    ]
  }
]


const TotalLocation = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [btntype, setBtntype] = useState(true);



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
          console.log(result)
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
          console.log(result)
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
      console.log(result)
    };
    reader.readAsBinaryString(file);
  };
  //##########################  for convert excel to array end #################################



  useEffect(() => {
    async function fetchdata() {
      const result = await totalLocation(localStorage.getItem('Organisation'))
      console.log(result)
      setData(result)
    }
    fetchdata();
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./AddLocation" }} className="btn btn-primary">Add Location</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal" onClick={btntype1}>Import Location</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal" onClick={btntype2}>Import Location Address</button>

            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">Location</h3>
              <br />
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
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
                        <th style={{ border: "1px solid black" }}>location_name</th>
                        <th style={{ border: "1px solid black" }}>gstin_no</th>
                        <th style={{ border: "1px solid black" }}>location_id</th>
                        <th style={{ border: "1px solid black" }}>contact_name1</th>
                        <th style={{ border: "1px solid black" }}>contact_name2</th>
                        <th style={{ border: "1px solid black" }}>contact_phone_no1</th>
                        <th style={{ border: "1px solid black" }}>contact_phone_no2</th>
                      </tr>

                    </thead>
                    <tbody>
                      {
                        importdata.map((d) => (
                          <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>{d.location_name}</td>
                            <td style={{ border: "1px solid black" }}>{d.gstin_no}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_id}</td>
                            <td style={{ border: "1px solid black" }}>{d.contact_name1}</td>
                            <td style={{ border: "1px solid black" }}>{d.contact_name2}</td>
                            <td style={{ border: "1px solid black" }}>{d.contact_phone_no1}</td>
                            <td style={{ border: "1px solid black" }}>{d.contact_phone_no2}</td>

                          </tr>
                        ))
                      }</tbody>
                    <tfoot></tfoot>
                  </table>
                  :
                  <table >
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black" }}>location_id</th>
                        <th style={{ border: "1px solid black" }}>location_name</th>
                        <th style={{ border: "1px solid black" }}>gstin_no</th>
                        <th style={{ border: "1px solid black" }}>location_add1</th>
                        <th style={{ border: "1px solid black" }}>location_add2</th>
                        <th style={{ border: "1px solid black" }}>location_city</th>
                        <th style={{ border: "1px solid black" }}>location_state</th>
                        <th style={{ border: "1px solid black" }}>location_pin</th>
                        <th style={{ border: "1px solid black" }}>location_country</th>
                        <th style={{ border: "1px solid black" }}>from_date</th>
                        <th style={{ border: "1px solid black" }}>to_date</th>
                      </tr>

                    </thead>
                    <tbody>
                      {
                        importdata.map((d) => (
                          <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>{d.location_id}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_name}</td>
                            <td style={{ border: "1px solid black" }}>{d.gstin_no}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_add1}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_add2}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_city}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_state}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_pin}</td>
                            <td style={{ border: "1px solid black" }}>{d.location_country}</td>
                            <td style={{ border: "1px solid black" }}>{d.from_date}</td>
                            <td style={{ border: "1px solid black" }}>{d.to_date}</td>

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

export default TotalLocation

