import "./org.css";
import { useState } from "react";
import { register, CreatenewDb, CreateOrgTable } from "../../api/index";

function Org() {
  const [gstbox, setgstbox] = useState(false);
  const formshow = () => {
    document.getElementById("formallbox").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const Orgdetails = async (e) => {
    e.preventDefault();
    const org_name = document.getElementById("org_name").value;
    const org_country = document.getElementById("org_country").value;
    const org_state = document.getElementById("inputState").value;
    const org_street = document.getElementById("org_street").value;
    const org_city = document.getElementById("org_city").value;
    const org_pincode = document.getElementById("org_pin").value;
    const org_currency = document.getElementById("org_currency").value;
    const org_lang = document.getElementById("org_lang").value;
    const org_contact_name = document.getElementById("org_contact_name").value;
    const org_contact_phone = document.getElementById("org_contact_phone").value;
    const org_contact_email = document.getElementById("org_contact_email").value;
    const org_gst = document.getElementById("org_gst").value;

    // console.log(org_name, org_country, org_state, org_street, org_city, org_pincode, org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email)
    // if (!org_name) {
    //   alert("Enter Org name")
    // } else {

    //   const OrgTable = await CreateOrgTable(org_name)
    //   console.log(OrgTable)
    //   if (OrgTable == 'Added') {
    //     const database = await CreatenewDb(org_name)
    //     console.log(database)
    //   } else {
    //     alert(OrgTable)
    //   }
    // }

    const database = await CreatenewDb(org_name)
    console.log(database)
     const result = await register(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pincode)
     if(result){
      window.location.href='/home'
     }
  };

  const handleClick = () => {
    setgstbox(!gstbox);
  };

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

                    <input type="text" className="form-control" id="org_name" required="true" />
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
                        value="India"
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
                      <select id="inputState" className="form-control">
                        <option selected="" hidden>Selecte State/Union Territory</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chhattisgarh</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Madhya Pradesh</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Odisha</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>West Bengal</option>
                        <option>Andaman and Nicobar Islands </option>
                        <option>Chandigarh</option>
                        <option>Dadra Nagar Haveli and Daman Diu</option>
                        <option>Delhi</option>
                        <option>Jammu and Kashmir</option>
                        <option>Ladakh</option>
                        <option>Lakshadweep</option>
                        <option>Puducherry</option>
                      </select>
                    </div>
                  </div>
                  <p className="newlinep" id="newlinepid" onClick={formshow}>
                    <svg
                      viewBox="0 0 512 512"
                      style={{ height: "17px", width: "17px", color: "blue" }}
                    >
                      <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
                    </svg>
                    Add Organization Details
                  </p>
                  <div id="formallbox" style={{ display: "none" }}>
                    <div className="form-row">
                      <div className="col form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact Person Name"
                          id='org_contact_name'

                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          className="form-control"
                          type="text" oninput="numberOnly(this.id);"
                          maxlength="12"
                          placeholder="Contact Mobile no."
                          id='org_contact_phone'
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Contact Email"
                        id='org_contact_email'
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street"
                        id='org_street'
                      />
                    </div>

                    <div className="form-row">
                      <div className="col form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          id='org_city'
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
                        value="INR-Rupees"
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
                        value="English"
                        id="org_lang"
                        placeholder
                        disabled
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>
                  </div>

                  <p>
                    Is this business registered for GST?
                    <input type="checkbox"
                      id="checkboxgst"
                      placeholder
                      onClick={handleClick}
                      style={{ float: "right" }}
                    />
                  </p>
                  {gstbox ? (
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="org_gst"
                          placeholder="Enter Your GSTIN"
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <small className="text-muted">
                    <strong>Note:</strong> You can change these details later in
                    Settings, if needed.
                  </small>
                  <hr />
                  <div classNmae="form-group">
                    <label className="col-md-4 control-label" htmlfor="save"></label>
                    <div className="col-md-20" style={{ width: "100%" }}>
                      <button id="save" name="save" onClick={Orgdetails} className="btn btn-success">
                        Get start
                      </button>
                      <button id="clear" onClick={(e) => {
                        e.preventDefault(); window.location.href = '/home'
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
  );
}

export default Org;
