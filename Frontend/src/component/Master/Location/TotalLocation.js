import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { totalLocation,Locationstatus } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


const columns = [
  {
    name: 'Location Name',
    selector: 'location_name',
    sortable: true
  },
  {
    name: 'GST Number',
    selector: 'gstin_no',
    sortable: true
  },
//   {
//     name: 'Country Id',
//     selector: 'country_id',
//     sortable: true
//   },
//   {
//     name: 'Country phone code',
//     selector: 'country_phonecode',
//     sortable: true
//   },
  {
    name: 'Status',
    sortable: true,
    selector: 'null',
    cell: (row) => [
      <div className='droplist'>
        <select onChange={async (e) => {
          const org = localStorage.getItem("Organisation");
          const status = e.target.value;
          await Locationstatus(org,row.location_id,status)
          window.location.href = 'TotalLocation'
        }
        }>
          <option selected disabled hidden> {row.status}</option>
          <option >Active</option>
          <option >DeActive</option>
        </select>
      </div>
    ]
  },
 
  {
    name: "Actions",
    sortable: false,
    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditLocation">
        <button className="editbtn btn-success "
         onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
          >Edit</button></a>,
        <a title='View Document' href="AddOrgAddress">
        <button className="editbtn btn-success ml-2"
        onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
         >Add Address</button></a>,
         <a title='View Document' href="EditOrgAddress">
         <button className="editbtn btn-success ml-2"
          onClick={() => localStorage.setItem('location_id', `${row.location_id}`)}
           >Edit Address</button></a>,
    ]
  }
]


const TotalLocation = () => {
  const [data, setData] = useState([])



  useEffect(async () => {
    const result = await totalLocation(localStorage.getItem('Organisation'))
    // console.log(result)
    setData(result)
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./AddLocation" }} className="btn btn-primary">Add Location</button>
            <button type="button" style={{ float: "right", marginRight: '2%', marginTop: '1%' }} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Import excel file</button>

            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5">Location</h3>
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
                  {/* card.// */}
                </div>
                {/* col.//*/}
              </div>
              {/* row.//*/}
            </div>
          </div>
        </div>
        <Footer />
       
      </div>
    </div>
  )
}

export default TotalLocation

