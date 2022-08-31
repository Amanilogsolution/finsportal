import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { showOrganisation, updateOrganisation, UploadData } from "../../api/index";


function EditOrganisation() {
  const [data, setData] = useState({})
  const [file, setFile] = useState('')
  const [report_basic,setReportBasic] = useState('')


  const Orgdetails = async (e) => {
    e.preventDefault();
    const org_street = document.getElementById("org_street").value;
    const org_city = document.getElementById("org_city").value;
    const org_pincode = document.getElementById("org_pin").value;
    const org_contact_name = document.getElementById("org_contact_name").value;
    const org_contact_phone = document.getElementById("org_contact_phone").value;
    const org_contact_email = document.getElementById("org_contact_email").value;
    const org_gst = document.getElementById("org_gst").value;
    const User_id = document.getElementById('User_id')
    const Industry_Type = document.getElementById('industry_type').value
    const Fins_year = document.getElementById('fins_year').value
    const Company_Id = document.getElementById('company_id').value
    const Tax_id = document.getElementById('tax_id').value
    console.log(Industry_Type,Fins_year,Company_Id,Tax_id,report_basic)


    const result = await updateOrganisation(localStorage.getItem('Organisation'), org_contact_name, org_contact_phone, org_contact_email, org_street, org_city, org_pincode, org_gst, User_id,Industry_Type,Fins_year,report_basic,Company_Id,Tax_id)
    if (result) {
      alert('Updated')
      window.location.href = '/home';
      localStorage.removeItem('Organisation_details')
    }
  };

  const handleSendFile = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("images", file)
    const UploadLink = await UploadData(data)
    console.log(UploadLink)
  }

  const handleChangeContactname = (e) => {
    setData({ ...data, org_contact_name: e.target.value })
  }
  const handleChangeContactPhone = (e) => {
    setData({ ...data, org_contact_phone: e.target.value })
  }
  const handleChangeContactEmail = (e) => {
    setData({ ...data, org_contact_email: e.target.value })
  }
  const handleChangeStreet = (e) => {
    setData({ ...data, org_street: e.target.value })
  }
  const handleChangeCity = (e) => {
    setData({ ...data, org_city: e.target.value })
  }
  const handleChangePin = (e) => {
    setData({ ...data, org_pincode: e.target.value })
  }
  const handleChangeGst = (e) => {
    setData({ ...data, org_gst: e.target.value })
  }
  const handleChangeIndustrytype = (e) => {
    setData({ ...data, industry_type: e.target.value })
  }
  const handleChangeCompanyId = (e) =>{
    setData({ ...data, company_id: e.target.value })
  }
  const handleChangeTaxId = (e) =>{
    setData({ ...data, tax_id: e.target.value })
  }

  const handleChange= (e) =>{
    console.log(e.target.value)
    setReportBasic(e.target.value)
  }

  useEffect(() => {
    const fetchdata = async () => {
      const result = await showOrganisation(localStorage.getItem('Organisation'))
      console.log(result)
      setData(result)
      console.log(result.report_basic)
      if(result.report_basic==='Accural'){
        document.getElementById('Accural').checked = true
        setReportBasic('Accural')
      }else{
        document.getElementById('Cash').checked = true
        setReportBasic('Cash')

      }

    }
    fetchdata()

  }, [])

  return (
    <>      <div className="wrapper">

     <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>

        <Header />
        <Menu />
      <div className="orgcontainer">
        <br />
        <div className="row justify-content-center " style={{ width: "100%" }}>
          <div className="col-md-6">
            <div className="card">
              <article
                className="card-body"
                style={{ borderTop: "3.5px solid blue" }}
              >
                <h3 style={{ textAlign: "left" }}>
                  Edit your organization profile
                </h3>
                <br />

                <form autoComplete="off">
                  <div className="form-group" style={{ marginLeft:"40%"}}>
                    <div style={{ height: "100px", width: "100px", border: "2px solid black", borderRadius: "50%", position: "relative", }}>
                      <img src="https://anyspaze.blob.core.windows.net/awlvendorportal/97576410-d5b0-11ec-816d-5df392c9ae87-account_circle_FILL0_wght400_GRAD0_opsz48.svg" alt="Org_logo" style={{ height: "100%", width: "100%" }} />
                      <i className="fa fa-camera cameraicon" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" style={{ position: "absolute", bottom: "10%", color: "blue" }}></i>

                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col form-group">
                      <label>Organization Name <span style={{ color: "red" }}>*</span> </label>

                      <input type="text" className="form-control " id="org_name" disabled value={data.org_name} />
                    </div>
                    <div className="col form-group">
                      <label>Industry Type <span style={{ color: "red" }}>*</span> </label>
                      <input type="text" className="form-control" id="industry_type"  value={data.industry_type}  onChange={(e) => handleChangeIndustrytype(e)}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col form-group">
                      <label>
                        Business Location<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
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
                          onChange={(e) => handleChangeContactname(e)}
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
                          onChange={(e) => handleChangeContactPhone(e)}

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
                        onChange={(e) => handleChangeContactEmail(e)}

                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street"
                        id='org_street'
                        value={data.org_street}
                        onChange={(e) => handleChangeStreet(e)}
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
                          onChange={(e) => handleChangeCity(e)}

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
                          onChange={(e) => handleChangePin(e)}
                        />
                      </div>

                    </div>
                  </div>
                  <p className="regtext">REGIONAL SETTINGS</p>


                  <div className="form-row">
                    <div className="form-group col">
                      <label>Finacial year</label>

                      <select
                        id="fins_year"
                        className="form-control col-md-6"
                      >
                        <option value='' hidden >{data.fins_year_month}</option>
                        <option value='January_Feburary' >January_Feburary</option>


                      </select>
                    </div>
                    <div className=" form-group col"onChange={handleChange}>
                      <label> Report Basic </label>
                      <label className="form-check form-check-inline">

                        <input
                          className="form-check-input ml-2" type="radio"
                          name="taxpreference"
                          value="Accural"
                          id="Accural"
                        />Accural
                      </label>
                      <div className="form-group col ml-6" >
                        <label className="form-check form-check "style={{marginLeft:"90px"}}>

                          <input
                            className="form-check-input "
                            type="radio"
                            name="taxpreference"
                            value="Cash"
                            id="Cash"
                          />Cash

                        </label>
                      </div>
                    </div>
                    <div>

                    </div>
                  </div>



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
                    <div className="col form-group">
                      <label>
                        Company ID<span style={{ color: "red" }}>*</span>
                      </label>
                      <input type="text" className="form-control" placeholder id="company_id" required value={data.company_id} onChange={(e) => handleChangeCompanyId(e)}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>
                        Tax ID
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input type="text" className="form-control" placeholder id="tax_id"  value={data.tax_id}  onChange={(e) => handleChangeTaxId(e)}
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
                        onChange={(e) => handleChangeGst(e)}

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
                        e.preventDefault(); window.location.href = '/home'; localStorage.removeItem('Organisation_details')
                      }} name="clear" className="btn ml-2">
                        Cancel
                      </button>
                      <a href="/#" style={{ float: "right" }}>
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
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Change Organisation Image</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label className="col-sm-6 col-form-label">
                  Select Organisation image
                </label>
                <input
                  type="file"

                  onChange={event => {
                    const document = event.target.files[0];
                    setFile(document)
                  }}
                  accept=".jpg, .jpeg, .png,.svg"
                />

              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSendFile} data-dismiss="modal">Upload</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default EditOrganisation
