import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Menu from "../../../Menu/Menu";
import Footer from "../../../Footer/Footer";
import { locationAddress, UpdateLocationAddress ,getCity} from '../../../../api'


function EditOrgAddress() {
  const [data, setData] = useState({})
  const [citylist,setCitylist] =useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const result = await locationAddress(localStorage.getItem('Organisation'), localStorage.getItem('location_id'))
      setData(result)
      console.log(result)

      const city = await getCity(result.location_state);
      setCitylist(city)
    }
    fetchdata()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const location_add1 = document.getElementById('location_add1').value;
    const location_add2 = document.getElementById('location_add2').value;
    const location_city = document.getElementById('location_city').value;
    const location_state = document.getElementById('location_state').value;
    const location_country = document.getElementById('location_country').value;
    const from_date = document.getElementById('from_date').value;
    const location_pin = document.getElementById('location_pin').value;
    const User_id = localStorage.getItem('User_id');

    if (!location_city || !location_pin || location_pin.length < 6 ) {
      alert('Please Fill the mandatory field or Invalid Data')
    }
    else {
      const result = await UpdateLocationAddress(localStorage.getItem('Organisation'), location_add1, location_add2, location_city, location_state, location_country, from_date, localStorage.getItem('location_id'), location_pin, User_id)
      if (result) {
        alert('Data Updated');
        localStorage.removeItem('location_id')
        window.location.href = '/TotalLocation'
      }
      else {
        alert('Server Error')
      }

    }
  }

  const handleChangeCountry = (e) => {
    setData({ ...data, location_country: e.target.value })
  }
  const handleChangeState = (e) => {
    setData({ ...data, location_state: e.target.value })
  }
  const handleChangeCity = (e) => {
    setData({ ...data, location_city: e.target.value })
  }
  const handleChangeaddr1 = (e) => {
    setData({ ...data, location_add1: e.target.value })
  }
  const handleChangeAddr2 = (e) => {
    setData({ ...data, location_add2: e.target.value })
  }
  const handleChangePin = (e) => {
    if(e.target.value.length === 7) return false;
    setData({ ...data, location_pin: e.target.value })
  }
  const handleChangeDate = (e) => {
    setData({ ...data, from_date: e.target.value })
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
              <br /> <h3 className="text-left ml-5">Edit Address</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Location Name</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_name' value={data.location_name} disabled />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='country_id' value={data.gstin_no} disabled />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='location_country'
                              value={data.location_country}
                              onChange={(e) => handleChangeCountry(e)}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='location_state' value={data.location_state}
                              onChange={(e) => handleChangeState(e)}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                          <div className="col form-group">
                            <select  className="form-control col-md-4" id='location_city' 
                              onChange={(e) => handleChangeCity(e)}>
                              <option value={data.location_city} hidden>{data.location_city}</option>
                              {
                              citylist.map((item,index)=>
                              <option key={index} value={item.city_name}>{item.city_name}</option>)
                            }
                              </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address 1</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='location_add1' value={data.location_add1}
                              onChange={(e) => handleChangeaddr1(e)}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address 2</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='location_add2' value={data.location_add2}
                              onChange={(e) => handleChangeAddr2(e)}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" id='location_pin' value={data.location_pin}
                              onChange={(e) => handleChangePin(e)}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">From Date</label>
                          <div className="col form-group">
                            <input type="Date" className="form-control col-md-4" id='from_date' value={data.from_date}
                              onChange={(e) => handleChangeDate(e)}
                            />
                          </div>
                        </div>
                        <div className="border-top card-body">
                      <button className="btn btn-success" onClick={handleClick}>Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./TotalLocation" }}>Cancel</button>
                    </div>
                      </form>
                    </article>
                   
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


export default EditOrgAddress