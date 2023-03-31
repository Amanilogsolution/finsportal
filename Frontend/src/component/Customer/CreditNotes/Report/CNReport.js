import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import { CheckLoginUser, InsertCreditNote } from '../../../../api/index'


const CNReport = (props) => {
    const [data, setData] = useState([])
    const [button, setButton] = useState('Send Mail')
    const [cndetails, setCndetails] = useState({
        cn_date: "",
        mast_id: "",
        cust_id: "",
        inv_no: "",
        inv_date: "",
        total_amt: "",
        net_amt: "",
        location: "",
        fins_year: ""
    })

    const handleClickConfirm = async (e) => {
        e.preventDefault()
        const useremail = document.getElementById('userid').value
        const userpassword = document.getElementById('userPassword').value
        const result = await CheckLoginUser(useremail, userpassword)
        console.log(result)
        if (result == 'Confirmed') {
            document.getElementById('cndetails').style.display = 'flex'
        }
    }

    const handleClickSendMail = async (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation')
        const cn_no = 'CN00001'
        const remark = document.getElementById('remark').value
        const userid = localStorage.getItem('User_id');
        const total_cn_amt = document.getElementById('total_cn_amt').value
        console.log(org, cn_no, cndetails.cn_date, cndetails.mast_id, cndetails.cust_id, cndetails.inv_no, cndetails.inv_date, cndetails.total_amt, cndetails.net_amt, remark, cndetails.location, cndetails.fins_year, userid, total_cn_amt)
        const result = await InsertCreditNote(org, cn_no, cndetails.cn_date, cndetails.mast_id, cndetails.cust_id, cndetails.inv_no, cndetails.inv_date, cndetails.total_amt, cndetails.net_amt, remark, cndetails.location, cndetails.fins_year, userid, total_cn_amt)
        console.log(result)
        if(result=='Added'){
            window.location.reload()
        }
    }



    const columns = [
        {
            name: 'Customer Name',
            selector: 'consignee',
            sortable: true
        },
        {
            name: 'Invoice Number',
            selector: 'invoice_no',
            sortable: true
        },
        {
            name: 'Invoice Date',
            selector: 'Joindate',
            sortable: true
        },
        {
            name: 'Invoice Amount',
            selector: 'invoice_amt',
            sortable: true
        },
        {
            name: 'Location',
            selector: 'location_name',
            sortable: true
        },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('invno').value = row.invoice_no
                    document.getElementById('invdate').value = row.Joindate
                    document.getElementById('invyear').value = row.fin_year
                    document.getElementById('invamount').value = row.invoice_amt
                    document.getElementById('customer').value = row.consignee

                    setCndetails({
                        ...cndetails,
                        cn_date: row.Joindate,
                        mast_id: row.cust_family,
                        cust_id: row.custid,
                        inv_no: row.invoice_no,
                        inv_date: row.Joindate,
                        total_amt: row.billsubtotal,
                        net_amt: row.invoice_amt,
                        location: row.location,
                        fins_year: row.fin_year

                    })
                }} className="btn btn-success"
                    data-toggle="modal" data-target="#exampleModalCenter" >{button} </button>
            ]
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
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Verification</h5>

                            </div>
                            <div class="modal-body">
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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleClickConfirm}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal End */}

                {/* Modal CN Details Start */}
                <div className='position-absolute' id="cndetails" style={{ top: "85%", left: "40%", transform: "translate(-40%,-40%)", width: "70%", display: "none" }}>

                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Details</h5>

                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="userid">Invoice Number</label>
                                            <input type="text" className="form-control" id="invno" aria-describedby="emailHelp" disabled />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label htmlFor="userid">Invoice Date</label>
                                            <input type="date" className="form-control" id="invdate" aria-describedby="emailHelp" disabled />
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="userid">Financial Year</label>
                                            <input type="text" className="form-control" id="invyear" aria-describedby="emailHelp" disabled />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label htmlFor="userid">Invoice Amount</label>
                                            <input type="text" className="form-control" id="invamount" aria-describedby="emailHelp" disabled />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="userid">Customer</label>
                                            <input type="text" className="form-control" id="customer" aria-describedby="emailHelp" disabled />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label htmlFor="userid">Total CR Amount</label>
                                            <input type="number" className="form-control" id="total_cn_amt" aria-describedby="emailHelp" placeholder="Enter Amount" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="userid">Reason</label>
                                        <textarea type="text" className="form-control" id="remark" aria-describedby="emailHelp" placeholder="Enter Reason" />
                                    </div>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={() => { document.getElementById('cndetails').style.display = 'none' }}>Close</button>
                                <button type="button" class="btn btn-primary" onClick={handleClickSendMail}>Send Mail</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal CN Details End */}


            </div>

        </>
    )

}

export default CNReport