import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showstate } from '../../../api/index.js'
import { updateState, Activecountries } from '../../../api/index.js'
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditState = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [statetype, setStateType] = useState()
  const [selectCountry, setSelectCountry] = useState([]);
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await showstate(localStorage.getItem('stateSno'));
      setData(result)
      const country = await Activecountries()
      setSelectCountry(country)
      setLoading(true)

      if (result.state_type === 'state') {
        document.getElementById('State').checked = true
        setStateType('state')
      }
      else {
        document.getElementById('UT').checked = true
        setStateType('UT')
      }
    }
    fetchData()

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const country_name = document.getElementById('Country_name').value;
    const state_name = document.getElementById('State_name').value;
    const state_code = document.getElementById('State_code').value;
    const state_short_name = document.getElementById('State_short').value;

    if (!country_name || !state_name) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await updateState(localStorage.getItem('stateSno'), country_name, state_name, state_code, state_short_name, statetype, localStorage.getItem('User_id'));
      setLoading(true)
      if (result === 'Updated') {
        localStorage.removeItem('stateSno')
        setAlertObj({ type: 'success', text: 'State Updated', url: '/ShowState' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }

  }
  const handleChange = (e) => {
    let state = e.target.value;
    setStateType(state)
  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className="container-fluid">
              <h3 className="pt-3 pb-2 ml-5">Edit State</h3>
              <div className="card w-100">
                <article className='card-body '>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                      <div className="col form-group">
                        <select id="Country_name" className="form-control col-md-4">
                          <option value={data.country_name} hidden>{data.country_name}</option>
                          {
                            selectCountry.map((data, index) => (
                              <option key={index} value={data.country_name}>{data.country_name}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='State_name' defaultValue={data.state_name} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Code</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='State_code' defaultValue={data.state_code} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Short Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='State_short' defaultValue={data.state_short_name} />
                      </div>
                    </div>

                    <div className="form-row" onChange={handleChange}>
                      <div className="col form-group">
                        <label htmlFor="user_name"
                          className="col-md-2 col-form-label font-weight-normal">Select Type
                        </label>
                        <label className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="taxpreference" value="state" id="State" />State
                        </label>
                        <label className="form-check form-check-inline">
                          <input
                            className="form-check-input" type="radio" name="taxpreference" value="UT" id="UT" />UT
                        </label>
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={() => window.location.href = './ShowState'}>Cancel</button>
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
export default EditState
