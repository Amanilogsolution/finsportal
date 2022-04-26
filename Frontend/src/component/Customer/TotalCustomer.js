import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { TotalCustomers, DeleteCustomer } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelfile from '../../excelformate/tbl_currency.xlsx';
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
          await DeleteCustomer(row.sno, status)
          window.location.href = 'TotalCustomer'
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

  //##########################  for convert array to json start  #################################

  const handleClick = () => {
    const array = JSON.stringify(importdata)
    const datas = JSON.parse(array)
    // ImportCurrency(datas)
    console.log(datas)
    // window.location.reload()
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
    const result = await TotalCustomers()
    setData(result)
    // console.log(result)
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
                <button type="button" onClick={handleClick} className="btn btn-primary" data-dismiss="modal">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------ Modal end -----------------------------*/}
      </div>
    </div>
  )

}

export default TotalCustomer