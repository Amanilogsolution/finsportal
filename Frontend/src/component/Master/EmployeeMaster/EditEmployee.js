import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { UpdateEmployee, ActiveLocationAddress, locationAddress, GetEmployee } from "../../../api";
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditEmployee = () => {
    const [loading, setLoading] = useState(false)
    const [locationlist, setLocationlist] = useState([])
    const [data, setData] = useState([])
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [locationData, setLocationData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const location = await ActiveLocationAddress(org)
            setLocationlist(location)
            const emp = await GetEmployee(org, localStorage.getItem('EmpmasterSno'))
            const locationName = await locationAddress(org, emp.wh)
            setLocationData(locationName)
            setData(emp)
            setLoading(true)
        }
        fetchdata()
    }, [])


    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(false)
        const emp_name = document.getElementById('emp_name').value;
        const wh = document.getElementById('wh').value;
        const bank_name = document.getElementById('bank_name').value;
        const account_no = document.getElementById('account_no').value;
        const bank_holder_name = document.getElementById('bank_holder_name').value;
        const ifsc_code = document.getElementById('ifsc_code').value;
        const sno = localStorage.getItem('EmpmasterSno')
        const org = localStorage.getItem('Organisation')
        const User_id = localStorage.getItem('User_id')

        if (!emp_name || !wh) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const result = await UpdateEmployee(sno, org, emp_name, wh, bank_name, account_no, bank_holder_name, ifsc_code, data.emp_id, User_id);
            setLoading(true)
            if (result === "Updated") {
                localStorage.removeItem('EmpmasterSno');
                setAlertObj({ type: 'success', text: 'Data Updated', url: '/showemployee' })
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }

    }


    return (
        <div className="wrapper">
            <Header />
            {
                loading ?
                    <div className='content-wrapper'>
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">Edit Employee </h3>
                            <div className="card w-100">
                                <article className='card-body'>
                                    <form>
                                        <div className="form-row">
                                            <label htmlFor="emp_name" className="col-md-2 col-form-label font-weight-normal">Employee Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col-md-4 form-group">
                                                <input type='text' className="form-control col" id='emp_name' defaultValue={data.emp_name} required />
                                            </div>
                                            <label htmlFor="wh" className="col-md-2 col-form-label text-center font-weight-normal">warehouse <span style={{ color: "red" }}>*</span></label>
                                            <div className="col-md-4 form-group">
                                                <select className="form-control col" id='wh' >
                                                    <option value={data.wh} hidden>{locationData.location_name}</option>
                                                    {
                                                        locationlist.map((item, index) =>
                                                            <option key={index} value={item.location_id}>{item.location_name}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label htmlFor="bank_holder_name" className="col-md-2 col-form-label font-weight-normal">Bank Holder Name</label>
                                            <div className="col-md-4 form-group">
                                                <input type='text' className="form-control col-md" id='bank_holder_name' defaultValue={data.bank_holder_name} />
                                            </div>
                                            <label htmlFor="bank_name" className="col-md-2 col-form-label font-weight-normal text-center">Bank Name</label>
                                            <div className="col-md-4 form-group">
                                                <input type='text' className="form-control col-md" id='bank_name' defaultValue={data.bank_name} />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label htmlFor="account_no" className="col-md-2 col-form-label font-weight-normal">Account No.</label>
                                            <div className="col-md-4 form-group">
                                                <input type='text' id='account_no' className="form-control col-md" defaultValue={data.acct_no} />
                                            </div>
                                            <label htmlFor="ifsc_code" className="col-md-2 col-form-label font-weight-normal text-center">IFSC Code</label>
                                            <div className="col-md-4 form-group">
                                                <input type='text' id='ifsc_code' className="form-control col-md" defaultValue={data.ifsc_code} />
                                            </div>
                                        </div>
                                    </form>
                                </article>
                                <div className='border-top card-footer'>
                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                                    <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('EmpmasterSno'); window.location.href = "./showemployee" }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        {
                            alertObj.type ? <AlertsComp data={alertObj} /> : null
                        }
                    </div>
                    : <LoadingPage />
            }
            <Footer />
        </div>
    )

}

export default EditEmployee
