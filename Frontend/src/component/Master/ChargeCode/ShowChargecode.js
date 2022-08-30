import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalItems, deleteItems } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

const ShowChargecode = () => {
const columns = [
  {
    name: 'Name',
    selector: row => row.item_name,
    sortable: true
  },

  {
    name: 'Item Type',
    selector: row => row.item_type,
    sortable: true
  },
  {
    name: 'Nature',
    selector: row => row.nature,
    sortable: true
  }, 
  {
    name: 'Major Code',
    selector: row => row.major_code,
    sortable: true
  },
  {
    name: 'Chart of Account',
    selector: row => row.chartof_account,
    sortable: true
  },
  {
    name: 'Activity',
    selector: row => row.activity,
    sortable: true
  },
  {
    name: 'sac/Hsn Code',
    selector: row => row.sacHsn,
    sortable: true
  },
  {
    name: 'GST Rate(in %)',
    selector: row => row.gst_rate,
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
          const result = await deleteItems(localStorage.getItem('Organisation'), row.sno, status)
          window.location.href = 'ShowChargecode'
        }
        }>
          <option hidden> {row.status}</option>
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

      <a title='View Document' href="/EditChargecode">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('ItemsSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]


  const [data, setData] = useState([])



  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalItems(localStorage.getItem('Organisation'))
      setData(result)
      console.log(result)
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
        <Menu />
        <div>
          <div className="content-wrapper">
            <button type="button " style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./AddChargecode" }} className="btn btn-primary">Add Chargecode</button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Total Charge code</h3>
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

export default ShowChargecode;
