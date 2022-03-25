import React, { useEffect,useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { currency } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {deleteCurrency} from '../../../api';

const columns = [
    {
        name: 'Country Code',
        selector: 'country_code',
        sortable: true
    },
    {
        name: 'Country Name',
        selector: 'country_name',
        sortable: true
    },
    {
        name: 'Currency Name',
        selector: 'currency_name',
        sortable: true
    },
    {
        name: 'Currency Code',
        selector: 'currency_code',
        sortable: true
    },
    {
        name: 'Status',
       sortable: true,
       selector: 'null',
        cell: (row) => [
          <a>{row.status}</a>,
          <a style={{marginLeft:"8px"}}  href='./ShowCurrency' onClick={async()=>
                                                          {
                                                            if(row.status == 'Active')
                                                          {const status = 'DeActive'
                                                            await deleteCurrency(row.sno,status)
                                                          }
                                                          else { const status = 'Active'
                                                            await deleteCurrency(row.sno,status)
                                                          }}}>{row.status}</a>
        ]
       },
    {
        name: "Actions",
        sortable: false,
    
        selector: "null",
        cell: (row) => [
            <a title='View Document'onClick={()=> localStorage.setItem('CurrencySno',`${row.sno}`)} href="EditCurrency">Edit</a>
            
        ]
      }
]

 const ShowCurrency = () => {
    const [data,setData] = useState([])

     useEffect(async() => {
       const result = await currency()
       console.log(result)
       setData(result)
     }, [])

     const tableData  ={
        columns,data
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
            <button type="button" style={{float:"right",marginRight:'10%',marginTop:'1%'}} onClick={()=>{window.location.href="./AddCurrency"}} class="btn btn-primary">Add Currency</button>
              <div className="container-fluid">
                  <br/>
                
                <h3 className="text-left ml-5">Currency</h3>
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
export default ShowCurrency