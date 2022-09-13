import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { ActiveVendor } from '../../../api'

function Bills() {
    const [totalValues, setTotalValues] = useState([1])
    const [amount, setAmount] = useState()
    const [vendorlist, setVendorlist] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const dataId = await ActiveVendor(localStorage.getItem('Organisation'))
            setVendorlist(dataId)
            console.log(dataId)
            Todaydate()

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
        document.getElementById("pjdate").value = today;
    } 

    const handleVendorSelect = async (e)=>{
        e.preventDefault();
        console.log(e.target.value)
    }



    const handleChange = (e) => {
        console.log(e.target.value)
        var desktop = e.target.value
        if (desktop === 'Desktop') {
            document.getElementById("Upload").click()
        }
    }

    // const handleChangeQuantity =(e)=>{
    //     e.preventDefault()
    //     console.log(e.target.value)
    // }

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
    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}
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
                                        <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >PJ Number<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" placeholder="SO-00001" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal">PJ Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="pjdate" disabled/>
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal">PJ Amount<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                <input type="text" className="form-control col-md-5" id="Accountname"/>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        id="AccountType"
                                                        onChange={handleVendorSelect}
                                                        className="form-control">
                                                        <option value='' hidden>Choose</option>
                                                        {
                                                            vendorlist.map((item,index)=>
                                                            <option key={index} value={item.vend_id}>{item.vend_name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Bill#<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" placeholder="SO-00001" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Order Number</label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal">Bill Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="Accountname" placeholder="EST-00001" />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 " > </label>
                                                <div className="d-flex col-md-4">
                                                    <small>To create transaction dated before 01/07/2017</small>
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Due Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-6" id="Accountname" placeholder="EST-00001" />
                                                </div>

                                                <label className="col-md-1 col-form-label font-weight-normal" >Payment Terms</label>

                                                <div className="d-flex col-md-3">
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
                                                    </select>
                                                </div>
                                            </div>


                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Shipment Preference</label>
                                                <div className="d-flex col-md-4">
                                                    <select id="AccountType" className="form-control">
                                                        <option defaultValue hidden>Salect a delivery method or type to add</option>
                                                    </select>
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
                                                            <tr>
                                                                <td>Discount</td>
                                                                <td><input type="" /></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td><input placeholder="Adjustment" /></td>
                                                                <td><input type="" /></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TCS</td>
                                                                <td><input type="text" placeholder="Select Tax" /></td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <br />
                                                            <tr>
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
                                                            <textarea type="text" className="form-control " id="Accountname" rows="3" placeholder=" "></textarea>
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

export default Bills
