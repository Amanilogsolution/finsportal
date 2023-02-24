import React, { useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

function PaymentsReceived() {
    const [totalValues, setTotalValues] = useState([1])
    const [amount, setAmount] = useState()
    const themetype = localStorage.getItem('themetype')

    const handleChange = (e) => {
        var desktop = e.target.value
        if (desktop === 'Desktop') {
            document.getElementById("Upload").click()
        }
    }

    const handleBlur = () => {
        const quality = document.getElementById('Quality').value
        const rate = document.getElementById('Rate').value
        setAmount(quality * rate)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        if (newvalue.length === 1) {
            setTotalValues(newvalue)

        } else {
            newvalue.pop()
            setTotalValues(newvalue)
        }
    }
    return (
        <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
            </div>
            <Header />

            <div className={`content-wrapper bg-${themetype}`}>
                <div className="container-fluid">
                    <div className={`card bg-${themetype}`}>
                        <article className="card-body">
                            <h3 className="text-left"> Record Payment</h3>
                            <br />

                            <form autoComplete="off">
                                <div className="form-row mt-2">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md-4">
                                        <select
                                            id="AccountType"
                                            className="form-control"
                                        // onChange={handleAccountType} 
                                        >
                                            <option value='' hidden>Choose</option>
                                        </select>
                                        <button className="ml-2 bg-white rounded-circle" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }}
                                            style={{ height: "25px", width: "25px" }}>+</button>
                                    </div>
                                </div>
                                <hr />

                                <div className="form-row mt-3">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Amount Received<span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md-5">
                                        <input type="text" className="form-control col-md-6" id="Accountname" placeholder="EST-00001" />
                                    </div>

                                    <label className="col-md-1 col-form-label font-weight-normal" >Bank Charges</label>

                                    <div className="d-flex col-md-4">
                                        <input type="text" className="form-control " id="Accountname" placeholder="" />
                                    </div>
                                </div>

                                <div className="form-row mt-2">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Payment Date<span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md-7">
                                        <input type="date" className="form-control col-md-6" id="Accountname" placeholder="EST-00001" />
                                    </div>
                                </div>

                                <div className="form-row mt-3">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Payment#<span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <input type="text" className="form-control col-md-5" id="Accountname" placeholder="CN-00001" />

                                    </div>
                                </div>

                                <div className="form-row mt-3">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Payment Mode </label>
                                    <div className="d-flex col-md">
                                        <select
                                            id="AccountType"
                                            className="form-control"
                                        // onChange={handleAccountType}
                                        >
                                            <option value='' hidden>Choose</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="form-row mt-3">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Deposit To<span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <select
                                            id="AccountType"
                                            className="form-control"
                                        // onChange={handleAccountType}
                                        >
                                            <option value='' hidden>Select Account</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="form-row mt-3">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Reference#</label>
                                    <div className="d-flex col-md">
                                        <input type="text" className="form-control col-md-5" id="Accountname" />
                                    </div>
                                </div>
                                <hr />

                                <div className="form-row mt-2">
                                    <label className="col-md-2 col-form-label font-weight-normal" >Salesperson </label>
                                    <div className="d-flex col-md-4">
                                        <select id="AccountType" className="form-control">
                                            <option value='' hidden>Select or Add Salesperson</option>
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
                                    <div style={{ width: "55%", marginLeft: "3px", padding: "5px", backgroundColor: themetype == 'dark' ? "#282828" : '#eee', borderRadius: "7px" }}>
                                        <table style={{ width: "100%" }}>
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
                                                <textarea type="text" className="form-control " id="Accountname" rows="3" placeholder="Enter the terms "></textarea>
                                            </div>

                                        </div>
                                    </div>
                                    <div style={{ width: "40%", marginLeft: "3px", padding: "10px 10px 10px 10px" }}>
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
            <Footer theme={themetype} />
        </div>
    )
}

export default PaymentsReceived
