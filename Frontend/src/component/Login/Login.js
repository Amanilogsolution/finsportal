import React, { Component } from 'react'
import './login.css'


const Login = () => {
    const handleClick = (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        console.log(email, password)
        if (email === 'aman'|| email ==='rupesh' && password === 'alpha_9090') {
            window.location.href = '/home'
        }else{
            alert('Invalid Credentials')
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
                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" id="email" required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" id="password" required/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" onClick={handleClick} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login 
