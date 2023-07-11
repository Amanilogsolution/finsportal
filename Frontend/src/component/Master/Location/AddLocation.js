import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Activecountries, showactivestate, addLocation, Getfincialyearid, Updatefinancialcount } from '../../../api';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

function AddLocation() {
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([])
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [locationcount, setLocationcount] = useState()
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetch = async () => {
      const totlcountry = await Activecountries();
      setCountry(totlcountry);
      const response = await Getfincialyearid(localStorage.getItem('Organisation'))
      setLocationcount(response[0].location_count)
      setLoading(true)
    }
    fetch()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const selectedcountry = document.getElementById('country').value;
    const selectedstate = document.getElementById('inputState').value;

    const no = parseInt(locationcount)
    const randomno = no + 1;
    const lastnum = '' + randomno
    const Location_name = document.getElementById('Location_name').value;
    const first3 = Location_name.slice(0, 3)
    const lastno = '' + lastnum.padStart(4, '0');
    const Location_id = first3.toUpperCase() + lastno;
    const gst_no = document.getElementById('gst_no').value;
    const contact_Person1 = document.getElementById('contact_Person1').value;
    const contact_person2 = document.getElementById('contact_person2').value;
    const contact_phone1 = document.getElementById('contact_phone1').value;
    const contact_phone2 = document.getElementById('contact_phone2').value;
    const User_id = localStorage.getItem('User_id');
    const fins_year = localStorage.getItem('fin_year')

    if (!selectedcountry || !selectedstate || !Location_name || !gst_no || contact_phone1.length < 10 || contact_phone2.length < 10) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }

    else {
      const result = await addLocation(localStorage.getItem('Organisation'), Location_id, Location_name, gst_no, contact_Person1, contact_person2, contact_phone1, contact_phone2, User_id, fins_year, selectedcountry, selectedstate);
      setLoading(true)
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'Already!', url: '' })
      }
      else {
        const result1 = await Updatefinancialcount(localStorage.getItem('Organisation'), 'location_count', lastnum)
        if (result1 === "Updated") {
          setAlertObj({ type: 'success', text: 'Location Added', url: '/TotalLocation' })
        }
      }
    }
  }


  const handleAddressCountry = async (e) => {
    let data = e.target.value;
    const statesresult = await showactivestate(data)
    setState(statesresult)
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
              <br /> <h3 className="text-left ml-5">Add Location</h3>
              <div className="card" style={{ width: "100%" }}>
                <article className='card-body'>
                  <form autoComplete='off'>

                    <div className="form-row">
                      <label htmlFor="country" className="col-md-2 col-form-label font-weight-normal">Country</label>
                      <div className="col form-group">
                        <select className="form-control col-md-10" id='country' onChange={handleAddressCountry} >
                          <option value='' hidden>Select Country</option>
                          {
                            country.map((data, index) =>
                              <option key={index} value={data.country_name}>{data.country_name}</option>)
                          }
                        </select>
                      </div>  <label htmlFor="state" className="col-md-2 col-form-label font-weight-normal">State</label>
                      <div className="col form-group">
                        <select id="inputState" className="form-control col-md-10">
                        <option value='' hidden> Select State</option>
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
                      <input type="text" className="form-control col-md-4" id='Location_name' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="gst_no" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='gst_no' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="contact_Person1" className="col-md-2 col-form-label font-weight-normal">Contact Person 1</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='contact_Person1' />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_phone1" className="col-md-2 col-form-label font-weight-normal">Contact Phone 1</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id='contact_phone1'
                        value={phone1}
                        onChange={(e) => {
                          if (e.target.value.length >= 11) return false;
                          setPhone1(e.target.value)
                        }} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact_person2" className="col-md-2 col-form-label font-weight-normal">Contact Person 2</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='contact_person2' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="contact_phone2" className="col-md-2 col-form-label font-weight-normal">Contact Phone 2</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id='contact_phone2'
                        value={phone2}
                        onChange={(e) => {
                          if (e.target.value.length >= 11) return false;
                          setPhone2(e.target.value)
                        }} />
                    </div>
                  </div>
                </form>
              </article>
              <div className='border-top card-footer'>
                <button className="btn btn-success" onClick={handleClick} >Save</button>
                <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./TotalLocation" }}>Cancel</button>
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
    </div >
  )

}

export default AddLocation
