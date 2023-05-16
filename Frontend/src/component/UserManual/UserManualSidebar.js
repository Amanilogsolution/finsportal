import React, { useState, useEffect } from 'react'
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
import PoUserManual from './Purchases/PoUserManual/PoUserManual';
import RecBillUserManual from './Purchases/RecBillUserManual/RecBillUserManual';
import DnUserManual from './Purchases/DnUserManual/DnUserManual';

// Accountant
import CurrAdjUserManual from './Accountant/CurrAdjUserManual/CurrAdjUserManual';
import JVUserManual from './Accountant/JVUserManual/JVUserManual';

// Master
import CountryUserManual from './Master/CountryUserManual/CountryUserManual';
import StateUserManual from './Master/StateUserManual/StateUserManual';
import CityUserManual from './Master/CityUserManual/CityUserManual';
import CurrencyUserManual from './Master/CurrencyUserManual/CurrencyUserManual';
import UnitUserManual from './Master/UnitUserManual/UnitUserManual';
import BankUserManual from './Master/BankUserManual/BankUserManual';
import User_UserManual from './Master/User_UserManual/User_UserManual';
import CompTypeUserManual from './Master/CompTypeUserManual/CompTypeUserManual';
import PayTermUserManual from './Master/PayTermUserManual/PayTermUserManual';
import EmpUserManual from './Master/EmpUserManual/EmpUserManual';
import ChartOfAccUserManual from './Master/ChartOfAccUserManual/ChartOfAccUserManual';
import RecFreUserManual from './Master/RecFreUserManual/RecFreUserManual';
import TdsHeadUserManual from './Master/TdsHeadUserManual/TdsHeadUserManual';

