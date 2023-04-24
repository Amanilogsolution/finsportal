import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSavePO, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

export default function SavePurchaseOrder() {
  const [userRightsData, setUserRightsData] = useState([]);

  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await getSavePO(org)
      setData(result)
      fetchRoles()
    }

    fetchdata();
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    if (financstatus === 'Lock') {
      document.getElementById('addpobtn').style.background = '#7795fa';
    }
    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'purchasesorder')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.purchasesorder_create === 'true') {
      document.getElementById('addpobtn').style.display = "block";

    }
  }

  const columns = [
    {
      name: 'PO No',
      selector: 'po_number',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit PurchaseOrder is Lock'>{row.po_number}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.purchasesorder_edit === 'true') {
            return (
              <a title='Edit Purchase Order' className='pb-1' href="EditPurchaseOrder" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('poNo', `${row.po_number}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.po_number}</a>
            );
          }
          else {
            return <p title='Not Access to Customer City'>{row.po_number}</p>
          }

        }
      }
    },
    {
      name: 'PO Date',
      selector: 'po_date',
      sortable: true
    },

    {
      name: 'PO Location',
      selector: 'po_location',
      sortable: true
    },
  ]



  const tableData = {
    columns, data
  }

  return (
    <>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div className={`content-wrapper `}>
          <button type="button " id='addpobtn' style={{ marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./PurchaseOrder" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary float-right">Add  PO</button>
          <div className="container-fluid">
            <h3 className="py-4 ml-5"> Save Purchases Order</h3>
            <div className="card" >
              <article className={`card-body py-1`}>
                <DataTableExtensions {...tableData}>
                  <DataTable
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    dense
                    highlightOnHover
                    customStyles={customStyles}
                  />
                </DataTableExtensions>
              </article>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
