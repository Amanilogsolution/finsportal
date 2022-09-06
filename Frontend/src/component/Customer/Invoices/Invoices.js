import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import InvoicePreview from './PreviewInvoice';
import InvoicePreviewWithGst from './PreviewInvoicewithoutGST'
import {
    ActiveCustomer, ActivePaymentTerm,
    // ActiveUser
    SelectedCustomer, ActiveLocationAddress, ShowCustAddress, ActiveItems, Getfincialyearid, Activeunit, ActiveCurrency, InsertInvoice, ActiveAccountMinorCode, InsertInvoiceSub, ActiveChartofAccountname, Updatefinancialcount
} from '../../../api/index'


function Invoices() {
    const [loading, setLoading] = useState(true)

    const [totalValues, setTotalValues] = useState([1])
    const [activecustomer, setActiveCustomer] = useState([])
    const [activepaymentterm, setActivePaymentTerm] = useState([])
    const [cutomerAddress, setCutomerAddress] = useState([])
    const [locationstate, setLocationstate] = useState([])
    // const [activeuser, setActiveUser] = useState([])
    const [custdetail, setCustdetail] = useState({})
    const [gstvalue, setGstvalue] = useState('0')
    const [amount, setAmount] = useState([])
    const [totalgst, setTotalGst] = useState([])
    const [grandtotal, setGrandTotal] = useState(0)

    const [Quantitys, setQuantitys] = useState([])
    const [rate, setRate] = useState([])


    const [totalamout, setTotalamount] = useState(0)
    const [activechargecode, setActiveChargeCode] = useState([])
    const [activeunit, setActiveUnit] = useState([])
    const [unit, setUnit] = useState([])
    const [taxable, setTaxable] = useState([])

    const [invoiceid, setInvoiceid] = useState('')
    const [invoiceprefix, setInvoiceprefix] = useState('')
    const [quantity, setQuantity] = useState(0);
    const [gstvalues, setGstVAlue] = useState([])
    const [Totalamountnew, setTotalAmountNew] = useState([])
    const [currencylist, setCurrencylist] = useState([]);
    const [masterid, setMasterid] = useState([])
    const [locationid, setLocationid] = useState('')
    const [billingaddress, setBillingAddress] = useState('')

    const [Activeaccount, setActiveAccount] = useState([])
    // const [gst, setGst] = useState(0)

    const [custaddress_state, setCustaddstate] = useState()
    const [locationcustaddid, setLocationCustAddid] = useState()
    const [minor, setMinor] = useState([])
    const [glcode, setGlCode] = useState([])
    const [updateinvcount, setUpdateInvCount] = useState()
    const [custAddgst, setCustAddGst] = useState('')
    const [chargecodes, setChargeCode] = useState([])


    const [allInvoiceData, setAllInvoiceData] = useState({
        Activity: "",
        TaxInvoice: "",
        InvoiceData: "",
        GrandTotal: "",
        TotalTaxamount: "",
        Totalamounts: "",
        CGST: "",
        SGST: "",
        IGST: "",
        BillTo: "",
        SupplyTo: "",
        BillToGst: "",
        OriginState: "",
        DestinationState: ""
    })

    const [items, setItems] = useState([])


    useEffect(() => {
        const fetchdata = async () => {


            setTimeout(() => {
                setLoading(true)
                const localdata = localStorage.getItem('gststatus');
                if (localdata == 'false') {
                    document.getElementById('cgstinp').style.display = 'none';
                    document.getElementById('sgstinp').style.display = 'none';
                    document.getElementById('igstinp').style.display = 'none';
                    document.getElementById('tgstinp').style.display = 'none';
                }

            },2000);

            document.getElementById('subtotalbtn').disabled = true;
            document.getElementById('savebtn').disabled = true;
            document.getElementById('postbtn').disabled = true;

            const org = localStorage.getItem('Organisation');
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)
            const result1 = await ActivePaymentTerm(org)
            setActivePaymentTerm(result1)
            // const result2 = await ActiveUser()
            // setActiveUser(result2)
            Todaydate()

            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)

            const ActiveUnit = await Activeunit(org)
            setActiveUnit(ActiveUnit)

            const currencydata = await ActiveCurrency(org)
            setCurrencylist(currencydata)

            const ActiveAccount = await ActiveAccountMinorCode(org)
            setActiveAccount(ActiveAccount)


        }
        fetchdata()
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
        document.getElementById("Invoicedate").value = today;
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

    const handleAccountTerm = (e) => {
        const days = Number(e.target.value)
        Duedate(days)

    }

    const handleChangeItems = async (e) => {
        e.preventDefault();
        const [actgst, chargecode] = e.target.value.split(',')
        setChargeCode([...chargecodes, chargecode])

        const result = await ActiveChartofAccountname(localStorage.getItem('Organisation'), chargecode)
        setMinor([...minor, result.account_name_code])
        setGlCode([...glcode, result.account_sub_name_code])

        if (actgst > 0) {
            setTaxable([...taxable, 'Yes'])
        } else {
            setTaxable([...taxable, 'No'])
        }
        setTotalGst([...totalgst, Number(actgst)])
    }

    const handleChangeUnit = (e) => {
        e.preventDefault();
        document.getElementById('Activity').disabled = true;
        document.getElementById('subtotalbtn').disabled = false;
        setUnit([...unit, e.target.value])
        var sum = 0
        amount.map((item) => sum += item)
        setTotalamount(sum)
        let tolgst = 0
        totalgst.map((item) => tolgst += item)

        setItems([...items, {
            itemsvalue: chargecodes[chargecodes.length - 1], quantity: Quantitys[Quantitys.length - 1], rate: rate[rate.length - 1],
            tax: gstvalues[gstvalues.length - 1], unit: e.target.value,
            amount: amount[amount.length - 1], Totalamount: Totalamountnew[Totalamountnew.length - 1]
        }])
    }

    const handleSubTotal = (e) => {
        e.preventDefault();

        document.getElementById('additembtm').disabled = true;
        document.getElementById('removeitembtm').disabled = true;
        // document.getElementById('gstvalue').disabled=true;
        // document.getElementById('Quality').disabled=true;
        // document.getElementById('Rate').disabled=true;
        // document.getElementById('unitdrop').disabled=true;
        // document.getElementById('subtotalbtn').disabled=true;
        document.getElementById('savebtn').disabled = false;
        document.getElementById('postbtn').disabled = false;
        document.getElementById('previewbtn').disabled = false;

        let location = document.getElementById('locationadd')
        location = location.options[location.selectedIndex].text;
        let custaddrs = document.getElementById('custaddr')
        custaddrs = custaddrs.options[custaddrs.selectedIndex].text;
        const igst = document.getElementById('igstipt').value;
        let cgstamount = 0;
        let sgstamount = 0;
        let igstamount = 0;
        const taxableamt = gstvalue;

        if (igst > 0) {
            igstamount = taxableamt

        } else {
            cgstamount = taxableamt / 2
            sgstamount = taxableamt / 2
        }
        var sum = 0
        Totalamountnew.map((item) => sum += item)
        setGrandTotal(sum)

        setAllInvoiceData({
            ...allInvoiceData, Activity: document.getElementById('Activity').value,
            TaxInvoice: document.getElementById('invoiceid').value, InvoiceData: document.getElementById('Invoicedate').value,
            GrandTotal: sum, TotalTaxamount: document.getElementById('Totalvaluerd').innerHTML,
            CGST: cgstamount, SGST: sgstamount, IGST: igstamount, BillTo: custaddrs, SupplyTo: location, BillToGst: custAddgst,
            Totalamounts: totalamout, OriginState: billingaddress, DestinationState: custaddress_state
        })


        let gsttotal = 0
        gstvalues.map((item) => gsttotal += item)
        setGstvalue(gsttotal)
        let custadd = custaddress_state;
        custadd = custadd.toUpperCase();
        let billadd = billingaddress;
        billadd = billadd.toUpperCase();
        if (custadd === billadd) {
            document.getElementById('cgstipt').value = Math.max(...totalgst) / 2
            document.getElementById('sutgstipt').value = Math.max(...totalgst) / 2
            document.getElementById('igstipt').value = 0;
        }
        else {
            document.getElementById('igstipt').value = Math.max(...totalgst);
            document.getElementById('cgstipt').value = 0
            document.getElementById('sutgstipt').value = 0
        }
    }

    const handleChangerate = (e) => {
        e.preventDefault();
        let Total = quantity * e.target.value
        const [actgst, other] = document.getElementById('gstvalue').value.split(',')
        let gst = Total * actgst / 100

        let grandToatal = Total + Math.round(gst)
        setTimeout(() => {
            setRate([...rate, e.target.value])
            setTotalAmountNew([...Totalamountnew, grandToatal])
            setGstVAlue([...gstvalues, Math.round(gst)])
            setAmount([...amount, Total])
            setQuantitys([...Quantitys, quantity])
        }, 1000)

    }



    const handleAdd = (e) => {
        e.preventDefault();
        setTotalValues([...totalValues, 1])
        var sum = 0
        Totalamountnew.map((item) => sum += item)
        setGrandTotal(sum)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        var Amount = [...amount]
        var gstpop = [...totalgst]
        if (newvalue.length === 1) {
            setTotalValues(newvalue)
            setAmount(Amount)
            setTotalGst(gstpop)
        } else {
            newvalue.pop()
            Amount.pop()
            gstpop.pop()
            setAmount(Amount)
            setTotalGst(gstpop)
            setTotalValues(newvalue)
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

    const handlechnageaddress = async (e) => {
        e.preventDefault();
        const fin_year = await Getfincialyearid(localStorage.getItem('Organisation'))
        const [billadd, id] = e.target.value.split(',')
        setLocationid(id)
        console.log(id)
        const billing_add = billadd;
        setBillingAddress(billadd)
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

    const handleChangeCustomerAdd = (e) => {
        e.preventDefault();
        const [state, address_id, custaddgst] = e.target.value.split(' ')
        setCustaddstate(state)
        setLocationCustAddid(address_id)
        setCustAddGst(custaddgst)
    }

    const handleChangeActivity = async (e) => {
        e.preventDefault();
        let val = document.getElementById('Activity');
        let text = val.options[val.selectedIndex].text;
        let major_code = val.value;

        const result = await ActiveItems(localStorage.getItem('Organisation'), major_code);
        setActiveChargeCode(result)
        if (text === 'WAREHOUSING') {
            document.getElementById('FTdate').style.display = "flex"
        }
        else {
            document.getElementById('FTdate').style.display = "none"
        }
    }


    const handlesavebtn = async (e) => {
        e.preventDefault();
        let invoiceids = "";
        let squ_nos = ""
        const btn_type = e.target.value;
        const fin_year = localStorage.getItem('fin_year')
        if (btn_type === 'save') {
            invoiceids = 'Inv001';
            squ_nos = ""
        }
        else {
            invoiceids = document.getElementById('invoiceid').value;
            squ_nos = invoiceprefix;
        }

        const squ_no = invoiceprefix;
        const Invoicedate = document.getElementById('Invoicedate').value
        const ordernumber = document.getElementById('ordernumber').value
        const invoiceamt = grandtotal;
        const User_id = localStorage.getItem('User_id')
        const periodfrom = document.getElementById('fromdate').value;
        const periodto = document.getElementById('todate').value;
        const custid = document.getElementById('custname').value;
        const billsubtotal = totalamout
        const total_tax = Math.max(...totalgst)
        const remark = document.getElementById('custnotes').value;
        let location = document.getElementById('locationadd')
        location = location.options[location.selectedIndex].text;
        let consignee = document.getElementById('custname')
        consignee = consignee.options[consignee.selectedIndex].text;
        const currency_type = document.getElementById('currency').value
        // const salesperson = document.getElementById('salesperson').value;
        // const subject = document.getElementById('subject').value;
        const paymentterm = document.getElementById('paymentterm').value;
        const Duedate = document.getElementById('Duedate').value;
        const cgst = document.getElementById('cgstipt').value;
        const sgst = document.getElementById('sutgstipt').value;
        const utgst = document.getElementById('sutgstipt').value;
        const igst = document.getElementById('igstipt').value;
        const Major = document.getElementById('Activity').value;
        let billing_code = document.getElementById('Activity')
        billing_code = billing_code.options[billing_code.selectedIndex].text;

        let cgstamount = 0;
        let sgstamount = 0;
        let utgstamount = 0;
        let igstamount = 0;
        const taxableamt = gstvalue;

        if (igst > 0) {
            igstamount = taxableamt

        } else {
            cgstamount = taxableamt / 2
            sgstamount = taxableamt / 2
            utgstamount = taxableamt / 2

        }




        console.log(localStorage.getItem('Organisation'), fin_year, invoiceids, squ_nos, Invoicedate, ordernumber, invoiceamt, User_id, periodfrom, periodto, Major, locationid, custid, billsubtotal,
            total_tax, locationcustaddid, remark, btn_type, location, consignee, masterid, cgst, sgst, utgst, igst, taxableamt, currency_type,
            paymentterm, Duedate, User_id)


        const result = await InsertInvoice(localStorage.getItem('Organisation'), fin_year, invoiceids, squ_nos, Invoicedate, ordernumber, invoiceamt, User_id, periodfrom, periodto, Major, locationid, custid, billsubtotal,
            total_tax, locationcustaddid, remark, btn_type, location, consignee, masterid, cgst, sgst, utgst, igst, taxableamt, currency_type,
            paymentterm, Duedate, User_id)

        const invcount = await Updatefinancialcount(localStorage.getItem('Organisation'), 'invoice_count', updateinvcount)

        amount.map(async (amt, index) => {
            console.log(amt, Quantitys[index], rate[index], unit[index], minor[index], glcode[index])
            const result1 = await InsertInvoiceSub(localStorage.getItem('Organisation'), fin_year, invoiceids, Major, minor[index], glcode[index], billing_code, Quantitys[index], rate[index], unit[index], amt, consignee, custaddress_state, custid, locationcustaddid, taxable[index], cgst, sgst, utgst, igst, cgstamount, sgstamount, utgstamount, igstamount, User_id)

        })
        if (result) {
            alert('Added')
            window.location.reload();
        }

    }

    return (
        <>
            <div>

                <div className="wrapper">
                    {/* <div className="preloader flex-column justify-content-center align-items-center">
                                <div className="spinner-border" role="status"> </div>
                            </div> */}
                    <Header />
                    {/* <Menu /> */}

                    <div className="content-wrapper" >
                        <div className="container-fluid" >

                            <div className="row pt-3" >
                                <div className="col">
                                    {

                                        loading ?
                                            (
                                                <div className="card" >
                                                    <article
                                                        className="card-body"
                                                    >
                                                        <h3 className="text-left"> New Invoice</h3>
                                                        <br />

                                                        <form autoComplete="off">
                                                            <div className="form-row mt-2">
                                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span style={{ color: "red" }}>*</span> </label>
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
                                                                    {/* <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button> */}
                                                                </div>
                                                            </div>


                                                            <div className="form-row mt-2">
                                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Address <span style={{ color: "red" }}>*</span> </label>
                                                                <div className="d-flex col-md-4">
                                                                    <select
                                                                        id="custaddr"
                                                                        className="form-control"
                                                                        onChange={handleChangeCustomerAdd}
                                                                    >
                                                                        <option value='' hidden>Select Address</option>
                                                                        {
                                                                            cutomerAddress.map((items, index) => (
                                                                                <option key={index} value={`${items.billing_address_state} ${items.cust_addressid} ${items.gst_no}`}>{items.billing_address_attention}</option>
                                                                            ))
                                                                        }

                                                                    </select>
                                                                    {/* <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button> */}
                                                                </div>
                                                            </div>

                                                            <div className="form-row mt-2">
                                                                <label className="col-md-2 col-form-label font-weight-normal" >Billing Address<span style={{ color: "red" }}>*</span> </label>
                                                                <div className="d-flex col-md-4">
                                                                    <select
                                                                        id="locationadd"
                                                                        className="form-control"
                                                                        onChange={handlechnageaddress}>
                                                                        <option value='' hidden>Select Address</option>
                                                                        {
                                                                            locationstate.map((item, index) =>
                                                                                <option key={index} value={`${item.location_state},${item.location_id}`}>{item.location_add1}</option>
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="form-row mt-3">
                                                                <label className="col-md-2 col-form-label font-weight-normal" >Invoice <span style={{ color: "red" }}>*</span> </label>
                                                                <div className="d-flex col-md">
                                                                    <input type="text" className="form-control col-md-5" id="invoiceid" value={invoiceid} disabled />

                                                                </div>
                                                            </div>

                                                            <div className="form-row mt-3">
                                                                <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                                <div className="d-flex col-md">
                                                                    <input type="text" className="form-control col-md-5" id="ordernumber" placeholder='Enter the order number' />
                                                                </div>
                                                            </div>

                                                            <div className="form-row mt-3">

                                                                <div className="d-flex col-md-3">
                                                                    <label className="col-md-6 col-form-label font-weight-normal" >Invoice Date<span style={{ color: "red" }}>*</span> </label>

                                                                    <input type="date" className="form-control col-md-6" id="Invoicedate" disabled />
                                                                </div>


                                                                <div className="d-flex col-md-5">
                                                                    <label className="col-md-4 text-center col-form-label font-weight-normal" >Terms</label>

                                                                    <select
                                                                        id="paymentterm"
                                                                        className="col-md-6  mr-0 form-control"
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
                                                                    <input type="date" className="form-control col-md-6" id="Duedate" disabled />

                                                                </div>
                                                            </div>



                                                            {/* 
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 " > </label>
                                                <div className="d-flex col-md-4">
                                                    <small>To create transaction dated before 01/07/2017</small>
                                                </div>
                                            </div> */}



                                                            {/* <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Contact Person </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="salesperson" className="form-control">
                                                        <option value={custdetail.contact_person_name} hidden>{custdetail.contact_person_name}</option>
                                                        {
                                                            activeuser.map((items) => (
                                                                <option key={items.employee_name} value={items.employee_name}>{items.employee_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div> */}
                                                            {/* <hr /> */}

                                                            {/* <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Subject </label>
                                                <div className="d-flex col-md">
                                                    <textarea className="form-control col-md-7" id="subject" rows='4' placeholder="Let your customer know what this invoice is for" style={{ resize: 'none' }}></textarea>

                                                </div>
                                            </div> */}
                                                            <hr />
                                                            <div className="form-row mt-2">
                                                                <label className="col-md-2 col-form-label font-weight-normal" >Activity <span style={{ color: "red" }}>*</span></label>
                                                                <div className="d-flex col-md-4">
                                                                    <select id="Activity" className="form-control" onChange={handleChangeActivity}>
                                                                        <option value='' hidden>Select Activity</option>
                                                                        {
                                                                            Activeaccount.map((items, index) => (
                                                                                <option key={index} value={items.account_type_code}>{items.account_name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-row mt-3" id='FTdate' style={{ display: "none" }}>
                                                                <div className="d-flex col-md-3">
                                                                    <label className="col-md-6 col-form-label font-weight-normal" htmlFor='fromdate'>From Date </label>
                                                                    <input type="date" className="form-control col-md-6" id="fromdate" />
                                                                </div>
                                                                <div className="d-flex col-md-5">
                                                                    <label className="col-md-4 text-center col-form-label font-weight-normal" htmlFor='todate'>To Date </label>
                                                                    <input type="date" className="form-control col-md-6" id="todate" />
                                                                </div>
                                                            </div>
                                                            {/* <hr /> */}
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
                                                                    {
                                                                        totalValues.map((element, index) => (
                                                                            <tr key={index}>
                                                                                <div id='trdiv'>
                                                                                    <td className="col-md-2 pl-0 pr-0">
                                                                                        <select onChange={handleChangeItems} id="gstvalue" className="form-control col-md-">
                                                                                            <option value='' hidden > Select item</option>
                                                                                            {
                                                                                                activechargecode.map((item, index) => (
                                                                                                    <option key={index} value={`${item.gst_rate},${item.item_name}`} >{item.item_name}</option>
                                                                                                ))
                                                                                            }
                                                                                        </select>
                                                                                    </td>
                                                                                </div>
                                                                                <td className='col-md-2 pl-0 pr-0'>
                                                                                    <input className="form-control col-md" style={{ border: "none" }} type="number" id="Quality" placeholder="0" onChange={(e) => {
                                                                                        const quantity = e.target.value
                                                                                       
                                                                                        setQuantity(quantity)
                                                                                    }} /></td>

                                                                                <td className='col-md-2 pl-0 pr-0'>
                                                                                    <input className="form-control col-md" style={{ border: "none" }} type="number" id="Rate" placeholder="0"
                                                                                        onChange={handleChangerate} />
                                                                                </td>
                                                                                <td id="gst" className='col-md-1'>{gstvalues[index]}</td>

                                                                                <td className='pl-0 pr-0 col-md-2'>
                                                                                    <select onChange={handleChangeUnit} className="form-control col-md" id='unitdrop'>
                                                                                        <option value='' hidden> Select Unit</option>
                                                                                        {
                                                                                            activeunit.map((item, index) => (
                                                                                                <option key={index} value={item.unit_name}>{item.unit_name}</option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                </td>
                                                                                <td id="amountvalue">{amount[index] ? amount[index] : 0}</td>
                                                                                <td id="Totalsum">{Totalamountnew[index] ? Totalamountnew[index] : 0}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <button className="btn btn-primary" onClick={handleAdd} id='additembtm'>Add Item</button>   &nbsp;
                                                            <button className="btn btn-danger" onClick={handleRemove} id='removeitembtm'>Remove</button>

                                                            <hr />

                                                            <div style={{ display: "flex" }}>
                                                                <div style={{ width: "40%" }}>
                                                                    <div className="form mt-3">
                                                                        <label className="col-md-7 col-form-label font-weight-normal" >Remarks :-</label>
                                                                        <div className="d-flex col-md">
                                                                            <textarea type="text" className="form-control " rows="4" id="custnotes" placeholder="Looking forward for your bussiness " style={{ resize: 'none' }}></textarea>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                                                    <table style={{ width: "100%" }}>
                                                                        <thead></thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><button className="btn btn-primary" onClick={handleSubTotal} id='subtotalbtn'>Sub Total</button></td>
                                                                                <td></td>
                                                                                <td>{totalamout}</td>
                                                                            </tr>
                                                                           
                                                                            <tr id='cgstinp' >
                                                                                <td>CGST</td>
                                                                                <td>
                                                                                    <div className="input-group mb-1" >
                                                                                        <input type="number" className="form-control col-md-5" id='cgstipt'
                                                                                            // onChange={handlechangegst} 
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
                                                                                        <input type="number" className="form-control col-md-5" id='gstipt ' value={Math.max(...totalgst)} disabled />
                                                                                        <div className="input-group-append">
                                                                                            <span className="input-group-text">%</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td id="Totalvaluerd"> {gstvalue}</td>
                                                                            </tr>
                                                                        
                                                                            <tr>
                                                                                <td>
                                                                                    Currency
                                                                                </td>
                                                                                <td>
                                                                                    <div className="input-group mb-1">
                                                                                        <select className="form-control col-md-5" id="currency" >
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
                                                                                <td id="grandtotaltd">{grandtotal}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                                                            { 
                                                        localStorage.getItem('gststatus') == true?
                                                            <InvoicePreview Allinvoicedata={allInvoiceData} Allitems={items} />
                                                            :
                                                            <InvoicePreviewWithGst Allinvoicedata={allInvoiceData} Allitems={items} />
}

                                                            <div className="form-group">
                                                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                                                <div className="col-md-20" style={{ width: "100%" }} >
                                                                    <button id="savebtn" type='submit' name="save" className="btn btn-danger" onClick={handlesavebtn} value='save'>
                                                                        Save
                                                                    </button>
                                                                    <button id="postbtn" name="save" type='submit' className="btn btn-danger ml-2" onClick={handlesavebtn} value='post' >
                                                                        Post
                                                                    </button>
                                                                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
                                                                        name="clear" className="btn ml-2 btn btn-primary">Cancel </button>
                                                                    <button id='previewbtn' type="button" onClick={() => console.log(items)} className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" disabled>Preview Invoice </button>

                                                                </div>
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
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Invoices
