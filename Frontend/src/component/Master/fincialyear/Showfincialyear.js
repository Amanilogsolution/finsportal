import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { Showfincialyear, Statusfincialyear } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


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
      <input type="checkbox" checked={row.status == 'Active' ? true : false} onChange={async () => {
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

      <a title='View Document' href="/Updatefincialyear">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('FinsyearSno', `${row.sno}`)} >Edit</button></a>

    ]
  }


]

const ShowFincialyear = () => {
  const [data, setData] = useState([{}])



  useEffect(() => {
    const fetchdata = async () => {
      const result = await Showfincialyear(localStorage.getItem('Organisation'))
      setData(result)
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
        <Menu />
        <div>
          <div className="content-wrapper">
            <button type="button " style={{ float: "right", marginRight: '10%', marginTop: '2%' }} onClick={() => { window.location.href = "./Fincialyear" }} className="btn btn-primary">New Financial Year</button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Financial year</h3>
              <br />
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <DataTableExtensions
                        {...tableData}
                      >
                        <DataTable
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                        />
                      </DataTableExtensions>

                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )

}

export default ShowFincialyear
