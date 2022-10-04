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

    const result = await UpdatecomplianceType(localStorage.getItem('Organisation'), compliance_Type, localStorage.getItem('User_id'), localStorage.getItem('ComplianceSnoType'))
    if (result) {
      alert('Data Updated')
      localStorage.removeItem('ComplianceSnoType');
      window.location.href = '/ShowcompliancesType'
    }
  }

  const handleChangeCompliance = (e) => {
    setData({ ...data, compliance_type: e.target.value })
  }


  useEffect(async () => {
    const result = await ShowcompliancesTypeselect(localStorage.getItem('Organisation'), localStorage.getItem('ComplianceSnoType'))
    setData(result)
  }, [])
  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themeval}`}>
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Edit Compliance Type</h3><br />
              <div className="row ">
                <div className="col ml-2">
                  <div className="card" style={{ width: "100%" }}>
                    <article className={`card-body bg-${themeval}`}>
                      <form>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal"> Compliance Type</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='compliance_Type'
                              value={data.compliance_type}
                              onChange={(e) => handleChangeCompliance(e)}
                            />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className={`border-top card-footer bg-${themeval}`}>
                      <button className="btn btn-success" onClick={handleClick} >Update</button>
                      <button className="btn btn-light ml-3" onClick={() => { localStorage.removeItem('ComplianceSnoType'); window.location.href = "./ShowcompliancesType" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer theme={themeval} />
      </div>
    </div>
  )
}

export default EditComplianceType
