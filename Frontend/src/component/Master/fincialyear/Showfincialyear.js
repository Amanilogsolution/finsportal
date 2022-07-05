import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Showfincialyear } from '../../../api';
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
    selector: '',
    sortable: true
  },
  {
    name: 'Vendor ID',
    selector: '',
    sortable: true
  },
  {
    name: 'Customer Master',
    selector: '',
    sortable: true
  },
  {
    name: 'Customer id',
    selector: '',
    sortable: true
  },
  {
    name: 'Location Id',
    selector: '',
    sortable: true
  },
  {
    name: 'Active ',
    selector: true,
    sortable: true,
    cell:(row)=>[
      <input type="checkbox"/>
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

//   {
//     name: "Actions",
//     sortable: false,

//     selector: "null",
//     cell: (row) => [

//       <a title='View Document' href="EditCity">
//         <button className="editbtn btn-success " onClick={() => localStorage.setItem('citySno', `${row.sno}`)} >Edit</button></a>

//     ]
//   }


]

const ShowFincialyear = () => {
  const [data, setData] = useState([{}])



  useEffect(async () => {
    const result = await Showfincialyear()
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
