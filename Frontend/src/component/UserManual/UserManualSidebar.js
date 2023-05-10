import React, { useState } from 'react'
import './UserManualSidebar.css'
import Customer from './Customer/Customer';
import Items from './Items/Items';
import CustAddress from './CustomerAddress/CustAddress';
import Dashboard from './Dashboard/Dashboard';
import CustInvoice from './CustInvoice/CustInvoice';
import fins from '../../images/finsgrowlogo.png'
import { Link } from 'react-router-dom'
const UserManualSidebar = () => {
    const [currentStep, setStep] = useState(1);

    const showStep = (step) => {
        switch (step) {
            case 1:
                return <Dashboard />
            case 2:
                return <Items />
            case 3:
                return <Customer />
            case 4:
                return <CustAddress />
            case 5:
                return <CustInvoice />
        }
    }
    return (
        <div className='complete'>
            <div className='usermanual_sidebar position-fixed'>
                <div className='usermanual_brand p-2'>
                    <img src={fins} alt='company logo' />
                </div>
                <div className='overflow-auto' style={{ height: " 90vh" }}>
                    <div className='fields'>
                        <ul>
                            <li onClick={() => { setStep(1) }}>
                                <Link to='home'>Dashboard</Link> </li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <ul>
                            <li onClick={() => { setStep(2) }}>Items</li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <div className='d-flex'>
                            <i className="fa fa-caret-down" aria-hidden="true" style={{ margin: "3px" }} ></i><p >Sales</p>
                        </div>
                        <ul id='sales_ul' >
                            <li onClick={() => { setStep(3) }}>Customer</li>
                            <li onClick={() => { setStep(4) }}>Address</li>
                            <li onClick={() => { setStep(5) }}>Invoice</li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <div className='d-flex'>
                            <i className="fa fa-caret-down" aria-hidden="true" style={{ margin: "3px" }} ></i>
                            <p>Purchase</p>
                        </div>
                        <ul>
                            <li>Vendor</li>
                            <li>Address</li>
                            <li>Bill</li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <div className='d-flex'>
                            <i className="fa fa-caret-down" aria-hidden="true" style={{ margin: "3px" }} ></i><p>Accountant</p>
                        </div>
                        <ul>
                            <li>Currency Adjustment</li>
                            <li>Chart of Accounts</li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <div className='d-flex'>
                            <i className="fa fa-caret-down" aria-hidden="true" style={{ margin: "3px" }} ></i><p>Masters</p>
                        </div>
                        <ul>
                            <li>Country</li>
                            <li>State</li>
                            <li>City</li>
                            <li>Unit</li>
                            <li>Bank</li>
                            <li>User</li>
                            <li>Compliance Type</li>
                            <li>Payment Terms</li>
                            <li>Employee Master</li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <ul>
                            <li>Reports</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='usermanual_content position-absolute'>
                <div className='usermanual_document_nav'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='text-secondary' style={{ fontWeight: "600" }}>Fins User Manual</h5>
                        <button className='btn btn-primary'>Dashboard</button>
                    </div>
                </div>
                {showStep(currentStep)}
            </div>
        </div>
    )
}

export default UserManualSidebar