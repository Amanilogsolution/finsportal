import React from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {Unit} from '../../../api';

 const AddUnit = () => {

    const handleClick = async(e) => {
        e.preventDefault();
        const unit_name = document.getElementById('unit_name').value;
        const unit_symbol = document.getElementById('unit_symbol').value;
       
        const result = await Unit(unit_name,unit_symbol);
        if(result){
            window.location.href = '/ShowUnit'
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
                <br /> <h3 className="text-left ml-5">Add Unit</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                      
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Unit Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='unit_name' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Unit Symbol</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='unit_symbol'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
  
    
  
                          
                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success"onClick={handleClick} >Save</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ShowUnit"}}>Cancel</button>
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

export default AddUnit
