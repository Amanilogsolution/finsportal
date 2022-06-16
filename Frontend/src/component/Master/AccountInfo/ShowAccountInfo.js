import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { AllAccountInfo ,AccountInfoStatus} from '../../../api';


const columns = [
    {
        name: 'Account Info Name',
        selector: row=>row.account_info_name,
        sortable: true
    },

    {
        name: 'Account Info Type',
        selector: row=>row.account_info_type,
        sortable: true
    },

    {
      name: 'Status',
      sortable: true,
      selector: row=>row.null,
      cell: (row) => [
        <div className='droplist'>
          <select onChange={async (e) => {
            const status = e.target.value;
            await AccountInfoStatus(localStorage.getItem('Organisation'),status ,row.sno)
            window.location.href = 'ShowAccountInfo'
          }
          }>
            <option defaultValue disabled hidden> {row.status}</option>


            <option value='Active'>Active</option>
            <option value='DeActive' >DeActive</option>
          </select>
        </div>
      ]
    },

    {
        name: "Actions",
        sortable: false,

        selector: row=>row.null,
        cell: (row) => [

            <a title='View Document' href="EditAccountInfo">
                <button className="editbtn btn-success "  onClick={()=>{localStorage.setItem('AccountInfosno',`${row.sno}`)}}>Edit</button></a>

        ]
    }


]
function ShowAccountInfo() {
    const [data, setData] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const result = await AllAccountInfo(localStorage.getItem("Organisation"));
            console.log(result)
            setData(result)
        }
        fetch();


    }, [])

    const tableData = {
        columns, data
    }
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
                            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} onClick={()=>{window.location.href='AddAccountInfo'}} className="btn btn-primary">Add Account Info</button>

                            <div className="container-fluid">
                                <br />

                                <h3 className="text-left ml-5">Account Info</h3>
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
                                    </div>
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

export default ShowAccountInfo;