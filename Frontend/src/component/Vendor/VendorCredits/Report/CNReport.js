import React, { useEffect, useState } from 'react'
import Table from './Table/Table'
import { CheckLoginUser, InsertDebitNote, Getfincialyearid, Updatefinancialcount, UpdateBillDNFlag } from '../../../../api/index'


const CNReport = (props) => {
    const [data, setData] = useState([])
    const [button, setButton] = useState('Send Mail')
    const [date, setDate] = useState()
    const [cndetails, setCndetails] = useState({
        bill_no: "",
        vourcher_no: ""

    })

    const [dn_no, setDN_NO] = useState('')
    const [DNcount, setDNCount] = useState(0)

    const handleClickConfirm = async (e) => {
        e.preventDefault()
        const useremail = document.getElementById('userid').value
        const userpassword = document.getElementById('userPassword').value
        const result = await CheckLoginUser(useremail, userpassword)
        if (result === 'Confirmed') {
            document.getElementById('cndetails').style.display = 'flex'
        }
    }

    const handleClickSendMail = async (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation')
        const remark = document.getElementById('remark').value
        const userid = localStorage.getItem('User_id');
        const total_cn_amt = document.getElementById('total_cn_amt').value
        const result = await InsertDebitNote(org, dn_no, date, total_cn_amt, remark, cndetails.bill_no, cndetails.vourcher_no, userid)
        await Updatefinancialcount(org, 'dn_count', DNcount)
        const DnFlag = await UpdateBillDNFlag(org, '1', total_cn_amt, cndetails.vourcher_no)
        if (result === 'Added') {
            window.location.reload()
        }
        else {
            alert('Server Not Response')
        }
    }

    const columns = [
        {
            name: 'Vendor Name',
            selector: 'vend_name',
            sortable: true
        },
        {
            name: 'Bill Number',
            selector: 'bill_no',
            sortable: true
        },
        {
            name: 'Invoice Date',
            selector: 'Joindate',
            sortable: true
        },
        // {
        //     name: 'PO Number',
        //     selector: 'po_no',
        //     sortable: true
        // },
        // {
        //     name: 'Voucher Number',
        //     selector: 'vourcher_no',
        //     sortable: true
        // },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => [
                <button id='previewbtn' type="button" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('invno').value = row.bill_no
                    document.getElementById('invdate').value = row.Joindate
                    document.getElementById('invyear').value = row.vourcher_no
                    document.getElementById('invamount').value = row.bill_amt
                    document.getElementById('customer').value = row.vend_name
                    setCndetails({
                        ...cndetails,
                        bill_no: row.bill_no,
                        vourcher_no: row.vourcher_no,
                    })
                }} className="btn btn-success"
                    data-toggle="modal" data-target="#exampleModalCenter" >{button} </button>
            ]
        }

    ]

    useEffect(() => {
        async function fetchdata() {
            const org = localStorage.getItem('Organisation')
            setData(props.displaydata)
            Todaydate()
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].dn_count) + 1
            setDN_NO(id[0].dn_ser + id[0].year + String(lastno).padStart(5, '0'))
            setDNCount(lastno)
        }
        fetchdata()
    }, [])
    const Todaydate = () => {
        var date = new Date();
        // var myDate = new Date(new Date().getTime() + (180 * 24 * 60 * 60 * 1000));
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        setDate(today)
    }

    const tableData = {
        columns, data
    }

    return (
        <>
            <div>
                <div>
                    <h4 className='text-center'>DebitNote <span className='text-danger'>Report</span></h4>
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
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClickConfirm}>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal End */}

                {/* Modal CN Details Start */}
                <div className='position-absolute' id="cndetails" style={{ top: "0%", left: "40%", transform: "translate(-40%,-5%)", width: "70%", display: "none" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Details</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="invno">Bill Number</label>
                                            <input type="text" className="form-control" id="invno" aria-describedby="emailHelp" disabled />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="invdate">Bill Date</label>
                                            <input type="date" className="form-control" id="invdate" aria-describedby="emailHelp" disabled />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="invyear">Voucher No</label>
                                            <input type="text" className="form-control" id="invyear" aria-describedby="emailHelp" disabled />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="invamount">Bill Amount</label>
                                            <input type="text" className="form-control" id="invamount" aria-describedby="emailHelp" disabled />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="customer">Vendor</label>
                                            <input type="text" className="form-control" id="customer" aria-describedby="emailHelp" disabled />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="total_cn_amt">Total DR Amount</label> <span className='text-danger'>*</span>
                                            <input type="number" className="form-control" id="total_cn_amt" aria-describedby="emailHelp" placeholder="Enter Amount" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="remark">Reason</label>
                                        <textarea type="text" className="form-control" id="remark" aria-describedby="emailHelp" placeholder="Enter Reason" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { document.getElementById('cndetails').style.display = 'none' }}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClickSendMail}>Send Mail</button>
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
