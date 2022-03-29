import React, { useState } from 'react'
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {insertBank}  from '../../../api'

 const AddBank = () =>  {
     const[actype,setActype] = useState('')


    const handleClick = async(e) => {
    e.preventDefault();
    // const bank_id = document.getElementById('bank_id').value;
    const account_code = document.getElementById('account_code').value;
    const account_no = document.getElementById('account_no').value;
    const address_line1 = document.getElementById('address_line1').value;
    const address_line2 = document.getElementById('address_line2').value;
    // const branch = document.getElementById('branch').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const ifsc_code = document.getElementById('ifsc_code').value;
    // const glcode = document.getElementById('glcode').value;
    const bank_name = document.getElementById('bank_name').value;
    const acname = document.getElementById('acname').value;
    // const company_id = document.getElementById('company_id').value;
    const description = document.getElementById('description').value;

    console.log(account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description)
    console.log(actype)

    const result = await insertBank( account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description)
    // console.log(result)
    if(result){
        window.location.href='/TotalBank'
    }
    }

    const handleChange = (e) => {
        let data = e.target.value
        setActype(data)
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
                <br /> <h3 className="text-left ml-5">Add Bank</h3>
                <div className="row ">
                  <div className="col ml-5">
                    <div className="card" style={{ width: "100%" }}>
                      <article className="card-body">
                        <form>
                        <div className="form-row"onChange={handleChange}>
                              <div className="col form-group" >
                              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Select Account type</label>

                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"  type="radio"
                                    name="taxpreference"
                                    value="Bank"  
                                  />Bank
                                </label>
                                <label className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="taxpreference"
                                    value="CreditCard" 
                                  />Credit Card
                                </label>
                              </div>
                            </div>
                            <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='acname'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='account_code' placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Number</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='account_no'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Bank Name</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='bank_name'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">IFSC Code</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='ifsc_code'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>



                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line1 </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='address_line1'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Address line2 </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='address_line2'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State </label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='state'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                            <div className="col form-group">
                              <input type="text" className="form-control col-md-4" id='city'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>

                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Pin Code</label>
                            <div className="col form-group">
                              <input type="number" className="form-control col-md-4" id='pincode'  placeholder />
                            </div>
                            {/* form-group end.// */}
                          </div>
                          <div className="form-row">
                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Description</label>
                            <div className="col form-group">
                            <textarea class="form-control col-md-4" id="description" rows="3"></textarea>
                            </div>
                            {/* form-group end.// */}
                          </div>

                        </form>
                      </article>
                      {/* card-body end .// */}
                      <div className="border-top card-body">
                        <button className="btn btn-success" onClick={handleClick} >Save</button>
                        <button className="btn btn-light ml-3" onClick={()=>{window.location.href="AddBankList"}}>Cancel</button>
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

export default AddBank