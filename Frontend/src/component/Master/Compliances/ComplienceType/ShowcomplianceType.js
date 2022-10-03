import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { showcompliancesType, Compliancesstatus, getUserRolePermission } from '../../../../api';
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
    name: 'Status',
    sortable: true,
    selector: row => row.null,
    cell: (row) => [
      <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
        <select onChange={async (e) => {
          const org = localStorage.getItem("Organisation")
          const status = e.target.value;
          await Compliancesstatus(org, row.sno, status)
          window.location.href = 'ShowcompliancesType'
        }
        }>
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

      <a title='View Document' href="EditComplianceType" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
        <button className="editbtn btn-success "
          onClick={() => localStorage.setItem('ComplianceSnoType', `${row.sno}`)}
        >Edit</button></a>

    ]
  }
]


function ShowcomplianceType() {

  const [data, setData] = useState([])
  const themeval = localStorage.getItem('themetype')


  useEffect(async () => {
    const org = localStorage.getItem('Organisation')
    const result = await showcompliancesType(org)
    setData(result)

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'comp_type')
    if (UserRights.comp_type_create === 'true') {
      document.getElementById('addcomp_typebtn').style.display = "block";
      document.getElementById('uploadcomp_typebtn').style.display = "block";
    }
    if (UserRights.comp_type_edit === 'true') {
      for (let i = 0; i < result.length; i++) {
        document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
      }
    }
    if (UserRights.comp_type_delete === 'true') {
      for (let i = 0; i < result.length; i++) {
        document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";
      }
    }
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
        <div>
          <div className={`content-wrapper bg-${themeval}`}>
            <button type="button" id='addcomp_typebtn' style={{ float: "right", marginRight: '10%', marginTop: '1%', display: "none" }} onClick={() => { window.location.href = "./AddcomplianceType" }} className="btn btn-primary">Add Compliances Type</button>
            <div className='container-fluid'>
              <br />
              <h3 className="text-left ml-5">Compliances Type</h3>
              <br />
              <div className="row ">
                <div className="col ml-2">
                  <div className="card" >
                    <article className={`card-body bg-${themeval}`}>
                      <DataTableExtensions
                        {...tableData}
                      >
                        <DataTable
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                          theme={themeval}
                        />
                      </DataTableExtensions>

                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themeval} />
      </div>
    </div>
  )
}

export default ShowcomplianceType
