import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
// import { ActiveCustomer, ActivePaymentTerm, ActiveUser, SelectedCustomer,ActiveItems} from '../../../api/index'
import { ActiveCustomer, ActivePaymentTerm, ActiveUser,SelectedCustomer ,ActiveLocation,ShowCustAddress,ActiveItems} from '../../../api/index'

function Invoices() {
    const [totalValues, setTotalValues] = useState([1])
    const [activecustomer, setActiveCustomer] = useState([])
    const [activepaymentterm, setActivePaymentTerm] = useState([])
    const [cutomerAddress, setCutomerAddress] = useState([])
    const [locationstate,setLocationstate] =useState([])
    const [activeuser, setActiveUser] = useState([])
    const [custdetail, setCustdetail] = useState([])
    const [gstvalue, setGstvalue] = useState('0.00')
    const [amount, setAmount] = useState([])
    const [rate, setRate] = useState([])
    const [grandtotal, setGrandTotal] = useState(0)

    const [adjust, setAdjust] = useState(0)
    const [totalamout, setTotalamount] = useState(0)
    const [activeterms, setActiveTerms] = useState([])



    const [gst, setGst] = useState(0)

    useEffect(() => {
        const fetchdata = async () => {
            const result = await ActiveCustomer(localStorage.getItem('Organisation'))
           
            setActiveCustomer(result)
            const result1 = await ActivePaymentTerm(localStorage.getItem('Organisation'))
            setActivePaymentTerm(result1)
            const result2 = await ActiveUser()
            setActiveUser(result2)
            Todaydate()
            const activeitems = await ActiveItems(localStorage.getItem('Organisation'))
            setActiveTerms(activeitems)
            console.log(activeitems)

            const locatonstateres = await ActiveLocation(localStorage.getItem('Organisation'))
            console.log(locatonstateres)
            setLocationstate(locatonstateres)
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

    const handleAccountTerm = (e) => {
        const days = Number(e.target.value)

        var myDate = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000));
        var day = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("Duedate").value = today;

    }

    // const handleChange = (e) => {
    //     var desktop = e.target.value
    //     if (desktop == 'Desktop') {
    //         document.getElementById("Upload").click()
    //     }
    // }

    const handleChangeItems = (e) =>{
        console.log(e.target.value) 
        setRate([...rate,e.target.value])

    }
  const handleSubTotal = (e) => {
    e.preventDefault();
    var sum = 0
    amount.map((item) => sum += item)
    setGrandTotal(sum)
  } 

    // const handleChangerate = (e) => {
    //     let Total = quantity * e.target.value
    //     console.log(typeof (Total))
    //     setTimeout(() => {
    //         setAmount([...amount, Total])
    //         console.log(amount)
    //     }, 1000)

    // }

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
        amount.map((item) => sum += item)
        setGrandTotal(sum)


        // setAmount(0)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        var Amount = [...amount]
        console.log(newvalue.length)
        if (newvalue.length == 1) {
            setTotalValues(newvalue)
            setAmount(Amount)


        } else {
            newvalue.pop()
            Amount.pop()
            setAmount(Amount)

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

    const handlechangegst = (e) => {
        e.preventDefault();

        const cgst = document.getElementById('cgstipt').value;
        const sutgst = document.getElementById('sutgstipt').value;
        // const utgst = document.getElementById('utgstipt').value;
        const igst = document.getElementById('igstipt').value;

        const totalgst = Number(cgst) + Number(sutgst)+ Number(igst);

        if (totalgst > 100) {
            document.getElementById('gstipt').style.border = '1px solid red';
            document.getElementById('gstipt').style.boxShadow = '1px 1px 5px red'
            setGst(0)
        }
        else {
            setGst(totalgst)
            const totalgstvalue = grandtotal * (totalgst / 100)
            console.log(grandtotal)
            console.log(totalgstvalue)
            setGstvalue(totalgstvalue)
            const tamount = grandtotal + totalgstvalue;
            setTotalamount(tamount)
        }
    }

    const handleadjust = (e) => {
        e.preventDefault();
        const adjustment = document.getElementById('adjust').value
        document.getElementById('igstipt').disabled='true'
        document.getElementById('cgstipt').disabled='true'
        document.getElementById('sutgstipt').disabled='true'

        if (adjustment > grandtotal) {
            document.getElementById('adjust').style.border = '1px solid red';
            document.getElementById('adjust').style.boxShadow = '1px 1px 5px red'
        }
        else {
            document.getElementById('adjust').style.border = 'none';
            document.getElementById('adjust').style.boxShadow = 'none'
            setAdjust(adjustment)

            const tamount = grandtotal + gstvalue - adjustment
            setTotalamount(tamount)
        }
    }


const handleCustname=async(e)=>{
    const cust_name=e.target.value;
    const cust_detail= await SelectedCustomer(localStorage.getItem('Organisation'),cust_name)
    // console.log(cust_detail)
    setCustdetail(cust_detail)

    const cust_add = await ShowCustAddress(cust_name,localStorage.getItem("Organisation"))
    console.log('cust_add',cust_add)
    setCutomerAddress(cust_add)
}

const handlechnageaddress=(e)=>{
    const billing_add= e.target.value;
    const cust_add= document.getElementById('custaddr').value;
    console.log(cust_add)
    console.log(billing_add)

    if(cust_add === billing_add){
        document.getElementById('igstipt').disabled='true'
        document.getElementById('sutgstipt').disabled=false
    }
    else{
        document.getElementById('igstipt').disabled=false
        document.getElementById('sutgstipt').disabled='true'
    }
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
                                                        <option value='' hidden>Choose</option>
                                                        {
                                                            activecustomer.map((items,index) => (
                                                                <option key={index} value={items.cust_name} >{items.cust_name}</option>
                                                            ))
                                                        }

                                                    </select>
                                                    {/* <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button> */}
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Address<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        id="custaddr"
                                                        className="form-control"
                                                    >
                                                        <option value=''  hidden>Select Customer Address</option>
                                                        {
                                                            cutomerAddress.map((items,index) => (
                                                                <option key={index} value={items.billing_address_state}>{items.billing_address_city},{items.billing_address_state}</option>
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
                                                            locationstate.map((item,index)=>
                                                            <option key={index}>{item.state}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Invoice #<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="invoiceid" placeholder="INV-00001" />

                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Order Number </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="ordernumber" />
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
                                                        id="AccountType"
                                                        className="col-md-6  mr-0 form-control"
                                                        onChange={handleAccountTerm}
                                                    >
                                                        <option value='' hidden>Date on Receipt</option>
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

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 " > </label>
                                                <div className="d-flex col-md-4">
                                                    <small>To create transaction dated before 01/07/2017</small>
                                                </div>
                                            </div>


                                            <hr />

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Salesperson </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="AccountType" className="form-control">
                                                        <option value='' hidden>Choose Salesperson</option>
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
                                                    <textarea className="form-control col-md-7" id="Accountname" placeholder="Let your customer know what this invoice is for"></textarea>

                                                </div>
                                            </div>
                                            <hr />


                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Iteam Details</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        totalValues.map((element, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    {/* <input style={{ border: "none" }} type="text" placeholder="Type Items" /> */}
                                                                    <select onChange={handleChangeItems}>
                                                                        <option value='' hidden> Choose Item</option>
                                                                        {
                                                                            activeterms.map(item=>(
                                                                                <option value={item.item_selling_price}>{item.item_name}</option>


                                                                            ))
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td><input style={{ border: "none" }} type="number" id="Quality" onChange={(e) => {
                                                                    // const quantity = e.target.value
                                                                            let Total = rate[index] * e.target.value

                                                                    setTimeout(() => {
                                                                                setAmount([...amount, Total])
                                                                                console.log(amount)
                                                                                
                                                                               
                                                                            }, 1000)
                                                                    // setQuantity(quantity)
                                                                }} placeholder="0" /></td>
                                                                <td><input style={{ border: "none" }} type="number" id="Rate" 
                                                                // onChange={handleChangerate} 
                                                                value={rate[index]} /></td>
                                                                <td>{amount[index]}</td>
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
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Customer Notes</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="3" id="Accountname" placeholder="Looking forward for your bussiness "></textarea>
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
                                                                <td>{grandtotal}</td>
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
                                                                        <input type="number" className="form-control col-md-5" id='cgstipt' onChange={handlechangegst} />
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
                                                                        <input type="number" className="form-control col-md-5" id='sutgstipt' onChange={handlechangegst} />
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
                                                                        <input type="number" className="form-control col-md-5 gstinpt" id='igstipt' onChange={handlechangegst} />
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
                                                                        <input type="number" className="form-control col-md-5" id='gstipt ' value={gst} disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td > {gstvalue}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <input type="text" className="form-control col-md-6" placeholder='Adjustment' />
                                                                </td>
                                                                <td>
                                                                    <div className="input-group mb-1">
                                                                        <input type="number" className="form-control col-md-5" id="adjust" onBlur={handleadjust} />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">₹</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>-{adjust}</td>
                                                            </tr>

                                                            {/* <br /> */}

                                                            <tr className='mt-2'>
                                                                <td><h3>Total(₹)</h3></td>
                                                                <td></td>
                                                                <td>{totalamout}</td>
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
                                                    <button id="save" name="save" className="btn btn-danger">
                                                        Save and Send
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

export default Invoices
