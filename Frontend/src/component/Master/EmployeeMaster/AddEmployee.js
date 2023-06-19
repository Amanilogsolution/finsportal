import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { InsertEmployee, ActiveLocationAddress } from "../../../api";
import AlertsComp from '../../AlertsComp';
import LoadingPage from '../../loadingPage/loadingPage';

const AddEmployee = () => {
    const [loading, setLoading] = useState(true)
    const [locationlist, setLocationlist] = useState([])
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })

    useEffect(() => {
        const fetchdata = async () => {
            const location = await ActiveLocationAddress(localStorage.getItem('Organisation'))
            setLocationlist(location)
        }
        fetchdata()
    }, [])


    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(false)
        const emp_name = document.getElementById('emp_name').value;
        const wh = document.getElementById('wh').value;

        const id = emp_name.slice(0, 3)
        const lastno = '' + Math.floor(Math.random() * 10000);
        const emp_id = id.toUpperCase() + lastno;


        if (!emp_name || !wh) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const result = await InsertEmployee(localStorage.getItem('Organisation'), emp_name, wh, emp_id, localStorage.getItem('User_id'));
            setLoading(true)
            if (result === "Added") {
                setAlertObj({ type: 'success', text: 'Employee Added', url: '/showemployee' })
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }

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
                            <br /> <h3 className="ml-5">Add Employee </h3>
                            <div className="card" >
                                <article className='card-body'>
                                    <form>
                                        <div className="form-row">
                                            <label htmlFor="emp_name" className="col-md-2 col-form-label font-weight-normal">Employee Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <input type='text' className="form-control col-md-4" id='emp_name' required />

                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label htmlFor="wh" className="col-md-2 col-form-label font-weight-normal">warehouse <span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <select className="form-control col-md-4" id='wh' >
                                                    <option value='' hidden>Select Location</option>
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
                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Add</button>
                                    <button className="btn btn-secondary ml-3" onClick={() => { window.location.href = "./showemployee" }}>Cancel</button>
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

export default AddEmployee
