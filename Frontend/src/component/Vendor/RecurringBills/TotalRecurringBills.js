import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getRecurringBill, getUserRolePermission, DeleteRecurringBill } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';

const TotalRecurringBill = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await getRecurringBill(org)
      setData(result)
     
      fetchRoles()
    }
    fetchdata();
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);
    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'recurring_bill')
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)
    setUserRightsData(UserRights)
    setLoading(true)

    if (UserRights.recurring_bill_create === 'true') {
      document.getElementById('addbillbtn').style.display = "block";
      if (financstatus === 'Lock') {
        document.getElementById('addbillbtn').style.background = '#7795fa';
      }
    }
  }

  const columns = [

    {
      name: 'Vourcher No',
      selector: 'vourcher_no',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Post Invoice is Lock' className='pb-0 mb-0'>{row.vourcher_no}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.recurring_bill_edit === 'true' && row.status === 'Active') {
            return (
              <a title='Edit Invoice ' href="/EditRecurringBills" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('vourcher_no', `${row.vourcher_no}`)}
                style={{ borderBottom: '1px solid blue' }}>{row.vourcher_no}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Invoice ' className='pb-0 mb-0'>{row.vourcher_no}</p>
          }

        }
      }
    },


    {
      name: 'Recurring Type',
      selector: 'recurring_type',
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
    },
    {
      name: "Actions",
      sortable: false,
      selector: row => row.null,
      cell:
        (row) => {
          if (localStorage.getItem('financialstatus') === 'Lock') {
            return <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled />
          }
          else {
            if (!userRightsData) {
              fetchRoles()
            }
            if (userRightsData.recurring_bill_delete === 'true' ) {
              return (
                <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} onChange={async () => {
                  const result = await DeleteRecurringBill(row.sno, localStorage.getItem('Organisation'), row.status === 'Active' ? 'Deactive' : 'Active')
                  if (result == 'done') { window.location.href = "./TotalRecurringBill" }
                }} />
              );
            }
            else {
              return <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} disabled />
            }

          }
        }

    }
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
              <button type="button " id='addbillbtn' style={{ marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./RecurringBills" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary float-right">Add Recurring Bill </button>
              <div className="container-fluid">
                <h3 className="py-4 ml-5">Total Recurring Bill </h3>
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

export default TotalRecurringBill;
