import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showLocation, updateLocation, Activecountries, showactivestate } from '../../../api'
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

function EditLocation() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([])
  const [slectedstate, setSelectedstate] = useState()
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await showLocation(localStorage.getItem('Organisation'), localStorage.getItem('location_id'))
      setData(result)

      const totlcountry = await Activecountries();
      setCountry(totlcountry);
      const statesresult = await showactivestate(result.country)
      setState(statesresult)
      setLoading(true)
    }

    fetchdata()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const country = document.getElementById('country').value;
    const state = slectedstate;
    const Location_name = document.getElementById('Location_name').value;
    const gst_no = document.getElementById('gst_no').value;
    const contact_Person1 = document.getElementById('contact_Person1').value;
    const contact_person2 = document.getElementById('contact_person2').value;
    const contact_phone1 = document.getElementById('contact_phone1').value;
    const contact_phone2 = document.getElementById('contact_phone2').value;
    const User_id = localStorage.getItem('User_id');

    if (!country || !state || !Location_name) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await updateLocation(localStorage.getItem('Organisation'), Location_name, gst_no, contact_Person1, contact_person2, contact_phone1, contact_phone2, localStorage.getItem('location_id'), User_id, country, state);
      setLoading(true)
      if (result === 'done') {
        localStorage.removeItem('location_id')
        window.location.href = './TotalLocation'
        setAlertObj({ type: 'success', text: 'Location Updated', url: '/ShowCountry' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
  }


  const handleChangeContactphone1 = (e) => {
    const no = e.target.value;
    if (no.length >= 11) return false;
    setData({ ...data, contact_phone_no1: no })
  }
  const handleChangeContactphone2 = (e) => {
    const no = e.target.value;
    if (no.length >= 11) return false;
    setData({ ...data, contact_phone_no2: no })
  }

  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    const statesresult = await showactivestate(data)
    setState(statesresult)
  }
  const handlechangestate = (e) => {
    setSelectedstate(e.targer.value)
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
              <br /> <h3 className="text-left ml-5">Edit Location</h3>
              <div className="card" style={{ width: "100%" }}>
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="country" className="col-md-2 col-form-label font-weight-normal">Country</label>
                      <div className="col form-group">
                        <select className="form-control col-md-4 cursor-notallow" id='country' onChange={handleAddressCountry} disabled>
                          <option hidden value={data.country}> {data.country}</option>
                          {
                            country.map((data, index) =>
                              <option key={index} value={data.country_name}>{data.country_name}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="state" className="col-md-2 col-form-label font-weight-normal ">State</label>
                      <div className="col form-group">
                        <select id="inputState" className="form-control col-md-4 cursor-notallow" onChange={handlechangestate} disabled >
                          <option hidden value={data.state}> {data.state}</option>
                          {
                            state.map((data, index) => (
                              <option key={index} value={data.state_name}>{data.state_name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="Location_name" className="col-md-2 col-form-label font-weight-normal">Location Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4 cursor-notallow" id='Location_name' defaultValue={data.location_name} disabled />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="gst_no" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='gst_no' defaultValue={data.gstin_no} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="contact_Person1" className="col-md-2 col-form-label font-weight-normal">Contact Person 1</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='contact_Person1' defaultValue={data.contact_name1} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="contact_phone1" className="col-md-2 col-form-label font-weight-normal">Contact Phone 1</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='contact_phone1' value={data.contact_phone_no1} onChange={(e) => handleChangeContactphone1(e)} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="contact_person2" className="col-md-2 col-form-label font-weight-normal">Contact Person 2</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='contact_person2' defaultValue={data.contact_name2} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="contact_phone2" className="col-md-2 col-form-label font-weight-normal">Contact Phone 2</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='contact_phone2' value={data.contact_phone_no2} onChange={(e) => handleChangeContactphone2(e)} maxLength={10} />
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Update</button>
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

export default EditLocation
