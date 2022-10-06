import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalUserRole,DeleteUserRole, getUserRolePermission } from '../../../api';


const ShowRoles = () => {
    const [data, setData] = useState([])

    const themetype = localStorage.getItem('themetype')


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
                    <select className={`bg-${themetype}`}
                    onChange={async (e) => {
                        const status = e.target.value;
                        await DeleteUserRole(localStorage.getItem('Organisation'),row.sno, status)
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
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div>
                    <div className={`content-wrapper bg-${themetype}`}>
                        <button type="button" id='addcitybtn' style={{ float: "right", marginRight: '10%', marginTop: '1%', display: "none" }} onClick={() => { window.location.href = "./addroles" }} className="btn btn-primary">New Roles</button>
                        <div className="container-fluid">
                            <br />

                            <h3 className="text-left ml-5">User Roles</h3>
                            <br />
                            <div className="row ">
                                <div className="col ml-2">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className={`card-body bg-${themetype}`}>
                                            <DataTableExtensions
                                                {...tableData}>
                                                <DataTable
                                                    noHeader
                                                    defaultSortField="id"
                                                    defaultSortAsc={false}
                                                    pagination
                                                    highlightOnHover
                                                    theme={themetype}
                                                />
                                            </DataTableExtensions>

                                        </article>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer theme={themetype} />
            </div>
        </div>
    )

}

export default ShowRoles
