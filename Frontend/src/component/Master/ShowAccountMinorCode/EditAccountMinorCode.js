import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GetAccountMinorCode, UpdateAccountMinorCode } from '../../../api'

function EditAccountMinorCode() {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAccountMinorCode(localStorage.getItem('Organisation'), localStorage.getItem('AccountMinorCode'));
      setData(result)
    }
    fetchData();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const account_name = document.getElementById('account_name').value;
    // const account_name_code = document.getElementById('account_name_code').value;
    // const account_type_code = document.getElementById('account_type_code').value
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');

    const result = await UpdateAccountMinorCode(org, localStorage.getItem('AccountMinorCode'), account_name, User_id);
    if (result) {
      alert('Account Minor Code Updated Successfully')
      localStorage.removeItem('AccountMinorCode')
      window.location.href = 'ShowChartAccount'
      // window.location.href = 'ShowAccountMinorCode'
    }
  }

  const handleChangeAccountName = (e) => {
    setData({ ...data, account_name: e.target.value })
  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className="container-fluid">
          <h3 className="ml-5 py-3">Edit Account Minor Code</h3>
          <div className={`card w-100 `}>
            <form className="card-body">
              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name</label>
                <div className="col form-group">
                  <input type="text" className="form-control col-md-4" id='account_name' value={data.account_name} onChange={(e) => handleChangeAccountName(e)} />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name Code</label>
                <div className="col form-group">
                  <input type="text" className="form-control col-md-4" id='account_name_code' value={data.account_name_code}
                  // onChange={(e) => handleChangeAccountNameCode(e)}
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                <div className="col form-group">
                  <input type="text" className="form-control col-md-4" id='account_type_code' value={data.account_type_code}
                  // onChange={(e) => handleChangeAccountTypeCode(e)} 
                  />
                </div>
              </div>
            </form>
            <div className="border-top card-footer">
              <button className="btn btn-success" onClick={handleClick}>Update</button>
              <button className="btn btn-secondary ml-3" onClick={() => {
                window.location.href = "./ShowChartAccount"; localStorage.removeItem('AccountMinorCode')
              }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EditAccountMinorCode
