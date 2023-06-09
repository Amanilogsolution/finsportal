import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deleteTdsHead, totalTdsHead, getUserRolePermission } from '../../../api';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';

const TotalTdsHead = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);


  useEffect(() => {
    async function fetchdata() {
      const org = localStorage.getItem('Organisation')

      const result = await totalTdsHead(org)
      setData(result)
      fetchRoles()
    }
    fetchdata()
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'tds_head')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    setLoading(true)

    if (financstatus === 'Lock') {
      document.getElementById('addtdsheadbtn').style.background = '#7795fa';
    }
    if (UserRights.tds_head_create === 'true') {
      document.getElementById('addtdsheadbtn').style.display = "block";

    }
  }

  const columns = [
    {
      name: 'Tds Head',
      selector: 'name',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit State is Lock'>{row.name}</p>
        } else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.tds_head_edit === 'true') {
            return (
              <a title='Edit State' className='pb-1' href="UpdatetdsHead" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('tdssno', `${row.sno}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.name}</a>
            );
          } else {
            return <p title='Not Access to Edit State'>{row.name}</p>
          }

        }
      }
    },
    {
      name: 'Tds Section',
      selector: 'tds_section',
      sortable: true
    },
    {
      name: "Actions",
      sortable: false,
      selector: row => row.null,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return (
            <div className='droplist'>
              <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled style={{ height: '17px', width: '17px' }} />
            </div>
          )
        }
        else {
          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {

            if (userRightsData.tds_head_delete === 'true') {
              return (
                <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} onChange={async () => {
                  const result = await deleteTdsHead(localStorage.getItem('Organisation'), row.sno, row.status === 'Active' ? 'DeActive' : 'Active')
                  if (result === 'done') { window.location.href = "./TotaltdsHead" }
                }} style={{ height: '17px', width: '17px' }} />
              )
            }
            else {
              return (
                <div className='droplist' >
                  <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled style={{ height: '17px', width: '17px' }} />
                </div >
              )
            }
          }
        }
      }
    }
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
            <div className='d-flex justify-content-between px-3 py-3'>
              <h3 className="ml-5">Total Tds Head</h3>
              <div className='d-flex '>
                <button type="button" id='addtdsheadbtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./inserttdshead" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-4">Add Tds Head</button>
              </div>
            </div>

            <div className="container-fluid">
              <div className="card">
                <article className='card-body py-1'>
                  <DataTableExtensions {...tableData}>
                    <DataTable
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      dense
                      highlightOnHover
                      customStyles={customStyles}
                    />
                  </DataTableExtensions>
                </article>
              </div>
            </div>
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )

}

export default TotalTdsHead
