import React, { useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { InsertUnit } from '../../../api';
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';

const AddUnit = () => {
  const [loading, setLoading] = useState(true)
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const unit_name = document.getElementById('unit_name').value;
    const unit_symbol = document.getElementById('unit_symbol').value;

    if (!unit_name || !unit_symbol) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await InsertUnit(unit_name, unit_symbol, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
      setLoading(true)
      if (result === "Already") {
        setAlertObj({ type: 'warning', text: 'This Unit Already!', url: '' })
      }
      else if (result === "Added") {
        setAlertObj({ type: 'success', text: 'Unit Added', url: '/ShowUnit' })
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
      {
        loading ?
          <div className='content-wrapper'>
            <div className="container-fluid">
              <br /> <h3 className="ml-5">Add Unit</h3>
              <div className="card" >
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Unit Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='unit_name' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Unit Symbol</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='unit_symbol' />
                      </div>
                    </div>

                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Save</button>
                  <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowUnit" }}>Cancel</button>
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

export default AddUnit
