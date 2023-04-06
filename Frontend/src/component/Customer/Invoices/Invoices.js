import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import InvoicePreview from './PreviewInvoice';
import InvoicePreviewWithoutGst from './PreviewInvoicewithoutGST'
import {
    ActiveCustomer, ActivePaymentTerm,SelectedCustomer, ActiveLocationAddress, ShowCustAddress, ActiveItems, Getfincialyearid, 
    Activeunit, ActiveCurrency, InsertInvoice, ActiveAccountMinorCode, InsertInvoiceSub, ActiveChartofAccountname, Updatefinancialcount, 
    SearchLocationAddress, SearchCustAddress
} from '../../../api/index'
import './invoice.css'

function Invoices() {
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(1);
    const [arry, setArry] = useState([0]);
    const [itemsrowval, setItemsrowval] = useState([{
        activity: '',
        majorCode: '',
        items: '',
        taxPer: 0,
        taxAmt: 0,
        taxable: '',
        glcode: '',
        Quantity: '',
        rate: '',
        unit: '',
        amount: '',
        total: ''
    }]);
    const [allInvoiceData, setAllInvoiceData] = useState({
        TaxInvoice: "",
        InvoiceData: "",
        GrandTotal: "",
        TotalTaxamount: "",
        Totalamounts: "",
        CGSTPer: "",
        SGSTPer: "",
        IGSTPer: "",
        CGST: "",
        SGST: "",
        IGST: "",
        BillTo: "",
        SupplyTo: "",
        BillToGst: "",
        OriginState: "",
        DestinationState: ""
    })
    const [itemsdata, setItemdata] = useState([])
    const [itemdetails, setItemdetails] = useState([])
    const [itemtoggle, setItemtoggle] = useState([false])
    const [activecustomer, setActiveCustomer] = useState([])
    const [Activeaccount, setActiveAccount] = useState([])
    const [activeunit, setActiveUnit] = useState([])
    const [custdetail, setCustdetail] = useState({})
    const [masterid, setMasterid] = useState([])
    const [cutomerAddress, setCutomerAddress] = useState([])
    const [custAddressLocation, setCustAddressLocation] = useState([])
    const [billingAddressLocation, setBillingAddressLocation] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [currencylist, setCurrencylist] = useState([]);
    const [custadddetail, setCustadddetail] = useState({ state: '', custAddId: '', custAddGst: '' })
    const [invoiceid, setInvoiceid] = useState('')
    const [invoiceprefix, setInvoiceprefix] = useState('')
    const [locationid, setLocationid] = useState('')
    const [billingaddress, setBillingAddress] = useState('')
    const [updateinvcount, setUpdateInvCount] = useState()
    const [activepaymentterm, setActivePaymentTerm] = useState([])
    const [totalGstamt, setTotalGstamt] = useState('')
    const [index111, setIndex] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const localdata = localStorage.getItem('gststatus');
            if (localdata === 'false') {
                document.getElementById('cgstinp').style.display = 'none';
                document.getElementById('sgstinp').style.display = 'none';
                document.getElementById('igstinp').style.display = 'none';
                document.getElementById('tgstinp').style.display = 'none';
            }

            const org = localStorage.getItem('Organisation');
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)
            const result1 = await ActivePaymentTerm(org)
            setActivePaymentTerm(result1)
            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)
            const ActiveUnit = await Activeunit(org)
            setActiveUnit(ActiveUnit)
            const currencydata = await ActiveCurrency(org)
            setCurrencylist(currencydata)
            const ActiveAccount = await ActiveAccountMinorCode(org)
            setActiveAccount(ActiveAccount)
            setLoading(true)
            Todaydate()
            document.getElementById('savebtn').disabled = true;
            document.getElementById('postbtn').disabled = true;
        }
        fetchdata()
    }, [])

    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("Invoicedate").value = today;
    }

    const handleChangeActivity = async (e, index) => {
        e.preventDefault();
        itemtoggle[index] = true
        const datwe = e.target.value.split(',')
        itemsrowval[index].majorCode = datwe[1]
        const result2 = await ActiveItems(localStorage.getItem('Organisation'), datwe[0]);
        let value = [...itemsdata]
        value[index] = result2;
        setItemdata(value)
        setIndex(index)
        let val = document.getElementById(`Activity-${index}`);
        let text = val.options[val.selectedIndex].text;
        itemsrowval[index].activity = text;
        if (text === 'WAREHOUSING') {
            document.getElementById('FTdate').style.display = "flex"
        }
        else {
            document.getElementById('FTdate').style.display = "none"
        }
    }

    const addRow = (e) => {
        e.preventDefault();
        let val = count + 1;
        setCount(val);
        setArry([...arry, val]);
        itemtoggle.push(false)
        let obj = { activity: '', majorCode: '', items: '', taxPer: 0, taxAmt: 0, taxable: '', glcode: '', Quantity: '', rate: '', unit: '', amount: '', total: '' }
        itemsrowval.push(obj)
        document.getElementById('savebtn').disabled = true;
        document.getElementById('postbtn').disabled = true;
    };

    const RemoveRow = (e) => {
        e.preventDefault();
        if (!(count === 1)) {
            let val = [...arry];
            val.pop();
            setCount(val.length);
            setArry(val);
            itemtoggle.pop();
            let objval = [...itemsrowval];
            objval.pop();
            setItemsrowval(objval)
            document.getElementById('savebtn').disabled = true;
            document.getElementById('postbtn').disabled = true;
        }
    }
    const handleCustname = async (e) => {
        e.preventDefault();
        const cust_id = e.target.value;
        const cust_detail = await SelectedCustomer(localStorage.getItem('Organisation'), cust_id)
        setCustdetail(cust_detail)
        setMasterid(cust_detail.mast_id)
        const terms = cust_detail.payment_terms
        let [val, Ter] = terms.split(" ")
        Duedate(Number(Ter))
        const cust_add = await ShowCustAddress(cust_id, localStorage.getItem("Organisation"))
        setCutomerAddress(cust_add)
    }
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
    const handleChangeCustomerAdd = (state, address_id, custaddgst) => {
        custadddetail.state = state;
        custadddetail.custAddId = address_id;
        custadddetail.custAddGst = custaddgst;
    }

    const handlechnageaddress = async (add, id) => {
        // e.preventDefault();
        const fin_year = await Getfincialyearid(localStorage.getItem('Organisation'))
        setLocationid(id)
        const billing_add = add;
        setBillingAddress(add)
        const invoicepefix = fin_year[0].invoice_ser;
        let invoicecitypre = (billing_add.substring(0, 3));
        invoicecitypre = invoicecitypre.toUpperCase();
        let invoicecount = Number(fin_year[0].invoice_count);
        invoicecount = invoicecount + 1;
        setUpdateInvCount(invoicecount)
        invoicecount = String(invoicecount)
        const invoiceidauto = invoicecount.padStart(5, '0')
        const invoiceid = invoicepefix + invoicecitypre + fin_year[0].year + invoiceidauto;
        setInvoiceprefix(invoicepefix)
        setInvoiceid(invoiceid);
    }

    const handleChangeItems = async (value, index) => {
        const [gstper, item, glcodes] = value.split('^')
        itemsrowval[index].items = item
        itemsrowval[index].taxPer = Number(gstper)
        itemsrowval[index].glcode = glcodes
        if (gstper > 0) {
            itemsrowval[index].taxable = 'yes'
        } else {
            itemsrowval[index].taxable = 'No'
        }
        document.getElementById('savebtn').disabled = true;
        document.getElementById('postbtn').disabled = true;
    }

    const handleAccountTerm = (e) => {
        const days = Number(e.target.value)
        Duedate(days)
    }

    const handleChangeQuantity_Rate = (index) => {
        let qty = Number(document.getElementById(`Quality-${index}`).value) || 0
        let rate = Number(document.getElementById(`Rate-${index}`).value) || 0
        let gst = Number(itemsrowval[index].taxPer) || 0
        let amt = qty * rate
        let tax = Math.round(amt * gst / 100)

        setTimeout(() => {
            document.getElementById(`tax-${index}`).value = tax
            document.getElementById(`amount-${index}`).value = amt
            document.getElementById(`TotalAmount-${index}`).value = amt + tax
            itemsrowval[index].Quantity = qty;
            itemsrowval[index].rate = rate;
            itemsrowval[index].taxAmt = tax;
            itemsrowval[index].amount = amt;
            itemsrowval[index].total = amt + tax;
        }, 1000)
        document.getElementById('savebtn').disabled = true;
        document.getElementById('postbtn').disabled = true;
    }

    const handleChangeUnit = (index, e) => {
        itemsrowval[index].unit = e.target.value;
    }

    const handleSubBtn = (e) => {
        e.preventDefault();
        let totalgstamt = 0;
        let totalgstper = 0;
        let totalinvamt = 0;
        let totalnetamt = 0;
        itemsrowval.map(item => {
            totalgstamt = totalgstamt + item.taxAmt
            totalinvamt = totalinvamt + item.total
            totalnetamt = totalnetamt + item.amount
            if (item.taxPer > totalgstper) { totalgstper = item.taxPer }
        })
        setTotalGstamt(totalgstamt)

        let cgstper = 0
        let sgstper = 0
        let igstper = 0

        let cgstamt = 0
        let sgstamt = 0
        let igstamt = 0

        if ((custadddetail.state.trim()).toUpperCase() === (billingaddress.trim()).toUpperCase()) {
            document.getElementById('cgstipt').value = (totalgstper / 2) || 0
            document.getElementById('sutgstipt').value = (totalgstper / 2) || 0
            document.getElementById('igstipt').value = 0

            cgstper = (totalgstper / 2) || 0
            sgstper = (totalgstper / 2) || 0
            igstper = 0

            cgstamt = (totalgstamt / 2) || 0
            sgstamt = (totalgstamt / 2) || 0
            igstamt = 0
        }
        else {
            document.getElementById('cgstipt').value = 0
            document.getElementById('sutgstipt').value = 0
            document.getElementById('igstipt').value = totalgstper || 0

            cgstper = 0
            sgstper = 0
            igstper = totalgstper || 0

            cgstamt = 0
            sgstamt = 0
            igstamt = totalgstamt
        }

        setAllInvoiceData({
            ...allInvoiceData,
            TaxInvoice: invoiceid, InvoiceData: document.getElementById('Invoicedate').value,
            GrandTotal: totalinvamt, TotalTaxamount: totalgstamt, CGSTPer: cgstper, SGSTPer: sgstper, IGSTPer: igstper,
            CGST: cgstamt, SGST: sgstamt, IGST: igstamt,
            BillTo: `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}`, SupplyTo: `${billingAddressLocation[0]}, ${billingAddressLocation[1]}, ${billingAddressLocation[2]}`, BillToGst: custadddetail.custAddGst,
            TotalNetAmounts: totalnetamt, OriginState: billingaddress, DestinationState: custadddetail.state
        })
        document.getElementById('totalgstper').value = totalgstper;
        document.getElementById('grandtotaltd').innerHTML = totalinvamt || 0;
        document.getElementById('totalnetamt').innerHTML = totalnetamt || 0;
        document.getElementById('savebtn').disabled = false;
        document.getElementById('postbtn').disabled = false;
    }


    const handleSearchBillingLoc = async (e) => {
        const org = localStorage.getItem('Organisation');
        if (e.target.value.length > 2) {
            const getLocation = await SearchLocationAddress(org, e.target.value);
            setLocationstate(getLocation)
        }
        else if (e.target.value.length === 0) {
            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)
        }
    }
    const handleSearchCustLoc = async (e) => {
        const org = localStorage.getItem('Organisation');
        if (e.target.value.length > 2) {
            const getLocation = await SearchCustAddress(org, custdetail.cust_id, e.target.value);
            setCutomerAddress(getLocation)
        }
        else if (e.target.value.length === 0) {
            const locatonstateres = await ShowCustAddress(custdetail.cust_id, org)
            console.log(locatonstateres)
            setCutomerAddress(locatonstateres)
        }
    }


    const handlesavebtn = async (e) => {
        e.preventDefault();
        document.getElementById('savebtn').disabled = true;
        document.getElementById('postbtn').disabled = true;

        let invoiceids = "";
        let squ_nos = ""
        const btn_type = e.target.value;
        const fin_year = localStorage.getItem('fin_year')
        if (btn_type === 'save') {
            invoiceids = 'Random' + Math.floor(Math.random() * 10000) + 1;
            squ_nos = ""
        }
        else {
            invoiceids = allInvoiceData.TaxInvoice;
            squ_nos = invoiceprefix;
        }

        const Invoicedate = allInvoiceData.InvoiceData;
        const ordernumber = document.getElementById('ordernumber').value;
        const invoiceamt = allInvoiceData.GrandTotal;
        const User_id = localStorage.getItem('User_id')
        const periodfrom = document.getElementById('fromdate').value;
        const periodto = document.getElementById('todate').value;
        const custid = document.getElementById('custname').value;
        const billsubtotal = allInvoiceData.TotalNetAmounts
        const total_tax = allInvoiceData.CGSTPer + allInvoiceData.IGSTPer + allInvoiceData.SGSTPer
        const remark = document.getElementById('custnotes').value;

        let location = `${billingAddressLocation[0]}, ${billingAddressLocation[1]}, ${billingAddressLocation[2]}`

        let consignee = document.getElementById('custname')
        consignee = consignee.options[consignee.selectedIndex].text;
        const currency_type = document.getElementById('currency').value
        const paymentterm = document.getElementById('paymentterm').value;
        const Duedate = document.getElementById('Duedate').value;
        const cgst = allInvoiceData.CGSTPer;
        const sgst = allInvoiceData.SGSTPer
        const utgst = allInvoiceData.SGSTPer
        const igst = allInvoiceData.IGSTPer


        let custaddrs = `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}`

        const invoice_destination = allInvoiceData.DestinationState
        const invoice_origin = allInvoiceData.OriginState


        let cgstamount = allInvoiceData.CGST
        let sgstamount = allInvoiceData.SGST
        let utgstamount = allInvoiceData.SGST
        let igstamount = allInvoiceData.IGST
        const taxableamt = allInvoiceData.TotalTaxamount;



        // // Insert Data
        if (!custid || !billsubtotal || !consignee) {
            alert('Please Select Customer');
        }
        else {

            const result = await InsertInvoice(localStorage.getItem('Organisation'), fin_year, invoiceids,
                squ_nos, Invoicedate, ordernumber, invoiceamt, User_id, periodfrom, periodto, '', locationid, custid, billsubtotal,
                total_tax, custadddetail.custAddId, remark, btn_type, location, consignee, masterid, cgst, sgst, utgst, igst, taxableamt, currency_type,
                paymentterm, Duedate, User_id, custaddrs, allInvoiceData.BillToGst, invoice_destination, invoice_origin)

            if (result === 'Added') {
                itemsrowval.map(async (item, index) => {
                    const result1 = await InsertInvoiceSub(localStorage.getItem('Organisation'), fin_year, invoiceids, item.majorCode, item.items, item.glcode,
                        item.activity, item.Quantity, item.rate, item.unit, item.amount, consignee, custadddetail.state, custid, custadddetail.custAddId,
                        item.taxable, cgst, sgst, utgst, igst, cgstamount, sgstamount, utgstamount, igstamount, item.taxAmt, User_id)
                })

                if (btn_type !== 'save') {
                    const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', updateinvcount)
                }
                alert('Added')
                window.location.href = './SaveInvoice';
            }
            else {
                alert('Server not Response');
                window.location.reload();
            }
        }
    }
    return (
        <>
            <div className="wrapper">
                <Header />

                <div className={`content-wrapper `} >
                    <div className="container-fluid" >
                        <h3 className="pt-3 px-3"> New Invoice</h3>
                        {
                            loading ?
                                (
                                    <div className="card my-2" >
                                        <article className="card-body">
                                            <form autoComplete="off">
                                                <div className="form-row">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <select
                                                            id="custname"
                                                            className="form-control"
                                                            onChange={handleCustname}
                                                        >
                                                            <option value='' hidden>Select Customer</option>
                                                            {
                                                                activecustomer.map((items, index) => (
                                                                    <option key={index} value={items.cust_id} >{items.cust_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Address <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <button type="button" className="btn border" data-toggle="modal" data-target="#custAddnmodal"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setTimeout(() => {
                                                                    document.getElementById('searchCustAddress').focus()
                                                                }, 700)
                                                            }}
                                                        >
                                                            {
                                                                custAddressLocation.length > 0 ? `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}` : 'Select Customer Address Location'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Billing Address<span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        <button type="button" className="btn border" data-toggle="modal" data-target="#locationmodal"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setTimeout(() => {
                                                                    document.getElementById('searchBillingAddress').focus()
                                                                }, 700)
                                                            }}
                                                        >
                                                            {
                                                                billingAddressLocation.length > 0 ? `${billingAddressLocation[0]}, ${billingAddressLocation[1]}, ${billingAddressLocation[2]}` : 'Select Billing Address Location'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Invoice <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md">
                                                        <input type="text" className='form-control col-md-5  cursor-notallow' id="invoiceid" value={invoiceid} disabled />

                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                    <div className="d-flex col-md">
                                                        <input type="text" className='form-control col-md-5 ' id="ordernumber" placeholder='Enter the order number' />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">

                                                    <div className="d-flex col-md-3">
                                                        <label className="col-md-6 col-form-label font-weight-normal" >Invoice Date<span className='text-danger'>*</span> </label>

                                                        <input type="date" className='form-control col-md-6  cursor-notallow' id="Invoicedate" disabled />
                                                    </div>


                                                    <div className="d-flex col-md-4 ">
                                                        <label className="col-md-3 text-center col-form-label font-weight-normal" >Terms</label>

                                                        <select
                                                            id="paymentterm"
                                                            className='col-md-6  mr-0 form-control'
                                                            onChange={handleAccountTerm}
                                                        >
                                                            <option value={custdetail.payment_terms} hidden>{custdetail.payment_terms}</option>
                                                            {
                                                                activepaymentterm.map((item, index) => (
                                                                    <option key={index} value={item.term_days}>{item.term}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="d-flex col-md-3" >
                                                        <label className="col-md-5 col-form-label font-weight-normal" >Due Date</label>
                                                        <input type="date" className={`form-control col-md-7  cursor-notallow`} id="Duedate" disabled />
                                                    </div>
                                                </div>


                                                <div className="form-row mt-3" id='FTdate' style={{ display: "none" }}>
                                                    <div className="d-flex col-md-3">
                                                        <label className="col-md-6 col-form-label font-weight-normal" htmlFor='fromdate'>From Date </label>
                                                        <input type="date" className='form-control col-md-6 ' id="fromdate" />
                                                    </div>
                                                    <div className="d-flex col-md-5">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" htmlFor='todate'>To Date </label>
                                                        <input type="date" className='form-control col-md-6 ' id="todate" />
                                                    </div>
                                                </div>
                                                <br />


                                                <table className="table  table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Activity</th>
                                                            <th scope="col">Items</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Rate</th>
                                                            <th scope="col">Tax Amt</th>
                                                            <th scope="col">Unit</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            arry.map((element, index) => (
                                                                <tr key={index}>
                                                                    <td className="col-md-2 px-1">
                                                                        <select id={`Activity-${index}`} className="form-control"
                                                                            onChange={(e) => handleChangeActivity(e, index)}
                                                                        >
                                                                            <option value='' hidden>Select Activity</option>
                                                                            {
                                                                                Activeaccount.map((items, index) => (
                                                                                    <option key={index} value={[items.account_type_code, items.account_name_code]}>{items.account_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className="col-md-2 px-1">
                                                                        {
                                                                            <select id={`items-${index}`} className='form-control col'
                                                                                onChange={(e) => { handleChangeItems(e.target.value, index) }}
                                                                            >
                                                                                <option value='' hidden > Select item</option>
                                                                                {
                                                                                    itemtoggle[index] == true ?
                                                                                        itemsdata[index].map((item, index) => (
                                                                                            <option key={index} value={`${item.gst_rate}^${item.item_name}^${item.chart_of_acct_id}`} >{item.item_name}</option>
                                                                                        ))
                                                                                        : null
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </td>
                                                                    <td className='px-1' style={{ maxWidth: '10px' }}>
                                                                        <input className='form-control' type="number" id={`Quality-${index}`} placeholder="0" onChange={() => { handleChangeQuantity_Rate(index) }} />
                                                                    </td>
                                                                    <td className='px-1' style={{ maxWidth: '10px' }}>
                                                                        <input className="form-control" type="number" id={`Rate-${index}`} placeholder="0" onChange={() => { handleChangeQuantity_Rate(index) }} />
                                                                    </td>
                                                                    <td id="gst" className='col-md-1 px-1'>
                                                                        <input type='text' id={`tax-${index}`} className="form-control col cursor-notallow" disabled /></td>

                                                                    <td className='px-1 col-md-2'>
                                                                        <select className='form-control col' id={`unit-${index}`} onChange={(e) => { handleChangeUnit(index, e) }}>
                                                                            <option value='' hidden > Select Unit</option>
                                                                            {
                                                                                activeunit.map((item, index) => (
                                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td id="amountvalue" className='col-md-1 px-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`amount-${index}`} disabled />
                                                                    </td>
                                                                    <td id="Totalsum" className='col-md-1 px-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`TotalAmount-${index}`} disabled />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                <button className="btn btn-primary" onClick={addRow} id='additembtm'>Add Item</button>   &nbsp;
                                                <button className="btn btn-danger" onClick={RemoveRow} id='removeitembtm'>Remove</button>
                                                <hr />
                                                <div className='d-flex'>
                                                    <div style={{ width: "40%" }}>
                                                        <div className="form mt-3">
                                                            <label className="col-md-7 col-form-label font-weight-normal" >Remarks :-</label>
                                                            <div className="d-flex col-md">
                                                                <textarea type="text" className='form-control col-md-10' rows="4" id="custnotes" placeholder="Looking forward for your bussiness " style={{ resize: 'none' }}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='rounded py-1 px-2' style={{ width: "55%", background: '#eee' }}>
                                                        <table className='w-100'>
                                                            <tbody>
                                                                <tr>
                                                                    <td><button className="btn btn-primary" id='subtotalbtn' onClick={handleSubBtn}>Calcu. Total</button></td>
                                                                    <td colSpan='2' className='text-right  px-5' id='totalnetamt'> {/* {totalamout} */}</td>
                                                                </tr>

                                                                <tr id='cgstinp'>
                                                                    <td>CGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1">
                                                                            <input type="number" className='form-control col-md-5  cursor-notallow' id='cgstipt' disabled />
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
                                                                            <input type="number" className='form-control col-md-5  cursor-notallow' id='sutgstipt' disabled />
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
                                                                            <input type="number" className='form-control col-md-5 gstinpt  cursor-notallow' id='igstipt' disabled />
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
                                                                            <input type="number" className='form-control col-md-5  cursor-notallow' id='totalgstper' disabled />
                                                                            <div className="input-group-append">
                                                                                <span className="input-group-text">%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td id="TotalgstAmt">
                                                                        {totalGstamt}
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                        Currency
                                                                    </td>
                                                                    <td>
                                                                        <div className="input-group mb-1">
                                                                            <select className='form-control col-md-5' id="currency" >
                                                                                <option value={custdetail.currency} hidden >{custdetail.currency}</option>
                                                                                {
                                                                                    currencylist.map((item, index) =>
                                                                                        <option key={index} value={item.currency_code} style={{ height: "80px" }}>{item.currency_code}</option>)
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr className='mt-2'>
                                                                    <td><h3>Total</h3></td>
                                                                    <td></td>
                                                                    <td id="grandtotaltd"> </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                                {
                                                    localStorage.getItem('gststatus') !== 'true' ?
                                                        <InvoicePreviewWithoutGst
                                                            Allinvoicedata={allInvoiceData} Allitems={itemsrowval}
                                                        /> :
                                                        <InvoicePreview
                                                            Allinvoicedata={allInvoiceData} Allitems={itemsrowval}
                                                        />
                                                }

                                                <div className="form-group mt-3">
                                                    <button id="savebtn" type='button' name="save" className="btn btn-danger"
                                                        onClick={handlesavebtn}
                                                        value='save'>
                                                        Save
                                                    </button>
                                                    <button id="postbtn" type='button' name="save" className="btn btn-danger mx-2"
                                                        onClick={handlesavebtn}
                                                        value='post' >
                                                        Post
                                                    </button>
                                                    <button id="clear"
                                                        // onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
                                                        name="clear" className="btn mx-2 btn btn-primary">Cancel </button>
                                                    <button id='previewbtn' type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter" >Preview Invoice </button>
                                                </div>
                                            </form>
                                        </article>
                                    </div>
                                )
                                :
                                (<div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                                    <div className="spinner-border" role="status"> </div>
                                </div>)
                        }
                    </div>
                </div>
                <Footer />
            </div>


            {/* modal Bill Address  Start*/}
            <div className="modal fade  bd-example-modal-lg" id="locationmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content " >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Billing Address</h5>
                            <div className="form-group col-md-5">
                                <input type="text" className='form-control col' placeholder='Search Address' id="searchBillingAddress"
                                    onChange={handleSearchBillingLoc}
                                />
                            </div>
                        </div>
                        <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>City </th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        locationstate.length > 0 ?
                                            locationstate.map((items, index) => (
                                                <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                                    onClick={() => {
                                                        handlechnageaddress(items.location_state, items.location_id);
                                                        setBillingAddressLocation([items.location_add1, items.location_city, items.location_country])
                                                    }}
                                                >
                                                    <td>{items.location_city}</td>
                                                    <td style={{ fontSize: "15px" }}>{items.location_add1},{items.location_city},{items.location_country}</td>

                                                </tr>
                                            ))
                                            : 'Select Customer'
                                    }
                                </tbody>
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal Bill Address  End*/}

            {/* modal Customer Address  Start*/}
            <div className="modal fade  bd-example-modal-lg" id="custAddnmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content " >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Customer Address</h5>
                            <div className="form-group col-md-5">
                                <input type="text" className='form-control col' placeholder='Search Address' id="searchCustAddress"
                                    onChange={handleSearchCustLoc}
                                />
                            </div>
                        </div>
                        <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>Address </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cutomerAddress.length > 0 ?
                                            cutomerAddress.map((items, index) => (
                                                <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                                    onClick={() => {
                                                        handleChangeCustomerAdd(items.billing_address_state, items.cust_addressid, items.gst_no);
                                                        setCustAddressLocation([items.billing_address_attention, items.billing_address_city, items.billing_address_country])
                                                    }}
                                                >
                                                    <td>{items.billing_address_city}</td>
                                                    <td style={{ fontSize: "15px" }}>{items.billing_address_attention},{items.billing_address_city},{items.billing_address_country}</td>

                                                </tr>
                                            ))
                                            : 'Select Customer'
                                    }
                                </tbody>
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal Customer Address  End*/}

        </>
    )
}

export default Invoices
