import React, { useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { InsertCountry } from '../../../api';
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';


const AddCountry = () => {
  const [loading, setLoading] = useState(true)
  const [phonenumerr, setPhonenumerr] = useState('')
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const country_name = document.getElementById('Country_name').value;
    const country_id = document.getElementById('country_id').value;
    const country_code = document.getElementById('country_code').value;
    const country_phonecode = document.getElementById('Country_phonecode').value;

    if (!country_name || !country_id) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await InsertCountry(localStorage.getItem("User_id"), country_name, country_id, country_code, country_phonecode);
      setLoading(true)
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'Already!', url: '' })
      }
      else if (result === "Added") {
        setAlertObj({ type: 'success', text: 'Country Added', url: '/ShowCountry' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
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
              <br /> <h3 className="text-left ml-5">Add Country</h3>
              <div className="card">
                <article className='card-body'>
                  <form>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='Country_name' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country ID</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='country_id' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Code</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='country_code' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Phone Code</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='Country_phonecode'
                          value={phonenumerr}
                          onChange={(event) => {
                            if (event.target.value.length === 5) return false;
                            setPhonenumerr(event?.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Save</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowCountry" }}>Cancel</button>
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

export default AddCountry
