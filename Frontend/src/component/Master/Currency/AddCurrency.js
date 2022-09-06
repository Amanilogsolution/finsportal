import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { InsertCurrency, Activecountries } from '../../../api';

const AddCurrency = () => {
  const [selectCountry, setSelectCountry] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Activecountries()
      setSelectCountry(result)
    }
    fetchdata()
  }, [])

  
  const handleClick = async (e) => {
    e.preventDefault();
    const country = document.getElementById('country_name');
    const country_name = country.options[country.selectedIndex].text
    const country_code = country.value;
    const currency_name = document.getElementById('currency_name').value;
    const currency_code = document.getElementById('currency_code').value;

    if (!country_name || !country_code || !currency_name) {
      alert('Enter data')
    } else {
      const result = await InsertCurrency(localStorage.getItem("Organisation"), localStorage.getItem("User_id"), country_name, country_code, currency_name, currency_code);

      if (result === "Already") {
        alert('Already')
      } else {
        window.location.href = '/ShowCurrency'
      }
    }
  }





  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        {/* <Menu /> */}
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Add Currency</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <select
                              id="country_name"
                              className="form-control col-md-4"
                            >
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
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='currency_code' />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick} >Save</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowCurrency" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>

  )

}
export default AddCurrency