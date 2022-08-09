import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, ActivePaymentTerm, ActiveUser, SelectedCustomer, ActiveLocationAddress, ShowCustAddress, ActiveChargeCode, Getfincialyearid, Activeunit, ActiveCurrency } from '../../../api/index'

function Invoices() {
    const [totalValues, setTotalValues] = useState([1])
    const [activecustomer, setActiveCustomer] = useState([])
    const [activepaymentterm, setActivePaymentTerm] = useState([])
    const [cutomerAddress, setCutomerAddress] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [activeuser, setActiveUser] = useState([])
    const [custdetail, setCustdetail] = useState({})
    const [gstvalue, setGstvalue] = useState('0.00')
    const [amount, setAmount] = useState([])
    const [totalgst, setTotalGst] = useState([])
    const [grandtotal, setGrandTotal] = useState(0)


    const [totalamout, setTotalamount] = useState(0)
    const [activechargecode, setActiveChargeCode] = useState([])
    const [activeunit, setActiveUnit] = useState([])
    const [unit, setUnit] = useState([])

    const [invoiceid, setInvoiceid] = useState('')
    const [invoiceprefix,setInvoiceprefix]=useState('')
    const [quantity, setQuantity] = useState(0);
    const [gstvalues, setGstVAlue] = useState([])
    const [Totalamountnew, setTotalAmountNew] = useState([])
    const [currencylist, setCurrencylist] = useState([]);
    const [masterid,setMasterid] = useState([])
    const [locationid,setLocationid]= useState('')

   



    const [gst, setGst] = useState(0)

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)
            const result1 = await ActivePaymentTerm(org)
            setActivePaymentTerm(result1)
            const result2 = await ActiveUser()
            setActiveUser(result2)
            Todaydate()
            const activechargecode = await ActiveChargeCode(org)
            setActiveChargeCode(activechargecode)

            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)
            console.log(locatonstateres)

            const ActiveUnit = await Activeunit(org)
            setActiveUnit(ActiveUnit)

            const currencydata = await ActiveCurrency(org)
            // console.log(currencydata)
            setCurrencylist(currencydata)

        }
        fetchdata()
    }, [])

    const Todaydate = () => {
        var date = new Date();
        var myDate = new Date(new Date().getTime() + (180 * 24 * 60 * 60 * 1000));
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

    // const handleChange = (e) => {
    //     var desktop = e.target.value
    //     if (desktop == 'Desktop') {
    //         document.getElementById("Upload").click()
    //     }
    // }

    const handleChangeItems = (e) => {
        // console.log(e.target.value)
        setTotalGst([...totalgst, Number(e.target.value)])
    }

    const handleChangeUnit = (e) => {

        setUnit([...unit, e.target.value])
        var sum = 0
        amount.map((item) => sum += item)
        // setGrandTotal(sum)

        let tolgst = 0
        totalgst.map((item) => tolgst += item)


    }

    const handleSubTotal = (e) => {
        e.preventDefault();
        var sum = 0
        Totalamountnew.map((item) => sum += item)
        setGrandTotal(sum)

        let gsttotal = 0
       
        gstvalues.map((item) => gsttotal += item)
        setGstvalue(gsttotal)

        let custadd= document.getElementById('custaddr').value;
        custadd =custadd.toUpperCase();
        let billadd= document.getElementById('locationadd').value;
        billadd= billadd.toUpperCase();
       

        if(custadd === billadd){
          document.getElementById('cgstipt').value=Math.max(...totalgst)/2
          document.getElementById('sutgstipt').value=Math.max(...totalgst)/2
          document.getElementById('igstipt').value=0;
        }
        else{
            document.getElementById('igstipt').value=totalgst;
            document.getElementById('cgstipt').value=0
            document.getElementById('sutgstipt').value=0
        }
    }

    const handleChangerate = (e) => {
        let Total = quantity * e.target.value
        let gst = Total * document.getElementById('gstvalue').value / 100
        let grandToatal = Total + gst
        // console.log(typeof (Total))
        setTimeout(() => {
            setTotalAmountNew([...Totalamountnew, grandToatal])
            setGstVAlue([...gstvalues, gst])
            setAmount([...amount, Total])
            // console.log(amount)
        }, 1000)

    }

    // const handleChangeQuantity = (e) => {
    //     e.preventDefault()
    //     console.log(e.target.value)
    // }

    // const handleBlur = () => {
    //     const quality = document.getElementById('Quality').value
    //     const rate = document.getElementById('Rate').value
    //     console.log(quality, rate)
    //     console.log(quality * rate)
    //     setAmount(quality * rate)
    // }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
        var sum = 0
        Totalamountnew.map((item) => sum += item)
        setGrandTotal(sum)


        // setAmount(0)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        var Amount = [...amount]
        var gstpop = [...totalgst]
        // console.log(newvalue.length)
        if (newvalue.length == 1) {
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


    // const handledescount = (e) => {
    //     e.preventDefault();
    //     document.getElementById('discountipt').style.border = 'none';
    //     document.getElementById('discountipt').style.boxShadow = 'none';
    //     console.log(e.target.value)
    //     const value = e.target.value;
    //     const symb = document.getElementById('discountsyb').value;
    //     setDescount(value)
    //     if (symb === '%') {
    //         if (value > 100) {
    //             document.getElementById('discountipt').style.border = '1px solid red';
    //             document.getElementById('discountipt').style.boxShadow = '1px 1px 5px red';
    //             console.log(symb)
    //             setDescount('-0.00')
    //         }


    //     }
    // }

    // const handlechangegst = (e) => {
    //     e.preventDefault();

    //     const cgst = document.getElementById('cgstipt').value;
    //     const sutgst = document.getElementById('sutgstipt').value;
    //     // const utgst = document.getElementById('utgstipt').value;
    //     const igst = document.getElementById('igstipt').value;

    //     const totalgst = Number(cgst) + Number(sutgst) + Number(igst);

    //     if (totalgst > 100) {
    //         document.getElementById('gstipt').style.border = '1px solid red';
    //         document.getElementById('gstipt').style.boxShadow = '1px 1px 5px red'
    //         setGst(0)
    //     }
    //     else {
    //         setGst(totalgst)
    //         const totalgstvalue = grandtotal * (totalgst / 100)
    //         console.log(grandtotal)
    //         console.log(totalgstvalue)
    //         setGstvalue(totalgstvalue)
    //         const tamount = grandtotal + totalgstvalue;
    //         setTotalamount(tamount)
    //     }
    // }

    // const handleadjust = (e) => {
    //     e.preventDefault();
    //     const adjustment = document.getElementById('adjust').value
    //     document.getElementById('igstipt').disabled = 'true'
    //     document.getElementById('cgstipt').disabled = 'true'
    //     document.getElementById('sutgstipt').disabled = 'true'

    //     if (adjustment > grandtotal) {
    //         document.getElementById('adjust').style.border = '1px solid red';
    //         document.getElementById('adjust').style.boxShadow = '1px 1px 5px red'
    //     }
    //     else {
    //         document.getElementById('adjust').style.border = 'none';
    //         document.getElementById('adjust').style.boxShadow = 'none'
    //         setAdjust(adjustment)

    //         const tamount = grandtotal + gstvalue - adjustment
    //         setTotalamount(tamount)
    //     }
    // }


    const handleCustname = async (e) => {
        const cust_id = e.target.value;
        const cust_detail = await SelectedCustomer(localStorage.getItem('Organisation'), cust_id)
        setCustdetail(cust_detail)
        setMasterid(cust_detail.mast_id)
        console.log(cust_detail)

        Duedate(45)


        const cust_add = await ShowCustAddress(cust_id, localStorage.getItem("Organisation"))
        setCutomerAddress(cust_add)
        
    }

    const handlechnageaddress = async (e) => {
        const fin_year = await Getfincialyearid(localStorage.getItem('Organisation'))
        // console.log(fin_year)

        const billing_add = e.target.value;
        const cust_add = document.getElementById('custaddr').value;



        const invoicepefix = fin_year[0].invoice_ser;
        let invoicecitypre = (billing_add.substring(0, 3));
        invoicecitypre = invoicecitypre.toUpperCase();
        let invoicecount = Number(fin_year[0].invoice_count);
        invoicecount = invoicecount + 1;
        invoicecount = String(invoicecount)
        const invoiceidauto = invoicecount.padStart(5, '0')
        const invoiceid = invoicepefix + '-' + invoicecitypre + invoiceidauto;
        // console.log(invoiceid)
        setInvoiceprefix(invoicepefix)
        setInvoiceid(invoiceid);


        // if(cust_add === billing_add){
        //     document.getElementById('igstipt').disabled='true'
        //     document.getElementById('sutgstipt').disabled=false
        // }
        // else{
        //     document.getElementById('igstipt').disabled=false
        //     document.getElementById('sutgstipt').disabled='true'
        // }
    }


    const handlesavebtn =(e)=>{
        e.preventDefault();
        let invoiceids ="";
        let squ_nos=""
        const btn_type=e.target.value;
        console.log(btn_type)
        const fin_year= localStorage.getItem('fin_year')
        if(btn_type=='save'){
            console.log('if')
             invoiceids= document.getElementById('invoiceid').value;
              squ_nos= invoiceprefix;

            console.log(invoiceids)
        }else{
            console.log("else")
             invoiceids= 'Inv001';
             squ_nos=""
            console.log(invoiceids)


        }
        // const s= document.getElementById('s').value;
        const squ_no= invoiceprefix;
        const Invoicedate= document.getElementById('Invoicedate').value
        const ordernumber= document.getElementById('ordernumber').value
        const invoiceamt= grandtotal;
        const User_id= localStorage.getItem('User_id')
        const periodfrom= document.getElementById('fromdate').value;
        const periodto= document.getElementById('todate').value;
        const custid= document.getElementById('custname').value;
        const billsubtotal=totalamout
        const total_tax= Math.max(...totalgst)
        const remark= document.getElementById('custnotes').value;
        let location= document.getElementById('locationadd')
         location = location.options[location.selectedIndex].text;
        let  consignee= document.getElementById('custname')
        consignee = consignee.options[consignee.selectedIndex].text;

        
        const currency_type= document.getElementById('currency').value
        const salesperson =document.getElementById('salesperson').value;
        const subject =document.getElementById('subject').value;
        const paymentterm= document.getElementById('paymentterm').value;
        const Duedate =document.getElementById('Duedate').value;
        const cgst =document.getElementById('cgstipt').value;
        const sgst =document.getElementById('sutgstipt').value;
        const utgst =document.getElementById('sutgstipt').value;
        const igst =document.getElementById('igstipt').value;
        const taxableamt= gstvalue;

        console.log(fin_year,invoiceids,squ_nos,Invoicedate,ordernumber,invoiceamt,User_id,periodfrom,periodto,custid,billsubtotal,
            total_tax,remark,btn_type,location,consignee,masterid,cgst,sgst,utgst,igst,taxableamt,currency_type,salesperson,subject,paymentterm,Duedate)
    }

    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <Menu />

                <div className="content-wrapper">
                    <div className="container-fluid">

                        <div className="row pt-3" >
                            <div className="col">
                                <div className="card">
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
                                                <label className="col-md-2 col-form-label font-weight-normal" >Billing Address <span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        id="locationadd"
                                                        className="form-control"
                                                        onChange={handlechnageaddress}

                                                    >
                                                        <option value='' hidden>Select state</option>
                                                        {
                                                            locationstate.map((item, index) =>
                                                                <option key={index} value={item.location_state}>{item.location_add1}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Address<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        id="custaddr"
                                                        className="form-control"
                                                    >
                                                        <option value='' hidden>Select Customer Address</option>
                                                        {
                                                            cutomerAddress.map((items, index) => (
                                                                <option key={index} value={items.billing_address_state}>{items.billing_address_attention}</option>
                                                            ))
                                                        }

                                                    </select>
                                                    {/* <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button> */}
                                                </div>
                                            </div>


                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Invoice #<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="invoiceid" value={invoiceid} disabled />

                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="ordernumber" placeholder='Enter the order number'/>
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
                                                            activepaymentterm.map((item) => (
                                                                <option key={item.term_days} value={item.term_days}>{item.term}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>

                                                <div className="d-flex col-md-3" >
                                                    <label className="col-md-5 col-form-label font-weight-normal" >Due Date</label>
                                                    <input type="date" className="form-control col-md-6" id="Duedate" disabled />

                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <div className="d-flex col-md-3">
                                                    <label className="col-md-6 col-form-label font-weight-normal" htmlFor='fromdate'>From Date<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="date" className="form-control col-md-6" id="fromdate" />
                                                </div>
                                                <div className="d-flex col-md-5">
                                                    <label className="col-md-4 text-center col-form-label font-weight-normal" htmlFor='todate'>To Date<span style={{ color: "red" }}>*</span> </label>
                                                    <input type="date" className="form-control col-md-6" id="todate" />
                                                </div>
                                            </div>

                                            {/* 
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 " > </label>
                                                <div className="d-flex col-md-4">
                                                    <small>To create transaction dated before 01/07/2017</small>
                                                </div>
                                            </div> */}


                                            <hr />

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Salesperson </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="salesperson" className="form-control">
                                                        <option value='' hidden>{custdetail.contact_person_name}</option>
                                                        {
                                                            activeuser.map((items) => (
                                                                <option key={items.employee_name} value={items.employee_name}>{items.employee_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Subject </label>
                                                <div className="d-flex col-md">
                                                    <textarea className="form-control col-md-7" id="subject" rows='4' placeholder="Let your customer know what this invoice is for" style={{ resize: 'none' }}></textarea>

                                                </div>
                                            </div>
                                            <hr />


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
                                                                <td className="col-md-2 pl-0 pr-0">
                                                                    {/* <input style={{ border: "none" }} type="text" placeholder="Type Items" /> */}
                                                                    <select onChange={handleChangeItems} id="gstvalue" className="form-control col-md">
                                                                        <option value='' hidden> Select item</option>
                                                                        {
                                                                            activechargecode.map(item => (
                                                                                <option value={item.gst_rate}>{item.chartof_account}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td className='col-md-2 pl-0 pr-0'>
                                                                    <input className="form-control col-md" style={{ border: "none" }} type="number" id="Quality" placeholder="0" onChange={(e) => {
                                                                        const quantity = e.target.value
                                                                        // let Total = rate[index] * e.target.value

                                                                        // setTimeout(() => {
                                                                        //             setAmount([...amount, Total])
                                                                        //             console.log(amount)
                                                                        //         }, 1000)
                                                                        setQuantity(quantity)
                                                                    }} /></td>

                                                                <td className='col-md-2 pl-0 pr-0'>
                                                                    <input className="form-control col-md" style={{ border: "none" }} type="number" id="Rate" placeholder="0"
                                                                        onChange={handleChangerate}
                                                                    // value={rate[index]}
                                                                    /></td>
                                                                <td id="gst" className='col-md-1'>{gstvalues[index]}</td>

                                                                <td className='pl-0 pr-0 col-md-2'>
                                                                    {/* <input style={{ border: "none" }} type="text" placeholder="Type Items" /> */}
                                                                    <select onChange={handleChangeUnit} className="form-control col-md">
                                                                        <option value='' hidden> Select Unit</option>
                                                                        {
                                                                            activeunit.map(item => (
                                                                                <option value={item.unit_name}>{item.unit_name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td>{amount[index]}</td>
                                                                <td id="Totalsum">{amount[index] ? amount[index] + amount[index] * totalgst[index] / 100 : 0}</td>

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
                                                    <div className="form mt-3">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Customer Notes (Remarks)</label>
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
                                                                <td><button className="btn btn-primary" onClick={handleSubTotal}>Sub Total</button></td>
                                                                <td></td>
                                                                <td>{totalamout}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td>Discount</td>
                                                                <td >
                                                                    <div className="input-group mb-1">

                                                                        <input type="number" className="form-control col-md-5" id='discountipt' onChange={handledescount} />
                                                                        <div className="input-group-append descountbox" >
                                                                            <span className="input-group-text">
                                                                                <select id='discountsyb'>
                                                                                    <option>₹</option>
                                                                                    <option>%</option>
                                                                                </select>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{descount}</td>
                                                            </tr> */}
                                                            <tr >
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
                                                            <tr >
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
                                                            {/* <tr >
                                                                <td>UTGST</td>
                                                                <td>
                                                                    <div className="input-group mb-1" >
                                                                        <input type="number" className="form-control col-md-5" id='utgstipt' onChange={handlechangegst} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                            </tr> */}
                                                            <tr >
                                                                <td>IGST</td>
                                                                <td>
                                                                    <div className="input-group mb-1" >
                                                                        <input type="number" className="form-control col-md-5 gstinpt" id='igstipt' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {/* <td > {gst}</td> */}
                                                            </tr>
                                                            <tr >
                                                                <td>Total GST</td>
                                                                <td>
                                                                    <div className="input-group mb-1" >
                                                                        <input type="number" className="form-control col-md-5" id='gstipt ' value={Math.max(...totalgst)} disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td > {gstvalue}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    {/* <input type="text" className="form-control col-md-6" placeholder='Adjustment' /> */}
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
                                                                        {/* <input type="number" className="form-control col-md-5" id="adjust" onBlur={handleadjust} /> */}
                                                                        {/* <div className="input-group-append">
                                                                            <span className="input-group-text">₹</span>
                                                                        </div> */}
                                                                    </div>
                                                                </td>
                                                            
                                                            </tr>

                                                            {/* <br /> */}

                                                            <tr className='mt-2'>
                                                                <td><h3>Total</h3></td>
                                                                <td></td>
                                                                <td>{grandtotal}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>

                                            {/* <div style={{ display: "flex" }}> */}
                                            {/* <div style={{ width: "55%" }}>
                                                    <div className="form mt-3">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Terms & Conditions</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " id="Accountname" rows="3" placeholder="Enter the terms "></textarea>
                                                        </div>

                                                    </div>
                                                </div> */}
                                            {/* <div style={{ width: "40%", marginLeft: "3px", padding: "10px 10px 10px 10px", borderLeft: "1px solid grey" }}>
                                                    <label className="font-weight-normal" >Attach file(s) to Estimate</label>
                                                    <input type="file" id="Upload" style={{ visibility: "hidden" }} />
                                                    <div style={{ marginLeft: "10px" }}>
                                                        <buttton onClick={(e) => { e.preventDefault(); document.getElementById("Upload").click() }}>Upload</buttton>
                                                        <select onChange={handleChange}>
                                                            <option hidden defaultValue>Upload File</option>
                                                            <option value="Desktop">Attach from Desktop</option>
                                                            <option>Attach from Cloud</option>
                                                        </select>
                                                    </div>
                                                    <small>You can upload a maximum size 5MB</small>

                                                </div> */}
                                            {/* </div> */}
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                                <div className="col-md-20" style={{ width: "100%" }}>
                                                    <button id="save" name="save" className="btn btn-danger" onClick={handlesavebtn} value='save'>
                                                        Save
                                                    </button>
                                                    <button id="save" name="save" className="btn btn-danger ml-2" onClick={handlesavebtn} value='post'>
                                                        Post
                                                    </button>
                                                    <button id="clear" onClick={(e) => {
                                                        e.preventDefault(); window.location.href = '/home'
                                                    }} name="clear" className="btn ml-2 btn btn-primary">
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

export default Invoices
