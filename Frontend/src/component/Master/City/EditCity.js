import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showCity, updateCity, Activecountries, showactivestate } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';


const EditCity = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [country, setCountry] = useState()
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })


  useEffect(() => {
    const fetchdata = async () => {
      const result = await showCity(localStorage.getItem('citySno'));
      setData(result)
      setCountry(result.country_name)
      if (result.country_name) {
        const statesresult = await showactivestate(result.country_name)
        setSelectState(statesresult)
      }
      const country = await Activecountries()
      setSelectCountry(country)
      setLoading(true)
    }
    fetchdata();

  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const state_name = document.getElementById('state_name').value;
    const city_id = document.getElementById('city_id').value;
    const city_name = document.getElementById('city_name').value;
    const User_id = localStorage.getItem("User_id");

    if (!state_name || !city_name) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await updateCity(localStorage.getItem('citySno'), city_id, city_name, state_name, country, User_id);
      setLoading(true)
      if (result === 'Updated') {
        localStorage.removeItem('citySno');
        setAlertObj({ type: 'success', text: 'City Updated', url: '/ShowCity' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
  }

  const handleChangeCountry = async (e) => {
    let country = e.target.value;
    setCountry(country)
    const statesresult = await showactivestate(country)
    setTimeout(() => {
      setSelectState(statesresult)
    }, 1000);
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
              <h3 className="py-3  ml-5">Edit City</h3>
              <div className="card w-100 mt-2">
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                      <div className="col form-group">
                        <select id="inputState" className="form-control col-md-4" onChange={handleChangeCountry}>
                          <option value={country} hidden>{country}</option>
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
                        <select id="state_name" className="form-control col-md-4">
                          <option value={data.state_name} hidden >{data.state_name}</option>
                          {
                            selectState.map((data, index) => (
                              <option key={index} value={data.state_name}>{data.state_name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Id</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='city_id' defaultValue={data.city_id} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='city_name' defaultValue={data.city_name} />
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Update</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('citySno'); window.location.href = "./Showcity" }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )
}


export default EditCity