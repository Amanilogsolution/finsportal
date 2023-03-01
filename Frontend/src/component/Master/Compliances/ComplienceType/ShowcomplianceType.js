import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { showcompliancesType, Compliancesstatus, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import customStyles from '../../../customTableStyle';

function  ShowcomplianceType() {

  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Deactive')

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
          <button className="editbtn btn-success px-1"
            onClick={() => localStorage.setItem('ComplianceSnoType', `${row.sno}`)}
          >Edit</button></a>

      ]
    }
  ]




  useEffect(async () => {
    const org = localStorage.getItem('Organisation')
    const result = await showcompliancesType(org)
    setData(result)

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    if (financstatus === 'Deactive') {
      document.getElementById('addcomp_typebtn').style.background = '#7795fa';
    }


    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'comp_type')
    if (UserRights.comp_type_create === 'true') {
      document.getElementById('addcomp_typebtn').style.display = "block";
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
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className='d-flex justify-content-between py-4 px-4'>
          <h3 className="text-left ml-5">Compliances Type</h3>
          <button type="button" id='addcomp_typebtn' style={{  display: "none" }} onClick={() => {  financialstatus !== 'Lock' ? window.location.href = "./AddcomplianceType": alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-4">Add Compliances Type</button>
        </div>
        <div className='container-fluid'>
          <div className="card w-100" >
            <article className={`card-body py-1`}>
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
      <Footer />
    </div>
  )
}

export default ShowcomplianceType
