import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Insertaccounttype, CountAccounttype } from '../../../api'
import LoadingPage from '../../loadingPage/loadingPage';


function InsertAccountType() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await CountAccounttype(localStorage.getItem("Organisation"))
      setLoading(true)
      document.getElementById("AccountTypeCode").value = result.count + 1
    }
    fetchData();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const org = localStorage.getItem("Organisation");
    const account_type = document.getElementById('AccountType').value;
    const account_type_code = document.getElementById('AccountTypeCode').value;
    const accountTypedesc = document.getElementById('AccountTypedesc').value;
    const User_id = localStorage.getItem("User_id");

    if (!account_type) {
      alert('Please Enter Account type')
    }
    else {
      const result = await Insertaccounttype(org, account_type, account_type_code, accountTypedesc, User_id);

      if (result === 'Already') {
        alert("Already")
      } else {
        let landingpage = localStorage.getItem('Chart')
        if (landingpage === 'Chart') {
          window.location.href = '/ChartOfAccount'
          localStorage.removeItem('Chart')
        }
        else {
          window.location.href = '/ShowAccountname'
        }
      }
    }
  }

  const handleClickCancel = (e) => {
    e.preventDefault();
    var landingpage = localStorage.getItem('Chart')
    if (landingpage === 'Chart') {
      window.location.href = '/ChartOfAccount'
      localStorage.removeItem('Chart')
    }
    else {
      window.location.href = '/ShowAccountname'
    }
  }

  return (
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
      <Header />
      {
        loading ?
          <div className='content-wrapper'>
            <div className="container-fluid px-4">
              <h3 className="py-3 ml-5">Add Major Account Type</h3>
              <div className='card w-100'>
                <form className="card-body" autoComplete='off'>
                  <div className="form-row">
                    <label htmlFor="AccountTypeCode" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id='AccountTypeCode' disabled />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="AccountType" className="col-md-2 col-form-label font-weight-normal">Account Type <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='AccountType' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type Description</label>
                    <div className="col form-group">
                      <textarea className="form-control col-md-4" id='AccountTypedesc'  ></textarea>
                    </div>
                  </div>
                </form>
                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick} >Add Account Type</button>
                  <button className="btn btn-secondary ml-3" onClick={handleClickCancel}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : <LoadingPage />
      }
      <Footer />
    </div>
  )
}

export default InsertAccountType
