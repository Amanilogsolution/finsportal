import React, { useState } from 'react'
import './login.css'
import { UserLogin, OTPVerification, LoginLogs, Verify2fa } from '../../api'
import Img1 from '../../images/LoginPage/1.png'
import Img2 from '../../images/LoginPage/2.png'
import Img3 from '../../images/LoginPage/3.png'
import FinsGrowlogo from '../../images/finsgrowlogo.png'

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
        localStorage.setItem('themebtncolor', result.ThemeButton)
        localStorage.setItem('themetype', result.Theme)

        setLogindetails(result);
        console.log(result)
        if (result) {
            setLoading(false);
        }
        if (result.Loginstatus === 'Login') {
            alert('You are Already Login in Some Device')
        }
        if (result.status === 'Success') {

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
            // // window.location.href = '/Home'
            // const loginlogs = await LoginLogs(result.user_id, result.user_name, result.org_name, result.org_db_name)
        }
        else {
            setErrormsg(true);
        }
    }

    const ResendOTP = async (e) => {
        e.preventDefault();
        const OTP = Math.floor(Math.random() * 1000000)
        setOpts(OTP)
        const result1 = await OTPVerification(phones, OTP)
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
                localStorage.setItem('financialstatus', logindetails.fin_year_status)
                localStorage.setItem('year', logindetails.year)
                localStorage.setItem('Organisation_details', logindetails.org_name)
                localStorage.setItem('Role', logindetails.UserRole)


                alert("Athorized successfully")
                const loginlogs = await LoginLogs(logindetails.user_id, logindetails.user_name, logindetails.org_name, logindetails.org_db_name)
                window.location.href = '/Home'
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
            const result1 = await Verify2fa(logindetails.Twofa, token, logindetails.user_id, logindetails.org_name, navigator.userAgent)
            if (result1 === 'Verify') {
                localStorage.setItem('Token', logindetails.token)
                localStorage.setItem('ExpiredIn', logindetails.expiresIn)
                localStorage.setItem('Organisation', logindetails.org_db_name)
                localStorage.setItem('User_name', logindetails.user_name)
                localStorage.setItem('Organisation Name', logindetails.org_name)
                localStorage.setItem('User_id', logindetails.user_id)
                localStorage.setItem('User_img', logindetails.image)
                localStorage.setItem('fin_year', logindetails.fin_year)
                localStorage.setItem('financialstatus', logindetails.fin_year_status)
                localStorage.setItem('year', logindetails.year)
                localStorage.setItem('Organisation_details', logindetails.org_name)
                localStorage.setItem('Role', logindetails.UserRole)
                alert(result1)
                const loginlogs = await LoginLogs(logindetails.user_id, logindetails.user_name, logindetails.org_name, logindetails.org_db_name)
                window.location.href = '/Home'
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
        if (otpinput === otps) {
            alert("Athorized successfully")
            window.location.href = '/Home'
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
        <>
            <div className='login_container position-relative'>
                <div className="login_box bg-white position-absolute d-flex">
                    <div className="login ">
                        <div className="finsgrowlogo mx-5 my-4">
                            <img src={FinsGrowlogo} alt='Fins LOgo' />
                        </div>
                        <h4 className='text-center mb-4'>Sign In</h4>
                        {

                            errormsg ? (
                                <h6 className='text-danger text-center'>Please! enter valid Id & Password.</h6>
                            ) : null
                        }
                        <form className='m-auto form-div'>
                            <div className="input-group mb-4">
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                                <input type="text" className="form-control" placeholder="User ID" id="email" onChange={hidetext} required />
                            </div>
                            <div className="input-group mb-3">
                                <input type={passwordshow ? "text" : "password"} className="form-control" placeholder="Password" id="password" onChange={hidetext} required />
                                <div className="input-group-append" onClick={handleClickToogle}>
                                    <div className="input-group-text">
                                        {passwordshow ? <i className="fa fa-eye" aria-hidden="true"></i> :
                                            <i className="fa fa-eye-slash" aria-hidden="true"></i>}
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3" id='tokendiv' style={{ display: "none" }} >
                                <input type="number" className="form-control" placeholder="Enter Token" id="token" autoComplete='off' required />
                            </div>
                            <div className="input-group mb-3 " id='otpdiv' style={{ display: "none" }}>
                                <input type="number" className="form-control " placeholder="Enter OTP" id="otp" autoComplete='off' required />
                                <div className='mt-0'>
                                    <button className='float-right btn btn-danger' onClick={ResendOTP}>Resend OTP</button>
                                </div>
                            </div>
                            {/* <button className='btn login-btn'>Login</button> */}
                            <button type="submit" id='submitbtn' onClick={handleClick} className="btn login-btn ">Sign In</button>
                            <button type="button" id='verifybtn' onClick={handleClickVerify} className="btn login-btn" style={{ display: "none" }}><span className='m-auto'>Verify</span></button>
                            <div className='mt-1'>
                                {/* <a href="forgot-password.html" className='text-danger float-left'>Forgot password ?</a> */}
                                <a href="./OtpPage" className='text-right'>Login via OTP</a>
                            </div>
                        </form>
                        <p className="text-center mt-2">Don't have an account ? <a href="/Signup">Sign up</a></p>

                    </div>



                    <div className="login_photo rounded-right">
                        <div id="carouselExampleIndicators" className="carousel slide login-slider" data-ride="carousel">
                            <ol className="carousel-indicators ">
                                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item  active">
                                    <img className="d-block" src={Img1} alt="First slide" />
                                    <h3 className="mt-4 text-light text-center">Records</h3>
                                    <p className="text-light text-center">
                                        Everyone has the right to freedom of thought,<br />
                                        conscience and religion; this right includes freedom<br />
                                        to change his religion or belief, and freedom
                                    </p>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block" src={Img2} alt="Second slide" />
                                    <h3 className="mt-4 text-light text-center">Debit Card</h3>
                                    <p className="text-light text-center">
                                        Everyone has the right to freedom of thought,<br />
                                        conscience and religion; this right includes freedom<br />
                                        to change his religion or belief, and freedom
                                    </p>
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block " src={Img3} alt="Third slide" />
                                    <h3 className="mt-4 text-light text-center">Profile</h3>
                                    <p className="text-light text-center">
                                        Everyone has the right to freedom of thought,<br />
                                        conscience and religion; this right includes freedom<br />
                                        to change his religion or belief, and freedom
                                    </p>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                            </a>
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
            </div>
        </>
    )


}


export default Login


// <div className="logincontainer">
//     <div className="login-box ">
//         <div className="card card-outline card-primary">
//             <div className="card-header text-center">
//                 <a href="../../index2.html" className="h1"><b>FINS</b></a>
//             </div>
//             <div className="card-body">
//                 <h1 className="login-box-msg">Login</h1>
//                 {

//                     errormsg ? (
//                         <h5 style={{ color: "red", textAlign: "center" }}>Please! enter valid Id & Password.</h5>
//                     ) : null
//                 }
//                 <form >
//                     <div className="input-group mb-3">
//                         <input type="text" className="form-control" placeholder="User ID" id="email" onChange={hidetext} required />
//                         <div className="input-group-append">
//                             <div className="input-group-text">
//                                 <span className="fas fa-envelope" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="input-group mb-3">
//                         <input type={passwordshow ? "text" : "password"} className="form-control" placeholder="Password" onChange={hidetext} id="password" required />
//                         <div className="input-group-append">
//                             <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}</span>
//                         </div>
//                     </div>
//                     <div className="input-group mb-3" id='tokendiv' style={{ display: "none" }} >
//                         <input type="number" className="form-control" placeholder="Enter Token" id="token" autoComplete='off' required />
//                     </div>
//                     <div className="input-group mb-3" id='otpdiv' style={{ display: "none" }}>
//                         <input type="number" className="form-control" placeholder="Enter OTP" id="otp" autoComplete='off' required />
//                     </div>

//                     <div className="row">
//                         <div className="col-4" style={{ marginLeft: "50%", transform: "translate(-50%)" }}>
//                             <button type="submit" id='submitbtn' onClick={handleClick} className="btn btn-primary ">Sign In</button>
//                             <button type="button" id='verifybtn' onClick={handleClickVerify} className="btn btn-success" style={{ display: "none" }}>Verify</button>
//                         </div>
//                     </div>
//                 </form>
//                 <p className="mb-1">
{/* <a href="forgot-password.html">I forgot my password</a> */ }
{/* <br /> */ }
{/* <a href="otppage">Login via OTP</a>
                        </p>
                    </div>
                </div>
            </div> */}

{/* #############  Loading Section Start ########################### */ }
{/* {loading
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
                : null} */}
{/* #############  Loading Section ENd ############################# */ }

{/* </div> */ }