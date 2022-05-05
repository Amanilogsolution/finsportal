import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./Customer.css";
import Footer from "../Footer/Footer";
import { AddCustomer, Unique_Cust_id, Lastcust_id } from "../../api";
import { Totalcountry } from '../../api';
import { showstateCity } from '../../api';
import { getCity } from '../../api';

const Customer = () => {
  const [ucust_totalid, setUcust_totalid] = useState();
  const [getnewval, setGetnewval] = useState();
  const [checkdate, setCheckdate] = useState('false');
  const [trimtext, setTrimtext] = useState();
  const [finyear, setFinyear] = useState();
  const [year1, setYear1] = useState();
  const [year2, setYear2] = useState();
  const [texpreferance, setTexprefernace] = useState(false);
  const [showMaster, setShowMaster] = useState(true);
  const [showMasterdropdown, setShowMasterdropdown] = useState(false);
  const [cust_type, setCust_type] = useState();
  const [salute, Setsalute] = useState();
  const [gst_treatment, setGst_treatment] = useState();
  const [place_of_supply, setPlace_of_supply] = useState();
  const [tax_preference, setTax_preference] = useState();
  const [currency, setCurrency] = useState();
  const [payment_terms, setPayment_terms] = useState();
  const [enable_portal, setEnable_portal] = useState(false);
  const [portal_language, setPortal_language] = useState();
  const [billing_address_country, setBilling_address_country] = useState();
  const [billing_address_state, setBilling_address_state] = useState();
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [selectCity, setSelectCity] = useState([]);
  const [billing_address_city, setBilling_address_city] = useState();


  useEffect(async () => {
    const result = await Totalcountry()
    setSelectedCountry(result)
    const unique_id = await Unique_Cust_id()
    // console.log(unique_id)
    const lastcust_id = await Lastcust_id()
    // console.log(lastcust_id)

    setUcust_totalid(unique_id.cust_totalid)
    autoIncrementCustomId(unique_id.cust_totalid, unique_id.year, lastcust_id.cust_id)

  }, []);

  // ############### AutoIncrement Customer ID Start ################################### 

  function autoIncrementCustomId(lastRecordId, year, lastcust_id) {
    // console.log("lastRecordId"+lastRecordId)
    // console.log("year"+year)
    // console.log("lastcust_id"+lastcust_id)
    const a = new Date();
    // const month = 4
    // const date = 1
    const month = a.getMonth() + 1;
    const date = a.getDate();
    if (month === 4 && date === 1)
     {
      const preyear = a.getFullYear()
      const nextyear = a.getFullYear() + 1
      const combyear = preyear + '-' + nextyear;
      setFinyear(combyear);
      setYear1("31-03-" + preyear)
      setYear2("01-04-" + nextyear) 
      const last2 = combyear.substring(7, 9);
      setTrimtext(last2);
      setCheckdate('true')
      const lastcust2 = lastcust_id.substring(1, 3);
      if(lastcust2==last2)
      {
       setCheckdate('false')
       const lastdigitval =lastcust_id.substring(4, 10);
       const lastintval=parseInt(lastdigitval)+1;
       setGetnewval(lastintval);
       const cust_newid='C'+last2+'-'+lastintval;
       setUcust_totalid(cust_newid)
       localStorage.setItem("cust_id",ucust_totalid);
      }
      else
      {
         const intvalue=0;
         const value=intvalue+1;
         setGetnewval(value);
         const cust_newid='C'+last2+'-'+value;
         setUcust_totalid(cust_newid)
         localStorage.setItem("cust_id",ucust_totalid);
      }
    }
    else 
    {
      const value = parseInt(lastRecordId) + 1;
      setGetnewval(value);
      const cust_newid = 'C' + year + '-' + value;
      setUcust_totalid(cust_newid)
      localStorage.setItem("cust_id",ucust_totalid);
      // console.log(localStorage.getItem("cust_id"));
    }
  }

  // ############### AutoIncrement Customer ID End   ###################################


  const handleClick = async (e) => {
    e.preventDefault();
    const dateval = checkdate;
    const trimyear = trimtext;
    const mast_id = document.getElementById('mast_id').value;
    const cust_id = ucust_totalid;
    const customer_firstname = document.getElementById('customer_firstname').value;
    const customer_lastname = document.getElementById('customer_lastname').value;
    const cust_name = salute + " " + customer_firstname + " " + customer_lastname;
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
    const exemption_reason = document.getElementById('exemption_reason').value;
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

    // console.log(cust_id);
    // console.log(trimyear);

    // console.log(mast_id, cust_id, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, currency,
    //   opening_balance, payment_terms, enable_portal, portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax,
    //   contact_person_name, contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation, contact_person_department, remark);

    const result = await AddCustomer(getnewval, dateval, finyear, trimyear, year1, year2, mast_id, cust_id, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, currency,
      opening_balance, payment_terms, enable_portal, portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
      billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
      contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
      contact_person_department, remark);
    // console.log(result)
      if(result){
        window.location.href = "/TotalCustomer";
    }


    // console.log(mast_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
    //   opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
    //   billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
    //   contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    //   contact_person_department,remark)
  }

  const handleChange = (e) => {
    let data = e.target.value;
    setCust_type(data);
  }

  const handleChangeSalute = (e) => {
    let data = e.target.value;
    Setsalute(data);
  }

  const handleChangeSupply = (e) => {
    let data = e.target.value;
    setPlace_of_supply(data);
  }

  const handleChangetextPreferance = (e) => {
    let data = e.target.value;
    setTax_preference(data);
  }

  const handleChangeCurrency = (e) => {
    let data = e.target.value;
    setCurrency(data);
  }
  const handleChangePaymentTerms = (e) => {
    let data = e.target.value;
    setPayment_terms(data);
  }
  const handleClickportal = (e) => {
    // console.log(enable_portal)
    if (enable_portal === false) {
      setEnable_portal(true);
    }
    else {
      setEnable_portal(false);
    }
  }
  const handleChangePortalLanguage = (e) => {
    let data = e.target.value;
    setPortal_language(data);
  }
  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    setBilling_address_country(data);
    const statesresult = await showstateCity(data)
    // console.log(statesresult)
    setSelectState(statesresult)
  }
  const handleChangebillingState = async (e) => {
    let data = e.target.value;
    setBilling_address_state(data);
    const result = await getCity(data)
    setSelectCity(result)
    // console.log(result)
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
                                onClick={() => { setShowMaster(true); setShowMasterdropdown(false) }}
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
                                Existing Customer
                              </span>
                            </label>
                          </div>
                        </div>

                        {showMaster ? (
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='mast_id' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>) : null}
                        {showMasterdropdown ? (
                          <div className="form-row" id='masterdropdown'>
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                            <div className="col form-group">
                              <select
                                id="gsttreatment"
                                className="form-control col-md-4">
                                <option selected>Select Master ID</option>

                              </select>
                            </div>
                            {/* form-group end.// */}
                          </div>) : null}

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
                              className="form-control col-md-4"
                              value={ucust_totalid}
                              disabled
                              placeholder
                            />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row" onChange={handleChange}>
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
                              onChange={handleChangeSalute}
                              id="inputSalute"
                              className="form-control col-md-"
                            >
                              <option selected> Salutation</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Miss.">Miss.</option>
                              <option value="Dr.">Dr.</option>
                            </select>
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First name"
                              id="customer_firstname"
                              required
                            />
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last name"
                              id="customer_lastname"
                              required
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
                              id="company_name"
                              required
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
                            <input type="text" className="form-control col-md-4" placeholder id="cust_display_name" />
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
                            />
                          </div>
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <input
                              type="number"
                              className="form-control col-md-8"
                              placeholder="Mobile"
                              id="cust_phone"
                              required
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
                                id="skype_detail"
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
                                id="designation"
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
                                id="department"
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
                            <input type="url" className="form-control col-md-4" placeholder id="website" />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row bg-light">
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
                          {/* form-group end.// */}
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
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button className="btn btn-link" onClick={(e) => { e.preventDefault(); }}>
                              Custom Fields
                            </button>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-2 form-group">
                            <button className="btn btn-link" onClick={(e) => { e.preventDefault(); }}>
                              Reporting Tags
                            </button>
                          </div>
                          {/* form-group end.// */}
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
                          {/* form-group end.// */}
                        </div>
                        {/* form-row end.// */}

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
                                placeholder
                                id="gstin_uin"
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
                                id="inputState"
                                className="form-control col-md-4"
                                onChange={handleChangeSupply}
                              >
                                <option selected>Select the state</option>
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
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row" onChange={handleChangetextPreferance}>
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
                                <input
                                  id="exemption_reason"
                                  className="form-control col-md-4"
                                  placeholder=""
                                />
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
                                onChange={handleChangeCurrency}
                              >
                                <option selected> AED- UAE Dirham</option>
                                <option value="AUD- Australian Dollar">AUD- Australian Dollar</option>
                                <option value="CAD- Canadian Dollar">CAD- Canadian Dollar</option>
                                <option value="CNY- Yuan Renminbi">CNY- Yuan Renminbi</option>
                                <option value="EUR- Euro">EUR- Euro</option>
                                <option value="INR- Indian Rupee">INR- Indian Rupee</option>
                              </select>
                            </div>

                            {/* <div className=" form-group">
                              <button
                                type="button"
                                className="btn btn-primary "
                                data-toggle="modal"
                                data-target="#exampleModal"
                              >
                                Add Currency
                              </button>
                            </div> */}
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
                                id="opening_balance"
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
                                onChange={handleChangePaymentTerms}
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
                            <div className="form-check" onClick={handleClickportal}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="click"
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
                                id="inputState"
                                className="form-control col-md-4"
                                onChange={handleChangePortalLanguage}
                              >
                                <option selected>English</option>
                                <option value="हिंदी">हिंदी</option>
                                <option value="عربي">عربي</option>
                                <option value="বাংলা">বাংলা</option>
                                <option value="中国人">中国人</option>
                                <option value="Deutsch">Deutsch</option>
                              </select>
                            </div>
                            {/* form-group end.// */}
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
                                <input type="text"
                                  className="form-control col-md-7"
                                  placeholder
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
                                  <option selected hidden> Select</option>
                                  {
                                    selectedCountry.map((data) => (
                                      <option value={data.country_name}>{data.country_name}</option>
                                    ))

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
                                  <option selected> Choose</option>
                                  {
                                    selectCity.map((data) => (
                                      <option value={data.city_name}>{data.city_name}</option>
                                    ))

                                  }

                                </select>
                              </div>
                              {/* form-group end.// */}
                            </div>

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
                                  id="billing_address_city"
                                />
                              </div>
                            </div> */}

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
                                  <option selected> Choose</option>
                                  {
                                    selectState.map((data) => (
                                      <option value={data.state_name}>{data.state_name}</option>
                                    ))
                                  }
                                </select>
                              </div>
                              {/* form-group end.// */}
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
                                  placeholder
                                  id="billing_address_pincode"
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
                                  placeholder
                                  id="billing_address_phone"
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
                                  placeholder
                                  id="billing_address_fax"
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
                                  type="text"
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
                                  <option selected>Select</option>
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
                                  type="number"
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
                                  type="number"
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
                          {/* form-group end.// */}
                        </div>

                        {/*---------------------------  Add Contact Person ---------------------------- */}

                        <div className="Address mt-3" id="contactdiv" style={{ display: "none" }}>
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
                                id="contact_person_name"
                              />
                            </div>
                          </div>
                          {/* <div className="form-row">
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Last Name</label>
                              <div className="col form-group">
                                <input type="name" className="form-control col-md-4" placeholder />
                              </div>
                            </div> */}
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Email Address</label>
                            <div className="col form-group">
                              <input type="email" className="form-control col-md-4" placeholder id="contact_person_email" />
                            </div>
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" placeholder id="contact_person_work_phone" />
                            </div>
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" placeholder id="contact_person_phone" />
                            </div>
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" placeholder id="contact_person_skype" />
                            </div>
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" placeholder id="contact_person_designation" />
                            </div>
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Department</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" placeholder id="contact_person_department" />
                            </div>
                          </div>
                        </div>

                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success " onClick={handleClick}>Save</button>
                      <button className="btn btn-light ml-3" onClick={() => window.location.href = '/TotalCustomer'}>Close</button>
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
