import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showcountry, updatecountry } from '../../../api'
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditCountry = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })


  useEffect(() => {
    const fetchdata = async () => {
      const result = await showcountry(localStorage.getItem('countrySno'))
      setData(result)
      setLoading(true)
    }
    fetchdata();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const country_name = document.getElementById('country_name').value;
    const country_id = document.getElementById('country_id').value;
    const country_code = document.getElementById('country_code').value;
    const country_phonecode = document.getElementById('country_phonecode').value;

    if (!country_name || !country_id) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await updatecountry(localStorage.getItem('countrySno'), localStorage.getItem("User_id"), country_name, country_id, country_code, country_phonecode)
      setLoading(true)
      if (result === 'done') {
        localStorage.removeItem('countrySno')
        setAlertObj({ type: 'success', text: 'Country Updated', url: '/ShowCountry' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }
  }

  const handleChangeCp = (e) => {
    const no = e.target.value;
    if (no.length >= 5) return false;
    setData({ ...data, country_phonecode: no })
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
              <br /> <h3 className="ml-5">Edit Country</h3>
              <div className="card w-100">
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='country_name' defaultValue={data.country_name} required />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country ID</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='country_id' defaultValue={data.country_id} maxLength={5} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Code</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='country_code' defaultValue={data.country_code} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Phone Code</label>
                      <div className="col form-group">
                        <input type="number" className="form-control col-md-4" id='country_phonecode' value={data.country_phonecode} onChange={(e) => handleChangeCp(e)} />
                      </div>
                    </div>

                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('countrySno'); window.location.href = "./ShowCountry" }}>Cancel</button>
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
export default EditCountry;
