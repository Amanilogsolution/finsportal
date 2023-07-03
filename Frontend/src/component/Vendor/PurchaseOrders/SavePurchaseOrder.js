import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSavePO, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';

export default function SavePurchaseOrder() {
  const [loading, setLoading] = useState(false)
  const [userRightsData, setUserRightsData] = useState([]);

  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await getSavePO(org)
      if(result.length>0){
          setData(result)
      }
      

      fetchRoles()
    }

    fetchdata();
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')
    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'purchasesorder')
    setUserRightsData(UserRights)
    setLoading(true)
    if (UserRights.purchasesorder_create === 'true') {
      document.getElementById('addpobtn').style.display = "block";
      if (financstatus === 'Lock') {
        document.getElementById('addpobtn').style.background = '#7795fa';
      }
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
        <Header />
        {
          loading ?
            <div className='content-wrapper'>
              <div className='d-flex justify-content-between py-3 mx-5'>
                <h3 > Save Purchases Order</h3>
                <button type="button " id='addpobtn' style={{ display: "none" }}
                  onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./PurchaseOrder" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary ">Add  PO</button>
              </div>
              <div className="container-fluid">
                <div className="card" >
                  <article className='card-body py-1'>
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
            : <LoadingPage />
        }
        <Footer />
      </div>

    </>
  )
}
