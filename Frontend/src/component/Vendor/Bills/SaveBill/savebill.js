import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { GetSaveBill, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


const columns = [
  {
    name: 'Vourcher No',
    selector: row => row.vourcher_no,
    sortable: true
  },

  {
    name: 'Voucher Date',
    selector: row => row.voudate,
    sortable: true
  },
  {
    name: 'Bill No',
    selector: row => row.bill_no,
    sortable: true
  },
  {
    name: 'Bill Date',
    selector: row => row.billdate,
    sortable: true
  },
  {
    name: 'Vendor',
    selector: 'vend_name',
    sortable: true
  },
  {
    name: 'Amount',
    selector: 'total_bill_amt',
    sortable: true
  },
  {
    name: 'Location',
    selector: 'location',
    sortable: true
  },
  {
    name: 'Remarks',
    selector: 'remarks',
    sortable: true
  }

  //   {
  //     name: "Actions",
  //     sortable: false,

  //     selector: row => row.null,
  //     cell: (row) => [

  //        <button  type="button" onClick={()=> { window.location.href="EditInvoice";localStorage.setItem('invoiceNo',row.invoice_no)}}  className="btn btn-danger ml-3">Edit Invoice</button>

  //     ]
  //   }
]

const BillSave = () => {
  const [data, setData] = useState([])
  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await GetSaveBill(org)
      setData(result)
      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'bills')
      if (UserRights.bills_create === 'true') {
        document.getElementById('addbillbtn').style.display = "block"
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
            <button type="button " id='addbillbtn' style={{ float: "right", marginRight: '10%', marginTop: '2%',display:"none" }} onClick={() => { window.location.href = "./Bills" }} className="btn btn-primary">Add Bill </button>

            <div className="container-fluid">
              <br />
              <h3 className="text-left ml-5"> Save Bill </h3>
              <br />
              <div className="row p-0" style={{ width: "100%" }}>
                <div className="col ">
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

export default BillSave;
