import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import { CheckLoginUser, ChangeCNStatus } from '../../../../api/index'


const CNDetails = (props) => {
    const [data, setData] = useState([])
    const [sno,setSno] = useState()
   

    const handleClickConfirm = async (e) => {
        e.preventDefault()
        const useremail = document.getElementById('userid').value
        const userpassword = document.getElementById('userPassword').value
        const result = await CheckLoginUser(useremail, userpassword)
        console.log(result)
        if (result == 'Confirmed') {
            const status = await ChangeCNStatus(localStorage.getItem('Organisation'),'Confirmed',sno)
            console.log(status)
            if(status){
                window.location.reload()
            }
        }
    }

    const columns = [
        {
            name: 'Customer Name',
            selector: 'cust_id',
            sortable: true
        },
        {
            name: 'Invoice Number',
            selector: 'inv_no',
            sortable: true
        },
        {
            name: 'Invoice Date',
            selector: 'Joindate',
            sortable: true
        },
        {
            name: 'Invoice Amount',
            selector: 'net_amt',
            sortable: true
        },
        {
            name: 'Location',
            selector: 'location',
            sortable: true
        },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => {
                    if(row.status == "Confirmed"){
                        return  <button id={`previewbtn${row.sno}`} type="button" onClick={(e) => {
                            e.preventDefault();
                            localStorage.setItem("cnno",row.sno)
                            window.location.href = "/CreditNotes"
                        }} className="btn btn-success"
                             >{row.status} </button>
                    }else{
                      return  <button id='previewbtn' type="button" onClick={(e) => {
                            e.preventDefault();
                            setSno(row.sno)
                        }} className="btn btn-danger"
                            data-toggle="modal" data-target="#exampleModalCenter" >{row.status} </button>
                    }
            }
               
            
        }

    ]

    useEffect(() => {
        async function fetchdata() {
            setData(props.displaydata)
            console.log(props.displaydata)
        }
        fetchdata()
    }, [])

    const tableData = {
        columns, data
    }

    return (
        <>
            <div>
                <div>
                    <h4 className='text-center'>CreditNote <span className='text-danger'>Report</span></h4>
                    <Table Tabledta={tableData} />
                </div>

                {/* Modal Start */}
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Verification</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="userid">Email address</label>
                                        <input type="text" className="form-control" id="userid" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userPassword">Password</label>
                                        <input type="password" className="form-control" id="userPassword" placeholder="Password" />
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClickConfirm}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal End */}

            </div>

        </>
    )

}

export default CNDetails
