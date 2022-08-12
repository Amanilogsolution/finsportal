import React, { useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { ShowVendAddress,DeleteVendAddress } from '../../../api';

const TotalVendAddress = () => {
const columns = [
  {
    name: 'Attention',
    selector: 'billing_address_attention',
    sortable: true
  },
  {
    name: 'Country',
    selector: 'billing_address_country',
    sortable: true
  },

  {
    name: 'State',
    selector: 'billing_address_state',
    sortable: true
  },
  {
    name: 'City',
    selector: 'billing_address_city',
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
          await DeleteVendAddress(row.sno, status,localStorage.getItem('Organisation'))
          window.location.href = 'TotalVendAddress'
        }
        }>
          <option value={row.status}  hidden> {row.status}</option>
          <option value='Active'>Active</option>
          <option value='Deactive' >Deactive</option>
        </select>
      </div>
    ]
  },
  {
    name: "Actions",
    sortable: false,
    selector: "null",
    cell: (row) => [

      <a title='View Document' href="EditVendorAddress">
        <button className="editbtn btn-success" onClick={() => {localStorage.setItem('EditVendorAddress', `${row.sno}`) }} >Edit</button></a>

    ]
  }
]


  const [data, setData] = useState([])


  const handleClick = async (e) => {
    e.preventDefault();
    const vend_entered_id = document.getElementById('vend_entered_id').value;
    const result = await ShowVendAddress(vend_entered_id,localStorage.getItem('Organisation'))
    setData(result)
  }


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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./AddVendAddress" }} className="btn btn-primary">Add Address</button>
            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Vendor Address</h3>
              <form className="form-inline" style={{ marginLeft: "50px" }}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" id="vend_entered_id" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleClick} type="button">Search</button>
              </form>
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


export default TotalVendAddress;
