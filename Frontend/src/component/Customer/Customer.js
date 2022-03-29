import React, { useState } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./Customer.css";
import Footer from "../Footer/Footer";

const Customer = () => {
  const [show, setShow] = useState(true);
  const [address, setAddress] = useState(false);
  const [showremark, setShowremark] = useState(false);
  const [contactperson, setContactperson] = useState(false);
  const [texpreferance, setTexprefernace] = useState(false);
  const [showMaster, setShowMaster] = useState(true);
  const [showMasterdropdown, setShowMasterdropdown] = useState(false);
 

  const formshow = () => {
    document.getElementById("distoggle").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const selectgst = () => {
    var a = document.getElementById("gsttreatment").value;
    if (a == "Select GST Treatment" || a == "Unregistered Bussiness" || a == "Consumer" || a == "Overseas") {
      document.getElementById("gstin").style.display = "none";
    }
    else {
      document.getElementById("gstin").style.display = "flex";
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status">
          </div>
        </div>
        <Header />
        <Menu />
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">New Customer</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <div className="col form-group" id="valexisting" >
                            <label
                              htmlfor="user_name"
                              className="col-md-2 col-form-label font-weight-normal">
                              <div className="tooltip1">   
                              </div>
                            </label>
                            <label className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="masterid"
                                onClick={()=> {setShowMaster(true);setShowMasterdropdown(false)}}
                                checked="checked" />
                              <span className="form-check-label font-weight-normal">
                                Non Existing
                              </span>
                            </label>
                            <label className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="masterid"
                                onClick={()=> {setShowMaster(false);setShowMasterdropdown(true)}}
                               
                              />
                              <span className="form-check-label font-weight-normal">
                                Existing Customer
                              </span>
                            </label>
                          </div>
                        </div>

                        {showMaster ? (
                        <div className="form-row">
                          <label htmlFor="user_name"className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" placeholder/>
                          </div>
                          {/* form-group end.// */}
                        </div>):null }

                          {showMasterdropdown ? (
                        <div className="form-row" id='masterdropdown'>
                        <label htmlFor="user_name"className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                              <div className="col form-group">
                                <select
                                  id="gsttreatment"
                                  className="form-control col-md-4"
                                >
                                  <option selected>Select Master ID</option>
                              
                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>):null}
                        <div className="form-row">
                          <div className="col form-group">
                            <label
                              htmlfor="user_name"
                              className="col-md-2 col-form-label font-weight-normal">
                              <div className="tooltip1">
                                Customer Type
                                <span className="tooltipcontent">
                                  The contacts which are associated to any
                                  Account in crm is of type Bussiness and the
                                  other contacts will be of type individual.
                                </span>
                              </div>
                            </label>

                            <label className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                defaultValue="option1"
                              />
                              <span className="form-check-label font-weight-normal">
                                Bussiness
                              </span>
                            </label>
                            <label className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                defaultValue="option2"
                              />
                              <span className="form-check-label font-weight-normal">
                                Individual
                              </span>
                            </label>
                          </div>
                        </div>
                        {/* form-group end.// */}
                        <div className="form-row">
                          <label
                            htmlFor="user_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            <div className="tooltip1">
                              Primary Contact
                              <span className="tooltipcontent">
                                The name you enter here will be for your primary
                                contact.You can continue to add multiple contact
                                Persons from the detailspage.
                              </span>
                            </div>
                          </label>
                          <div className=" form-group">
                            <select
                              id="inputState"
                              className="form-control col-md-"
                            >
                              <option selected> Salutation</option>
                              <option>Mr.</option>
                              <option>Mrs.</option>
                              <option>Ms.</option>
                              <option>Miss.</option>
                              <option>Dr.</option>
                            </select>
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First name"
                            />
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last name"
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        {/* form-row end.// */}


                        <div className="form-row">
                          <label
                            htmlFor="user_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Comapany Name
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control col-md-4"
                              placeholder
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">
                            <div className="tooltip1" style={{ border: "none" }}>
                              <span style={{ color: "red", borderBottom: "1px dashed red", }}>
                                Customer Display Name *
                              </span>
                              <span className="tooltipcontent">
                                This name will be displayed on the transaction
                                you create for this Customer.
                              </span>
                            </div>
                          </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" placeholder/>
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label
                            htmlFor="user_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Customer Email
                          </label>
                          <div className="col form-group">
                            <input
                              type="email"
                              className="form-control col-md-4"
                              placeholder
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label
                            htmlFor="user_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Customer Phone
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control col-md-8"
                              placeholder="Work Phone"
                            />
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control col-md-8"
                              placeholder="Mobile"
                              style={{ marginLeft: "-30px" }}
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* form-row end.// */}

                        <p className="newlinep" id="newlinepid" onClick={formshow}>
                          Add more Details
                        </p>
                        <div id="distoggle" style={{ display: "none" }}>
                          <div className="form-row">
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Skype Name/Number
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                className="form-control col-md-4"
                                placeholder
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Designation
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                className="form-control col-md-4"
                                placeholder
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Department
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                className="form-control col-md-4"
                                placeholder
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
                        </div>


                        <div className="form-row">
                          <label
                            htmlFor="user_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Website
                          </label>
                          <div className="col form-group">
                            <input
                              type="email"
                              className="form-control col-md-4"
                              placeholder
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row bg-light">
                          <div className="col-md-2 form-group">
                            <button
                              className="btn btn-link"
                              onClick={(e) => {
                                e.preventDefault();
                                setShow(true);
                                setAddress(false);
                                setShowremark(false);
                                setContactperson(false);
                              }}
                            >
                              Other Details
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-1 form-group">
                            <button
                              className="btn btn-link"
                              onClick={(e) => {
                                e.preventDefault();
                                setAddress(true);
                                setShow(false);
                                setShowremark(false);
                                setContactperson(false);
                              }}
                            >
                              Address
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button
                              className="btn btn-link"
                              onClick={(e) => {
                                e.preventDefault();
                                setAddress(false);
                                setShow(false);
                                setShowremark(false);
                                setContactperson(true);
                              }}
                            >
                              Contact Persons
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button className="btn btn-link">
                              Custom Fields
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button className="btn btn-link">
                              Reporting Tags
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button
                              className="btn btn-link"
                              onClick={(e) => {
                                e.preventDefault();
                                setShow(false);
                                setAddress(false);
                                setShowremark(true);
                                setContactperson(false);
                              }}
                            >
                              Remarks
                            </button>
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* form-row end.// */}

                        {/*----------------------- Other Details  ---------------------------------------------- */}
                        {show ? (
                          <div className="Other_Details mt-3">
                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>
                                  GST Treatment *
                                </span>
                              </label>
                              <div className="col form-group">
                                <select
                                  id="gsttreatment"
                                  className="form-control col-md-4"
                                  onClick={selectgst}
                                >
                                  <option selected>Select GST Treatment</option>
                                  <option>Registered Bussiness -Regular</option>
                                  <option>
                                    Registered Bussiness - Composition
                                  </option>
                                  <option>Unregistered Bussiness</option>
                                  <option>Consumer</option>
                                  <option>Overseas</option>
                                  <option>Special Economic Zone</option>
                                  <option>Deemed Export</option>
                                  <option>Tax Deductor</option>
                                  <option>SEZ Developer</option>
                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div
                              className="form-row"
                              id="gstin"
                              style={{ display: "none" }}
                            >
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>
                                  GSTIN / UIN*
                                </span>
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  className="form-control col-md-4"
                                  maxLength="16"
                                  placeholder
                                />
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <label
                                htmlfor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                PAN
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  className="form-control col-md-4"
                                  placeholder
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>
                                  Place Of Supply *
                                </span>
                              </label>
                              <div className="col form-group">
                                <select
                                  id="inputState"
                                  className="form-control col-md-4"
                                >
                                  <option selected>Select the state</option>
                                  <option>Andhra Pradesh</option>
                                  <option>Arunachal Pradesh</option>
                                  <option>Assam</option>
                                  <option>Bihar</option>
                                  <option>Chhattisgarh</option>
                                  <option>Goa</option>
                                  <option>Gujarat</option>
                                  <option>Haryana</option>
                                  <option>Himachal Pradesh</option>
                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <div className="col form-group">
                                <label
                                  htmlfor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  <span style={{ color: "red" }}>
                                    Tax Preference *
                                  </span>
                                </label>

                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="taxpreference"
                                    value="Taxable"
                                    onClick={() => setTexprefernace(false)}
                                  />
                                  <span className="form-check-label font-weight-normal">
                                    Taxable
                                  </span>
                                </label>
                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="taxpreference"
                                    value="Tax Exempt"
                                    onClick={() => setTexprefernace(true)}
                                  />
                                  <span className="form-check-label font-weight-normal">
                                    Tax Exempt
                                  </span>
                                </label>
                              </div>
                            </div>

                            {/*---------------------------------- toogle exemption reason  -----------------------------------*/}
                            {texpreferance ? (
                              <div className="form-row" id="exemptionreason">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  <span style={{ color: "red" }}>
                                    Exemption Reason *
                                  </span>
                                </label>
                                <div className="col form-group">
                                  <select
                                    id="exemptionreason"
                                    className="form-control col-md-4"
                                    placeholder="Select or Type to add"
                                  ></select>
                                </div>
                                {/* form-group end.// */}
                              </div>
                            ) : null}

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>Currency *</span>
                              </label>
                              <div className="col-md-4 form-group pr-0">
                                <select
                                  id="inputState"
                                  className="form-control col-md-10 "
                                  data-live-search="true"
                                >
                                  <option selected> AED- UAE Dirham</option>
                                  <option>AUD- Australian Dollar</option>
                                  <option>CAD- Canadian Dollar</option>
                                  <option>CNY- Yuan Renminbi</option>
                                  <option>EUR- Euro</option>
                                  <option>INR- Indian Rupee</option>
                                </select>
                              </div>

                              <div className=" form-group">
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                >
                                  Add Currency
                                </button>
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Opening Balance
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  className="form-control col-md-4"
                                  placeholder
                                />
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Payment Terms
                              </label>
                              <div className="col form-group">
                                <select
                                  id="inputState"
                                  className="form-control col-md-4"
                                >
                                  <option selected>Net 15</option>
                                  <option>Net 30</option>
                                  <option>Net 45</option>
                                  <option>Net 60</option>
                                  <option>EUR- Euro</option>
                                  <option>INR- Indian Rupee</option>
                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <div className="tooltip1">
                                  Enable Portal?
                                  <span className="tooltipcontent">
                                    Give your customers access to portal to view
                                    transaction and make online payments.
                                  </span>
                                </div>
                              </label>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  htmlfor="flexCheckDefault"
                                >
                                  Allow portal access for this customer
                                </label>
                              </div>
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <div className="tooltip1">
                                  Portal Language
                                  <span className="tooltipcontent">
                                    This will change the contact's portal in
                                    corresponding languages.
                                  </span>
                                </div>
                              </label>
                              <div className="col form-group">
                                <select
                                  id="inputState"
                                  className="form-control col-md-4"
                                >
                                  <option selected="">English</option>
                                  <option>हिंदी</option>
                                  <option>عربي</option>
                                  <option>বাংলা</option>
                                  <option>中国人</option>
                                  <option>Deutsch</option>
                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Facebook
                              </label>
                              <div className="col form-group input-group">
                                <input
                                  className="form-control col-md-4"
                                  placeholder="www.facebok.com"
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Twitter
                              </label>
                              <div className="col form-group input-group">
                                <input
                                  className="form-control col-md-4"
                                  placeholder="www.twitter.com"
                                  type="text"
                                />
                              </div>
                            </div>

                          </div>
                        ) : null}
                        {/*------------------------- Address   ---------------------------- */}
                        {address ? (
                          <div className="Address mt-3">
                            <div
                              className="Address_left"
                              style={{ width: "50%", float: "left" }}
                            >
                              <label>BILLING ADDRESS</label>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Attention
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Country / Region
                                </label>
                                <div className="col-md-6 form-group">
                                  <select
                                    id="inputState"
                                    className="form-control"
                                  >
                                    <option selected> Select</option>
                                  </select>
                                </div>
                                {/* form-group end.// */}
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  City
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder="Street 1"
                                  />
                                  <br />
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder="Street 2"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  City
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  State
                                </label>
                                <div className="col-md-6 form-group">
                                  <select
                                    id="inputState"
                                    className="form-control"
                                  >
                                    <option selected> Select</option>
                                  </select>
                                </div>
                                {/* form-group end.// */}
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Zip Code
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Phone
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Fax
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="Address_right"
                              style={{ width: "50%", float: "right" }}
                            >
                              <label>SHIPPING ADDRESS</label>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Attention
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Country / Region
                                </label>
                                <div className="col-md-6 form-group">
                                  <select
                                    id="inputState"
                                    className="form-control"
                                  >
                                    <option selected> Select</option>
                                  </select>
                                </div>
                                {/* form-group end.// */}
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  City
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder="Street 1"
                                  />
                                  <br />
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder="Street 2"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  City
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  State
                                </label>
                                <div className="col-md-6 form-group">
                                  <select
                                    id="inputState"
                                    className="form-control"
                                  >
                                    <option selected> Select</option>
                                  </select>
                                </div>
                                {/* form-group end.// */}
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Zip Code
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Phone
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="user_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Fax
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="email"
                                    className="form-control col-md-7"
                                    placeholder
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {/*--------- Remark ---------- */}
                        {showremark ? (
                          <div className="form-column">
                            <label
                              htmlFor="user_name"
                              className=" col-form-label font-weight-normal"
                            >
                              Remarks
                            </label>
                            <div className="col form-group">
                              <textarea
                                name="text"
                                className="col-md-9"
                                id=""
                                cols="30"
                                rows="5"
                              ></textarea>
                            </div>
                            {/* form-group end.// */}
                          </div>
                        ) : null}
                        {/*---------------------------  Add Contact Person ---------------------------- */}
                        {contactperson ? (
                          <div className="Address mt-3">
                            {/* <div
                             className="Address_left"
                             style={{ width: "50%", float: "left" }}> */}
                            <label>Contact Person</label>
                            <div className="form-row">
                              <label
                                htmlFor="user_name"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                First Name
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  className="form-control col-md-4"
                                  placeholder
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Last Name</label>
                              <div className="col form-group">
                                <input type="name" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Email Address</label>
                              <div className="col form-group">
                                <input type="email" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                              <div className="col form-group">
                                <input type="number" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                              <div className="col form-group">
                                <input type="number" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                              <div className="col form-group">
                                <input type="text" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                              <div className="col form-group">
                                <input type="text" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Department</label>
                              <div className="col form-group">
                                <input type="text" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                          </div>
                          //  </div>
                        ) : null}
                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success ">Save</button>
                      <button className="btn btn-light ml-3">Cancel</button>
                    </div>
                  </div>
                  {/* card.// */}
                </div>
                {/* col.//*/}
              </div>
              {/* row.//*/}
            </div>
            {/* ------------------ Modal start -----------------------------*/}
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Currency
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className=" ">
                      <label
                        htmlFor="user_name"
                        className=" col-form-label font-weight-normal"
                      >
                        <span style={{ color: "red" }}> Currency Code *</span>
                      </label>
                      <div className="col form-group ">
                        <select
                          id="inputState"
                          className="form-control col-md-10 "
                        >
                          <option selected> AED- UAE Dirham</option>
                          <option>AUD- Australian Dollar</option>
                          <option>CAD- Canadian Dollar</option>
                          <option>CNY- Yuan Renminbi</option>
                          <option>EUR- Euro</option>
                          <option>INR- Indian Rupee</option>
                        </select>
                      </div>
                    </div>
                    <div className=" ">
                      <label
                        htmlFor="user_name"
                        className=" col-form-label font-weight-normal"
                      >
                        <span style={{ color: "red" }}> Currency Symbol *</span>
                      </label>
                      <div className="col form-group ">
                        <input
                          id="addsymbol"
                          type="text"
                          className="form-control col-md-10"
                        />
                      </div>
                    </div>
                    <div className=" ">
                      <label
                        htmlFor="user_name"
                        className=" col-form-label font-weight-normal"
                      >
                        <span style={{ color: "red" }}> Currency Name *</span>
                      </label>
                      <div className="col form-group ">
                        <input
                          id="addcurrencyname"
                          type="text"
                          className="form-control col-md-10"
                        />
                      </div>
                    </div>


                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------ Modal end -----------------------------*/}

            <br />
            <br />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Customer;
