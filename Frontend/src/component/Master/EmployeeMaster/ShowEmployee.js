import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalEmployee, deleteEmployee, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


const ShowEmployee = () => {
  const [data, setData] = useState([])
  const themeval = localStorage.getItem('themetype')

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
          <select className={`bg-${themeval}`} onChange={async (e) => {
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
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themeval}`}>
            <button type="button " id='addempbtn' style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { window.location.href = "./addemployee" }} className="btn btn-primary">Add Employee </button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5"> Employee Master </h3>
              <br />
              <div className="row ">
                <div className="col ml-2">
                  <div className="card" style={{ width: "100%" }}>
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

export default ShowEmployee;
