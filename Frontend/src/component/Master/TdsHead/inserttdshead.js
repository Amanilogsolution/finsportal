import React, { useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { insertTdsHead } from "../../../api/index"
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';

const Inserttdshead = () => {
  const [loading, setLoading] = useState(true)
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)
    const org = localStorage.getItem('Organisation')
    const tdshead = document.getElementById('tdshead').value
    const tdssection = document.getElementById('tdssection').value
    const User_id = localStorage.getItem("User_id");

    if (!tdshead || !tdssection) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
    }
    else {
      const result = await insertTdsHead(org, tdshead, tdssection, User_id)
      setLoading(true)
      if (result === 'Added') {
        setAlertObj({ type: 'success', text: 'Country Added', url: '/TotaltdsHead' })
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
              <br /> <h3 className=" ml-5">Add TDS Head</h3>
              <div className="card w-100">
                <article className={`card-body`}>
                  <form autoComplete='off'>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Tds Head <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='tdshead' />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Tds Section <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='tdssection' />
                      </div>
                    </div>

                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button type='submit' className="btn btn-success" onClick={handleClick} >Save</button>
                  <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./TotaltdsHead" }}>Cancel</button>
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

export default Inserttdshead
