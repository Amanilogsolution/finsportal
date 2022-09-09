import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { totalBank, deleteBank, ImportBank } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../../excelformate/Bank_formate.xlsx';
import * as XLSX from "xlsx";

const columns = [

  {
    name: 'Bank Name',
    selector: 'bank_name',
    sortable: true
  },
  {
    name: 'Account Number',
    selector: 'account_no',
    sortable: true
  },
  {
    name: 'Address',
    selector: 'address_line1',
    sortable: true
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
    name: 'City',
    selector: 'city',
    sortable: true
  },
  {
    name: 'Pincode',
    selector: 'pincode',
    sortable: true
  },
  {
    name: 'IFSC Code',
    selector: 'ifsc_code',
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
          await deleteBank(row.sno, status,localStorage.getItem("Organisation"))
          window.location.href = 'TotalBank'
        }
        }>
          <option selected disabled hidden> {row.status}</option>
          <option value='Active'>Active</option>
          <option value='Deactive' >Deactive</option>
        </select>
      </div>
    ]
  },

  {
    name: 'Account Type',
    selector: 'ac_type',
    sortable: true
  },
  {
    name: "Actions",
    sortable: false,

    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditBank">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('BankSno', `${row.sno}`)} >Edit</button>
      </a>

    ]
  }
]

const TotalBank = () => {
  const [data, setData] = useState([]);
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);

  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    document.getElementById("uploadbtn").disabled = true;
    // importdata.map((d) => {
    //   if (!d.bank_name  || !d.branch || !d.country ||!d.state || !d.city || !d.pincode || !d.ifsc_code || !d.ac_type || !d.acname) {
    //     setErrorno(errorno++);
    //   }
    // })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {

      const result = await ImportBank(importdata, localStorage.getItem('Organisation'),localStorage.getItem("User_id"));
      if (!(result === "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)
      }
      else if (result === "Data Added") {
        setBackenddata(false);
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.href = 'TotalBank'
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

  useEffect( () => {
    const fetchdata=async()=>{
    const result = await totalBank(localStorage.getItem('Organisation'));
    setData(result)}
    fetchdata();
  }, [])

  const tableData = {
    columns, data
  }

  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./AddBankList" }} className="btn btn-primary">Add Bank</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Banks</h3>
              <br />
              <div className="row ">
                <div className="col ml-0">
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
                  {/* card.// */}
                </div>
                {/* col.//*/}
              </div>
              {/* row.//*/}
            </div>
          </div>
        </div>
        <Footer />

        {/* ------------------ Modal start -----------------------------*/}\
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

          <div style={{ height: "550px", width: "95%", overflow: "auto", margin: "auto" }}>
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
                      <h5 style={{ margin: "auto" }}>This data already exist</h5>
                      <table style={{ color: "red", textAlign: "center", margin: "auto" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid black" }}>account_no</th>
                            <th style={{ border: "1px solid black" }}>ifsc_code</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            duplicateData.map((d) => (

                              <tr style={{ border: "1px solid black" }}>

                                <td style={{ border: "1px solid black" }}>{d.account_no}</td>
                                <td style={{ border: "1px solid black" }}>{d.ifsc_code}</td>

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
                      <th style={{ border: "1px solid black" }}>ac_type</th>
                      <th style={{ border: "1px solid black" }}>account_code</th>
                      <th style={{ border: "1px solid black" }}>bank_name</th>
                      <th style={{ border: "1px solid black" }}>account_no</th>
                      <th style={{ border: "1px solid black" }}>address_line1</th>
                      <th style={{ border: "1px solid black" }}>address_line2</th>
                      <th style={{ border: "1px solid black" }}>branch</th>
                      <th style={{ border: "1px solid black" }}>Country</th>
                      <th style={{ border: "1px solid black" }}>state</th>
                      <th style={{ border: "1px solid black" }}>city</th>
                      <th style={{ border: "1px solid black" }}>pincode</th>
                      <th style={{ border: "1px solid black" }}>ifsc_code</th>
                      <th style={{ border: "1px solid black" }}>acname</th>
                      <th style={{ border: "1px solid black" }}>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      importdata.map((d) => (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{d.ac_type}</td>
                          <td style={{ border: "1px solid black" }}>{d.account_code}</td>
                          <td style={{ border: "1px solid black" }}>{d.bank_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.account_no}</td>
                          <td style={{ border: "1px solid black" }}>{d.address_line1}</td>
                          <td style={{ border: "1px solid black" }}>{d.address_line2}</td>
                          <td style={{ border: "1px solid black" }}>{d.branch}</td>
                          <td style={{ border: "1px solid black" }}>{d.state}</td>
                          <td style={{ border: "1px solid black" }}>{d.country}</td>
                          <td style={{ border: "1px solid black" }}>{d.city}</td>
                          <td style={{ border: "1px solid black" }}>{d.pincode}</td>
                          <td style={{ border: "1px solid black" }}>{d.ifsc_code}</td>
                          <td style={{ border: "1px solid black" }}>{d.acname}</td>
                          <td style={{ border: "1px solid black" }}>{d.description}</td>


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
export default TotalBank