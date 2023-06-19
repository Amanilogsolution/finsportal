import "./org.css";
import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { register, CreatenewDb, CreateOrgTable, UploadData } from "../../api/index";

function Org() {
  const [loading, setLoading] = useState(true)
  const [gstbox, setgstbox] = useState(false);
  const [file, setFile] = useState('');
  const [phonenum, setPhonenum] = useState();
  const [pinno, setPinno] = useState();


  const formshow = () => {
    document.getElementById("formallbox").style.display = "block";
    document.getElementById("newlinepid").style.display = "none";
  };

  const Orgdetails = async (e) => {
    e.preventDefault();
    // document.getElementById('datasave').disabled = 'true';
    setLoading(false)

    let org_name = document.getElementById("org_name").value;
    org_name = org_name.trim();
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

    if (!org_name || !org_state) {
      alert('Please Enter the mandatory field...')
      setLoading(true)
      // document.getElementById('datasave').disabled = false;
    }
    else {
      const OrgTable = await CreateOrgTable(dbname, org_name, User_id)
      if (OrgTable === 'Already') {
        alert('This Company already exist');
        setLoading(true)
      }
      else {
        const database = await CreatenewDb(dbname)
        if (database === 'created') {
          const result = await register(dbname, org_name, org_country, org_state, org_street, org_currency, org_lang, org_gst, org_contact_name, org_contact_phone, org_contact_email, org_city, org_pincode, User_id, fins_year, last_year, startdate, toyear)
          if (result) {
            alert('Organisation created')
            window.location.href = '/Home'
          }
        }
        else {
          alert('Server not response')
          setLoading(true)
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
  }


  return (
    <>
      <div className="wrapper">
        {
          loading ?
            <>
              {/* <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
              </div> */}
              <Header />
              <div className={`content-wrapper `}>
                <div className="orgcontainer container-fluid" >
                  <h3 className="py-4 px-5">
                    Set up Your Organization Profile
                  </h3>
                  <div className={`card mx-5 px-3 `}>
                    <article style={{ borderTop: "3.5px solid #1f8ea3" }}>
                      <form autoComplete="off" className="card-body mx-auto" >
                        <div className="form-group">
                          <label htmlFor="org_name">Organization Name <span className="text-danger">*</span> </label>
                          <input type="text" className="form-control col-md-6" id="org_name" required={true} />
                        </div>
                        <div className="form-row">
                          <div className="col-md-6 form-group">
                            <label htmlFor="org_country">Business Location<span className="text-danger">*</span></label>
                            <input
                              type="text"
                              className="form-control cursor-notallow"
                              value="India"
                              id="org_country"
                              required={true}
                              disabled
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputState">
                              State/Union Territory
                              <span className="text-danger">*</span>
                            </label>
                            <select id="inputState" className="form-control">
                              <option hidden value=''>Selecte State/Union Territory</option>
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
                        <p className="newlinep text-info font-weight-bold" id="newlinepid" onClick={formshow}>
                          <svg
                            viewBox="0 0 512 512"
                            style={{ height: "17px", width: "17px", cursor: 'poiner' }}
                          >
                            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
                          </svg>
                          &nbsp; Add Organization Details
                        </p>
                        <div id="formallbox" style={{ display: "none" }}>
                          <div className="form-row">
                            <div className="col-md-6 form-group">
                              <label htmlFor="org_contact_name">
                                Contact Person Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Contact Person Name"
                                id='org_contact_name'
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="org_contact_phone"> Contact Mobile no.</label>
                              <input
                                className="form-control"
                                type="number"
                                placeholder="Contact Mobile no."
                                id='org_contact_phone'
                                value={phonenum}
                                onChange={(e) => {
                                  if (e.target.value.length === 11) return false;
                                  setPhonenum(e.target.value)
                                }}
                              />
                            </div>

                          </div>
                          <div className="form-group col">
                            <label htmlFor="org_contact_email"> Contact Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Contact Email"
                              id='org_contact_email'
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group col">
                              <label htmlFor="org_street"> Street</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Street"
                                id='org_street'
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="col-md-6 form-group">
                              <label htmlFor="org_city"> City</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="City"
                                id='org_city'
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="org_pin"> Zip/Postal Code</label>

                              <input
                                type="number"
                                className="form-control"
                                placeholder="Zip/Postal Code"
                                id="org_pin"
                                value={pinno}
                                onChange={(e) => {
                                  if (e.target.value.length === 7) return false;
                                  setPinno(e.target.value)
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <label className="col-sm-4 col-form-label">
                              Organization logo (optional) :-
                            </label>
                            <button className="form-control col-md-3 btn btn-outline-secondary" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#exampleModal">Select</button>
                          </div>
                        </div>
                        <p className="regtext">REGIONAL SETTINGS</p>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="org_currency">Currency</label>
                            <input
                              type="text"
                              className="form-control"
                              value="INR-Rupees"
                              id="org_currency"
                              disabled
                              style={{ cursor: "not-allowed" }}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="org_lang">Language</label>
                            <input
                              type="text"
                              className="form-control cursor-notallow"
                              value="English"
                              id="org_lang"
                              disabled
                            />
                          </div>
                        </div>

                        <p>
                          Is this business registered for GST?
                          <input type="checkbox"
                            id="checkboxgst"
                            className="float-right"
                            onClick={handleClick}
                            style={{ height: '20px', width: '20px' }}
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

                        <small className="text-muted">
                          <strong>Note:</strong> You can change these details later in
                          Settings, if needed.
                        </small>
                        <hr />

                        <div className="form-group">
                          <button type='submit' id="datasave" name="save" onClick={Orgdetails} className="btn btn-success">
                            Get start
                          </button>
                          <button id="clear" onClick={(e) => {
                            e.preventDefault(); window.location.href = '/Home'
                          }} name="clear" className="btn ml-2 btn-secondary">
                            Cancel
                          </button>
                          <a href="/#" className="float-right">Privacy Policy</a>
                        </div>
                      </form>
                    </article>
                  </div>
                  {/* ############# Modal Start ########################## */}
                  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className={`modal-content `}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Upload Organization logo</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">X</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="form-row">
                            <label className="col-sm-4 col-form-label">
                              Organization logo
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

                  {/* ############# Modal End ########################## */}

                </div>
              </div>
              <Footer />
            </>
            :
            (<div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
              <div className="spinner-border" role="status"> </div>
            </div>)
        }
      </div>
    </>
  );
}

export default Org;