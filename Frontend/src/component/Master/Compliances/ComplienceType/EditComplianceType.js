import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { ShowcompliancesTypeselect, UpdatecomplianceType } from '../../../../api';
import LoadingPage from '../../../loadingPage/loadingPage';
import AlertsComp from '../../../AlertsComp';


function EditComplianceType() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [alertObj, setAlertObj] = useState({
    type: '', text: 'Done', url: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await ShowcompliancesTypeselect(localStorage.getItem('Organisation'), localStorage.getItem('ComplianceSnoType'))
      setData(result)
      setLoading(true)
    }
    fetchData()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(false)

    const compliance_Type = document.getElementById('compliance_Type').value;
    if (!compliance_Type) {
      setLoading(true)
      setAlertObj({ type: 'warning', text: 'Enter Compliance Type !', url: '' })
    }
    else {
      const result = await UpdatecomplianceType(localStorage.getItem('Organisation'), compliance_Type, localStorage.getItem('User_id'), localStorage.getItem('ComplianceSnoType'))
      setLoading(true)
      if (result === 'updated') {
        localStorage.removeItem('ComplianceSnoType');
        setAlertObj({ type: 'success', text: 'Compliance Type Updated', url: '/ShowcompliancesType' })
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
              <br /> <h3 className="text-left ml-5">Edit Compliance Type</h3><br />
              <div className="card w-100">
                <article className='card-body'>
                  <form autoComplete='off'>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal"> Compliance Type</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='compliance_Type'
                          defaultValue={data.compliance_type}
                        />
                      </div>
                    </div>
                  </form>
                </article>
                <div className='border-top card-footer'>
                  <button className="btn btn-success" onClick={handleClick} >Update</button>
                  <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); localStorage.removeItem('ComplianceSnoType'); window.location.href = "./ShowcompliancesType" }}>Cancel</button>
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

export default EditComplianceType
