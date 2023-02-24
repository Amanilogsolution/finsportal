import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { UpdateCurrency, showCurrency, Activecountries } from '../../../api';

const EditCurrency = () => {
  const [data, setData] = useState([])
  const [selectCountry, setSelectCountry] = useState([])

  const themetype = localStorage.getItem('themetype')

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

  const handleChangeCname = (e) => {
    setData({ ...data, country_name: e.target.value })
  }

  const handleChangeCurrencyname = (e) => {
    setData({ ...data, currency_name: e.target.value })
  }
  const handleChangeCurrencycode = (e) => {
    setData({ ...data, currency_code: e.target.value })
  }

  return (

    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themetype}`}>
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Currency</h3>
              <div className="row ">
                <div className="col ml-2">
                  <div className="card" style={{ width: "100%" }}>
                    <article className={`card-body bg-${themetype}`}>
                      <form>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <select className="form-control col-md-4" id='country_name' onChange={(e) => handleChangeCname(e)} >
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
                            <input type="text" className="form-control col-md-4" id='currency_name' value={data.currency_name} onChange={(e) => handleChangeCurrencyname(e)} />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='currency_code' value={data.currency_code} onChange={(e) => handleChangeCurrencycode(e)} />
                          </div>
                        </div>
                      </form>
                    </article>

                    <div className={`border-top card-footer bg-${themetype}`}>
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { localStorage.removeItem('CurrencySno'); window.location.href = "./ShowCurrency" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themetype} />
      </div>
    </div>
  )

}

export default EditCurrency