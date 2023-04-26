import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { TotalItems, deleteItems, getUserRolePermission } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../customTableStyle';
import LoadingPage from '../loadingPage/loadingPage';


const ShowItem = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [userRightsData, setUserRightsData] = useState([]);
  const [financialstatus, setFinancialstatus] = useState('Lock')


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await TotalItems(org)
      setData(result)
      setLoading(true)
      fetchRoles();
    }

    fetchdata();
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    if (financstatus === 'Lock') {
      document.getElementById('additemsbtn').style.background = '#7795fa';
    }

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'items')
    setUserRightsData(UserRights)
    localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.items_create === 'true') {
      document.getElementById('additemsbtn').style.display = "block";
    }
  }

  const columns = [
    {
      name: 'Item Type',
      selector: 'item_type',
      sortable: true
    },
    {
      name: 'Item Name',
      selector: 'item_name',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Item is Lock'>{row.item_name}</p>
        }
        else {

          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.items_edit === 'true') {
            return (
              <a title='Edit Item' className='pb-1' href="EditItem" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('ItemsSno', `${row.sno}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.item_name}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Item'>{row.item_name}</p>
          }

        }
      }
    },
    {
      name: 'Unit',
      selector: 'item_unit',
      sortable: true
    },

    {
      name: 'Minor Code',
      selector: 'minor_code',
      sortable: true
    },
    {
      name: 'Chart of Account',
      selector: 'chart_of_account',
      sortable: true
    },
    {
      name: 'Tax Preference',
      selector: 'tax_preference',
      sortable: true
    },
    {
      name: 'GST Rate(in %)',
      selector: 'gst_rate',
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return (
            <div className='droplist'>
              <p>{row.status}</p>
            </div>
          )
        }
        else {

          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (userRightsData.items_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await deleteItems(localStorage.getItem('Organisation'), row.sno, status)
                    window.location.href = 'ShowItem'
                  }}>
                    <option value={row.status} hidden> {row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive' >Deactive</option>
                  </select>
                </div>
              );
            }
            else {
              return (
                <div className='droplist'>
                  <p>{row.status}</p>
                </div>
              )
            }
          }
        }
      }
    }

  ]




  const tableData = {
    columns, data
  }

  return (
    <div className="wrapper">
      
      <Header />
      {
        loading ?
          <div className="content-wrapper">
            <div className='d-flex justify-content-between pt-3 px-4 '>
              <h3 className="px-5">Total Items</h3>
              <button type="button " id='additemsbtn' style={{ display: "none" }} onClick={() => { financialstatus === 'Lock' ? alert('You cannot Add in This Financial Year') : window.location.href = "./AddItem" }} className="btn btn-primary mx-4">Add Item</button>
            </div>
            <div className="container-fluid mt-2">
              <div className="card mb-2 w-100">
                <article className={`card-body py-0`}>
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
          : <LoadingPage />
      }
      <Footer />
    </div>
  )

}

export default ShowItem;
