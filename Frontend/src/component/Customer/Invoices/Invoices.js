import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import InvoicePreview from './PreviewInvoice';
import InvoicePreviewWithGst from './PreviewInvoicewithoutGST'
import {
    ActiveCustomer, ActivePaymentTerm,
    // ActiveUser
    SelectedCustomer, ActiveLocationAddress, ShowCustAddress, ActiveItems, Getfincialyearid, Activeunit, ActiveCurrency, InsertInvoice, ActiveAccountMinorCode, InsertInvoiceSub, ActiveChartofAccountname, Updatefinancialcount
} from '../../../api/index'
import './invoice.css'

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

    const [index, setIndex] = useState()
    const [billingAddressLocation, setBillingAddressLocation] = useState([])
    const [custAddressLocation, setCustAddressLocation] = useState([])

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

            }, 2000);

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

    const handleChangeItems = async (value, index) => {
        const [actgst, chargecode, glcodes] = value.split(',')
        chargecodes[index] = chargecode
        glcode[index] = glcodes
        if (actgst > 0) {
            setTaxable([...taxable, 'Yes'])
        } else {
            setTaxable([...taxable, 'No'])
        }
        setTotalGst([...totalgst, Number(actgst)])
        totalgst[index] = actgst
    }

    const handleChangeUnit = (value, index) => {
        // e.preventDefault();
        document.getElementById('Activity').disabled = true;
        document.getElementById('subtotalbtn').disabled = false;
        // setUnit([...unit, value])
        unit[index] = value;
        var sum = 0
        amount.map((item) => sum += item)
        setTotalamount(sum)
        let tolgst = 0
        totalgst.map((item) => tolgst += item)

        console.log(gstvalues[index])
        items[index] = {
            itemsvalue: chargecodes[chargecodes.length - 1], quantity: Quantitys[index], rate: rate[index],
            tax: gstvalues[index], unit: value,
            amount: amount[index], Totalamount: Totalamountnew[index]
        }
    }

    const handleSubTotal = (e) => {
        console.log(amount)
        e.preventDefault();
        document.getElementById('additembtm').disabled = true;
        document.getElementById('removeitembtm').disabled = true;
        document.getElementById('savebtn').disabled = false;
        document.getElementById('postbtn').disabled = false;
        document.getElementById('previewbtn').disabled = false;
        // let location = document.getElementById('locationadd')
        // location = location.options[location.selectedIndex].text;
        let location = billingAddressLocation[0] + ' , ' + billingAddressLocation[1] + ' , ' + billingAddressLocation[2];

        // let custaddrs = document.getElementById('custaddr')
        // custaddrs = custaddrs.options[custaddrs.selectedIndex].text;
        let custaddrs = custAddressLocation[0] + ' , ' + custAddressLocation[1] + ' , ' + custAddressLocation[2];

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

        setAllInvoiceData({
            ...allInvoiceData, Activity: document.getElementById('Activity').value,
            TaxInvoice: document.getElementById('invoiceid').value, InvoiceData: document.getElementById('Invoicedate').value,
            GrandTotal: sum, TotalTaxamount: document.getElementById('Totalvaluerd').innerHTML,
            CGST: cgstamount, SGST: sgstamount, IGST: igstamount, BillTo: custaddrs, SupplyTo: location, BillToGst: custAddgst,
            Totalamounts: totalamout, OriginState: billingaddress, DestinationState: custaddress_state
        })
    }

    const handleChangerate = (value, indexes) => {
        rate[indexes] = value;
        let Total = Quantitys[indexes] * value
        const [actgst, other] = document.getElementById('gstvalue').value.split(',')

        let gst = Total * totalgst[index] / 100

        let grandToatal = Total + Math.round(gst)
        setTimeout(() => {
            Totalamountnew[indexes] = grandToatal
            gstvalues[indexes] = Math.round(gst)
            document.getElementById(`amount${indexes}`).value = Total
            document.getElementById(`TotalAmount${indexes}`).value = grandToatal
            amount[indexes] = Total
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

    const handlechnageaddress = async (add, id) => {
        // e.preventDefault();
        // setBillingAddressLocation(e.target.value)
        const fin_year = await Getfincialyearid(localStorage.getItem('Organisation'))
        // const [billadd, id] = e.target.value.split(',')
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

    const handleChangeCustomerAdd = (state, address_id, custaddgst) => {
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
        console.log(items)
        // document.getElementById('savebtn').disabled = true;
        // document.getElementById('postbtn').disabled = true;
        let invoiceids = "";
        let squ_nos = ""
        const btn_type = e.target.value;
        const fin_year = localStorage.getItem('fin_year')
        if (btn_type === 'save') {
            invoiceids = 'Random' + Math.floor(Math.random() * 10000) + 1;
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

        // let location = document.getElementById('locationadd')
        // location = location.options[location.selectedIndex].text;
        let location = billingAddressLocation[0] + ' , ' + billingAddressLocation[1] + ' , ' + billingAddressLocation[2];

        let consignee = document.getElementById('custname')
        consignee = consignee.options[consignee.selectedIndex].text;
        const currency_type = document.getElementById('currency').value
        const paymentterm = document.getElementById('paymentterm').value;
        const Duedate = document.getElementById('Duedate').value;
        const cgst = document.getElementById('cgstipt').value;
        const sgst = document.getElementById('sutgstipt').value;
        const utgst = document.getElementById('sutgstipt').value;
        const igst = document.getElementById('igstipt').value;
        const Major = document.getElementById('Activity').value;
        let billing_code = document.getElementById('Activity')
        billing_code = billing_code.options[billing_code.selectedIndex].text;

        // let custaddrs = document.getElementById('custaddr')
        // custaddrs = custaddrs.options[custaddrs.selectedIndex].text;
        let custaddrs = custAddressLocation[0] + ' , ' + custAddressLocation[1] + ' , ' + custAddressLocation[2];

        const invoice_destination = custaddress_state;
        const invoice_origin = billingaddress;

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

        // Insert Data
        if (!custid || !billsubtotal || !consignee) {
            alert('Please Select Customer');
        }
        else {
            const result = await InsertInvoice(localStorage.getItem('Organisation'), fin_year, invoiceids,
                squ_nos, Invoicedate, ordernumber, invoiceamt, User_id, periodfrom, periodto, Major, locationid, custid, billsubtotal,
                total_tax, locationcustaddid, remark, btn_type, location, consignee, masterid, cgst, sgst, utgst, igst, taxableamt, currency_type,
                paymentterm, Duedate, User_id, custaddrs, custAddgst, invoice_destination, invoice_origin)


            if (result === 'Added') {
                amount.map(async (amt, index) => {
                    const result1 = await InsertInvoiceSub(localStorage.getItem('Organisation'), fin_year, invoiceids, Major, chargecodes[index], glcode[index], billing_code, Quantitys[index], rate[index], unit[index], amt, consignee, custaddress_state, custid, locationcustaddid, taxable[index], cgst, sgst, utgst, igst, cgstamount, sgstamount, utgstamount, igstamount, items[index].tax, User_id)
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
                {/* <div className="preloader flex-column justify-content-center align-items-center">
                                <div className="spinner-border" role="status"> </div>
                            </div> */}
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
                                                            onChange={handleCustname}>
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
                                                        {/* <select
                                                            id="custaddr"
                                                            className="form-control"
                                                            onChange={handleChangeCustomerAdd}>

                                                            <option value='' hidden>Select Address</option>
                                                            {
                                                                cutomerAddress.map((items, index) => (
                                                                    <option key={index} value={`${items.billing_address_state} ${items.cust_addressid} ${items.gst_no}`}>{items.billing_address_attention},{items.billing_address_city},{items.billing_address_country}</option>
                                                                ))
                                                            }

                                                        </select> */}


                                                        <button type="button" className="btn border" data-toggle="modal" data-target="#custAddnmodal">
                                                            {
                                                                custAddressLocation.length > 0 ? custAddressLocation : 'Select Customer Address Location'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Billing Address<span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md-4">
                                                        {/* <select
                                                            id="locationadd"
                                                            className="form-control"
                                                            onChange={handlechnageaddress}>
                                                            <option value='' hidden>Select Address</option>
                                                            {
                                                                locationstate.map((item, index) =>
                                                                    <option key={index} value={`${item.location_state},${item.location_id}`}>{item.location_add1},{item.location_city},{item.location_country}</option>
                                                                )
                                                            }
                                                        </select> */}



                                                        <button type="button" className="btn border" data-toggle="modal" data-target="#locationmodal">
                                                            {
                                                                billingAddressLocation.length > 0 ? billingAddressLocation : 'Select Billing Address Location'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Invoice <span className='text-danger'>*</span> </label>
                                                    <div className="d-flex col-md">
                                                        <input type="text" className={`form-control col-md-5  cursor-notallow`} id="invoiceid" value={invoiceid} disabled />

                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                    <div className="d-flex col-md">
                                                        <input type="text" className={`form-control col-md-5 `} id="ordernumber" placeholder='Enter the order number' />
                                                    </div>
                                                </div>

                                                <div className="form-row mt-3">

                                                    <div className="d-flex col-md-3">
                                                        <label className="col-md-6 col-form-label font-weight-normal" >Invoice Date<span className='text-danger'>*</span> </label>

                                                        <input type="date" className={`form-control col-md-6  cursor-notallow`} id="Invoicedate" disabled />
                                                    </div>


                                                    <div className="d-flex col-md-5">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" >Terms</label>

                                                        <select
                                                            id="paymentterm"
                                                            className={`col-md-6  mr-0 form-control `}
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
                                                        <input type="date" className={`form-control col-md-6  cursor-notallow`} id="Duedate" disabled />
                                                    </div>
                                                </div>

                                                <hr />
                                                <div className="form-row mt-2">
                                                    <label className="col-md-2 col-form-label font-weight-normal" >Activity <span className='text-danger'>*</span></label>
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
                                                        <input type="date" className={`form-control col-md-6 `} id="fromdate" />
                                                    </div>
                                                    <div className="d-flex col-md-5">
                                                        <label className="col-md-4 text-center col-form-label font-weight-normal" htmlFor='todate'>To Date </label>
                                                        <input type="date" className={`form-control col-md-6 `} id="todate" />
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
                                                        {
                                                            totalValues.map((element, index) => (
                                                                <tr key={index}>
                                                                    <div id='trdiv'>
                                                                        <td className="col-md-2 pl-0 pr-0">
                                                                            <select onChange={(e) => { handleChangeItems(e.target.value, index) }} id="gstvalue" className={`form-control col-md-9 `}>
                                                                                <option value='' hidden > Select item</option>
                                                                                {
                                                                                    activechargecode.map((item, index) => (
                                                                                        <option key={index} value={`${item.gst_rate},${item.item_name},${item.chart_of_acct_id}`} >{item.item_name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </td>
                                                                    </div>
                                                                    <td className='col-md-2 pl-0 pr-0'>
                                                                        <input className={`form-control col-md-10 `} type="number" id="Quality" placeholder="0" onChange={(e) => {
                                                                            const quantity = e.target.value
                                                                            setIndex(index)
                                                                            Quantitys[index] = quantity
                                                                        }} /></td>

                                                                    <td className='col-md-2 pl-0 pr-0'>
                                                                        <input className="form-control col-md-10" type="number" id="Rate" placeholder="0"
                                                                            onChange={(e) => { handleChangerate(e.target.value, index) }} />
                                                                    </td>
                                                                    <td id="gst" className='col-md-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" defaultValue={gstvalues[index]} disabled /></td>

                                                                    <td className='pl-0 pr-0 col-md-2'>
                                                                        <select onChange={(e) => { handleChangeUnit(e.target.value, index) }} className={`form-control col-md-10 `} id='unitdrop'>
                                                                            <option value='' hidden> Select Unit</option>
                                                                            {
                                                                                activeunit.map((item, index) => (
                                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td id="amountvalue" className='col-md-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`amount${index}`} disabled />
                                                                    </td>
                                                                    <td id="Totalsum" className='col-md-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`TotalAmount${index}`} disabled />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                <button className="btn btn-primary" onClick={handleAdd} id='additembtm'>Add Item</button>   &nbsp;
                                                <button className="btn btn-danger" onClick={handleRemove} id='removeitembtm'>Remove</button>
                                                <hr />
                                                <div className='d-flex'>
                                                    <div style={{ width: "40%" }}>
                                                        <div className="form mt-3">
                                                            <label className="col-md-7 col-form-label font-weight-normal" >Remarks :-</label>
                                                            <div className="d-flex col-md">
                                                                <textarea type="text" className={`form-control col-md-10 `} rows="4" id="custnotes" placeholder="Looking forward for your bussiness " style={{ resize: 'none' }}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`rounded py-1 px-2`} style={{ width: "55%", background: '#eee' }}>
                                                        <table className='w-100'>
                                                            <tbody>
                                                                <tr>
                                                                    <td><button className="btn btn-primary" onClick={handleSubTotal} id='subtotalbtn'>Sub Total</button></td>
                                                                    <td></td>
                                                                    <td>{totalamout}</td>
                                                                </tr>

                                                                <tr id='cgstinp'>
                                                                    <td>CGST</td>
                                                                    <td>
                                                                        <div className="input-group mb-1">
                                                                            <input type="number" className={`form-control col-md-5  cursor-notallow`} id='cgstipt' disabled />
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
                                                                            <input type="number" className={`form-control col-md-5  cursor-notallow`} id='sutgstipt' disabled />
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
                                                                            <input type="number" className={`form-control col-md-5 gstinpt  cursor-notallow`} id='igstipt' disabled />
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
                                                                            <input type="number" className={`form-control col-md-5  cursor-notallow`} id='gstipt ' value={Math.max(...totalgst)} disabled />
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
                                                                            <select className={`form-control col-md-5 `} id="currency" >
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
                                                    localStorage.getItem('gststatus') == true ?
                                                        <InvoicePreviewWithGst Allinvoicedata={allInvoiceData} Allitems={items} /> :
                                                        <InvoicePreview Allinvoicedata={allInvoiceData} Allitems={items} />


                                                }

                                                <div className="form-group mt-3">
                                                    <button id="savebtn" type='submit' name="save" className="btn btn-danger" onClick={handlesavebtn} value='save'>
                                                        Save
                                                    </button>
                                                    <button id="postbtn" name="save" type='submit' className="btn btn-danger mx-2" onClick={handlesavebtn} value='post' >
                                                        Post
                                                    </button>
                                                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
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
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body overflow-auto px-5" style={{ maxHeight: '60vh' }}>
                            <ul>
                                {
                                    locationstate.map((item, index) =>
                                        <li key={index} className="cursor-pointer billingadd-li" data-dismiss="modal"
                                            onClick={() => { handlechnageaddress(item.location_state, item.location_id); setBillingAddressLocation([item.location_add1, item.location_city, item.location_country]) }}
                                            value={`${item.location_state},${item.location_id}`}>{item.location_add1},{item.location_city},{item.location_country}</li>
                                    )
                                }
                            </ul>
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
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body overflow-auto px-5" style={{ maxHeight: '60vh' }}>
                            <ul>
                                {
                                    cutomerAddress.length > 0 ?
                                        cutomerAddress.map((items, index) => (
                                            <li key={index} className="cursor-pointer billingadd-li" data-dismiss="modal"
                                                onClick={() => {
                                                    handleChangeCustomerAdd(items.billing_address_state, items.cust_addressid, items.gst_no);
                                                    setCustAddressLocation([items.billing_address_attention, items.billing_address_city, items.billing_address_country])
                                                }}
                                                value={`${items.billing_address_state} ${items.cust_addressid} ${items.gst_no}`}>
                                                {items.billing_address_attention},{items.billing_address_city},{items.billing_address_country}</li>
                                        ))
                                        : 'Select Customer'
                                }
                            </ul>
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
