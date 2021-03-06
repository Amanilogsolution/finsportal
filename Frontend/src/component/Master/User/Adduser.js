import React, { useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { User,insertUserLogin,UploadData} from '../../../api';

const AddUser = () => {
  const [authentication, setAuthentication] = useState('with otp')
  const [passwordshow, setPasswordshow] = useState(false);
  const [file,setFile] = useState('')
  const [user_profile_url,setUserProfile] = useState('')

  const handleSendFile =async(e)=>{
    e.preventDefault()
    const data = new FormData();
    data.append("images",file)
   const UploadLink = await UploadData(data)
   console.log(UploadLink)
   setUserProfile(UploadLink)
}
  
  const Toogle = async (e) => {
    e.preventDefault();
    const employee_name = document.getElementById('employee_name').value;
    const role = document.getElementById('role').value;
    const warehouse = document.getElementById('warehouse').value;
    const user_name = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;
    const email_id = document.getElementById('email_id').value;
    const phone = document.getElementById('phone').value;
    const operate_mode = document.getElementById('operate_mode').value;
    const customer = document.getElementById('customer').value;
    const reporting_to = document.getElementById('reporting_to').value;
    const designation = document.getElementById('designation').value;

    // console.log(employee_name, role, warehouse, user_name, password, email_id, phone, operate_mode, customer, reporting_to, designation, authentication)
    if(!employee_name || !warehouse || !user_name || !password || !email_id || !phone || !customer)
    {
      alert('Please! enter the data')
    }
    else
    {
    const result = await User(employee_name, role, warehouse, user_name,
      password, email_id, phone, operate_mode, customer, reporting_to, designation, authentication,user_profile_url);

     const loginInsert = await insertUserLogin(user_name,employee_name,warehouse,localStorage.getItem('Organisation Name'),password,localStorage.getItem('Organisation'),user_profile_url)
    if (result) {
      window.location.href = '/ShowUser'
    }
    }
  }
  const handleClickToogle = (e) => {
    e.preventDefault()
    setPasswordshow(!passwordshow)
  }
  const handleChange = (e) => {
    let data = e.target.value
    setAuthentication(data)
    console.log(data)
  }

  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <Menu />
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Add User</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>

                        <div className="form-row">
                          <label htmlFor="employee_name" className="col-md-2 col-form-label font-weight-normal">Employee name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='employee_name' placeholder="Employee name" />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='role' placeholder="role" />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="warehouse" className="col-md-2 col-form-label font-weight-normal">Warehouse</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='warehouse' placeholder="warehouse" />
                          </div>
                          {/* form-group end.// */}
                        </div>


                        <div className="form-row">
                          <label htmlFor="email_id" className="col-md-2 col-form-label font-weight-normal">Email id</label>
                          <div className="col form-group">
                            <input type="url" className="form-control col-md-4" id='email_id' placeholder="email id" />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="phone" className="col-md-2 col-form-label font-weight-normal">Phone no.</label>
                          <div className="col form-group">
                            <input type="tel" className="form-control col-md-4" id='phone' placeholder="phone" maxLength={10}/>
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="operate_mode" className="col-md-2 col-form-label font-weight-normal">Operate mode</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='operate_mode' placeholder="operate mode" />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='customer' placeholder="customer" />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="reporting_to" className="col-md-2 col-form-label font-weight-normal">Reporting to</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='reporting_to' placeholder="reporting to" />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="designation" className="col-md-2 col-form-label font-weight-normal">Designation</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='designation' placeholder="Designation" />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">User Id</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='user_name' placeholder="User ID" />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="password" className="col-md-2 col-form-label font-weight-normal">Password</label>
                          <input name="password" type={passwordshow ? "text" : "password"} className="col-md-3" id="password" placeholder="password" />
                          <div className="input-group-append">
                            <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}</span>
                          </div>
                        </div>

                        <div className="form-row mt-3">
                          <label className="col-md-2 col-form-label font-weight-normal">Upload Image</label>
                          <input type="file" id="exampleInputPassword1" className="col-md-3" onChange={event=>{ const document = event.target.files[0];
                                                                                                            setFile(document)}} />                       
                          <div className="input-group-append">
                                  <button className="btn btn-outline-secondary" onClick={handleSendFile} type="button">Upload</button>
                                    </div>
                            </div>
                       

                        <div className="form-row"
                          onChange={handleChange}
                        >
                          <div className="col form-group" id='otpradiobtn'>
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Two Factor Authentication
                            </label>

                            <label className="form-check form-check-inline">
                              <input
                                className="form-check-input" type="radio"
                                name="taxpreference"
                                defaultChecked
                                value="With OTP"
                              />With OTP
                            </label>
                            <label className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="taxpreference"
                                value="Without OTP"
                              />Without OTP

                            </label>
                          </div>
                        </div>



                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={Toogle} >Save</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowUser" }}>Cancel</button>
                    </div>
                  </div>
                  {/* card.// */}
                </div>
                {/* col.//*/}
              </div>
              {/* row.//*/}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )

}

export default AddUser
