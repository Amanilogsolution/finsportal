import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { updateTdsHead, showTdsHead } from "../../../api/index"
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

function UpdatetdsHead() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const org = localStorage.getItem('Organisation')
      const sno = localStorage.getItem('tdssno')
      const result = await showTdsHead(org, sno)
      setData(result)
      setLoading(true)
    }
    fetchData()
  }, [])

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
      const result = await updateTdsHead(org, tdshead, tdssection, User_id, localStorage.getItem('tdssno'))
      setLoading(true)
      if (result === 'Updated') {
        setAlertObj({ type: 'success', text: 'Tds Head Updated', url: '/TotaltdsHead' })
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
              <br /> <h3 className=" ml-5">Update TDS Head</h3>
              <div className="card w-100">
                <article className='card-body'>
                  <form autoComplete='off'>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Tds Head <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='tdshead' defaultValue={data.name} />
                      </div>
                    </div>

                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Tds Section <span className='text-danger'>*</span></label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='tdssection' defaultValue={data.tds_section} />
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

export default UpdatetdsHead
