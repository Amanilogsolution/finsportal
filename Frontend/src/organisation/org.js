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
