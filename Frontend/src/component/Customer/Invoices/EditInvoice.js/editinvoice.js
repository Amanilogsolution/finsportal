import React, { useState, useEffect } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import InvoicePreview from '.././PreviewInvoice';
import InvoicePreviewWithGst from '.././PreviewInvoicewithoutGST'
import { GetInvoice, GetSubInvoice } from '../../../../api/index'


function EditInvoice() {
    const [invoice_detail, setInvoice_detail] = useState({})
    const [invoicesub, setInvoicesub] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
            const invoice_no = localStorage.getItem('invoiceNo')
            const Invoiceresult = await GetInvoice(org, invoice_no)
            setInvoice_detail(Invoiceresult[0])
            const result1 = await GetSubInvoice(org, invoice_no)
            console.log(result1)
            setInvoicesub(result1)

        }
        fetchdata()
    }, [])



    // const handlesavebtn = async (e) => {
    //     e.preventDefault();

    //     const squ_no = invoiceprefix;
    //     const Invoicedate = document.getElementById('Invoicedate').value
    //     const ordernumber = document.getElementById('ordernumber').value
    //     const invoiceamt = grandtotal;
    //     const User_id = localStorage.getItem('User_id')
    //     const periodfrom = document.getElementById('fromdate').value;
    //     const periodto = document.getElementById('todate').value;
    //     const custid = document.getElementById('custname').value;
    //     const billsubtotal = totalamout
    //     const total_tax = Math.max(...totalgst)
    //     const remark = document.getElementById('custnotes').value;
    //     let location = document.getElementById('locationadd')
    //     location = location.options[location.selectedIndex].text;
    //     let consignee = document.getElementById('custname')
    //     consignee = consignee.options[consignee.selectedIndex].text;
    //     const currency_type = document.getElementById('currency').value
    //     const paymentterm = document.getElementById('paymentterm').value;
    //     const Duedate = document.getElementById('Duedate').value;
    //     const cgst = document.getElementById('cgstipt').value;
    //     const sgst = document.getElementById('sutgstipt').value;
    //     const utgst = document.getElementById('sutgstipt').value;
    //     const igst = document.getElementById('igstipt').value;
    //     const Major = document.getElementById('Activity').value;
    //     let billing_code = document.getElementById('Activity')
    //     billing_code = billing_code.options[billing_code.selectedIndex].text;

    //     let cgstamount = 0;
    //     let sgstamount = 0;
    //     let utgstamount = 0;
    //     let igstamount = 0;
    //     const taxableamt = gstvalue;

    //     if (igst > 0) {
    //         igstamount = taxableamt

    //     } else {
    //         cgstamount = taxableamt / 2
    //         sgstamount = taxableamt / 2
    //         utgstamount = taxableamt / 2

    //     }



    //     const result = await InsertInvoice(localStorage.getItem('Organisation'), fin_year, invoiceids, squ_nos, Invoicedate, ordernumber, invoiceamt, User_id, periodfrom, periodto, Major, locationid, custid, billsubtotal,
    //         total_tax, locationcustaddid, remark, btn_type, location, consignee, masterid, cgst, sgst, utgst, igst, taxableamt, currency_type,
    //         paymentterm, Duedate, User_id)

    //     const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', updateinvcount)

    //     amount.map(async (amt, index) => {
    //         console.log(amt, Quantitys[index], rate[index], unit[index], minor[index], glcode[index])
    //         const result1 = await InsertInvoiceSub(localStorage.getItem('Organisation'), fin_year, invoiceids, Major, minor[index], glcode[index], billing_code, Quantitys[index], rate[index], unit[index], amt, consignee, custaddress_state, custid, locationcustaddid, taxable[index], cgst, sgst, utgst, igst, cgstamount, sgstamount, utgstamount, igstamount, User_id)

    //     })
    //     if (result) {
    //         alert('Added')
    //         window.location.reload();
    //     }

    // }

    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />

                    <div className="content-wrapper" >
                        <div className="container-fluid" >

                            <div className="row pt-3" >
                                <div className="col">

                                    <div className="card" >
                                        <article
                                            className="card-body">
                                            <h3 className="text-left"> Edit Invoice</h3>
                                            <br />
                                            <form autoComplete="off">
                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span style={{ color: "red" }}>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <select
                                                            id="custname"
                                                            className="form-control">
                                                            <option value={invoice_detail.custid} hidden>{invoice_detail.consignee}</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Address <span style={{ color: "red" }}>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <select
                                                            id="custaddr"
                                                            className="form-control">
                                                            <option value={invoice_detail.cust_locationid} hidden>{invoice_detail.cust_location_add}</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Billing Address<span style={{ color: "red" }}>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <select
                                                            id="locationadd"
                                                            className="form-control">
                                                            <option value={invoice_detail.location} hidden>{invoice_detail.location_name}</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Invoice <span style={{ color: "red" }}>*</span> </label>
                                                    <div className="d-flex col-md">
                                                        <input type="text" className="form-control col-md-5" id="invoiceid" disabled value={invoice_detail.invoice_no} />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                    <div className="d-flex col-md">
                                                        <input type="text" className="form-control col-md-5" id="ordernumber" placeholder='Enter the order number' disabled value={invoice_detail.order_no} />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">

                                                    <div className="d-flex col-md-3">
                                                        <label className="col-md-6 col-form-label font-weight-normal" >Invoice Date<span style={{ color: "red" }}>*</span> </label>
                                                        <input type="date" className="form-control col-md-6" id="Invoicedate" disabled value={invoice_detail.startdate} />
                                                    </div>


                                                    <div className="d-flex col-md-5">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" >Terms</label>

                                                        <select
                                                            id="paymentterm"
                                                            className="col-md-6  mr-0 form-control">
                                                            <option value={invoice_detail.payment_term} hidden>{invoice_detail.payment_term} </option>

                                                        </select>
                                                    </div>

                                                    <div className="d-flex col-md-3" >
                                                        <label className="col-md-5 col-form-label font-weight-normal" >Due Date</label>
                                                        <input type="date" className="form-control col-md-6" id="Duedate" disabled value={invoice_detail.lastdate} />

                                                    </div>
                                                </div>

                                                <hr />
                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Activity <span style={{ color: "red" }}>*</span></label>
                                                    <div className="d-flex col-md-4">
                                                        <select id="Activity" className="form-control" >
                                                            <option value={invoice_detail.major} hidden>{invoice_detail.major} </option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row mt-3" id='FTdate' style={{ display: "none" }}>
                                                    <div className="d-flex col-md-3">
                                                        <label className="col-md-6 col-form-label font-weight-normal" htmlFor='fromdate'>From Date </label>
                                                        <input type="date" className="form-control col-md-6" id="fromdate" disabled value={invoice_detail.periodfrom} />
                                                    </div>
                                                    <div className="d-flex col-md-5">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" htmlFor='todate'>To Date </label>
                                                        <input type="date" className="form-control col-md-6" id="todate" disabled value={invoice_detail.periodto} />
                                                    </div>
                                                </div>
                                                <br />


                                                <table className="table">
                                                    <thead>
                                                        <tr>
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
                                                        {/*<tr>

                                                             <td>Abc Test</td>
                                                                <td>Abc Test</td>
                                                                <td>Abc Test</td>
                                                                <td>Abc Test</td>
                                                                <td>Abc Test</td>
                                                                <td>Abc Test</td>
                                                                <td>Abc Test</td>

                                                            </tr> */}

                                                        {/* ############################################ Rupesh */}
                                                        {
                                                            invoicesub.map((item, index) => (
                                                                <tr key={index}>

                                                                    <td>{item.minor}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.rate}</td>
                                                                    <td>{item.taxable === 'No' ? '0' : item.taxable}</td>
                                                                    <td>{item.unit}</td>
                                                                    <td>{item.amount}</td>
                                                                    <td>{item.amount}</td>

                                                                </tr>

                                                            ))
                                                        }
                                                        {/* ############################################ Rupesh */}



                                                        {/* {
                                                            totalValues.map((element, index) => (
                                                                        <tr key={index}>
                                                                            <div id='trdiv'>
                                                                                <td className="col-md-2 pl-0 pr-0">
                                                                                    <select onChange={handleChangeItems} id="gstvalue" className="form-control col-md-">
                                                                                        <option value='' hidden > Select item</option>
                                                                                      
                                                                                    </select>
                                                                                </td>
                                                                            </div>
                                                                            <td className='col-md-2 pl-0 pr-0'>
                                                                                <input className="form-control col-md" style={{ border: "none" }} type="number" id="Quality" placeholder="0" onChange={(e) => {
                                                                                    const quantity = e.target.value
             
                                                                                }} /></td>

                                                                            <td className='col-md-2 pl-0 pr-0'>
                                                                                <input className="form-control col-md" style={{ border: "none" }} type="number" id="Rate" placeholder="0"
                                                                                    />
                                                                            </td>
                                                                            <td id="gst" className='col-md-1'>{gstvalues[index]}</td>

                                                                            <td className='pl-0 pr-0 col-md-2'>
                                                                                <select onChange={handleChangeUnit} className="form-control col-md" id='unitdrop'>
                                                                                    <option value='' hidden> Select Unit</option>

                                                                                </select>
                                                                            </td>
                                                                            <td id="amountvalue">{amount[index] ? amount[index] : 0}</td>
                                                                            <td id="Totalsum">{Totalamountnew[index] ? Totalamountnew[index] : 0}</td>
                                                                        </tr>
                                                                    ))
                                                        } */}
                                                    </tbody>
                                                </table>

                                                {/*######################## Rupesh
                                                 <button className="btn btn-primary" id='additembtm'>Add Item</button>   &nbsp;
                                                <button className="btn btn-danger" id='removeitembtm'>Remove</button>  
                                                 ########################## Rupesh */}


                                                <hr />

                                                <div style={{ display: "flex" }}>
                                                    <div style={{ width: "40%" }}>
                                                        <div className="form mt-3">
                                                            <label className="col-md-7 col-form-label font-weight-normal" >Remarks :-</label>
                                                            <div className="d-flex col-md">
                                                                <textarea type="text" className="form-control " rows="4" id="custnotes" placeholder="Looking forward for your bussiness "
                                                                    style={{ resize: 'none' }} value={invoice_detail.remark} ></textarea>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td><button className="btn btn-primary" id='subtotalbtn'>Sub Total</button></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>

                                                                <tr id='cgstinp' >
                                                                    <td>CGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className="form-control col-md-5" id='cgstipt'

                                                                                disabled />
                                                                            <div className="input-group-append">
                                                                                <span className="input-group-text">%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                                <tr id='sgstinp'>
                                                                    <td>SGST/UTGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className="form-control col-md-5" id='sutgstipt' disabled />
                                                                            <div className="input-group-append">
                                                                                <span className="input-group-text">%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                                <tr id='igstinp'>
                                                                    <td>IGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className="form-control col-md-5 gstinpt" id='igstipt' disabled />
                                                                            <div className="input-group-append">
                                                                                <span className="input-group-text">%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr id='tgstinp'>
                                                                    <td>Total GST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1" >
                                                                            <input type="number" className="form-control col-md-5" id='gstipt ' disabled />
                                                                            <div className="input-group-append">
                                                                                <span className="input-group-text">%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td id="Totalvaluerd"> {invoice_detail.total_tax}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                        Currency
                                                                    </td>
                                                                    <td>
                                                                        <div className="input-group mb-1">
                                                                            <select className="form-control col-md-5" id="currency" >
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
                                                                <InvoicePreviewWithGst Allinvoicedata={allInvoiceData} Allitems={items} /> :
                                                                <InvoicePreview Allinvoicedata={allInvoiceData} Allitems={items} />

                                                        } */}

                                                <div className="form-group">
                                                    <label className="col-md-4 control-label" htmlFor="save"></label>
                                                    <div className="col-md-20" style={{ width: "100%" }} >
                                                        <button id="savebtn" type='submit' name="save" className="btn btn-danger" value='save'>
                                                            Save
                                                        </button>
                                                        <button id="postbtn" name="save" type='submit' className="btn btn-danger ml-2" value='post' >
                                                            Post
                                                        </button>
                                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
                                                            name="clear" className="btn ml-2 btn btn-primary">Cancel </button>
                                                        <button id='previewbtn' type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" disabled>Preview Invoice </button>

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
        </>
    )
}

export default EditInvoice
