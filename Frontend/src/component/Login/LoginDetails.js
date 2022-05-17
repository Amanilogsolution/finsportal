import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { showUserLogin } from '../../api'
import './login.css'

const LoginDetails = () => {
    const [data, setData] = useState({})
    const User_img = localStorage.getItem("User_img");

    useEffect(async () => {
        const result = await showUserLogin(localStorage.getItem('User_id'));
        console.log(result)
        setData(result)
        // if (result.two_factor_authentication == 'With OTP') {
        //     document.getElementById('otp').checked = true
        //     setAuthentication('With OTP')
        // }
        // else {
        //     document.getElementById('noOTP').checked = true
        //     setAuthentication('Without OTP')
        // }

    }, [])




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
                            <br /> <h3 className="text-left ml-5">User Details</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>
                                                {/* form-group start.// */}
                                                <div className="form-row">
                                                    <label htmlFor="profil_img" className="col-md-2 col-form-label font-weight-normal">Profil Image</label>
                                                    <div className="col form-group userimgdiv"   >
                                                        <img src={localStorage.getItem("User_img")} id="userimg" />
                                                        <i className="fa fa-camera cameraicon" aria-hidden="true" data-toggle="modal" data-target="#exampleModal"></i>
                                                        {/* <button>Change Image</button> */}
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="employee_name" className="col-md-2 col-form-label font-weight-normal">Employee Name</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='employee_name' value={data.employee_name} disabled readonly />
                                                    </div>
                                                </div>
                                                {/* form-group start.// */}
                                                <div className="form-row">
                                                    <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='role' value={data.role} disabled readonly />
                                                    </div>

                                                </div>
                                                {/* form-group start.// */}
                                                <div className="form-row">
                                                    <label htmlFor="warehouse" className="col-md-2 col-form-label font-weight-normal">Warehouse</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='warehouse' value={data.warehouse} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="username" className="col-md-2 col-form-label font-weight-normal">Username</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='username' value={data.user_name} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                {/* <div className="form-row">
                                                    <label htmlFor="password" className="col-md-2 col-form-label font-weight-normal">Password</label>
                                                    <input name="password" type="password" class="form-control col-md-3" id="password" value={data.password} />
                                                    <div className="input-group-append">
                                                    </div>
                                                </div><br /> */}

                                                <div className="form-row">
                                                    <label htmlFor="email_id" className="col-md-2 col-form-label font-weight-normal">Email ID</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='email_id' value={data.email_id} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="phone" className="col-md-2 col-form-label font-weight-normal">Phone</label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='phone' value={data.phone} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                {/* asjnasjnaas */}

                                                <div className="form-row">
                                                    <label htmlFor="operatemode" className="col-md-2 col-form-label font-weight-normal">Operate mode</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='operatemode' value={data.operate_mode} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='customer' value={data.customer} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="reporting_to" className="col-md-2 col-form-label font-weight-normal">Reporting To</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='reporting_to' value={data.reporting_to} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="designation" className="col-md-2 col-form-label font-weight-normal">Designation </label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='designation' value={data.designation} disabled readonly />
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                {/* <div className="form-row">
                                                    <div className="col form-group">
                                                        <label
                                                            htmlfor="user_name"
                                                            className="col-md-2 col-form-label font-weight-normal"
                                                        >
                                                            Select Type
                                                        </label>

                                                        <label className="form-check form-check-inline">

                                                            <input
                                                                className="form-check-input" type="radio"
                                                                name="taxpreference"
                                                                value="With OTP"
                                                                id="otp"
                                                            />With OTP
                                                        </label>
                                                        <label className="form-check form-check-inline">

                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="taxpreference"
                                                                value="Without OTP"
                                                                id="noOTP"
                                                            />Without OTP
                                                        </label>
                                                    </div>
                                                </div> */}
                                            </form>
                                        </article>
                                        {/* card-body end .// */}
                                        <div className="border-top card-body">
                                            {/* <button className="btn btn-success">Update</button> */}
                                            <button className="btn btn-light ml-3" onClick={() => window.location.href = './home'}>Cancel</button>
                                        </div>
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
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Change Profile Image</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <label className="col-sm-5 col-form-label">
                                        Select Profile image
                                    </label>
                                    <input
                                        type="file"
                                        className=""
                                        placeholder=""
                                        accept=".jpg, .jpeg, .png,.svg"
                                    />

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default LoginDetails
