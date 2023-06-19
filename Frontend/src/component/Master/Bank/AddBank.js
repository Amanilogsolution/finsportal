import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { insertBank, Activecountries, showactivestate, getCity, ActiveAllChartofAccount } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const AddBank = () => {
  const [loading, setLoading] = useState(false)
  const [actype, setActype] = useState('Bank');
  const [countrylist, setCountrylist] = useState([])
  const [statelist, setStatelist] = useState([])
  const [citylist, setCitylist] = useState([])
  const [pincode, setPincode] = useState(0);
  const [chartofacctlist, setChartofacctlist] = useState([]);
  const [accountingcode, setAccountingcode] = useState();
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Organisation')
      const result = await Activecountries();
      setCountrylist(result)
      const chartofacct = await ActiveAllChartofAccount(org);
      setChartofacctlist(chartofacct);
      setLoading(true)

    }
    fetchdata()
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

    if (!account_no || !ifsc_code || !bank_name || !country || !state || !city) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await insertBank(accountingcode, bank_name, account_no, address_line1, address_line2, country, state, city,
        pincode, ifsc_code, actype, acname, description, branch, org, User_id)
      setLoading(true)
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'Already!', url: '' })
      }
      else if (result === "Added") {
        setAlertObj({ type: 'success', text: 'Bank Added', url: '/TotalBank' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }

  }

  const handleChange = (e) => {
    let data = e.target.value
    setActype(data)
  }

  const handlecountry = async (e) => {
    const countryname = e.target.value;
    const states = await showactivestate(countryname);
    setStatelist(states)
  }
  const handleState = async (e) => {
    const statename = e.target.value;
    const city = await getCity(statename);
    setCitylist(city)
  }


  const handleSetBankName = (e) => {
    let chartofact_arr = e.target.value.split('^')
    setAccountingcode(chartofact_arr[1])
    document.getElementById('bank_name').value = chartofact_arr[0]
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
              <br /> <h3 className=" ml-5">Add Bank</h3>
              <div className="card w-100">
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row" >
                      <div className="col form-group" >
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Select Account type</label>

                        <label className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="taxpreference" value="Bank" defaultChecked onClick={handleChange} />Bank
                        </label>
                        <label className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="taxpreference" value="CreditCard" onClick={handleChange} />Credit Card
                        </label>
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Accounting Code <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <select className="form-control col-md-10" onChange={handleSetBankName}>
                          <option value='' hidden> Select Accounting Code</option>
                          {chartofacctlist.map((gldata, index) => (
                            <option key={index} value={`${gldata.account_sub_name}^${gldata.account_sub_name_code}`}> {gldata.account_sub_name} </option>))
                          }
                        </select>
                      </div>
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-10" id='bank_name' disabled />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name </label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='acname' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Number  <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-10" id='account_no' />
                      </div>
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">IFSC Code  <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-10" id='ifsc_code' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="country" className="col-md-2 col-form-label font-weight-normal">Country  <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <select className="form-control col-md-10" id='country' onChange={handlecountry} >
                          <option value='' hidden>Select Country </option>
                          {
                            countrylist.map((item, index) =>
                              <option key={index} value={item.country_name}>{item.country_name}</option>)
                          }
                        </select>
                      </div>
                      <label htmlFor="state" className="col-md-2 col-form-label font-weight-normal">State  <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <select className="form-control col-md-10" id='state' onChange={handleState}>
                          <option value='' hidden>select State</option>
                          {
                            statelist.map((item, index) =>
                              <option value={item.state_name} key={index} >{item.state_name}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City  <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <select type="text" className="form-control col-md-10" id='city' >
                          <option value='' hidden>Select City</option>
                          {
                            citylist.map((item, index) =>
                              <option key={index} value={item.city_name}>{item.city_name}</option>)
                          }
                        </select>
                      </div>
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-10" id='pincode'
                          value={pincode}
                          onChange={(e) => {
                            if (e.target.value.length === 7) return false;
                            setPincode(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Branch</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='branch' placeholder='Branch' />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line1 </label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='address_line1' placeholder='Address 1' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line2 </label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='address_line2' placeholder='Address 2' />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Description</label>
                      <div className="col form-group">
                        <textarea className="form-control col-md-4" id="description" rows="3"></textarea>
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Save</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "AddBankList" }}>Cancel</button>
                </div>
              </div>
            </div>
            {
              alertObj.type ? <AlertsComp data={alertObj} /> : null
            }
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )
}

export default AddBank