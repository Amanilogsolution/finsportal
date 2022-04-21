import React, { useEffect,useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { currency } from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {deleteCurrency} from '../../../api';
import Excelfile from '../../../formate.xlsx';

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
            <div className='droplist'>
            <select onChange={async(e) =>
                    {
                          const status=e.target.value;
                        await deleteCurrency(row.sno,status)
                       window.location.href='ShowCurrency'
                     }
                         }>
                           <option selected disabled hidden> {row.status}</option>
     
             
              <option value='Active'>Active</option>
              <option value='DeActive' >DeActive</option>
            </select>
           </div>
        ]
       },
      //  {
      //   name:'Active',
      //   selector: 'null',
      //   cell: (row) => [
      //       <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
      //         {
      //           if(row.status == 'Active'){
      //             const checkvalue ='Deactive'
      //             await deleteCurrency(row.sno,checkvalue)
      //                 window.location.href='ShowCurrency'
    
      //           }
      //           else{
      //             const checkvalue ='Active'
      //             await deleteCurrency(row.sno,checkvalue)
      //                 window.location.href='ShowCurrency'
      //           }
      //          }} />
      //   ]
      // },
    {
        name: "Actions",
        sortable: false,
    
        selector: "null",
        cell: (row) => [

            <a title='View Document' href="EditCurrency">
            <button className="editbtn btn-success " onClick={() => localStorage.setItem('CurrencySno',`${row.sno}`)} >Edit</button></a>
        ]
      }
]

 const ShowCurrency = () => {
    const [data,setData] = useState([])

     useEffect(async() => {
       const result = await currency()
       setData(result)
     }, [])

     const tableData  ={
        columns,data
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
            <button type="button" style={{float:"right",marginRight:'10%',marginTop:'1%'}} onClick={()=>{window.location.href="./AddCurrency"}} className="btn btn-primary">Add Currency</button>
            <button type="button" style={{float:"right",marginRight:'2%',marginTop:'1%'}} onClick={()=>{window.location.href="#"}} className="btn btn-success"  data-toggle="modal"
                                data-target="#exampleModal">Import excel file</button>
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
           {/* ------------------ Modal start -----------------------------*/}
           <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Import excel file
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* <div className=" ">
                      <label
                        htmlFor="user_name"
                        className=" col-form-label font-weight-normal"
                      >
                        <span style={{ color: "red" }}> Currency Code *</span>
                      </label>
                      <div className="col form-group ">
                        <select
                          id="inputState"
                          className="form-control col-md-10 "
                        >
                          <option selected> AED- UAE Dirham</option>
                          <option>AUD- Australian Dollar</option>
                          <option>CAD- Canadian Dollar</option>
                          <option>CNY- Yuan Renminbi</option>
                          <option>EUR- Euro</option>
                          <option>INR- Indian Rupee</option>
                        </select>
                      </div>
                    </div> */}
                    {/* <div className=" ">
                      <label
                        htmlFor="user_name"
                        className=" col-form-label font-weight-normal"
                      >
                        <span style={{ color: "red" }}> Currency Symbol *</span>
                      </label>
                      <div className="col form-group ">
                        <input
                          id="addsymbol"
                          type="text"
                          className="form-control col-md-10"
                        />
                      </div>
                    </div> */}
                    <div className=" ">
                      <label
                        htmlFor="user_name"
                        className=" col-form-label font-weight-normal"
                      >
                        <span >Select the file</span>
                      </label>
                      <div className=" ">
                        <input
                          id=""
                          type="file"
                          className="form-control "
                          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                      </div><br/>
                    <span style={{color:"red"}}>
                       <a href={Excelfile} download> Download formate</a>
                    </span><br/>

                    </div>


                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------ Modal end -----------------------------*/}
        </div>
      </div>
      
    )
    }
export default ShowCurrency