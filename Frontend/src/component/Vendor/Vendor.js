import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Vendor.css";
import {
  InsertVendor, Activecountries, showactivestate, getCity, VendorMastid,
  Getfincialyearid, Updatefinancialcount, UpdatefinancialTwocount, ActivePaymentTerm, ActiveCurrency
} from '../../api'


const Vendor = () => {
  const [vendworkphonecount, setVendworkphonecount] = useState();
  const [vendphonecount, setVendphonecount] = useState();
  const [billpincount, setBillpincount] = useState();
  const [billphonecount, setBillphonecount] = useState();
  const [contworkphonecount, setContworkphonecount] = useState();
  const [contphonecount, setContphonecount] = useState();
  const [showMaster, setShowMaster] = useState(false);
  const [gsttreatment, setGsttreatment] = useState('');
  const [enableportaltoggle, setEnableportaltoggle] = useState(false);
  const [countrylist, setCountrylist] = useState([]);
  const [paymentterm, setPaymentterm] = useState([]);
  const [selectState, setSelectState] = useState([])
  const [selectCity, setSelectCity] = useState([]);
  const [generateMast_id, setGenerateMast_id] = useState();
  const [generateVend_id, setGenerateVend_id] = useState();
  const [preMastid, setPreMastid] = useState([]);
  const [year, setYear] = useState();
  const [increvend, setIncrevend] = useState();
  const [incremvend, setIncremvend] = useState();
  const [currencylist, setCurrencylist] = useState([])

  const themeval = localStorage.getItem('themetype')


  //######################-------UseEffect Start-----------------####################

  useEffect(() => {
    async function fetchdata() {
      const org = localStorage.getItem('Organisation');
      const result = await Activecountries();
      setCountrylist(result)

      const payment_term = await ActivePaymentTerm(org)
      setPaymentterm(payment_term)

      const totalvendor = await Getfincialyearid(org)
      setYear(totalvendor[0].year);
      const mvendcount = Number(totalvendor[0].mvend_count) + 1
      const vendcount = Number(totalvendor[0].vend_count) + 1
      setIncremvend(mvendcount);
      setIncrevend(vendcount);
      generatefunid(mvendcount, vendcount, totalvendor[0].year)

      const totalmastid = await VendorMastid(org);
      setPreMastid(totalmastid);

      const currencydata = await ActiveCurrency(org)
      setCurrencylist(currencydata)
    }
    fetchdata();
  }, [])

  const generatefunid = (mvendcount, vendcount, year) => {
    let countmast = '' + mvendcount;
    let countvendid = '' + vendcount;
    const mast_id_last = countmast.padStart(4, "0");
    const cust_id_last = countvendid.padStart(4, "0");
    const new_mast_id = "MVEND" + year + mast_id_last;
    const new_vend_id = "VEND" + year + cust_id_last;
    setGenerateMast_id(new_mast_id)
    setGenerateVend_id(new_vend_id)
  }

  //######################-------UseEffect End-----------------####################


  const formshow = () => {
    document.getElementById("distoggle").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const selectgst = () => {
    var a = document.getElementById("gsttreatment").value;
    setGsttreatment(a)
    if (a === "Select GST Treatment" || a === "Unregistered Bussiness" || a === "Consumer" || a === "Overseas") {
      document.getElementById("gstin").style.display = "none";
    }
    else {
      document.getElementById("gstin").style.display = "flex";
    }
  };


  const portaltoggle = (e) => {
    if (enableportaltoggle === false) {
      setEnableportaltoggle(true)
    }
    else {
      setEnableportaltoggle(false)
    }
  }

  //  ###############   function for get data  #########
  const handleClick = async (e) => {
    e.preventDefault();
    document.getElementById('submitbtn').disabled = 'true';

    const vend_sn = document.getElementById('inputSn').value;
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
    const source_of_supply = document.getElementById('source_of_supply').value;
    const currency = document.getElementById('currency').value;
    const opening_balance = document.getElementById('opening_balance').value;
    const payment_terms = document.getElementById('payment_terms').value;
    const tds = document.getElementById('tds').value;
    const enable_portal = enableportaltoggle;
    const portal_language = document.getElementById('portal_language').value;
    const facebook_url = document.getElementById('facebook_url').value;
    const twitter_url = document.getElementById('twitter_url').value;
    const billing_address_attention = document.getElementById('billing_address_attention').value;
    const billing_address_country_val = document.getElementById('billing_address_country').value;
    const billing_address_state_val = document.getElementById('billing_address_state').value;
    const billing_address_city_val = document.getElementById('billing_address_city').value;
    const billing_address_pincode = document.getElementById('billing_address_pincode').value;
    const billing_address_phone = document.getElementById('billing_address_phone').value;
    const billing_address_fax = document.getElementById('billing_address_fax').value;
    const contact_person_name = document.getElementById('contact_person_name').value;
    const contact_person_email = document.getElementById('contact_person_email').value;
    const contact_person_work_phone = document.getElementById('contact_person_work_phone').value;
    const contact_person_phone = document.getElementById('contact_person_phone').value;
    const contact_person_skype = document.getElementById('contact_person_skype').value;
    const contact_person_designation = document.getElementById('contact_person_designation').value;
    const contact_person_department = document.getElementById('contact_person_department').value;
    const remark = document.getElementById('remark').value;
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id')

    if (!vend_fname || !vend_display_name || !vend_work_phone || !gst_treatment || !source_of_supply || !currency || !payment_terms || !billing_address_attention || !billing_address_country_val || !billing_address_state_val || !billing_address_city_val || !billing_address_pincode || !billing_address_phone || !contact_person_name) {
      alert('Please Fill the Mandatory fields...')
      document.getElementById('submitbtn').disabled = false;
    }
    else {
      if (showMaster === true) {
        const mast_id = document.getElementById('mast_idselected').value;

        const result = await InsertVendor(mast_id, generateVend_id, vend_name, company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation,
          department, website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency, opening_balance, payment_terms, tds, enable_portal,
          portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country_val, billing_address_city_val, billing_address_state_val,
          billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name, contact_person_email, contact_person_work_phone,
          contact_person_phone, contact_person_skype, contact_person_designation, contact_person_department, remark, org, User_id, year)

        if (result[0] > 0) {
          const result = await Updatefinancialcount(org, 'vend_count', increvend)

          if (result[0] > 0) {
            alert("data Added")
            window.location.href = '/Showvendor'
          }
        }
      }
      else {
        const mast_id = generateMast_id;
        const vend_id = generateVend_id;

        const result2 = await InsertVendor(mast_id, vend_id, vend_name, company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation,
          department, website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency, opening_balance, payment_terms, tds, enable_portal,
          portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country_val, billing_address_city_val, billing_address_state_val,
          billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name, contact_person_email, contact_person_work_phone,
          contact_person_phone, contact_person_skype, contact_person_designation, contact_person_department, remark, org, User_id, year)

        if (result2[0] > 0) {
          const result1 = await UpdatefinancialTwocount(org, 'mvend_count', incremvend, 'vend_count', increvend)

          if (result1[0] > 0) {
            alert("data Added")
            window.location.href = '/Showvendor'
          }
        }

      }

    }
  }



  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    const statesresult = await showactivestate(data)
    setSelectState(statesresult)
  }
  const handleChangebillingState = async (e) => {
    let data = e.target.value;
    const result = await getCity(data)
    setSelectCity(result)
  }



  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className="content-wrapper">
        <div className="container-fluid">
          <h3 className="ml-5 pt-3 pb-2">New Vendor</h3>
          <div className="card mb-2 w-100">
            <article className="card-body">
              <form autoComplete="off">
                <div className="form-row">
                  <div className="col form-group" id="valexisting" >
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">
                      <div className="tooltip1"></div>
                    </label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="masterid" onClick={(e) => { setShowMaster(false) }} defaultChecked />
                      <span className="form-check-label font-weight-normal"> Non Existing </span></label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="masterid" onClick={() => { setShowMaster(true) }} />
                      <span className="form-check-label font-weight-normal"> Existing Vendor</span>
                    </label>
                  </div>
                </div>


                {showMaster ?
                  <>
                    <div className="form-row" id='masterdropdown'>
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                      <div className="col form-group">
                        <select
                          id="mast_idselected"
                          className="form-control col-md-4">
                          <option hidden value=''>Select Master ID</option>
                          {
                            preMastid.map((item, index) => (
                              <option key={index}>{item.mast_id}</option>))
                          }
                        </select>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                      <div className="col form-group">
                        <input type="text" id="mast_id" className="form-control col-md-4" value={generateMast_id} disabled />
                      </div>
                    </div>
                  </>
                }


                <div className="form-row">
                  <label htmlFor="vend_id" className="col-md-2 col-form-label font-weight-normal" >Vendor Id</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id="vend_id" value={generateVend_id} disabled />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">
                    <div className="tooltip1">
                      Primary Contact <span className="text-danger">*</span>
                      <span className="tooltipcontent">
                        The name you enter here will be for your primary
                        contact.You can continue to add multiple contact
                        Persons from the details pages.
                      </span>
                    </div>
                  </label>
                  <div className=" form-group">
                    <select id="inputSn" className="form-control" >
                      <option >Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Miss.</option>
                      <option>Dr.</option>
                    </select>
                  </div>
                  <div className="col form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      id="fname"
                    />
                  </div>
                  <div className="col form-group">
                    <input
                      type="text"
                      className="form-control" placeholder="Last name" id="lname" />
                  </div>
                </div>
                <div className="form-row">
                  <label
                    htmlFor="company_name"
                    className="col-md-2 col-form-label font-weight-normal">
                    Comapany Name
                  </label>
                  <div className="col form-group">
                    <input
                      type="text"
                      id="company_name"
                      className="form-control col-md-4"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <label
                    htmlFor="vendis_name"
                    className="col-md-2 col-form-label font-weight-normal"
                  >
                    <div className="tooltip1" style={{ border: "none" }}>
                      <span className="text-danger " style={{ borderBottom: "1px dashed red", }}>Vendor Display Name* </span>
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
                      id="vendis_name"
                    />
                  </div>
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
                    />
                  </div>
                </div>
                <div className="form-row">
                  <label
                    htmlFor="vend_work_phone"
                    className="col-md-2 col-form-label font-weight-normal"
                  >
                    Vendor Phone<span className="text-danger">*</span>
                  </label>
                  <div className="col form-group">
                    <input
                      type="number"
                      id="vend_work_phone"
                      className="form-control col-md-8"
                      placeholder="Work Phone"
                      value={vendworkphonecount}
                      onChange={(e) => {
                        if (e.target.value.length === 11) return false;
                        setVendworkphonecount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col form-group">
                    <input
                      type="number"
                      id="vend_phone"
                      className="form-control col-md-8"
                      placeholder="Mobile"
                      style={{ marginLeft: "-30px" }}
                      value={vendphonecount}
                      onChange={(e) => {
                        if (e.target.value.length === 11) return false;
                        setVendphonecount(e.target.value);
                      }}
                    />
                  </div>
                </div>
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
                      />
                    </div>
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
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label
                      htmlFor="department"
                      className="col-md-2 col-form-label font-weight-normal">
                      Department
                    </label>
                    <div className="col form-group">
                      <input
                        type="text"
                        id="department"
                        className="form-control col-md-4"
                      />
                    </div>
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
                    />
                  </div>
                </div>
                <div className="form-row" style={{ background: '#eee' }}>
                  <div className="col-md-2 form-group">
                    <button
                      className="btn btn-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("addressdiv").style.display = "none";
                        document.getElementById("otherdetaildiv").style.display = "block";
                        document.getElementById("contactdiv").style.display = "none";
                        document.getElementById("remarkdiv").style.display = "none";
                      }}
                    >
                      Other Details
                    </button>
                  </div>
                  <div className="col-md-1 form-group">
                    <button
                      className="btn btn-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("addressdiv").style.display = "block";
                        document.getElementById("otherdetaildiv").style.display = "none";
                        document.getElementById("contactdiv").style.display = "none";
                        document.getElementById("remarkdiv").style.display = "none";
                      }}
                    >
                      Address
                    </button>
                  </div>
                  <div className="col-md-2 form-group">
                    <button
                      className="btn btn-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("addressdiv").style.display = "none";
                        document.getElementById("otherdetaildiv").style.display = "none";
                        document.getElementById("contactdiv").style.display = "block";
                        document.getElementById("remarkdiv").style.display = "none";
                      }}
                    >
                      Contact Persons
                    </button>
                  </div>
                  {/* form-group end.// */}
                  <div className="col-md-2 form-group">
                    <button className="btn btn-link"
                      onClick={(e) => { e.preventDefault(); }}>Custom Fields</button>
                  </div>
                  <div className="col-md-2 form-group">
                    <button className="btn btn-link"
                      onClick={(e) => { e.preventDefault(); }}>Reporting Tags </button>
                  </div>
                  <div className="col-md-2 form-group">
                    <button
                      className="btn btn-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("addressdiv").style.display = "none";
                        document.getElementById("otherdetaildiv").style.display = "none";
                        document.getElementById("contactdiv").style.display = "none";
                        document.getElementById("remarkdiv").style.display = "block";
                      }}
                    >
                      Remarks
                    </button>
                  </div>
                </div>
                {/*----------------- Other Details--------- */}

                <div className="Other_Details mt-3" id="otherdetaildiv">
                  <div className="form-row">
                    <label
                      htmlFor="gsttreatment"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      <span className="text-danger">
                        GST Treatment *
                      </span>
                    </label>
                    <div className="col form-group">
                      <select
                        id="gsttreatment"
                        className="form-control col-md-4"
                        onClick={selectgst}
                      >
                        <option hidden value=''>Select GST Treatment</option>
                        <option>Registered Bussiness -Regular</option>
                        <option>Registered Bussiness - Composition</option>
                        <option>Unregistered Bussiness</option>
                        <option>Overseas</option>
                        <option>Special Economic Zone</option>
                        <option>Deemed Export</option>
                        <option>Tax Deductor</option>
                        <option>SEZ Developer</option>
                      </select>
                    </div>
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
                      <span className="text-danger">
                        GSTIN / UIN*
                      </span>
                    </label>
                    <div className="col form-group">
                      <input
                        type="email"
                        id="gstin_uin"
                        className="form-control col-md-4"
                        maxLength="16"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label
                      htmlFor="pan_no"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      PAN
                    </label>
                    <div className="col form-group">
                      <input
                        type="email"
                        id="pan_no"
                        className="form-control col-md-4"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label
                      htmlFor="source_of_supply"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      <span className="text-danger">
                        Source Of Supply *
                      </span>
                    </label>
                    <div className="col form-group">
                      <select
                        id="source_of_supply"
                        className="form-control col-md-4"
                      // onChange={ststate}
                      >
                        <option hidden value=''>Select the state</option>
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
                  </div>

                  <div className="form-row">
                    <label
                      htmlFor="currency"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      <span className="text-danger">Currency *</span>
                    </label>
                    <div className="col-md-4 form-group pr-0">
                      <select
                        id="currency"
                        className="form-control col-md-10 "
                      >
                        <option hidden value=''>Select currency</option>
                        {
                          currencylist.map((item, index) =>
                            <option key={index} value={item.currency_code}>{item.currency_name}</option>)
                        }
                      </select>
                    </div>

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
                  </div>
                  <div className="form-row">
                    <label
                      htmlFor="payment_terms"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      Payment Terms<span className="text-danger">*</span>
                    </label>
                    <div className="col form-group">
                      <select
                        id="payment_terms"
                        className="form-control col-md-4"
                      // onChange={paytemval}
                      >
                        <option hidden value=''>Select the term...</option>
                        {
                          paymentterm.map((item, index) =>
                            <option key={index} value={item.term_days}>{item.term}</option>)
                        }

                      </select>
                    </div>
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
                      // onChange={tdsval}
                      >
                        <option value='' hidden>Choose the value...</option>
                        <option>Nethh 15</option>

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
                      <input className="form-check-input" type="checkbox" onClick={portaltoggle} />
                      <label className="form-check-label" htmlFor="flexCheckDefault" > Allow portal access for this vendor </label>
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
                      // onChange={portallang}
                      >
                        <option>English</option>
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
                <div className="Address mt-3 " id="addressdiv" style={{ display: "none" }}>
                  <div
                    className="Address_left"
                    style={{ width: "50%", float: "left" }}
                  >
                    <label>BILLING ADDRESS</label>

                    <div className="form-row">
                      <label
                        htmlFor="billing_address_country"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        Country <span className="text-danger">*</span>
                      </label>
                      <div className="col form-group">
                        <select
                          id="billing_address_country"
                          className="form-control col-md-7"
                          onChange={handleAddressCountry}
                        >
                          <option value='' hidden> Select Country</option>
                          {
                            countrylist.map((data, index) => (
                              <option key={index} value={data.country_name}>{data.country_name}</option>
                            ))

                          }

                        </select>
                      </div>


                    </div>
                    <div className="form-row">
                      <label htmlFor="billing_address_state" className="col-md-2 col-form-label font-weight-normal">State <span className="text-danger">*</span></label>

                      <div className="col form-group">
                        <select
                          id="billing_address_state"
                          className="form-control col-md-7"
                          onChange={handleChangebillingState}
                        >
                          <option value='' hidden> Select State</option>
                          {
                            selectState.map((data, index) => (
                              <option key={index} value={data.state_name}>{data.state_name}</option>
                            ))
                          }
                        </select>
                      </div>

                    </div>

                    <div className="form-row">
                      <label
                        htmlFor="billing_address_city"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        City <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-6 form-group">
                        <select
                          id="billing_address_city"
                          className="form-control"
                        // onChange={handleAddressCity}
                        >
                          <option hidden value=''> Choose</option>
                          {
                            selectCity.map((data, index) => (
                              <option key={index} value={data.city_name}>{data.city_name}</option>
                            ))

                          }

                        </select>
                      </div>

                    </div>
                    <div className="form-row">
                      <label
                        htmlFor="billing_address_attention"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        Address <span className="text-danger">*</span>
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
                      <label htmlFor="billing_address_pincode" className="col-md-2 col-form-label font-weight-normal"> Zip Code <span className="text-danger">*</span></label>
                      <div className="col form-group">
                        <input
                          type="number"
                          id="billing_address_pincode"
                          className="form-control col-md-7"
                          value={billpincount}
                          onChange={(e) => {
                            if (e.target.value.length === 7) return false;
                            setBillpincount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <label
                        htmlFor="billing_address_phone"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        Phone<span className="text-danger">*</span>
                      </label>
                      <div className="col form-group">
                        <input
                          type="number"
                          id="billing_address_phone"
                          className="form-control col-md-7"
                          value={billphonecount}
                          onChange={(e) => {
                            if (e.target.value.length === 11) return false;
                            setBillphonecount(e.target.value);
                          }}
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
                  </div>
                </div>
                {/*--------- Remark ---------- */}
                <div className="form-column" id="remarkdiv" style={{ display: "none" }}>
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
                      rows="5"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </div>
                {/*---------Add Contact Person ---------- */}
                <div className="Address mt-3" id="contactdiv" style={{ display: "none" }}>
                  <label>Contact Person</label>
                  <div className="form-row">
                    <label
                      htmlFor="contact_person_name"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      Name <span className="text-danger">*</span>
                    </label>
                    <div className="col form-group">
                      <input
                        type="text"
                        id="contact_person_name"
                        className="form-control col-md-4"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="contact_person_email" className="col-md-2 col-form-label font-weight-normal">Email Address</label>
                    <div className="col form-group">
                      <input type="email" id="contact_person_email" className="form-control col-md-4" />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_person_work_phone" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                    <div className="col form-group">
                      <input type="number" id="contact_person_work_phone" className="form-control col-md-4"
                        value={contworkphonecount}
                        onChange={(e) => {
                          if (e.target.value.length === 11) return false;
                          setContworkphonecount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_person_phone" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                    <div className="col form-group">
                      <input type="number" id="contact_person_phone" className="form-control col-md-4"
                        value={contphonecount}
                        onChange={(e) => {
                          if (e.target.value.length === 11) return false;
                          setContphonecount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_person_skype" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                    <div className="col form-group">
                      <input type="text" id="contact_person_skype" className="form-control col-md-4" />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_person_designation" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                    <div className="col form-group">
                      <input type="text" id="contact_person_designation" className="form-control col-md-4" />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_person_department" className="col-md-2 col-form-label font-weight-normal">Department</label>
                    <div className="col form-group">
                      <input type="text" id="contact_person_department" className="form-control col-md-4" />
                    </div>
                  </div>
                </div>
              </form>
            </article>
            <div className="border-top card-footer">
              <button className="btn btn-success mx-3" id="submitbtn" onClick={handleClick}>Save Vendor</button>
              <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = './Showvendor' }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer theme={themeval} />
    </div>
  );
};
export default Vendor;
