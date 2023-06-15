import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showunit } from '../../../api/index.js'
import { UpdateUnit } from '../../../api/index.js'
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditUnit = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchdata = async () => {
      const Token = localStorage.getItem('Token')
      const result = await showunit(localStorage.getItem('unitSno'), Token, localStorage.getItem('Organisation'));
      setData(result)
      setLoading(true)
    }
    fetchdata()

  }, [])


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
      const result = await UpdateUnit(localStorage.getItem('unitSno'), unit_name, unit_symbol, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
      setLoading(true)
      if (result === 'Updated') {
        setAlertObj({ type: 'success', text: 'Unit Updated', url: '/ShowUnit' })

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
              <h3 className="py-3 ml-5">Edit Unit</h3>
              <div className="card w-100" >
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="unit_name" className="col-md-2 col-form-label font-weight-normal">Unit Name</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='unit_name' defaultValue={data.unit_name} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="unit_symbol" className="col-md-2 col-form-label font-weight-normal">Unit Symbol</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='unit_symbol' defaultValue={data.unit_symbol} />
                      </div>
                    </div>

                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick}>Update</button>
                  <button className="btn btn-secondary ml-3" onClick={() => window.location.href = './ShowUnit'}>Cancel</button>
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
export default EditUnit
