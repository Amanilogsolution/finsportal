import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { deleteTdsHead, totalTdsHead, getUserRolePermission } from '../../../api';

import customStyles from '../../customTableStyle';

const TotalTdsHead = () => {
  const [data, setData] = useState([])

  const [financialstatus, setFinancialstatus] = useState('Lock')
  const [userRightsData, setUserRightsData] = useState([]);


  useEffect(() => {
    async function fetchdata() {
        const org = localStorage.getItem('Organisation')

      const result = await totalTdsHead(org)
      console.log(result)
      setData(result)
    }
    fetchdata()
  }, [])



  const columns = [
    {
      name: 'Tds Head',
      selector: 'name',
      sortable: true,
      cell: (row) => [
        <a title='Edit City' className='pb-1' href="UpdatetdsHead" id={`editactionbtns${row.sno}`} onClick={() => localStorage.setItem('tdssno', `${row.sno}`)}
                style={{ borderBottom: '3px solid blue' }}>{row.name}</a>
      ]
      
    },
    {
      name: 'Tds Section',
      selector: 'tds_section',
      sortable: true
    },
    {
        name: "Actions",
        sortable: false,
        selector: row => row.null,
        cell: (row) => [
          <input title={row.status} type="checkbox" id={`deleteselect${row.sno}`}  checked={row.status === 'Active' ? true : false} onChange={async () => {
            const result = await deleteTdsHead(localStorage.getItem('Organisation'),row.sno,row.status === 'Active'?'DeActive':'Active' )
            if (result == 'done') { window.location.href = "./TotaltdsHead" }
          }} />
        ]
      } 
  ]



  const tableData = {
    columns, data
  }

  const styleborder = {
    border: "1px solid black"
  }
  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className='d-flex justify-content-between px-3 py-3'>
          <h3 className="ml-5">Total Tds Head</h3>
          <div className='d-flex '>
            <button type="button" id='addcitybtn'  onClick={() => {  window.location.href = "./inserttdshead"  }} className="btn btn-primary mx-4">Add Tds Head</button>
          </div>
        </div>

        <div className="container-fluid">
          <div className="card">
            <article className={`card-body  py-1`}>
              <DataTableExtensions
                {...tableData}
              >
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
      <Footer />
      {/* ------------------ Modal start -----------------------------*/}
      {/* <Modal excel={Excelfile} importdatas={setImportdata} /> */}
   
      {/* ------------------ Modal end -----------------------------*/}
      {/* ------------------ Data show Modal start -----------------------------*/}
      
      {/* ------------------ Modal end -----------------------------*/}
    </div>
  )

}

export default TotalTdsHead
