import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import './invoice.css'
import { ActiveCustomer } from '../../../api'

function Invoices() {
    const [totalValues, setTotalValues] = useState([1])
    const [amount, setAmount] = useState()
    const [customerlist, setCustomerlist] = useState([]);
    // const [descount, setDescount] = useState('-0.00');
    const [gst, setGst] = useState('0.00');


    useEffect(() => {
        const fetchdata = async () => {
            const customer = await ActiveCustomer(localStorage.getItem('Organisation'))
            console.log(customer)
            setCustomerlist(customer)
        }
        fetchdata();
    }, [])


    const handleChange = (e) => {
        console.log(e.target.value)
        var desktop = e.target.value
        if (desktop == 'Desktop') {
            document.getElementById("Upload").click()
        }
    }

    const handleChangeQuantity = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }

    const handleBlur = () => {
        const quality = document.getElementById('Quality').value
        const rate = document.getElementById('Rate').value
        console.log(quality, rate)
        console.log(quality * rate)
        setAmount(quality * rate)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
        // setAmount(0)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        console.log(newvalue.length)
        if (newvalue.length == 1) {
            setTotalValues(newvalue)

        } else {
            newvalue.pop()

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

    const handlechangegst=(e)=>{
        e.preventDefault();
        document.getElementById('gstipt').style.border = 'none';
        document.getElementById('gstipt').style.boxShadow = 'none';
        const gstval= e.target.value;
        if(gstval>100){
            document.getElementById('gstipt').style.border = '1px solid red';
            document.getElementById('gstipt').style.boxShadow = '1px 1px 5px red';
            setGst('0.00')
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
                                                        id="AccountType"
                                                        className="form-control"
                                                    // onChange={handleAccountType}
                                                    >
                                                        <option defaultValue hidden>Select the customer...</option>
                                                        {
                                                            customerlist.map((item, index) =>
                                                                <option key={index}>{item.cust_name}</option>)
                                                        }

                                                    </select>
                                                    {/* <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button> */}
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
                                                <label className="col-md-2 col-form-label font-weight-normal" >Invoice Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col">
                                                    <input type="text" className="form-control col" id="invoicedate" disabled />
                                                </div>



                                                <div className="d-flex col-md-2">
                                                    <select
                                                        id="AccountType"
                                                        className="form-control"
                                                    // onChange={handleAccountType}
                                                    >
                                                        <option defaultValue hidden>Date on Receipt</option>
                                                        <option >Net 15</option>
                                                        <option >Net 30</option>
                                                        <option >Net 45</option>
                                                        <option >Due end of the Month</option>
                                                        <option >Due end of next Month</option>
                                                        <option >Due of Receipt</option>
                                                        <option >Custom</option>
                                                    </select>
                                                </div>
                                                <label className="col-md-1 col-form-label font-weight-normal" >Due Date</label>

                                                <div className="d-flex col-md-3">
                                                    <input type="date" className="form-control col-md-6" id="Accountname" placeholder="EST-00001" />

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
                                                        <option defaultValue hidden>Choose a proper challan type</option>
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


                                            <table class="table">
                                                <thead>
                                                    <th scope="col">Iteam Details</th>
                                                    <th scope="col">Quality</th>
                                                    <th scope="col">Rate</th>
                                                    <th scope="col">Amount</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        totalValues.map((element, index) => (
                                                            <tr key={index}>
                                                                <td><input style={{ border: "none" }} type="text" placeholder="Type Items" /></td>
                                                                <td><input style={{ border: "none" }} type="number" id="Quality" onBlur={handleBlur} placeholder="0" /></td>
                                                                <td><input style={{ border: "none" }} type="number" id="Rate" onBlur={handleBlur} placeholder="0.00" /></td>
                                                                <td>{amount}</td>
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
                                                                <td>Sub Total</td>
                                                                <td></td>
                                                                <td>0.00</td>
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
                                                                <td>GST (GST Type)</td>
                                                                <td>
                                                                    <div className="input-group mb-1" >
                                                                        <input type="text" className="form-control col-md-5" id='gstipt' onChange={handlechangegst}/>
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td > {gst}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <input type="text" className="form-control col-md-6" placeholder='Adjustment' />
                                                                </td>
                                                                <td>
                                                                    <div className="input-group mb-1">
                                                                        <input type="text" className="form-control col-md-5" />
                                                                    </div>
                                                                </td>
                                                                <td>-0.00</td>
                                                            </tr>

                                                            {/* <br /> */}

                                                            <tr className='mt-2'>
                                                                <td><h3>Total(₹)</h3></td>
                                                                <td></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                            <hr />
                                            <div style={{ display: "flex" }}>
                                                <div style={{ width: "55%" }}>
                                                    <div className="form mt-3">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Terms & Conditions</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " id="Accountname" rows="3" placeholder="Enter the terms "></textarea>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div style={{ width: "40%", marginLeft: "3px", padding: "10px 10px 10px 10px", borderLeft: "1px solid grey" }}>
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

                                                </div>
                                            </div>
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
