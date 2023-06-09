import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSaveSO, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';

export default function SaveSalesOrder() {
  const [loading, setLoading] = useState(false)
  const [userRightsData, setUserRightsData] = useState([]);

  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')

      const result = await getSaveSO(org)
      setData(result)

      fetchRoles()
    }

    fetchdata();
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'salesorder')
    setUserRightsData(UserRights)
    setLoading(true)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.salesorder_create === 'true') {
      document.getElementById('addsobtn').style.display = "block";
      if (financstatus === 'Lock') {
        document.getElementById('addsobtn').style.background = '#7795fa';
      }

    }
  }

  const columns = [
    {
      name: 'SO No',
      selector: 'so_no',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit SalesOrder is Lock'>{row.so_no}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.salesorder_edit === 'true') {
            return (
              <a title='Edit SalesOrder' className='pb-1' href="EditSalesOrder" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('soNo', `${row.so_no}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.so_no}</a>
            );
          }
          else {
            return <p title='Not Access to Customer City'>{row.so_no}</p>
          }

        }
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
        <Header />
        {
          loading ?
            <div className={`content-wrapper `}>
              <button type="button " id='addsobtn' style={{ marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./SalesOrder" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary float-right">Add  SO</button>
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
            : <LoadingPage />
        }
        <Footer />
      </div>

    </>
  )
}
