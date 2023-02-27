import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showcompliances, Compliancestatus, ImportCompliances, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Excelformate from '..//../../excelformate/tbl_compliances.xlsx'
import * as XLSX from "xlsx";
import customStyles from '../../customTableStyle';


function Showcompliances() {
  const [data, setData] = useState([])
  const [importdata, setImportdata] = useState([]);
  let [errorno, setErrorno] = useState(0);
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const themetype = localStorage.getItem('themetype')

  const columns = [
    {
      name: 'Compliance Type',
      selector: row => row.compliance_type,
      sortable: true
    },
    {
      name: 'Nature',
      selector: row => row.nature,
      sortable: true
    },
    {
      name: 'Period',
      selector: row => row.period,
      sortable: true
    },
    {
      name: 'Period name ',
      selector: row => row.period_name,
      sortable: true
    },
    {
      name: 'To Date',
      selector: row => row.to_month,
      sortable: true
    },
    {
      name: 'From Date',
      selector: row => row.from_month,
      sortable: true
    },
    {
      name: 'Due Date',
      selector: row => row.due_date,
      sortable: true
    },
    {
      name: 'Extended Date',
      selector: row => row.extended_date,
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.null,
      cell: (row) => [
        <div className='droplist'  >
          <select className={``} id={`deleteselect${row.sno}`} disabled onChange={async (e) => {
            const org = localStorage.getItem("Organisation")
            const status = e.target.value;
            await Compliancestatus(org, row.sno, status)
            window.location.href = 'Showcompliances'
          }}>
            <option hidden value={row.status}> {row.status}</option>
            <option >Active</option>
            <option >Deactive</option>
          </select>
        </div>
      ]
    },

    {
      name: "Actions",
      sortable: false,
      selector: row => row.null,
      cell: (row) => [

        <a title='Edit Compliances' href="Editcompliances" id={`editactionbtns${row.sno}`} style={{ display: "none" }} >
          <button className="editbtn btn-success "
            onClick={() => localStorage.setItem('ComplianceSno', `${row.sno}`)}
          >Edit</button></a>

      ]
    }


  ]


  //##########################  Upload data start  #################################

  const uploaddata = async () => {
    importdata.map((d) => {
      if (!d.compliance_type || !d.nature || !d.period || !d.from_month || !d.to_month || !d.due_date || !d.extended_date) {
        setErrorno(errorno++);
      }
    })

    if (errorno > 0) {
      alert("Please! fill the mandatory data");
      document.getElementById("showdataModal").style.display = "none";
      window.location.reload()
    }
    else {
      const result = await ImportCompliances(importdata, localStorage.getItem("User_id"), localStorage.getItem('Organisation'));
      if (result === "Data Added") {
        document.getElementById("showdataModal").style.display = "none";
        alert("Data Added")
        window.location.reload()
      }
      else {
        alert("something are Wrong")
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
      const org = localStorage.getItem('Organisation')
      const result = await showcompliances(org)
      setData(result)

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addcompbtn').style.background = '#7795fa';
      }


      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'compliances')
      if (UserRights.compliances_create === 'true') {
        document.getElementById('addcompbtn').style.display = "block"
        document.getElementById('uploadcompbtn').style.display = "block"
      }
      if (UserRights.compliances_edit === 'true') {
        for (var i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }
      if (UserRights.compliances_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).disabled = false

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
        <button type="button" id='addcompbtn' style={{ float: "right", marginRight: '10%', marginTop: '1%', display: "none" }} onClick={() => {financialstatus === 'Active' ?  window.location.href = "./Addcompliances": alert('You cannot Add in This Financial Year')  }} className="btn btn-primary">Add Compliances</button>
        <button type="button" id='uploadcompbtn' style={{ float: "right", marginRight: '2%', marginTop: '1%', display: "none" }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>
        <div className="container-fluid">
          <h3 className="ml-5 py-2" >Compliances</h3>
          <div className="card mt-2 mb-0 w-100" >
            <article className={`card-body py-0 `}>
              <DataTableExtensions
                {...tableData}>
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

      <Footer theme={themetype} />
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
                    className={`form-control `}
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                </div><br />
                <span className='text-danger'>
                  <a href={Excelformate} download> Download formate</a>
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
      <div className="modal fade bd-example-modal-lg "
        id="showdataModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >

        <div className="" style={{ height: "550px", width: "97%", overflow: "auto", margin: "auto" }}>
          <div className={`modal-content `}>
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="exampleModalLabel">
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
            <div className="" style={{ margin: "auto", paddingBottom: "20px", overflow: "auto" }}>

              <table >
                <thead><tr>
                  <th style={styleborder}>compliance_type</th>
                  <th style={styleborder}>nature</th>
                  <th style={styleborder}>period</th>
                  <th style={styleborder}>period_name</th>
                  <th style={styleborder}>from_month</th>
                  <th style={styleborder}>to_month</th>
                  <th style={styleborder}>from_applicable</th>
                  <th style={styleborder}>due_date</th>
                  <th style={styleborder}>extended_date</th>
                  <th style={styleborder}>document_url</th>
                  <th style={styleborder}>remark</th>
                </tr>
                </thead>
                <tbody>
                  {
                    importdata.map((d) => (
                      <tr style={styleborder}>
                        <td style={styleborder}>{d.compliance_type}</td>
                        <td style={styleborder}>{d.nature}</td>
                        <td style={styleborder}>{d.period}</td>
                        <td style={styleborder}>{d.period_name}</td>
                        <td style={styleborder}>{d.from_month}</td>
                        <td style={styleborder}>{d.to_month}</td>
                        <td style={styleborder}>{d.from_applicable}</td>
                        <td style={styleborder}>{d.due_date}</td>
                        <td style={styleborder}>{d.extended_date}</td>
                        <td style={styleborder}>{d.document_url}</td>
                        <td style={styleborder}>{d.remark}</td>
                      </tr>
                    ))
                  }</tbody>
                <tfoot></tfoot>
              </table>
            </div>
          </div>
          <div className={`modal-footer `}>
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

export default Showcompliances
