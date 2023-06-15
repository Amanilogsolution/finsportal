import React, { useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { InsertRecurringFreq } from '../../../api';
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';

const AddRecurringFreq = () => {
  const [loading, setLoading] = useState(true)
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const recurring_type = document.getElementById('recurring_type').value;
    const recurring_month = document.getElementById('recurring_month').value;
    const remark = document.getElementById('remark').value;

    if (!recurring_type || !recurring_month) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await InsertRecurringFreq(localStorage.getItem('Organisation'), recurring_type, recurring_month, remark, localStorage.getItem('User_id'));
      setLoading(true)
      if (result === "Already") {
        alert('Frequency Already ')
        setAlertObj({ type: 'warning', text: 'This Frequency Already Exist!', url: '' })
      }
      else if (result === "Added") {
        setAlertObj({ type: 'success', text: 'Frequency Added', url: '/TotalRecurringFrequency' })
      }
      else {
        setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
      }
    }

  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper`}>
        <div className="container-fluid">
          <br /> <h3 className="ml-5">Add Frequency</h3>
          <div className="card" >
            <article className={`card-body`}>
              <form autoComplete='off'>
                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Frequency Type</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='recurring_type' />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Number</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='recurring_month' />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Remark</label>
                  <div className="col form-group">
                    <textarea type="text" className="form-control col-md-4" id='remark' />
                  </div>
                </div>

              </form>
            </article>
            <div className={`border-top card-footer`}>
              <button className="btn btn-success" onClick={handleClick} >Save</button>
              <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowUnit" }}>Cancel</button>
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

export default AddRecurringFreq
