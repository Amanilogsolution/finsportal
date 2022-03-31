import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {getstates} from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {deletestate} from '../../../api';


const columns = [
    {
    name: 'Country Name',
    selector: 'country_name',
    sortable: true
    },
    {
     name: 'State Name',
    selector: 'state_name',
    sortable: true
    },
    {
     name: 'State Code',
    selector: 'state_code',
    sortable: true
    },
    {
     name: 'State Short Name',
    selector: 'state_short_name',
    sortable: true
    },
    {
     name: 'Type',
    selector: 'state_type',
    sortable: true
    },

    {
      name: 'Status',
     sortable: true,
     selector: 'null',
      cell: (row) => [
<div className='droplist'>
       <select onChange={async(e) =>
               {
                     const status=e.target.value;
                   await deletestate(row.sno,status)
                  window.location.href='ShowState'
                }
                    }>
                      <option selected disabled hidden> {row.status}</option>

        
         <option value='Active'>Active</option>
         <option value='DeActive' >DeActive</option>
       </select>
      </div>
      ]
     },
     {
      name:'Active',
      selector: 'null',
      cell: (row) => [
          <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
            {
              if(row.status == 'Active'){
                const checkvalue ='Deactive'
                await deletestate(row.sno,checkvalue)
                    window.location.href='ShowState'
  
              }
              else{
                const checkvalue ='Active'
                await deletestate(row.sno,checkvalue)
                    window.location.href='ShowState'
              }
             }} />
      ]
    },
    {
        name: "Actions",
        sortable: false,
    
        selector: "null",
        cell: (row) => [

          <a title='View Document' href="EditState">
          <button className="editbtn btn-success " onClick={() => localStorage.setItem('stateSno',`${row.sno}`)} >Edit</button></a>

        ]
      }
];


 const ShowState = () => {
const [data,setData] = useState([])

     useEffect(async() => {
         const result =await getstates();
         setData(result)
     }, [])

     const handleClick = (e) => {
       e.preventDefault()
     }

     const tableData= {
        columns, data
      }; 

 
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
            <button type="button" style={{float:"right",marginRight:'10%',marginTop:'3%'}} onClick={()=>{window.location.href="./StateMaster"}} className="btn btn-primary">Add State</button>
              <div className="container-fluid">
                  <br/>
                
                <h3 className="text-left ml-5">State</h3>
                <br/>
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

export default ShowState
