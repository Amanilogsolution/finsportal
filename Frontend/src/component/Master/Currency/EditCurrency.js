import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { UpdateCurrency, showCurrency, Activecountries } from '../../../api';

const EditCurrency = () => {
  const [data, setData] = useState([])
  const [selectCountry, setSelectCountry] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const result = await showCurrency(localStorage.getItem('CurrencySno'), localStorage.getItem("Organisation"));
      setData(result)
      const country = await Activecountries()
      setSelectCountry(country)
    }
    fetchdata();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const country = document.getElementById('country_name');
    const country_name = country.options[country.selectedIndex].text
    const country_code = country.value;
    const currency_name = document.getElementById('currency_name').value;
    const currency_code = document.getElementById('currency_code').value;

    const result = await UpdateCurrency(localStorage.getItem("Organisation"), localStorage.getItem("User_id"), localStorage.getItem('CurrencySno'), country_name, country_code, currency_name, currency_code);
    if (result) {
      alert('Data Updated');
      localStorage.removeItem('CurrencySno')
      window.location.href = '/ShowCurrency'
    }
  }

  return (
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
          <div className={`content-wrapper`}>
            <div className="container-fluid">
               <h3 className="py-3 ml-5">Edit Currency</h3>
                  <div className="card w-100">
                    <article className={`card-body`}>
                      <form autoComplete='off'>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <select className="form-control col-md-4" id='country_name' >
                              <option value={data.country_code} hidden> {data.country_name} </option>
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
                            <input type="text" className="form-control col-md-4" id='currency_name' defaultValue={data.currency_name} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='currency_code' defaultValue={data.currency_code}/>
                          </div>
                        </div>
                      </form>
                    </article>

                    <div className={`border-top card-footer`}>
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('CurrencySno'); window.location.href = "./ShowCurrency" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
        <Footer />
    </div>
  )

}

export default EditCurrency