import React, { useState, useEffect } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import InvoicePreview from './PreviewEditInvoice';
import { GetInvoice, GetSubInvoice, GetAccountMinorCodeName, Getfincialyearid, UpdateSaveInvoiceToPost, UpdateSaveSubInvoiceToPost, Updatefinancialcount } from '../../../../api/index'


function EditInvoice() {
    const [loading, setLoading] = useState(false)
    const [invoice_detail, setInvoice_detail] = useState({})
    const [invoicesub, setInvoicesub] = useState([])
    const [activity, setActivity] = useState('')


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
            const invoice_no = localStorage.getItem('invoiceNo')
            const Invoiceresult = await GetInvoice(org, invoice_no)

            setInvoice_detail(Invoiceresult[0])
            const result1 = await GetSubInvoice(org, invoice_no)
            setInvoicesub(result1)
            
            const activity_code = await GetAccountMinorCodeName(org, Invoiceresult[0].major)
            setActivity(activity_code)
            setLoading(true)

            for(let i=0;i<result1.length;i++){
                document.getElementById('FTdate').style.display='flex';
                return 0;
            }
        }
        fetchdata()
    }, [])



    const handlesavebtn = async (e) => {
        e.preventDefault();
        const org = localStorage.getItem('Organisation')
        setLoading(false)

        const fin_year = await Getfincialyearid(org)
        const billing_add = invoice_detail.origin;
        const invoicepefix = fin_year[0].invoice_ser;
        let invoicecitypre = (billing_add.substring(0, 3));
        invoicecitypre = invoicecitypre.toUpperCase();
        let invoicecount = Number(fin_year[0].invoice_count);
        invoicecount = invoicecount + 1;
        invoicecount = String(invoicecount)
        const invoiceidauto = invoicecount.padStart(5, '0')
        const invoiceid = invoicepefix + invoicecitypre + fin_year[0].year + invoiceidauto;

        const update_inv_no = await UpdateSaveInvoiceToPost(org, invoice_detail.invoice_no, invoiceid)
        if (update_inv_no === 'Updated') {
            const update_sub_invno = await UpdateSaveSubInvoiceToPost(org, invoice_detail.invoice_no, invoiceid)
            if (update_sub_invno === 'Updated') {
                const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', invoicecount)
                alert('Invoice Posted');
                localStorage.removeItem('invoiceNo');
                window.location.href = '/SaveInvoice'
            }
        }
        else {
            alert('Server Not Response')
            setLoading(true)

        }


        // const squ_no = invoiceprefix;
        // const Invoicedate = document.getElementById('Invoicedate').value
        // const ordernumber = document.getElementById('ordernumber').value
        // const invoiceamt = grandtotal;
        // const User_id = localStorage.getItem('User_id')
        // const periodfrom = document.getElementById('fromdate').value;
        // const periodto = document.getElementById('todate').value;
        // const custid = document.getElementById('custname').value;
        // const billsubtotal = totalamout
        // const total_tax = Math.max(...totalgst)
        // const remark = document.getElementById('custnotes').value;
        // let location = document.getElementById('locationadd')
        // location = location.options[location.selectedIndex].text;
        // let consignee = document.getElementById('custname')
        // consignee = consignee.options[consignee.selectedIndex].text;
        // const currency_type = document.getElementById('currency').value
        // const paymentterm = document.getElementById('paymentterm').value;
        // const Duedate = document.getElementById('Duedate').value;
        // const cgst = document.getElementById('cgstipt').value;
        // const sgst = document.getElementById('sutgstipt').value;
        // const utgst = document.getElementById('sutgstipt').value;
        // const igst = document.getElementById('igstipt').value;
        // const Major = document.getElementById('Activity').value;
        // let billing_code = document.getElementById('Activity')
        // billing_code = billing_code.options[billing_code.selectedIndex].text;

        // let cgstamount = 0;
        // let sgstamount = 0;
        // let utgstamount = 0;
        // let igstamount = 0;
        // const taxableamt = gstvalue;

        // if (igst > 0) {
        //     igstamount = taxableamt

        // } else {
        //     cgstamount = taxableamt / 2
        //     sgstamount = taxableamt / 2
        //     utgstamount = taxableamt / 2

        // }



        // const result = await InsertInvoice(localStorage.getItem('Organisation'), fin_year, invoiceids, squ_nos, Invoicedate, ordernumber, invoiceamt, User_id, periodfrom, periodto, Major, locationid, custid, billsubtotal,
        //     total_tax, locationcustaddid, remark, btn_type, location, consignee, masterid, cgst, sgst, utgst, igst, taxableamt, currency_type,
        //     paymentterm, Duedate, User_id)

        // const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', updateinvcount)

        // amount.map(async (amt, index) => {
        //     const result1 = await InsertInvoiceSub(localStorage.getItem('Organisation'), fin_year, invoiceids, Major, minor[index], glcode[index], billing_code, Quantitys[index], rate[index], unit[index], amt, consignee, custaddress_state, custid, locationcustaddid, taxable[index], cgst, sgst, utgst, igst, cgstamount, sgstamount, utgstamount, igstamount, User_id)

        // })
        // if (result) {
        //     alert('Added')
        //     window.location.reload();
        // }

    }

    return (
        <>
            <div className="wrapper">
                {
                    loading ?
                        <>
                          
                            <Header />

                            <div className={`content-wrapper `} >
                                <div className="container-fluid" >
                                    <h3 className="pt-3 px-5"> Edit Invoice</h3>
                                    <div className={`card my-2 `}>
                                        <article className="card-body">
                                            <form autoComplete="off" >
                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <select
                                                            id="custname"
                                                            className={`form-control cursor-notallow`} disabled>
                                                            <option value={invoice_detail.custid} hidden>{invoice_detail.consignee}</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Address <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <span className='border p-2 rounded col'>{invoice_detail.cust_location_add}</span>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Billing Address<span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <span className='border p-2 rounded col'>{invoice_detail.location_name}</span>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Invoice <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <input type="text" className={`form-control  cursor-notallow col`} id="invoiceid" disabled value={invoice_detail.invoice_no} />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                    <div className="d-flex col-md-4">
                                                        <input type="text" className={`form-control  cursor-notallow col`} id="ordernumber" placeholder='Enter the order number' disabled value={invoice_detail.order_no} />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <div className="d-flex col-md-4 px-0">
                                                        <label className="col-md-6 col-form-label font-weight-normal" >Invoice Date<span className='text-danger'>*</span> </label>
                                                        <input type="date" className='form-control  cursor-notallow col-md-6' id="Invoicedate" disabled value={invoice_detail.startdate} />
                                                    </div>

                                                    <div className="d-flex col-md-4">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" >Terms</label>
                                                        <select
                                                            id="paymentterm"
                                                            className={`form-control   col-md-6`}>
                                                            <option value={invoice_detail.payment_term} hidden>Net {invoice_detail.payment_term} </option>
                                                        </select>
                                                    </div>

                                                    <div className="d-flex col-md-4" >
                                                        <label className="col-md-5 col-form-label font-weight-normal" >Due Date</label>
                                                        <input type="date" className={`form-control  cursor-notallow col-md-6`} id="Duedate" disabled value={invoice_detail.lastdate} />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2" id='FTdate' style={{ display: "none" }}>
                                                    <div className="d-flex col-md-4 px-0">
                                                        <label className="col-md-6 col-form-label font-weight-normal" htmlFor='fromdate'>From Date </label>
                                                        <input type="date" className="form-control col-md-6 cursor-notallow" id="fromdate" disabled value={invoice_detail.periodfrom_date} />
                                                    </div>
                                                    <div className="d-flex col-md-4">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" htmlFor='todate'>To Date </label>
                                                        <input type="date" className="form-control col-md-6 cursor-notallow" id="todate" disabled value={invoice_detail.periodto_date} />
                                                    </div>
                                                </div>
                                                <br />


                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Activity</th>
                                                            <th scope="col">Items</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Rate</th>
                                                            <th scope="col">Tax</th>
                                                            <th scope="col">Unit</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            invoicesub.map((item, index) => (
                                                                <tr key={index}>

                                                                    <td>{item.billing_code}</td>
                                                                    <td>{item.minor}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.rate}</td>
                                                                    <td>{item.taxableamount}</td>
                                                                    <td>{item.unit}</td>
                                                                    <td>{item.amount}</td>
                                                                    <td>{Number(item.amount) + Number(item.taxableamount)}</td>
                                                                </tr>

                                                            ))
                                                        }

                                                    </tbody>
                                                </table>
                                                <hr />

                                                <div style={{ display: "flex" }}>
                                                    <div style={{ width: "40%" }}>
                                                        <div className="form mt-3">
                                                            <label className="col-md-7 col-form-label font-weight-normal" >Remarks :-</label>
                                                            <div className="d-flex col-md">
                                                                <textarea type="text" className={`form-control `} rows="4" id="custnotes" placeholder="Looking forward for your bussiness "
                                                                    style={{ resize: 'none' }} value={invoice_detail.remark} ></textarea>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="ml-2" style={{ width: "55%", background: '#eee', padding: "5px", borderRadius: "7px" }}>
                                                        <table className='w-100'>
                                                            <tbody>
                                                                {/* Display none Button Start */}
                                                                <tr className='mt-2'>
                                                                    <td colSpan='2'>
                                                                        {/* <button className="btn btn-primary" id='subtotalbtn'>Sub Total</button> */}
                                                                        Net Amount
                                                                    </td>
                                                                    <td>{invoice_detail.billsubtotal}</td>
                                                                </tr>
                                                                {/* Display none Button End */}

                                                                <tr id='cgstinp' >
                                                                    <td>CGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className={`form-control  cursor-notallow col-md-5`} id='cgstipt' defaultValue={invoice_detail.cgst_amt} disabled />
                                                                            <div className="input-group-append">
                                                                                <span className={`input-group-text `}>%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr id='sgstinp'>
                                                                    <td>SGST/UTGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className={`form-control  cursor-notallow col-md-5`} id='sutgstipt' defaultValue={invoice_detail.sgst_amt} disabled />
                                                                            <div className="input-group-append">
                                                                                <span className={`input-group-text `}>%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                                <tr id='igstinp'>
                                                                    <td>IGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className={`form-control  cursor-notallow col-md-5 gstinpt`} id='igstipt' defaultValue={invoice_detail.igst_amt} disabled />
                                                                            <div className="input-group-append">
                                                                                <span className={`input-group-text `}>%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr id='tgstinp'>
                                                                    <td>Total GST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className={`form-control  cursor-notallow col-md-5`} id='gstipt ' defaultValue={invoice_detail.total_tax} disabled />
                                                                            <div className="input-group-append">
                                                                                <span className={`input-group-text `}>%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td id="Totalvaluerd"> {invoice_detail.taxable_amt}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                        Currency
                                                                    </td>
                                                                    <td>
                                                                        <div className="input-group mb-1">
                                                                            <select className={`form-control  col-md-5`} id="currency" >
                                                                                <option hidden >{invoice_detail.currency_type}</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr className='mt-2'>
                                                                    <td><h3>Total</h3></td>
                                                                    <td></td>
                                                                    <td id="grandtotaltd">{invoice_detail.invoice_amt}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                                {/* {
                                        localStorage.getItem('gststatus') == true ?
                                            <InvoicePreviewWithGst Allinvoicedata={invoice_detail} Allitems={invoicesub} /> :
                                            <InvoicePreview Allinvoicedata={invoice_detail} Allitems={invoicesub} />

                                    } */}
                                                {
                                                    <InvoicePreview Allinvoicedata={invoice_detail} Allitems={invoicesub} activity={activity} />

                                                }

                                            </form>
                                        </article>
                                        <div className="card-footer border-top">
                                            <button id="savebtn" type='submit' name="save" className="btn btn-danger" value='save'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert('Invoice Saved');
                                                    localStorage.removeItem('invoiceNo'); window.location.href = '/SaveInvoice'
                                                }}>Save</button>
                                            <button id="postbtn" name="save" type='submit' className="btn btn-danger ml-2" value='post' onClick={handlesavebtn}>Post</button>
                                            <button id="clear" onClick={(e) => { e.preventDefault(); localStorage.removeItem('invoiceNo'); window.location.href = '/SaveInvoice' }}
                                                className="btn ml-2 btn btn-primary">Cancel </button>
                                            <button id='previewbtn' type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview Invoice </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Footer />
                        </>
                        :
                        (<div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                            <div className="spinner-border" role="status"> </div>
                        </div>)
                }
            </div>
        </>
    )
}

export default EditInvoice
