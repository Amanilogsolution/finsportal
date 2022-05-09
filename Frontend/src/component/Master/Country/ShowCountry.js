import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Totalcountry } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../../excelformate/tbl_currency.xlsx';
import { deletecountry, ImportCountry, CheckimportCountry } from '../../../api';
import * as XLSX from "xlsx";


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
        <select onChange={async (e) => {
          const status = e.target.value;
          await deletecountry(row.sno, status)
          window.location.href = 'ShowCountry'
        }
        }>
          <option selected disabled hidden> {row.status}</option>


          <option value='Active'>Active</option>
          <option value='DeActive' >DeActive</option>
        </select>
      </div>
    ]
  },
  //  {
  //   name:'Active',
  //   selector: 'null',
  //   cell: (row) => [
  //       <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
  //         {
  //           if(row.status == 'Active'){
  //             const checkvalue ='Deactive'
  //             await deletecountry(row.sno,checkvalue)
  //                 window.location.href='ShowCountry'

  //           }
  //           else{
  //             const checkvalue ='Active'
  //             await deletecountry(row.sno,checkvalue)
  //                 window.location.href='ShowCountry'
  //           }
  //          }} />
  //   ]
  // },
  {
    name: "Actions",
    sortable: false,
    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditCountry">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('countrySno', `${row.sno}`)} >Edit</button></a>

    ]
  }
]


const ShowCountry = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);


  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    importdata.map((d) => {
      if (!d.country_code || !d.country_id || !d.country_name || !d.country_phonecode) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await CheckimportCountry(importdata);
      // console.log(result.length)
      if (!(result == "Data Added")) {
        setBackenddata(true);
        setDuplicateDate(result)

      }
      else if (result == "Data Added") {
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
    //  console.log(datas)
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
  useEffect(async () => {
    const result = await Totalcountry(localStorage.getItem('Organisation'))
    setData(result)
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./AddCountry" }} className="btn btn-primary">Add Country</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">Country</h3>
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
          tabindex="-1"
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
        <div class="modal fade bd-example-modal-lg "
          id="showdataModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >

          <div class="" style={{ height: "550px", width: "50%", overflow: "auto", margin: "auto" }}>
            <div class="modal-content">
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
                          <th style={{ border: "1px solid black" }}>country_code</th>
                          <th style={{ border: "1px solid black" }}>country_id</th>
                          <th style={{ border: "1px solid black" }}>country_name</th>
                          <th style={{ border: "1px solid black" }}>country_phonecode</th>
                        </thead>
                        <tbody>
                          {
                            duplicateData.map((d) => (

                              <tr style={{ border: "1px solid black" }}>
                                <td style={{ border: "1px solid black" }}>{d.country_code}</td>
                                <td style={{ border: "1px solid black" }}>{d.country_id}</td>
                                <td style={{ border: "1px solid black" }}>{d.country_name}</td>
                                <td style={{ border: "1px solid black" }}>{d.country_phonecode}</td>
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
                    <th style={{ border: "1px solid black" }}>country_code</th>
                    <th style={{ border: "1px solid black" }}>country_id</th>
                    <th style={{ border: "1px solid black" }}>country_name</th>
                    <th style={{ border: "1px solid black" }}>country_phonecode</th>
                  </thead>
                  <tbody>
                    {
                      importdata.map((d) => (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{d.country_code}</td>
                          <td style={{ border: "1px solid black" }}>{d.country_id}</td>
                          <td style={{ border: "1px solid black" }}>{d.country_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.country_phonecode}</td>
                        </tr>
                      ))
                    }</tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
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
      </div>
    </div>
  )
}

export default ShowCountry
