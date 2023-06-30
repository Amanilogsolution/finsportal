import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { addstates, Activecountries } from "../../../api";
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';


const StateMaster = () => {
  const [loading, setLoading] = useState(false)
  const [select_type, setStateType] = useState();
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('india');
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await Activecountries()
      setSelectCountry(result)
      setLoading(true)

    }
    fetchData()

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const state_name = document.getElementById("State_name").value;
    const state_code = document.getElementById("state_code").value;
    const state_short_name = document.getElementById("State_Short_Name").value;
    if (!state_name || !state_code || !state_short_name) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await addstates(state_name, selectedCountry, state_code, state_short_name, select_type, localStorage.getItem('User_id'));
      setLoading(true)
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'Already!', url: '' })
      }
      else {
        setAlertObj({ type: 'success', text: 'Country Added', url: '/ShowState' })
      }
    }

  }
  const handleChange = (e) => {
    let data = e.target.value
    setStateType(data)
  }
  const handleChangeCountry = (e) => {
    let data = e.target.value
    setSelectedCountry(data)
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
              <h3 className="py-3 ml-5">Add State</h3>
              <div className="card w-100" >
                <form className='card-body'>
                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                    <div className="col form-group">
                      <select id="inputState" className="form-control col-md-4" onChange={handleChangeCountry} >
                        <option hidden value="India">India</option>
                        {
                          selectCountry.map((data, index) => (
                            <option key={index} value={data.country_name}>{data.country_name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Name</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='State_name' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Code</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id='state_code' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Short Name</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='State_Short_Name' />
                    </div>
                  </div>

                  <div className="form-row" onChange={handleChange}>
                    <div className="col form-group">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Select Type </label>

                      <label className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="taxpreference" value="state" />State
                      </label>
                      <label className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="taxpreference" value="UT" />UT</label>
                    </div>
                  </div>
                </form>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick}>Save</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
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

export default StateMaster
