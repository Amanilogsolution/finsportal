import React, { useState } from 'react'
import fins from '../../images/finsgrowlogo.png'
import './UserManualSidebar.css'
import DashboardUserManual from './DashboardUserManual/DashboardUserManual';
// Items
import ItemsUserManual from './ItemsUserManual/ItemsUserManual';
// Sales
import CustomerUserManual from './Sales/CustomerUserManual/CustomerUserManual';
import CustomerAddUserManual from './Sales/CustomerAddUserManual/CustomerAddUserManual';
import CustInvoiceUserManual from './Sales/CustInvoiceUserManual/CustInvoiceUserManual';
import SalesOrderUserManual from './Sales/SalesOrderUserManual/SalesOrderUserManual';
import RecurringInvUserManual from './Sales/RecurringInvUserManual/RecurringInvUserManual';

// Purchases
import VendorUserManual from './Purchases/VendorUserManual/VendorUserManual';
import BillUserManual from './Purchases/BillUserManual/BillUserManual';
import VendorAddUserManual from './Purchases/VendorAddUserManual/VendorAddUserManual';
const UserManualSidebar = () => {
    const [currentStep, setStep] = useState(1);

    const showStep = (step) => {
        switch (step) {
            case 1:
                return <DashboardUserManual />
            case 2:
                return <ItemsUserManual />
            case 3:
                return <CustomerUserManual />
            case 4:
                return <CustomerAddUserManual />
            case 5:
                return <CustInvoiceUserManual />
            case 6:
                return <SalesOrderUserManual />
            case 7:
                return <RecurringInvUserManual />
            case 8:
                return <VendorUserManual />
            case 9:
                return <VendorAddUserManual />
            case 10:
                return <BillUserManual />

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
                                <a href='/home'>Dashboard</a> </li>
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
                            <li onClick={() => { setStep(6) }}>Sales Order</li>
                            <li onClick={() => { setStep(7) }}>Recurring Invoice</li>
                        </ul>
                    </div>
                    <div className='fields'>
                        <div className='d-flex'>
                            <i className="fa fa-caret-down" aria-hidden="true" style={{ margin: "3px" }} ></i>
                            <p>Purchase</p>
                        </div>
                        <ul>
                            <li onClick={() => { setStep(8) }}>Vendor</li>
                            <li onClick={() => { setStep(9) }}>Address</li>
                            <li onClick={() => { setStep(10) }}>Bill</li>
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