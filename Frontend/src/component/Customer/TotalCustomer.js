import React, { useEffect,useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import {TotalCustomers,DeleteCustomer} from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const columns = [
    {
        name: 'Name',
        selector: 'cust_name',
        sortable: true  
    },
    {
        name: 'Company Name',
        selector: 'company_name',
        sortable: true  
    },
    {
        name: 'Email',
        selector: 'cust_email',
        sortable: true  
    },
    {
        name: 'Phone Number',
        selector: 'cust_phone',
        sortable: true  
    },
    {
        name: 'GST',
        selector: 'gst_treatment',
        sortable: true  
    },
    // {
    //     name:'Active',
    //     selector: 'status',
    //     sortable: true,
    //     cell: (row) => [
    //         <input type='checkbox' checked={row.status == 'Active'} value={row.status} onClick = {async(e) =>
    //           {
    //             console.log(e.target.value)
    //             if(row.status == 'Active'){
    //               const checkvalue ='Deactive'
    //               await DeleteCustomer(row.sno,checkvalue)
    //                   window.location.href='TotalCustomer'
    
    //             }
    //             else{
    //               const checkvalue ='Active'
    //               await DeleteCustomer(row.sno,checkvalue)
    //                   window.location.href='TotalCustomer'
    //             }
    //            }} />
    //     ]
    //   },
      {
        name: "Actions",
        sortable: false,
        selector: "null",
        cell: (row) => [
          <a title='View Document' href="EditCustomer">
            <button className="editbtn btn-success " onClick={() => localStorage.setItem('CustSno', `${row.sno}`)} >Edit</button></a>
        ]
      }
]

 const TotalCustomer =() => {
     const [data, setData] = useState([])

     useEffect(async() => {
       const result = await TotalCustomers()
       setData(result)
       console.log(result)
        }, [])
        const tableData = {
            columns,
            data
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
              <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={() => { window.location.href = "./Customer" }} className="btn btn-primary">Add Customer</button>
              <div className="container-fluid">
                <br />
                <h3 className="text-left ml-5">Total Customer</h3>
                <br />
                <div className="row ">
                  <div className="col ml-0">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <DataTableExtensions
                          {...tableData}>
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

export default TotalCustomer