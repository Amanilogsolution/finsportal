import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalEmployee, deleteEmployee } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


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
    selector: 'null',
    cell: (row) => [
      <div className='droplist'>
        <select onChange={async (e) => {
          const status = e.target.value;
          await deleteEmployee(localStorage.getItem('Organisation'), row.sno, status)
          window.location.href = '/showemployee'
        }
        }>
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

      <a title='View Document' href="/EditCrm">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('CrmmasterSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]

const ShowEmployee = () => {
  const [data, setData] = useState([])



  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalEmployee(localStorage.getItem('Organisation'))
      console.log(result)
      setData(result)
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
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <button type="button " style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./addemployee" }} className="btn btn-primary">Add Employee </button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5"> Employee Master </h3>
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

export default ShowEmployee;
