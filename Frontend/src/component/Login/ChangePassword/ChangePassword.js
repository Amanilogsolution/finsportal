import React, { useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { UserChangePassword } from '../../../api'
import './ChangePassword.css'

function ChangePassword() {
    // const [showalert, setShowalert] = useState(false);
    // const [passwordshow, setPasswordshow] = useState(false);
    // const [checkpass, setCheckpass] = useState(false);
    // const [confpasswordshow, setConfpasswordshow] = useState(false);

    // const themecolor = localStorage.getItem('themetype') !== null ? localStorage.getItem('themetype') : 'light'
    // const btntheme = localStorage.getItem('themebtncolor') !== null ? localStorage.getItem('themebtncolor') : 'primary';

    // const handleClickToogle = (e) => {
    //     e.preventDefault()
    //     setPasswordshow(!passwordshow)
    // }
    // const handleClickToogle2 = (e) => {
    //     e.preventDefault()
    //     setConfpasswordshow(!confpasswordshow)
    // }

    // const handleClick = async (e) => {
    //     e.preventDefault()
    //     const CurrentPassword = document.getElementById('CurrentPassword').value;
    //     const password = document.getElementById('password').value;
    //     const confirmpassword = document.getElementById('confirmpassword').value
    //     if (!CurrentPassword || !password || !confirmpassword) {
    //         setCheckpass(!checkpass)
    //     }
    //     else {
    //         if (password === confirmpassword) {
    //             const result = await UserChangePassword(localStorage.getItem('User_id'), password, CurrentPassword)
    //             if (result === 'Incorrect Current Password') {
    //                 setCheckpass(!checkpass)
    //             }
    //             else {
    //                 alert("Password changed successfully ...");
    //                 window.location.href = '/home'
    //             }
    //         }
    //         else {
    //             setShowalert(true);
    //         }
    //     }
    // }
    // return (
    //     <>
    //         <div className="wrapper">
    //             <div className="preloader flex-column justify-content-center align-items-center">
    //                 <div className="spinner-border" role="status"> </div>
    //             </div>
    //             <Header />
    //             <div className={`content-wrapper`}>
    //                 <div className="container-fluid">
    //                     <h3 className="ml-5 py-3">Change Password</h3>
    //                     <div className={`card `}>
    //                         <article className="card-body ">
    //                             <div className="change-pass-container pt-2  mx-auto" >
    //                                 <h5 className='text-secondary text-right mx-3 border-bottom py-2 px-4'>All Field required</h5>
    //                                 <form autoComplete="off" className="change-pass-form my-5" >
    //                                     <div className="form-group">
    //                                         <label htmlFor='CurrentPassword'>Current Password:-</label>
    //                                         <input id="CurrentPassword" name="password" placeholder="Enter Current Password" className="form-control " type="text" onChange={() => { setCheckpass(false) }} />
    //                                     </div>
    //                                     <div className="form-group">
    //                                         <label htmlFor='password'>New Password:-</label>
    //                                         <div className="input-group">
    //                                             <input id="password" name="password" placeholder="New Password" className="form-control" type={passwordshow ? "text" : "password"} />
    //                                             <div className="input-group-append">
    //                                                 <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                     <div className="form-group input-group">
    //                                         <label htmlFor='confirmpassword'>Confirm Password:-</label>
    //                                         <div className="input-group">
    //                                             <input id="confirmpassword" name="confirmpassword" placeholder="Confirm password" className="form-control" type={confpasswordshow ? "text" : "password"} />
    //                                             <div className="input-group-append">
    //                                                 <span className="input-group-text" onClick={handleClickToogle2}>{confpasswordshow ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                     {
    //                                         showalert ?
    //                                             <p className='text-danger'>Password and Confirm Password Field do not match </p>
    //                                             : null
    //                                     }
    //                                     {
    //                                         checkpass ?
    //                                             <p className='text-danger'>Please! fill the correct current Password</p>
    //                                             : null
    //                                     }
    //                                     <div className="card-footer border-top">
    //                                         <input name="submit" className={`btn btn-lg btn-${btntheme} float-right`} onClick={handleClick} type="submit" value="Change Password" />
    //                                     </div>
    //                                 </form>
    //                             </div>
    //                         </article>
    //                     </div>
    //                 </div>
    //             </div>

    //             <Footer theme={themecolor} />
    //         </div>
    //     </>
    // )
}

export default ChangePassword
