import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GetChartOfAccount, UpdateChartOfAccount } from '../../../api'


function EditChartAccount() {
  const [data, setData] = useState({})
  const themetype = localStorage.getItem('themetype')

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetChartOfAccount(localStorage.getItem('Organisation'), localStorage.getItem('ChartAccountsno'));
      setData(result)
    }
    fetchData();
  }, [])


  const handleClick = async (e) => {
    e.preventDefault();
    const account_sub_name = document.getElementById('account_sub_name').value;
    const result = await UpdateChartOfAccount(localStorage.getItem('Organisation'), localStorage.getItem('ChartAccountsno'), account_sub_name, localStorage.getItem('User_id'));
    if (result) {
      alert('Chart Of Account Updated Successfully')
      window.location.href = 'ShowChartAccount'
      localStorage.removeItem('ChartAccountsno')
    }

  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper bg-${themetype}`}>
        <div className="container-fluid">
          <h3 className="py-3 ml-5">Edit Chart Account</h3>
          <div className="card w-100">
            <form className={`card-body bg-${themetype}`}>
              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Sub Name</label>
                <div className="col form-group">
                  <input type="text" className="form-control col-md-4" id='account_sub_name' defaultValue={data.account_sub_name} />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Sub Name Code</label>
                <div className="col form-group">
                  <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_sub_name_code} />
                </div>
              </div>


              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name Code</label>
                <div className="col form-group">
                  <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_name_code} />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account type Code</label>
                <div className="col form-group">
                  <input type="number" className="form-control col-md-4" id='AccountTypeCode' value={data.account_type_code} />
                </div>
              </div>
              <div className="border-top card-body">
                <button type='submit' className="btn btn-success" onClick={handleClick} >Update</button>
                <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); localStorage.removeItem('ChartAccountsno'); window.location.href = "./ShowChartAccount"; }}>Cancel</button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <Footer theme={themetype} />
    </div>
  )
}

export default EditChartAccount
