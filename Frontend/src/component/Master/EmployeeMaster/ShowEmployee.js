import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalEmployee, deleteEmployee, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const ShowEmployee = () => {
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalEmployee(localStorage.getItem('Organisation'))
      setData(result)
      fetchRoles()
    }
    fetchdata();
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')

    setFinancialstatus(financstatus);

    if (financstatus === 'Lock') {
      document.getElementById('addempbtn').style.background = '#7795fa';
    }

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'employee')
    localStorage["RolesDetais"] = JSON.stringify(UserRights)
    if (UserRights.employee_create === 'true') {
      document.getElementById('addempbtn').style.display = "block";

    }
  }

  const columns = [
    {
      name: 'Employee name',
      selector: 'emp_name',
      sortable: true
    },

    {
      name: 'Wharehouse',
      selector: 'wh',
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
          let role = JSON.parse(localStorage.getItem('RolesDetais'))
          if (!role) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (role.employee_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await deleteEmployee(localStorage.getItem('Organisation'), row.sno, status)
                    window.location.href = '/showemployee'
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
    {
      name: "Actions",
      sortable: false,
      selector: 'null',
      cell: (row) => 
      {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return 
        }
        else {
          let role = JSON.parse(localStorage.getItem('RolesDetais'))
          if (!role) {
            fetchRoles()
          }
          if (role.employee_edit === 'true') {
            return (
              <button className='p-1 px-2 btn-success' onClick={(e)=>{e.preventDefault();localStorage.setItem('citySno', `${row.sno}`);window.location.href='/editemployee'}}>Edit</button>
            );
          }
          else {
            return
          }

        }
      }
      
      // [

      //   <a title='View Document' href="/" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
      //     <button className="editbtn btn-success " onClick={() => localStorage.setItem('EmpmasterSno', `${row.sno}`)} >Edit</button></a>

      // ]
    }
  ]




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
          <h3 className="text-left ml-5"> Employee Master </h3>
          <button type="button " id='addempbtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./addemployee" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary">Add Employee </button>
        </div>
        <div className="container-fluid">
          <div className="card w-100"  >
            <article className={`card-body `}>
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

export default ShowEmployee;
