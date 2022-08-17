import "./org.css";
import { useState } from "react";
import { register, CreatenewDb, CreateOrgTable, UploadData } from "../../api/index";

function Org() {
  const [gstbox, setgstbox] = useState(false);
  const [file, setFile] = useState('')


  const formshow = () => {
    document.getElementById("formallbox").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const Orgdetails = async (e) => {
    e.preventDefault();
    document.getElementById('datasave').disabled = 'true';

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
    const dbname = org_name.slice(0, 3) + Math.floor(Math.random() * 10000)
    const User_id = localStorage.getItem('User_id');

    const date = new Date()
    const previousyear = date.getFullYear()
    const nextyear = previousyear + 1;
    const last_year = String(nextyear).slice(-2);
    const fins_year = previousyear + "-" + nextyear;
    const startdate = '01-04-' + previousyear;
    const toyear = '31-03-' + nextyear; 

    if (!org_name) {
      alert('Please Enter the mandatory field...')
    }
    else {
      const OrgTable = await CreateOrgTable(dbname, org_name, User_id)
      if (OrgTable === 'Already') {
        alert('This Company already exist');
      }
      else {
        const database = await CreatenewDb(dbname)
        if (database === 'created') {
          const result = await register(dbname, org_name, org_country, org_state, org_street, org_currency, org_lang, org_gst, org_contact_name, org_contact_phone, org_contact_email, org_city, org_pincode, User_id, fins_year, last_year, startdate, toyear)
          if (result) {
          alert('Organisation created')
            window.location.href = '/home'
          }
        }
      }

    }
  };

  const handleClick = (e) => {
    setgstbox(!gstbox);
    if (gstbox) {
      document.getElementById('org_gst').style.display = 'none';
    }
    else {
      document.getElementById('org_gst').style.display = 'block';
    }
  };

  const handleSendFile = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("images", file)
    const UploadLink = await UploadData(data)
    // console.log(UploadLink)
  }

  return (
    <>
      <div className="orgcontainer" >
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
                        <option selected hidden value=''>Selecte State/Union Territory</option>
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
                          type="text" onInput="numberOnly(this.id);"
                          maxLength={10}
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
                          type="number"
                          // onInput="numberOnly(this.id);"
                          // maxLength={6}
                          className="form-control"
                          placeholder="Zip/Postal Code"
                          id="org_pin"
                          onChange={(e) => { if (e.target.value.length > 6) { alert("number must be 6 digit") } }}
                        />
                      </div>

                    </div>
                    <div className="form-row">
                      <label className="col-sm-4 col-form-label">
                        Orgaisation logo (optional) :-
                      </label>
                      <button className="form-control col-md-3 btn btn-outline-secondary" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#exampleModal">Select</button>

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

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="org_gst"
                        placeholder="Enter Your GSTIN"
                        style={{ fontSize: "15px", display: "none" }}
                      />
                    </div>
                  </div>

                  {/* {gstbox ? (
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
                  ) : null} */}
                  <small className="text-muted">
                    <strong>Note:</strong> You can change these details later in
                    Settings, if needed.
                  </small>
                  <hr />
                  <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="save"></label>
                    <div className="col-md-20" style={{ width: "100%" }}>
                      <button id="datasave" name="save" onClick={Orgdetails} className="btn btn-success">
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
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Upload Orgaisation logo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <label className="col-sm-4 col-form-label">
                    Orgaisation logo
                  </label>
                  <input type="file" className="" placeholder="" onChange={event => {
                    const document = event.target.files[0];
                    setFile(document)
                  }} accept=".jpg, .jpeg, .png,.svg" />

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={handleSendFile} className="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Org;
