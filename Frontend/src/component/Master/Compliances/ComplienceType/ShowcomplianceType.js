import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { showcompliancesType, Compliancesstatus, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import customStyles from '../../../customTableStyle';
import LoadingPage from '../../../loadingPage/loadingPage';
import AlertsComp from '../../../AlertsComp';

function ShowcomplianceType() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })
  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await showcompliancesType(org)
      setData(result)
      fetchRoles()
    }
    fetchdata()

  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);


    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'comp_type')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)
    setLoading(true)
    if (financstatus === 'Lock') {
      document.getElementById('addcomp_typebtn').style.background = '#7795fa';
    }
    if (UserRights.comp_type_create === 'true') {
      document.getElementById('addcomp_typebtn').style.display = "block";
    }
  }

  const columns = [
    {
      name: 'Compliance Type',
      selector: 'null',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Compliance Type is Lock'>{row.compliance_type}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.comp_type_edit === 'true') {
            return (
              <a title='Edit Compliance Type' className='pb-1' href="EditComplianceType" id={`editactionbtns${row.sno}`}
                onClick={() => localStorage.setItem('ComplianceSnoType', `${row.sno}`)} style={{ borderBottom: '3px solid blue' }}> {row.compliance_type}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Compliance Type'>{row.compliance_type}</p>
          }

        }
      }
    },
    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return (
            <div className='droplist'>
              <p>{row.status}</p>
            </div>
          )
        }
        else {
          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (userRightsData.comp_type_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await Compliancesstatus(localStorage.getItem('Organisation'), row.sno, status)
                    setAlertObj({ type: 'success', text: `Status ${status}`, url: '/ShowcompliancesType' })

                  }}>
                    <option value={row.status} hidden> {row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive' >Deactive</option>
                  </select>
                </div>
              );
            } else {
              return (
                <div className='droplist'>
                  <p>{row.status}</p>
                </div>
              )
            }
          }

        }
      }
    },

  ]


  const tableData = {
    columns, data
  }

  return (
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className='d-flex justify-content-between py-4 px-4'>
              <h3 className="text-left ml-5">Compliances Type</h3>
              <button type="button" id='addcomp_typebtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./AddcomplianceType" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-4">Add Compliances Type</button>
            </div>
            <div className='container-fluid'>
              <div className="card w-100" >
                <article className='card-body py-1'>
                  <DataTableExtensions {...tableData} >
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
            {
              alertObj.type ? <AlertsComp data={alertObj} /> : null
            }
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )
}

export default ShowcomplianceType
