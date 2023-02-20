import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { TotalItems, deleteItems, getUserRolePermission } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../customTableStyle';
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
        <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
          <select onChange={async (e) => {
            const status = e.target.value;
            const result = await deleteItems(localStorage.getItem('Organisation'), row.sno, status)
            window.location.href = 'ShowItem'
          }}>
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
        <a title='View Document' id={`editactionbtns${row.sno}`} href="/EditItem" style={{ display: "none" }}>
          <button className="editbtn btn-success " onClick={() => localStorage.setItem('ItemsSno', `${row.sno}`)} >Edit</button></a>
      ]
    }
  ]


  const [data, setData] = useState([])
  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await TotalItems(org)
      setData(result)
      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'items')
      if (UserRights.items_create === 'true') {
        document.getElementById('additemsbtn').style.display = "block"
      }
      if (UserRights.items_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }
      if (UserRights.items_delete === 'true') {
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

      <div className={`content-wrapper bg-${themetype}`}>
        <div className='d-flex justify-content-between pt-2 px-4'>
          <h3 className="ml-5">Total Items</h3>
          <button type="button " id='additemsbtn' style={{ display: "none" }} onClick={() => { window.location.href = "./AddItem" }} className="btn btn-primary">Add Item</button>
        </div>
        <div className="container-fluid">
          <div className="card mb-0 w-100">
            <article className={`card-body bg-${themetype}`}>
              <DataTableExtensions
                {...tableData}
              >
                <DataTable
                  noHeader
                  defaultSortField="id"
                  defaultSortAsc={false}
                  pagination
                  highlightOnHover
                  theme={themetype}
                  customStyles={customStyles}
                />
              </DataTableExtensions>
            </article>
          </div>
        </div>
      </div>

      <Footer theme={themetype} />
    </div>
  )

}

export default ShowItem;
