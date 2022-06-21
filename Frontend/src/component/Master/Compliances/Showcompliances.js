import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showcompliances, Compliancestatus, UploadData, UploadDocumentCompliance } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';



const columns = [
  {
    name: 'Compliance Type',
    selector: row => row.compliance_type,
    sortable: true
  },
  {
    name: 'Due Date',
    selector: row => row.due_date,
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
    name: 'Extended Date',
    selector: row => row.extended_date,
    sortable: true
  },
  {
    name: 'Status',
    sortable: true,
    selector: row => row.null,
    cell: (row) => [
      <div className='droplist'>
        <select onChange={async (e) => {
          const org = localStorage.getItem("Organisation")
          const status = e.target.value;
          await Compliancestatus(org, row.sno, status)
          window.location.href = 'Showcompliances'
        }
        }>
          <option hidden selected value={row.status}> {row.status}</option>
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

      <a title='View Document' href="Editcompliances">
        <button className="editbtn btn-success "
          onClick={() => localStorage.setItem('ComplianceSno', `${row.sno}`)}
        >Edit</button></a>,
      <button className="editbtn btn-success" data-toggle="modal" data-target="#exampleModal" style={{ marginLeft: "7px", width: "50px" }} onClick={(e) => {
        e.preventDefault();
        localStorage.setItem('ComplianceSno', `${row.sno}`)
      }}>Upload</button>

    ]
  }


]


function Showcompliances() {
  const [file, setFile] = useState('')

  const [data, setData] = useState([])

  useEffect(async () => {
    const result = await showcompliances(localStorage.getItem('Organisation'))
    setData(result)
  }, [])

  const tableData = {
    columns, data
  }
  const Upload_Document = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("images", file)
    const UploadLink = await UploadData(data)
    console.log(UploadLink)
    if (UploadLink) {
      const result = await UploadDocumentCompliance(localStorage.getItem('Organisation'), localStorage.getItem('ComplianceSno'), UploadLink)
    }

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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./Addcompliances" }} className="btn btn-primary">Add Compliances</button>


            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Compliances</h3>
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
                  Upload file
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
                      id="Upload_Document"
                      type="file"
                      onChange={event => {
                        const document = event.target.files[0];
                        setFile(document)
                      }}
                      className="form-control "
                    />
                  </div><br />

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
                  onClick={Upload_Document}
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

      </div>
    </div>
  )
}

export default Showcompliances
