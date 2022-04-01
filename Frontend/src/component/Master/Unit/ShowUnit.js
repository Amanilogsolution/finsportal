import React, { useEffect,useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { TotalUnit } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {deleteUnit} from '../../../api';


const columns = [
    {
        name:'Unit Name',
        selector:'unit_name',
        sortable: true
    },
    {
        name:'Unit Symbol',
        selector:'unit_symbol',
        sortable: true
    },
   
  {
    name: 'Status',
    selector: 'null',
    cell: (row) => [

      <div className='droplist'>
       <select onChange={async(e) =>
               {
                     const status=e.target.value;
                   await deleteUnit(row.sno,status)
                  window.location.href='ShowUnit'
                }
                    }>
                      <option selected disabled hidden> {row.status}</option>

        
         <option value='Active'>Active</option>
         <option value='DeActive' >DeActive</option>
       </select>
      </div>
    ]
  },
<<<<<<< HEAD
=======
  {
    name:'Active',
    selector: 'null',
    cell: (row) => [
        <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
          {
            if(row.status == 'Active'){
              const checkvalue ='Deactive'
              await deleteUnit(row.sno,checkvalue)
                  window.location.href='ShowUnit'

            }
            else{
              const checkvalue ='Active'
              await deleteUnit(row.sno,checkvalue)
                  window.location.href='ShowUnit'
            }
           }} />
    ]
  },
>>>>>>> 8af61fe5173744a2b219a2cb55f5ae1964a12cf0
   
       {
        name: "Actions",
        sortable: false,
    
        selector: "null",
        cell: (row) => [

          <a title='View Document' href="EditUnit">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('unitSno',`${row.sno}`)} >Edit</button></a>

        ]
      }
]


 const ShowUnit = () => {
     const [data,setData] = useState([])

    useEffect(async() => {
      const result = await TotalUnit()
      setData(result)
    }, [])

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
          <button type="button" style={{float:"right",marginRight:'10%',marginTop:'3%'}} onClick={()=>{window.location.href="./AddUnit"}} className="btn btn-primary">Add Unit</button>
          <div className="container-fluid">
          <br/>
          <h3 className="text-left ml-5">Unit</h3>
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

export default ShowUnit