const UserManualSidebar = () => {
    const [currentStep, setStep] = useState(0);
    const [usermenutoggle, setUsermenutoggle] = useState({
        sales: false,
        purchases: false,
        accountant: false,
        master: false,
        organisation: false,
        setting: false,
    })


    const showStep = (step) => {
        const tag_array = [DashboardUserManual, ItemsUserManual, CustomerUserManual, CustomerAddUserManual,
            CustInvoiceUserManual, SalesOrderUserManual, RecurringInvUserManual, VendorUserManual,
            VendorAddUserManual, BillUserManual, PoUserManual, RecBillUserManual, DnUserManual,
            CurrAdjUserManual, JVUserManual, CountryUserManual, StateUserManual, CityUserManual, CurrencyUserManual,
            UnitUserManual, BankUserManual, User_UserManual, CompTypeUserManual, PayTermUserManual, EmpUserManual,
            ChartOfAccUserManual, RecFreUserManual, TdsHeadUserManual]

        const ComponentReturn = step < tag_array.length ? tag_array[step] : tag_array[0]
        return <ComponentReturn />
    }


    const handleToggleUl = (type) => {
        console.log(usermenutoggle)
        if (type === 'sales') {
            setUsermenutoggle({ ...usermenutoggle, sales: !usermenutoggle.sales })
        }
        else if (type === 'purchses') {
            setUsermenutoggle({ ...usermenutoggle, purchases: !usermenutoggle.purchases })
        }
        else if (type === 'accountant') {
            setUsermenutoggle({ ...usermenutoggle, accountant: !usermenutoggle.accountant })
        }
        else if (type === 'master') {
            setUsermenutoggle({ ...usermenutoggle, master: !usermenutoggle.master })
        }
        else if (type === 'organisation') {
            setUsermenutoggle({ ...usermenutoggle, organisation: !usermenutoggle.organisation })
        }
        else if (type === 'setting') {
            setUsermenutoggle({ ...usermenutoggle, setting: !usermenutoggle.setting })
        }
    }

    return (
        <div className='complete'>
            <div className='usermanual_sidebar position-fixed'>
                <div className='usermanual_brand p-2'>
                    <img src={fins} alt='company logo' />
                </div>
                <div className=' usermanualullist overflow-auto pl-3' style={{ height: " 90vh" }}>
                    <ul className='mt-3'>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { setStep(0) }}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <span className='pl-2'>  Home</span>
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { setStep(1) }}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <span className='pl-2'> Items</span>
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { handleToggleUl('sales') }}>
                            <i className={usermenutoggle.sales ? 'fa fa-caret-down' : 'fa fa-caret-right'} aria-hidden="true"></i>
                            <span className='pl-2 '> Sales</span>
                            {
                                usermenutoggle.sales ?
                                    <ul id='inner_ul' className='pl-4'>
                                        <li className='py-1' onClick={() => { setStep(2) }}>Customer</li>
                                        <li className='py-1' onClick={() => { setStep(3) }}>Address</li>
                                        <li className='py-1' onClick={() => { setStep(4) }}>Invoice</li>
                                        <li className='py-1' onClick={() => { setStep(5) }}>Sales Order</li>
                                        <li className='py-1' onClick={() => { setStep(6) }}>Recurring Invoice</li>
                                    </ul>
                                    : null
                            }

                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { handleToggleUl('purchses') }}>
                            <i className={usermenutoggle.purchases ? 'fa fa-caret-down' : 'fa fa-caret-right'} aria-hidden="true"></i>
                            <span className='pl-2'> Purchase</span>
                            {
                                usermenutoggle.purchases ?
                                    <ul id='inner_ul' className='pl-4' >
                                        <li className='py-1' onClick={() => { setStep(7) }}>Vendor</li>
                                        <li className='py-1' onClick={() => { setStep(8) }}>Vendor Address</li>
                                        <li className='py-1' onClick={() => { setStep(9) }}>Bill</li>
                                        <li className='py-1' onClick={() => { setStep(10) }}>Purchases Order</li>
                                        <li className='py-1' onClick={() => { setStep(11) }}>Recurring Bill</li>
                                        <li className='py-1' onClick={() => { setStep(12) }}>Debit Notes</li>
                                    </ul>
                                    : null
                            }
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { handleToggleUl('accountant') }}>
                            <i className={usermenutoggle.accountant ? 'fa fa-caret-down' : 'fa fa-caret-right'} aria-hidden="true"></i>
                            <span className='pl-2'> Accountant</span>
                            {
                                usermenutoggle.accountant ?
                                    <ul id='inner_ul' className='pl-4' >
                                        <li className='py-1' onClick={() => { setStep(13) }}>Currency-Adjustment</li>
                                        <li className='py-1' onClick={() => { setStep(14) }}>Journal Voucher</li>
                                    </ul>
                                    : null
                            }
                        </li>

                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { handleToggleUl('master') }}>
                            <i className={usermenutoggle.master ? 'fa fa-caret-down' : 'fa fa-caret-right'} aria-hidden="true"></i>
                            <span className='pl-2'> Master</span>
                            {
                                usermenutoggle.master ?
                                    <ul id='inner_ul' className='pl-4' >
                                        <li className='py-1' onClick={() => { setStep(15) }}>Country</li>
                                        <li className='py-1' onClick={() => { setStep(16) }}>State</li>
                                        <li className='py-1' onClick={() => { setStep(17) }}>City</li>
                                        <li className='py-1' onClick={() => { setStep(18) }}>Currency</li>
                                        <li className='py-1' onClick={() => { setStep(19) }}>Unit</li>
                                        <li className='py-1' onClick={() => { setStep(20) }}>Bank</li>
                                        <li className='py-1' onClick={() => { setStep(21) }}>User</li>
                                        <li className='py-1' onClick={() => { setStep(22) }}>Compliance Type</li>
                                        <li className='py-1' onClick={() => { setStep(23) }}>Payment Terms</li>
                                        <li className='py-1' onClick={() => { setStep(24) }}>Employee Master</li>
                                        <li className='py-1' onClick={() => { setStep(25) }}>Charts of Account</li>
                                        <li className='py-1' onClick={() => { setStep(26) }}>Recurring Frequency</li>
                                        <li className='py-1' onClick={() => { setStep(27) }}>Tds Head</li>
                                    </ul>
                                    : null
                            }
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { setStep(28) }}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <span className='pl-2'> Reports</span>
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { setStep(29) }}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <span className='pl-2'> Financial year</span>
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { handleToggleUl('organisation') }}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <span className='pl-2'> Organisation</span>
                            {
                                usermenutoggle.organisation ?
                                    <ul id='inner_ul' className='pl-4' >
                                        <li className='py-1' onClick={() => { setStep(30) }}>Organisation Switch</li>
                                        <li className='py-1' onClick={() => { setStep(31) }}>Add Organisation</li>
                                        <li className='py-1' onClick={() => { setStep(32) }}>Manage Organisation</li>
                                    </ul>
                                    : null
                            }
                        </li>
                        <li className='py-2 pl-3 cursor-pointer' onClick={() => { handleToggleUl('setting') }}>
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                            <span className='pl-2'> Project Setting</span>
                            {
                                usermenutoggle.setting ?
                                    <ul id='inner_ul' className='pl-4'>
                                        <li className='py-1' onClick={() => { setStep(33) }}>Organisation Profile</li>
                                        <li className='py-1' onClick={() => { setStep(34) }}>Financial Year / Sequence</li>
                                        <li className='py-1' onClick={() => { setStep(35) }}>Branch/ Location</li>
                                        <li className='py-1' onClick={() => { setStep(36) }}>Crm Master</li>
                                        <li className='py-1' onClick={() => { setStep(37) }}>Compliance</li>
                                        <li className='py-1' onClick={() => { setStep(38) }}>User Roles</li>
                                    </ul>
                                    : null
                            }
                        </li>

                    </ul>

                </div>
            </div>
            <div className='usermanual_content position-absolute'>
                <div className='usermanual_document_nav'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='text-secondary' style={{ fontWeight: "600" }}>Fins User Manual</h5>
                        <button className='btn btn-primary' onClick={() => { window.location.href = 'home' }}>Dashboard</button>
                    </div>
                </div>
                {showStep(currentStep)}
            </div>
        </div>
    )
}

export default UserManualSidebar