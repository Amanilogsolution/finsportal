import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { GetSaveInvoice, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../customTableStyle';
import LoadingPage from '../../../loadingPage/loadingPage';


const InvoiceSave = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await GetSaveInvoice(org)
      setData(result)

      fetchRoles()
    }

    fetchdata();
  }, [])

  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'invoice')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)
    setLoading(true)
    
    if (UserRights.invoice_create === 'true') {
      document.getElementById('addivoicebtn').style.display = "block";
      if (financstatus === 'Lock') {
        document.getElementById('addivoicebtn').style.background = '#7795fa';
      }
    }
  }


  const columns = [
    {
      name: 'Vendor name',
      selector: 'consignee',
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
          if (userRightsData.invoice_edit === 'true') {
            return (
              <a title='Edit Invoice ' href="/EditInvoice" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('invoiceNo', `${row.invoice_no}`)}
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
      name: 'Invoice Date',
      selector: 'Joindate',
      sortable: true
    },
    {
      name: 'Invoice Amount',
      selector: 'invoice_amt',
      sortable: true
    },
    {
      name: 'Branch',
      selector: 'location_name',
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
            <button type="button " id='addivoicebtn' style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./Invoices" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary">Add Invoice </button>
            <div className="container-fluid">
              <h3 className="py-4 ml-5"> Save Invoice </h3>
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

export default InvoiceSave;
