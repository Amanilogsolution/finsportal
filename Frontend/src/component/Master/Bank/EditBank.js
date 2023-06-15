import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showBank, updateBank, Activecountries, showactivestate, getCity } from '../../../api'
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';

const EditBank = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [countrylist, setCountrylist] = useState([])
  const [statelist, setStatelist] = useState([])
  const [citylist, setCitylist] = useState([])
  const [type, setType] = useState('')
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await showBank(localStorage.getItem('BankSno'), localStorage.getItem('Organisation'));
      setData(result)
      if (result.ac_type === "Bank") {
        document.getElementById('Bank').checked = true
        setType('bank')
      }
      else if (result.ac_type === 'CreditCard') {
        document.getElementById('CreditCard').checked = true
        setType('CreditCard')
      }
      else {
        setType(result.ac_type)
      }
      const country = await Activecountries();
      setCountrylist(country)
      const state = await showactivestate(result.country)
      setStatelist(state)
      const city = await getCity(result.state)
    }
    fetchData()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    // const account_code = document.getElementById('account_code').value;
    const account_no = document.getElementById('account_no').value;
    const address_line1 = document.getElementById('address_line1').value;
    const address_line2 = document.getElementById('address_line2').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const ifsc_code = document.getElementById('ifsc_code').value;
    const bank_name = document.getElementById('bank_name').value;
    const branch = document.getElementById('branch').value;
    const acname = document.getElementById('acname').value;
    const description = document.getElementById('description').value;
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');

    if (!account_no || !ifsc_code || !country || !state) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await updateBank(localStorage.getItem('BankSno'), data.chart_of_account, account_no, type, bank_name, branch, address_line1, address_line2, country, state, city, pincode, ifsc_code, acname, description, org, User_id);
      setLoading(true)
      if (result === 'Updated') {
        setAlertObj({ type: 'success', text: 'Bank Data Updated', url: '/TotalBank' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
  }


  const handlecountry = async (e) => {
    const countryname = e.target.value;
    setData({ ...data, country: countryname })
    const states = await showactivestate(countryname);
    setStatelist(states)
  }

  const handleChangestate = (e) => {
    setData({ ...data, state: e.target.value })
  }
  const handleChangecity = (e) => {
    setData({ ...data, city: e.target.value })
  }
  const handleChangepincode = (e) => {
    const no = e.target.value;
    if (no.length === 7) return false;
    setData({ ...data, pincode: no })
  }

  const handleChange = (e) => {
    let value = e.target.value;
    setType(value)
  }



  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper`}>
        <div className="container-fluid">
          <br /> <h3 className=" ml-5">Edit Bank</h3>
          <div className="card w-100">
            <article className={`card-body`}>
              <form autoComplete='off'>
                <div className="form-row" onChange={handleChange}>
                  <div className="col form-group" >
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Select Account type</label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="taxpreference" id='Bank' value="Bank" />Bank
                    </label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="taxpreference" id='CreditCard' value="CreditCard" />Credit Card
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Accounting Code <span className='text-danger'>*</span></label>
                  <div className="col form-group">
                    <select className="form-control col-md-10" disabled>
                      <option value={data.chart_of_account} hidden>{data.bank_name}</option>
                    </select>
                  </div>
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Name</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-10" id='bank_name' defaultValue={data.bank_name} disabled />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name </label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='acname' defaultValue={data.acname} />
                  </div>
                </div>

                {/* <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Code</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='account_code' defaultValue={data.account_code} />
                  </div>
                </div> */}

                {/* <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Number</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='account_no' defaultValue={data.account_no} />
                  </div>
                </div> */}

                {/* <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Name</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='bank_name' defaultValue={data.bank_name} />
                  </div>
                </div> */}
                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Number  <span className='text-danger'>*</span></label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-10" id='account_no' defaultValue={data.account_no} />
                  </div>
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">IFSC Code  <span className='text-danger'>*</span></label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-10" id='ifsc_code' defaultValue={data.ifsc_code} />
                  </div>
                </div>
                {/* <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">IFSC Code</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='ifsc_code' defaultValue={data.ifsc_code} />
                  </div>
                </div> */}

                <div className="form-row">
                  <label htmlFor="country" className="col-md-2 col-form-label font-weight-normal">Country  <span className='text-danger'>*</span></label>
                  <div className="col form-group">
                    <select className="form-control col-md-10" id='country' onChange={handlecountry} >
                      <option value={data.country} hidden>{data.country}</option>
                      {
                        countrylist.map((item, index) =>
                          <option key={index} value={item.country_name}>{item.country_name}</option>)
                      }
                    </select>
                  </div>
                  <label htmlFor="state" className="col-md-2 col-form-label font-weight-normal">State  <span className='text-danger'>*</span></label>
                  <div className="col form-group">
                    <select type="text" className="form-control col-md-10" id='state' onChange={handleChangestate} >
                      <option value={data.state} hidden>{data.state}</option>
                      {
                        statelist.map((item, index) =>
                          <option key={index}>{item.state_name}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="city" className="col-md-2 col-form-label font-weight-normal">City</label>
                  <div className="col form-group">
                    <select className="form-control col-md-10" id='city' onChange={handleChangecity} >
                      <option value={data.city} hidden>{data.city}</option>
                      {
                        citylist.map((index, item) =>
                          <option key={index} value={item.city_name}>{item.city_name}</option>)
                      }
                    </select>
                  </div>

                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                  <div className="col form-group">
                    <input type="number" className="form-control col-md-10" id='pincode' value={data.pincode} onChange={handleChangepincode} />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="branch" className="col-md-2 col-form-label font-weight-normal">Branch </label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='branch' defaultValue={data.branch} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line1 </label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='address_line1' defaultValue={data.address_line1} />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line2 </label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='address_line2' defaultValue={data.address_line2} />
                  </div>
                </div>



                {/* <div className="form-row">
                  <label htmlFor="country" className="col-md-2 col-form-label font-weight-normal">Country </label>
                  <div className="col form-group">
                    <select className="form-control col-md-4" id='country' onChange={handlecountry} >
                      <option value={data.country} hidden>{data.country}</option>
                      {
                        countrylist.map((item, index) =>
                          <option key={index} value={item.country_name}>{item.country_name}</option>)
                      }
                    </select>
                  </div>
                </div> */}

                {/* <div className="form-row">
                  <label htmlFor="state" className="col-md-2 col-form-label font-weight-normal">State </label>
                  <div className="col form-group">
                    <select type="text" className="form-control col-md-4" id='state' onChange={handleChangestate} >
                      <option value={data.state} hidden>{data.state}</option>
                      {
                        statelist.map((item, index) =>
                          <option key={index}>{item.state_name}</option>)
                      }
                    </select>
                  </div>
                </div> */}




                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Description</label>
                  <div className="col form-group">
                    <textarea className="form-control col-md-4" id="description" defaultValue={data.description} rows="3"></textarea>
                  </div>
                </div>
              </form>
            </article>

            <div className={`border-top card-footer`}>
              <button className="btn btn-success" onClick={handleClick} >Update</button>
              <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./TotalBank" }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )

}
export default EditBank