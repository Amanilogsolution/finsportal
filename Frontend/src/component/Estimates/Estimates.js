import React, { useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

function Estimates() {
    const [totalValues, setTotalValues] = useState([1])
    const handleChange = (e) => {
        console.log(e.target.value)
        var desktop = e.target.value
        if (desktop == 'Desktop') {
            document.getElementById("Upload").click()
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
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
                <Menu />

                <div className="content-wrapper">
                    <div className="container-fluid">

                        <div className="row pt-3" >
                            <div className="col">
                                <div className="card">
                                    <article
                                        className="card-body"
                                    >
                                        <h3 className="text-left"> New Estimate</h3>
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
                                                        <option selected hidden>Choose</option>

                                                    </select>
                                                    <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button>
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Estimate#<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" placeholder="EST-00001" />

                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Reference# </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" placeholder="EST-00001" />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Estimate Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-6" id="Accountname" placeholder="EST-00001" />
                                                </div>

                                                <label className="col-md-1 col-form-label font-weight-normal" >Expiry Date</label>

                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-7" id="Accountname" placeholder="EST-00001" />
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Sales Person </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="AccountType" className="form-control">
                                                        <option selected hidden>Choose</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Project Name </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="AccountType" className="form-control">
                                                        <option selected hidden>Choose</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label className="col-md-2 " > </label>
                                                <div className="d-flex col-md-4">
                                                    <small>Select a customer to associate a project.</small>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Subject</label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control col-md-5" id="Accountname" placeholder="Let your customer know what this estimate is for"></textarea>
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
                                                            <tr>
                                                                <th><input style={{ border: "none" }} type="text" placeholder="Type Items" /></th>
                                                                <th><input style={{ border: "none" }} type="number" placeholder="0" /></th>
                                                                <th><input style={{ border: "none" }} type="number" placeholder="0.00" /></th>
                                                                <th>0.00</th>

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
                                                            <option hidden selected>Upload File</option>
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

export default Estimates
