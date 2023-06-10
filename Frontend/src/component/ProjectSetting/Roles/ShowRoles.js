import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalUserRole, DeleteUserRole, getUserRolePermission } from '../../../api';
import customStyles from '../../customTableStyle';
import LoadingPage from '../../loadingPage/loadingPage';

const ShowRoles = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const columns = [
        {
            name: 'Roles',
            selector: 'roles',
            sortable: true
        },

        {
            name: 'Description',
            selector: 'description',
            sortable: true
        },

        {
            name: 'Setting all',
            selector: 'setting_all',
            sortable: true
        },

        {
            name: 'Status',
            sortable: true,
            selector: 'null',
            cell: (row) => [
                <div className='droplist' id={`deleteselect${row.sno}`} style={{ display: "none" }}>
                    <select
                        onChange={async (e) => {
                            const status = e.target.value;
                            await DeleteUserRole(localStorage.getItem('Organisation'), row.sno, status)
                            window.location.href = 'ShowRoles'
                        }}
                    >
                        <option value={row.status} hidden> {row.status}</option>
                        <option value='Active'>Active</option>
                        <option value='Deactive' >Deactive</option>
                    </select>
                </div>
            ]
        }
    ]


    useEffect(() => {
        async function fetchdata() {
            const org = localStorage.getItem('Organisation')
            const result = await TotalUserRole(org)
            setData(result)
            const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'roles')
            setLoading(true)

            if (UserRights.roles_create === 'true') {
                document.getElementById('addcitybtn').style.display = "block";
            }

            if (UserRights.roles_delete === 'true') {
                for (let i = 0; i < result.length; i++) {
                    document.getElementById(`deleteselect${result[i].sno}`).style.display = "block";
                }
            }
        }
        fetchdata()
    }, [])

    const tableData = {
        columns, data
    }


    return (
        <div className="wrapper">
            {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
            <Header />
            {
                loading ?
                    <div className='content-wrapper'>
                        <button type="button" id='addcitybtn' style={{ float: "right", marginRight: '10%', marginTop: '1%', display: "none" }} onClick={() => { window.location.href = "./addroles" }} className="btn btn-primary">New Roles</button>
                        <div className="container-fluid">
                            <h3 className="py-3 ml-5">User Roles</h3>
                            <div className="card w-100" >
                                <article className='card-body'>
                                    <DataTableExtensions
                                        {...tableData}>
                                        <DataTable
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            dense
                                            customStyles={customStyles}
                                        />
                                    </DataTableExtensions>
                                </article>
                            </div>
                        </div>
                    </div>
                    : <LoadingPage />
            }
            <Footer />
        </div>
    )

}

export default ShowRoles
