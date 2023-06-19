import React, { useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { InsertcomplianceType } from '../../../../api';
import AlertsComp from '../../../AlertsComp';

function AddcomplianceType() {
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })


  const handleClick = async (e) => {
    e.preventDefault();
    const compliance_Type = document.getElementById('compliance_Type').value;
    if (!compliance_Type) {
      setAlertObj({ type: 'warning', text: 'Enter  Compliance Type !', url: '' })
    }
    else {
      const result = await InsertcomplianceType(localStorage.getItem('Organisation'), compliance_Type, localStorage.getItem('User_id'));
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'Already!', url: '' })
      }
      else {
        setAlertObj({ type: 'success', text: 'Country Added', url: '/ShowcompliancesType' })
      }
    }
  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className='content-wrapper'>
        <div className="container-fluid">
          <h3 className="py-4 ml-5">Add Compliance</h3>
          <div className="card w-100">
            <article className='card-body'>
              <form>
                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Add Compliance Type</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='compliance_Type' />
                  </div>
                </div>
              </form>
            </article>
            <div className='border-top card-footer'>
              <button className="btn btn-success" onClick={handleClick} >Save</button>
              <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowcompliancesType" }}>Cancel</button>
            </div>
          </div>
        </div>
        {
          alertObj.type ? <AlertsComp data={alertObj} /> : null
        }
      </div>
      <Footer />
    </div>
  )
}

export default AddcomplianceType
