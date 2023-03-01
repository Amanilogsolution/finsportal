import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalEmployee, deleteEmployee, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const ShowEmployee = () => {
  const [data, setData] = useState([])

  const columns = [
    {
      name: 'Employee name',
      selector: row => row.emp_name,
      sortable: true
    },

    {
      name: 'Wharehouse',
      selector: row => row.wh,
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.null,
      cell: (row) => [
        <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
          <select className={``} onChange={async (e) => {
            const status = e.target.value;
            await deleteEmployee(localStorage.getItem('Organisation'), row.sno, status)
            window.location.href = '/showemployee'
          }} >

            <option value={row.status} hidden> {row.status}</option>
            <option value='Active'>Active</option>
            <option value='Deactive' >Deactive</option>
          </select>
        </div>
      ]
    },
    {
      name: "Actions",
      sortable: false,

      selector: row => row.null,
      cell: (row) => [

        <a title='View Document' href="/editemployee" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
          <button className="editbtn btn-success " onClick={() => localStorage.setItem('EmpmasterSno', `${row.sno}`)} >Edit</button></a>

      ]
    }
  ]


  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalEmployee(localStorage.getItem('Organisation'))
      setData(result)

      const UserRights = await getUserRolePermission(localStorage.getItem('Organisation'), localStorage.getItem('Role'), 'compliances')
      if (UserRights.compliances_create === 'true') {
        document.getElementById('addempbtn').style.display = "block";
      }
      if (UserRights.compliances_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }

      if (UserRights.compliances_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";
        }
      }
    }
    fetchdata();
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
          <h3 className="text-left ml-5"> Employee Master </h3>
          <button type="button " id='addempbtn' style={{ display: "none" }} onClick={() => { window.location.href = "./addemployee" }} className="btn btn-primary">Add Employee </button>
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
