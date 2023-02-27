import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { GetSaveInvoice, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../customTableStyle';

const columns = [
  {
    name: 'Vendor name',
    selector: 'consignee',
    sortable: true
  },

  {
    name: 'Invoice Number',
    selector:'invoice_no',
    sortable: true,
    cell: (row) => [
      <a title='Edit Invoice' style={{ display: "none" }}  id={`editactionbtns${row.sno}`} href="EditInvoice" onClick={() => {localStorage.setItem('invoiceNo', row.invoice_no) }} >{ row.invoice_no}</a>

    ]
  },
  {
    name: 'Invoice Date',
    selector: 'Joindate',
    sortable: true
  },
  {
    name: 'Invoice Amount',
    selector:'invoice_amt',
    sortable: true
  },
  {
    name: 'Branch',
    selector: 'location_name',
    sortable: true
  },

  // {
  //   name: "Actions",
  //   sortable: false,

  //   selector: row => row.null,
  //   cell: (row) => [

  //     <button type="button" id={`editactionbtns${row.sno}`} style={{ display: "none" }} onClick={() => { window.location.href = "EditInvoice"; localStorage.setItem('invoiceNo', row.invoice_no) }} className="btn btn-danger ml-3">Edit Invoice</button>

  //   ]
  // }


]

const InvoiceSave = () => {
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addivoicebtn').style.background = '#7795fa';
      }

      const result = await GetSaveInvoice(org)
      setData(result)

      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'invoice')
      if (UserRights.invoice_create === 'true') {
        document.getElementById('addivoicebtn').style.display = "block"
      }
      if (UserRights.invoice_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
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
      <div className="content-wrapper ">
        <button type="button " id='addivoicebtn' style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus === 'Active' ?window.location.href = "./Invoices" : alert('You cannot Add in This Financial Year')  }} className="btn btn-primary">Add Invoice </button>
        <div className="container-fluid">
          <h3 className="py-4 ml-5"> Save Invoice </h3>
          <div className="card w-100">
            <article className="card-body ">
              <DataTableExtensions
                {...tableData}>
                <DataTable
                  noHeader
                  defaultSortField="id"
                  defaultSortAsc={false}
                  pagination
                  highlightOnHover
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

export default InvoiceSave;
