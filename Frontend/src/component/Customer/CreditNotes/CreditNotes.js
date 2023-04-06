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
            console.log(result)
            const result1 = await GetSubInvoice(org, result.inv_no)
            console.log(result1)


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
                        <h3 className="pt-3 pl-4"><span className='text-danger'>C</span>redit Note</h3>
                                <div className="card">
                                    <article className="card-body" >
                                        <form autoComplete="off">
                                            <div className="form-row mt-2">
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Customer Name  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" disabled />
                                                </div>
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-4 col-form-label font-weight-normal">Location  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.location} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2 ">
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Credit Note </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Cn_no" value={data.cn_no} disabled />
                                                </div>
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Credit Note Date </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.cndate} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Invoice Date </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.inv_Date} disabled />
                                                </div>
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Financial Year </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={data.fins_year} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <div className="d-flex col-md-6">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Invoice Number </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Invoice" value={data.inv_no} disabled />
                                                </div>
                                            </div>
                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th scope="col" >Activity</th>
                                                        <th scope="col" >Charge Code</th>
                                                        <th scope="col" >Amount</th>
                                                        <th scope="col" >AmountBal</th>
                                                        <th scope="col" >PassAmt</th>
                                                        <th scope="col" >Remark</th>
                                                        <th scope="col" >AmountLeft</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        invoicesub.map((item, index) => (
                                                            <tr key={index} className='text-center'>
                                                                <td className="col-md-2 px-1  " id={`Activity${index}`}>{item.billing_code}</td>
                                                                <td className="col-md-2 px-1  " id={`Item${index}`}>{item.minor}</td>
                                                                <td className="col-md-2 px-1  " id={`Amount${index}`} >{item.amount}</td>
                                                                <td className="col-md-2 px-1  " id={`BalanceAmount${index}`}>{subDetails.length > 0 ? subDetails.find(val => val.sub_inv_id == `${item.sno}`).balance_amt : item.amount}</td>
                                                                <td className="col-md-2 px-1 "><input style={{ border: "none" }} className=' form-control col' type="number" id={`PassAmount${index}`} placeholder="PassAmount" onChange={(e) => { handleChangePassAmount(e.target.value, index, item.sno) }} /></td>
                                                                <td className="col-md-2 px-1 "><input style={{ border: "none" }} className=' form-control col' type="text" id={`Remark${index}`} placeholder="remark" onChange={(e) => { handleChangePassRemark(e.target.value, index, item.sno) }} /></td>
                                                                <td className="col-md-2 px-1 text-danger " id={`AmountLeft${index}`}></td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            <div className='d-flex justify-content-end' >
                                                <div style={{  padding: "15px", width:'330px', backgroundColor: "#eee", borderRadius: "7px" }}>
                                                    <table style={{ width: "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td>{data.total_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>CN Approved Amount</td>
                                                                <td>{data.total_cn_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><h3>Net Total(₹)</h3></td>
                                                                <td><h4>{data.net_amt}</h4></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

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
                <Footer />
            </div>
        </div>
    )
}

export default CreditNotes
