import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GetRecurringBillData, GetSubRecurringBill, showOrganisation, Getfincialyearid, InsertBill, InsertSubBill, Updatefinancialcount, GetPodetailsVendor } from '../../../api'
import PreviewBill from '../Bills/EditBill/EditPreviewBill';
import LoadingPage from '../../loadingPage/loadingPage';


function EditRecurringBills() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [totalItemValues, setTotalItemValues] = useState([])
    const [orgdata, setOrgdata] = useState([]);
    const [netamt, setNetamt] = useState('')
    const [polist, setPolist] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            let org = localStorage.getItem('Organisation');
            const bill_data = await GetRecurringBillData(org, localStorage.getItem('vourcher_no'))
            setData(bill_data)
            console.log(bill_data)
            const bill_item_data = await GetSubRecurringBill(org, localStorage.getItem('vourcher_no'))
            setTotalItemValues(bill_item_data)

            let net_amt = 0;
            bill_item_data.map((item, index) => { net_amt = net_amt + Number(item.net_amt) })
            setNetamt(net_amt)

            const result = await showOrganisation(org)
            setOrgdata(result)

            const po_number = await GetPodetailsVendor(localStorage.getItem('Organisation'), bill_data.vend_id)
            setPolist(po_number);

            setLoading(true)
            Todaydate()
            Duedate(bill_data.payment_term)
        }
        fetchdata();
    }, [])

    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        console.log(today)
        document.getElementById("voucher_date").defaultValue = today;
        document.getElementById("bill_date").defaultValue = today;
    }


    const Duedate = (lastday) => {
        let Ter = Number(lastday) || 45;
        let myDate = new Date(new Date().getTime() + (Ter * 24 * 60 * 60 * 1000));
        let day = myDate.getDate();
        let month = myDate.getMonth() + 1;
        let year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        document.getElementById("due_date").defaultValue = today;
    }

    const handlePost = async (e) => {
        e.preventDefault();
        // setLoading(false)
        const org = localStorage.getItem('Organisation')
        let vouNo = localStorage.getItem('vourcher_no')
        const voucher_date = document.getElementById('voucher_date').value
        const vendor_name = document.getElementById('vend_name').value
        const bill_no = document.getElementById('bill_no').value
        const bill_date = document.getElementById('bill_date').value
        const bill_amt = document.getElementById('bill_amt').value
        const total_bill_amt = document.getElementById('total_bill_amt').innerText;
        const payment_t = data.payment_term
        const due_date = document.getElementById('due_date').value;
        const amt_paid = '';
        const amt_balance = '';
        const amt_booked = '';
        const tds_head = data.tds_head;
        const tdscomp = data.tds_ctype;
        const tds_per = data.tds_per;
        const tds_amt = data.tds_amt;
        const taxable_amt = data.taxable_amt;
        const non_taxable_amt = data.non_taxable_amt;
        const expense_amt = data.expense_amt;
        const remarks = data.remarks;
        const fins_year = data.fins_year;
        const cgst_amt = data.cgst_amt;
        const sgst_amt = data.sgst_amt;
        const igst_amt = data.igst_amt;
        const userid = localStorage.getItem('User_id');
        const vendor_id = data.vend_id;
        const img = '';
        const btn_type = 'POST';
        const po_no = data.po_no;
        const billsubtotalamt = data.bill_amt

        const id = await Getfincialyearid(org)
        const lastno = Number(id[0].voucher_count) + 1
        let new_voucher_no = id[0].voucher_ser + id[0].year + String(lastno).padStart(5, '0')

      
        if (!bill_no ) {
            alert('Please Enter then Mandatory Fields')
        }
        else {
            const result = await InsertBill(org, new_voucher_no, voucher_date, vendor_name, data.location, bill_no,
                bill_date, bill_amt, total_bill_amt, payment_t, due_date, amt_paid, amt_balance, amt_booked, tds_head, tdscomp, tds_per, tds_amt,
                taxable_amt, non_taxable_amt, expense_amt, remarks, fins_year, cgst_amt, sgst_amt, igst_amt, userid, vendor_id, img, btn_type, po_no, billsubtotalamt)
            if (result === 'Added') {
                const result1 = await InsertSubBill(org, new_voucher_no, bill_no, totalItemValues, fins_year, userid)
                if (result1 === 'Added') {
                    const invcount = await Updatefinancialcount(org, 'voucher_count', lastno)
                    alert('Bill Posted');
                    localStorage.removeItem('vourcher_no');
                    window.location.href = '/TotalRecurringBill'
                }
                else {
                    alert('Server Not Response');
                    setLoading(true)
                }
            }
            else {
                alert('Server Not Response');
                setLoading(true)
            }
        }
    }

    const handleSetFileno = (index, e) => {
        totalItemValues[index].file_no = e.target.value
    }
    const handleSetBillno = (e) => {
        for(let i=0;i<totalItemValues.length;i++){
            totalItemValues[i].bill_no=e.target.value
        }
    }
    return (
        <>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <div className={`content-wrapper `}>
                            <div className="container-fluid ">
                                <h3 className="pt-3 pb-1 ml-5"> Post Recurring Bill</h3>

                                <div className={`card mb-2 `}>
                                    <article className="card-body">
                                        <form autoComplete="off">
                                            <div className="form-row ">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="vend_name"
                                                        className="form-control col-md-4" disabled>
                                                        <option value={data.vend_name} hidden>{data.vend_name}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Location <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-4 cursor-notallow" id="location" defaultValue={data.location} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3" >
                                                <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >Voucher no </label>
                                                <div className="d-flex col-md-4" >
                                                    <input type="text" className="form-control col-md-10 cursor-notallow" id="voucher_no" defaultValue={data.vourcher_no} disabled />
                                                </div>
                                                <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">Voucher Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="voucher_date" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >P.O number  </label>
                                                <div className="d-flex col-md">
                                                    <select className="form-control col-md-4" id="order_no" >
                                                        {/* <option hidden value={data.po_no}>{data.po_no}</option> */}
                                                        <option hidden value=''>Select Po</option>
                                                        {
                                                            polist.length > 0 ?
                                                                polist.map((item, i) => (
                                                                    <option key={i} value={item.po_number}>{item.po_number}</option>
                                                                )) :
                                                                <option value=''>PO. is not Created in this vendor</option>
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label htmlFor='bill_no' className="col-md-2 col-form-label font-weight-normal" >Bill number <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-4" id="bill_no" defaultValue={data.bill_no} onBlur={handleSetBillno}/>
                                                </div>
                                            </div>


                                            <div className="form-row mt-3">
                                                <label htmlFor='bill_amt' className="col-md-2 col-form-label font-weight-normal">Bill Amount <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="number" className="form-control col-md-10" id="bill_amt" defaultValue={data.bill_amt}  />
                                                </div>

                                                <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Bill Date <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="date" className="form-control col-md-10" id="bill_date" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Recurring Type <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="text" className="form-control col-md-10" id="bill_date" defaultValue={data.recurring_type} disabled />
                                                </div>

                                                <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Recurring Date <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="date" className="form-control col-md-10" id="bill_date" defaultValue={data.Recurringdate} disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3" >
                                                <label htmlFor='payment_term' className="col-md-2 col-form-label font-weight-normal" >Payment Terms <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4" >
                                                    <select
                                                        id="payment_term"
                                                        className="form-control col-md-10" disabled>
                                                        <option value={data.payment_term} hidden>Net {data.payment_term}</option>

                                                    </select>
                                                </div>
                                                <label htmlFor='due_date' className="col-md-2 col-form-label font-weight-normal" >Due Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="due_date" disabled />
                                                </div>
                                            </div>

                                            <br />
                                            <table className="table table-striped table-bordered">
                                                <thead className='text-center'>
                                                    <tr>
                                                        <th scope="col">Location</th>
                                                        <th scope="col">Item Details</th>
                                                        <th scope="col">Employee</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Deduction</th>
                                                        <th scope="col">Refno/FIleno</th>
                                                        <th scope="col">Net Amt</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        totalItemValues.map((element, index) => (
                                                            <tr key={index}>
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <input className="form-control ml-0" defaultValue={element.location} disabled />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <input className="form-control ml-0" defaultValue={element.item_name} disabled />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input className="form-control ml-0" defaultValue={element.emp_name} disabled />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`Quantity${index}`} className="form-control" disabled defaultValue={element.qty} />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='text' className="form-control" id={`fileno${index}`} disabled defaultValue={element.unit} />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id="Rate" className="form-control" disabled defaultValue={element.rate} />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id="Amount" className="form-control cursor-notallow" disabled defaultValue={element.amt} />
                                                                </td>

                                                                <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='number' id={`deduction${index}`} className="form-control" disabled defaultValue={element.deduction} />

                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='text' className="form-control" id={`fileno${index}`} defaultValue={element.file_no} onBlur={(e) => { handleSetFileno(index, e) }} />
                                                                </td>
                                                             
                                                                <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='number' className="form-control cursor-notallow" disabled defaultValue={element.net_amt} />
                                                                </td>
                                                            </tr>

                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                            <hr />

                                            <div style={{ display: "flex" }}>
                                                <div style={{ width: "40%" }}>
                                                    <div className="form mt-2">
                                                        <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="5" id="remarks" placeholder="Remarks" style={{ resize: "none" }}
                                                                defaultValue={data.remarks} disabled></textarea>
                                                        </div>

                                                    </div>
                                                    <div className='mt-3'>
                                                        <label className="font-weight-normal" >Attach file(s) to Estimate</label><br />
                                                        <button type="button" className='btn btn-success' data-toggle="modal" data-target="#exampleModal">
                                                            <i className='ion-android-attach'></i> &nbsp;
                                                            Attach File</button>
                                                    </div>
                                                </div>
                                                <div style={{ width: "55%", marginLeft: "3px", padding: "5px", background: '#eee', borderRadius: "7px" }}>
                                                    <table className='table table-borderless' style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody style={{ position: "relative" }}>
                                                            <tr scope="row">
                                                                <td style={{ width: "150px" }} >Total CGST Amt </td>
                                                                <td className='form-control col-md p-0 bg-transparent pb-1'>
                                                                    <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-5 ml-5  cursor-notallow" id='cgst-inp' disabled defaultValue={data.cgst_rate} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='cgstamt' >{data.cgst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total SGST Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent border-none'>
                                                                    <div className="input-group" >
                                                                        <input type="" className="form-control col-md-5 ml-5  cursor-notallow" id='sgst-inp' disabled defaultValue={data.sgst_rate} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='sgstamt'>{data.sgst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total IGST Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent ' >
                                                                    <div className="input-group" >
                                                                        <input type='number' className="form-control col-md-5 ml-5  cursor-notallow" id='igst-inp' disabled defaultValue={data.igst_rate} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='igstamt'>{data.igst_amt}</td>
                                                            </tr>
                                                            <tr scope="row">
                                                                <td style={{ width: "150px" }}>Total TDS *</td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <div className="input-group" >
                                                                        <input type="text" className="form-control col-md-5 ml-5 cursor-notallow" id='tdsperinp' defaultValue={data.tds_per} disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='tdstagval'>{data.tds_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Expense Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="text" className="form-control col-md-6 ml-5" id='expense_amt' disabled defaultValue={data.expense_amt} />
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }}>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td><h4>Total</h4></td>
                                                                <td></td>
                                                                <td className='text-center' style={{ width: "150px" }} id='total_bill_amt'>{data.total_bill_amt}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <PreviewBill data={data} totalItemValues={totalItemValues} orgdata={orgdata} netamt={netamt} />

                                        </form>
                                    </article>
                                    <div className="card-footer border-top">
                                        {/* <button id="savebtn" type='submit' name="save" className="btn btn-danger" value='save'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert('Bill Saved');
                                                localStorage.removeItem('vourcher_no'); window.location.href = '/SaveBillReport'
                                            }}>Save</button> */}
                                        <button id="postbtn" name="save" className="btn btn-danger ml-2" value='post' onClick={handlePost}>Post </button>
                                        <button id="clear" onClick={(e) => { e.preventDefault(); localStorage.removeItem('vourcher_no'); window.location.href = '/SaveBillReport' }} name="clear" className="btn bg-secondary ml-2">Cancel</button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview Bill</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <LoadingPage />
                }
                <Footer />


            </div>



        </>
    )
}

export default EditRecurringBills
