import React, {useEffect, useState } from 'react'
import {showOrganisation,updateOrganisation} from "../../api/index";


function ShowOrganisation() {
    const[data,setData] = useState({})

    const Orgdetails = async (e) => {
        e.preventDefault();
        // const org_country = document.getElementById("org_country").value;
        const org_street = document.getElementById("org_street").value;
        const org_city = document.getElementById("org_city").value;
        const org_pincode = document.getElementById("org_pin").value;
        const org_contact_name = document.getElementById("org_contact_name").value;
        const org_contact_phone = document.getElementById("org_contact_phone").value;
        const org_contact_email = document.getElementById("org_contact_email").value;
        const org_gst = document.getElementById("org_gst").value;
    
        console.log(org_street,org_city,org_pincode,org_contact_name,org_contact_phone,org_contact_email,org_gst)

        const result = await updateOrganisation(localStorage.getItem('Organisation_details'),org_contact_name,org_contact_phone,org_contact_email,org_street,org_city,org_pincode,org_gst)
        if(result){
          alert('Updated')
          window.location.href='/home';
          localStorage.removeItem('Organisation_details')
        }
      };

      const handleChangeContactname = (e) => {
        setData({...data,org_contact_name:e.target.value})
     }
     const handleChangeContactPhone = (e) => {
        setData({...data,org_contact_phone:e.target.value})
     }
     const handleChangeContactEmail = (e) => {
        setData({...data,org_contact_email:e.target.value})
     }
     const handleChangeStreet = (e) => {
        setData({...data,org_street:e.target.value})
     }
     const handleChangeCity = (e) => {
        setData({...data,org_city:e.target.value})
     }
     const handleChangePin = (e) => {
        setData({...data,org_pincode:e.target.value})
     }
     const handleChangeGst = (e) => {
        setData({...data,org_gst:e.target.value})
     }

    useEffect(async() => {
        const result = await showOrganisation(localStorage.getItem('Organisation_details'))
        console.log('Result',result)
        setData(result)
         }, [])

  return (
    <>
    <div className="orgcontainer">
      <br />
      <p className="text-center" >
        AWL is your end-to-end online accounting software.
      </p>
      <div className="row justify-content-center " style={{ width: "100%" }}>
        <div className="col-md-6">
          <div className="card">
            <article
              className="card-body"
              style={{ borderTop: "3.5px solid blue" }}
            >
              <h3 style={{ textAlign: "center" }}>
                Set up your organization profile
              </h3>
              <br />

              <form autoComplete="off">
                <div className="form-group">
                  <label>Organization Name <span style={{ color: "red" }}>*</span> </label>

                  <input type="text" className="form-control" id="org_name" disabled value={data.org_name}/>
                </div>
                <div className="form-row">
                  <div className="col form-group">
                    <label>
                      Business Location<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder
                      value={data.org_country}
                      id="org_country"
                      required
                      disabled
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      State/Union Territory
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder
                      value={data.org_state}
                      id="org_country"
                      
                      disabled
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                </div>
              
                <div id="formallbox">
                  <div className="form-row">
                    <div className="col form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Person Name"
                        id='org_contact_name'
                        value={data.org_contact_name}
                        onChange={(e)=> handleChangeContactname(e)} 
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        className="form-control"
                        type="text" oninput="numberOnly(this.id);"
                        maxlength="12"
                        placeholder="Contact Mobile no."
                        id='org_contact_phone'
                        value={data.org_contact_phone}
                        onChange={(e)=> handleChangeContactPhone(e)} 

                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Contact Email"
                      id='org_contact_email'
                      value={data.org_contact_email}
                      onChange={(e)=> handleChangeContactEmail(e)} 

                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street"
                      id='org_street'
                      value={data.org_street}
                      onChange={(e)=> handleChangeStreet(e)} 
                    />
                  </div>

                  <div className="form-row">
                    <div className="col form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        id='org_city'
                        value={data.org_city}
                        onChange={(e)=> handleChangeCity(e)} 

                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        oninput="numberOnly(this.id);"
                        maxlength="6"
                        className="form-control"
                        placeholder="Zip/Postal Code"
                        id="org_pin"
                        value={data.org_pincode}
                        onChange={(e)=> handleChangePin(e)} 
                      />
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-5 col-form-label">
                        Orgaisation logo (optional) :-
                      </label>
                      <input
                        type="file"
                        className="form-control col-md"
                        placeholder=""
                        accept=".jpg, .jpeg, .png"
                      />
                    </div>
                  </div>
                </div>
                <p className="regtext">REGIONAL SETTINGS</p>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Currency</label>
                    <input
                      type="text"
                      className="form-control"
                      value={data.org_currency}
                      id="org_currency"
                      placeholder
                      disabled
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Language</label>
                    <input
                      type="text"
                      className="form-control"
                      value={data.org_lang}
                      id="org_lang"
                      placeholder
                      disabled
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                    <label>GST No</label>

                      <input
                        type="text"
                        className="form-control"
                        id="org_gst"
                        placeholder="Enter Your GSTIN"
                        value={data.org_gst}
                        onChange={(e)=> handleChangeGst(e)} 

                        style={{ fontSize: "15px" }}
                      />
                    </div>
                  </div>
             
                <hr />
                <div classNmae="form-group">
                  <label className="col-md-4 control-label" htmlfor="save"></label>
                  <div className="col-md-20" style={{ width: "100%" }}>
                    <button id="save" name="save" onClick={Orgdetails} className="btn btn-success">
                      Update
                    </button>
                    <button id="clear" onClick={(e) => {
                      e.preventDefault(); window.location.href = '/home';localStorage.removeItem('Organisation_details')
                    }} name="clear" className="btn ml-2">
                      Cancel
                    </button>
                    <a href="#" style={{ float: "right" }}>
                      Privacy Policy
                    </a>


                  </div>
                </div>
              </form>


            </article>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ShowOrganisation
