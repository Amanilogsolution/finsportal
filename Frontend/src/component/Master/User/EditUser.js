import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showuser } from '../../../api/index.js'
import { UpdateUser } from '../../../api/index.js'

const EditUser = () => {
  const [data, setData] = useState({})
  const [authentication, setAuthentication] = useState('')
  const [passwordshow, setPasswordshow] = useState(false);


  useEffect(async () => {
    const result = await showuser(localStorage.getItem('userSno'));
    setData(result)

    if (result.two_factor_authentication == 'With OTP') {
      document.getElementById('otp').checked = true
      setAuthentication('With OTP')
    }
    else {
      document.getElementById('noOTP').checked = true
      setAuthentication('Without OTP')
    }

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const employee_name = document.getElementById('employee_name').value;
    const role = document.getElementById('role').value;
    const warehouse = document.getElementById('warehouse').value;
    const user_name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email_id = document.getElementById('email_id').value;
    const phone = document.getElementById('phone').value;
    const operate_mode = document.getElementById('operatemode').value;
    const customer = document.getElementById('customer').value;
    const reporting_to = document.getElementById('reporting_to').value;
    const designation = document.getElementById('designation').value;
    const User_id = localStorage.getItem('User_id');

    const result = await UpdateUser(localStorage.getItem('userSno'), employee_name,
      role, warehouse, user_name, password, email_id, phone, operate_mode,
      customer, reporting_to, designation, authentication, User_id);
    if (result) {
      window.location.href = '/ShowUser'
    }
  }

  const handleClickToogle = (e) => {
    e.preventDefault()
    setPasswordshow(!passwordshow)
  }
  const handleChangeempname = (e) => {
    setData({ ...data, employee_name: e.target.value })
  }
  const handleChangerole = (e) => {
    setData({ ...data, role: e.target.value })
  }

  const handleChangeware = (e) => {
    setData({ ...data, warehouse: e.target.value })
  }
  const handleChangeusername = (e) => {
    setData({ ...data, user_id: e.target.value })
  }

  const handleChangepassword = (e) => {
    setData({ ...data, password: e.target.value })
  }
  const handleChangeemail = (e) => {
    setData({ ...data, email_id: e.target.value })
  }

  const handleChangephone = (e) => {
    setData({ ...data, phone: e.target.value })
  }
  const handleChangeoperatemode = (e) => {
    setData({ ...data, operate_mode: e.target.value })
  }
  const handleChangecustomer = (e) => {
    setData({ ...data, customer: e.target.value })
  }
  const handleChangereporting_to = (e) => {
    setData({ ...data, reporting_to: e.target.value })
  }

  const handleChangedesignation = (e) => {
    setData({ ...data, designation: e.target.value })
  }
  const handleChangetwo_factor_authentication = (e) => {
    setData({ ...data, two_factor_authentication: e.target.value })
  }
  const handleChange = (e) => {
    let state = e.target.value;
    setAuthentication(state)
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
              <br /> <h3 className="text-left ml-5">Edit User</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="employee_name" className="col-md-2 col-form-label font-weight-normal">Employee Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='employee_name' value={data.employee_name} onChange={(e) => handleChangeempname(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='role' value={data.role} onChange={(e) => handleChangerole(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* form-group start.// */}
                        <div className="form-row">
                          <label htmlFor="warehouse" className="col-md-2 col-form-label font-weight-normal">Warehouse</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='warehouse' value={data.warehouse} onChange={(e) => handleChangeware(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="username" className="col-md-2 col-form-label font-weight-normal">User Id</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='username' disabled value={data.user_id} onChange={(e) => handleChangeusername(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="password" className="col-md-2 col-form-label font-weight-normal">Password</label>
                          <input name="password" type={passwordshow ? "text" : "password"} className="form-control col-md-3" id="password" value={data.password} onChange={(e) => handleChangepassword(e)} />
                          <div className="input-group-append">
                            <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}</span>
                          </div>
                        </div><br />

                        <div className="form-row">
                          <label htmlFor="email_id" className="col-md-2 col-form-label font-weight-normal">Email ID</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='email_id' value={data.email_id} onChange={(e) => handleChangeemail(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="phone" className="col-md-2 col-form-label font-weight-normal">Phone</label>
                          <div className="col form-group">
                            <input type="tel" className="form-control col-md-4" id='phone' value={data.phone} onChange={(e) => handleChangephone(e)} maxLength={10} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        {/* asjnasjnaas */}

                        <div className="form-row">
                          <label htmlFor="operatemode" className="col-md-2 col-form-label font-weight-normal">Operate mode</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='operatemode' value={data.operate_mode} onChange={(e) => handleChangeoperatemode(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='customer' value={data.customer} onChange={(e) => handleChangecustomer(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="reporting_to" className="col-md-2 col-form-label font-weight-normal">Reporting To</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='reporting_to' value={data.reporting_to} onChange={(e) => handleChangereporting_to(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <label htmlFor="designation" className="col-md-2 col-form-label font-weight-normal">Designation </label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='designation' value={data.designation} onChange={(e) => handleChangedesignation(e)} />
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row" onChange={handleChange}>
                          <div className="col form-group">
                            <label
                              htmlFor="user_name"
                              className="col-md-2 col-form-label font-weight-normal"
                            >
                              Select Type
                            </label>

                            <label className="form-check form-check-inline">

                              <input
                                className="form-check-input" type="radio"
                                name="taxpreference"
                                value="With OTP"
                                id="otp"
                              />With OTP
                            </label>
                            <label className="form-check form-check-inline">

                              <input
                                className="form-check-input"
                                type="radio"
                                name="taxpreference"
                                value="Without OTP"
                                id="noOTP"
                              />Without OTP
                            </label>
                          </div>
                        </div>
                      </form>
                    </article>
                    {/* card-body end .// */}
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick}>Update</button>
                      <button className="btn btn-light ml-3" onClick={() => window.location.href = './ShowUser'}>Cancel</button>
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
export default EditUser
