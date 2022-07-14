import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { TotalCustomers, DeleteCustomer, ImportCustomer, Getfincialyearid, CustomerIdmid, IdcountMaster, Checkmidvalid, UpdateIdcountmaster } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../excelformate/tbl_customer.xlsx';
import * as XLSX from "xlsx";


const columns = [
  {
    name: 'Name',
    selector: 'cust_name',
    sortable: true
  },
  {
    name: 'Company Name',
    selector: 'company_name',
    sortable: true
  },
  {
    name: 'Email',
    selector: 'cust_email',
    sortable: true
  },
  {
    name: 'Phone Number',
    selector: 'cust_phone',
    sortable: true
  },
  {
    name: 'GST',
    selector: 'gst_treatment',
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
          await DeleteCustomer(row.sno, status, localStorage.getItem("Organisation"))
          window.location.href = 'TotalCustomer'
        }
        }>
          <option selected disabled hidden> {row.status}</option>
          <option value='Active'>Active</option>
          <option value='Deactive' >Deactive</option>
        </select>
      </div>
    ]
  },
  // {
  //     name:'Active',
  //     selector: 'status',
  //     sortable: true,
  //     cell: (row) => [
  //         <input type='checkbox' checked={row.status == 'Active'} value={row.status} onClick = {async(e) =>
  //           {
  //             console.log(e.target.value)
  //             if(row.status == 'Active'){
  //               const checkvalue ='Deactive'
  //               await DeleteCustomer(row.sno,checkvalue)
  //                   window.location.href='TotalCustomer'

  //             }
  //             else{
  //               const checkvalue ='Active'
  //               await DeleteCustomer(row.sno,checkvalue)
  //                   window.location.href='TotalCustomer'
  //             }
  //            }} />
  //     ]
  //   },
  {
    name: "Actions",
    sortable: false,
    selector: "null",
    cell: (row) => [
      <a title='View Document' href="EditCustomer">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('CustSno', `${row.sno}`)} >Edit</button></a>
    ]
  }
]



