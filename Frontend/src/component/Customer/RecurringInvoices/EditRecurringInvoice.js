import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import InvoicePreview from '../Invoices/EditInvoice/PreviewEditInvoice';
import { getRecurringInvoice, getSubRecurringInvoice, InsertInvoice, Getfincialyearid, UpdateRecurringInvoice, UpdateSaveSubRecurringInvoice, Updatefinancialcount, InsertInvoiceSub, GetSalesOrderByCust } from '../../../api/index'
import LoadingPage from '../../loadingPage/loadingPage';
import CreatableSelect from 'react-select/creatable';



function EditRecurringInvoice() {
    const [loading, setLoading] = useState(false)
    const [invoice_detail, setInvoice_detail] = useState({})
    const [invoicesub, setInvoicesub] = useState([])
    const [soloading, setSoloading] = useState(false);
    const [sovalue, setValue] = useState();
    const [solist, setSolist] = useState([])
    const [activepaymentterm, setActivePaymentTerm] = useState([])




    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
            const invoice_no = localStorage.getItem('invoiceNo')
            const Invoiceresult = await getRecurringInvoice(org, invoice_no)
            setInvoice_detail(Invoiceresult[0])
            const result1 = await getSubRecurringInvoice(org, invoice_no)
            setInvoicesub(result1)
            const get_so = await GetSalesOrderByCust(org, Invoiceresult[0].custid)
            setSolist(get_so)
            setLoading(true)
            Todaydate()
            Duedate(Invoiceresult[0].payment_term)

            let dateToggle = 0;
            for (let i = 0; i < result1.length; i++) {

                if (result1[i].billing_code === 'WAREHOUSING') {
                    dateToggle = dateToggle + 1
                }

            }
            if (dateToggle > 0) {
                document.getElementById('FTdate').style.display = "flex"
            }
        }
        fetchdata()
    }, [])

    // const Todaydate = () => {
    //     var date = new Date();
    //     var day = date.getDate();
    //     var month = date.getMonth() + 1;
    //     var year = date.getFullYear();
    //     if (month < 10) month = "0" + month;
    //     if (day < 10) day = "0" + day;
    //     var today = year + "-" + month + "-" + day;
    //     document.getElementById("Invoicedate").value = today;
    // }



    const handlePostbtn = async (e) => {
        e.preventDefault();
        // setLoading(false)
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

        const invoiceDate = document.getElementById('Invoicedate').value
        const dueDate = document.getElementById('Duedate').value
        const remarks = document.getElementById('custnotes').value

        if (!sovalue) {
            alert('Please Fill the Mandatory Fields');
            setLoading(true)
        }
        else {
            const orderNo = sovalue.value

            const result2 = await InsertInvoice(org, invoice_detail.fin_year, invoiceid,
                invoicepefix, invoiceDate, orderNo, invoice_detail.invoice_amt, invoice_detail.user_id, invoice_detail.periodfrom, invoice_detail.periodto, '', invoice_detail.location, invoice_detail.custid, invoice_detail.billsubtotal,
                invoice_detail.total_tax, invoice_detail.cust_locationid, remarks, 'post', invoice_detail.location, invoice_detail.consignee, invoice_detail.cust_family, invoice_detail.cgst_amt, invoice_detail.sgst_amt, invoice_detail.utgst_amt, invoice_detail.igst_amt, invoice_detail.taxable_amt, invoice_detail.currency_type,
                invoice_detail.payment_term, dueDate,
                localStorage.getItem('User_id'), invoice_detail.cust_location_add, invoice_detail.cust_location_gst, invoice_detail.destination, invoice_detail.origin)


            // const update_inv_no = await UpdateRecurringInvoice(org, invoice_detail.invoice_no, invoiceid)
            if (result2 === 'Added') {
                // const update_sub_invno = await UpdateSaveSubRecurringInvoice(org, invoice_detail.invoice_no, invoiceid)

                invoicesub.map(async (item) => {
                    const result3 = await InsertInvoiceSub(org, item.fin_year, invoiceid, item.major, item.minor, item.glcode,
                        item.billing_code, item.quantity, item.rate, item.unit, item.amount, item.consignee, item.city, item.custid, item.cust_locationid,
                        item.taxable, item.cgst_rate, item.sgst_rate, item.utgst_rate, item.igst_rate, item.cgst_amt, item.sgst_amt, item.utgst_amt, item.igst_amt, item.taxableamount, localStorage.getItem('User_id'))
                })

                if (result2 === 'Added') {
                    const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', invoicecount)
                    alert('Invoice Posted');
                    localStorage.removeItem('invoiceNo');
                    window.location.href = '/TotalRecurringInvoice'
                }
            }
            else {
                alert('Server Not Response')
                setLoading(true)
            }
        }
    }
    // const handleAccountTerm = (e) => {
    //     // let [val, Ter] = e.target.value.split(" ")
    //     const days = Number(e.target.value)
    //     Duedate(days)
    // }

    const Duedate = (lastday) => {
        var myDate = new Date(new Date().getTime() + (lastday * 24 * 60 * 60 * 1000));
        var day = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("Duedate").value = today;
    }

    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("Invoicedate").value = today;
        document.getElementById("recurringDate").defaultValue = today;
    }

    const handleCreate = (inputValue) => {
        setSoloading(true);
        setTimeout(() => {
            const newOption = { so_no: inputValue.toUpperCase() }
            setSoloading(false);
            setSolist((prev) => [...prev, newOption]);
            setValue({ label: inputValue.toUpperCase(), value: inputValue.toUpperCase() });

        }, 1000);
    };

    var soOptions = solist.map((element) => {
        return { label: element.so_no, value: element.so_no }
    })

    return (
        <>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <>
                            <div className={`content-wrapper `} >
                                <div className="container-fluid" >
                                    <h3 className="pt-3 px-5"> Post Recurring Invoice</h3>
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
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Billing Address <span className='text-danger'>*</span> </label>
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

                                                {/* <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                    <div className="d-flex col-md-4">
                                                        <input type="text" className={`form-control  cursor-notallow col`} id="ordernumber" placeholder='Enter the order number' disabled value={invoice_detail.order_no} />
                                                    </div>
                                                </div> */}

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Order Number <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <CreatableSelect
                                                            className='col-md px-1'
                                                            id="ordernumber"
                                                            isClearable
                                                            isDisabled={soloading}
                                                            isLoading={soloading}
                                                            onChange={(newValue) => setValue(newValue)}
                                                            onCreateOption={handleCreate}
                                                            options={soOptions}
                                                            value={sovalue}
                                                        />
                                                        {/* <input type="text" className='form-control col' id="ordernumber" placeholder='Enter the order number' /> */}
                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Recurring Type </label>
                                                    <input type="text" className='form-control  cursor-notallow col-md-4' id="ordernumber" placeholder='Enter the order number' disabled value={invoice_detail.recurring_type} />
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Recurring Date </label>
                                                    <input type="date" className='form-control col-md-4' id="recurringDate" placeholder='Enter the order number' value={invoice_detail.RecurringDate} disabled />
                                                </div>

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Currency</label>
                                                    <div className="d-flex col-md-4">
                                                        <select className='form-control col' id="currency" >
                                                            <option hidden >{invoice_detail.currency_type}</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="form-row mt-2">
                                                    <div className="d-flex col-md-4 px-0">
                                                        <label className="col-md-6 col-form-label font-weight-normal" >Invoice Date<span className='text-danger'>*</span> </label>
                                                        <input type="date" className='form-control  cursor-notallow col-md-6' id="Invoicedate"   />
                                                    </div>

                                                    <div className="d-flex col-md-4">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" >Terms</label>
                                                        <select
                                                            id="paymentterm"
                                                            className={`form-control   col-md-6`} disabled>
                                                            <option value={invoice_detail.payment_term} hidden> {invoice_detail.payment_term ? `Net ${invoice_detail.payment_term}` : ''} </option>
                                                        </select>
                                                    </div>

                                                    <div className="d-flex col-md-4" >
                                                        <label className="col-md-5 col-form-label font-weight-normal" >Due Date</label>
                                                        <input type="date" className={`form-control  cursor-notallow col-md-6`} id="Duedate" disabled  />
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


                                                <table className="table table-bordered table-sm">
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
                                                                    <td className='px-1' style={{ width: '180px' }}>
                                                                        <select className='form-control mx-0' disabled>
                                                                            <option>{item.billing_code}</option>
                                                                        </select>
                                                                    </td>
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
                                                                    style={{ resize: 'none' }} defaultValue={invoice_detail.remark} ></textarea>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="ml-2 px-3 py-2" style={{ width: "55%", background: '#eee', boxSizing: "border-box", borderRadius: "7px" }}>
                                                        <table className='w-100'>
                                                            <tbody>
                                                                <tr className='mt-2'>
                                                                    <td colSpan='2'><h4> Net Amount </h4></td>
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
                                            {/* <button id="savebtn" type='submit' name="save" className="btn btn-danger" value='save'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert('Invoice Saved');
                                                    localStorage.removeItem('invoiceNo'); window.location.href = '/SaveInvoice'
                                                }}>Save</button> */}
                                            <button id="postbtn" name="save" type='submit' className="btn btn-danger ml-2" value='post' onClick={handlePostbtn}>Post</button>
                                            <button id="clear" onClick={(e) => { e.preventDefault(); localStorage.removeItem('invoiceNo'); window.location.href = '/SaveInvoice' }}
                                                className="btn ml-2 btn btn-primary">Cancel </button>
                                            <button id='previewbtn' type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview Invoice </button>
                                        </div>
                                    </div>

                                </div>
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

export default EditRecurringInvoice
