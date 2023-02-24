import React from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { InsertcomplianceType } from '../../../../api';

function AddcomplianceType() {
  const themeval = localStorage.getItem('themetype')


  const handleClick = async (e) => {
    e.preventDefault();
    const compliance_Type = document.getElementById('compliance_Type').value;
    if (!compliance_Type) {
      alert('Enter  Compliance Type')
    }
    else {
      const result = await InsertcomplianceType(localStorage.getItem('Organisation'), compliance_Type, localStorage.getItem('User_id'));
      if (result === "Already") {
        alert('Already')
      }
      else {
        window.location.href = '/ShowcompliancesType'
      }
    }
  }

  return (
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
          <div className={`content-wrapper bg-${themeval}`}>
            <div className="container-fluid">
              <h3 className="py-4 ml-5">Add Compliance</h3>
                  <div className="card w-100">
                    <article className={`card-body bg-${themeval}`}>
                      <form>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Add Compliance Type</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='compliance_Type' />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className={`border-top card-footer bg-${themeval}`}>
                      <button className="btn btn-success" onClick={handleClick} >Save</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowcompliancesType" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
        <Footer theme={themeval} />
      </div>
  )
}

export default AddcomplianceType
