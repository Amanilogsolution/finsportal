import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSaveSO, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

export default function SaveSalesOrder() {
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await getSaveSO(org)
      console.log(result)
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
      name: 'SO No',
      selector: 'so_no',
      sortable: true,
      cell:(row)=>{
        return (
          <a href='EditSalesOrder' onClick={() => localStorage.setItem('soNo', `${row.so_no}`)}>
            {row.so_no}
          </a>
        )
      }
      
    },
    {
      name: 'PO Date',
      selector: 'sodate',
      sortable: true
    },

    {
      name: 'SO Location',
      selector: 'cust_addressid',
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
          <button type="button " id='addbillbtn' style={{ marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./SalesOrder" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary float-right">Add  SO</button>
          <div className="container-fluid">
            <h3 className="py-4 ml-5"> Save Sales Order </h3>
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
