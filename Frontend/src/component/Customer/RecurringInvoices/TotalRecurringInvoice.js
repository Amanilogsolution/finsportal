import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { totalRecurringInvoice, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';


const TotalRecurringInvoice = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await totalRecurringInvoice(org)
  
      setData(result)
      setLoading(true)
      fetchRoles()
    }

    fetchdata();
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    if (financstatus === 'Lock') {
      document.getElementById('addivoicebtn').style.background = '#7795fa';
    }
    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'recurring_invoice')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.recurring_invoice_create=== 'true') {
      document.getElementById('addivoicebtn').style.display = "block";
    }
  }


  const columns = [
    {
      name: 'Vendor name',
      selector: 'consignee',
      sortable: true
    },
    {
      name: 'Recurring Type',
      selector: 'recurring_type',
      sortable: true
    },
    {
      name: 'Recurring Date',
      selector: 'RecurringDate',
      sortable: true
    },

    {
      name: 'Invoice Number',
      selector: 'invoice_no',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Invoice is Lock' className='pb-0'>{row.invoice_no}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.recurring_invoice_edit === 'true') {
            return (
              <a title='Edit Invoice ' href="/EditRecurringInvoice" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('invoiceNo', `${row.invoice_no}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.invoice_no}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Invoice ' className='pb-0'>{row.invoice_no}</p>
          }

        }
      }
    },
  
    {
      name: 'Invoice Amount',
      selector: 'invoice_amt',
      sortable: true
    },
 
  ]



  const tableData = {
    columns, data
  }

  return (
    <div className="wrapper">
      <Header />
      {
        loading ?
          <div className="content-wrapper ">
            <button type="button " id='addivoicebtn' style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./AddRecurringInvoices" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary">Add Recurring Invoice </button>
            <div className="container-fluid">
              <h3 className="py-4 ml-5"> Total Recurring Invoices </h3>
              <div className="card w-100">
                <article className="card-body py-1">
                  <DataTableExtensions
                    {...tableData}>
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

export default TotalRecurringInvoice;
