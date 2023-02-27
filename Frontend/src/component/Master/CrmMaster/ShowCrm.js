import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { TotalCrm, DeleteCrm, getUserRolePermission } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../customTableStyle';

const ShowCrm = () => {
  const [data, setData] = useState([])
  const [financialstatus, setFinancialstatus] = useState('Deactive')

  const themeval = localStorage.getItem('themetype')

  const columns = [
    {
      name: 'Person name',
      selector: row => row.user_name,
      sortable: true
    },

    {
      name: 'Type',
      selector: row => row.type,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.Joindate,
      sortable: true
    },
    {
      name: 'Customer/Vendor name',
      selector: row => row.cust_vend,
      sortable: true
    },

    {
      name: 'Status',
      sortable: true,
      selector: 'null',
      cell: (row) => [
        <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
          <select className={``} onChange={async (e) => {
            const status = e.target.value;
            await DeleteCrm(localStorage.getItem('Organisation'), row.sno, status)
            window.location.href = '/ShowCrm'
          }}>
            <option value={row.status} hidden> {row.status}</option>
            <option value='Active'>Active</option>
            <option value='Deactive' >Deactive</option>
          </select>
        </div>
      ]
    },
    // {
    //   name: "Actions",
    //   sortable: false,

    //   selector: row => row.null,
    //   cell: (row) => [

    //     <a title='View Document' href="/EditCrm">
    //       <button className="editbtn btn-success " onClick={() => localStorage.setItem('CrmmasterSno', `${row.sno}`)} >Edit</button></a>

    //   ]
    // }


  ]



  useEffect(() => {
    const fetchdata = async () => {
      const result = await TotalCrm(localStorage.getItem('Organisation'))
      setData(result)

      const financstatus = localStorage.getItem('financialstatus')
      setFinancialstatus(financstatus);
      if (financstatus === 'Deactive') {
        document.getElementById('addcrmbtn').style.background = '#7795fa';
      }

      const UserRights = await getUserRolePermission(localStorage.getItem('Organisation'), localStorage.getItem('Role'), 'crm')
      if (UserRights.crm_create === 'true') {
        document.getElementById('addcrmbtn').style.display = "block";
      }

      if (UserRights.crm_delete === 'true') {
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
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className='d-flex justify-content-between py-4 px-4'>
          <h3 className="text-left ml-5"> CRM Master </h3>
          <button type="button " id='addcrmbtn' style={{ display: "none" }} onClick={() => {financialstatus === 'Active' ?  window.location.href = "./AddCrm" : alert('You cannot Add in This Financial Year') }} className="btn btn-primary">Add Crm </button>

        </div>
        <div className="container-fluid">
          <div className="card w-100">
            <article className={`card-body `}>
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
      <Footer theme={themeval} />
    </div>
  )

}

export default ShowCrm;
