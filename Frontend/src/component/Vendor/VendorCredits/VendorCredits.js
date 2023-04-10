import React, { useState,useEffect } from 'react'
import Header from "../../Header/Header";
import {getDNData,GetBillData} from "../../../api/index"
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";

function VendorCredits() {
    const [totalValues, setTotalValues] = useState([1])
    const [amount, setAmount] = useState()
    const [billdata,setBillData] = useState({})
    const [Dndata,setDnData] = useState({})


    useEffect(() =>{
        const fetchData = async () => {
            const org = localStorage.getItem('Organisation')
            const result = await getDNData(org, localStorage.getItem('dnno'))
            console.log(result)
            setDnData(result)

            const BillData = await GetBillData(org,result.voucher_no)
            setBillData(BillData)
            console.log(BillData)

        }
        fetchData()


    },[])

    const handleChange = (e) => {
        var desktop = e.target.value
        if (desktop === 'Desktop') {
            document.getElementById("Upload").click()
        }
    }



    const handleBlur = () => {
        const quality = document.getElementById('Quality').value
        const rate = document.getElementById('Rate').value
        console.log(quality, rate)
        console.log(quality * rate)
        setAmount(quality * rate)
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
                        <div className="row pt-3" >
                            <div className="col">
                                <div className="card">
                                    <article
                                        className="card-body" >
                                        <h3 className="text-left"> New Vendor Credits</h3>
                                        <br />

                                        <form autoComplete="off">
                                        <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                <input type="text" className="form-control col" id="Accountname"  value={billdata.location} />

                                                </div>
                                            </div>
                                            

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Location<span style={{ color: "red" }}>#</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" value={billdata.vend_name} />
                                                </div>
                                            </div>

                                         

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Voucher Number</label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" value={billdata.vourcher_no}  />
                                                </div>
                                            </div>

                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Voucher Date</label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="Accountname" value={billdata.voudate}  />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal">Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="Accountname" placeholder="EST-00001" />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Bill Number</label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" value={billdata.bill_no}  />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Bill Date</label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="Accountname" value={billdata.billdate}  />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >DN Number</label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" value={Dndata.dn_no}  />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Dn Date</label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="Accountname" value={billdata.dn_Date}  />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >DN Amount</label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" value={Dndata.total_dn_amt}  />
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

export default VendorCredits
