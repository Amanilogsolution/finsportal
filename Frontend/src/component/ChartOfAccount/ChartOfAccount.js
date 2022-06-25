import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { ShowChartOfAccount, ChartOfAccountParentAccount, ParentAccountNumber, AddAccountName, AddSubAccountName, UpdateSubAccountName, AddNewSubAccountName } from '../../api'


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
      const result = await AddAccountName(AccountType, Accountname, Accountnamecode, description);
      const data = await AddSubAccountName(AccountType, Accountnamecode)
    }
    else if (Accountnamecode.length === 6) {
      if (check === true) {

        const Update = await UpdateSubAccountName(Accountname, Accountnamecode, description, AccountType, parentaccount)
      }
      else {
        const result = await AddNewSubAccountName(Accountname, Accountnamecode, description, AccountType, parentaccount)

      }
    }
  }


  const handleAccountType = async (e) => {
    const account_type = e.target.value;
    setaccount_type(account_type)
    const result = await ChartOfAccountParentAccount(account_type);
    console.log(result)
    setaccount_name(result)

    const number = await ParentAccountNumber(account_type, account_name);
    console.log('Result',number)
    if(!number.result){
      setAccountno(account_type+'01')
    }
    else{

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
    console.log('Account',account_name)
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
    if (account_type.length === 3) {
      setaccount_type(accountsubno)
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

        <div className="content-wrapper">

          <div className="row justify-content-center " style={{ width: "100%", paddingTop: "30px" }}>
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
                      <div className="d-flex">
                        <select
                          id="AccountType"
                          className="form-control"
                          onChange={handleAccountType}
                        >
                          <option selected hidden>Choose</option>
                          {
                            chartofaccount.map((item, index) => {
                              return (
                                <option key={index} value={item.account_type_code}>{item.account_type}</option>
                              )

                            })
                          }

                        </select>
                        <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType";localStorage.setItem('Chart','Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Account Name <span style={{ color: "red" }}>*</span> </label>

                      <input type="text" className="form-control" id="Accountname" onFocus={handleChange} />
                    </div>

                    <p>
                      Make this a sub-account
                      <input type="checkbox"
                        id="checkboxgst"

                        onClick={handleClick}
                        style={{ float: "right" }}
                      />
                    </p>


                    <div className="form-group" id="parent" style={{ display: 'none' }}>
                      <label>Parent Account <span style={{ color: "red" }}>*</span> </label>


                      <select
                        id="parentaccount"
                        className="form-control"
                        onChange={handleParentAccount}
                      >
                        <option selected default hidden >Choose</option>
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

                      <input type="text" defaultValue={account_type} className="form-control" id="Accountnamecode" />
                    </div>

                    <div className="form-group">
                      <label>Description  </label>
                      <textarea name="text" className="form-control" id="description" cols="10" rows="3"></textarea>
                    </div>
                    <hr />
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="save"></label>
                      <div className="col-md-20" style={{ width: "100%" }}>
                        <button id="save" name="save" className="btn btn-danger" onClick={handleSubmit}>
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
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ChartOfAccount
