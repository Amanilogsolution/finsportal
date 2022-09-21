import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../../Footer/Footer";
import { GetSaveInvoice } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


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

       <button  type="button" onClick={()=> { window.location.href="EditInvoice";localStorage.setItem('invoiceNo',row.invoice_no)}}  className="btn btn-danger ml-3">Edit Invoice</button>

    ]
  }


]

const InvoiceSave = () => {
  const [data, setData] = useState([])



  useEffect(() => {
    const fetchdata = async () => {
      const result = await GetSaveInvoice(localStorage.getItem('Organisation'))
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
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <button type="button " style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./Invoices" }} className="btn btn-primary">Add Invoice </button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5"> Save Invoice </h3>
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

export default InvoiceSave;
