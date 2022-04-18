import React,{useState,useEffect} from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {ShowCustAddress} from '../../../api';
import {DeleteCustAddress} from '../../../api';

const columns = [
    {
    name: 'Attention',
    selector: 'billing_address_attention',
    sortable: true
    },
    {
        name: 'Country',
        selector: 'billing_address_country',
        sortable: true
     },
   
     {
            name: 'State',
            selector: 'billing_address_state',
            sortable: true
        },
        {
                name: 'City',
                selector: 'billing_address_city',
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
                            await DeleteCustAddress(row.sno,status)
                           window.location.href='TotalCustAddress'
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
          //             await DeleteCustAddress(row.sno,checkvalue)
          //                 window.location.href='TotalCustAddress'
        
          //           }
          //           else{
          //             const checkvalue ='Active'
          //             await DeleteCustAddress(row.sno,checkvalue)
          //                 window.location.href='TotalCustAddress'
          //           }
          //          }} />
          //   ]
          // },

       {
        name: "Actions",
        sortable: false,
    
        selector: "null",
        cell: (row) => [

          <a title='View Document' href="EditAddress">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('EditAddress',`${row.sno}`)} >Edit</button></a>

        ]
      }
      
         
]
 const TotalCustAddress = ()=> {

    const[data,setData] = useState([])

    // useEffect(async() => {
    //     const result = await ShowCustAddress()
    //     setData(result)
    //     console.log(result)
    //   }, [])

      const handleChange = async (e) => {
        e.preventDefault();
        const cust_entered_id = document.getElementById('cust_entered_id').value;
        console.log(cust_entered_id)
        const result = await ShowCustAddress(cust_entered_id)
        setData(result)
        console.log(result)
      }
        
      
      const tableData ={
          columns , data
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
          <button type="button" style={{float:"right",marginRight:'10%',marginTop:'1%'}} onClick={()=>{window.location.href="./AddCustAddress"}} className="btn btn-primary">Add Address</button>
            <div className="container-fluid">
                <br/>
              
              <h3 className="text-left ml-5">Customer Address</h3>
               <form className="form-inline" style={{marginLeft:"50px"}}>
                 <input className="form-control mr-sm-2" type="search" placeholder="Search" id="cust_entered_id" aria-label="Search" onChange={handleChange} />
                 {/* <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleClick} type="button">Search</button> */}
               </form>
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


export default TotalCustAddress;
