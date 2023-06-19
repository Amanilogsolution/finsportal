import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { locationAddress, UpdateLocationAddress, getCity } from '../../../../api'
import LoadingPage from '../../../loadingPage/loadingPage';
import AlertsComp from '../../../AlertsComp';


function EditOrgAddress() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [citylist, setCitylist] = useState([])
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await locationAddress(localStorage.getItem('Organisation'), localStorage.getItem('location_id'))
      setData(result)
      const city = await getCity(result.location_state);
      setCitylist(city)
      setLoading(true)
    }
    fetchdata()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const location_add1 = document.getElementById('location_add1').value;
    const location_add2 = document.getElementById('location_add2').value;
    const location_city = document.getElementById('location_city').value;
    const location_state = document.getElementById('location_state').value;
    const location_country = document.getElementById('location_country').value;
    const from_date = document.getElementById('from_date').value;
    const location_pin = document.getElementById('location_pin').value;
    const User_id = localStorage.getItem('User_id');

    if (!location_city || !location_pin || location_pin.length < 6) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await UpdateLocationAddress(localStorage.getItem('Organisation'), location_add1, location_add2, location_city, location_state, location_country, from_date, localStorage.getItem('location_id'), location_pin, User_id)
      setLoading(true)
      if (result === 'done') {
        localStorage.removeItem('location_id');
        setAlertObj({ type: 'success', text: 'Address Updated', url: '/TotalLocation' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }

    }
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
    if (e.target.value.length === 7) return false;
    setData({ ...data, location_pin: e.target.value })
  }
  const handleChangeDate = (e) => {
    setData({ ...data, from_date: e.target.value })
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
              <br /> <h3 className=" ml-5">Edit Address</h3>
              <div className="card w-100 mb-2" >
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Location Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4 cursor-notallow" id='country_name' defaultValue={data.location_name} disabled />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4 cursor-notallow" id='country_id' defaultValue={data.gstin_no} disabled />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4 cursor-notallow" id='location_country'
                          defaultValue={data.location_country}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4 cursor-notallow" id='location_state' defaultValue={data.location_state}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                      <div className="col form-group">
                        <select className="form-control col-md-4" id='location_city'
                          onChange={(e) => handleChangeCity(e)}>
                          <option value={data.location_city} hidden>{data.location_city}</option>
                          {
                            citylist.map((item, index) =>
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
                          onChange={(e) => handleChangeDate(e)} />
                      </div>
                    </div>

                  </form>
                </article>
                <div className='border-top card-footer '>
                  <button className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('location_id'); window.location.href = "./TotalLocation" }}>Cancel</button>
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


export default EditOrgAddress