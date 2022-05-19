import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

function ForgetPassword() {
    const [showalert, setShowalert] = useState(false);
    const [passwordshow, setPasswordshow] = useState(false);
    const [confpasswordshow, setConfpasswordshow] = useState(false);

    const handleClickToogle = (e) => {
        e.preventDefault()
        setPasswordshow(!passwordshow)
    }
    const handleClickToogle2 = (e) => {
        e.preventDefault()
        setConfpasswordshow(!confpasswordshow)
    }

    const handleClick = (e) => {
        e.preventDefault()
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value
        if (password === confirmpassword) {

        } else {
            setShowalert(true);
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
                                                <div className="container" style={{ width: "50%" }}>
                                                    <div className="row">
                                                        <div className="col-md-7 col-md-offset-5" style={{ margin: 'auto', boxShadow: "5px 5px 10px gray" }}>
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
                                                                                        <input id="password" name="password" placeholder="New Password" className="form-control" type={passwordshow ? "text" : "password"} />
                                                                                        <div className="input-group-append">
                                                                                            <span className="input-group-text" onClick={handleClickToogle}>{passwordshow ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                                                        <input id="confirmpassword" name="confirmpassword" placeholder="Confirm password" className="form-control" type={confpasswordshow ? "text" : "password"} />
                                                                                        <div className="input-group-append">
                                                                                            <span className="input-group-text" onClick={handleClickToogle2}>{confpasswordshow ? <i className="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye" aria-hidden="true"></i>}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {
                                                                                    showalert ?
                                                                                        <p style={{ color: "red" }}>Password and Confirm Password Field do not match </p>
                                                                                        : null
                                                                                }

                                                                                <div className="form-group">
                                                                                    <input name="recover-submit" className="btn btn-lg btn-primary btn-block" onClick={handleClick} type="submit" value="Change" />
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
