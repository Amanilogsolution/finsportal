import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ShowRecurringFreq,UpdateRecurringFreq } from '../../../api/index.js'

const EditRecurringFreq = () => {

  const [data, setData] = useState({})
  useEffect(async () => {
    const Token = localStorage.getItem('Token')
    const result = await ShowRecurringFreq(localStorage.getItem('Organisation'),localStorage.getItem('FreqSno'));
    console.log(result)
    setData(result)
  }, [])


  const handleClick = async (e) => {
    e.preventDefault();
    const recurring_type = document.getElementById('recurring_type').value;
    const recurring_month = document.getElementById('recurring_month').value;
    const remark = document.getElementById('remark').value;

    const result = await UpdateRecurringFreq(localStorage.getItem('Organisation'),recurring_type,recurring_month,remark, localStorage.getItem('User_id'),localStorage.getItem('FreqSno'));
    if (result == 'Updated') {
      window.location.href = '/TotalRecurringFrequency'
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
           <h3 className="py-3 ml-5">Add Frequency</h3>
          <div className="card w-100" >
            <article className={`card-body`}>
              <form autoComplete='off'>
                <div className="form-row">
                  <label htmlFor="unit_name" className="col-md-2 col-form-label font-weight-normal">Frequency Type</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='recurring_type' defaultValue={data.recurring_type} />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="unit_symbol" className="col-md-2 col-form-label font-weight-normal">Number</label>
                  <div className="col form-group">
                    <input type="text" className="form-control col-md-4" id='recurring_month' defaultValue={data.recurring_month} />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Remark</label>
                  <div className="col form-group">
                    <textarea type="text" className="form-control col-md-4" id='remark' defaultValue={data.remark}/>
                  </div>
                </div>

              </form>
            </article>
            <div className={`border-top card-footer`}>
              <button className="btn btn-success" onClick={handleClick}>Update</button>
              <button className="btn btn-secondary ml-3" onClick={() => window.location.href = './ShowUnit'}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )

}
export default EditRecurringFreq
