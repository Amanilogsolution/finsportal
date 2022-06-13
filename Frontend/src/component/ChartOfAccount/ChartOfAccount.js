import React,{useState} from 'react';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";


function ChartOfAccount() {
    const [gstbox, setgstbox] = useState(false);


    const handleClick = () => {
        setgstbox(!gstbox);
      };
  return (
    <div>
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <Menu />
      
      <div className="content-wrapper">
      
        <div className="row justify-content-center " style={{ width: "100%",paddingTop:"30px" }}>
          <div className="col-md-6">
            <div className="card">
              <article
                className="card-body"
              >
                <h3 style={{ textAlign: "center" }}>
                  Chart Of Account
                </h3>
                <br />

                <form autoComplete="off">
                  <div className="form-group">
                    <label>Account Type <span style={{ color: "red" }}>*</span> </label>

                    <input type="text" className="form-control" id="org_name" required="true" />
                  </div>

                  <div className="form-group">
                    <label>Account Name <span style={{ color: "red" }}>*</span> </label>

                    <input type="text" className="form-control" id="org_name" required="true" />
                  </div>
                
                  <p>
                    Make this a sub-account 
                    <input type="checkbox"
                      id="checkboxgst"
                      placeholder
                      onClick={handleClick}
                      style={{ float: "right" }}
                    />
                  </p>
                  {gstbox ? (
                  
                  <div className="form-group">
                    <label>Parent Account <span style={{ color: "red" }}>*</span> </label>

                    <input type="text" className="form-control" id="org_name" required="true" />
                  </div>
                  ) : null}

                <div className="form-group">
                    <label>Account Code  </label>

                    <input type="text" className="form-control" id="org_name" required="true" />
                  </div>

                  <div className="form-group">
                    <label>Description  </label>
                    <textarea name="text" className="form-control" id="remark" cols="10" rows="3"></textarea>  </div>
                  <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="save"></label>
                    <div className="col-md-20" style={{ width: "100%" }}>
                      <button id="save" name="save" className="btn btn-danger">
                        Save
                      </button>
                      <button id="clear" onClick={(e) => {
                        e.preventDefault(); window.location.href = '/home'
                      }} name="clear" className="btn ml-2">
                        Cancel
                      </button>
                    


                    </div>
                  </div>
                </form>


              </article>
            </div>
          </div>
        </div>
        {/* Modal */}


      </div>
   
      <Footer />
    </div>
  </div>
  )
}

export default ChartOfAccount
