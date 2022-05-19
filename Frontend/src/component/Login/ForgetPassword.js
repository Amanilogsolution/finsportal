import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

function ForgetPassword() {
    const handleClick = (e) => {
       e.preventDefault()
       const userId =  document.getElementById('userId').value;
       const password = document.getElementById('password').value;
       const Resendpassword = document.getElementById('Resendpassword').value
       if(password===Resendpassword){

       }else{
           
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
                <div>
                    <div className="content-wrapper">

                        <div className="container-fluid">
                            <br />

                            <h3 className="text-left ml-5">Change Password</h3>
                            <br />
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card">
                                        <article className="card-body">
                                            <div>
                                                <div className="form-gap" />
                                                <div className="container"  style={{width:"50%" }}>
                                                    <div className="row">
                                                        <div className="col-md-7 col-md-offset-5" style={{margin:'auto', boxShadow:"5px 5px 10px gray" }}>
                                                            <div className="panel panel-default">
                                                                <div className="panel-body">
                                                                    <div className="text-center">
                                                                        <h4><i className="fa fa-lock fa-4x" /></h4>
                                                                        <h2 className="text-center">Change Password?</h2>
                                                                        <p>You can change your password here.</p>
                                                                        <div className="panel-body">
                                                                            <form id="register-form" role="form" autoComplete="off" className="form" method="post">
                                                                                <div className="form-group">
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                                                        <input id="userId" name="email" placeholder="Enter UserId" className="form-control" type="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                                                        <input id="password" name="email" placeholder="Enter Password" className="form-control" type="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                                                        <input id="Resendpassword" name="email" placeholder="ReEnter password" className="form-control" type="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <input name="recover-submit" className="btn btn-lg btn-primary btn-block" onClick={handleClick} type="submit" />
                                                                                </div>
                                                                                <input type="hidden" className="hide" name="token" id="token" defaultValue />
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </article>
                                    </div>
                                    {/* card.// */}
                                </div>
                                {/* col.//*/}
                            </div>
                            {/* row.//*/}
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
        </div>
    )
}

export default ForgetPassword
