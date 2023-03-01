import React, { useEffect, useState } from 'react'
import Footer from "../Footer/Footer";
import { ActiveCustomer, customernameChange, UpdateCustomerName } from '../../api'

import Header from "../Header/Header";

export default function CustomerNames() {
    const [activecustomer, setActiveCustomer] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)
            Todaydate()
        }
        fetchdata()
    }, [])
    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("date").value = today;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation')
        const User_id = localStorage.getItem('User_id')
        const customerid = document.getElementById('customer_id').value
        let cust_name = document.getElementById('customer_id')
        cust_name = cust_name.options[cust_name.selectedIndex].text;
        const name = document.getElementById('name').value
        const date = document.getElementById('date').value
        if (!cust_name) {
            alert('Please Enter Customer Name')
        }
        else {
            const result = await customernameChange(org, customerid, cust_name, date, User_id)
            const updatename = await UpdateCustomerName(org, name, customerid)

            if (updatename === 'Updated') {
                alert('Customer Name Changed')
                window.location.href = "/TotalCustomer"
            }
            else {
                alert('Server Error');
            }
        }
    }

    return (
        <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
            </div>
            <Header />
            <div className="content-wrapper">
                <div className="container-fluid">
                    <h3 className="py-4 pl-4"> New Customer Names</h3>
                    <div className="card">
                        <article className="card-body" >
                            <form autoComplete="off">
                                <div className="form-row ">
                                    <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <select id="customer_id" className="form-control col-md-4">
                                            <option value='' hidden>Select Customer</option>
                                            {
                                                activecustomer.map((items, index) => (
                                                    <option key={index} value={items.cust_id} >{items.cust_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >New Name <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <input type="text" className="form-control col-md-4 cursor-notallow" id="name" />
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Date <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <input type="date" className="form-control col-md-4 cursor-notallow" id="date" />
                                    </div>
                                </div>

                            </form>
                        </article>
                        <div className="card-footer border-top">
                            <button id="save" name="save" className="btn btn-danger" onClick={handleSubmit}>Update</button>
                            <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }}
                                name="clear" className="btn ml-2 btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
