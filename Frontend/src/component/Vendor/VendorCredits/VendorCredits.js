import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import { getDNData, GetBillData, GetSubBillItems, UpdateDebitNote, InsertSubDebitNote, SelectDnSubDetails } from "../../../api/index"
import Footer from "../../Footer/Footer";
import VendorCreditsPreview from './VendorCreditsPreview/VendorCreditsPreview'

function VendorCredits() {
    const [billdata, setBillData] = useState({})
    const [Dndata, setDnData] = useState({})
    const [BillSub, setBillSub] = useState([])
    const [subDetails, setSubDetails] = useState([])

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
        narration: '',
        sub_id: '',
        balance_amt: '',

    }])


    useEffect(() => {
        const fetchData = async () => {
            const org = localStorage.getItem('Organisation')
            const result = await getDNData(org, localStorage.getItem('dnno'))
            setDnData(result)

            const BillData = await GetBillData(org, result.voucher_no)
            setBillData(BillData)

            const BillSub = await GetSubBillItems(org, result.voucher_no)
            setBillSub(BillSub)

            const Subdata = await SelectDnSubDetails(org, result.dn_no, result.voucher_no, BillSub.length)
            setSubDetails(Subdata)
        }
        fetchData()
    }, [])

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
        let Remark = document.getElementById(`Remark${index}`).value

        if (Balancevalue < 0) {
            alert(`You cannot pass More than ${amt}`)
            document.getElementById(`PassAmount${index}`).value = ''
            document.getElementById(`AmountLeft${index}`).innerHTML = amt
            return
        } else {
            setTimeout(() => {
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
                    narration: Remark,
                    sub_id: id,
                    balance_amt: Balancevalue
                }
                document.getElementById(`AmountLeft${index}`).innerHTML = Balancevalue

            }, 1000)
        }
    }

    const handleChangePassRemark = (value, index, id) => {
        let dn_no = document.getElementById('DnAmount').value
        let voucher_no = document.getElementById('Voucher_no').value
        let bill_no = document.getElementById('Bill_no').value
        let location = BillSub[index]['location']
        let items = document.getElementById(`Items${index}`).innerHTML
        let emp_name = BillSub[index]['emp_name']
        let gl_code = document.getElementById(`glCode${index}`).innerHTML
        let amt = document.getElementById(`Amt${index}`).innerHTML
        let Balancevalue = document.getElementById(`PassAmount${index}`).value
        let bal = document.getElementById(`AmountLeft${index}`).innerHTML

        setTimeout(() => {
            DebitCodeSub[index] = {
                dn_no: dn_no,
                voucher_no: voucher_no,
                bill_no: bill_no,
                location: location,
                items: items,
                emp_name: emp_name,
                gl_code: gl_code,
                amt: amt,
                pass_amt: Balancevalue,
                narration: value,
                sub_id: id,
                balance_amt: bal
            }
        }, 1000)
    }

    const handleClick = async (e) => {
        e.preventDefault();
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

        const result = await UpdateDebitNote(org, vend_id, bill_date, total_bill_amt, net_amt, location, total_gst_amount, cgst_amount, sgst_amount, igst_amount, tds_head, tds_amt, tds_per
            , expense_amt, fins_year, dn_no, voucher_no, user_id)

        DebitCodeSub.forEach(async (item) => {
            const SubDn = await InsertSubDebitNote(org, dn_no, voucher_no, item.bill_no, item.location, item.items, item.emp_name, item.gl_code, item.amt, fins_year, item.balance_amt, item.pass_amt, item.narration, user_id, item.sub_id)
        })
        if (result == "Added") {
            window.location.href = "./DebitNotes"
        }


    }

    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div className="content-wrapper">
                    <h3 className="pt-3 px-4 pb-2"> New Debit Note</h3>
                    <div className="container-fluid">
                        <div className="card">
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row mt-2">
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Vendor Name <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.vend_name} disabled />
                                        </div>
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Location <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.location} disabled />
                                        </div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Voucher Number <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Voucher_no" value={billdata.vourcher_no} disabled />
                                        </div>
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Voucher Date <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.voudate} disabled />
                                        </div>
                                    </div>

                                    <div className="form-row mt-2">
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Bill Number <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Bill_no" value={billdata.bill_no} disabled />
                                        </div>
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Bill Date <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={billdata.billdate} disabled />
                                        </div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >DN Number <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="DnAmount" value={Dndata.dn_no} disabled />
                                        </div>
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >Dn Date <span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={Dndata.dn_Date} disabled />
                                        </div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <div className="d-flex col-md-6 ">
                                            <label className="col-md-4 col-form-label font-weight-normal" >DN Amount<span style={{ color: "red" }}>*</span> </label>
                                            <input type="text" className="form-control col-md-6 text-center" id="Accountname" value={Dndata.total_dn_amt} disabled />
                                        </div>
                                    </div>
                                    <table className="table table-bordered mt-3">
                                        <thead>
                                            <tr>
                                                <th scope="col">Item</th>
                                                <th scope="col">GL Code</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Balance Amount</th>
                                                <th scope="col">passAmount</th>
                                                <th scope="col">Narration</th>
                                                <th scope="col">AmountLeft</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                BillSub.map((element, index) => (
                                                    <tr key={index}>
                                                        <td className="col-md-2 px-1 text-center" id={`Items${index}`}>{element.item_name}</td>
                                                        <td className="col-md-2 px-1 text-center" id={`glCode${index}`}>{element.glcode}</td>
                                                        <td className="col-md-2 px-1 text-center" id={`Amt${index}`}>{element.amt}</td>
                                                        <td className="col-md-2 px-1 text-center">{subDetails.length > 0 ? subDetails.find(val => val.bill_sub_sno == `${element.sno}`).balance_amt : element.amt}</td>
                                                        <td className="col-md-2 px-1 "><input style={{ border: "none" }} className='text-center form-control col' type="number" id={`PassAmount${index}`} placeholder="Pass Amount" onChange={(e) => { handleChangePassAmount(e.target.value, index, element.sno) }} /></td>
                                                        <td className="col-md-2 px-1 "><input style={{ border: "none" }} className='text-center form-control col' type="text" id={`Remark${index}`} placeholder="Pass Remark" onChange={(e) => { handleChangePassRemark(e.target.value, index, element.sno) }} /></td>
                                                        <td className="col-md-2 px-1 text-center" id={`AmountLeft${index}`}></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "40%" }}>
                                            <div className="form mt-3">
                                                <label className="col-md-7 col-form-label font-weight-normal" >Customer Notes</label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="3" id="Accountname" placeholder="Looking forward for your bussiness "></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                            <table style={{ width: "100%" }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ position: "relative" }}>
                                                    <tr scope="row">
                                                        <td>Net Total</td>
                                                        <td></td>
                                                        <td>{billdata.bill_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>IGST</td>
                                                        <td></td>
                                                        <td>{billdata.igst_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>CGST</td>
                                                        <td></td>
                                                        <td>{billdata.cgst_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SGST</td>
                                                        <td></td>
                                                        <td>{billdata.sgst_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total GST</td>
                                                        <td></td>
                                                        <td>{billdata.taxable_amt}</td>
                                                    </tr>
                                                    <tr className='mt-2'>
                                                        <td><h3>Total(₹)</h3></td>
                                                        <td></td>
                                                        <td>{billdata.total_bill_amt}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-4 control-label" htmlFor="save"></label>
                                        <div className="col-md-20" style={{ width: "100%" }}>
                                            <button id="save" name="save" className="btn btn-danger" onClick={handleClick}>
                                                Save</button>
                                            <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
                                                name="clear" className="btn ml-2 btn-secondary">Cancel</button>
                                            <button className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModal" onClick={(e) => { e.preventDefault(); console.log('mwo', billdata); console.log('wnked',Dndata);console.log('yutu',DebitCodeSub) }}>  Preview</button>
                                        </div>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <VendorCreditsPreview data={billdata} Dndata={Dndata} DebitCodeSub={DebitCodeSub}/>
        </div>
    )
}

export default VendorCredits
