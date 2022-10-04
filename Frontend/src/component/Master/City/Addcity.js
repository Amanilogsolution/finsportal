import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { InsertCity, Activecountries, showactivestate } from '../../../api';

const Addcity = () => {
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [cityidno,setCityidno]= useState();

  const themetype = localStorage.getItem('themetype')


  useEffect(() => {
    const fetchdata = async () => {
      const result = await Activecountries()
      setSelectCountry(result)
    }
    fetchdata();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const country_name = document.getElementById('country_name').value;
    const state = document.getElementById('state_name').value;
    const city_id = document.getElementById('city_id').value;
    const city_name = document.getElementById('city_name').value;
    const User_id = localStorage.getItem("User_id");


    if (!country_name || !state ||!city_id || !city_name) {
      alert('Enter data')
    }
    else {
      const result = await InsertCity(city_id, city_name, state, country_name, User_id);
      if (result === "Already") {
        alert('Already')
      } 
      else {
        alert('Data Added')
        window.location.href = '/ShowCity'
      }
    }

  }
  const handleChangeCountry = async (e) => {
    let data = e.target.value
    const statesresult = await showactivestate(data)
    setSelectState(statesresult)
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
          <div className={`content-wrapper bg-${themetype}`}>
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Add City</h3>
              <div className="row ">
                <div className="col ml-2">
                  <div className="card" style={{ width: "100%" }}>
                    <article className={`card-body bg-${themetype}`}>
                      <form>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <select
                              id="country_name"
                              className="form-control col-md-4"
                              onChange={handleChangeCountry}
                            >
                              <option  hidden value=''>Select Country</option>
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
                            <select
                              id="state_name"
                              className="form-control col-md-4"
                            >
                              <option value='' hidden >Select State</option>
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
                            <input type="number" className="form-control col-md-4" id='city_id' 
                              value={cityidno}
                              onChange={(e)=>{
                              if(e.target.value.length ===5)return false;
                              setCityidno(e.target.value)}}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='city_name' />
                          </div>
                        </div>
                        <div className={`border-top card-footer bg-${themetype}`}>
                          <button type='submit' className="btn btn-success" onClick={handleClick} >Save</button>
                          <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
                        </div>
                      </form>
                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themetype}/>
      </div>
    </div>
  )
}


export default Addcity
