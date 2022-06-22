import React from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";

function RecursionExpenses() {
  return (
    <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    <Menu />
                    <div>
                        <div className="content-wrapper">
                            <div className="container-fluid">
                                <br /> <h3 className="text-left ml-5">New Recurring Expense </h3>
                                <div className="row ">
                                    <div className="col ml-5">
                                        <div className="card" style={{ width: "100%" }}>
                                            <article className="card-body">
                                                <form>
                                                   
                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Profile Name *</span></label>
                                                        <div className="col-md-2 col-form-label "  >
                                                            <input className="col-mt-2" type="text" id="item_name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold "><span style={{color:"rgba(210,0,0,0.7)" }}> Repeat Every *</span></label>
                                                        <div className="col col-form-label "  >
                                                            <select className="col p-1" style={{ width: "30.5%" }} id="unit" >
                                                                <option  selected hidden>Week</option>
                                                                <option>2 Week</option>
                                                                <option>Months</option>
                                                                <option>2 Months</option>
                                                                <option>3 Months</option>
                                                                <option>6 Months</option>
                                                                <option>Year</option>
                                                                <option>2 Year</option>
                                                                <option>3 Year</option>
                                                                <option>Custom</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" >Start Date</label>
                                                        <div className="col-md-2 col-form-label "  >
                                                            <input className="col-mt-2"  style={{ width: "160%" }} type="Date" id="item_name" />
                                                        </div>
                                                    </div>

                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" >Ends On</label>
                                                        <div className="col-md-2 col-form-label"  >
                                                            <input className="col-mt-2"  style={{ width: "160%" }} type="Date" id="item_name" />
                                                            <div className="col pt-2" style={{display:"flex"}}>                                                          
                                                           <input className="col-mt-2"   type="checkbox"  id="item_name" />
                                                            <label  className=" font-weight-normal" style={{marginTop:"-4px",marginLeft:"5px"}} >Never Expires</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold "><span style={{color:"rgba(210,0,0,0.7)" }}>Expense Account *</span></label>
                                                        <div className="col col-form-label "  >
                                                            <select className="col p-1" style={{ width: "30.5%" }} id="unit" >
                                                                <option  selected hidden>Select Account</option>
                                                                <option>Cost Of Gold Sold</option>
                                                                <option>Job Costing</option>
                                                                <option>Labour</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Amount *</span></label>
                                                        <div className="col-md-2 col-form-label "  >
                                                            <input className="col-mt-2" type="number" id="item_name" />
                                                        </div>
                                                    </div>

                                                    <div className="form-row" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold "><span style={{color:"rgba(210,0,0,0.7)" }}>Paid Through *</span></label>
                                                        <div className="col col-form-label "  >
                                                            <select className="col p-1" style={{ width: "30.5%" }} id="unit" >
                                                                <option  selected hidden>Select Account</option>
                                                                <option>Advance Tax</option>
                                                                <option>Employee Advance</option>
                                                                <option>Petty Cash</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <hr/>
                                                    <div className="form-row mt-2" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold ">Vendor </label>
                                                        <div className="col col-form-label "  >
                                                            <select className="col p-1" style={{ width: "30.5%" }} id="unit" >
                                                                <option  selected hidden>Select Account</option>
                                                                <option>Advance Tax</option>
                                                                <option>Employee Advance</option>
                                                                <option>Petty Cash</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" >Notes</label>
                                                        <div className="col-md-2 col-form-label "  >
                                                            <textarea className="col-mt-2 w-7" type="text" id="item_name"  ></textarea>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="form-row mt-2" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold ">Customer Name </label>
                                                        <div className="col col-form-label "  >
                                                            <select className="col p-1" style={{ width: "30.5%" }} id="unit" >
                                                                <option  selected hidden>Select Account</option>
                                                                <option>Advance Tax</option>
                                                                <option>Employee Advance</option>
                                                                <option>Petty Cash</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <hr/>

                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" >Reporting Tags</label>
                                                        <div className="col-md-2 col-form-label "  >
                                                            <span style={{color:"blue" }} >Associate Tags</span>
                                                        </div>
                                                    </div>
                                                    

                                                </form>
                                            </article>

                                            <div className="border-top card-body">
                                          
                                                <button className="btn btn-success" >Save</button>
                                                <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
                                            </div>
                                        </div>
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

export default RecursionExpenses
