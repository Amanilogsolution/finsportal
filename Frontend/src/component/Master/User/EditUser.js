import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showuser, UpdateUser, ActiveCustomer, ActiveUserRole } from '../../../api/index.js'
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditUser = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [authentication, setAuthentication] = useState('')
  const [passwordshow, setPasswordshow] = useState(false);
  const [activecustomer, setActivecustomer] = useState([])
  const [useroleslist, setUserroleslist] = useState([])
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await showuser(localStorage.getItem('userSno'));
      setData(result)
      setAuthentication(result.two_factor_authentication)
      const customer = await ActiveCustomer(org)
      setActivecustomer(customer)
      const roles = await ActiveUserRole(org)
      setUserroleslist(roles)
      setLoading(true)

    }
    fetchdata()

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
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

    if (!employee_name || !warehouse || !password || !email_id) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }

    else {
      const result = await UpdateUser(localStorage.getItem('userSno'), employee_name,
        role, warehouse, user_name, password, email_id, phone, operate_mode,
        customer, reporting_to, designation, authentication, User_id);
      setLoading(true)
      if (result === 'Updated') {
        localStorage.removeItem('userSno');
        setAlertObj({ type: 'success', text: 'User Updated', url: '/ShowUser' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
  }

  const handleClickToogle = (e) => {
    e.preventDefault()
    setPasswordshow(!passwordshow)
  }

  const handleChangerole = (e) => {
    setData({ ...data, role: e.target.value })
  }

  const handleChangepassword = (e) => {
    setData({ ...data, password: e.target.value })
  }
  const handleChangephone = (e) => {
    const no = e.target.value;
    if (no.length >= 11) return 0;
    setData({ ...data, phone: no })
  }

  const handleChangecustomer = (e) => {
    setData({ ...data, customer: e.target.value })
  }

  return (
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className="container-fluid">
              <h3 className="ml-5 py-2">Edit User</h3>
              <div className="card w-100 " >
                <form className='card-body mb-0' autoComplete='off'>
                  <div className="form-row">
                    <label htmlFor="employee_name" className="col-md-2 col-form-label font-weight-normal">Employee Name</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='employee_name' defaultValue={data.employee_name} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role</label>
                    <div className="col form-group">
                      <select className="form-control col-md-4" id='role' onChange={(e) => handleChangerole(e)} >
                        <option value={data.role} hidden>{data.role}</option>
                        {
                          useroleslist.map((item, index) =>
                            <option key={index} value={item.role}>{item.roles}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="warehouse" className="col-md-2 col-form-label font-weight-normal">Warehouse</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='warehouse' defaultValue={data.warehouse} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="username" className="col-md-2 col-form-label font-weight-normal">User Id</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4 cursor-notallow" id='username' disabled defaultValue={data.user_id} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="password" className="col-md-2 col-form-label font-weight-normal">Password</label>
                    <input name="password" type={passwordshow ? "text" : "password"} className="form-control col-md-3" id="password" value={data.password} onChange={(e) => handleChangepassword(e)} disabled />
                    <div className="input-group-append">
                      <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}</span>
                    </div>
                  </div><br />

                  <div className="form-row">
                    <label htmlFor="email_id" className="col-md-2 col-form-label font-weight-normal">Email ID</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='email_id' defaultValue={data.email_id} />
                    </div>
                    <label htmlFor="phone" className="col-md-2 col-form-label font-weight-normal">Phone</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-10" id='phone' value={data.phone}
                        onChange={(e) => handleChangephone(e)} />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="operatemode" className="col-md-2 col-form-label font-weight-normal">Operate mode</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='operatemode' defaultValue={data.operate_mode} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                    <div className="col form-group">
                      <select className="form-control col-md-4" id='customer' onChange={(e) => handleChangecustomer(e)}>
                        <option>{data.customer}</option>
                        {
                          activecustomer.map((item, index) =>
                            <option key={index}>{item.cust_name}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="reporting_to" className="col-md-2 col-form-label font-weight-normal">Reporting To</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='reporting_to' defaultValue={data.reporting_to} />
                    </div>
                    <label htmlFor="designation" className="col-md-2 col-form-label font-weight-normal">Designation </label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-10" id='designation' defaultValue={data.designation} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="finsyear_lock" className="col-md-2 col-form-label font-weight-normal">Financial year Lock</label>
                    <div className="col form-group">
                      <input type="checkbox" id='finsyear_lock' style={{ height: '18px', width: '18px' }} />
                    </div>
                  </div>
                </form>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); localStorage.removeItem('userSno'); window.location.href = './ShowUser' }}>Cancel</button>
                </div>
              </div>
            </div>
            {
              alertObj.type ? <AlertsComp data={alertObj} /> : null
            }
          </div >
          : <LoadingPage />
      }
      <Footer />
    </div >
  )

}
export default EditUser
