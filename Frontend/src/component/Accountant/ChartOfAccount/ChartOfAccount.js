import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ShowChartOfAccount, ChartOfAccountParentAccount, ParentAccountNumber, AddAccountName, AddSubAccountName, UpdateSubAccountName, AddNewSubAccountName } from '../../../api'


function ChartOfAccount() {
  const [chartofaccount, setchartofaccount] = useState([]);
  const [account_type, setaccount_type] = useState('');
  const [account_name, setaccount_name] = useState([]);
  const [accountno, setAccountno] = useState('');
  const [accountsubno, setAccountsubno] = useState('');
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ShowChartOfAccount(localStorage.getItem("Organisation"));
      setchartofaccount(result)

    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const AccountType = document.getElementById('AccountType').value;
    const Accountname = document.getElementById('Accountname').value;
    const Accountnamecode = document.getElementById('Accountnamecode').value;
    const description = document.getElementById('description').value;
    const parentaccount = document.getElementById('parentaccount').value;


    if (Accountnamecode.length === 3) {
      await AddAccountName(AccountType, Accountname, Accountnamecode, description, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
      await AddSubAccountName(AccountType, Accountnamecode, localStorage.getItem('Organisation'))
    }
    else if (Accountnamecode.length === 6) {
      if (check === true) {
        await UpdateSubAccountName(Accountname, Accountnamecode, description, AccountType, parentaccount, localStorage.getItem('Organisation'), localStorage.getItem('User_id'))
      }
      else {
        await AddNewSubAccountName(Accountname, Accountnamecode, description, AccountType, parentaccount, localStorage.getItem('Organisation'), localStorage.getItem('User_id'))
      }
    }
  }


  const handleAccountType = async (e) => {
    const account_type = e.target.value;
    setaccount_type(account_type)
    const org = localStorage.getItem('Organisation');
    const result = await ChartOfAccountParentAccount(account_type, org);
    setaccount_name(result)

    const number = await ParentAccountNumber(account_type, account_name, org);

    if (!number.result) {
      setAccountno(account_type + '01')
    }
    else {
      const accountnamenum = parseInt(number.result.account_name_code) + 1;
      const accountnamenum1 = String(accountnamenum).padStart(2, '0');
      setAccountno(accountnamenum1)

      const accountsubnum = parseInt(number.result1.account_sub_name_code) + 1;
      const accountsubnum1 = String(accountsubnum).padStart(3, '0');
      setAccountsubno(accountsubnum1)
    }

  }

  const handleParentAccount = async (e) => {
    const account_name = e.target.value;
    setaccount_type(account_name)

    const number = await ParentAccountNumber(account_type, account_name);
    const accountnamenum = parseInt(number.result.account_name_code) + 1;
    const accountnamenum1 = String(accountnamenum).padStart(2, '0');
    setAccountno(accountnamenum1)

    if (!number.result1) {
      setAccountsubno(number.result.account_name_code + '001')
      setCheck(true)

    } else {
      const accountsubnum = parseInt(number.result1.account_sub_name_code) + 1;
      const accountsubnum1 = String(accountsubnum).padStart(3, '0');
      setAccountsubno(accountsubnum1)

    }
  }

  const handleClick = () => {
    document.getElementById('parent').style.display = 'block';

  };

  const handleChange = (e) => {
    e.preventDefault();
    if (account_type.length === 1) {
      setaccount_type(accountno)
    }
    if (account_type.length >= 3) {
      setaccount_type(accountsubno)
    }
  }

  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div>
      <Header />
      <div className={`content-wrapper py-2`}>
        <div className={`card w-50 m-auto`}>
          <article className="card-body" >
            <h3 className='text-center'>Chart Of Account</h3>
            <form autoComplete="off">
              <div className="form-group">
                <label>Account Type <span className='text-danger'>*</span> </label>
                <div className="d-flex">
                  <select
                    id="AccountType"
                    className="form-control"
                    onChange={handleAccountType}
                  >
                    <option value='' hidden>Choose</option>
                    {
                      chartofaccount.map((item, index) => {
                        return (
                          <option key={index} value={item.account_type_code}>{item.account_type}</option>
                        )
                      })
                    }
                  </select>
                  <button className="ml-2 bg-white rounded-circle font-weight-bold" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }}
                    style={{ height: "30px", width: "30px" }}>+</button>
                </div>
              </div>

              <div className="form-group">
                <label>Account Name <span className='text-danger'>*</span> </label>
                <input type="text" className="form-control" id="Accountname" onFocus={handleChange} />
              </div>
              <p>
                Make this a sub-account
                <input type="checkbox"
                  id="checkboxgst"
                  className='float-right'
                  onClick={handleClick}
                  style={{ height: '20px', wight: '20px' }} />
              </p>

              <div className="form-group" id="parent" style={{ display: 'none' }}>
                <label>Parent Account <span className='text-danger'>*</span> </label>
                <select
                  id="parentaccount"
                  className="form-control"
                  onChange={handleParentAccount}
                >
                  <option value='' default hidden >Choose</option>
                  {
                    account_name.map((item, index) => {
                      return (
                        <option key={index} value={item.account_name_code}>{item.account_name}</option>
                      )
                    }
                    )
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Account Code  </label>
                <input type="text" value={account_type} className="form-control" id="Accountnamecode" />
              </div>
              <div className="form-group">
                <label>Description  </label>
                <textarea name="text" className="form-control" id="description" cols="10" rows="3"></textarea>
              </div>
            </form>
          </article>
          <div className="card-footer border-top">
            <button id="save" name="save" className="btn btn-danger" onClick={handleSubmit}>
              Save
            </button>
            <button id="clear" onClick={(e) => {
              e.preventDefault(); window.location.href = '/home'
            }} name="clear" className="btn btn-secondary ml-2">Cancel</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ChartOfAccount
