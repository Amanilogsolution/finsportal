import React from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {InsertCity} from '../../../api'

 const Addcity =() => {
     const handleClick = async () => {
         const city_id = document.getElementById('city_id').value;
            const city_name = document.getElementById('city_name').value;
            const state_id = document.getElementById('state_id').value;
            const state_code = document.getElementById('state_code').value;
            const country_id = document.getElementById('country_id').value;
            const country_code = document.getElementById('country_code').value;
            const result = await InsertCity(city_id,city_name,state_id,state_code,country_id,country_code);
            console.log(result)
            if(result){
                window.location.href = '/ShowCity'
            } 
    }

    return (
        <div>
        <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
            <div class="spinner-border" role="status"> </div>
          </div>
          <Header />
          <Menu />
          <div>
            <div className="content-wrapper">
              <div className="container-fluid">
                <br /> <h3 className="text-left ml-5">Add City</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                      
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Id</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='city_id' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='city_name'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Id</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='state_id' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='state_code' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                         < div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Id</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='country_id' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='country_code' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Save</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ShowState"}}>Cancel</button>
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


export default Addcity
