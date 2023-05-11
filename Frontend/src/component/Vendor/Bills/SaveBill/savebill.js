import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { GetSaveBill, getUserRolePermission } from '../../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../customTableStyle';
import LoadingPage from '../../../loadingPage/loadingPage';


const BillSave = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await GetSaveBill(org)
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
      document.getElementById('addbillbtn').style.background = '#7795fa';
    }
    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'bills')
    localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.bills_create === 'true') {
      document.getElementById('addbillbtn').style.display = "block";

    }
  }

  const columns = [
    {
      name: 'Bill No',
      selector: 'bill_no',
      sortable: true,

    },
    {
      name: 'Vourcher No',
      selector: 'vourcher_no',
      sortable: true
    },

    {
      name: 'Voucher Date',
      selector: 'voudate',
      sortable: true
    },
    {
      name: 'Bill Date',
      selector: 'billdate',
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
      name: "Action",
      sortable: false,
      selector: row => row.null,
      cell: (row) => [
        <button type="button" onClick={() => {
          window.location.href = "/EditBill"; localStorage.setItem('vourcher_no', row.vourcher_no)
        }} className="btn btn-danger">Edit</button>
      ]
    }
    ,
    // {
    //   name: "Actions",
    //   sortable: false,
    //   selector: row => row.null,
    //   cell: (row) => [
    //      <button  type="button" onClick={()=> { window.location.href="EditInvoice";localStorage.setItem('invoiceNo',row.invoice_no)}}  className="btn btn-danger ml-3">Edit Invoice</button>
    //   ]
    // }
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
            <div className={`content-wrapper `}>
              <button type="button " id='addbillbtn' style={{ marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./Bills" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary float-right">Add Bill </button>
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
            : <LoadingPage />
        }
        <Footer />
      </div>
    </>
  )

}

export default BillSave;
