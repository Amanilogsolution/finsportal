import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";


const Addcompliances = () => {
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
                            <br /> <h3 className="text-left ml-5">Add Compliances</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Compliances type</label>
                                                    <div className="col form-group">
                                                        <select
                                                            id="inputState"
                                                            className="form-control col-md-4"
                                                        >
                                                            <option selected default hidden value="India">Select Compliances</option>

                                                        </select>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature</label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='nature' placeholder />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="period" className="col-md-2 col-form-label font-weight-normal">Period</label>
                                                    <div className="col form-group">
                                                        <input id="period" type="text" className="form-control col-md-4" />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="period_name" className="col-md-2 col-form-label font-weight-normal">Period Name</label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='period_name' placeholder />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="from_month" className="col-md-2 col-form-label font-weight-normal">From Month</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='from_month' placeholder />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="to_month" className="col-md-2 col-form-label font-weight-normal">To Month</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='to_month' placeholder />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="from_applicable" className="col-md-2 col-form-label font-weight-normal">From Applicable</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='from_applicable' placeholder />
                                                    </div>
                                                </div>
                                                {/* form-group end.// */}
                                                <div className="form-row">
                                                    <label htmlFor="due_date" className="col-md-2 col-form-label font-weight-normal"> Due Date</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='due_date' placeholder />
                                                    </div>
                                                </div>
                                                {/* form-group end.// */}

                                                <div className="form-row">
                                                    <label htmlFor="extended_date" className="col-md-2 col-form-label font-weight-normal"> Extended Date</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='extended_date' placeholder />
                                                    </div>
                                                </div>
                                                {/* form-group end.// */}
                                               

                                            </form>
                                        </article>
                                        {/* card-body end .// */}
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" >Save</button>
                                            <button className="btn btn-light ml-3" onClick={() => { window.location.href = "/" }}>Cancel</button>
                                        </div>
                                    </div>
                                    {/* card.// */}
                                </div>
                                {/* col.//*/}
                            </div>
                            {/* row.//*/}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}


export default Addcompliances