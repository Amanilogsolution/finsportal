import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GetAccountMinorCode, UpdateAccountMinorCode } from '../../../api'
import LoadingPage from '../../loadingPage/loadingPage';

function EditAccountMinorCode() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAccountMinorCode(localStorage.getItem('Organisation'), localStorage.getItem('AccountMinorCode'));
      setData(result)
      setLoading(true)
    }
    fetchData();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const account_name = document.getElementById('account_name').value;
    const remarks = document.getElementById('remarks').value;
    // const account_name_code = document.getElementById('account_name_code').value;
    // const account_type_code = document.getElementById('account_type_code').value
    const org = localStorage.getItem('Organisation');
    const User_id = localStorage.getItem('User_id');

    const result = await UpdateAccountMinorCode(org, localStorage.getItem('AccountMinorCode'), account_name, remarks, User_id);
    if (result === 'Added') {
      alert('Account Minor Code Updated Successfully')
      localStorage.removeItem('AccountMinorCode')
      window.location.href = 'ShowChartAccount'
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
            <div className="container-fluid">
              <h3 className="ml-5 py-3">Edit Account Minor Code</h3>
              <div className={`card w-100 `}>
                <form className="card-body">
                  <div className="form-row">
                    <label htmlFor="account_type_code" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='account_type_code' defaultValue={data.account_type_code} disabled />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="account_name_code" className="col-md-2 col-form-label font-weight-normal">Account Name Code</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='account_name_code' defaultValue={data.account_name_code} disabled />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="account_name" className="col-md-2 col-form-label font-weight-normal">Account Name</label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='account_name' defaultValue={data.account_name} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="remarks" className="col-md-2 col-form-label font-weight-normal">Description</label>
                    <div className="col form-group">
                      <textarea className="form-control col-md-4" id='remarks' defaultValue={data.account_description} />
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
          : <LoadingPage />
      }
      <Footer />
    </div>
  )
}

export default EditAccountMinorCode
