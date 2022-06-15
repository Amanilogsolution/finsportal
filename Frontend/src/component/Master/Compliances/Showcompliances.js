import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showcompliances, Compliancestatus } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';



const columns = [
    {
      name: 'Compliance Type',
      selector: row=>row.compliance_type,
      sortable: true
    },
    {
        name: 'Due Date',
        selector: row=>row.due_date,
        sortable: true
        },
    {
      name: 'Nature',
      selector: row=>row.nature,
      sortable: true
    },
     {
        name: 'Period',
        selector: row=>row.period,
        sortable: true
     },
    {
      name: 'Period name ',
      selector: row=>row.period_name,
      sortable: true
    },
    {
      name: 'Extended Date',
      selector: row=>row.extended_date,
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.null,
      cell: (row) => [
        <div className='droplist'>
          <select onChange={async (e) => {
            const org = localStorage.getItem("Organisation")
            const status = e.target.value;
            await Compliancestatus(org, row.sno, status)
            window.location.href = 'Showcompliances'
          }
          }>
            <option hidden defaultValue={row.status}> {row.status}</option>
            <option >Active</option>
            <option >DeActive</option>
          </select>
        </div>
      ]
    },
  
    {
      name: "Actions",
      sortable: false,
  
      selector: row=>row.null,
      cell: (row) => [
  
        <a title='View Document' href="Editcompliances">
          <button className="editbtn btn-success "
           onClick={() => localStorage.setItem('ComplianceSno', `${row.sno}`)} 
           >Edit</button></a>
  
      ]
    }
  
  
]


function Showcompliances() {

  const [data, setData] = useState([])

  useEffect(async () => {
    const result = await showcompliances(localStorage.getItem('Organisation'))
    setData(result)
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./Addcompliances" }} className="btn btn-primary">Add Compliances</button>


            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Compliances</h3>
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
                  {/* card.// */}
                </div>
                {/* col.//*/}
              </div>
              {/* row.//*/}
            </div>
          </div>
        </div>
    

        <Footer />
      </div>
    </div>
  )
}

export default Showcompliances
