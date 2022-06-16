import React, {useEffect, useState } from 'react'
import Header from "../../../Header/Header";
import Menu from "../../../Menu/Menu";
import Footer from "../../../Footer/Footer";
import {showLocation,InsertLocationAddress} from '../../../../api'


function AddOrgAddress() {
  const[data,setData] = useState({})

  useEffect(async() => {
    const result = await showLocation(localStorage.getItem('Organisation'),localStorage.getItem('location_id'))
    setData(result)
     }, [])

     const handleClick = async (e) =>{
      e.preventDefault();
      const location_add1 = document.getElementById('location_add1').value;
      const location_add2 = document.getElementById('location_add2').value;
      const location_city = document.getElementById('location_city').value;
      const location_state = document.getElementById('location_state').value;
      const location_country = document.getElementById('location_country').value;
      const from_date = document.getElementById('from_date').value;
      const location_pin = document.getElementById('location_pin').value;
     
      const to_date= new Date(from_date);
      to_date.setDate(to_date.getDate() - 1);
      let formatted_date = to_date.getFullYear() + "-" + (to_date.getMonth() + 1) + "-" +  to_date.getDate()

      const result = await InsertLocationAddress(localStorage.getItem('Organisation'),data.location_name,data.gstin_no,location_add1,location_add2,location_city,location_state,location_country,from_date,localStorage.getItem('location_id'),location_pin,formatted_date)
      if(result){
        window.location.href = '/TotalLocation'
    }
  }

  return (
    <div>
    <div className="wrapper">
    <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <Menu />
      <div>
        <div className="content-wrapper">
          <div className="container-fluid">
            <br /> <h3 className="text-left ml-5">Add Address</h3>
            <div className="row ">
              <div className="col ml-5">
                <div className="card" style={{ width: "100%" }}>
                  <article className="card-body">
                    <form>
                  
                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Location Name</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='country_name' value={data.location_name} disabled />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">GST No</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='country_id' value={data.gstin_no} disabled  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='location_country'  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='location_state'   />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='location_city'  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address 1</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='location_add1'  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address 2</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='location_add2'  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='location_pin' />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">From Date</label>
                        <div className="col form-group">
                          <input type="Date" className="form-control col-md-4" id='from_date'  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                    </form>
                  </article>
                  {/* card-body end .// */}
                  <div className="border-top card-body">
                    <button className="btn btn-success" onClick={handleClick}>Add</button>
                    <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./TotalLocation"}}>Cancel</button>
                  </div>
                </div>
                {/* card.// */}
              </div>
              {/* col.//*/}
            </div>
            {/* row.//*/}
          </div>   
        </div>
      </div>
      <Footer />
    </div>
  </div>
)
}
 

export default AddOrgAddress
