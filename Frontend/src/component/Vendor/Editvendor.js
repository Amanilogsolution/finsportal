import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Vendor.css";
import { showvendor, UpdateVendor } from '../../api'
import LoadingPage from '../loadingPage/loadingPage';


const Vendor = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const themeval = localStorage.getItem('themetype')

  useEffect(() => {
    const fetchdata = async () => {
      const result = await showvendor(localStorage.getItem('Organisation'), localStorage.getItem('VendorSno'));
      setData(result)
      setLoading(true)

      if (result.gst_treatment === "Unregistered Bussiness" || result.gst_treatment === "Consumer" || result.gst_treatment === "Overseas") {
        document.getElementById("gstin").style.display = "none";
      }
      else {
        document.getElementById("gstin").style.display = "flex";
      }

      if (result.enable_portal === "true") {
        document.getElementById('portalcheck').checked = true;
      }
    }
    fetchdata();

  }, [])

  const formshow = () => {
    document.getElementById("distoggle").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };



  //  ###############   function for get data  #########
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)

    const sno = localStorage.getItem('VendorSno');
    const vend_email = document.getElementById('vend_email').value;
    const vend_work_phone = document.getElementById('vend_work_phone').value;
    const vend_phone = document.getElementById('vend_phone').value;
    const contact_person_name = document.getElementById('contact_person_fname').value;
    const contact_person_email = document.getElementById('contact_person_email').value;
    const contact_person_work_phone = document.getElementById('contact_person_work_phone').value;
    const contact_person_phone = document.getElementById('contact_person_phone').value;
    const contact_person_skype = document.getElementById('contact_person_skype').value;
    const contact_person_designation = document.getElementById('contact_person_designation').value;
    const contact_person_department = document.getElementById('contact_person_department').value;
    const remark = document.getElementById('remark').value;
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');


    const result = await UpdateVendor(sno, vend_email, vend_work_phone, vend_phone, contact_person_name, contact_person_email, contact_person_work_phone,
      contact_person_phone, contact_person_skype, contact_person_designation, contact_person_department, remark, org, User_id)
    if (result) {
      alert('Data Updated')
      window.location.href = '/Showvendor'
    }
    else {
      alert('Server Not Response')
      setLoading(true)
    }
  }

  const handleChangeVendworkphone = (e) => {
    const no = e.target.value;
    if (no.length === 11) return false;
    setData({ ...data, vend_work_phone: no })
  }
  const handleChangeVendphone = (e) => {
    const no = e.target.value;
    if (no.length === 11) return false;
    setData({ ...data, vend_phone: no })
  }
  const handleChangeContactwokphone = (e) => {
    const no = e.target.value;
    if (no.length === 11) return false;
    setData({ ...data, contact_person_work_phone: no })
  }
  const handleChangeContactphone = (e) => {
    const no = e.target.value;
    if (no.length === 11) return false;
    setData({ ...data, contact_person_phone: no })
  }

  //######################------------------------####################




  return (
    <div className="wrapper">
      <Header />
      {
        loading ?
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Vendor</h3>
              <div className="card" style={{ width: "100%" }}>
                <article className="card-body">
                  <form>
                    {/* <div className="form-row">
                          <div className="col form-group" id="valexisting" >
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal">
                              <div className="tooltip1">
                              </div>
                            </label>
                            <label className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="masterid" checked={false}
                                />
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
                              />
                              <span className="form-check-label font-weight-normal">
                                Existing Vendor
                              </span>
                            </label>
                          </div>
                        </div>
                        */}
                    <div className="form-row">
                      <label htmlFor="mast_id" className="col-md-2 col-form-label font-weight-normal">Master Id </label>
                      <div className="col form-group">
                        <input type="text" id="mast_id" className="form-control col-md-4 cursor-notallow" disabled defaultValue={data.mast_id} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label
                        htmlFor="vend_id"
                        className="col-md-2 col-form-label font-weight-normal">
                        Vendor Id </label>
                      <div className="col form-group">
                        <input
                          type="text"
                          className="form-control col-md-4 cursor-notallow"
                          id="vend_id"
                          disabled
                          defaultValue={data.vend_id}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <label
                        htmlFor="vend_name"
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
                      <div className="col form-group">
                        <input
                          type="text"
                          id="vend_name"
                          className="form-control col-md-4 cursor-notallow"
                          disabled
                          defaultValue={data.vend_name}
                        />
                      </div>
                    </div>
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
                          className="form-control col-md-4 cursor-notallow"
                          disabled
                          defaultValue={data.company_name}
                        />
                      </div>
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
                          className="form-control col-md-4 cursor-notallow"
                          id="vendis_name"
                          disabled
                          defaultValue={data.vend_display_name}
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
                          defaultValue={data.vend_email}
                        />
                      </div>
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
                          type="number"
                          id="vend_work_phone"
                          className="form-control col-md-8"
                          placeholder="Work Phone"
                          defaultValue={data.vend_work_phone}
                          onChange={handleChangeVendworkphone}
                        />
                      </div>
                      <div className="col form-group">
                        <input
                          type="number"
                          id="vend_phone"
                          className="form-control col-md-8"
                          placeholder="Mobile"
                          value={data.vend_phone}
                          maxLength={10}
                          onChange={handleChangeVendphone}
                          style={{ marginLeft: "-30px" }}
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
                            className="form-control col-md-4 cursor-notallow"
                            disabled
                            defaultValue={data.skype_detail}
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
                            className="form-control col-md-4 cursor-notallow"
                            disabled
                            defaultValue={data.designation}

                          />
                        </div>
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
                            className="form-control col-md-4 cursor-notallow"
                            disabled
                            defaultValue={data.department}
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
                          className="form-control col-md-4 cursor-notallow"
                          disabled
                          defaultValue={data.website}
                        />
                      </div>
                    </div>
                    <div className="form-row bg-light">
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
                      <div className="col-md-2 form-group">
                        <button className="btn btn-link"
                          onClick={(e) => {
                            e.preventDefault();
                          }}>
                          Custom Fields
                        </button>
                      </div>
                      <div className="col-md-2 form-group">
                        <button className="btn btn-link"
                          onClick={(e) => {
                            e.preventDefault();

                          }}>
                          Reporting Tags
                        </button>
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
                          <span style={{ color: "red" }}>
                            GST Treatment *
                          </span>
                        </label>
                        <div className="col form-group">
                          <input id="gsttreatment" className="form-control col-md-4 cursor-notallow" type='text' defaultValue={data.gst_treatment} disabled />

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
                          <span style={{ color: "red" }}>
                            GSTIN / UIN
                          </span>
                        </label>
                        <div className="col form-group">
                          <input
                            type="text"
                            id="gstin_uin"
                            className="form-control col-md-4 cursor-notallow"
                            maxLength={16}
                            disabled
                            defaultValue={data.gstin_uin}
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
                            type="number"
                            id="pan_no"
                            className="form-control col-md-4 cursor-notallow"
                            disabled
                            defaultValue={data.pan_no}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <label
                          htmlFor="source_of_supply"
                          className="col-md-2 col-form-label font-weight-normal">
                          <span style={{ color: "red" }}>
                            Source Of Supply *
                          </span>
                        </label>
                        <div className="col form-group">
                          <input type='text' id="source_of_supply"
                            className="form-control col-md-4 cursor-notallow"
                            disabled defaultValue={data.source_of_supply} />

                        </div>
                      </div>

                      <div className="form-row">
                        <label
                          htmlFor="currency"
                          className="col-md-2 col-form-label font-weight-normal"
                        >
                          <span style={{ color: "red" }}>Currency *</span>
                        </label>
                        <div className="col-md-4 form-group pr-0">
                          <input className="form-control col-md-10 cursor-notallow" id="currency" defaultValue={data.currency} disabled />
                          {/* <select
                                  id="currency"
                                  className="form-control col-md-10 "
                                  value={data.currency}
                                  disabled>

                                  <option> AED- UAE Dirham</option>
                                  <option>AUD- Australian Dollar</option>
                                  <option>CAD- Canadian Dollar</option>
                                  <option>CNY- Yuan Renminbi</option>
                                  <option>EUR- Euro</option>
                                  <option>INR- Indian Rupee</option>
                                </select> */}
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
                            type="text"
                            id="opening_balance"
                            className="form-control col-md-4 cursor-notallow"
                            defaultValue={data.opening_balance}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <label
                          htmlFor="payment_terms"
                          className="col-md-2 col-form-label font-weight-normal"
                        >
                          Payment Terms
                        </label>
                        <div className="col form-group">
                          <input type='text' id="payment_terms"
                            className="form-control col-md-4 cursor-notallow"
                            disabled defaultValue={data.payment_terms} />
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
                          <input type='text' id="tds"
                            className="form-control col-md-4 cursor-notallow"
                            disabled defaultValue={data.tds} />

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
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="portalcheck"
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
                            className="form-control col-md-4 cursor-notallow"
                            defaultValue={data.portal_language}
                            disabled
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
                            className="form-control col-md-4 cursor-notallow"
                            placeholder="www.facebook.com"
                            id="facebook_url"
                            type="url"
                            defaultValue={data.facebook_url}
                            disabled
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
                            className="form-control col-md-4 cursor-notallow"
                            placeholder="www.twitter.com"
                            id="twitter_url"
                            type="url"
                            defaultValue={data.twitter_url}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    {/*------------- Address-------------- */}
                    <div className="Address mt-3" id="addressdiv" style={{ display: "none" }}>
                      <div
                        className="Address_left"
                        style={{ width: "50%", float: "left" }}
                      >
                        <label>BILLING ADDRESS</label>
                        <div className="form-row">
                          <label
                            htmlFor="billing_address_attention"
                            className="col-md-3  col-form-label font-weight-normal"
                          >
                            Attention
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="billing_address_attention"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_attention}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="billing_address_country"
                            className="col-md-3 col-form-label font-weight-normal"
                          >
                            Country / Region
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="billing_address_country"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_country}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label
                            htmlFor="billing_address_city"
                            className="col-md-3 col-form-label font-weight-normal"> City
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="billing_address_city"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_city}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_state" className="col-md-3 col-form-label font-weight-normal">State</label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="billing_address_state"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_state}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="billing_address_pincode" className="col-md-3 col-form-label font-weight-normal"> Zip Code </label>
                          <div className="col form-group">
                            <input
                              type="number"
                              id="billing_address_pincode"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_pincode}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="billing_address_phone"
                            className="col-md-3 col-form-label font-weight-normal"
                          >
                            Phone
                          </label>
                          <div className="col form-group">
                            <input
                              type="tel"
                              id="billing_address_phone"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_phone}
                              maxLength={10}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <label
                            htmlFor="billing_address_fax"
                            className="col-md-3 col-form-label font-weight-normal"
                          >
                            Fax
                          </label>
                          <div className="col form-group">
                            <input
                              type="text"
                              id="billing_address_fax"
                              className="form-control col-md-7 cursor-notallow"
                              defaultValue={data.billing_address_fax}
                              disabled
                            />
                          </div>
                        </div>
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
                          cols="30"
                          rows="5"
                          defaultValue={data.remark}></textarea>
                      </div>
                    </div>
                    {/*---------Add Contact Person ---------- */}
                    <div className="Address mt-3" id="contactdiv" style={{ display: "none" }}>
                      <label>Contact Person</label>
                      <div className="form-row">
                        <label
                          htmlFor="contact_person_fname"
                          className="col-md-2 col-form-label font-weight-normal"
                        >
                          Name
                        </label>
                        <div className="col form-group">
                          <input
                            type="text"
                            id="contact_person_fname"
                            className="form-control col-md-4"
                            defaultValue={data.contact_person_name}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="contact_person_email" className="col-md-2 col-form-label font-weight-normal">Email Address</label>
                        <div className="col form-group">
                          <input type="email" id="contact_person_email"
                            className="form-control col-md-4"
                            defaultValue={data.contact_person_email} />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="contact_person_work_phone" className="col-md-2 col-form-label font-weight-normal">Work Phone</label>
                        <div className="col form-group">
                          <input type="number" id="contact_person_work_phone"
                            className="form-control col-md-4"
                            value={data.contact_person_work_phone}
                            onChange={handleChangeContactwokphone} />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="contact_person_phone" className="col-md-2 col-form-label font-weight-normal">Mobile</label>
                        <div className="col form-group">
                          <input type="number" id="contact_person_phone"
                            className="form-control col-md-4"
                            value={data.contact_person_phone}
                            onChange={handleChangeContactphone} />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="contact_person_skype" className="col-md-2 col-form-label font-weight-normal">Skype Name/Number</label>
                        <div className="col form-group">
                          <input type="text"
                            id="contact_person_skype"
                            className="form-control col-md-4"
                            defaultValue={data.contact_person_skype} />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="contact_person_designation" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                        <div className="col form-group">
                          <input type="text" id="contact_person_designation"
                            className="form-control col-md-4"
                            defaultValue={data.contact_person_designation} />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="contact_person_department" className="col-md-2 col-form-label font-weight-normal">Department</label>
                        <div className="col form-group">
                          <input type="text" id="contact_person_department"
                            className="form-control col-md-4"
                            defaultValue={data.contact_person_department} />
                        </div>
                      </div>
                    </div>
                  </form>
                </article>
                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = 'Showvendor' }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : <LoadingPage />
      }
      <Footer theme={themeval} />
    </div>
  );
};
export default Vendor;
