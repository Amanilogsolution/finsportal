import React, { useState } from 'react'
import './UserManualSidebar.css'
import Customer from './Customer/Customer';
import Items from './Items/Items';
import Dashboard from './Dashboard/Dashboard'
import CustAddress from './CustomerAddress/CustAddress';
import CustInvoice from './CustInvoice/CustInvoice';
import fins from '../../images/finsgrowlogo.png'

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
        <div>
            <div className='complete'>
                <div className='sidebar_div'>
                    <div className='brand'>
                        <img src={fins} alt='company logo' />
                    </div>
                    <div style={{ overflow: "auto", height: " 90vh" }}>
                        <div className='fields'>
                            <ul>
                                <li onClick={() => { setStep(1) }}>Dashboard</li>
                            </ul>
                        </div>
                        <div className='fields'>
                            <ul>
                                <li onClick={() => { setStep(2) }}>Items</li>
                            </ul>
                        </div>
                        <div className='fields'>
                            <div className='d-flex'>
                                <i className="fa fa-caret-down" aria-hidden="true" style={{ margin: "3px" }} ></i><p>Sales</p>
                            </div>
                            <ul>
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
                <div className='Content'>
                    <div className='Document_nav'>
                        <div className='d-flex justify-content-between'>
                            <h5 style={{ color: "gray", fontWeight: "600" }}>Fins Documents</h5>
                            <button style={{ marginTop: "-6px" }} className='btn btn-primary'>Sign In</button>
                        </div>
                    </div>
                    {showStep(currentStep)}
                </div>
            </div>
        </div>
    )
}

export default UserManualSidebar