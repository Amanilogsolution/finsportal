import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { AddAccountName, AddSubAccountName, ParentAccountNumber } from '../../../api/index'
import LoadingPage from '../../loadingPage/loadingPage';

function InsertMinorCode() {
  const [loading, setLoading] = useState(false)
  const [accountno, setAccountno] = useState('');

  useEffect( () => {
    const fetchData = async () => {
      const org = localStorage.getItem('Organisation');
      const account_type = localStorage.getItem('AccountType')
      const number = await ParentAccountNumber(account_type, '', org)

      if (!number.result) {
        setAccountno(account_type + '01')
      }
      else {
        const accountnamenum = parseInt(number.result.account_name_code) + 1;
        const accountnamenum1 = String(accountnamenum).padStart(2, '0');
        setAccountno(accountnamenum1)
      }
      setLoading(true)
    }
    fetchData();
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const Accountname = document.getElementById('Accountname').value
    const Accountnamecode = document.getElementById('Accountnamecode').value
    const description = document.getElementById('AccountTypedesc').value;

    if (!Accountname) {
      alert('Please Enter Name')
    }
    else {
      const result = await AddAccountName(localStorage.getItem('AccountType'), Accountname, Accountnamecode, description, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
      if (result === 'Already') {
        alert("Already")
      }
      else {
        window.location.href = '/ChartOfAccount'
        localStorage.removeItem('Chart')
      }
    }

  }

  const handleClickCancel = (e) => {
    e.preventDefault();
    window.location.href = '/ChartOfAccount'
    localStorage.removeItem('Chart')
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
              <h3 className="py-4 ml-5">Add Minor Account Name</h3>
              <div className='card w-100 '>
                <form className="card-body">
                  <div className="form-row">
                    <label htmlFor="AccountTypeCode" className="col-md-2 col-form-label font-weight-normal">Minor Code</label>
                    <div className="col form-group">
                      <input type="number" className="form-control col-md-4" id='Accountnamecode' value={accountno} disabled />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="AccountType" className="col-md-2 col-form-label font-weight-normal">Minor Name <span className='text-danger'>*</span></label>
                    <div className="col form-group">
                      <input type="text" className="form-control col-md-4" id='Accountname' />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Description</label>
                    <div className="col form-group">
                      <textarea className="form-control col-md-4" id='AccountTypedesc'  ></textarea>
                    </div>
                  </div>
                </form>
                <div className="border-top card-footer">
                  <button className="btn btn-success" onClick={handleClick} >Add Minor</button>
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

export default InsertMinorCode
