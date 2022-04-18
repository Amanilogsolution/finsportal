import React from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {InsertCountry} from '../../../api';

 const AddCountry = () => {

    const handleClick = async(e) => {
        e.preventDefault();
        const country_name = document.getElementById('Country_name').value;
        const country_id = document.getElementById('country_id').value;
        const country_code = document.getElementById('country_code').value;
        const country_phonecode = document.getElementById('Country_phonecode').value;
        const result = await InsertCountry(country_name,country_id,country_code,country_phonecode);
        if(!country_name||!country_id||!country_code||!country_phonecode){
          alert('Enter data')
        }else{
        if(result == "Already"){
          alert('Already')
        }else{
          window.location.href = '/ShowCountry'
        }
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
                <br /> <h3 className="text-left ml-5">Add Country</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                      
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='Country_name' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country ID</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='country_id'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='country_code' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country Phone Code</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='Country_phonecode' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Save</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ShowCountry"}}>Cancel</button>
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

export default AddCountry
