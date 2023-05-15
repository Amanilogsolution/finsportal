import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ShowGlCode, GlSubCode, InsertGlSubCode } from '../../../api';

function AddSubCode() {
  const [glcode, setglcode] = useState([]);
  const [glsubcode, setglsubcode] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await ShowGlCode(localStorage.getItem("Organisation"));
      setglcode(result)
    }
    fetchData();
  }, [])

  const handleChange = async (e) => {
    e.preventDefault();
    const data = e.target.value;
    const result = await GlSubCode(localStorage.getItem("Organisation"), data);
    const Code = 101 + result.count;
    setglsubcode(Code)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const glcode = document.getElementById('glcode').value;
    const chargeCode = document.getElementById('chargeCode').value;
    const result = await InsertGlSubCode(localStorage.getItem("Organisation"), glcode, glsubcode, chargeCode, localStorage.getItem("Organisation Name"), localStorage.getItem("User_id"));
    if (result) {
      window.location.href = '/TotalSubCode'
    }
  }

  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Add Sub GL Code</h3>
              <div className="row ">
                <div className="col ml-5">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">GL Code</label>
                          <div className="col form-group">
                            <select
                              id="glcode"
                              className="form-control col-md-4"
                              onChange={handleChange}
                            >
                              <option value='' hidden >Select GL Code</option>
                              {
                                glcode.map((data, index) => (
                                  <option key={index} value={data.account_sub_name_code}>{data.account_sub_name_code} , {data.account_sub_name}</option>
                                ))
                              }

                            </select>
                          </div>
                          {/* form-group end.// */}
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Charge Code</label>
                          <div className="col form-group">
                            <input type="text" className="form-control col-md-4" id='chargeCode' />
                          </div>
                        </div>

                        <div className="form-row">
                          <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Sub Code</label>
                          <div className="col form-group">
                            <input type="number" className="form-control col-md-4" value={glsubcode} id='subCode' />
                          </div>
                        </div>
                      </form>
                    </article>
                    <div className="border-top card-footer">
                      <button className="btn btn-success" onClick={handleClick} >Save</button>
                      <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./TotalSubCode" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AddSubCode
