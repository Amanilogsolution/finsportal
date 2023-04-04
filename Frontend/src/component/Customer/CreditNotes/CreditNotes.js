import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getCNData, GetSubInvoice, InsertCnSub, SelectCnSubDetails } from '../../../api/index'

function CreditNotes() {
    const [invoicesub, setInvoicesub] = useState([])
    const [data, setData] = useState({})
    const [subDetails, setSubDetails] = useState([])
    const [ChargeCodeSub, setChargeCodeSub] = useState([{
        cn_no: '',
        invoice_no: '',
        activity: '',
        item: '',
        amount: '',
        balance_amt: '',
        pass_amt: '',
        remark: '',
        sub_id: ''
    }])


    useEffect(() => {
        const fetchData = async () => {
            const org = localStorage.getItem('Organisation')
            const result = await getCNData(org, localStorage.getItem('cnno'))
            setData(result)
            const result1 = await GetSubInvoice(org, result.inv_no)

            const Subdata = await SelectCnSubDetails(org, result.cn_no, result.inv_no, result1.length)
            setSubDetails(Subdata)

            setInvoicesub(result1)
            if (result1.length) {
                document.getElementById('Accountname').value = result1[0].consignee
            }
        }
        fetchData()
    }, [])

    const handleChangePassAmount = (value, index, id) => {
        let AmtBalance = document.getElementById(`BalanceAmount${index}`).innerHTML
        let CN_Number = document.getElementById('Cn_no').value
        let Invoice_no = document.getElementById('Invoice').value
        let Activity = document.getElementById(`Activity${index}`).innerHTML
        let Amount = document.getElementById(`Amount${index}`).innerHTML;
        let Remark = document.getElementById(`Remark${index}`).value
        let Item = document.getElementById(`Item${index}`).innerHTML

        let Balancevalue = AmtBalance - value
        if (Balancevalue < 0) {
            alert(`You cannot pass More than ${AmtBalance}`)
            document.getElementById(`PassAmount${index}`).value = ''
            document.getElementById(`AmountLeft${index}`).innerHTML = AmtBalance
            return
        } else {
            setTimeout(() => {
                ChargeCodeSub[index] = {
                    cn_no: CN_Number,
                    invoice_no: Invoice_no,
                    activity: Activity,
                    item: Item,
                    amount: Amount,
                    balance_amt: AmtBalance,
                    pass_amt: Balancevalue,
                    remark: Remark,
                    sub_id: id
                }
                document.getElementById(`AmountLeft${index}`).innerHTML = Balancevalue
            }, 1000)
        }
    }

    const handleChangePassRemark = (value, index, id) => {
        let AmtBalance = document.getElementById(`AmountLeft${index}`).innerHTML
        let CN_Number = document.getElementById('Cn_no').value
        let Invoice_no = document.getElementById('Invoice').value
        let Activity = document.getElementById(`Activity${index}`).innerHTML
        let Amount = document.getElementById(`Amount${index}`).innerHTML;
        let Item = document.getElementById(`Item${index}`).innerHTML
        let PassAmount = document.getElementById(`PassAmount${index}`).value

        setTimeout(() => {
            ChargeCodeSub[index] = {
                cn_no: CN_Number,
                invoice_no: Invoice_no,
                activity: Activity,
                item: Item,
                amount: Amount,
                balance_amt: AmtBalance,
                pass_amt: PassAmount,
                remark: value,
                sub_id: id
            }
        }, 1000)

    }

    const handleClick = (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation')
        const userid = localStorage.getItem('User_id')

        ChargeCodeSub.forEach(async (item, index) => {
            var result = await InsertCnSub(org, item, userid)
            console.log(result)
            if (result == "Added") {
                window.location.href = "./CreditNotesUI"
            }
        })
    }


    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />

                <div className="content-wrapper">
                    <div className="container-fluid">

                        <div className="row pt-3" >
                            <div className="col">
                                <div className="card">
                                    <article
                                        className="card-body"
                                    >
                                        <h3 className="text-left">Credit Note</h3>
                                        <br />

                                        <form autoComplete="off">
                                            <div className="form-row mt-2 ">
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Customer Name <span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" disabled />
                                                </div>
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-3 col-form-label font-weight-normal">Location <span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.location} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2 ">
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Credit Note<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Cn_no" value={data.cn_no} disabled />
                                                </div>
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-3 col-form-label font-weight-normal" >Credit Note Date<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.cndate} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Invoice Date<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.inv_Date} disabled />
                                                </div>
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-3 col-form-label font-weight-normal" >Financial Year<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.fins_year} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Invoice Number<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Invoice" value={data.inv_no} disabled />
                                                </div>
                                            </div>

                                            <hr />
                                            <table className="table table-bordered">
                                                <thead>

                                                    <tr>
                                                        <th scope="col" className='text-center'>Activity</th>
                                                        <th scope="col" className='text-center'>Charge Code</th>
                                                        <th scope="col" className='text-center'>Amount</th>
                                                        <th scope="col" className='text-center'>AmountBal</th>
                                                        <th scope="col" className='text-center'>PassAmt</th>
                                                        <th scope="col" className='text-center'>Remark</th>
                                                        <th scope="col" className='text-center'>AmountLeft</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        invoicesub.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="col-md-2 px-1 text-center " id={`Activity${index}`}>{item.billing_code}</td>
                                                                <td className="col-md-2 px-1 text-center " id={`Item${index}`}>{item.minor}</td>
                                                                <td className="col-md-2 px-1 text-center " id={`Amount${index}`} >{item.amount}</td>
                                                                <td className="col-md-2 px-1 text-center " id={`BalanceAmount${index}`}>{subDetails.length > 0 ? subDetails.find(val => val.sub_inv_id == `${item.sno}`).balance_amt : item.amount}</td>
                                                                <td className="col-md-2 px-1 "><input style={{ border: "none" }} className='text-center form-control col' type="number" id={`PassAmount${index}`} placeholder="PassAmount" onChange={(e) => { handleChangePassAmount(e.target.value, index, item.sno) }} /></td>
                                                                <td className="col-md-2 px-1 "><input style={{ border: "none" }} className='text-center form-control col' type="text" id={`Remark${index}`} placeholder="remark" onChange={(e) => { handleChangePassRemark(e.target.value, index, item.sno) }} /></td>
                                                                <td className="col-md-2 px-1 text-danger text-center" id={`AmountLeft${index}`}></td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>

                                            <hr />
                                            <div style={{ display: "flex" }}>
                                                <div style={{ width: "40%" }}>
                                                </div>
                                                <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                                    <table style={{ width: "100%" }}>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Sub Total</td>
                                                                <td></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Discount</td>
                                                                <td><input type="" /></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td><input placeholder="Adjustment" /></td>
                                                                <td><input type="" /></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TCS</td>
                                                                <td><input type="text" placeholder="Select Tax" /></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <br />
                                                            <tr>
                                                                <td><h3>Total(₹)</h3></td>
                                                                <td></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                                <div className="col-md-20" style={{ width: "100%" }}>
                                                    <button id="save" name="save" className="btn btn-danger" onClick={handleClick}>
                                                        Post
                                                    </button>
                                                    <button id="clear" onClick={(e) => {
                                                        e.preventDefault(); window.location.href = '/CreditNotesUI'
                                                    }} name="clear" className="btn btn-secondary ml-2">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CreditNotes
