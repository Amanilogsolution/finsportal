import React, { useState, useEffect, useRef } from 'react'
import Header from "../../Header/Header";
import { getDNData, GetBillData, GetSubBillItems, UpdateDebitNote, InsertSubDebitNote, SelectDnSubDetails,UpdateBillDNFlag } from "../../../api/index"
import Footer from "../../Footer/Footer";
import VendorCreditsPreview from './VendorCreditsPreview/VendorCreditsPreview'
import LoadingPage from '../../loadingPage/loadingPage';

function VendorCredits() {
    const btn = useRef(null)
    const [loading, setLoading] = useState(false)

    const [billdata, setBillData] = useState({})
    const [Dndata, setDnData] = useState({})
    const [BillSub, setBillSub] = useState([])
    const [subDetails, setSubDetails] = useState([])
    const [sendRequest, setSendRequest] = useState(false);
    const [DebitCodeSub, setDebitCodeSub] = useState([{
        dn_no: '',
        voucher_no: '',
        bill_no: '',
        location: '',
        items: '',
        emp_name: '',
        gl_code: '',
        amt: '',
        pass_amt: '',
        sub_id: '',
        balance_amt: '',
    }])
    const [subTotal, setSubTotal] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (sendRequest) {
                setSendRequest(false);
            }
            const org = localStorage.getItem('Organisation')
            const result = await getDNData(org, localStorage.getItem('dnno'))
            setDnData(result)
            const BillData = await GetBillData(org, result.voucher_no)
            setBillData(BillData)
            Billdate(BillData.billdate)
            const BillSub = await GetSubBillItems(org, result.voucher_no)
            setBillSub(BillSub)
            const Subdata = await SelectDnSubDetails(org, result.dn_no, result.voucher_no, BillSub.length)
            setSubDetails(Subdata)
            setLoading(true)

        }
        fetchData()
    }, [sendRequest])

    const Billdate = (billdate) => {
        var date = new Date(billdate);
        var year = date.getFullYear() + 1
        var today = year + "-" + '09' + "-" + '30';
        if (billdate > today) {
            alert('Cannt Do GST')
        }
        console.log(today, billdate)
    }

    const handleChangePassAmount = (value, index, id) => {
        let dn_no = document.getElementById('DnAmount').value
        let voucher_no = document.getElementById('Voucher_no').value
        let bill_no = document.getElementById('Bill_no').value
        let location = BillSub[index]['location']
        let items = document.getElementById(`Items${index}`).innerHTML
        let emp_name = BillSub[index]['emp_name']
        let gl_code = document.getElementById(`glCode${index}`).innerHTML
        let amt = document.getElementById(`Amt${index}`).innerHTML
        let Balancevalue = amt - value
        let sum = 0
        if (Balancevalue < 0) {
            alert(`You cannot pass More than ${amt}`)
            document.getElementById(`PassAmount${index}`).value = ''
            document.getElementById(`AmountLeft${index}`).innerHTML = amt
            return
        } else {
            setTimeout(() => {
                subTotal[index] = value
                DebitCodeSub[index] = {
                    dn_no: dn_no,
                    voucher_no: voucher_no,
                    bill_no: bill_no,
                    location: location,
                    items: items,
                    emp_name: emp_name,
                    gl_code: gl_code,
                    amt: amt,
                    pass_amt: value,
                    sub_id: id,
                    balance_amt: Balancevalue
                }
                subTotal.map(item => sum += Number(item))
                setSendRequest(true)
                document.getElementById(`AmountLeft${index}`).innerHTML = Balancevalue
                document.getElementById('totalCnAmt').innerHTML = sum
            }, 1000)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(false)
        const org = localStorage.getItem('Organisation')
        let vend_id = billdata.vend_id
        let voucher_no = Dndata.voucher_no
        let bill_date = billdata.billdate
        let total_bill_amt = billdata.bill_amt
        let net_amt = billdata.total_bill_amt
        let location = billdata.location
        let total_gst_amount = billdata.taxable_amt
        let cgst_amount = billdata.cgst_amt
        let sgst_amount = billdata.sgst_amt
        let igst_amount = billdata.igst_amt
        let tds_head = billdata.tds_head
        let tds_amt = billdata.tds_amt
        let tds_per = billdata.tds_per
        let expense_amt = billdata.expense_amt
        let fins_year = billdata.fins_year
        const dn_no = Dndata.dn_no
        const user_id = localStorage.getItem('User_id')
        const remark = document.getElementById('remarks').value
        const value = document.getElementById('totalCnAmt').innerHTML

        const result = await UpdateDebitNote(org, vend_id, bill_date, total_bill_amt, net_amt, location, total_gst_amount, cgst_amount, sgst_amount, igst_amount, tds_head, tds_amt, tds_per
            , expense_amt, fins_year, dn_no, voucher_no, user_id)

        DebitCodeSub.forEach(async (item) => {
            const SubDn = await InsertSubDebitNote(org, dn_no, voucher_no, item.bill_no, item.location, item.items, item.emp_name, item.gl_code, item.amt, fins_year, item.balance_amt, item.pass_amt, remark, user_id, item.sub_id)
        })
        if (result == "Updated") {
            const DnFlag =await UpdateBillDNFlag(org,'3',Dndata.total_dn_amt,billdata.vourcher_no)

            window.location.href = "./DebitNotes"
        }
        else {
            alert('Server Not Response')
            setLoading(true)
        }
    }


    const apiCAll = (e) => {
        e.preventDefault()
        const value = document.getElementById('totalCnAmt').innerHTML
        if (Number(Dndata.total_dn_amt) > value) {
            btn.current.click()
        } else {
            handleClick()
        }
    }

    return (
        <div>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <div className="content-wrapper">
                            <h3 className="pt-3 px-4 pb-2">Debit Note</h3>
                            <div className="container-fluid">
                                <div className="card">
                                    <article className="card-body">
                                        <form autoComplete="off">
                                            <div className="form-row">
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Vendor Name  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.vend_name} disabled />
                                                </div>
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Location  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.location} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row ">
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Voucher Number  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Voucher_no" value={billdata.vourcher_no} disabled />
                                                </div>
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Voucher Date  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.voudate} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row ">
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Bill Number  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Bill_no" value={billdata.bill_no} disabled />
                                                </div>
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Bill Date  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.billdate} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row ">
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >DN Number  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="DnAmount" value={Dndata.dn_no} disabled />
                                                </div>
                                                <div className="d-flex col-md-6 mt-2">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >Dn Date  </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={Dndata.dn_Date} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <div className="d-flex col-md-6 ">
                                                    <label className="col-md-4 col-form-label font-weight-normal" >DN Amount </label>
                                                    <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={Dndata.total_dn_amt} disabled />
                                                </div>
                                            </div>
                                            <div className=' overflow-auto'>
                                                <table className="table table-bordered mt-3">
                                                    <thead>
                                                        <tr className='text-center'>
                                                            <th scope="col">Item</th>
                                                            <th scope="col">GL Code</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Balance Amount</th>
                                                            <th scope="col">passAmount</th>
                                                            <th scope="col">Amount Left</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            BillSub.map((element, index) => (
                                                                <tr key={index}>
                                                                    <td className="col-md-2 px-1 text-center" id={`Items${index}`}>{element.item_name}</td>
                                                                    <td className="col-md-2 px-1 text-center" id={`glCode${index}`}>{element.glcode}</td>
                                                                    <td className="col-md-2 px-1 text-center" >{element.amt}</td>
                                                                    <td className="col-md-2 px-1 text-center" id={`Amt${index}`}>{subDetails.length > 0 ? subDetails.find(val => val.bill_sub_sno == `${element.sno}`).balance_amt : element.amt}</td>
                                                                    <td className="col-md-2 px-1 "><input style={{ border: "none" }} className='text-center form-control col' type="number" id={`PassAmount${index}`} placeholder="Pass Amount" onChange={(e) => { handleChangePassAmount(e.target.value, index, element.sno) }} /></td>
                                                                    <td className="col-md-2 px-1 text-center text-danger" id={`AmountLeft${index}`}></td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div style={{ width: "40%" }}>
                                                    <div className="form p-0">
                                                        <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remark</label>
                                                        <div className="d-flex col-md px-0">
                                                            <textarea type="text" className="form-control " rows="5" id="remarks" placeholder="Remark" style={{ resize: "none" }} ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                                    <table className='mx-3' style={{ width: "95%" }}>
                                                        <tbody >
                                                            <tr scope="row">
                                                                <td colSpan='2' ><h4 > Total CN Amount</h4></td>
                                                                <td id="totalCnAmt" className="text-danger text-center" style={{ minWidth: '100px' }}><h4>0</h4></td>
                                                            </tr>
                                                            <tr scope="row">
                                                                <td colSpan='2' className=''><h4>Net Total</h4></td>
                                                                <td className='text-center' ><h4>{billdata.bill_amt}</h4></td>
                                                            </tr>
                                                            <tr>
                                                                <td className='col-md-4'>IGST</td>
                                                                <td className=' col-md-3 p-0 bg-transparent '>
                                                                    <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-2  cursor-notallow" id='igst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className=' text-center'>{billdata.igst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='col-md-4'>CGST</td>
                                                                <td className='col-md-4 p-0 bg-transparent'>
                                                                    <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-2   cursor-notallow" id='cgst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>{billdata.cgst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='col-md-4'>SGST</td>
                                                                <td className=' col-md p-0 bg-transparent'>
                                                                    <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-2  cursor-notallow" id='sgst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>{billdata.sgst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='col-md-4'>Total GST</td>
                                                                <td className=' col-md p-0 bg-transparent'>
                                                                    <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-2   cursor-notallow" id='tgst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center'>{billdata.taxable_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='col-md-4'>TDS</td>
                                                                <td className=' col-md p-0 bg-transparent'>
                                                                    <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-2 cursor-notallow" id='cgst-inp' disabled defaultValue={billdata.tds_per} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center' >{billdata.tds_amt}</td>
                                                            </tr>
                                                            <tr >
                                                                <td colSpan='2'><h4>Total (₹)</h4></td>
                                                                <td className='text-center'><h4>{billdata.total_bill_amt}</h4></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </form>
                                    </article>
                                    <div className="card-footer border border-top">
                                        <div className="col-md-20" style={{ width: "100%" }}>
                                            <button id="save" name="save" className="btn btn-danger" onClick={apiCAll}>
                                                Create</button>
                                            <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
                                                name="clear" className="btn ml-2 btn-secondary">Cancel</button>
                                            <button className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModal" onClick={(e) => { e.preventDefault(); console.log('nin', billdata) }}>  Preview</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" ref={btn} class="btn" data-toggle="modal" data-target="#exampleModal1">
                            </button>
                        </div>

                        : <LoadingPage />
                }
                <Footer />
            </div>
            {
                DebitCodeSub.length > 0 ? <VendorCreditsPreview data={billdata} Dndata={Dndata} DebitCodeSub={DebitCodeSub} /> : null
            }
            {/* #######################  Modal ###################################### */}
            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">DebitNote Request</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>{`${subTotal.length > 0 ? document.getElementById('totalCnAmt').innerHTML : '0'} is less than 
                            ${Dndata.total_dn_amt}  Are you Still want to make a Request`}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" class="btn btn-primary" onClick={handleClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VendorCredits
