import React from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {Insertaccounttype} from '../../../api'


function InsertAccountType() {


    const handleClick = async(e) => {
        e.preventDefault();
        const org = localStorage.getItem("Organisation");
        const account_type = document.getElementById('AccountType').value;
        const account_type_code = document.getElementById('AccountTypeCode').value;
        const accountTypedesc  = document.getElementById('AccountTypedesc').value;
        const User_id= localStorage.getItem("User_id");
        const result = await Insertaccounttype(org,account_type,account_type_code,accountTypedesc,User_id);
        if(result == 'Already'){
            alert("Already")
        }else{
          var landingpage = localStorage.getItem('Chart')
          if(landingpage == 'Chart'){
            window.location.href='/ChartOfAccount'
            localStorage.removeItem('Chart')
          }
          else{
            window.location.href = '/ShowAccountname'
          }
        }
    }

    const handleClickCancel  = (e) =>{
          e.preventDefault();
          var landingpage = localStorage.getItem('Chart')
          console.log(landingpage)
          if(landingpage == 'Chart'){
            window.location.href='/ChartOfAccount'
            localStorage.removeItem('Chart')
          }
          else{
            window.location.href = '/ShowAccountname'
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
            <br /> <h3 className="text-left ml-5">Add Account Type</h3>
            <div className="row ">
              <div className="col ml-5">
                <div className="card" style={{ width: "100%" }}>
                  <article className="card-body">
                    <form>
                      <div className="form-row">
                        <label htmlFor="AccountType" className="col-md-2 col-form-label font-weight-normal">Account Type</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='AccountType'   />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="AccountTypeCode" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                        <div className="col form-group">
                          <input type="number" className="form-control col-md-4" id='AccountTypeCode'  />
                        </div>
                        {/* form-group end.// */}
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type Description</label>
                        <div className="col form-group">
                          <textarea  className="form-control col-md-4" id='AccountTypedesc'  ></textarea>
                        </div>
                        {/* form-group end.// */}
                      </div>

                    </form>
                  </article>
                  {/* card-body end .// */}
                  <div className="border-top card-body">
                    <button className="btn btn-success" onClick={handleClick} >Save</button>
                    <button className="btn btn-light ml-3" onClick={handleClickCancel}>Cancel</button>
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

export default InsertAccountType
