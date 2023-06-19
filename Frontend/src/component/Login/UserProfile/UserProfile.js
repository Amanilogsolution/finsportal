import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showUserLogin, UploadData, updateImage, Login2fa, Verify2fa } from '../../../api'
import './userProfile.css'
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';

const UserProfile = () => {
    const [loading, setLoading] = useState(true)
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [tfadata, setTfadata] = useState([]);
    const [data, setData] = useState({})
    const [file, setFile] = useState('')
    const [imagelink, setImageLink] = useState('')
    const [verify, setVerify] = useState('');

    const themecolor = localStorage.getItem('themetype') !== null ? localStorage.getItem('themetype') : 'light'
    let btnthemecolor = localStorage.getItem('themebtncolor');
    btnthemecolor = btnthemecolor === 'success' ? 'green' : btnthemecolor === 'primary' ? '#007bff' : btnthemecolor === 'info' ? '#17a2b8' : btnthemecolor === 'danger' ? 'red' : btnthemecolor === 'warning' ? 'yellow' : btnthemecolor === 'light' ? 'black' : btnthemecolor === 'dark' ? 'white' : 'blue'

    useEffect(async () => {
        const result = await showUserLogin(localStorage.getItem('User_id'));
        setData(result)
        const org_name = localStorage.getItem('Organisation Name');
        const email = result.email_id;
        const tfadataapi = await Login2fa(email, org_name);
        setTfadata(tfadataapi)
        if (result.two_factor_authentication === 'With TOTP') {
            document.getElementById('ckeckboxtfa').checked = true;
        }
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const result = await updateImage(localStorage.getItem('User_id'), imagelink)
        if (result) {
            localStorage.setItem('User_img', imagelink)
            setAlertObj({ type: 'success', text: 'Data Updated', url: '/home' })
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
            document.getElementById('tfadiv').style.display = 'block';
        }
        else {
            document.getElementById('tfadiv').style.display = 'none';
        }
    }

    const handleverify = async (e) => {
        e.preventDefault()
        const inputtoken = document.getElementById('tokeninp').value;
        const vetfytokendata = await Verify2fa(tfadata.secret, inputtoken, data.user_id, localStorage.getItem('Organisation Name'))
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
        <>
            <div className="wrapper">
                {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
                <Header />
                {
                    loading ?
                        <div className='content-wrapper'>
                            <div className="container-fluid py-3">
                                <h3 className="ml-5">User Details</h3>
                                <div className='card mx-4'>
                                    <form className="card-body " autoComplete='off'>
                                        <div className='d-flex justify-content-between'>
                                            <div className='userimg-div'>
                                                <div className="profile-text-div w-50 ml-5">
                                                    <h4><span style={{ color: btnthemecolor }}>Hi,</span> {data.employee_name}</h4>
                                                    <p className='mb-0'>Role:- {data.role}</p>
                                                    <p className='py-0 my-1'>Email:- {data.email_id}</p>
                                                </div>
                                            </div>
                                            <div className='inpfield-div position-relative' >
                                                <div className='p-1 rounded-circle' style={{ border: `5px solid ${btnthemecolor}`, width: '135px', height: '135px' }}>
                                                    <img src={localStorage.getItem('User_img')} id="userimg" className='h-100 w-100 rounded-circle' alt='Fins User image' />
                                                </div>
                                                <i className="fa fa-camera camraicon position-absolute" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" style={{ color: btnthemecolor }}></i>
                                            </div>
                                        </div>
                                        <h3 className='mb-0 pb-0 mx-0 mt-1 py-1 field-head-div text-center text-dark'>Details</h3>
                                        <section className='py-4 px-3 field-content-div text-dark' >
                                            <div className="form-row mt-2">
                                                <div className="form-group col">
                                                    <label htmlFor="employee_name" className="form-label font-weight-normal">Employee Name</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='employee_name' value={data.employee_name} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="role" className=" form-label font-weight-normal">Role</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='role' value={data.role} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="warehouse" className="form-label font-weight-normal">Warehouse</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='warehouse' value={data.warehouse} disabled />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <label htmlFor="username" className="form-label font-weight-normal">Username</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='username' value={data.user_id} disabled />
                                                    </div>

                                                </div>

                                                <div className="form-group col">
                                                    <label htmlFor="email_id" className="form-label font-weight-normal">Email ID</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='email_id' value={data.email_id} disabled />
                                                    </div>

                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="phone" className="form-label font-weight-normal">Phone</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="number" className="form-control" id='phone' value={data.phone} disabled />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <label htmlFor="operatemode" className="form-label font-weight-normal">Operate mode</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='operatemode' value={data.operate_mode} disabled />
                                                    </div>

                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="customer" className="form-label font-weight-normal">Customer</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='customer' value={data.customer} disabled />
                                                    </div>

                                                </div>
                                                <div className="form-group col">
                                                    <label htmlFor="reporting_to" className="form-label font-weight-normal">Reporting To</label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="text" className="form-control" id='reporting_to' value={data.reporting_to} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="designation" className="form-label font-weight-normal">Designation </label>
                                                <div className="col-md-10 form-group">
                                                    <input type="text" className="form-control" id='designation' value={data.designation} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-3">
                                                    <label htmlFor="ckeckboxtfa" className="form-label font-weight-normal">Two Factor Authentication </label>
                                                    <div className="col-md-10 form-group">
                                                        <input type="checkbox" className="form-control col-md-1 mt-2" id='ckeckboxtfa' onChange={handletfatoggle} />
                                                    </div>

                                                </div>
                                                <div className="col-md-3 form-row" id="tfadiv" style={{ display: "none" }}>
                                                    <img src={tfadata.qr} alt='' /><br />
                                                    <div className="col form-row mt-2"  >
                                                        <input type='number' id='tokeninp' className="form-control col-md-9"
                                                            placeholder='Enter Token' />
                                                        <button className='btn btn-success' onClick={handleverify}>Verify</button>
                                                        {verify === true ?
                                                            <h5 className='text-success'>Verify</h5>
                                                            : verify === false ? <h5 className='text-danger'>Wrong Token</h5>
                                                                : <p></p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </form>
                                    <div className="border-top card-footer d-flex justify-content-end">
                                        <button className="btn btn-success" onClick={handleUpdate} >Update</button>
                                        <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = './Home' }}>Cancel</button>
                                    </div>

                                </div>
                            </div>

                            {/* ############## Modal Start ######################### */}
                            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className='modal-content'>
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
                                                <input type="file" className=""
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
                            {/* ############## Modal End ######################### */}
                            {
                                alertObj.type ? <AlertsComp data={alertObj} /> : null
                            }
                        </div>
                        : <LoadingPage />
                }
                <Footer theme={themecolor} />
            </div>
        </>
    )

}
export default UserProfile
