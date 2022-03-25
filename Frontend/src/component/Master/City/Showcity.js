import React, { useEffect,useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {Totalcity} from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {deleteCity} from '../../../api';

const columns = [
    {
    name: 'Country Code',
    selector: 'country_code',
    sortable: true
    },
    {
        name: 'Country id',
        selector: 'country_id',
        sortable: true
        },
    {
        name: 'State Code',
        selector: 'state_code',
        sortable: true
     },
     {
        name: 'State Id',
        selector: 'state_id',
        sortable: true
     },
     {
            name: 'City Name',
            selector: 'city_name',
            sortable: true
        },
        {
                name: 'City ID',
                selector: 'city_id',
                sortable: true
         },
         {
            name: 'Status',
           sortable: true,
           selector: 'null',
            cell: (row) => [
              <a>{row.status}</a>,
              <a style={{marginLeft:"8px"}}  href='./Showcity' onClick={async()=>
                                                              {
                                                                if(row.status == 'Active')
                                                              {const status = 'DeActive'
                                                                await deleteCity(row.sno,status)
                                                              }
                                                              else { const status = 'Active'
                                                                await deleteCity(row.sno,status)
                                                              }}}>{row.status}</a>
            ]
           },
      
          {
              name: "Actions",
              sortable: false,
          
              selector: "null",
              cell: (row) => [
                  <a title='View Document'onClick={()=> localStorage.setItem('citySno',`${row.sno}`)} href="EditCity">Edit</a>
                  
              ]
            }
]

 const Showcity = ()=> {
     const[data,setData] = useState([])
     useEffect(async() => {
          const result = await Totalcity()
          console.log(result)
          setData(result)
        }, [])
        const tableData ={
            columns , data
        }

    return (
        <div>
        <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
            <div class="spinner-border" role="status"> </div>
          </div>
          <Header />
          <Menu />
          <div>
            <div className="content-wrapper">
            <button type="button" style={{float:"right",marginRight:'10%',marginTop:'1%'}} onClick={()=>{window.location.href="./Addcity"}} class="btn btn-primary">Add City</button>
              <div className="container-fluid">
                  <br/>
                
                <h3 className="text-left ml-5">City</h3>
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

export default Showcity
