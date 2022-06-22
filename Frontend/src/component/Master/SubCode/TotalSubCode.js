import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { ShowTotalSubCode ,SubCodeStatus } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';






function TotalSubCode() {

  const columns = [
    {
      name: 'Charge Code',
      selector: row => row.charge_code,
      sortable: true
    },
    {
      name: 'GL Code',
      selector: row => row.gl_code,
      sortable: true
    },
    {
      name: 'Sub Code',
      selector: row => row.sub_code,
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
            await SubCodeStatus(org,status, row.sno )
            window.location.href = 'TotalSubCode'
          }
          }>
            <option hidden selected value={row.status}> {row.status}</option>
            <option >Active</option>
            <option >Deactive</option>
          </select>
        </div>
      ]
    },
  
    {
      name: "Actions",
      sortable: false,
  
      selector: row => row.null,
      cell: (row) => [
  
        <a title='View Document' href="EditSubCode">
          <button className="editbtn btn-success "
            onClick={() => localStorage.setItem('SubCodesno', `${row.sno}`)}
          >Edit</button></a>
      ]
    }
  ]


  const [data, setData] = useState([])

  useEffect(async () => {
    const result = await ShowTotalSubCode(localStorage.getItem('Organisation'))
    console.log(result)
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
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./AddSubCode" }} className="btn btn-primary">Add Sub Code</button>


            <div className="container-fluid">
              <br />

              <h3 className="text-left ml-5">Sub Code</h3>
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

export default TotalSubCode