const TotalCustomer = () => {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [duplicateData, setDuplicateDate] = useState([])
  const [backenddata, setBackenddata] = useState(false);
  const [year, setYear] = useState();
  const [idcount, setIdcount] = useState();
  const [newcountid, setNewcountid] = useState(0);
  const [newmcountid, setNewmcountid] = useState(0);
  const [newmidcount, setNewmidcount] = useState();
  var mcountid = parseInt(newmcountid);
  var countid = parseInt(newcountid);


  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    // document.getElementById("uploadbtn").disabled = true;
    // importdata.map((d) => {

    //   if (!existing || !d.cust_type || !d.cust_name || !d.company_name || !d.cust_email || !d.cust_work_phone || !d.cust_phone || !d.gst_treatment || !d.pan_no || !d.place_of_supply || !d.tax_preference || !d.currency) {
    //     setErrorno(errorno++);
    //   }
    // })

    let ayy = [];
    importdata.map((d) => {
      if (d.existing === 'y') {
        ayy.push(d.mast_id)
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {


      const result = await Checkmidvalid(ayy, localStorage.getItem('Organisation'));
      // ######## Check which data does not exist    ##########
      const duplicate = (ayy, result) => {
        let res = []
        res = ayy.filter(el => {
          return !result.find(obj => {
            return el === obj.master_id
          })
        })
        return res
      }
      const duplicatearry = duplicate(ayy, result);
      setDuplicateDate(duplicatearry)
      //    #############################################

      if (duplicatearry.length > 0) {
        setBackenddata(true)
      }
      else {


        for (let i = 0; i < importdata.length; i++) {
          let custid = newcountid;

          if (importdata[i].existing === 'y') {
            const getcustidfro = async () => {
              const countids = await IdcountMaster(localStorage.getItem('Organisation'), importdata[i].mast_id)

              console.log('countids', countids[0].id_count)

              let numid = Number(countids[0].id_count);
              numid = numid;
              var increid = numid + 1;
              // console.log('increid', increid)
              increid = '' + increid;
              increid = increid.padStart(4, '0');
              const generatecust = "CUST" + year + increid;
              console.log("importdata[i].mast_id", importdata[i].mast_id, generatecust)

              Object.assign(importdata[i], { "cust_id": generatecust })
              const updatecount = await UpdateIdcountmaster(localStorage.getItem('Organisation'), importdata[i].mast_id, increid)
              console.log(updatecount)


              // console.log('updatecount',updatecount[0])
              // setNewmidcount(countids)          
            }
            getcustidfro()

          }
          else if (importdata[i].existing === 'n') {
            let mcustidy = mcountid + 1;
            mcountid = mcountid + 1;
            mcustidy = '' + mcustidy;
            mcustidy = mcustidy.padStart(4, '0');
            let custidy = 0 + 1
            countid = countid + 1;
            custidy = '' + custidy;
            custidy = custidy.padStart(4, '0');
            // console.log(custidy)

            const generatemcust = "MCUST" + year + mcustidy;
            const generatecust = "CUST" + year + custidy;
            // console.log(generatemcust, generatecust)
            Object.assign(importdata[i], { "cust_id": generatecust }, { "mast_id": generatemcust })
            // console.log(importdata[i])
          }
          else {
            alert("Please! enter existing field in n and y form only");
            window.location.reload();
          }


        }





        console.log("Out", importdata)



      }

    }

    // const wrongmasterid=[];

    //   for (let i = 0; i < importdata.length; i++) {
    //     let custid = newcountid;

    //     if (importdata[i].existing === 'y') {

    //       const getcustidfro = async () => {
    //         // const countids = await CustomerIdmid(localStorage.getItem('Organisation'), importdata[i].master_id)
    //         const countids = await IdcountMaster(localStorage.getItem('Organisation'), importdata[i].mast_id)
    //         // console.log('countids',countids)

    //         if (countids[0] > 0) {
    //           let numid = countids[0];
    //           var increid = numid + 1;
    //              console.log('increid',increid)
    //           increid = '' + increid;
    //           increid = increid.padStart(4, '0');
    //           const generatecust = "CUST" + year + increid;
    //           console.log(generatecust)
    //           // Object.assign(importdata[i], { "cust_id": generatecust })
    //           // setNewmidcount(countids)
    //         }
    //         else {
    //               console.log("value id 0")
    //               wrongmasterid.push(importdata[i].mast_id)
    //         }

    //       }
    //       getcustidfro()

    //     }
    //     else if (importdata[i].existing === 'n') {
    //       let mcustidy = mcountid + 1;
    //       mcountid = mcountid+1;
    //       mcustidy = '' + mcustidy;
    //       mcustidy = mcustidy.padStart(4, '0');
    //       let custidy = 0 + 1
    //       countid = countid+1;
    //       custidy = '' + custidy;
    //       custidy = custidy.padStart(4, '0');
    //       // console.log(custidy)

    //       const generatemcust = "MCUST" + year + mcustidy;
    //       const generatecust = "CUST" + year + custidy;
    //       console.log(generatemcust,generatecust)
    //       Object.assign(importdata[i], { "cust_id": generatecust }, { "mast_id": generatemcust })
    //       // console.log(importdata[i])
    //     }
    //     else { 
    //       alert("Please enter customer is existing or not")
    //     }

    //   }

    // if(wrongmasterid.length > 0){
    //   console.log("in if")
    //   alert("Wrong Master id")
    // }
    // else{
    //   console.log("in else")
    //   console.log("wrongmasterid",wrongmasterid.length)
    //   console.log("wrongmasterid",wrongmasterid)

    // console.log("Out", importdata)
    // }




    // setTimeout(async () => {
    //   const result = await ImportCustomer(importdata, localStorage.getItem("Organisation"), localStorage.getItem("User_id"));
    //   console.log(result)
    //   if (!(result == "Data Added")) {
    //     setBackenddata(true);
    //     setDuplicateDate(result)

    //   }
    //   else if (result == "Data Added") {
    //     document.getElementById("showdataModal").style.display = "none";
    //     setBackenddata(false);
    //     alert("Data Added")
    //     window.location.reload()
    //   }
    // }, 5000);

    // }

  };
  //##########################   Upload data end  #################################
  //##########################  for convert array to json start  #################################

  const handleClick = () => {
    const array = JSON.stringify(importdata)
    const datas = JSON.parse(array)
    setImportdata(datas);
    console.log(datas);
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
    let getids = await Getfincialyearid(localStorage.getItem('Organisation'))
    console.log(getids)
    setYear(getids[0].year);
    setNewmcountid(getids[0].mcust_count)
    setNewcountid(getids[0].cust_count)
    const result = await TotalCustomers(localStorage.getItem("Organisation"))
    setData(result)

  }, [])

  const tableData = {
    columns,
    data
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./Customer" }} className="btn btn-primary">Add Customer</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} onClick={() => { window.location.href = "#" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">Total Customer</h3>
              <br />
              <div className="row ">
                <div className="col ml-0">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <DataTableExtensions
                        {...tableData}>
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
                      <h5>This Master id does Not exist</h5>
                      <table style={{ color: "red" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid black" }}>Master id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            duplicateData.map((d, index) => (

                              <tr key={index} style={{ border: "1px solid black" }}>
                                <td style={{ border: "1px solid black" }}>{d}</td>
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
                      <th style={{ border: "1px solid black" }}>existing</th>
                      <th style={{ border: "1px solid black" }}>Master Id</th>
                      <th style={{ border: "1px solid black" }}>Cust Type</th>
                      <th style={{ border: "1px solid black" }}>Cust Name</th>
                      <th style={{ border: "1px solid black" }}>Company Name</th>
                      <th style={{ border: "1px solid black" }}>Cust Display Name</th>
                      <th style={{ border: "1px solid black" }}>Cust Email</th>
                      <th style={{ border: "1px solid black" }}>Cust Work Phone</th>
                      <th style={{ border: "1px solid black" }}>Cust Phone</th>
                      <th style={{ border: "1px solid black" }}>Skype Detail</th>
                      <th style={{ border: "1px solid black" }}>Designation</th>
                      <th style={{ border: "1px solid black" }}>Department</th>
                      <th style={{ border: "1px solid black" }}>Website</th>
                      <th style={{ border: "1px solid black" }}>GST Treatment</th>
                      <th style={{ border: "1px solid black" }}>GST uin</th>
                      <th style={{ border: "1px solid black" }}>Pan No</th>
                      <th style={{ border: "1px solid black" }}>Place of Supply</th>
                      <th style={{ border: "1px solid black" }}>TAX Preference</th>
                      <th style={{ border: "1px solid black" }}>Exemption Reason</th>
                      <th style={{ border: "1px solid black" }}>Currency</th>
                      <th style={{ border: "1px solid black" }}>Opening balance</th>
                      <th style={{ border: "1px solid black" }}>Payment terms</th>
                      <th style={{ border: "1px solid black" }}>Enable Portal</th>
                      <th style={{ border: "1px solid black" }}>Portal Language</th>
                      <th style={{ border: "1px solid black" }}>Facebook URL</th>
                      <th style={{ border: "1px solid black" }}>Twitter URL</th>
                      <th style={{ border: "1px solid black" }}>Billing Address Attention</th>
                      <th style={{ border: "1px solid black" }}>Billing Address Country</th>
                      <th style={{ border: "1px solid black" }}>Billing Address City</th>
                      <th style={{ border: "1px solid black" }}>Billing Address State</th>
                      <th style={{ border: "1px solid black" }}>Billing Address Pincode</th>
                      <th style={{ border: "1px solid black" }}>Billing Address Phone</th>
                      <th style={{ border: "1px solid black" }}>Billing Address Fax</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Name</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Email</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Work Phone</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Phone</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Skype</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Designation</th>
                      <th style={{ border: "1px solid black" }}>Contact Person Department</th>
                      <th style={{ border: "1px solid black" }}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      importdata.map((d, index) => (
                        <tr key={index} style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{d.existing}</td>
                          <td style={{ border: "1px solid black" }}>{d.mast_id}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_type}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.company_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_display_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_email}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_work_phone}</td>
                          <td style={{ border: "1px solid black" }}>{d.cust_phone}</td>
                          <td style={{ border: "1px solid black" }}>{d.skype_detail}</td>
                          <td style={{ border: "1px solid black" }}>{d.designation}</td>
                          <td style={{ border: "1px solid black" }}>{d.department}</td>
                          <td style={{ border: "1px solid black" }}>{d.website}</td>
                          <td style={{ border: "1px solid black" }}>{d.gst_treatment}</td>
                          <td style={{ border: "1px solid black" }}>{d.gstin_uin}</td>
                          <td style={{ border: "1px solid black" }}>{d.pan_no}</td>
                          <td style={{ border: "1px solid black" }}>{d.place_of_supply}</td>
                          <td style={{ border: "1px solid black" }}>{d.tax_preference}</td>
                          <td style={{ border: "1px solid black" }}>{d.exemption_reason}</td>
                          <td style={{ border: "1px solid black" }}>{d.currency}</td>
                          <td style={{ border: "1px solid black" }}>{d.opening_balance}</td>
                          <td style={{ border: "1px solid black" }}>{d.payment_terms}</td>
                          <td style={{ border: "1px solid black" }}>{d.enable_portal}</td>
                          <td style={{ border: "1px solid black" }}>{d.portal_language}</td>
                          <td style={{ border: "1px solid black" }}>{d.facebook_url}</td>
                          <td style={{ border: "1px solid black" }}>{d.twitter_url}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_attention}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_country}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_city}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_state}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_pincode}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_phone}</td>
                          <td style={{ border: "1px solid black" }}>{d.billing_address_fax}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_name}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_email}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_work_phone}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_phone}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_skype}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_designation}</td>
                          <td style={{ border: "1px solid black" }}>{d.contact_person_department}</td>
                          <td style={{ border: "1px solid black" }}>{d.remark}</td>

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
                id='uploadbtn'
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

export default TotalCustomer