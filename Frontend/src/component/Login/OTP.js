import React, { useState } from 'react'
import './login.css'
import { OTPVerification } from '../../api'


const OTPpage = () => {
 
    const handleClickPhone = async (e) => {
        e.preventDefault()
        const phoneno = document.getElementById('phoneno').value
        console.log(phoneno)  
        const OTP = Math.floor(Math.random()*1000000)
        localStorage.setItem('otpFins',OTP)
        const result = await OTPVerification(phoneno,OTP)
        if(result){
            document.getElementById('Phonediv').style.display="none"
            document.getElementById('Phonebutton').style.display="none"
            document.getElementById('Otpdiv').style.display="flex"
            document.getElementById('otpbutton').style.display="flex"
            document.getElementById('resendotp').style.display="flex"

        }
        console.log(result)
    }
    const handleClickOtp = async(e) =>{
        e.preventDefault()
        const Otp = document.getElementById('Otp').value
        console.log(Otp) 
        if(localStorage.getItem('otpFins') == Otp){
            alert('Success')
        }else{
            alert('Fail')
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

                        <h2 className="login-box-msg">Verification</h2>
                        {/* {
                            errormsg ? (
                                <h5 style={{ color: "red", textAlign: "center" }}>Please! enter valid Id & Password.</h5>
                            ) : null
                        } */}
                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3" id="Phonediv">
                                <input type="number" className="form-control" placeholder="Enter Mobile Number" id="phoneno" required />
                           
                            </div>
                            <div className="input-group mb-3" style={{display:"none"}} id="Otpdiv">
                                <input type="number" className="form-control" placeholder="Enter OTP" id="Otp" required />
                            
                            </div>
                            <div className="row">
                                <div className="col-5" style={{ marginLeft: "50%", transform: "translate(-50%)" }}>
                                    <button type="submit" onClick={handleClickPhone} className="btn btn-primary btn-block" id="Phonebutton">Send OTP</button>
                                    <button type="submit" onClick={handleClickOtp} style={{display:"none"}} id="otpbutton" className="btn btn-primary btn-block">Verify OTP</button>

                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            <a href="#" onClick={handleClickPhone} style={{display:"none"}} id="resendotp">Resend Otp</a>
                         

                        </p>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OTPpage 
