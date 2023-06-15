import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Showfincialyear, Statusfincialyear, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';


const ShowFinancialyear = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([{}])
  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Showfincialyear(localStorage.getItem('Organisation'))
      setData(result)
      fetchRoles();
    }
    fetchdata();
  }, [])


  const fetchRoles = async () => {
    const org = localStorage.getItem('Organisation')

    const financstatus = localStorage.getItem('financialstatus')
    setFinancialstatus(financstatus);

    const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'fincial_year')
    setUserRightsData(UserRights)
    // localStorage["RolesDetais"] = JSON.stringify(UserRights)
    setLoading(true)
    if (financstatus === 'Lock') {
      document.getElementById('addfinsyearbtn').style.background = '#7795fa';
    }
    if (UserRights.fincial_year_create === 'true') {
      document.getElementById('addfinsyearbtn').style.display = "block";
    }
  }


  const columns = [
    {
      name: 'Fincial Year',
      selector: 'fin_year',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return <p title='Edit Fincial Year is Lock'>{row.fin_year}</p>
        }
        else {
          if (!userRightsData) {
            fetchRoles()
          }
          if (userRightsData.fincial_year_edit === 'true') {
            return (
              <a title='Edit Fincial Year' className='pb-1' href="/Updatefincialyear" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('FinsyearSno', `${row.sno}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.fin_year}</a>
            );
          }
          else {
            return <p title='Not Access to Edit Fincial Year'>{row.fin_year}</p>
          }

        }
      }
    },

    {
      name: 'From Date',
      selector: 'from_date',
      sortable: true
    },

    {
      name: 'To Date',
      selector: 'to_date',
      sortable: true
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true
    },

    {
      name: 'Invoice Series',
      selector: 'invoice_ser',
      sortable: true
    },
    {
      name: 'Voucher Series',
      selector: 'voucher_ser',
      sortable: true
    },
    {
      name: 'Active ',
      selector: 'status',
      sortable: true,
      cell: (row) => {
        if (localStorage.getItem('financialstatus') === 'Lock') {
          return (
            <input type="checkbox" id={`deleteselect${row.sno}`} disabled checked={row.status === 'Active' ? true : false} />
          )
        }
        else {
          if (!userRightsData) {
            fetchRoles()
            window.location.reload()
          }
          else {
            if (userRightsData.fincial_year_delete === 'true') {
              return (
                <input type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} onChange={async () => {
                  const result = await Statusfincialyear(localStorage.getItem('Organisation'), row.sno)
                  if (result.rowsAffected[0]) {
                    setAlertObj({ type: 'success', text: `Status Change`, url: '/ShowFinancialyear' })

                  }
                }} />
              );
            }
            else {
              return (
                <input type="checkbox" id={`deleteselect${row.sno}`} checked={row.status === 'Active' ? true : false} />
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
      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className='d-flex justify-content-between py-4 px-4'>
              <h3 className="ml-5">Financial year</h3>
              <button type="button " id='addfinsyearbtn' style={{ display: 'none' }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./Fincialyear" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-3">New Financial Year</button>
            </div>

            <div className="container-fluid">
              <div className="card w-100">
                <article className='card-body py-1'>
                  <DataTableExtensions  {...tableData}>
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
            {
              alertObj.type ? <AlertsComp data={alertObj} /> : null
            }
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )

}

export default ShowFinancialyear
