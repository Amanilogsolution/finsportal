import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalItems, deleteItems } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

const ShowItem = () => {
const columns = [
  {
    name: 'Item Type',
    selector: row => row.item_type,
    sortable: true
  },
  {
    name: 'Name',
    selector: row => row.item_name,
    sortable: true
  },
  {
    name: 'Unit',
    selector: row => row.item_unit,
    sortable: true
  }, 
  {
    name: 'HSN Code',
    selector: row => row.hsn_code,
    sortable: true
  }, 
  {
    name: 'SAC Code',
    selector: row => row.sac_code,
    sortable: true
  }, 
  {
    name: 'Major Code',
    selector: row => row.major_code,
    sortable: true
  },
  {
    name: 'Chart of Account',
    selector: row => row.chart_of_account,
    sortable: true
  },
  {
    name: 'Tax Preference',
    selector: row => row.tax_preference,
    sortable: true
  },
  {
    name: 'Sales',
    selector: row => row.sales_account,
    sortable: true
  },
  {
    name: 'Purchase',
    selector: row => row.purchase_account,
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

      <a title='View Document' href="/EditItem">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('ItemsSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]


  const [data, setData] = useState([])



  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalItems(localStorage.getItem('Organisation'))
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
        <Menu />
        <div>
          <div className="content-wrapper">
            <button type="button " style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./AddItem" }} className="btn btn-primary">Add Item</button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Total Items</h3>
              <br />
              <div className="row ">
                <div className="col">
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

export default ShowItem;
