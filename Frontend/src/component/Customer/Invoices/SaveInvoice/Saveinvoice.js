import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../../Footer/Footer";
import { GetSaveInvoice, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../customTableStyle';

const columns = [
  {
    name: 'Vendor name',
    selector: row => row.consignee,
    sortable: true
  },

  {
    name: 'Invoice Number',
    selector: row => row.invoice_no,
    sortable: true
  },
  {
    name: 'Invoice Date',
    selector: row => row.Joindate,
    sortable: true
  },
  {
    name: 'Invoice Amount',
    selector: row => row.invoice_amt,
    sortable: true
  },
  {
    name: 'Branch',
    selector: 'location_name',
    sortable: true
  },

  {
    name: "Actions",
    sortable: false,

    selector: row => row.null,
    cell: (row) => [

      <button type="button" id={`editactionbtns${row.sno}`} style={{ display: "none" }} onClick={() => { window.location.href = "EditInvoice"; localStorage.setItem('invoiceNo', row.invoice_no) }} className="btn btn-danger ml-3">Edit Invoice</button>

    ]
  }


]

const InvoiceSave = () => {
  const [data, setData] = useState([])
  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      
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
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themetype}`}>
            <button type="button " id='addivoicebtn' style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { window.location.href = "./Invoices" }} className="btn btn-primary">Add Invoice </button>
            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5"> Save Invoice </h3>
              <br />
              <div className="row ">
                <div className='col ml-2' >
                  <div className="card" style={{ width: "100%" }}>
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
            </div>
          </div>
        </div>
        <Footer theme={themetype} />
      </div>
    </div>
  )
}

export default InvoiceSave;
