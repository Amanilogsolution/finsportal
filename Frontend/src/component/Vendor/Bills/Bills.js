import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import { ActiveVendor, ActiveSelectedVendor, Activeunit, ActivePaymentTerm, SelectVendorAddress, Getfincialyearid, InsertVendorInvoice, ActiveUser, ActiveLocationAddress, InsertVendorSubInvoice } from '../../../api'


function Bills() {
    const [totalValues, setTotalValues] = useState([1])
    const [vendorlist, setVendorlist] = useState([])
    const [unitlist, setUnitlist] = useState([])
    const [paymenttermlist, setPaymenttermlist] = useState([])
    const [vendorselectedlist, setVendorselectedlist] = useState([])
    const [vendorlocation, setVendorLocation] = useState([])
    const [activeuser, setActiveUser] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [tdscomp, setTdscomp] = useState('')

    const [location, setLocation] = useState([])
    const [items, setItems] = useState([])
    const [employee, setEmployee] = useState([]);
    const [quantity, setQuantity] = useState([])
    const [rate, setRate] = useState([])
    const [amount, setAmount] = useState([])
    const [netvalue, setNetvalue] = useState([])
    const [unit, setUnit] = useState([])
    const [netTotal, setNetTotal] = useState(0)


    const [index, setIndex] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const dataId = await ActiveVendor(org)
            setVendorlist(dataId)
            // console.log(dataId)
            Todaydate()

            const units = await Activeunit(org)
            setUnitlist(units)
            const payment = await ActivePaymentTerm(org)
            setPaymenttermlist(payment)

            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)

            const result2 = await ActiveUser()
            console.log(result2)
            setActiveUser(result2)

            const id = await Getfincialyearid(localStorage.getItem('Organisation'))
            const lastno = Number(id[0].voucher_count) + 1
            // console.log(Number(id[0].voucher_count)+1)
            // console.log(id[0].voucher_ser + id[0].year + String(lastno).padStart(5,'0'))
            document.getElementById('voucher_no').value = id[0].voucher_ser + id[0].year + String(lastno).padStart(5, '0')
        }
        fetchdata();
    }, [])

    const Todaydate = () => {
        var date = new Date();
        // var myDate = new Date(new Date().getTime() + (180 * 24 * 60 * 60 * 1000));
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("voucher_date").value = today;
    }

    const Duedate = (lastday) => {
        let last_days = lastday || 45;
        let myDate = new Date(new Date().getTime() + (last_days * 24 * 60 * 60 * 1000));
        let day = myDate.getDate();
        let month = myDate.getMonth() + 1;
        let year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        document.getElementById("due_date").value = today;
    }

    const handleAccountTerm = (e) => {
        const days = Number(e.target.value)
        Duedate(days)
    }

    const handlevendorselect = async (e) => {
        const result = await ActiveSelectedVendor(localStorage.getItem('Organisation'), e.target.value);
        setVendorselectedlist(result[0])
        Duedate(result[0].payment_terms)
        const result1 = await SelectVendorAddress(localStorage.getItem('Organisation'), e.target.value);
        setVendorLocation(result1)
        // console.log(result1)
    }

    const handleChangeLocation = (e) => {
        setLocation([...location, e.target.value])
    }


    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        if (newvalue.length == 1) {
            setTotalValues(newvalue)
        } else {
            newvalue.pop()
            setTotalValues(newvalue)
        }
    }

    const handleChangeEmployee = (e) => {
        setEmployee([...employee, e.target.value])

    }
    const handleChangeUnit = (e) => {
        setUnit([...unit, e.target.value])
        var sum = 0
        amount.map((item) => sum += item)
        setNetTotal(sum)

    }


    const handletogglegstdiv = () => {

        if (document.getElementById('gstdiv').style.display == 'none') {
            document.getElementById('gstdiv').style.display = 'block';
        }
        else {
            document.getElementById('gstdiv').style.display = 'none';
        }
    }


    const handleChangeRate = (e) => {
        const quantitys = document.getElementById("Quantity").value
        const total = quantitys * e.target.value;

        setTimeout(() => {
            setQuantity([...quantity, quantitys])
            setRate([...rate, e.target.value])
            setAmount([...amount, total])
        }, 1000)

    }

    const handleClickAdd = async (e) => {
        e.preventDefault()
        const voucher_no = document.getElementById('voucher_no').value
        const voucher_date = document.getElementById('voucher_date').value
        const vendor_name = document.getElementById('vend_name').value
        const Location = document.getElementById('location').value
        const bill_no = document.getElementById('bill_no').value
        const bill_date = document.getElementById('bill_date').value
        const bill_amt = document.getElementById('bill_amt').value
        const order_no = document.getElementById('order_no').value

        const payment_term = document.getElementById('payment_term').value

        const due_date = document.getElementById('due_date').value;
        const amt_paid = '';
        const amt_balance = '';
        const amt_booked = '';

        const tds_head= document.getElementById('tds_head').value;
        const tds_per = document.getElementById('tds_per').value || 0;
        const tds_amt = document.getElementById('tds_amt').value || 0;

        const expense_amt = document.getElementById('expense_amt').value;
        const remarks = document.getElementById('remarks').value
        const fins_year = localStorage.getItem('fin_year')
        const cgst_amt = document.getElementById('cgst-inp').value;
        const sgst_amt = document.getElementById('sgst-inp').value;
        const igst_amt = document.getElementById('igst-inp').value;
        const taxable_amt = (cgst_amt + sgst_amt + igst_amt) || 0;
        const non_taxable_amt = ''
        const userid = localStorage.getItem('User_id')
       

        console.log(localStorage.getItem('Organisation'), voucher_no, voucher_date, vendor_name, Location, bill_no,
            bill_date, bill_amt, payment_term, due_date, amt_paid, amt_balance, amt_booked, tds_head, tdscomp, tds_per, tds_amt,
            taxable_amt, non_taxable_amt, expense_amt, remarks, fins_year, cgst_amt, sgst_amt, igst_amt, userid)

        //    console.log( localStorage.getItem('Organisation'),voucher_no,voucher_date,vendor_name,Location,bill_no,
        // bill_date,bill_amt,payment_term,due_date,amt_paid,amt_balance,amt_booked,tds_head,tds_ctype,tds_per,tds_amt,
        // taxable_amt,non_taxable_amt,expense_amt,remarks,fins_year,cgst_amt,sgst_amt,igst_amt,userid)

        // const result = await InsertVendorInvoice(localStorage.getItem('Organisation'), voucher_no, voucher_date, vendor_name, Location, bill_no,
        // bill_date, bill_amt, payment_term, due_date, amt_paid, amt_balance, amt_booked, tds_head, tdscomp, tds_per, tds_amt,
        // taxable_amt, non_taxable_amt, expense_amt, remarks, fins_year, cgst_amt, sgst_amt, igst_amt, userid)
        // console.log(result)
    }

    const handlegst_submit = (e) => {
        e.preventDefault();
        document.getElementById('gstdiv').style.display = 'none';

        const totalvalue = document.getElementById('totalamount').value
        const gst = document.getElementById('gstTax').value
        let tax = totalvalue * gst / 100
        tax = Math.round(tax)
        const val = netTotal 
        setNetTotal(val+tax)


    }

    const handletds = () => {
        if (document.getElementById('tdsdiv').style.display == 'none') {
            document.getElementById('tdsdiv').style.display = 'block';
        }
        else {
            document.getElementById('tdsdiv').style.display = 'none';
        }
    }

    const handletdsbtn = (e) => {
        e.preventDefault();
        // var itemForm = document.getElementById('tdshead');
        // var checkBoxes = itemForm.querySelectorAll('input[type="checkbox"]');
        // let result = [];

        // checkBoxes.forEach(item => { // loop all the checkbox item
        //     if (item.checked) {  //if the check box is checked
        //         result.push(item.value); //stored the objects to result array
        //     }
        // })
        // setTdshead(result)
        document.getElementById('tdsdiv').style.display = 'none';
    }

    const handleTdscomp = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setTdscomp(e.target.value)
        const due_date = document.getElementById('due_date').value
        //    console.log( localStorage.getItem('Organisation'),voucher_no,voucher_date,vendor_name,Location,bill_no,bill_date,bill_amt,payment_term,due_date,amt_paid,amt_balance,amt_booked,tds_head,tds_ctype,tds_per,tds_amt,taxable_amt,non_taxable_amt,expense_amt,remarks,fins_year,cgst_amt,sgst_amt,igst_amt,userid)
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
                        <br />
                        <h3 className="text-left ml-5"> New Purchase Order</h3>
                        <div className="row " >
                            <div className="col ml-2 mr-2">
                                <div className="card">
                                    <article
                                        className="card-body" >
                                        <form autoComplete="off">

                                            <div className="form-row mt-2">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="vend_name"
                                                        onChange={handlevendorselect}
                                                        className="form-control col-md-4">

                                                        <option value='' hidden>select vendor</option>
                                                        {
                                                            vendorlist.map((item, index) =>
                                                                <option key={index} value={item.vend_id}>{item.vend_name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Location <span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="location"
                                                        className="form-control col-md-4">
                                                        <option value='' hidden>Select loction</option>
                                                        {
                                                            vendorlocation.map((item, index) =>
                                                                <option key={index} value={item.billing_address_attention}>{item.billing_address_attention}</option>)
                                                        }

                                                    </select>
                                                </div>
                                            </div>


                                            <div className="form-row mt-3" >
                                                <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >Voucher no </label>
                                                <div className="d-flex col-md-4" >
                                                    <input type="text" className="form-control col-md-10" id="voucher_no" placeholder="" disabled />
                                                </div>
                                                <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">Voucher Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10" id="voucher_date" disabled />
                                                </div>
                                            </div>


                                            <div className="form-row mt-3">
                                                <label htmlFor='bill_no' className="col-md-2 col-form-label font-weight-normal" >Bill no<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-4" id="bill_no" placeholder="SO-00001" />
                                                </div>
                                            </div>



                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Order Number</label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-4" id="order_no" />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label htmlFor='bill_amt' className="col-md-2 col-form-label font-weight-normal">Bill Amount<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="number" className="form-control col-md-4" id="bill_amt" />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Bill Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-4" id="bill_date" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3" >
                                                <label htmlFor='payment_term' className="col-md-2 col-form-label font-weight-normal" >Payment Terms<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md-4" >
                                                    <select
                                                        id="payment_term"
                                                        className="form-control col-md-10" onChange={handleAccountTerm}>
                                                        <option value='' hidden>{vendorselectedlist.payment_terms}</option>
                                                        {
                                                            paymenttermlist.map((item, index) => (
                                                                <option key={index} value={item.term_days}>{item.term}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <label htmlFor='due_date' className="col-md-1 col-form-label font-weight-normal" >Due Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10" id="due_date" disabled />
                                                </div>
                                            </div>

                                            <br />
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <th className='text-center' scope="col">Location</th>
                                                    <th className='text-center' scope="col">Item Details</th>
                                                    <th className='text-center' scope="col">Employee</th>
                                                    <th className='text-center' scope="col">Quantity</th>
                                                    <th className='text-center' scope="col">Rate</th>
                                                    <th className='text-center' scope="col">Amount</th>
                                                    <th className='text-center' scope="col">Unit</th>
                                                    <th className='text-center' scope="col">Deduction</th>
                                                    <th className='text-center' scope="col">Refno/FIleno</th>
                                                    <th className='text-center' scope="col">Net Amt</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        totalValues.map((element, index) => (
                                                            <tr key={index}>
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <select className="form-control ml-0" onChange={handleChangeLocation}
                                                                    >
                                                                        <option value='' hidden>Select Location</option>
                                                                        {
                                                                            locationstate.map((item,index) => (
                                                                                <option key={index} value={item.location_add1} >{item.location_add1}</option>

                                                                            ))
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <select className="form-control ml-0">
                                                                        <option value='' hidden>Select Item</option>

                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <select className="form-control ml-0" onChange={handleChangeEmployee}>
                                                                        <option value='' hidden>Select Employee</option>
                                                                        {
                                                                            activeuser.map((items,index) => (
                                                                                <option key={index} value={items.employee_name} >{items.employee_name}</option>

                                                                            ))
                                                                        }

                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id="Quantity" onChange={() => setIndex(index)} className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id="Rate" onChange={handleChangeRate} className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id="Amount" value={amount[index]} className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <select className="form-control ml-0" onChange={handleChangeUnit}>
                                                                        <option value='' hidden>Select Unit</option>
                                                                        {
                                                                            unitlist.map((item, index) =>
                                                                                <option key={index} value={item.unit_name}>{item.unit_name}</option>)
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='number' className="form-control" onChange={(e) => {
                                                                        const value = e.target.value;

                                                                        const net = amount[index] - value
                                                                        setTimeout(() => {
                                                                            setNetvalue([...netvalue, net])

                                                                        }, 1000)
                                                                    }} />

                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='text' className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='number' className="form-control" value={netvalue[index]} />
                                                                </td>
                                                            </tr>

                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                            <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                            <button className="btn btn-danger" onClick={handleRemove}>Remove</button>
                                            <hr />

                                            <div style={{ display: "flex" }}>
                                                <div style={{ width: "40%" }}>
                                                    <div className="form mt-2">
                                                        <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="5" id="remarks" placeholder="Remarks" style={{ resize: "none" }}></textarea>
                                                        </div>

                                                    </div>
                                                    <div className='mt-3'>
                                                        <label className="font-weight-normal" >Attach file(s) to Estimate</label><br />
                                                        <button className='btn btn-success'>Attach File</button>
                                                    </div>
                                                </div>
                                                <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
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
                                                                <td style={{ width: "150px" }} >
                                                                    <a title='Click to Input GST Data' style={{ cursor: "pointer", borderBottom: "1px dashed #000" }} onClick={handletogglegstdiv}>Total CGST Amt *
                                                                    </a>




                                                                    <div className=" dropdown-menu-lg bg-light" id='gstdiv' style={{ width: "750px", display: "none", boxShadow: "3px 3px 10px #000", position: "absolute", left: "-300px", top: "20px" }}>
                                                                        <div>
                                                                            <div className="card-body p-2">
                                                                                <i className="fa fa-times" aria-hidden="true" onClick={handletogglegstdiv}></i>
                                                                                <div className="form-group ">
                                                                                    <label htmlFor='location' className="col-form-label font-weight-normal" >Select GST Type <span style={{ color: "red" }}>*</span> </label>
                                                                                    <div className="" >
                                                                                        <select
                                                                                            id="location"
                                                                                            className="form-control col">
                                                                                            <option value='' hidden>Select loction</option>
                                                                                            <option value='Intra'>Intra</option>
                                                                                            <option value='Inter' >Inter</option>

                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-row">
                                                                                    <label htmlFor='location' className="col-md-5 form-label font-weight-normal" >Total Amt <span style={{ color: "red" }}>*</span> </label>
                                                                                    <input type="" className="form-control col-md-7 bg-light" id="totalamount" value={netTotal} />
                                                                                </div>
                                                                                <div className="form-row" >
                                                                                    <label htmlFor='location' className="col-md-5 form-label font-weight-normal"  >GST Tax(%) <span style={{ color: "red" }}>*</span> </label>
                                                                                    <input type="" className="form-control col-md-7" id="gstTax" />
                                                                                </div>
                                                                                <br />
                                                                                <button className='btn btn-outline-primary float-right' onClick={handlegst_submit} >Submit</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="" className="form-control col-md-6 ml-5" id='cgst-inp' disabled />

                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }}>0.0</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total SGST Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent border-none'>
                                                                    <input type="" className="form-control col-md-6 ml-5" id='sgst-inp' disabled />
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }}>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total IGST Amt</td>

                                                                <td className='form-control col-md p-0 bg-transparent ' >
                                                                    <input type='number' className="form-control col-md-6 ml-5" id='igst-inp' disabled />
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }}>0.00</td>
                                                            </tr>
                                                            <tr scope="row">
                                                                <td style={{ width: "150px" }}>
                                                                    <a title='Click to Input TDS Data' style={{ cursor: "pointer", borderBottom: "1px dashed #000" }} onClick={handletds}>Total TDS *
                                                                    </a>

                                                                    <div className=" dropdown-menu-lg bg-light " id='tdsdiv' style={{ display: "none", width: "750px", boxShadow: "3px 3px 10px #000", position: "absolute", top: "0px", left: "-300px" }}>
                                                                        <div>
                                                                            <div className="card-body" >
                                                                                <i className="fa fa-times" aria-hidden="true" onClick={handletds}></i>

                                                                                <div className="form-group" style={{ marginBottom: "0px" }} id='tdshead'>
                                                                                    <label htmlFor='location' className="col-form-label font-weight-normal" >TDS Head <span style={{ color: "red" }}>*</span> </label>
                                                                                    <div className="form-row m-0">

                                                                                        <select className="form-control col" id='tds_head'>
                                                                                            <option value='' hidden>Select Tds head</option>
                                                                                            <option value='Cost'>Cost</option>
                                                                                            <option value='Salary'>Salary</option>
                                                                                            <option value='Rent'>Rent</option>
                                                                                            <option value='Profit'>Profit</option>
                                                                                            <option value='Brokerage'>Brokerage</option>

                                                                                        </select>
                                                                                        {/* <input type='checkbox' value='Cost' id='cost' />
                                                                                            <label htmlFor='cost' className="col-form-label font-weight-normal" >Cost </label>&nbsp;

                                                                                            <input type='checkbox' value='Salary' id='salary' />
                                                                                            <label htmlFor='salary' className="col-form-label font-weight-normal" >Salary </label>&nbsp;&nbsp;

                                                                                            <input type='checkbox' value='Rent' id='rent' />
                                                                                            <label htmlFor='rent' className="col-form-label font-weight-normal" >Rent </label>

                                                                                            <div className="form-group ml-1" style={{ marginBottom: "0px" }}>
                                                                                                <div className="form-row">
                                                                                                    <input type='checkbox' value='Profit' id='Profit' />
                                                                                                    <label htmlFor='Profit' className="col-form-label font-weight-normal" >Profit </label>&nbsp;&nbsp;

                                                                                                    <input type='checkbox' value='Brokerage' id='Brokerage' />
                                                                                                    <label htmlFor='Brokerage' className="col-form-label font-weight-normal" >Brokerage </label>&nbsp;

                                                                                                </div>
                                                                                            </div> */}


                                                                                    </div>

                                                                                </div>


                                                                                <div className="form-row m-0" style={{ marginTop: '0px' }} onChange={handleTdscomp}>
                                                                                    <input type="radio" id='tds_comp' name='comp_type' value='Company' />
                                                                                    <label htmlFor='company' className="col-md-5 form-label font-weight-normal mt-1"  >Company</label>

                                                                                    <input type="radio" id='tds_comp' name='comp_type' value='Non-Company' />
                                                                                    <label htmlFor='non_company' className="form-label font-weight-normal mt-1" >Non-Company</label>

                                                                                </div>
                                                                                <div className="form-row" >
                                                                                    <label htmlFor='tds_amt' className="col-md-5 form-label font-weight-normal"  >TDS Amount <span style={{ color: "red" }}>*</span> </label>
                                                                                    <input type="number" className="form-control col-md-7" id='tds_amt' />
                                                                                </div>
                                                                                <div className="form-row" >
                                                                                    <label htmlFor='tds_per' className="col-md-5 form-label font-weight-normal"  >TDS(%) <span style={{ color: "red" }}>*</span> </label>
                                                                                    <input type="number" className="form-control col-md-7" id='tds_per' />
                                                                                </div>
                                                                                <br />
                                                                                <button className='btn btn-outline-primary float-right' onClick={handletdsbtn}>Submit</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="text" className="form-control col-md-6 ml-5" disabled />
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }}>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Expense Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="text" className="form-control col-md-6 ml-5" id='expense_amt' />
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }}>0.00</td>
                                                            </tr>

                                                            <tr>
                                                                <td><h4>Total</h4></td>
                                                                <td></td>
                                                                <td className='text-center' style={{ width: "150px" }}>{netTotal}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                                <div className="col-md-20" style={{ width: "100%" }}>
                                                    <button id="save" name="save" className="btn btn-danger" onClick={handleClickAdd}>
                                                        Post
                                                    </button>
                                                    <button id="clear" onClick={(e) => {
                                                        e.preventDefault(); window.location.href = '/home'
                                                    }} name="clear" className="btn ml-2">
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

export default Bills
