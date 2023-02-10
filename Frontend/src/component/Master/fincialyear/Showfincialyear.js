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
    name: 'Active ',
    selector: row => row.status,
    sortable: true,
    cell: (row) => [
      <input type="checkbox" id={`deleteselect${row.sno}`} disabled checked={row.status === 'Active' ? true : false} onChange={async () => {
        const result = await Statusfincialyear(localStorage.getItem('Organisation'), row.sno)
        if (result.rowsAffected[0]) { window.location.href = "./showfincialyear" }
      }} />
    ]
  },
  {
    name: "Actions",
    sortable: false,

    selector: row => row.null,
    cell: (row) => [
      <a title='View Document' href="/Updatefincialyear" id={`editactionbtns${row.sno}`} style={{ display: "none" }}>
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('FinsyearSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]

const ShowFinancialyear = () => {
  const [data, setData] = useState([{}])
  const themetype = localStorage.getItem('themetype')

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Showfincialyear(localStorage.getItem('Organisation'))
      setData(result)

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
      <div className={`content-wrapper bg-${themetype}`}>
        <div className='d-flex justify-content-between py-4 px-4'>
          <h3 className="ml-5">Financial year</h3>
          <button type="button " id='addfinsyearbtn' style={{ display: "none" }} onClick={() => { window.location.href = "./Fincialyear" }} className="btn btn-primary mx-3">New Financial Year</button>
        </div>

        <div className="container-fluid">
          <div className="card w-100">
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
                  customStyles={customStyles}
                />
              </DataTableExtensions>
            </article>
          </div>
        </div>
      </div>

      <Footer theme={themetype} />
    </div>
  )

}

export default ShowFinancialyear
