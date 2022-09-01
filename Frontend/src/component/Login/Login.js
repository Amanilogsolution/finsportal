import React, { useState } from 'react'
import './login.css'
import { UserLogin,OTPVerification } from '../../api'


const Login = () => {
    const [passwordshow, setPasswordshow] = useState(false);
    const [errormsg, setErrormsg] = useState(false);

    const handleClickToogle = (e) => {
        e.preventDefault()
        setPasswordshow(!passwordshow)
    }
    const hidetext = () => {
        setErrormsg(false)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const result = await UserLogin(email, password)
        console.log(result.number)
        if (result.status == 'Success') {
            localStorage.setItem('Token', result.token)
            localStorage.setItem('ExpiredIn', result.expiresIn)
            localStorage.setItem('Organisation', result.org_db_name)
            localStorage.setItem('User_name', result.user_name)
            localStorage.setItem('Organisation Name', result.org_name)
            localStorage.setItem('User_id', result.user_id)
            localStorage.setItem('User_img', result.image)
            localStorage.setItem('fin_year', result.fin_year)
            localStorage.setItem('year', result.year)

            // const OTP = Math.floor(Math.random()*1000000)
            // const result1 = await OTPVerification(result.number,OTP)
            // console.log(result1)

            // window.location.href = '/home'
        }
        else {
            setErrormsg(true);
            // alert("Invalid Email & Password")
        }
    }

    return (
        <div className="logincontainer">
            <div className="login-box ">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>FINS</b></a>
                    </div>
                    <div className="card-body">

                        <h1 className="login-box-msg">Login</h1>
                        {
                            errormsg ? (
                                <h5 style={{ color: "red", textAlign: "center" }}>Please! enter valid Id & Password.</h5>
                            ) : null
                        }
                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" id="email" onChange={hidetext} required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type={passwordshow ? "text" : "password"} className="form-control" placeholder="Password" onChange={hidetext} id="password" required />
                                <div className="input-group-append">
                                    <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
                                </div>
                                {/* <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div> */}
                            </div>
                            <div className="row">
                                {/* <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div> */}


                                <div className="col-4" style={{ marginLeft: "50%", transform: "translate(-50%)" }}>
                                    <button type="submit" onClick={handleClick}  className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                            <br/>
                            <a href="otppage">Enter OTP</a>

                        </p>
                    </div>
                </div>
            </div>
     
        </div>
    )
}


export default Login 
