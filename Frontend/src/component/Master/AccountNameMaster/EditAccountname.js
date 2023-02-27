import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { SelectAccountName, UpdateAccountName } from '../../../api'


function EditAccountname() {
  const [data, setData] = useState({})
  const themeval = localStorage.getItem('themetype')

  useEffect(() => {
    const fetchData = async () => {
      const result = await SelectAccountName(localStorage.getItem('Organisation'), localStorage.getItem('AccountTypeCode'));
      setData(result)
    }
    fetchData();
  }, [])


  const handleClick = async (e) => {
    e.preventDefault();
    const org = localStorage.getItem('Organisation');
    const account_type = document.getElementById('AccountType').value;
    const account_type_code = document.getElementById('AccountTypeCode').value;
    const accountTypedesc = document.getElementById('AccountTypedesc').value;
    const User_id = localStorage.getItem("User_id");

    if (!account_type || !account_type_code) {
      alert('Please Fill the Mandatory fields')
    }
    else {
      const result = await UpdateAccountName(account_type, account_type_code, accountTypedesc, org, localStorage.getItem('AccountTypeCode'), User_id);
      if (result) {
        alert('Data Updated')
        window.location.href = './ShowAccountname'
      }
    }



  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper `}>
        <div className="container-fluid">
          <br /> <h3 className="ml-5">Edit Account Type</h3>
          <div className={`card w-100 `}>
            <form className="card-body">
              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type</label>
                <div className="col form-group">
                  <input type="text" className="form-control col-md-4" id='AccountType' defaultValue={data.account_type} />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                <div className="col form-group">
                  <input type="number" className="form-control col-md-4" id='AccountTypeCode' defaultValue={data.account_type_code} />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal" >Account Type Description</label>
                <div className="col form-group">
                  <textarea className="form-control col-md-4" id='AccountTypedesc' defaultValue={data.account_description}></textarea>
                </div>
              </div>
            </form>
            <div className="border-top card-footer">
              <button className="btn btn-success mx-3" onClick={handleClick} >Update</button>
              <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./ShowAccountname" }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer theme={themeval} />
    </div>
  )
}

export default EditAccountname
