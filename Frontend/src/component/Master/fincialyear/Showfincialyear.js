import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Showfincialyear, Statusfincialyear } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


const columns = [
  {
    name: 'Fincial Year',
    selector: 'fin_year',
    sortable: true
  },

  {
    name: 'From Date',
    selector: 'from_date',
    sortable: true
  },

  {
    name: 'To Date',
    selector: 'to_date',
    sortable: true
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true
  },
  {
    name: 'Vendor Master',
    selector: 'mvend_id',
    sortable: true
  },
  {
    name: 'Vendor ID',
    selector: 'vend_id',
    sortable: true
  },
  {
    name: 'Customer Master',
    selector: 'mcust_id',
    sortable: true
  },
  {
    name: 'Customer id',
    selector: 'cust_id',
    sortable: true
  },

  {
    name: 'Active ',
    selector: 'status',
    sortable: true,
    cell: (row) => [
      <input type="checkbox" checked={row.status == 'Active' ? true : false} onClick={async() => {await Statusfincialyear(localStorage.getItem('Organisation'),row.sno)
      window.location.href="./showfincialyear"} }/>
    ]
  },
  //   {
  //     name: 'City ID',
  //     selector: 'city_id',
  //     sortable: true
  //   },
  //   {
  //     name: 'Status',
  //     sortable: true,
  //     selector: 'null',
  //     cell: (row) => [
  //       <div className='droplist'>
  //         <select >
  //           <option selected disabled hidden> {row.status}</option>
  //           <option value='Active'>Active</option>
  //           <option value='DeActive' >DeActive</option>
  //         </select>
  //       </div>
  //     ]
  //   },

  {
    name: "Actions",
    sortable: false,

    selector: "null",
    cell: (row) => [

      <a title='View Document' href="/">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('FinsyearSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]

const ShowFincialyear = () => {
  const [data, setData] = useState([{}])



  useEffect(async () => {
    const result = await Showfincialyear(localStorage.getItem('Organisation'))
    console.log(result)
    setData(result)
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
        <Menu />
        <div>
          <div className="content-wrapper">
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./Fincialyear" }} className="btn btn-primary">New Fincial Year</button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Financial year</h3>
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

export default ShowFincialyear
