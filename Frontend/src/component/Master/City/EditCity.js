import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { showCity } from '../../../api';
import { updateCity } from '../../../api';
import { Activecountries } from '../../../api';
import { showactivestate } from '../../../api';

const EditCity = () => {
  const [data, setData] = useState({})
  const [state, setState] = useState()
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [country, setCountry] = useState()

  useEffect(async () => {
    const result = await showCity(localStorage.getItem('citySno'));
    setData(result)
    setState(result.state_name)
    setCountry(result.country_name)
    if (result.country_name) {

      const statesresult = await showactivestate(result.country_name)
      setSelectState(statesresult)
    }

    const country = await Activecountries()
    setSelectCountry(country)
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const city_id = document.getElementById('city_id').value;
    const city_name = document.getElementById('city_name').value;
    const User_id =localStorage.getItem("User_id");
    const result = await updateCity(localStorage.getItem('citySno'), city_id, city_name, state, country,User_id);
    if (result) {
      alert("Data Updated");
      localStorage.removeItem('citySno');
      window.location.href = '/ShowCity'
    }
  }

  const handleChangeCityid = (e) => {
    setData({ ...data, city_id: e.target.value })
  }
  const handleChangeCityname = (e) => {
    setData({ ...data, city_name: e.target.value })
  }
  const handleChangeState = async (e) => {
    let data = e.target.value
    setState(data)
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
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <Menu />
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit City</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                          <div className="col form-group">
                            <select
                              id="inputState"
                              className="form-control col-md-4"
                              onChange={handleChangeCountry}

                            >
                              <option selected hidden>{country}</option>
                              {
                                selectCountry.map((data) => (
                                  <option value={data.country_name}>{data.country_name}</option>
                                ))

                              }

                            </select>                            </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Name</label>
                          <div className="col form-group">
                            <select
                              id="inputState"
                              className="form-control col-md-4"
                              onChange={handleChangeState}

                            >
                              <option selected hidden >{data.state_name}</option>
                              {
                                selectState.map((data) => (
                                  <option value={data.state_name}>{data.state_name}</option>
                                ))

                              }
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Id</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='city_id' value={data.city_id} onChange={(e) => handleChangeCityid(e)} />
                          </div>
                        </div>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='city_name' value={data.city_name} onChange={(e) => handleChangeCityname(e)} />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
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


export default EditCity