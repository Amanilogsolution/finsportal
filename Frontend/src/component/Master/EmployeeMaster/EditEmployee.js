import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { UpdateEmployee, ActiveLocationAddress, GetEmployee } from "../../../api";
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditEmployee = () => {
    const [loading, setLoading] = useState(false)
    const [locationlist, setLocationlist] = useState([])
    const [data, setData] = useState([])
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const location = await ActiveLocationAddress(org)
            setLocationlist(location)
            const emp = await GetEmployee(org, localStorage.getItem('EmpmasterSno'))
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

        if (!emp_name || !wh) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const result = await UpdateEmployee(localStorage.getItem('EmpmasterSno'), localStorage.getItem('Organisation'), emp_name, wh, data.emp_id, localStorage.getItem('User_id'));
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

    const handelChangeName = (e) => {
        setData({ emp_name: e.target.value })
    }

    const handelChangewh = (e) => {
        setData({ wh: e.target.value })
    }

    return (
        <div className="wrapper">
            {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
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
                                            <div className="col form-group">
                                                <input type='text' className="form-control col-md-4" id='emp_name' value={data.emp_name} onChange={handelChangeName} required />

                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label htmlFor="wh" className="col-md-2 col-form-label font-weight-normal">warehouse <span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <select className="form-control col-md-4" id='wh' onChange={handelChangewh}>
                                                    <option value={data.wh} hidden>{data.wh}</option>
                                                    {
                                                        locationlist.map((item, index) =>
                                                            <option key={index} value={item.location_name}>{item.location_name}</option>)
                                                    }
                                                </select>
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
