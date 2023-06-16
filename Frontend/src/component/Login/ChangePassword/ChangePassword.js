import React, { useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { UserChangePassword } from '../../../api'
import './ChangePassword.css'
import img from '../../../images/cp.png'

function ChangePassword() {
    const [currentpass, setCurrentpass] = useState(false);
    const [newpassword, setNewpassword] = useState(false);
    const [cnfnewpassword, setCnfpasswordshow3] = useState(false);
    const [showalert, setShowalert] = useState(false);
    const [checkpass, setCheckpass] = useState(false);


    const handleClickToogle = (e) => {
        e.preventDefault();
        setCurrentpass(!currentpass);
    };

    const handleClickToogle2 = (e) => {
        e.preventDefault();
        setNewpassword(!newpassword);
    };

    const handleClickToogle3 = (e) => {
        e.preventDefault();
        setCnfpasswordshow3(!cnfnewpassword);
    };

    const handleDisableAlert = (e) => {
        e.preventDefault();
        setShowalert(false);
        setCheckpass(false)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        const userid = document.getElementById('userid').value
        const CurrentPassword = document.getElementById('CurrentPassword').value;
        const newpassword = document.getElementById('newpassword').value;
        const confirmpassword = document.getElementById('confirmpassword').value

        if (!CurrentPassword || !newpassword || !confirmpassword) {
            setCheckpass(!checkpass)
        }
        else {
            if(userid === localStorage.getItem('User_id')){
                if (newpassword === confirmpassword) {
                    const result = await UserChangePassword(localStorage.getItem('User_id'), newpassword, CurrentPassword)
                    if (result === 'Incorrect Current Password') {
                        setCheckpass(!checkpass)
                    }
                    else {
                        alert("Password changed successfully ...");
                        window.location.href = '/Home'
                    }
                }
                else {
                    setShowalert(true);
                }           
             }else{
                alert('Invalid User')
            }
            
        }
    }


    return (
        <>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div className={`content-wrapper`}>
                    <div className="container-fluid pt-4">
                        <div className='card'>
                            <article className="card-body div_cp">
                                <div className="div_cp_1">
                                    <h2 className='cp_heading'>Change Your Password</h2>
                                    <hr style={{ marginTop: "13px" }} />
                                    <form autoComplete='off' className='form-div'>
                                        <div className="form-group">
                                            <label htmlFor='password'>User ID:-</label>
                                            <div className="input-group">
                                                <input id="userid" name="CurrentPassword" placeholder="User id" className="form-control" type={"text"} onChange={handleDisableAlert} />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor='password'>Current Password:-</label>
                                            <div className="input-group">
                                                <input id="CurrentPassword" name="CurrentPassword" placeholder="New Password" className="form-control" type={currentpass ? "text" : "password"} onChange={handleDisableAlert} />
                                                <div className="input-group-append" onClick={handleClickToogle}>
                                                    <span className="input-group-text" >{currentpass ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor='password'>New Password:-</label>
                                            <div className="input-group">
                                                <input id="newpassword" name="newpassword" placeholder="New Password" className="form-control" type={newpassword ? "text" : "password"} onChange={handleDisableAlert} />
                                                <div className="input-group-append" onClick={handleClickToogle2}>
                                                    <span className="input-group-text" >{newpassword ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor='password'>Confirm Password:-</label>
                                                <div className="input-group">
                                                    <input id="confirmpassword" name="confirmpassword" placeholder="New Password" className="form-control" type={cnfnewpassword ? "text" : "password"} onChange={handleDisableAlert} />
                                                    <div className="input-group-append" onClick={handleClickToogle3}>
                                                        <span className="input-group-text" >{cnfnewpassword ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            showalert ?
                                                <p className='text-danger'>Password and Confirm Password must be same ... </p>
                                                : null
                                        }
                                        {
                                            checkpass ?
                                                <p className='text-danger'>Please! fill the correct current Password</p>
                                                : null
                                        }
                                        <button className='text-white border-0 p-2 w-100 change-btn' onClick={handleClick}>Change Password</button>
                                    </form>
                                </div>
                                <div className="div_cp_2 d-flex justify-content-center align-items-center">
                                    <img src={img} alt="img" loading="lazy" />
                                </div>

                            </article>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default ChangePassword
