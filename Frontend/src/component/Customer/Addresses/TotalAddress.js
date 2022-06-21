import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { ShowCustAddress,DeleteCustAddress ,SelectCustAddress,Importcustaddress} from '../../../api';
// import Excelfile from '';
import * as XLSX from "xlsx";
import './TotalAddress.css';
const columns = [
  {
    name: 'Attention',
    selector: 'billing_address_attention',
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
    name: 'Status',
    sortable: true,
    selector: 'null',
    cell: (row) => [
      <div className='droplist'>
        <select onChange={async (e) => {
          const status = e.target.value;
          await DeleteCustAddress(row.sno, status,localStorage.getItem("Organisation"));
          window.location.href = 'TotalCustAddress'
        }
        }>
          <option selected disabled hidden> {row.status}</option>
          <option value='Active'>Active</option>
          <option value='DeActive' >Deactive</option>
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
  //             await DeleteCustAddress(row.sno,checkvalue)
  //                 window.location.href='TotalCustAddress'

  //           }
  //           else{
  //             const checkvalue ='Active'
  //             await DeleteCustAddress(row.sno,checkvalue)
  //                 window.location.href='TotalCustAddress'
  //           }
  //          }} />
  //   ]
  // },

  {
    name: "Actions",
    sortable: false,

    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditAddress">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('EditAddress', `${row.sno}`)} >Edit</button></a>

    ]
  }


]
const TotalCustAddress = () => {

  const [data, setData] = useState([])
  const [selectedCust_id, setSelectedCust_id] = useState([])
  const [cust_name, setCust_Name] = useState()
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);


    //##########################  Upload data start  #################################

    const uploaddata = async () => {
      // importdata.map((d) => {
  
      //   if (!d.cust_type || !d.cust_name || !d.company_name || !d.cust_email || !d.cust_work_phone || !d.cust_phone || !d.gst_treatment || !d.pan_no || !d.place_of_supply || !d.tax_preference || !d.currency) {
      //     setErrorno(errorno++);
      //   }
      // })
  
      if (errorno > 0) {
        alert("Please! fill the mandatory data");
        document.getElementById("showdataModal").style.display = "none";
        window.location.reload()
      }
      else {
       
        const result = await Importcustaddress(importdata, localStorage.getItem("Organisation"),localStorage.getItem("User_id"));
        console.log(importdata)
        console.log("result",result)
        if (!(result == "Data Added")) {
          setBackenddata(true);
          setDuplicateDate(result)
          
  
        }
        else if (result == "Data Added") {
          document.getElementById("showdataModal").style.display = "none";
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
      console.log("datas",datas);
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
    // const result = await ShowCustAddress(cust_name)
    // setData(result)
    // setSelectedCust_id([])
  }, [cust_name])

  const handleChange = async (e) => {
    e.preventDefault();
    const cust_entered_name = document.getElementById('cust_entered_id').value;
    if (!cust_entered_name) {
      setSelectedCust_id([])
    } else {
      const result = await SelectCustAddress(cust_entered_name,localStorage.getItem("Organisation"))
      setSelectedCust_id(result)
    }
  }


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
        <Menu />
        <div>
          <div className="content-wrapper">
            <div className="container-fluid" style={{position:"relative"}}>
            <button type="button"style={{float:"right",marginRight:'10%',marginTop:'3%'}} onClick={()=>{window.location.href="./AddCustAddress"}} className="btn btn-primary">Add Address</button>
            <button type="button"style={{float:"right",marginRight:'3%',marginTop:'3%'}} className="btn btn-success"  data-toggle="modal" data-target="#exampleModal">Import Customer Address</button>
                <br/>
              <h3 className="text-left ml-5">Customer Address</h3>
              <form className="form-inline" style={{ marginLeft: "50px" }}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" id="cust_entered_id" aria-label="Search" onChange={handleChange} autoComplete="off" />
               
                <ul className="ulstyle" >
                <div style={{height:"300px",overflow:"auto"}}>
                  {
                    selectedCust_id.map((value) => (
                      <li className="liststyle"><a onClick={
                        async (e) => { e.preventDefault(); const result = await ShowCustAddress(value.cust_name,localStorage.getItem("Organisation")); setData(result); if (result) { setSelectedCust_id([]) } }}>{value.cust_name}</a></li>
                      // <li className="liststyle"><a onClick={()=>{setCust_Name(value.cust_name)}}>{value.cust_name}</a></li>

                    ))
                  }
                  </div>
                </ul>
                      {
                      /* <select id="myselect" className="selectpicker" data-live-search="true" placeholder="please type" data-live-Search-Placeholder="search" onChange={handleChange} >
                        {
                          data.map((value)=>(
                            <option>{value.cust_name}</option>
                          ) )
                        }
                       
                      </select> */
                      }
                 {/* <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleClick} type="button">Search</button> */}
               </form>
              <br/>
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
                    className=" col-form-label font-weight-normal">
                    <span >Select the file</span>
                  </label>
                  <div className=" ">
                    <input
                      id=""
                      type="file"
                      onChange={onChange}
                      className="form-control "
                      required
                      accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                  </div><br />
                  <span style={{ color: "red" }}>
                    {/* <a href={Excelfile} download> Download formate</a> */}
                  </span><br />
                </div>
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
              <div className="" style={{ margin: "0px 8px", overflow: "auto" }}>

                {

                  backenddata ?
                    <>
                      <h5>This data already exist</h5>
                      <table style={{ color: "red" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid black" }}>cust_id</th>
                            <th style={{ border: "1px solid black" }}>cust_name</th>
                            <th style={{ border: "1px solid black" }}>gst_no</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            duplicateData.map((d, index) => (
                              

                              <tr key={index} style={{ border: "1px solid black" }}>
                                <td style={{ border: "1px solid black" }}>{d.cust_id}</td>
                                <td style={{ border: "1px solid black" }}>{d.cust_name}</td>
                                <td style={{ border: "1px solid black" }}>{d.gst_no}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                        <tfoot></tfoot>
                        
                      </table>
                      <br /><br />
                    </>
                    : null
                }

                <table >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid black" }}>cust_id</th>
                      <th style={{ border: "1px solid black" }}>cust_name</th>
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
                          <td style={{ border: "1px solid black" }}>{d.cust_id}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_name}</td>
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
      </div>
    </div>
  )
}


export default TotalCustAddress;
