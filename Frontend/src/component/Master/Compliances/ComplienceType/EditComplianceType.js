import React, { useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { ShowcompliancesTypeselect, UpdatecomplianceType } from '../../../../api';


function EditComplianceType() {
  const [data, setData] = useState([])

  const themeval = localStorage.getItem('themetype')

  const handleClick = async (e) => {
    e.preventDefault();
    const compliance_Type = document.getElementById('compliance_Type').value;
    if (!compliance_Type) {
      alert('Enter Compliance Type')
    }
    else {
      const result = await UpdatecomplianceType(localStorage.getItem('Organisation'), compliance_Type, localStorage.getItem('User_id'), localStorage.getItem('ComplianceSnoType'))
      if (result) {
        alert('Data Updated')
        localStorage.removeItem('ComplianceSnoType');
        window.location.href = '/ShowcompliancesType'
      }
    }

  }

  useEffect(async () => {
    const result = await ShowcompliancesTypeselect(localStorage.getItem('Organisation'), localStorage.getItem('ComplianceSnoType'))
    setData(result)
  }, [])


  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper`}>
        <div className="container-fluid">
          <br /> <h3 className="text-left ml-5">Edit Compliance Type</h3><br />
          <div className="card w-100">
            <article className={`card-body`}>
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
            <div className={`border-top card-footer`}>
              <button className="btn btn-success" onClick={handleClick} >Update</button>
              <button className="btn btn-secondary ml-3" onClick={(e) => {e.preventDefault(); localStorage.removeItem('ComplianceSnoType'); window.location.href = "./ShowcompliancesType" }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer theme={themeval} />
    </div>
  )
}

export default EditComplianceType
