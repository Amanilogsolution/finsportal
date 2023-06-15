import React, { useState, useEffect } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import InvoicePreview from './PreviewEditInvoice';
import { GetInvoice, GetSubInvoice, GetAccountMinorCodeName, Getfincialyearid, UpdateSaveInvoiceToPost, UpdateSaveSubInvoiceToPost, Updatefinancialcount } from '../../../../api/index'
import LoadingPage from '../../../loadingPage/loadingPage';
import AlertsComp from '../../../AlertsComp';


function EditInvoice() {
    const [loading, setLoading] = useState(false)
    const [invoice_detail, setInvoice_detail] = useState({})
    const [invoicesub, setInvoicesub] = useState([])
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
            const invoice_no = localStorage.getItem('invoiceNo')
            const Invoiceresult = await GetInvoice(org, invoice_no)

            setInvoice_detail(Invoiceresult[0])
            const result1 = await GetSubInvoice(org, invoice_no)
            setInvoicesub(result1)


            setLoading(true)

            for (let i = 0; i < result1.length; i++) {
                document.getElementById('FTdate').style.display = 'flex';
                return 0;
            }
        }
        fetchdata()
    }, [])



    const handlePostbtn = async (e) => {
        e.preventDefault();
        setLoading(false)
        const org = localStorage.getItem('Organisation')
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

        if (!invoiceid) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const update_inv_no = await UpdateSaveInvoiceToPost(org, invoice_detail.invoice_no, invoiceid)
            console.log(update_inv_no)
            setLoading(true)
            if (update_inv_no === 'Updated') {
                const update_sub_invno = await UpdateSaveSubInvoiceToPost(org, invoice_detail.invoice_no, invoiceid)
                if (update_sub_invno === 'Updated') {
                    const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', invoicecount)
                    localStorage.removeItem('invoiceNo');
                    setAlertObj({ type: 'success', text: 'Invoice Posted', url: '/SaveInvoice' })
                }
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }
    }

    return (
        <>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <>
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
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Invoice </label>
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
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Currency </label>
                                                    <div className="d-flex col-md-4">
                                                        <select className='form-control col' id="currency" disabled >
                                                            <option hidden >{invoice_detail.currency_type}</option>
                                                        </select>
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


                                                <table className="table table-bordered">
                                                    <thead className='text-center'>
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

                                                <div className='d-flex justify-content-between'>
                                                    <div style={{ width: "40%" }}>
                                                        <div className="form mt-3">
                                                            <label className="col-md-7 col-form-label font-weight-normal" >Remarks :-</label>
                                                            <div className="d-flex col-md">
                                                                <textarea type="text" className={`form-control `} rows="4" id="custnotes" placeholder="Looking forward for your bussiness "
                                                                    style={{ resize: 'none' }} value={invoice_detail.remark} ></textarea>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="rounded py-2 px-3" style={{ width: "55%", background: '#eee' }}>
                                                        <table className='w-100'>
                                                            <tbody>
                                                                <tr className='mt-2'>
                                                                    <td colSpan='2'><h3>Net Amount</h3> </td>
                                                                    <td>{invoice_detail.billsubtotal}</td>
                                                                </tr>

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
                                                    <InvoicePreview Allinvoicedata={invoice_detail} Allitems={invoicesub} />

                                                }

                                            </form>
                                        </article>
                                        <div className="card-footer border-top">
                                            <button id="savebtn" type='submit' name="save" className="btn btn-danger" value='save'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    localStorage.removeItem('invoiceNo'); 
                                                    setAlertObj({ type: 'success', text: 'Invoice Saved', url: '/SaveInvoice' })
                                                }}>Save</button>
                                            <button id="postbtn" name="save" type='submit' className="btn btn-danger ml-2" value='post' onClick={handlePostbtn}>Post</button>
                                            <button id="clear" onClick={(e) => { e.preventDefault(); localStorage.removeItem('invoiceNo'); window.location.href = '/SaveInvoice' }}
                                                className="btn ml-2 btn btn-primary">Cancel </button>
                                            <button id='previewbtn' type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview Invoice </button>
                                        </div>
                                    </div>

                                </div>
                                {
                                    alertObj.type ? <AlertsComp data={alertObj} /> : null
                                }
                            </div>

                        </>
                        :
                        <LoadingPage />
                }
                <Footer />
            </div>
        </>
    )
}

export default EditInvoice
