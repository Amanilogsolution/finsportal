import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { GetSaveBill, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../customTableStyle';

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
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addbillbtn').style.background = '#7795fa';
      }

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
    <>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div className={`content-wrapper `}>
          <button type="button " id='addbillbtn' style={{ marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus === 'Active' ?  window.location.href = "./Bills"  : alert('You are not in Current Financial Year')}} className="btn btn-primary float-right">Add Bill </button>
          <div className="container-fluid">
            <h3 className="py-4 ml-5"> Save Bill </h3>
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
        <Footer theme={themetype} />
      </div>
    </>
  )

}

export default BillSave;
