import React, { useState, useEffect, useRef } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import './creditnote.css'
import { getCNData, GetSubInvoice, InsertCnSub, SelectCnSubDetails, locationAddress, GetInvoice, Getfincialyearid, ChangeCNStatus, UpdateInvoiceCNFlag } from '../../../api/index'
import CreditNotePreview from './CreditNotePreview/CreditNotePreview'

function CreditNotes() {
    const btn = useRef(null)
    const [sendRequest, setSendRequest] = useState(false);
    const [invoicesub, setInvoicesub] = useState([])
    const [data, setData] = useState({})
    const [subDetails, setSubDetails] = useState([])
    const [location, setLocation] = useState([])
    const [custname, setCustname] = useState('')
    const [invoicedata, setInvoiceData] = useState({})
    const [ChargeCodeSub, setChargeCodeSub] = useState([{

        cn_no: '',
        invoice_no: '',
        activity: '',
        item: '',
        amount: '',
        balance_amt: '',
        pass_amt: '',
        sub_id: '',
        cgstper: '',
        cgstamt: '',
        igstper: '',
        igstamt: '',
        sgstper: '',
        sgstamt: '',
        glcode: ''
    }])
    const [subTotal, setSubTotal] = useState([])
    const [TotalCN, setTotalCN] = useState([])
    const [taxvalue, settaxvalue] = useState([])
    const [cnData, setCnData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            if (sendRequest) {
                //send the request
                setSendRequest(false);
            }
            const org = localStorage.getItem('Organisation')
            const result = await getCNData(org, localStorage.getItem('cnno'))
            setData(result)
            Invdate(result.inv_Date)
            const Invoice = await GetInvoice(org, result.inv_no)
            setInvoiceData(Invoice[0])
            const result1 = await GetSubInvoice(org, result.inv_no)
            setInvoicesub(result1)
            const result2 = await locationAddress(org, result.location)
            setLocation(result2)
            const Subdata = await SelectCnSubDetails(org, result.cn_no, result.inv_no, result1.length)
            setSubDetails(Subdata)

            if (result1.length) {
                document.getElementById('Accountname').value = result1[0].consignee
                setCustname(result1[0].consignee)
            }
        }
        fetchData()
    }, [sendRequest])

    const Invdate = (invdate) => {
        var date = new Date(invdate);
        var year = date.getFullYear() + 1
        var today = year + "-" + '09' + "-" + '30';
        if (invdate > today) {
            alert('Cannt Do GST')
        }
    }

    const handleChangePassAmount = (value, index, id) => {
        let AmtBalance = document.getElementById(`BalanceAmount${index}`).innerHTML
        let CN_Number = document.getElementById('Cn_no').value
        let Invoice_no = document.getElementById('Invoice').value
        let Activity = document.getElementById(`Activity${index}`).innerHTML
        let Amount = invoicesub[index].amount
        let Item = document.getElementById(`Item${index}`).innerHTML
        const TotalTax = Number(invoicesub[index].cgst_rate) + Number(invoicesub[index].igst_rate) + Number(invoicesub[index].sgst_rate)
        const valTax = Math.round((value * Number(TotalTax)) / 100)
        let TotalTaxValue = Number(value) + Number(valTax)
        let sum = 0
        let totalcn = 0
        let taxval = 0
        let Balancevalue = AmtBalance - TotalTaxValue

        if (Balancevalue < 0) {
            alert(`You cannot pass More than ${AmtBalance}`)
            setTimeout(() => {
                document.getElementById(`PassAmount${index}`).value = ''
                document.getElementById(`AmountLeft${index}`).innerHTML = AmtBalance
                document.getElementById('totalCnAmt').innerHTML = 0
                // document.getElementById(`Total${index}`).innerHTML = 0
            }, 1000)
            return
        } else {
            taxvalue[index] = valTax
            TotalCN[index] = TotalTaxValue
            subTotal[index] = value
            if (Number(invoicesub[index].igst_rate) > 0) {
                let subdata = ChargeCodeSub
                subdata[index] = {
                    cn_no: CN_Number,
                    invoice_no: Invoice_no,
                    activity: Activity,
                    item: Item,
                    amount: Amount,
                    balance_amt: Balancevalue,
                    pass_amt: value,
                    sub_id: id,
                    cgstper: invoicesub[index].cgst_rate,
                    cgstamt: 0,
                    igstper: invoicesub[index].igst_rate,
                    igstamt: valTax,
                    sgstper: invoicesub[index].sgst_rate,
                    sgstamt: 0,
                    glcode: invoicesub[index].glcode
                }
                setChargeCodeSub(subdata)

            } else {
                let subdata = ChargeCodeSub
                subdata[index] = {
                    cn_no: CN_Number,
                    invoice_no: Invoice_no,
                    activity: Activity,
                    item: Item,
                    amount: Amount,
                    balance_amt: Balancevalue,
                    pass_amt: value,
                    sub_id: id,
                    cgstper: invoicesub[index].cgst_rate,
                    cgstamt: valTax / 2,
                    igstper: invoicesub[index].igst_rate,
                    igstamt: 0,
                    sgstper: invoicesub[index].sgst_rate,
                    sgstamt: valTax / 2,
                    glcode: invoicesub[index].glcode

                }
                setChargeCodeSub(subdata)
            }
            subTotal.map(item => sum += Number(item))
            TotalCN.map(item => totalcn += Number(item))
            taxvalue.map(item => taxval += Number(item))

            setSendRequest(true)
            document.getElementById(`AmountLeft${index}`).innerHTML = Balancevalue
            document.getElementById('totalCnAmt').innerHTML = sum
            // document.getElementById(`Total${index}`).innerHTML = TotalTaxValue
            document.getElementById('grandTotal').innerHTML = totalcn

            if (Number(invoicesub[index].igst_rate) > 0) {
                document.getElementById('igstamt').innerHTML = taxval
                document.getElementById('cgst').innerHTML = 0
                document.getElementById('sgst').innerHTML = 0

                let cnGstData = data;
                cnGstData.cgst_amt = 0
                cnGstData.sgst_amt = 0
                cnGstData.igst_amt = taxval

                cnGstData.cgst_rate = Number(invoicesub[index].cgst_rate)
                cnGstData.sgst_rate = Number(invoicesub[index].sgst_rate)
                cnGstData.igst_rate = Number(invoicesub[index].igst_rate)

                cnGstData.total_gst_amt = taxval
                cnGstData.total_gstrate = Number(invoicesub[index].igst_rate)

                setCnData(cnGstData)

            } else {
                document.getElementById('igstamt').innerHTML = 0
                document.getElementById('cgst').innerHTML = taxval / 2
                document.getElementById('sgst').innerHTML = taxval / 2

                let cnGstData = data;
                cnGstData.cgst_amt = taxval / 2
                cnGstData.sgst_amt = taxval / 2
                cnGstData.igst_amt = 0

                cnGstData.cgst_rate = Number(invoicesub[index].cgst_rate)
                cnGstData.sgst_rate = Number(invoicesub[index].sgst_rate)
                cnGstData.igst_rate = Number(invoicesub[index].igst_rate)
                cnGstData.total_gst_amt = taxval
                cnGstData.total_gstrate = Number(invoicesub[index].igst_rate)

                // console.log(cnGstData)
                setCnData(cnGstData)

                // setData({ ...data, 
                //     cgst_amt : taxval / 2,
                //     sgst_amt : taxval / 2,
                //     igst_amt : 0,
                //     cgst_rate : Number(invoicesub[index].cgst_rate),
                //     sgst_rate : Number(invoicesub[index].sgst_rate),
                //     igst_rate : Number(invoicesub[index].igst_rate)
                // })
            }
        }
    }

    const handleClick = async () => {
        const org = localStorage.getItem('Organisation')
        const userid = localStorage.getItem('User_id')
        const remark = document.getElementById('Remark').value
        let statusUpdate = await ChangeCNStatus(org, 'Done', data.sno)
        const InvoiceFlag = await UpdateInvoiceCNFlag(org, '3', data.total_cn_amt, data.inv_no)

        var resultAddedCN = ''
        ChargeCodeSub.forEach(async (item, index) => {
            resultAddedCN = await InsertCnSub(org, item, userid, remark)
            if (ChargeCodeSub.length - 1 == index) {
                let statusUpdate = await ChangeCNStatus(org, 'Done', data.sno)
                window.location.href = "./CreditNotesUI"
            }
        })
    }

    const apiCAll = (e) => {
        e.preventDefault()
        const value = document.getElementById('totalCnAmt').innerHTML
        if (Number(data.total_cn_amt) > value) {
            btn.current.click()
        } else {
            handleClick()
        }
    }

    const handleRemark = (e) => {
        setCnData({ ...cnData, remark: e.target.value })
        // setData({ ...data, remark: e.target.value })
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
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row mt-2">
                                        <div className="d-flex col-md-6">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Customer Name  </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" disabled />
                                        </div>
                                        <div className="d-flex col-md-6">
                                            <label className="col-md-4 col-form-label font-weight-normal">Location  </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={`${location.location_add1},${location.location_city},${location.location_state},${location.location_country}`} disabled />
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
                                        <div className="d-flex col-md-6">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Approved Amount </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Invoice" value={data.total_cn_amt} disabled />
                                        </div>
                                    </div>
                                    <div className='cn_table_div overflow-auto'>
                                        <table className="table table-bordered mt-3 table-sm">
                                            <thead>
                                                <tr className='text-center'>
                                                    <th scope="col" >Activity</th>
                                                    <th scope="col" >Charge Code</th>
                                                    {/* <th scope="col" >Amount</th> */}
                                                    <th scope="col" >AmountBal</th>
                                                    {/* <th scope="col" >Taxable Amount</th> */}
                                                    <th scope="col" >PassAmt</th>
                                                    {/* <th scope="col" > TotalCN </th> */}
                                                    <th scope="col" >AmountLeft</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    invoicesub.map((item, index) => (
                                                        <tr key={index} className='text-center'>
                                                            <td className="col-md-2 px-1  " id={`Activity${index}`}>{item.billing_code}</td>
                                                            <td className="col-md-2 px-1 " id={`Item${index}`}>{item.minor}</td>
                                                            {/* <td className="col-md-2 px-1  " id={`Amount${index}`} >{item.amount}</td> */}
                                                            <td className="col-md-2 px-1  " id={`BalanceAmount${index}`}>{subDetails.length > 0 ? subDetails.find(val => val.sub_inv_id == `${item.sno}`).balance_amt : item.amount}</td>
                                                            {/* <td className="col-md-2 px-1  "  >{item.taxableamount}</td> */}
                                                            <td className="col-md-2 px-1 "><input style={{ border: "none" }} className=' form-control col' type="number" id={`PassAmount${index}`} placeholder="PassAmount" onChange={(e) => { handleChangePassAmount(e.target.value, index, item.sno) }} /></td>
                                                            {/* <td className="col-md-2 px-1  " id={`Total${index}`} ></td> */}
                                                            <td className="col-md-2 px-1 text-danger " id={`AmountLeft${index}`}></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='d-flex my-2' >
                                        <div style={{ width: "40%" }}>
                                            <div className="form">
                                                <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remark</label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="5" id="Remark" placeholder="Remarks" style={{ resize: "none" }} onBlur={handleRemark}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: "60%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                            <table className='mx-3' style={{ width: "95%" }}>
                                                <tbody>
                                                    <tr scope="row">
                                                        <td className="col-md-3"><h4>Net Total</h4></td>
                                                        <td className="col-md-5"></td>
                                                        <td className="col-md-2 text-danger"><h4 id="totalCnAmt">0</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-md-3">CGST </td>
                                                        <td>
                                                            <div className="input-group  col-md-5" >
                                                                <input type="number" className='form-control col  cursor-notallow' defaultValue={invoicedata ? invoicedata.cgst_amt : ""} disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="col-md-2" id="cgst">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-md-3">SGST / UTGST </td>
                                                        <td>
                                                            <div className="input-group  col-md-5" >
                                                                <input type="number" className='form-control col  cursor-notallow' defaultValue={invoicedata ? invoicedata.sgst_amt : ""} disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="col-md-2" id="sgst">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-md-3" >IGST </td>
                                                        <td>
                                                            <div className="input-group  col-md-5" >
                                                                <input type="number" className='form-control col  cursor-notallow' defaultValue={invoicedata ? invoicedata.igst_amt : ""} disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="col-md-2" id="igstamt">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-md-3"><h3> Total(₹)</h3></td>
                                                        <td className="col-md-5"></td>
                                                        <td className="col-md-2"><h4 id="grandTotal">0</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-20" style={{ width: "100%" }}>
                                            <button id="save" name="save" className="btn btn-danger" onClick={apiCAll}>Create </button>
                                            <button id="clear" onClick={(e) => {
                                                e.preventDefault(); window.location.href = '/CreditNotesUI'
                                            }} name="clear" className="btn btn-secondary ml-2"> Cancel </button>
                                            <button className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModal" onClick={(e) => { e.preventDefault();}}>Preview</button>
                                        </div>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
                <button type="button" ref={btn} className="btn" data-toggle="modal" data-target="#exampleModal1">
                </button>
                <Footer />
            </div>
            {
                ChargeCodeSub.length > 0 ?
                    <CreditNotePreview ChargeCodeSub={ChargeCodeSub} data={cnData} location={location} custname={custname} />
                    : null
            }
            <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">DebitNote Request</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{`
                            ${!data.total_cn_amt ? '0' : document.getElementById('totalCnAmt').innerHTML}
                            is less than 
                            ${data.total_cn_amt} 
                            Are you Still want to make a Request`}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditNotes