import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { InsertCurrency, Activecountries } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const AddCurrency = () => {
  const [loading, setLoading] = useState(false)
  const [selectCountry, setSelectCountry] = useState([]);
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Activecountries()
      setSelectCountry(result)
      setLoading(true)
    }
    fetchdata()
  }, [])


  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)

    const country = document.getElementById('country_name');
    const country_name = country.options[country.selectedIndex].text
    const country_code = country.value;
    const currency_name = document.getElementById('currency_name').value;
    const currency_code = document.getElementById('currency_code').value;

    if (!country_name || !country_code || !currency_name) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await InsertCurrency(localStorage.getItem("Organisation"), localStorage.getItem("User_id"), country_name, country_code, currency_name, currency_code);
      setLoading(true)
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'Currency Already Exist', url: '' })
      }
      else if (result === "Added") {
        setAlertObj({ type: 'success', text: 'Currency Added', url: '/ShowCurrency' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
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
              <h3 className="py-3 ml-5">Add Currency</h3>
              <div className="card w-100">
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                      <div className="col form-group">
                        <select id="country_name" className="form-control col-md-4">
                          <option hidden value=""> Select Country</option>
                          {
                            selectCountry.map((data, index) => (
                              <option key={index} value={data.country_code}>{data.country_name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='currency_name' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Code</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='currency_code' />
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Save</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowCurrency" }}>Cancel</button>
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
export default AddCurrency