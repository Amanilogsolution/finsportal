import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import './TotalAddress.css';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { ShowVendAddress, DeleteVendAddress, SelectVendAddress, Importvendaddress } from '../../../api';
import * as XLSX from "xlsx";
import Excelfile from '../../../excelformate/Vendor Address formate.xlsx'
import customStyles from '../../customTableStyle';

const TotalVendAddress = () => {
  const [data, setData] = useState([])
  const [selectedvendname, setSelectedvendname] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const themetype = localStorage.getItem('themetype')

  useEffect(() => {
    async function fetchdata() {
      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('add-vend_address_btn').style.background = '#7795fa';
      }
    }
    fetchdata()
  }, [])
  const columns = [
    {
      name: 'vend Name',
      selector: 'vend_name',
      sortable: true
    },
    {
      name: 'Attention',
      selector: 'billing_address_attention',
      sortable: true
    },

    {
      name: 'GST',
      selector: 'gst_no',
      sortable: true
    },
    {
      name: 'Country',
      selector: 'billing_address_country',
      sortable: true
    },

    {
      name: 'State',
      selector: 'billing_address_state',
      sortable: true
    },
    {
      name: 'City',
      selector: 'billing_address_city',
      sortable: true
    },
    {
      name: 'Pincode',
      selector: 'billing_address_pincode',
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
            await DeleteVendAddress(row.sno, status, localStorage.getItem('Organisation'))
            window.location.href = 'TotalVendAddress'
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

        <a title='View Document' href="EditVendorAddress">
          <button className="editbtn btn-success px-2" onClick={() => { localStorage.setItem('EditVendorAddresssno', `${row.sno}`) }} >Edit</button></a>

      ]
    }
  ]





  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    importdata.map((d) => {
      if (!d.vend_name || !d.vend_id || !d.billing_address_attention || !d.billing_address_country || !d.billing_address_state || !d.billing_address_city) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {

      for (let i = 0; i < importdata.length; i++) {
        let vendnamrchar = importdata[i].vend_name.substring(0, 3);
        let citychar = importdata[i].billing_address_city.substring(0, 3);
        let vendaddid = vendnamrchar.toUpperCase() + citychar.toUpperCase() + Math.floor(Math.random() * 100000);
        Object.assign(importdata[i], { "vend_addressid": vendaddid })
      }
      const result = await Importvendaddress(importdata, localStorage.getItem("Organisation"), localStorage.getItem("User_id"));
      if (result === "Data Added") {
        setBackenddata(false);
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
      let lines = data.split("\n");

      let result = [];
      let headers = lines[0].split(",");

      for (var i = 1; i < lines.length - 1; i++) {
        let obj = {};
        let currentline = lines[i].split(",");
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

  const handleChange = async (e) => {
    e.preventDefault();

    const vend_name = document.getElementById('vend_name').value;
    if (vend_name.length > 2) {
      const result = await SelectVendAddress(vend_name, localStorage.getItem('Organisation'))
      setSelectedvendname(result)
    }

  }


  const tableData = {
    columns, data
  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className="content-wrapper">
        <button type="button" style={{ marginRight: '10%', marginTop: '3%' }} onClick={() => {financialstatus === 'Active' ? window.location.href = "./AddVendAddress" : alert('You cannot Add in This Financial Year')  }} className="btn btn-primary float-right" id='add-vend_address_btn'>Add Address</button>
        <button type="button" style={{ marginRight: '3%', marginTop: '3%' }} className="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">Import Vendor Address</button>
        <div className="container-fluid ">
          <h3 className="ml-5 pt-4 pb-2">Vendor Address</h3>
          <form className="form-inline ml-4 position-relative" autoComplete="off">
            <label htmlFor='vend_name'>Vendor name:- </label>
            <input className={`form-control mr-sm-2 mx-2`} type="search" placeholder="Enter vendor name" id="vend_name" onChange={handleChange} />
            <ul className=" ulstyle rounded overflow-hidden mt-5" >
              <div className='overflow-auto' style={{ height: "300px" }}>
                {
                  selectedvendname.map((value, index) => (
                    <a key={index} onClick={
                      async (e) => {
                        e.preventDefault();
                        const result = await ShowVendAddress(value.vend_id, localStorage.getItem("Organisation")); setData(result); if (result) { setSelectedvendname([]) }
                      }} ><li className={themetype === 'dark' ? 'darkliststyle' : 'liststyle'} >{value.vend_name}</li></a>
                  ))
                }
              </div>
            </ul>
          </form>
          <br />
          <div className={`card w-100`}>
            <article className="card-body py-0">
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
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="user_name" className=" col-form-label font-weight-normal">Select the file </label>
              <input
                id=""
                type="file"
                onChange={onChange}
                className={`form-control `}
                required
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
              <br />
              <a href={Excelfile} download> Download formate</a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal">Close</button>
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

        <div className="" style={{ height: "550px", width: "95%", overflow: "auto", margin: "auto" }}>
          <div className={`modal-content`}>
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
            <div className="" style={{ margin: "0px 8px", overflow: "auto" }}>
              {
                backenddata ?
                  <>
                    <h5>This data already exist</h5>
                    <table className='text-danger'>
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid black" }}>vend_id</th>
                          <th style={{ border: "1px solid black" }}>vend_name</th>
                          <th style={{ border: "1px solid black" }}>gst_no</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          duplicateData.map((d, index) => (
                            <tr key={index} style={{ border: "1px solid black" }}>
                              <td style={{ border: "1px solid black" }}>{d.vend_id}</td>
                              <td style={{ border: "1px solid black" }}>{d.vend_name}</td>
                              <td style={{ border: "1px solid black" }}>{d.gst_no}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    <br /><br />
                  </>
                  : null
              }

              <table >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>vend_id</th>
                    <th style={{ border: "1px solid black" }}>vend_name</th>
                    <th style={{ border: "1px solid black" }}>gst_no</th>
                    <th style={{ border: "1px solid black" }}>billing_address_attention</th>
                    <th style={{ border: "1px solid black" }}>billing_address_country</th>
                    <th style={{ border: "1px solid black" }}>billing_address_city</th>
                    <th style={{ border: "1px solid black" }}>billing_address_state</th>
                    <th style={{ border: "1px solid black" }}>billing_address_pincode</th>
                    <th style={{ border: "1px solid black" }}>billing_address_phone</th>
                    <th style={{ border: "1px solid black" }}>billing_address_fax</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    importdata.map((d, index) => (
                      <tr key={index} style={{ border: "1px solid black" }}>
                        <td style={{ border: "1px solid black" }}>{d.vend_id}</td>
                        <td style={{ border: "1px solid black" }}>{d.vend_name}</td>
                        <td style={{ border: "1px solid black" }}>{d.gst_no}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_attention}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_country}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_city}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_state}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_pincode}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_phone}</td>
                        <td style={{ border: "1px solid black" }}>{d.billing_address_fax}</td>
                      </tr>
                    ))
                  }</tbody>
              </table>
            </div>
          </div>
          <div className={`modal-footer`}>
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


export default TotalVendAddress;
