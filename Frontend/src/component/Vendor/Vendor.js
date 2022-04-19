import React, { useState } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import "./Vendor.css";
import { InsertVendor } from '../../api'


const Vendor = () => {
  // const [show, setShow] = useState(true);
  // const [address, setAddress] = useState(false);
  // const [showremark, setShowremark] = useState(false);
  // const [contactperson, setContactperson] = useState(false);
  const [showMaster, setShowMaster] = useState(true);
  const [gsttreatment, setGsttreatment] = useState('');
  const [showMasterdropdown, setShowMasterdropdown] = useState(false);
  const [getsn, setGetsn] = useState();
  const [source, setSource] = useState();
  const [paymtermval, setPaymtermval] = useState();
  const [tdsvalue, setTdsvalue] = useState();
  const [enableportaltoggle, setEnableportaltoggle] = useState(false);
  const [language, setLanguage] = useState('English');

  const formshow = () => {
    document.getElementById("distoggle").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const selectgst = () => {
    var a = document.getElementById("gsttreatment").value;
    setGsttreatment(a)
    if (a == "Select GST Treatment" || a == "Unregistered Bussiness" || a == "Consumer" || a == "Overseas") {
      document.getElementById("gstin").style.display = "none";
    }
    else {
      document.getElementById("gstin").style.display = "flex";
    }
  };

  const setsn = (e) => {
    const data = e.target.value
    setGetsn(data)

  }

  const ststate = (e) => {
    const data = e.target.value;
    setSource(data);
  }

  const paytemval = (e) => {
    const data = e.target.value;
    setPaymtermval(data)
  }
  const tdsval = (e) => {
    const data = e.target.value;
    setTdsvalue(data)
  }

  const portaltoggle = (e) => {

    if (enableportaltoggle == false) {
      setEnableportaltoggle(true)
    }
    else {
      setEnableportaltoggle(false)
    }
  }
  const portallang = (e) => {
    const data = e.target.value;
    setLanguage(data);
  }

  //  ###############   function for get data  #########
  const handleClick = async (e) => {
    e.preventDefault();
    const mast_id = document.getElementById('mast_id').value;
    const vend_id = document.getElementById('vend_id').value;
    const vend_sn = getsn;
    const vend_fname = document.getElementById('fname').value;
    const vend_lname = document.getElementById('lname').value;
    const vend_name = vend_sn + vend_fname + vend_lname;
    const company_name = document.getElementById('company_name').value;
    const vend_display_name = document.getElementById('vendis_name').value;
    const vend_email = document.getElementById('vend_email').value;
    const vend_work_phone = document.getElementById('vend_work_phone').value;
    const vend_phone = document.getElementById('vend_phone').value;
    const skype_detail = document.getElementById('skype_detail').value;
    const designation = document.getElementById('designation').value;
    const department = document.getElementById('department').value;
    const website = document.getElementById('website').value;
    const gst_treatment = gsttreatment;
    const gstin_uin = document.getElementById('gstin_uin').value;
    const pan_no = document.getElementById('pan_no').value;
    const source_of_supply = source;
    const currency = document.getElementById('currency').value;
    const opening_balance = document.getElementById('opening_balance').value;
    const payment_terms = paymtermval;
    const tds = tdsvalue;
    const enable_portal = enableportaltoggle;
    const portal_language = language;
    const facebook_url = document.getElementById('facebook_url').value;
    const twitter_url = document.getElementById('twitter_url').value;
    const billing_address_attention = document.getElementById('billing_address_attention').value;
    const billing_address_country = document.getElementById('billing_address_country').value;
    const billing_address_city = document.getElementById('billing_address_city').value;
    const billing_address_state = document.getElementById('billing_address_state').value;
    const billing_address_pincode = document.getElementById('billing_address_pincode').value;
    const billing_address_phone = document.getElementById('billing_address_phone').value;
    const billing_address_fax = document.getElementById('billing_address_fax').value;
    const contact_person_fname = document.getElementById('contact_person_fname').value;
    const contact_person_lname = document.getElementById('contact_person_lname').value;
    const contact_person_name = contact_person_fname + contact_person_lname;
    const contact_person_email = document.getElementById('contact_person_email').value;
    const contact_person_work_phone = document.getElementById('contact_person_work_phone').value;
    const contact_person_phone = document.getElementById('contact_person_phone').value;
    const contact_person_skype = document.getElementById('contact_person_skype').value;
    const contact_person_designation = document.getElementById('contact_person_designation').value;
    const contact_person_department = document.getElementById('contact_person_department').value;
    const remark = document.getElementById('remark').value;

    // console.log(mast_id, vend_id, vend_name, company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation,
    //   department, website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency, opening_balance, payment_terms, tds, enable_portal,
    //   portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country, billing_address_city, billing_address_state,
    //   billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name, contact_person_email, contact_person_work_phone,
    //   contact_person_phone, contact_person_skype, contact_person_designation, contact_person_department, remark);

    // console.log(account_code, bank_name, account_no, address_line1, address_line2, state, city, pincode, ifsc_code, actype, acname, description)
    // console.log(actype)

    const result = await InsertVendor(mast_id, vend_id, vend_name, company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation,
      department, website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency, opening_balance, payment_terms, tds, enable_portal,
      portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country, billing_address_city, billing_address_state,
      billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name, contact_person_email, contact_person_work_phone,
      contact_person_phone, contact_person_skype, contact_person_designation, contact_person_department, remark)
    // console.log(result)
    if (result) {
      window.location.href = '/Showvendor'
    }
  }




  //######################------------------------####################






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
              <br /> <h3 className="text-left ml-5">New Vendor</h3>
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
                                onClick={(e) => { setShowMaster(true); setShowMasterdropdown(false) }}
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
                                onClick={() => { setShowMaster(false); setShowMasterdropdown(true) }}

                              />
                              <span className="form-check-label font-weight-normal">
                                Existing Vendor
                              </span>
                            </label>
                          </div>
                        </div>
                        {showMaster ? (
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                            <div className="col form-group">
                              <input type="text" id="mast_id" className="form-control col-md-4" placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>) : null}

                        {showMasterdropdown ? (
                          <div className="form-row" id='masterdropdown'>
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                            <div className="col form-group">
                              <select
                                id="mast_id"
                                className="form-control col-md-4"
                              >
                                <option selected>Select Master ID</option>

                              </select>
                            </div>
                            {/* form-group end.// */}
                          </div>) : null}

                        <div className="form-row">
                          <label
                            htmlFor="user_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Vendor Id
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control col-md-4"
                              id="vend_id"
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
                            <div className="tooltip1">
                              Primary Contact
                              <span className="tooltipcontent">
                                The name you enter here will be for your primary
                                contact.You can continue to add multiple contact
                                Persons from the details pages.
                              </span>
                            </div>
                          </label>
                          <div className=" form-group">
                            <select id="inputSn" className="form-control" onChange={setsn}>
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
                              id="fname"
                            />
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last name"
                              id="lname"
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* form-row end.// */}
                        <div className="form-row">
                          <label
                            htmlFor="company_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Comapany Name
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="company_name"
                              className="form-control col-md-4"
                              placeholder
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="vendis_name"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            <div className="tooltip1" style={{ border: "none" }}>
                              <span
                                style={{
                                  color: "red",
                                  borderBottom: "1px dashed red",
                                }}
                              >
                                Vendor Display Name*
                              </span>
                              <span className="tooltipcontent">
                                This name will be displayed on the transaction
                                you create for this Vendor.
                              </span>
                            </div>
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control col-md-4"
                              placeholder
                              id="vendis_name"
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="vend_email"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Vendor Email
                          </label>
                          <div className="col form-group">
                            <input
                              type="email"
                              id="vend_email"
                              className="form-control col-md-4"
                              placeholder
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="vend_work_phone"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Vendor Phone
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="vend_work_phone"
                              className="form-control col-md-8"
                              placeholder="Work Phone"
                            />
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="number"
                              id="vend_phone"
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
                              htmlFor="skype_detail"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Skype Name/Number
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                id="skype_detail"
                                className="form-control col-md-4"
                                placeholder
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label
                              htmlFor="designation"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Designation
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                id="designation"
                                className="form-control col-md-4"
                                placeholder
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label
                              htmlFor="department"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Department
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                id="department"
                                className="form-control col-md-4"
                                placeholder
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="website"
                            className="col-md-2 col-form-label font-weight-normal"
                          >
                            Website
                          </label>
                          <div className="col form-group">
                            <input
                              type="url"
                              id="website"
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
                                // setShow(true);
                                // setAddress(false);
                                // setShowremark(false);
                                // setContactperson(false);
                                document.getElementById("addressdiv").style.display="none";
                                document.getElementById("otherdetaildiv").style.display="block";
                                document.getElementById("contactdiv").style.display="none";
                                document.getElementById("remarkdiv").style.display="none";
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
                                // setAddress(true);
                                // setShow(false);
                                // setShowremark(false);
                                // setContactperson(false);
                                document.getElementById("addressdiv").style.display="block";
                                document.getElementById("otherdetaildiv").style.display="none";
                                document.getElementById("contactdiv").style.display="none";
                                document.getElementById("remarkdiv").style.display="none";
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
                                // setAddress(false);
                                // setShow(false);
                                // setShowremark(false);
                                // setContactperson(true);
                                   document.getElementById("addressdiv").style.display="none";
                                   document.getElementById("otherdetaildiv").style.display="none";
                                   document.getElementById("contactdiv").style.display="block";
                                   document.getElementById("remarkdiv").style.display="none";
                              }}
                            >
                              Contact Persons
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button className="btn btn-link"
                             onClick={(e)=>{
                              e.preventDefault();
                            }}>
                              Custom Fields
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button className="btn btn-link"
                             onClick={(e)=>{
                               e.preventDefault();
                               
                             }}>
                              Reporting Tags
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button
                              className="btn btn-link"
                              onClick={(e) => {
                                e.preventDefault();
                                // setShow(false);
                                // setAddress(false);
                                // setShowremark(true);
                                // setContactperson(false);
                                   document.getElementById("addressdiv").style.display="none";
                                   document.getElementById("otherdetaildiv").style.display="none";
                                   document.getElementById("contactdiv").style.display="none";
                                   document.getElementById("remarkdiv").style.display="block";
                              }}
                            >
                              Remarks
                            </button>
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* form-row end.// */}
                        {/*----------------- Other Details--------- */}
                     
                          <div className="Other_Details mt-3" id="otherdetaildiv">
                            <div className="form-row">
                              <label
                                htmlFor="gsttreatment"
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
                                htmlFor="gstin_uin"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>
                                  GSTIN / UIN*
                                </span>
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  id="gstin_uin"
                                  className="form-control col-md-4"
                                  maxLength="16"
                                  placeholder
                                />
                              </div>
                              {/* form-group end.// */}
                            </div>

                            <div className="form-row">
                              <label
                                htmlfor="pan_no"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                PAN
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  id="pan_no"
                                  className="form-control col-md-4"
                                  placeholder
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="source_of_supply"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>
                                  Source Of Supply *
                                </span>
                              </label>
                              <div className="col form-group">
                                <select
                                  id="source_of_supply"
                                  className="form-control col-md-4"
                                  onChange={ststate}
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
                              <label
                                htmlFor="currency"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                <span style={{ color: "red" }}>Currency *</span>
                              </label>
                              <div className="col-md-4 form-group pr-0">
                                <select
                                  id="currency"
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
                                htmlFor="opening_balance"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Opening Balance
                              </label>
                              <div className="col form-group">
                                <input
                                  type="email"
                                  id="opening_balance"
                                  className="form-control col-md-4"
                                />
                              </div>
                              {/* form-group end.// */}
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="payment_terms"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Payment Terms
                              </label>
                              <div className="col form-group">
                                <select
                                  id="payment_terms"
                                  className="form-control col-md-4"
                                  onChange={paytemval}
                                >
                                  <option selected hidden>Choose the value...</option>
                                  <option>Net 15</option>
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
                                htmlFor="tds"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                TDS
                              </label>
                              <div className="col form-group">
                                <select
                                  id="tds"
                                  className="form-control col-md-4"
                                  onChange={tdsval}

                                >
                                  <option selected hidden>Choose the value...</option>
                                  <option>Net 15</option>
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
                                  onClick={portaltoggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlfor="flexCheckDefault"
                                >
                                  Allow portal access for this vendor
                                </label>
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="portal_language"
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
                                  id="portal_language"
                                  className="form-control col-md-4"
                                  onChange={portallang}
                                >
                                  <option selected>English</option>
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
                                htmlFor="facebook_url"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Facebook
                              </label>
                              <div className="col form-group input-group">
                                <input
                                  className="form-control col-md-4 "
                                  placeholder="www.facebook.com"
                                  id="facebook_url"
                                  type="url"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label
                                htmlFor="twitter_url"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                Twitter
                              </label>
                              <div className="col form-group input-group">
                                <input
                                  className="form-control col-md-4"
                                  placeholder="www.twitter.com"
                                  id="twitter_url"
                                  type="url"
                                />
                              </div>
                            </div>
                          </div>
                        {/*------------- Address-------------- */}
                          <div className="Address mt-3" id="addressdiv" style={{display:"none"}}>
                            <div
                              className="Address_left"
                              style={{ width: "50%", float: "left" }}
                            >
                              <label>BILLING ADDRESS</label>
                              <div className="form-row">
                                <label
                                  htmlFor="billing_address_attention"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Attention
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="text"
                                    id="billing_address_attention"
                                    className="form-control col-md-7"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="billing_address_country"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Country / Region
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="text"
                                    id="billing_address_country"
                                    className="form-control col-md-7"
                                  />
                                </div>
                                {/* form-group end.// */}
                              </div>

                              <div className="form-row">
                                <label
                                  htmlFor="billing_address_city"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  City
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="emaitextl"
                                    id="billing_address_city"
                                    className="form-control col-md-7"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label htmlFor="billing_address_state" className="col-md-2 col-form-label font-weight-normal">State</label>
                                <div className="col form-group">
                                  <input
                                    type="text"
                                    id="billing_address_state"
                                    className="form-control col-md-7"
                                  />
                                </div>
                                {/* form-group end.// */}
                              </div>
                              <div className="form-row">
                                <label htmlFor="billing_address_pincode" className="col-md-2 col-form-label font-weight-normal"> Zip Code </label>
                                <div className="col form-group">
                                  <input
                                    type="number"
                                    id="billing_address_pincode"
                                    className="form-control col-md-7"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="billing_address_phone"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Phone
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="tel"
                                    id="billing_address_phone"
                                    className="form-control col-md-7"
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <label
                                  htmlFor="billing_address_fax"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  Fax
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="text"
                                    id="billing_address_fax"
                                    className="form-control col-md-7"
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="Address_right"
                              style={{ width: "50%", float: "right" }}
                            >
                              {/* <label>SHIPPING ADDRESS</label> */}
                              {/* <div className="form-row">
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
                              </div> */}
                              {/* <div className="form-row">
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
                                {/* form-group end.// 
                              </div> */}
                              {/* <div className="form-row">
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
                              </div> */}
                              {/* <div className="form-row">
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
                              </div> */}
                              {/* <div className="form-row">
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
                                {/* form-group end.// 
                              </div> */}
                              {/* <div className="form-row">
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
                              </div> */}
                              {/* <div className="form-row">
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
                              </div> */}
                              {/* <div className="form-row">
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
                              </div> */}
                            </div>
                          </div>
                        {/*--------- Remark ---------- */}
                          <div className="form-column" id="remarkdiv" style={{display:"none"}}>
                            <label
                              htmlFor="remark"
                              className=" col-form-label font-weight-normal"
                            >
                              Remarks
                            </label>
                            <div className="col form-group">
                              <textarea
                                name="text"
                                className="col-md-9"
                                id="remark"
                                cols="30"
                                rows="5"
                              ></textarea>
                            </div>
                            {/* form-group end.// */}
                          </div>
                        {/*---------Add Contact Person ---------- */}
                          <div className="Address mt-3" id="contactdiv" style={{display:"none"}}>
                            {/* <div
                             className="Address_left"
                             style={{ width: "50%", float: "left" }}> */}
                            <label>Contact Person</label>
                            <div className="form-row">
                              <label
                                htmlFor="contact_person_fname"
                                className="col-md-2 col-form-label font-weight-normal"
                              >
                                First Name
                              </label>
                              <div className="col form-group">
                                <input
                                  type="text"
                                  id="contact_person_fname"
                                  className="form-control col-md-4"
                                  placeholder
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_lname" className="col-md-2 col-form-label font-weight-normal">Last Name</label>
                              <div className="col form-group">
                                <input type="name" id="contact_person_lname" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_email" className="col-md-2 col-form-label font-weight-normal">Email Address</label>
                              <div className="col form-group">
                                <input type="email" id="contact_person_email" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_work_phone" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                              <div className="col form-group">
                                <input type="number" id="contact_person_work_phone" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_phone" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                              <div className="col form-group">
                                <input type="number" id="contact_person_phone" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_skype" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                              <div className="col form-group">
                                <input type="text" id="contact_person_skype" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_designation" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                              <div className="col form-group">
                                <input type="text" id="contact_person_designation" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="contact_person_department" className="col-md-2 col-form-label font-weight-normal">Department</label>
                              <div className="col form-group">
                                <input type="text" id="contact_person_department" className="form-control col-md-4" placeholder />
                              </div>
                            </div>
                          </div>
                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick}>Save</button>
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
export default Vendor;
