import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { PendingCompliances } from '../../../api'



const columns = [
    {
        name: 'compliance_type',
        selector: 'compliance_type',
        sortable: true
    },
    {
        name: 'period',
        selector: 'period',
        sortable: true
    },
    {
        name: 'remark',
        selector: 'remark',
        sortable: true,
        cell: (row) => [

          <textarea type="text"  value={row.remark}/>

        ]
        
    },
  
    {
        name: 'due_date',
        selector: 'due_date',
        sortable: true,
        cell: (row) => [

            <input type="date" value={row.due_date}/>
        ]
    },
    {
        name: 'Document',
        selector: 'remark',
        sortable: true,
        cell: (row) => [

          <input type="file" />

        ]
        
    },

    {
        name: "Actions",
        sortable: false,
        selector: "null",
        cell: (row) => [

            <a title='View Document' href="#">
                <button className="editbtn btn-success " onClick={() => localStorage.setItem('Pendingcompsno', `${row.sno}`)}>Update</button></a>

        ]
    }
]


function PandingCompliances() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const result = await PendingCompliances(localStorage.getItem("Organisation"));
            console.log(result)
            setData(result);
        }
        fetchdata();
    }, [])

    const tableData = {
        columns, data
    };
    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    <Menu />
                    <div>
                        <div className="content-wrapper">
                            <div className="container-fluid">
                                <br />
                                <h3 className="text-left ml-5">Pending Compliances</h3>
                                <br />
                                <div className="row ">
                                    <div className="col ml-5">
                                        <div className="card" style={{ width: "100%" }}>
                                            {
                                                data.map((item) => {
                                                    console.log(item.compliance_type)
                                                })
                                            }
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
                            </div>
                        </div>
                    </div>
                    <Footer />
                  

                </div>
            </div>
        </>
    )
}

export default PandingCompliances;