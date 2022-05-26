import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import {ShowCustomer,UpdateCustomer} from '../../api';

 const EditCustomer =()=> {
    // const [show, setShow] = useState(true);
    // const [address, setAddress] = useState(false);
    // const [showremark, setShowremark] = useState(false);
    // const [contactperson, setContactperson] = useState(false);
    const [texpreferance, setTexprefernace] = useState(false);
    const [showMaster, setShowMaster] = useState(true);
    const [showMasterdropdown, setShowMasterdropdown] = useState(false);
    const [data, setData] = useState({});
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect (async()=>{
      const result = await ShowCustomer(localStorage.getItem('CustSno'))
      setData(result)
      console.log(result)
      const fullname = result.cust_name
      console.log(fullname)
      const Split = fullname.split(' ')
      if(Split.length>2){Split.shift()}
      console.log(Split)
      console.log(Split)
      setFirstname(Split[0])
      setLastname(Split[1])

      if(result.cust_type='Individual'){
        document.getElementById('Individual').checked = true
      }else{
        document.getElementById('Business').checked = true
      }

      if(result.tax_preference='Taxable'){
        document.getElementById('Taxable').checked = true
      }
      else{
        document.getElementById('Tax Exempt').checked = true
      }

      // if(result.enable_portal = 'true'){
      //   document.getElementById('click').checked = true
      // }
      
      if(result.gstin_uin){
        document.getElementById('gstin').style ="block"
      }

    },[])


    const handleClick = async(e) => {
      e.preventDefault()
      const cust_email = document.getElementById('cust_email').value
      const cust_work_phone = document.getElementById('cust_work_phone').value
      const cust_phone = document.getElementById('cust_phone').value
      const contact_person_name = document.getElementById('contact_person_name').value
      const contact_person_email = document.getElementById('contact_person_email').value
      const contact_person_work_phone = document.getElementById('contact_person_work_phone').value
      const contact_person_phone = document.getElementById('contact_person_phone').value
      const contact_person_skype = document.getElementById('contact_person_skype').value
      const contact_person_designation = document.getElementById('contact_person_designation').value
      const contact_person_department = document.getElementById('contact_person_department').value
      const remark = document.getElementById('remark').value
      console.log(cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark)

      const result = await UpdateCustomer(localStorage.getItem('CustSno'),cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
      contact_person_department,remark)
      if(result){
        window.location.href="/TotalCustomer"
      }
      console.log(result)
    }
  
    const formshow = () => {
      document.getElementById("distoggle").style.display = "block";
      document.getElementById("newlinepid").style.display = "none";
    };
  
    // const selectgst = () => {
    //   var a = document.getElementById("gsttreatment").value;
    //   if (a == "Select GST Treatment" || a == "Unregistered Bussiness" || a == "Consumer" || a == "Overseas") {
    //     document.getElementById("gstin").style.display = "none";
    //   }
    //   else {
    //     document.getElementById("gstin").style.display = "flex";
    //   }
    // };
    const handleChangeCustEmail = (e) => {
      setData({...data,cust_email:e.target.value})
    }
    const handleChangeCustWorkPhone = (e) => {
      setData({...data,cust_work_phone:e.target.value})
    }
    const handleChangeCustPhone = (e) => {
      setData({...data,cust_phone:e.target.value})
    }
    const handleChangeContactPerson = (e) => {
      setData({...data,contact_person_name:e.target.value})
    }
    const handleChangeContactPersonEmail = (e) => {
      setData({...data,contact_person_email:e.target.value})
    }
    const handleChangeContactPersonWP = (e) => {
      setData({...data,contact_person_work_phone:e.target.value})
    }
    const handleChangeContactPersonPhone = (e) => {
      setData({...data,contact_person_phone:e.target.value})
    }
    const handleChangeContactPersonSkype = (e) => {
      setData({...data,contact_person_skype:e.target.value})
    }
    const handleChangeContactPersonDesignation = (e) => {
      setData({...data,contact_person_designation:e.target.value})
    }
    const handleChangeContactPersonDepartment = (e) => {
      setData({...data,contact_person_department:e.target.value})
    }
    const handleChangeRemark = (e) => {
      setData({...data,remark:e.target.value})
    }

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
                <br /> <h3 className="text-left ml-5">Edit Customer</h3>
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
                                  // onClick={()=> {setShowMaster(true);setShowMasterdropdown(false)}}
                                  checked="false" />
                                <span className="form-check-label font-weight-normal">
                                  Non Existing
                                </span>
                              </label>
                              <label className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="masterid"
                                  checked="checked"
                                  // onClick={()=> {setShowMaster(false);setShowMasterdropdown(true)}}
                                 
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
                              <input type="text" className="form-control col-md-4" value={data.mast_id} id='mast_id' 
                              disabled
                              placeholder/>
                            </div>
                            {/* form-group end.// */}
                          </div>):null }
  
                            {/* {showMasterdropdown ? (
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
                              {/* </div>):null} */} 
  
                              <div className="form-row">
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Customer Id
                            </label>
                            <div className="col form-group">
                              <input
                                type="text"
                                className="form-control col-md-4"
                                placeholder
                                value={data.cust_id}
                                id="cust_id"
                                disabled
                              />
                            </div>
                            {/* form-group end.// */}
                          </div>
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
                                  id="Individual"
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
                                  id="Business"
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
                                value={firstname}
                                id="customer_firstname"
                                disabled
                              />
                            </div>
                            {/* form-group end.// */}
                            <div className="col form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={lastname}
                                id="customer_lastname"
                                disabled
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
                                value={data.company_name}
                                id="company_name"
                                disabled
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
                              <input type="text" className="form-control col-md-4" placeholder value={data.cust_display_name} 
                              id="cust_display_name" disabled/>
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
                                value={data.cust_email}
                                id="cust_email"
                                onChange={handleChangeCustEmail}
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
                                value={data.cust_work_phone}
                                id="cust_work_phone"
                                onChange={handleChangeCustWorkPhone}

                              />
                            </div>
                            {/* form-group end.// */}
                            <div className="col form-group">
                              <input
                                type="tel"
                                className="form-control col-md-8"
                                placeholder="Mobile"
                                style={{ marginLeft: "-30px" }}
                                id="cust_phone"
                                value={data.cust_phone}
                                maxLength={10}
                                onChange={handleChangeCustPhone}
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
                                  value={data.skype_detail}
                                  disabled
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
                                  value={data.designation}
                                  disabled
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
                                  value={data.department}
                                  disabled
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
                                id="website"
                                value={data.website}
                                disabled
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
                                  // setAddress(true);
                                  // setShow(false);
                                  // setShowremark(false);
                                  // setContactperson(false);
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
                                  // setAddress(false);
                                  // setShow(false);
                                  // setShowremark(false);
                                  // setContactperson(true);
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
                              <button className="btn btn-link"
                               onClick={(e) => {
                                e.preventDefault();}}>
                                Custom Fields
                              </button>
                            </div>
                            {/* form-group end.// */}
                            <div className="col-md-2 form-group">
                              <button className="btn btn-link"
                               onClick={(e) => {
                                e.preventDefault();}}>
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
                            <div className="Other_Details mt-3" id="otherdtldiv"> 
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
                                    // onClick={selectgst}
                                    disabled>
                                    <option selected>{data.gst_treatment}</option>
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
                                    id="gstin_uin"
                                    value={data.gstin_uin}
                                    disabled
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
                                    value={data.pan_no}
                                    disabled
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
                                    disabled
                                  >
                                    <option selected>{data.place_of_supply}</option>
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
                                      id="Taxable"
                                      
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
                                      id="Non-Taxable"
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
                                      disabled
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
                                    disabled
                                  >
                                    <option selected>{data.currency}</option>
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
                                    id="opening_balance"
                                    value={data.opening_balance}
                                    disabled
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
                                    disabled
                                  >
                                    <option selected>{data.payment_terms}</option>
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
                                    id="click"
                                    checked={data.enable_portal='true'}
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
                                    className="form-control col-md-4" disabled
                                  >
                                       <option select>{data.portal_language}</option>
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
                                    id="facebook_url" 
                                    value={data.facebook_url}
                                   disabled
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
                                    id="twitter_url"
                                    value={data.twitter_url}
                                    disabled
                                  />
                                </div>
                              </div>
  
                            </div>
                        
                          {/*------------------------- Address   ---------------------------- */}
                          
                            <div className="Address mt-3" id="addressdiv" style={{display:"none"}}>
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
                                      type="text"
                                      className="form-control col-md-7"
                                      placeholder
                                      id="billing_address_attention"
                                      value={data.billing_address_attention}
                                      disabled
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
                                      disabled
                                    >
                                      <option selected>{data.billing_address_country}</option>
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
                                      placeholder
                                      id="billing_address_city"
                                      value={data.billing_address_city}
                                      disabled
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
                                      disabled
                                    >
                                      <option selected>{data.billing_address_state}</option>
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
                                      value={data.billing_address_pincode}
                                      disabled
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
                                      className="form-control col-md-7"
                                      placeholder
                                      id="billing_address_phone"
                                      maxLength={10}
                                      value={data.billing_address_phone}
                                      disabled
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
                                      value={data.billing_address_fax}
                                      disabled
                                    />
                                  </div>
                                </div>
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
                                  value={data.remark}
                                  cols="30"
                                  rows="5"
                                  onChange={handleChangeRemark}
                                ></textarea>
                              </div>
                              {/* form-group end.// */}
                            </div>
                        
                          {/*---------------------------  Add Contact Person ---------------------------- */}
                          
                            <div className="Address mt-3" id="contactdiv" style={{display:"none"}}>
                              {/* <div
                               className="Address_left"
                               style={{ width: "50%", float: "left" }}> */}
                              <label>Contact Person</label>
                              <div className="form-row">
                                <label
                                  htmlFor="contact_person_name"
                                  className="col-md-2 col-form-label font-weight-normal"
                                >
                                  First Name
                                </label>
                                <div className="col form-group">
                                  <input
                                    type="text"
                                    className="form-control col-md-4"
                                    placeholder
                                    id="contact_person_name"
                                    value={data.contact_person_name}
                                    onChange={handleChangeContactPerson}
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
                                  <input type="email" className="form-control col-md-4" placeholder  id="contact_person_email" value={data.contact_person_email} onChange={handleChangeContactPersonEmail}/>
                                </div>
                              </div>
                              <div className="form-row">
                                <label htmlFor="contact_person_work_phone" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                                <div className="col form-group">
                                  <input type="number" className="form-control col-md-4" placeholder id="contact_person_work_phone" value={data.contact_person_work_phone} onChange={handleChangeContactPersonWP}/>
                                </div>
                              </div>
                              <div className="form-row">
                                <label htmlFor="contact_person_phone" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                                <div className="col form-group">
                                  <input type="tel" className="form-control col-md-4" placeholder id="contact_person_phone" maxlength={10} value={data.contact_person_phone} onChange={handleChangeContactPersonPhone}/>
                                </div>
                              </div>
                              <div className="form-row">
                                <label htmlFor="contact_person_skype" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                                <div className="col form-group">
                                  <input type="text" className="form-control col-md-4" placeholder id="contact_person_skype" value={data.contact_person_skype} onChange={handleChangeContactPersonSkype}/>
                                </div>
                              </div>
                              <div className="form-row">
                                <label htmlFor="contact_person_designation" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                                <div className="col form-group">
                                  <input type="text" className="form-control col-md-4" placeholder id="contact_person_designation" value={data.contact_person_designation} onChange={handleChangeContactPersonDesignation}/>
                                </div>
                              </div>
                              <div className="form-row">
                                <label htmlFor="contact_person_department" className="col-md-2 col-form-label font-weight-normal">Department</label>
                                <div className="col form-group">
                                  <input type="text" className="form-control col-md-4" placeholder id="contact_person_department" value={data.contact_person_department} onChange={handleChangeContactPersonDepartment}/>
                                </div>
                              </div>
                            </div>
                            {/* </div> */}
                      
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success" onClick={handleClick}>Update </button>
                        <button className="btn btn-light ml-3" onClick={()=> window.location.href='/TotalCustomer'}>Close</button>
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
                          htmlFor="inputState"
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
                          htmlFor="addsymbol"
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
                          htmlFor="addcurrencyname"
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
    )

}


export default EditCustomer;
