<<<<<<< HEAD
<<<<<<< HEAD:Frontend/src/component/organisation/org.js
=======
>>>>>>> 8af61fe5173744a2b219a2cb55f5ae1964a12cf0
import "./org.css";
import { useState } from "react";
import {register} from "../../api/index";
function Org() {

  const [gstbox, setgstbox] = useState(false);

  const formshow = () => {
    document.getElementById("formallbox").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const org_name = document.getElementById("org_name").value;
    const org_country = document.getElementById("org_country").value;
    const org_state = document.getElementById("inputState").value;
    const org_street1 = document.getElementById("org_stret1").value;
    const org_street2 = document.getElementById("org_stret2").value;
    const org_city = document.getElementById("org_city").value;
    const org_pin = document.getElementById("org_pin").value;
    const org_currency = document.getElementById("org_currency").value;
    const org_lang = document.getElementById("org_lang").value;
    const org_timezone = document.getElementById("org_timezone").value;
    const org_gst = document.getElementById("org_gst").value;
    
   const result = await register(org_name, org_country, org_state, org_street1, org_street2, org_city, org_pin, org_currency, org_lang, org_timezone, org_gst)
    window.location.href='/home'
  };

  const handleClick = () => {
    setgstbox(!gstbox);
  };

  return (
    <>
      <div className="orgcontainer">
        <br />
        <p className="text-center">
          AWL is your end-to-end online accounting software.
        </p>
        <div className="row justify-content-center">
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

                <form onSubmit={handleSubmit}>

                  <div className="form-group">
                    <label>
                      Organization Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" className="form-control" placeholder id="org_name" />
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
                        <option selected="">
                          Selecte State/Union Territory
                        </option>
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
                    Add Organization Address
                  </p>
                  <div id="formallbox" style={{ display: "none" }}>
                  <div className="form-row">
                  <div className="col form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Person Name"
                        id='org_contactname'
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        maxLength="12"
                        placeholder="Contact Mobile no."
                        id='org_contact_mobile'
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
                        placeholder="Street 1"
                        id='org_stret1'
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street 2"
                        id='org_stret2'
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
                          className="form-control"
                          placeholder="Zip/Postal Code"
                          id="org_pin"
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
                    <input
                      type="checkbox"
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
                      <button id="save" name="save" className="btn btn-success">
                        Get start
                      </button>
                      <button id="clear" name="clear" className="btn ml-2">
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
<<<<<<< HEAD
=======
import "./org.css";
import { useState } from "react";
function Org() {

  const [gstbox, setgstbox] = useState(false);

  const formshow = () => {
    document.getElementById("formallbox").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const handleClick = () => {
    setgstbox(!gstbox);
  };

  return (
    <>
      <div className="orgcontainer">
        <br />
        <p className="text-center">
          AWL is your end-to-end online accounting software.
        </p>
        <div className="row justify-content-center">
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
                <form>
                  <div className="form-group">
                    <label>
                      Organization Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" className="form-control" placeholder />
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
                        <option selected="">
                          Selecte State/Union Territory
                        </option>
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
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
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
                    Add Organization Address
                  </p>
                  <div id="formallbox" style={{ display: "none" }}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street 1"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street 2"
                      />
                    </div>
                    <div className="form-row">
                      <div className="col form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Zip/Postal Code"
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
                        value="INR-Indian Rupees"
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
                        placeholder
                        disabled
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Time Zone</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder
                      value="(GMT 5:30) India Standard Time(Asia/Calcutta)"
                      disabled
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  <p>
                    Is this business registered for GST?
                    <input
                      type="checkbox"
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
                      <button id="save" name="save" className="btn btn-success">
                        Get start
                      </button>
                      <button id="clear" name="clear" className="btn ml-2">
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
>>>>>>> 8af61fe5173744a2b219a2cb55f5ae1964a12cf0:Frontend/src/organisation/org.js
=======
>>>>>>> 8af61fe5173744a2b219a2cb55f5ae1964a12cf0
