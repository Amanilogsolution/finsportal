import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalUser } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deleteUser } from '../../../api';


const columns = [
  {
    name: 'Employee Name',
    selector: 'employee_name',
    sortable: true
  },
  {
    name: 'Role',
    selector: 'role',
    sortable: true
  },

  {
    name: 'Warehouse',
    selector: 'warehouse',
    sortable: true
  },
  {
    name: 'username',
    selector: 'user_name',
    sortable: true
  },
  {
    name: 'Password',
    selector: 'password',
    sortable: true
  },
  {
    name: 'Email Id',
    selector: 'email_id',
    sortable: true
  },
  {
    name: 'Phone',
    selector: 'phone',
    sortable: true
  },
  {
    name: 'Status',
    selector: 'null',
    cell: (row) => [

      <div className='droplist'>
        <select onChange={async (e) => {
          const status = e.target.value;
          await deleteUser(row.sno, status)
          window.location.href = 'ShowUser'
        }
        }>
          <option selected disabled hidden> {row.status}</option>


          <option value='Active'>Active</option>
          <option value='DeActive' >DeActive</option>
        </select>
      </div>
    ]
  },
  {
    name: 'Operate Mode',
    selector: 'operate_mode',
    sortable: true
  },
  {
    name: 'Customer',
    selector: 'customer',
    sortable: true
  },
  {
    name: 'Reporting to',
    selector: 'reporting_to',
    sortable: true
  },
  {
    name: 'Designation',
    selector: 'designation',
    sortable: true
  },
  {
    name: 'Two factor authentication',
    selector: 'two_factor_authentication',
    sortable: true
  },

  {
    name: "Actions",
    sortable: false,

    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditUser">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('userSno', `${row.sno}`)} >Edit</button></a>

    ]
  }
]


const ShowUser = () => {
  const [data, setData] = useState([])

  useEffect(async () => {
    const result = await TotalUser()
    setData(result)
    console.log(result)
  }, [])

  const tableData = {
    columns, data
  };

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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '3%' }} onClick={() => { window.location.href = "./AddUser" }} className="btn btn-primary">ADD User</button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">User</h3>
              <br />
              <div className="row ">
                <div className="col">
                  <div className="card" >
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ShowUser
