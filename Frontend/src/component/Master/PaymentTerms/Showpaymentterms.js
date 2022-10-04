import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalPaymentTerm, DeletePaymentTerm, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


const ShowFincialTerm = () => {
  const [data, setData] = useState([])

  const themetype = localStorage.getItem('themetype')


  const columns = [
    {
      name: 'Term',
      selector: row => row.term,
      sortable: true
    },

    {
      name: 'Term Days',
      selector: row => row.term_days,
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => [
        <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
          <select className={`bg-${themetype}`} onChange={async (e) => {
            const status = e.target.value;
            await DeletePaymentTerm(localStorage.getItem('Organisation'), status, row.sno)
            window.location.href = 'ShowPaymentTerm'
          }
          }>
            <option value={row.status} hidden> {row.status}</option>
            <option value='Active'>Active</option>
            <option value='Deactive' >Deactive</option>
          </select>
        </div>
      ]
    },
    {
      name: "Actions",
      sortable: false,

      selector: row => row.null,
      cell: (row) => [

        <a title='View Document' id={`editactionbtns${row.sno}`} style={{ display: "none" }} href="/UpdatePaymentTerm">
          <button className="editbtn btn-success " onClick={() => localStorage.setItem('TermSno', `${row.sno}`)} >Edit</button></a>

      ]
    }


  ]


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation');
      const result = await TotalPaymentTerm(org)
      setData(result)

      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'payment_terms')
      if (UserRights.payment_terms_create === 'true') {
        document.getElementById('addpaymenttermbtn').style.display = "block"
      }
      if (UserRights.payment_terms_edit === 'true') {
        for (let i = 0; i < result.length; i++) {

          document.getElementById(`editactionbtns${result[i].sno}`).style.display = "block";
        }
      }
      if (UserRights.payment_terms_delete === 'true') {
        for (let i = 0; i < result.length; i++) {
          document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";

        }
      }
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
        <div>
          <div className={`content-wrapper bg-${themetype}`}>
            <button type="button" id="addpaymenttermbtn" style={{ float: "right", marginRight: '10%', marginTop: '2%', display: "none" }} onClick={() => { window.location.href = "./AddPaymentTerm" }} className="btn btn-primary">New Financial Term</button>

            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Financial Terms</h3>
              <br />
              <div className="row ">
                <div className="col ml-2">
                  <div className="card" style={{ width: "100%" }}>
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
                        />
                      </DataTableExtensions>

                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themetype} />
      </div>
    </div>
  )

}

export default ShowFincialTerm
