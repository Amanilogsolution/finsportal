import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
// import Menu from "../Menu/Menu";
import "./Customer.css";
import Footer from "../Footer/Footer";
import { Activecountries, showactivestate, getCity, Getfincialyearid, CustomerMastId, ActivePaymentTerm, AddCustomer, ActiveCurrency } from '../../api';


const Customer = () => {
  const [custworkphonecount, setCustworkphonecount] = useState()
  const [custphonecount, setCustphonecount] = useState()
  const [billpincount, setBillpincount] = useState()
  const [billphonecount, setBillphonecount] = useState()
  const [contphonecount, setContphonecount] = useState()
  const [contworkphonecount, setContworkphonecount] = useState()
  const [totalmastid, setTotalmastid] = useState([]);
  const [showMaster, setShowMaster] = useState(true);
  const [cust_type, setCust_type] = useState();
  const [gst_treatment, setGst_treatment] = useState();
  const [tax_preference, setTax_preference] = useState();
  const [currencylist, setCurrencylist] = useState([]);
  const [enable_portal, setEnable_portal] = useState(false);
  // const [portal_language, setPortal_language] = useState();
  const [billing_address_country, setBilling_address_country] = useState();
  const [billing_address_state, setBilling_address_state] = useState();
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [paymentterm, setPaymentterm] = useState([]);
  const [billing_address_city, setBilling_address_city] = useState();
  const [generatedmcust, setGeneratedmcust] = useState();
  const [generatedcust, setGeneratedcust] = useState();
  const themeval = localStorage.getItem('themetype')

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation');
      const result = await Activecountries(org)
      setSelectedCountry(result)
      const datacurrency = await ActiveCurrency(org)
      setCurrencylist(datacurrency)

      const Allmaster_id = await CustomerMastId(org);
      setTotalmastid(Allmaster_id);

      const paymet_term = await ActivePaymentTerm(org)

      setPaymentterm(paymet_term)

      const getyear = await Getfincialyearid(org)

      // ################ id for master customer start
      let mastid = getyear[0].mcust_count;
      mastid = Number(mastid) + 1;
      mastid = '' + mastid
      mastid = mastid.padStart(4, '0')
      const generateMast_id = "MCUST" + getyear[0].year + mastid
      setGeneratedmcust(generateMast_id)
      // ################ id for master customer Id end

      // ############# id for  customer ID start
      let custidno = Number(getyear[0].cust_count) + 1
      let custid = '' + custidno
      custid = custid.padStart(4, '0')
      const generateCust_id = "CUST" + getyear[0].year + custid
      setGeneratedcust(generateCust_id)

      // ##############id for  customer ID end
    }
    fetchdata();
  }, []);


  const handleClick = async (e) => {
    e.preventDefault();
    const customer_firstname = document.getElementById('customer_firstname').value;
    const customer_lastname = document.getElementById('customer_lastname').value;
    const inputSalute = document.getElementById('inputSalute').value;
    const cust_name = inputSalute + " " + customer_firstname + " " + customer_lastname;
    const company_name = document.getElementById('company_name').value;
    const cust_display_name = document.getElementById('cust_display_name').value;
    const cust_email = document.getElementById('cust_email').value;
    const cust_work_phone = document.getElementById('cust_work_phone').value;
    const cust_phone = document.getElementById('cust_phone').value;
    const skype_detail = document.getElementById('skype_detail').value;
    const designation = document.getElementById('designation').value;
    const department = document.getElementById('department').value;
    const website = document.getElementById('website').value;
    const gstin_uin = document.getElementById('gstin_uin').value || "";
    const pan_no = document.getElementById('pan_no').value || "";
    const place_of_supply = document.getElementById('place_of_supply').value;
    const payment_terms = document.getElementById('payment_terms').value;
    const language = document.getElementById('language').value;
    const selectedcurrency = document.getElementById('selectedcurrency').value;
    const exemption_reason = document.getElementById('exemption_reason').value || "";
    const opening_balance = document.getElementById('opening_balance').value;
    const facebook_url = document.getElementById('facebook_url').value;
    const twitter_url = document.getElementById('twitter_url').value;
    const billing_address_attention = document.getElementById('billing_address_attention').value;

    // const billing_address_city = document.getElementById('billing_address_city').value;

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
    const User_id = localStorage.getItem("User_id");


    if (!customer_firstname) {
      alert('Please Enter Mandatory field')

    }
    else {

      if (showMaster) {
        const result = await AddCustomer(org, User_id, generatedmcust, generatedcust, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, selectedcurrency,
          opening_balance, payment_terms, enable_portal, language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
          billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
          contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
          contact_person_department, remark);

        if (result[0] > 0) {
          alert('Data Added')
          window.location.href = "/TotalCustomer";
        }
      }
      else {
        const masterid = document.getElementById('selectedmasterid').value;


        const result = await AddCustomer(org, User_id, masterid, generatedcust, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, selectedcurrency,
          opening_balance, payment_terms, enable_portal, language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
          billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
          contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
          contact_person_department, remark);

        if (result[0] > 0) {
          alert('Data Added')
          window.location.href = "/TotalCustomer";
        }

      }

    }
  }


  const handleChange = (e) => {
    let data = e.target.value;
    setCust_type(data);
  }




  const handleChangetextPreferance = (e) => {
    let data = e.target.value;
    setTax_preference(data);
  }


  const handleClickportal = (e) => {
    if (enable_portal === false) {
      setEnable_portal(true);
    }
    else {
      setEnable_portal(false);
    }
  }
  // const handleChangePortalLanguage = (e) => {
  //   let data = e.target.value;
  //   setPortal_language(data);
  // }
  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    setBilling_address_country(data);
    const statesresult = await showactivestate(data)
    setSelectState(statesresult)
  }
  const handleChangebillingState = async (e) => {
    let data = e.target.value;
    setBilling_address_state(data);
    const result = await getCity(data)
    setSelectCity(result)
  }
  const handleAddressCity = async (e) => {
    let data = e.target.value;
    setBilling_address_city(data);
  }

  const formshow = () => {
    document.getElementById("distoggle").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const selectgst = () => {
    var a = document.getElementById("gsttreatment").value;
    setGst_treatment(a);
    if (a === "Select GST Treatment" || a === "Unregistered Bussiness" || a === "Consumer" || a === "Overseas") {
      document.getElementById("gstin").style.display = "none";
    }
    else {
      document.getElementById("gstin").style.display = "flex";
    }
  };

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
      <Header />
      <div className="content-wrapper ">
        <div className="container-fluid">
          <h3 className="py-3 ml-5">New Customer</h3>
          <div className="card my-1  w-100">
            <article className="card-body">
              <form>
                <div className="form-row">
                  <div className="col form-group" id="valexisting" >
                    <label
                      htmlFor="user_name"
                      className="col-md-2 col-form-label font-weight-normal">
                      <div className="tooltip1">
                      </div>
                    </label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="masterid"
                        onClick={() => { setShowMaster(true); }}
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
                        onClick={() => { setShowMaster(false); }}
                      />
                      <span className="form-check-label font-weight-normal">
                        Existing Customer
                      </span>
                    </label>
                  </div>
                </div>

                {showMaster ? (
                  <>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4 cursor-notallow" id='mast_id' value={generatedmcust} disabled />
                      </div>
                    </div>
                  </>) :
                  <div className="form-row" id='masterdropdown'>
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                    <div className="col form-group">
                      <select
                        id="selectedmasterid"
                        className="form-control col-md-4"
                      >
                        <option value='' hidden >Select Master ID</option>
                        {
                          totalmastid ?
                            totalmastid.map((allid, index) => (
                              <option key={index}>{allid.mast_id}</option>
                            ))
                            : 0
                        }
                      </select>
                    </div>
                  </div>
                }


                <div className="form-row">
                  <label
                    htmlFor="cust_id"
                    className="col-md-2 col-form-label font-weight-normal" >
                    Customer Id
                  </label>
                  <div className="col form-group">
                    <input
                      type="text"
                      id="cust_id"
                      className="form-control col-md-4 cursor-notallow"
                      value={generatedcust}
                      disabled
                    />
                  </div>
                </div>


                <div className="form-row" onChange={handleChange}>
                  <div className="col form-group">
                    <label
                      htmlFor="user_name"
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
                      <input className="form-check-input" type="radio" name="Type" value="Bussiness" />
                      <span className="form-check-label font-weight-normal">
                        Bussiness
                      </span>
                    </label>
                    <label className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Type"
                        value="Individual"

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
                      id="inputSalute"
                      className="form-control col-md-"
                    >
                      <option value='' hidden> Salutation</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Miss.">Miss.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </div>
                  <div className="col-group-5 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      id="customer_firstname"
                      required
                    />
                  </div>
                  <div className="col-group-5 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      id="customer_lastname"
                      required
                    />
                  </div>
                </div>



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
                      id="company_name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">
                    <div className="tooltip1" style={{ border: "none" }}>
                      <span className="text-danger" style={{ borderBottom: "1px dashed red", }}>
                        Customer Display Name *
                      </span>
                      <span className="tooltipcontent">
                        This name will be displayed on the transaction
                        you create for this Customer.
                      </span>
                    </div>
                  </label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id="cust_display_name" />
                  </div>
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
                      id="cust_email"
                      required
                    />
                  </div>
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
                      type="number"
                      className="form-control col-md-8"
                      placeholder="Work Phone"
                      id="cust_work_phone"
                      required
                      value={custworkphonecount}
                      onChange={(e) => {
                        if (e.target.value.length === 11) return false;
                        setCustworkphonecount(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col form-group">
                    <input
                      type="number"
                      className="form-control col-md-8"
                      placeholder="Mobile"
                      id="cust_phone"
                      required
                      style={{ marginLeft: "-30px" }}
                      value={custphonecount}
                      onChange={(e) => {
                        if (e.target.value.length === 11) return false;
                        setCustphonecount(e.target.value)
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
                      htmlFor="user_name"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      Skype Name/Number
                    </label>
                    <div className="col form-group">
                      <input
                        type="text"
                        className="form-control col-md-4"
                        id="skype_detail"
                      />
                    </div>
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
                        id="designation"
                      />
                    </div>
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
                        id="department"
                      />
                    </div>
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
                    <input type="url" className="form-control col-md-4" id="website" />
                  </div>
                </div>

                <div className="form-row bg-light" >
                  <div className="col-md-2 form-group">
                    <button
                      className="btn btn-link"
                      onClick={(e) => {
                        e.preventDefault();

                        document.getElementById("remarkdiv").style.display = "none";
                        document.getElementById("addressdiv").style.display = "none";
                        document.getElementById("contactdiv").style.display = "none";
                        document.getElementById("otherdtldiv").style.display = "block";
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

                        document.getElementById("remarkdiv").style.display = "none";
                        document.getElementById("addressdiv").style.display = "block";
                        document.getElementById("contactdiv").style.display = "none";
                        document.getElementById("otherdtldiv").style.display = "none";
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

                        document.getElementById("remarkdiv").style.display = "none";
                        document.getElementById("addressdiv").style.display = "none";
                        document.getElementById("contactdiv").style.display = "block";
                        document.getElementById("otherdtldiv").style.display = "none";
                      }}
                    >
                      Contact Persons
                    </button>
                  </div>
                  <div className="col-md-2 form-group">
                    <button className="btn btn-link" onClick={(e) => { e.preventDefault(); }}>
                      Custom Fields
                    </button>
                  </div>
                  <div className="col-md-2 form-group">
                    <button className="btn btn-link" onClick={(e) => { e.preventDefault(); }}>
                      Reporting Tags
                    </button>
                  </div>
                  <div className="col-md-2 form-group">
                    <button
                      className="btn btn-link"
                      onClick={(e) => {
                        e.preventDefault();

                        document.getElementById("remarkdiv").style.display = "block";
                        document.getElementById("addressdiv").style.display = "none";
                        document.getElementById("contactdiv").style.display = "none";
                        document.getElementById("otherdtldiv").style.display = "none";
                      }}
                    >
                      Remarks
                    </button>
                  </div>
                </div>

                {/*----------------------- Other Details  ---------------------------------------------- */}

                <div className="Other_Details mt-3" id="otherdtldiv" >
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
                        <option value=''>Select GST Treatment</option>
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
                  </div>

                  <div className="form-row" id="gstin" style={{ display: "none" }}>
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">
                      <span style={{ color: "red" }}>
                        GSTIN / UIN*
                      </span>
                    </label>
                    <div className="col form-group">
                      <input
                        type="email"
                        className="form-control col-md-4"
                        maxLength="16"
                        id="gstin_uin"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label
                      htmlFor="user_name"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      PAN
                    </label>
                    <div className="col form-group">
                      <input
                        type="email"
                        className="form-control col-md-4"
                        id="pan_no"
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
                        id="place_of_supply"
                        className="form-control col-md-4"
                      >
                        <option value='' hidden>Select the state</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row" onChange={handleChangetextPreferance}>
                    <div className="col form-group">
                      <label
                        htmlFor="user_name"
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
                          onClick={() => document.getElementById('exemptionreasonbox').style.display = "none"}
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
                          onClick={(e) => { document.getElementById('exemptionreasonbox').style.display = "flex" }}
                        />
                        <span className="form-check-label font-weight-normal">
                          Tax Exempt
                        </span>
                      </label>
                    </div>
                  </div>

                  {/*---------------------------------- toogle exemption reason start -----------------------------------*/}

                  <div className="form-row " id="exemptionreasonbox" style={{ display: "none" }}>

                    <label
                      htmlFor="exemption_reason"
                      className="col-md-2 col-form-label font-weight-normal">
                      <span style={{ color: "red" }}>
                        Exemption Reason *
                      </span>
                    </label>
                    <div className=" form-group col" >
                      <input
                        id="exemption_reason"
                        className="form-control col-md-4"
                        type="text"
                      />
                    </div>

                  </div>

                  {/*---------------------------------- toogle exemption reason end -----------------------------------*/}




                  <div className="form-row" >
                    <label
                      htmlFor="user_name"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      <span style={{ color: "red" }}>Currency *</span>
                    </label>
                    <div className="col-md-4 form-group pr-0">
                      <select
                        id="selectedcurrency"
                        className="form-control col-md-10 "
                        data-live-search="true"

                      >
                        <option hidden value=''>Select Currency</option>
                        {
                          currencylist ?
                            currencylist.map((item, index) =>
                              <option key={index}>{item.currency_name}</option>)
                            :
                            0
                        }
                      </select>
                    </div>

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
                        id="opening_balance"
                      />
                    </div>
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
                        id="payment_terms"
                        className="form-control col-md-4"
                      >
                        <option value='' hidden>Select term</option>
                        {
                          paymentterm ?
                            paymentterm.map((item, index) =>
                              <option key={index}>{item.term}</option>)
                            : 0
                        }
                      </select>
                    </div>
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
                    <div className="form-check" onClick={handleClickportal}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="click"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Allow portal access for this customer
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <label
                      htmlFor="inputState"
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
                        id="language"
                        className="form-control col-md-4"
                      // onChange={handleChangePortalLanguage}
                      >
                        <option value='English'>English</option>
                        <option value="हिंदी">हिंदी</option>
                        <option value="عربي">عربي</option>
                        <option value="বাংলা">বাংলা</option>
                        <option value="中国人">中国人</option>
                        <option value="Deutsch">Deutsch</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="facebook_url" className="col-md-2 col-form-label font-weight-normal" >
                      Facebook
                    </label>
                    <div className="col form-group input-group">
                      <input className="form-control col-md-4" placeholder="www.facebok.com" type="url" id="facebook_url" />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="twitter_url"
                      className="col-md-2 col-form-label font-weight-normal"
                    >
                      Twitter
                    </label>
                    <div className="col form-group input-group">
                      <input
                        className="form-control col-md-4"
                        placeholder="www.twitter.com"
                        type="url"
                        id="twitter_url"
                      />
                    </div>
                  </div>

                </div>

                {/*------------------------- Address   ---------------------------- */}

                <div className="Address mt-3" id="addressdiv" style={{ display: "none" }}>
                  <div
                    className="Address_left"
                    style={{ width: "70%" }}>
                    <label>BILLING ADDRESS</label>
                    <div className="form-row">
                      <label
                        htmlFor="billing_address_attention"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        Attention
                      </label>
                      <div className="col form-group">
                        <input type="text"
                          className="form-control col-md-7"
                          id="billing_address_attention"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <label
                        htmlFor="inputState"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        Country / Region
                      </label>
                      <div className="col-md-6 form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={handleAddressCountry}
                        >
                          <option value='' hidden> Select</option>
                          {
                            selectedCountry ?
                              selectedCountry.map((data, index) => (
                                <option key={index} value={data.country_name}>{data.country_name}</option>
                              ))
                              : 0
                          }

                        </select>
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
                          onChange={handleChangebillingState}
                        >
                          <option value='' hidden> Select State</option>
                          {
                            selectState ?
                              selectState.map((data, index) => (
                                <option key={index} value={data.state_name}>{data.state_name}</option>
                              ))
                              : 0
                          }
                        </select>
                      </div>
                      {/* form-group end.// */}
                    </div>
                    <div className="form-row">
                      <label
                        htmlFor="inputState"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        City
                      </label>
                      <div className="col-md-6 form-group">
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={handleAddressCity}
                        >
                          <option value='' hidden> select city</option>
                          {
                            selectCity ?
                              selectCity.map((data, index) => (
                                <option key={index} value={data.city_name}>{data.city_name}</option>
                              ))
                              : 0

                          }

                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <label
                        htmlFor="billing_address_pincode"
                        className="col-md-2 col-form-label font-weight-normal"
                      >
                        Zip Code
                      </label>
                      <div className="col form-group">
                        <input
                          type="number"
                          className="form-control col-md-7"
                          id="billing_address_pincode"
                          value={billpincount}
                          onChange={(e) => {
                            if (e.target.value.length === 7) return false;
                            setBillpincount(e.target.value)
                          }}
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
                          type="number"
                          className="form-control col-md-7"
                          id="billing_address_phone"
                          value={billphonecount}
                          onChange={(e) => {
                            if (e.target.value.length === 11) return false;
                            setBillphonecount(e.target.value)
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
                          className="form-control col-md-7"
                          id="billing_address_fax"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*--------- Remark ---------- */}

                <div className="form-column" id="remarkdiv" style={{ display: "none" }}>
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
                      id="remark"
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                </div>

                {/*---------------------------  Add Contact Person ---------------------------- */}

                <div className="Address mt-3" id="contactdiv" style={{ display: "none" }}>
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
                        id="contact_person_name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Email Address</label>
                    <div className="col form-group">
                      <input type="email" className="form-control col-md-4" id="contact_person_email" />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id="contact_person_work_phone"
                        value={contworkphonecount}
                        onChange={(e) => {
                          if (e.target.value.length === 11) return false;
                          setContworkphonecount(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id="contact_person_phone"
                        value={contphonecount}
                        onChange={(e) => {
                          if (e.target.value.length === 11) return false;
                          setContphonecount(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id="contact_person_skype" />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id="contact_person_designation" />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Department</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id="contact_person_department" />
                    </div>
                  </div>
                </div>
                <div className="border-top card-footer">
                  <button type="submit" className="btn btn-success " onClick={handleClick} >Save</button>
                  <button className="btn btn-light ml-3" onClick={() => window.location.href = '/TotalCustomer'}>Close</button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
      <Footer theme={themeval} />
    </div>
  );
};

export default Customer;
