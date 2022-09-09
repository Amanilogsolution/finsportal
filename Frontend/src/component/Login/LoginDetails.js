import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
// import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { showUserLogin, UploadData, updateImage, Login2fa, Verify2fa } from '../../api'
import './login.css'

const LoginDetails = () => {
    const [tfadata, setTfadata] = useState([]);
    const [data, setData] = useState({})
    const [file, setFile] = useState('')
    const [imagelink, setImageLink] = useState('')
    const [verify, setVerify] = useState('');

    useEffect(async () => {
        const result = await showUserLogin(localStorage.getItem('User_id'));
        setData(result)
        const org_name = localStorage.getItem('Organisation Name');
        const email = result.email_id;
        const tfadataapi = await Login2fa(email, org_name);
        setTfadata(tfadataapi)
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const result = await updateImage(localStorage.getItem('User_id'), imagelink)
        if (result) {
            window.location.href = './home'
            localStorage.setItem('User_img', imagelink)
        }

    }

    const handleSendFile = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("images", file)
        const UploadLink = await UploadData(data)
        setImageLink(UploadLink)
    }

    const handletfatoggle = () => {
        const checkdata = document.getElementById('ckeckboxtfa').checked;
        if (checkdata === true) {
            document.getElementById('tfadiv').style.display='flex';
        }
        else {
            document.getElementById('tfadiv').style.display='none';
        }
    }

    const handleverify = async (e) => {
        e.preventDefault()
        const inputtoken = document.getElementById('tokeninp').value;
        const vetfytokendata = await Verify2fa(tfadata.secret, inputtoken,data.user_id, localStorage.getItem('Organisation Name'))
        if (vetfytokendata === 'Verify') {
            setVerify(true)
        }
        else if (vetfytokendata === 'NotVerify') {
            setVerify(false)
        }
        else {
            setVerify('')
        }
    }

    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}
                <div>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">User Details</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <label htmlFor="profil_img" className="col-md-2 col-form-label font-weight-normal">Profil Image</label>
                                                    <div className="col form-group userimgdiv"   >
                                                        <img src={localStorage.getItem('User_img')} id="userimg" />
                                                        <i className="fa fa-camera cameraicon" aria-hidden="true" data-toggle="modal" data-target="#exampleModal"></i>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="employee_name" className="col-md-2 col-form-label font-weight-normal">Employee Name</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='employee_name' value={data.employee_name} disabled readonly />
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='role' value={data.role} disabled readonly />
                                                    </div>

                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="warehouse" className="col-md-2 col-form-label font-weight-normal">Warehouse</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='warehouse' value={data.warehouse} disabled readonly />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="username" className="col-md-2 col-form-label font-weight-normal">Username</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='username' value={data.user_id} disabled readonly />
                                                    </div>

                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="email_id" className="col-md-2 col-form-label font-weight-normal">Email ID</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='email_id' value={data.email_id} disabled readonly />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="phone" className="col-md-2 col-form-label font-weight-normal">Phone</label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='phone' value={data.phone} disabled readonly />
                                                    </div>

                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="operatemode" className="col-md-2 col-form-label font-weight-normal">Operate mode</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='operatemode' value={data.operate_mode} disabled readonly />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='customer' value={data.customer} disabled readonly />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="reporting_to" className="col-md-2 col-form-label font-weight-normal">Reporting To</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='reporting_to' value={data.reporting_to} disabled readonly />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="designation" className="col-md-2 col-form-label font-weight-normal">Designation </label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='designation' value={data.designation} disabled readonly />
                                                    </div>

                                                </div>


                                                <div className="form-row">
                                                    <label htmlFor="designation" className="col-md-2 col-form-label font-weight-normal">2 Factor Authentication </label>
                                                    <div className="col form-group">
                                                        <input type="checkbox" className="form-control col-md-1" id='ckeckboxtfa' onChange={handletfatoggle} style={{ height: "20px", width: "20px", marginTop: "5px" }} />
                                                    </div>

                                                </div>

                                                <div className="form-row" id="tfadiv" style={{display:"none"}}>
                                                    <div className="col-md-2 form-group" >
                                                    </div>
                                                    <div className="col-md-3 form-group" >
                                                        <img src={tfadata.qr} alt='' /><br />
                                                        <input type='number' id='tokeninp' placeholder='Enter Token' />
                                                        <button className='btn btn-success' onClick={handleverify}>Verify</button>
                                                        {verify === true ? <h5 style={{ color: "green" }}>Verify</h5> :
                                                            verify === false ? <h5 style={{ color: "red" }}>Wrong Token</h5>
                                                                : <p></p>}
                                                    </div>

                                                </div>

                                                <div className="border-top card-body">
                                                    <button className="btn btn-success" onClick={handleUpdate} >Update</button>
                                                    <button className="btn btn-light ml-3" onClick={() => window.location.href = './home'}>Cancel</button>
                                                </div>

                                            </form>
                                        </article>


                                    </div>

                                </div>

                            </div>

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
                                        onChange={event => {
                                            const document = event.target.files[0];
                                            setFile(document)
                                        }}
                                        accept=".jpg, .jpeg, .png,.svg"
                                    />

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSendFile} data-dismiss="modal">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default LoginDetails
