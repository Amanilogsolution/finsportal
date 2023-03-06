import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Showfincialyear, Statusfincialyear, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const columns = [
  {
    name: 'Fincial Year',
    selector: row => row.fin_year,
    sortable: true
  },

  {
    name: 'From Date',
    selector: row => row.from_date,
    sortable: true
  },

  {
    name: 'To Date',
    selector: 'to_date',
    sortable: true
  },
  {
    name: 'Year',
    selector: row => row.year,
    sortable: true
  },

  {
    name: 'Invoice Series',
    selector: row => row.invoice_ser,
    sortable: true
  },
  {
    name: 'Voucher Series',
    selector: row => row.voucher_ser,
    sortable: true
  },
  {
    name: 'PO Series',
    selector: row => row.po_ser,
    sortable: true
  },
  {
    name: 'Active ',
    selector: row => row.status,
    sortable: true,
    cell: (row) => [
      <input type="checkbox" id={`deleteselect${row.sno}`} disabled checked={row.status === 'Active' ? true : false} onChange={async () => {
        const result = await Statusfincialyear(localStorage.getItem('Organisation'), row.sno)
        if (result.rowsAffected[0]) { window.location.href = "./ShowFinancialyear" }
      }} />
    ]
  },
  {
    name: "Actions",
    sortable: false,
    selector: row => row.null,
    cell: (row) => [
      <a title='View Document' href="/Updatefincialyear" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
        <button className="editbtn btn-success px-1" onClick={() => localStorage.setItem('FinsyearSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]

const ShowFinancialyear = () => {
  const [data, setData] = useState([{}])
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Showfincialyear(localStorage.getItem('Organisation'))
      setData(result)

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addfinsyearbtn').style.background = '#7795fa';
      }
  
      const UserRights = await getUserRolePermission(localStorage.getItem('Organisation'), localStorage.getItem('Role'), 'fincial_year')
      if (UserRights.fincial_year_create === 'true') {
        document.getElementById('addfinsyearbtn').style.display = "block";
      }
      if (UserRights.fincial_year_edit === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }
      if (UserRights.fincial_year_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).disabled = false;
        }
      }
    }

    fetchdata();
  }, [])

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
          <h3 className="ml-5">Financial year</h3>
          <button type="button " id='addfinsyearbtn' style={{ display: "none" }} onClick={() => { financialstatus !== 'Lock' ? window.location.href = "./Fincialyear": alert('You cannot Add in This Financial Year') }} className="btn btn-primary mx-3">New Financial Year</button>
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

export default ShowFinancialyear
