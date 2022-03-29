import React, { useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {totalBank,deleteBank} from '../../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


const columns = [
    {
        name: 'Bank Id',
        selector: 'bank_id',
        sortable: true
        },
    {
    name: 'Bank Name',
    selector: 'bank_name',
    sortable: true
    },
    {
        name: 'Account Number',
        selector: 'account_no',
        sortable: true
        },
        {
            name: 'Address',
            selector: 'address_line1',
            sortable: true
            },
            {
                name: 'Branch',
                selector: 'branch',
                sortable: true
                },
                {
                    name: 'State',
                    selector: 'state',
                    sortable: true
                    },
                    {
                        name: 'City',
                        selector: 'city',
                        sortable: true
                        },
                        {
                            name: 'Pincode',
                            selector: 'pincode',
                            sortable: true
                            },
                            {
                                name: 'IFSC Code',
                                selector: 'ifsc_code',
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
                                                    await deleteBank(row.sno,status)
                                                   window.location.href='TotalBank'
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
                                        name: 'Account Type',
                                        selector: 'ac_type', 
                                        sortable: true
                                     },
                                     {
                                        name: "Actions",
                                        sortable: false,
                                    
                                        selector: "null",
                                        cell: (row) => [
                                
                                          <a title='View Document' href="EditBank">
                                        <button className="editbtn btn-success " onClick={() => localStorage.setItem('BankSno',`${row.sno}`)} >Edit</button></a>
                                
                                        ]
                                      }
]

 const TotalBank =()=> {
    const [data, setData] = useState([]);

     useState(async()=>{
         const result = await totalBank();
         console.log(result)
            setData(result)
        },[])

        const tableData = {
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
            <button type="button" style={{float:"right",marginRight:'10%',marginTop:'1%'}} onClick={()=>{window.location.href="./AddBank"}} className="btn btn-primary">Add Bank</button>
              <div className="container-fluid">
                  <br/>
                
                <h3 className="text-left ml-5">Banks</h3>
                <br/>
                <div className="row ">
                  <div className="col ml-0">
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
export default TotalBank