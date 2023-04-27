import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalRecurringFreq, deleteRecurringFreq, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const ShowRecurring = () => {
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation');
      const result = await TotalRecurringFreq(org)
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
      document.getElementById('addpaymenttermbtn').style.background = '#7795fa';
    }

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'payment_terms')
    setUserRightsData(UserRights)
    localStorage["RolesDetais"] = JSON.stringify(UserRights)

    if (UserRights.payment_terms_create === 'true') {
      document.getElementById('addpaymenttermbtn').style.display = "block";
    }
  }


  const columns = [
    {
      name: 'Recurring Type',
      selector: 'null',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Payment Recurring Type is Lock'>{row.term}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.payment_terms_edit === 'true') {
            return (
              <a title='Edit Payment Term' className='pb-1' href="EditRecurringFreq" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('FreqSno', `${row.sno}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.recurring_type}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Payment Term'>{row.recurring_type}</p>
          }

        }
      }
    },

    {
      name: 'Remark',
      selector: row => row.remark,
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return (
            <div className='droplist'>
              <p>{row.status}</p>
            </div>
          )
        }
        else {
          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (userRightsData.payment_terms_delete === 'true') {
              return (
                <div className='droplist'>
                  <select id={`deleteselect${row.sno}`} onChange={async (e) => {
                    const status = e.target.value;
                    await deleteRecurringFreq(localStorage.getItem('Organisation'), status, row.sno)
                    window.location.href = 'TotalRecurringFrequency'
                  }}>
                    <option value={row.status} hidden> {row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive' >Deactive</option>
                  </select>
                </div>
              );
            }
            else {
              return (
                <div className='droplist'>
                  <p>{row.status}</p>
                </div>
              )
            }
          }
        }
      }
    }
  ]



  const tableData = {
    columns, data
  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className='d-flex justify-content-between py-4 px-4'>
          <h3 className="text-left ml-5">Payment Terms</h3>
          <button type="button" id="addpaymenttermbtn" style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./AddRecurringFrequency" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-3">Add Frequency</button>
        </div>
        <div className="container-fluid">
          <div className="card w-100">
            <article className={`card-body py-1`}>
              <DataTableExtensions
                {...tableData}
              >
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
      <Footer />
    </div>
  )

}

export default ShowRecurring
