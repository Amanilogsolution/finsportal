import React, { useState } from 'react'
import './login.css'
import { UserLogin, OTPVerification, LoginLogs, Verify2fa } from '../../api'


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [passwordshow, setPasswordshow] = useState(false);
    const [errormsg, setErrormsg] = useState(false);
    const [otps, setOpts] = useState()
    const [phones, setPhones] = useState()
    const [count, setCount] = useState(0)
    const [twacheck, setTwacheck] = useState('msg')
    const [logindetails, setLogindetails] = useState({})

    const handleClickToogle = (e) => {
        e.preventDefault()
        setPasswordshow(!passwordshow)
    }
    const hidetext = () => {
        setErrormsg(false)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true)
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const result = await UserLogin(email, password);
        localStorage.setItem('themebtncolor',result.ThemeButton)
        localStorage.setItem('themetype',result.Theme)

        console.log(result)

        setLogindetails(result);
        if (result) {
            setLoading(false);
        }
        if(result.Loginstatus==='Login'){
            alert('You are Already Login in Some Device')
        }
        if (result.status == 'Success') {

            document.getElementById('verifybtn').style.display = 'flex';
            document.getElementById('submitbtn').style.display = 'none';
            if (result.Twofa) {
                setTwacheck('Twofa')
                document.getElementById('tokendiv').style.display = 'flex';
                document.getElementById('otpdiv').style.display = 'none';
            }
            else {
                document.getElementById('otpdiv').style.display = 'flex';
                document.getElementById('tokendiv').style.display = 'none';
                setPhones(result.number)
                const OTP = Math.floor(Math.random() * 1000000)
                setOpts(OTP)
                const result1 = await OTPVerification(result.number, OTP)
            }

            // localStorage.setItem('Token', result.token)
            // localStorage.setItem('ExpiredIn', result.expiresIn)
            // localStorage.setItem('Organisation', result.org_db_name)
            // localStorage.setItem('User_name', result.user_name)
            // localStorage.setItem('Organisation Name', result.org_name)
            // localStorage.setItem('User_id', result.user_id)
            // localStorage.setItem('User_img', result.image)
            // localStorage.setItem('fin_year', result.fin_year)
            // localStorage.setItem('year', result.year)

            // // setPhones(result.number)
            // // const OTP = Math.floor(Math.random() * 1000000)
            // // setOpts(OTP)
            // // const result1 = await OTPVerification(result.number, OTP)
            // // window.location.href = '/home'
            // const loginlogs = await LoginLogs(result.user_id, result.user_name, result.org_name, result.org_db_name)
        }
        else {
            setErrormsg(true);
        }
    }
    const handleClickVerify = async () => {
        if (twacheck === 'msg') {
            const otpinput = document.getElementById('otp').value
            if (otpinput == otps) {
                localStorage.setItem('Token', logindetails.token)
                localStorage.setItem('ExpiredIn', logindetails.expiresIn)
                localStorage.setItem('Organisation', logindetails.org_db_name)
                localStorage.setItem('User_name', logindetails.user_name)
                localStorage.setItem('Organisation Name', logindetails.org_name)
                localStorage.setItem('User_id', logindetails.user_id)
                localStorage.setItem('User_img', logindetails.image)
                localStorage.setItem('fin_year', logindetails.fin_year)
                localStorage.setItem('year', logindetails.year)
                localStorage.setItem('Organisation_details',logindetails.org_name)

                alert("Athorized successfully")
                const loginlogs = await LoginLogs(logindetails.user_id, logindetails.user_name, logindetails.org_name, logindetails.org_db_name)
                window.location.href = '/home'
            }
            else {
                setCount(count + 1)
                alert("Invalid Otp")
                if (count >= 2) {
                    alert("You are not User")
                    window.location.href = '/'
                }
            }
        }

        else {
            const token = document.getElementById('token').value
            const result1 = await Verify2fa(logindetails.Twofa, token, logindetails.user_id, logindetails.org_name,navigator.userAgent)
            if (result1 === 'Verify') {
                localStorage.setItem('Token', logindetails.token)
                localStorage.setItem('ExpiredIn', logindetails.expiresIn)
                localStorage.setItem('Organisation', logindetails.org_db_name)
                localStorage.setItem('User_name', logindetails.user_name)
                localStorage.setItem('Organisation Name', logindetails.org_name)
                localStorage.setItem('User_id', logindetails.user_id)
                localStorage.setItem('User_img', logindetails.image)
                localStorage.setItem('fin_year', logindetails.fin_year)
                localStorage.setItem('year', logindetails.year)
                localStorage.setItem('Organisation_details',logindetails.org_name)

                alert(result1)
                const loginlogs = await LoginLogs(logindetails.user_id, logindetails.user_name, logindetails.org_name, logindetails.org_db_name)
                window.location.href = '/home'
            }
            else {
                alert('Invalid Token')
            }
        }
    }
    const handleClickResendOtp = async (e) => {
        e.preventDefault()
        const result1 = await OTPVerification(phones, otps)
    }

    const handleClickOTP = (e) => {
        e.preventDefault()
        const otpinput = document.getElementById('Otp').value
        if (otpinput == otps) {
            alert("Athorized successfully")
            window.location.href = '/home'
        } else {
            setCount(count + 1)
            alert("Invalid Otp")
            if (count >= 2) {
                alert("You are not User")
                window.location.href = '/'
            }

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
                        <form >
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="User ID" id="email" onChange={hidetext} required />
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
                            </div>
                            <div className="input-group mb-3" id='tokendiv' style={{ display: "none" }} >
                                <input type="number" className="form-control" placeholder="Enter Token" id="token" autoComplete='off' required />
                            </div>
                            <div className="input-group mb-3" id='otpdiv' style={{ display: "none" }}>
                                <input type="number" className="form-control" placeholder="Enter OTP" id="otp" autoComplete='off' required />
                            </div>

                            <div className="row">
                                <div className="col-4" style={{ marginLeft: "50%", transform: "translate(-50%)" }}>
                                    <button type="submit" id='submitbtn' onClick={handleClick} className="btn btn-primary ">Sign In</button>
                                    <button type="button" id='verifybtn' onClick={handleClickVerify} className="btn btn-success" style={{ display: "none" }}>Verify</button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            {/* <a href="forgot-password.html">I forgot my password</a> */}
                            {/* <br /> */}
                            <a href="otppage">Login via OTP</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* #############  Loading Section Start ########################### */}
            {loading
                ?
                <div id='outerloadingdiv'>
                    <div id='innerloadingdiv' >
                        <div className="lds-spinner">
                            <div></div><div></div><div></div><div></div>
                            <div></div><div></div><div></div><div></div>
                            <div></div><div></div><div></div><div></div></div>
                        <h1>Wait a sec.</h1>
                    </div>
                </div>
                : null}
            {/* #############  Loading Section ENd ############################# */}


            {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal fade ">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Enter OTP</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="number" className="form-control" placeholder="Enter OTP" id="Otp" required />
                            <a href="#" onClick={handleClickResendOtp} id="resendotp">Resend OTP</a>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClickOTP} class="btn btn-primary">Verify User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        </div>
    )
}


export default Login 
