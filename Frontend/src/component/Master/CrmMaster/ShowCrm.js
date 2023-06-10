import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalCrm, DeleteCrm, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';

const ShowCrm = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalCrm(localStorage.getItem('Organisation'))
      setData(result)
      fetchRoles()
    }
    fetchdata();
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'crm')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)
    setLoading(true)
    if (financstatus === 'Lock') {
      document.getElementById('addcrmbtn').style.background = '#7795fa';
    }
    if (UserRights.crm_create === 'true') {
      document.getElementById('addcrmbtn').style.display = "block";
    }
  }

  const columns = [
    {
      name: 'Person name',
      selector: row => row.user_name,
      sortable: true
    },
    {
      name: 'Type',
      selector: row => row.type,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.Joindate,
      sortable: true
    },
    {
      name: 'Customer/Vendor name',
      selector: row => row.cust_vend,
      sortable: true
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
            if (userRightsData.crm_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await DeleteCrm(localStorage.getItem('Organisation'), row.sno, status)
                    window.location.href = '/ShowCrm'
                  }}>
                    <option value={row.status} hidden> {row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive' >Deactive</option>
                  </select>
                </div>
              );
            }
            else {
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
    // {
    //   name: "Actions",
    //   sortable: false,

    //   selector: row => row.null,
    //   cell: (row) => [

    //     <a title='View Document' href="/EditCrm">
    //       <button className="editbtn btn-success " onClick={() => localStorage.setItem('CrmmasterSno', `${row.sno}`)} >Edit</button></a>

    //   ]
    // }


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
              <h3 className="text-left ml-5"> CRM Master </h3>
              <button type="button " id='addcrmbtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./AddCrm" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary">Add Crm </button>

            </div>
            <div className="container-fluid">
              <div className="card w-100">
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
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )

}

export default ShowCrm;
