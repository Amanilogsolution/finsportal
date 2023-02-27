import React, { useState, useEffect } from 'react';
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { ShowChartOfAccount, ChartOfAccountParentAccount, ParentAccountNumber, AddAccountName, AddSubAccountName, UpdateSubAccountName, AddNewSubAccountName } from '../../../api'


function ChartOfAccount2() {

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
        const AccountNameSelect = document.getElementById('AccountnameSelect').value
        const Accountnamecode = document.getElementById('Accountnamecode').value;
        const description = document.getElementById('description').value;
        const parentaccount = document.getElementById('parentaccount').value;


        if (check === true) {
            console.log('true')
                const result = await AddNewSubAccountName(parentaccount, Accountnamecode, description, AccountType, AccountNameSelect, localStorage.getItem('Organisation'), localStorage.getItem('User_id'))
    }else{
            const result = await AddAccountName(AccountType, Accountname, Accountnamecode, description, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
    }


        // if (Accountnamecode.length === 3) {
        //     const result = await AddAccountName(AccountType, Accountname, Accountnamecode, description, localStorage.getItem('Organisation'), localStorage.getItem('User_id'));
        //     const data = await AddSubAccountName(AccountType, Accountnamecode, localStorage.getItem('Organisation'))
        // }
        // else if (Accountnamecode.length === 6) {
        //     if (check === true) {

        //         const Update = await UpdateSubAccountName(Accountname, Accountnamecode, description, AccountType, parentaccount, localStorage.getItem('Organisation'), localStorage.getItem('User_id'))
        //     }
        //     else {
        //         const result = await AddNewSubAccountName(Accountname, Accountnamecode, description, AccountType, parentaccount, localStorage.getItem('Organisation'), localStorage.getItem('User_id'))

        //     }
        // }
    }


    const handleAccountType = async (e) => {
        const account_type = e.target.value;
        setaccount_type(account_type)
        const org = localStorage.getItem('Organisation');
        const result = await ChartOfAccountParentAccount(account_type, org);
        console.log(result)
        setaccount_name(result)

        const number = await ParentAccountNumber(account_type, account_name, org);

        console.log(number)

        if (!number.result) {
            setAccountno(account_type + '01')
        }
        else {

            const accountnamenum = parseInt(number.result.account_name_code) + 1;
            const accountnamenum1 = String(accountnamenum).padStart(2, '0');
            setAccountno(accountnamenum1)

            // const accountsubnum = parseInt(number.result1.account_sub_name_code) + 1;
            // const accountsubnum1 = String(accountsubnum).padStart(3, '0');
            // setAccountsubno(accountsubnum1)
        }

    }

    const handleParentAccount = async (e) => {
        const account_name = e.target.value;

        // setaccount_type(account_name)

        const number = await ParentAccountNumber(account_type, account_name, localStorage.getItem('Organisation'));
        console.log(number)
        const accountnamenum = parseInt(number.result1.account_name_code) + 1;
        const accountnamenum1 = String(accountnamenum).padStart(2, '0');
        setAccountno(accountnamenum1)

        if (!number.result1) {
            setAccountno(number.result.account_name_code + '001')
             setCheck(true)

        } else {
            const accountsubnum = parseInt(number.result1.account_sub_name_code) + 1;
            const accountsubnum1 = String(accountsubnum).padStart(3, '0');
            setAccountno(accountsubnum1)

        }

    }

    const handleClick = () => {
        // console.log(document.getElementById('checkboxgst').checked)
        if(document.getElementById('checkboxgst').checked == true){
            document.getElementById('AccountnameSelect').style.display = 'block';
            document.getElementById('parent').style.display = 'block';
            document.getElementById('Accountname').style.display = 'none';

            setCheck(true)

        
        }else{
            document.getElementById('AccountnameSelect').style.display = 'none';
            document.getElementById('Accountname').style.display = 'block';
            document.getElementById('parent').style.display = 'none';
            setCheck(false)

        }

      };


    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}

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
                                                    <option value='' hidden>Choose</option>
                                                    {
                                                        chartofaccount.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.account_type_code}>{item.account_type}</option>
                                                            )

                                                        })
                                                    }

                                                </select>
                                                <button className="ml-2 bg-white" onClick={(e) => { e.preventDefault(); window.location.href = "InsertAccountType"; localStorage.setItem('Chart', 'Chart') }} style={{ borderRadius: "50%", border: "1px solid blue", height: "25px", width: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ color: "blue" }}>+</span></button>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Account Name <span style={{ color: "red" }}>*</span> </label>

                                            <input type="text" className="form-control" id="Accountname"                                            />

                                            <select
                                                id="AccountnameSelect"
                                                className="form-control"
                                                style={{ display:"none"}}
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

                                        <p>
                                            Make this a sub-account
                                            <input type="checkbox"
                                                id="checkboxgst"
                                                onClick={handleClick}
                                                style={{ float: "right" }}
                                            />
                                        </p>

                                        <div className="form-group" id="parent" style={{ display: 'none' }}>
                                            <label>Sub Code <span style={{ color: "red" }}>*</span> </label>
                                      
                                            <input type="text" className="form-control" id="parentaccount"
        
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Account Code  </label>
                                            <input type="text" disabled value={accountno} className="form-control" id="Accountnamecode" />
                                        </div>
                                        <div className="form-group">
                                            <label>Description  </label>
                                            <textarea name="text" className="form-control" id="description" cols="10" rows="3"></textarea>
                                        </div>
                                        <hr />
                                        <div className="form-group">
                                            <label className="col-md-4 control-label" htmlFor="save"></label>
                                            <div className="col-md-20" style={{ width: "100%" }}>
                                                <button id="save" name="save" className="btn btn-danger"
                                                onClick={handleSubmit}
                                                >
                                                    Save
                                                </button>
                                                <button id="clear" onClick={(e) => {
                                                    e.preventDefault(); window.location.href = '/home'
                                                }} name="clear" className="btn btn-secondary ml-2">
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

export default ChartOfAccount2
