import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { ShowVendor,DeleteVendor } from '../../api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';



const columns = [
    {
        name: 'Name',
        selector: 'vend_name',
        sortable: true
    },
    {
        name: 'Company Name',
        selector: 'company_name',
        sortable: true
    },
    {
        name: 'Email',
        selector: 'vend_email',
        sortable: true
    }, 
    {
        name: 'Work Phone',
        selector: 'vend_work_phone',
        sortable: true
    },
    {
        name: 'Source of Supply',
        selector: 'source_of_supply',
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
                       await DeleteVendor(row.sno,status)
                      window.location.href='ShowVendor'
                    }
                        }>
                          <option selected disabled hidden> {row.status}</option>


             <option value='Active'>Active</option>
             <option value='DeActive' >DeActive</option>
           </select>
          </div>
        ]
      },
    //   {
    //     name:'Active',
    //     selector: 'null',
    //     cell: (row) => [
    //         <input type='checkbox' checked={row.status== 'Active'}  onClick={async(e) =>
    //           {
    //             if(row.status == 'Active'){
    //               const checkvalue ='Deactive'
    //               await DeleteVendor(row.sno,checkvalue)
    //                   window.location.href='ShowVendor'

    //             }
    //             else{
    //               const checkvalue ='Active'
    //               await DeleteVendor(row.sno,checkvalue)
    //                   window.location.href='ShowVendor'
    //             }
    //            }} />
    //     ]
    //   },

       {
        name: "Actions",
        sortable: false,

        selector: "null",
        cell: (row) => [

          <a title='View Document' href="Editvendor">
        <button className="editbtn btn-success " onClick={() => localStorage.setItem('VendorSno',`${row.sno}`)} >Edit</button></a>

        ]
      }
]






const Showvendor = () => {
    const [data, setData] = useState([])

    useEffect(async () => {
        const result = await ShowVendor()
        setData(result)
    }, [])

    const tableData = {
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
                        <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '3%' }} onClick={() => { window.location.href = "./Vendor" }} className="btn btn-primary">Add Vendor</button>
                        <div className="container-fluid">
                            <br />
                            <h3 className="text-left ml-5">Vendor</h3>
                            <br />
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

export default Showvendor;