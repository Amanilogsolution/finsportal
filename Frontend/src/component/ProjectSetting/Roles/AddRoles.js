import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import React, { useState } from 'react'

import { AddUserRole } from '../../../api'

const AddRoles = () => {
    const themeval = localStorage.getItem('themetype')
    const [alreadyrole, setAlreadyrole] = useState(false);

    const checkboxstyle = {
        height: "17px",
        width: "17px"
    };

    const fullaccess = (fullaccesstype) => {

        switch (fullaccesstype) {
            case 'cust': {
                const cust_full = document.getElementById('cust_full').checked === true ? 'true' : 'false'
                if (cust_full == 'true') {
                    document.getElementById('cust_create').disabled = false;
                    document.getElementById('cust_edit').disabled = false;
                    document.getElementById('cust_delete').disabled = false;

                    document.getElementById('cust_view').checked = true;
                    document.getElementById('cust_create').checked = true;
                    document.getElementById('cust_edit').checked = true;
                    document.getElementById('cust_delete').checked = true;
                }
                else {
                    document.getElementById('cust_create').disabled = true;
                    document.getElementById('cust_edit').disabled = true;
                    document.getElementById('cust_delete').disabled = true;

                    document.getElementById('cust_view').checked = false;
                    document.getElementById('cust_create').checked = false;
                    document.getElementById('cust_edit').checked = false;
                    document.getElementById('cust_delete').checked = false;
                }

            }
            case 'vend': {
                const vend_full = document.getElementById('vend_full').checked === true ? 'true' : 'false';
                if (vend_full == 'true') {
                    document.getElementById('vend_create').disabled = false;
                    document.getElementById('vend_edit').disabled = false;
                    document.getElementById('vend_delete').disabled = false;

                    document.getElementById('vend_view').checked = true;
                    document.getElementById('vend_create').checked = true;
                    document.getElementById('vend_edit').checked = true;
                    document.getElementById('vend_delete').checked = true;
                }
                else {
                    document.getElementById('vend_create').disabled = true;
                    document.getElementById('vend_edit').disabled = true;
                    document.getElementById('vend_delete').disabled = true;

                    document.getElementById('vend_view').checked = false;
                    document.getElementById('vend_create').checked = false;
                    document.getElementById('vend_edit').checked = false;
                    document.getElementById('vend_delete').checked = false;
                }
            }

            case 'item': {
                const items_full = document.getElementById('items_full').checked === true ? 'true' : 'false';
                if (items_full == 'true') {
                    document.getElementById('items_create').disabled = false;
                    document.getElementById('items_edit').disabled = false;
                    document.getElementById('items_delete').disabled = false;

                    document.getElementById('items_view').checked = true;
                    document.getElementById('items_create').checked = true;
                    document.getElementById('items_edit').checked = true;
                    document.getElementById('items_delete').checked = true;
                }
                else {
                    document.getElementById('items_create').disabled = true;
                    document.getElementById('items_edit').disabled = true;
                    document.getElementById('items_delete').disabled = true;

                    document.getElementById('items_view').checked = false;
                    document.getElementById('items_create').checked = false;
                    document.getElementById('items_edit').checked = false;
                    document.getElementById('items_delete').checked = false;
                }
            }


            case 'banking': {
                const banking_full = document.getElementById('banking_full').checked === true ? 'true' : 'false';
                if (banking_full == 'true') {
                    document.getElementById('banking_create').disabled = false;
                    document.getElementById('banking_edit').disabled = false;
                    document.getElementById('banking_delete').disabled = false;

                    document.getElementById('banking_view').checked = true;
                    document.getElementById('banking_create').checked = true;
                    document.getElementById('banking_edit').checked = true;
                    document.getElementById('banking_delete').checked = true;
                }
                else {
                    document.getElementById('banking_create').disabled = true;
                    document.getElementById('banking_edit').disabled = true;
                    document.getElementById('banking_delete').disabled = true;

                    document.getElementById('banking_view').checked = false;
                    document.getElementById('banking_create').checked = false;
                    document.getElementById('banking_edit').checked = false;
                    document.getElementById('banking_delete').checked = false;
                }
            }

            case 'invoice': {
                const invoice_full = document.getElementById('invoice_full').checked === true ? 'true' : 'false';
                if (invoice_full == 'true') {
                    document.getElementById('invoice_create').disabled = false;
                    document.getElementById('invoice_edit').disabled = false;
                    document.getElementById('invoice_delete').disabled = false;

                    document.getElementById('invoice_view').checked = true;
                    document.getElementById('invoice_create').checked = true;
                    document.getElementById('invoice_edit').checked = true;
                    document.getElementById('invoice_delete').checked = true;
                }
                else {
                    document.getElementById('invoice_create').disabled = true;
                    document.getElementById('invoice_edit').disabled = true;
                    document.getElementById('invoice_delete').disabled = true;

                    document.getElementById('invoice_view').checked = false;
                    document.getElementById('invoice_create').checked = false;
                    document.getElementById('invoice_edit').checked = false;
                    document.getElementById('invoice_delete').checked = false;
                }
            }

            case 'bill': {
                const bills_full = document.getElementById('bills_full').checked === true ? 'true' : 'false';
                if (bills_full == 'true') {
                    document.getElementById('bills_create').disabled = false;
                    document.getElementById('bills_edit').disabled = false;
                    document.getElementById('bills_delete').disabled = false;

                    document.getElementById('bills_view').checked = true;
                    document.getElementById('bills_create').checked = true;
                    document.getElementById('bills_edit').checked = true;
                    document.getElementById('bills_delete').checked = true;
                }
                else {
                    document.getElementById('bills_create').disabled = true;
                    document.getElementById('bills_edit').disabled = true;
                    document.getElementById('bills_delete').disabled = true;

                    document.getElementById('bills_view').checked = false;
                    document.getElementById('bills_create').checked = false;
                    document.getElementById('bills_edit').checked = false;
                    document.getElementById('bills_delete').checked = false;
                }
            }
            case 'chartofaccount': {
                const chartacct_full = document.getElementById('chartacct_full').checked === true ? 'true' : 'false';
                if (chartacct_full == 'true') {
                    document.getElementById('chartacct_create').disabled = false;
                    document.getElementById('chartacct_edit').disabled = false;
                    document.getElementById('chartacct_delete').disabled = false;

                    document.getElementById('chartacct_view').checked = true;
                    document.getElementById('chartacct_create').checked = true;
                    document.getElementById('chartacct_edit').checked = true;
                    document.getElementById('chartacct_delete').checked = true;
                }
                else {
                    document.getElementById('chartacct_create').disabled = true;
                    document.getElementById('chartacct_edit').disabled = true;
                    document.getElementById('chartacct_delete').disabled = true;

                    document.getElementById('chartacct_view').checked = false;
                    document.getElementById('chartacct_create').checked = false;
                    document.getElementById('chartacct_edit').checked = false;
                    document.getElementById('chartacct_delete').checked = false;
                }
            }

            case 'users': {
                const users_full = document.getElementById('users_full').checked === true ? 'true' : 'false';
                if (users_full == 'true') {
                    document.getElementById('users_create').disabled = false;
                    document.getElementById('users_edit').disabled = false;
                    document.getElementById('users_delete').disabled = false;

                    document.getElementById('users_view').checked = true;
                    document.getElementById('users_create').checked = true;
                    document.getElementById('users_edit').checked = true;
                    document.getElementById('users_delete').checked = true;
                }
                else {
                    document.getElementById('users_create').disabled = true;
                    document.getElementById('users_edit').disabled = true;
                    document.getElementById('users_delete').disabled = true;

                    document.getElementById('users_view').checked = false;
                    document.getElementById('users_create').checked = false;
                    document.getElementById('users_edit').checked = false;
                    document.getElementById('users_delete').checked = false;
                }
            }

            case 'payment_term': {
                const paymentTerm_full = document.getElementById('paymentTerm_full').checked === true ? 'true' : 'false';
                if (paymentTerm_full == 'true') {
                    document.getElementById('paymentTerm_create').disabled = false;
                    document.getElementById('paymentTerm_edit').disabled = false;
                    document.getElementById('paymentTerm_delete').disabled = false;

                    document.getElementById('paymentTerm_view').checked = true;
                    document.getElementById('paymentTerm_create').checked = true;
                    document.getElementById('paymentTerm_edit').checked = true;
                    document.getElementById('paymentTerm_delete').checked = true;
                }
                else {
                    document.getElementById('paymentTerm_create').disabled = true;
                    document.getElementById('paymentTerm_edit').disabled = true;
                    document.getElementById('paymentTerm_delete').disabled = true;

                    document.getElementById('paymentTerm_view').checked = false;
                    document.getElementById('paymentTerm_create').checked = false;
                    document.getElementById('paymentTerm_edit').checked = false;
                    document.getElementById('paymentTerm_delete').checked = false;
                }
            }
        }

    }


    const viewoff = (viewofftype) => {

        switch (viewofftype) {
            case 'cust': {
                const cust_view = document.getElementById('cust_view').checked === true ? 'true' : 'false'
                if (cust_view == 'false') {
                    document.getElementById('cust_create').disabled = true;
                    document.getElementById('cust_edit').disabled = true;
                    document.getElementById('cust_delete').disabled = true;

                    document.getElementById('cust_full').checked = false;
                    document.getElementById('cust_create').checked = false;
                    document.getElementById('cust_edit').checked = false;
                    document.getElementById('cust_delete').checked = false;
                }
                else {
                    document.getElementById('cust_create').disabled = false;
                    document.getElementById('cust_edit').disabled = false;
                    document.getElementById('cust_delete').disabled = false;
                }
            }

            case 'vend': {
                const vend_view = document.getElementById('vend_view').checked === true ? 'true' : 'false'
                if (vend_view == 'false') {
                    document.getElementById('vend_create').disabled = true;
                    document.getElementById('vend_edit').disabled = true;
                    document.getElementById('vend_delete').disabled = true;

                    document.getElementById('vend_full').checked = false;
                    document.getElementById('vend_create').checked = false;
                    document.getElementById('vend_edit').checked = false;
                    document.getElementById('vend_delete').checked = false;
                }
                else {
                    document.getElementById('vend_create').disabled = false;
                    document.getElementById('vend_edit').disabled = false;
                    document.getElementById('vend_delete').disabled = false;
                }
            }
            case 'item': {
                const items_view = document.getElementById('items_view').checked === true ? 'true' : 'false'
                if (items_view == 'false') {
                    document.getElementById('items_create').disabled = true;
                    document.getElementById('items_edit').disabled = true;
                    document.getElementById('items_delete').disabled = true;

                    document.getElementById('items_full').checked = false;
                    document.getElementById('items_create').checked = false;
                    document.getElementById('items_edit').checked = false;
                    document.getElementById('items_delete').checked = false;
                }
                else {
                    document.getElementById('items_create').disabled = false;
                    document.getElementById('items_edit').disabled = false;
                    document.getElementById('items_delete').disabled = false;
                }
            }
            case 'banking': {
                const banking_view = document.getElementById('banking_view').checked === true ? 'true' : 'false'
                if (banking_view == 'false') {
                    document.getElementById('banking_create').disabled = true;
                    document.getElementById('banking_edit').disabled = true;
                    document.getElementById('banking_delete').disabled = true;

                    document.getElementById('banking_full').checked = false;
                    document.getElementById('banking_create').checked = false;
                    document.getElementById('banking_edit').checked = false;
                    document.getElementById('banking_delete').checked = false;
                }
                else {
                    document.getElementById('banking_create').disabled = false;
                    document.getElementById('banking_edit').disabled = false;
                    document.getElementById('banking_delete').disabled = false;
                }
            }
            case 'invoice': {
                const invoice_view = document.getElementById('invoice_view').checked === true ? 'true' : 'false'
                if (invoice_view == 'false') {
                    document.getElementById('invoice_create').disabled = true;
                    document.getElementById('invoice_edit').disabled = true;
                    document.getElementById('invoice_delete').disabled = true;

                    document.getElementById('invoice_full').checked = false;
                    document.getElementById('invoice_create').checked = false;
                    document.getElementById('invoice_edit').checked = false;
                    document.getElementById('invoice_delete').checked = false;
                }
                else {
                    document.getElementById('invoice_create').disabled = false;
                    document.getElementById('invoice_edit').disabled = false;
                    document.getElementById('invoice_delete').disabled = false;
                }
            }

            case 'bill': {
                const bills_view = document.getElementById('bills_view').checked === true ? 'true' : 'false'
                if (bills_view == 'false') {
                    document.getElementById('bills_create').disabled = true;
                    document.getElementById('bills_edit').disabled = true;
                    document.getElementById('bills_delete').disabled = true;

                    document.getElementById('bills_full').checked = false;
                    document.getElementById('bills_create').checked = false;
                    document.getElementById('bills_edit').checked = false;
                    document.getElementById('bills_delete').checked = false;
                }
                else {
                    document.getElementById('bills_create').disabled = false;
                    document.getElementById('bills_edit').disabled = false;
                    document.getElementById('bills_delete').disabled = false;
                }
            }
            case 'chartofaccount': {
                const chartacct_view = document.getElementById('chartacct_view').checked === true ? 'true' : 'false'
                if (chartacct_view == 'false') {
                    document.getElementById('chartacct_create').disabled = true;
                    document.getElementById('chartacct_edit').disabled = true;
                    document.getElementById('chartacct_delete').disabled = true;

                    document.getElementById('chartacct_full').checked = false;
                    document.getElementById('chartacct_create').checked = false;
                    document.getElementById('chartacct_edit').checked = false;
                    document.getElementById('chartacct_delete').checked = false;
                }
                else {
                    document.getElementById('chartacct_create').disabled = false;
                    document.getElementById('chartacct_edit').disabled = false;
                    document.getElementById('chartacct_delete').disabled = false;
                }
            }

            case 'users': {
                const users_view = document.getElementById('users_view').checked === true ? 'true' : 'false'
                if (users_view == 'false') {
                    document.getElementById('users_create').disabled = true;
                    document.getElementById('users_edit').disabled = true;
                    document.getElementById('users_delete').disabled = true;

                    document.getElementById('users_full').checked = false;
                    document.getElementById('users_create').checked = false;
                    document.getElementById('users_edit').checked = false;
                    document.getElementById('users_delete').checked = false;
                }
                else {
                    document.getElementById('users_create').disabled = false;
                    document.getElementById('users_edit').disabled = false;
                    document.getElementById('users_delete').disabled = false;
                }
            }
            case 'payment_term': {
                const paymentTerm_view = document.getElementById('paymentTerm_view').checked === true ? 'true' : 'false'
                if (paymentTerm_view == 'false') {
                    document.getElementById('paymentTerm_create').disabled = true;
                    document.getElementById('paymentTerm_edit').disabled = true;
                    document.getElementById('paymentTerm_delete').disabled = true;

                    document.getElementById('paymentTerm_full').checked = false;
                    document.getElementById('paymentTerm_create').checked = false;
                    document.getElementById('paymentTerm_edit').checked = false;
                    document.getElementById('paymentTerm_delete').checked = false;
                }
                else {
                    document.getElementById('paymentTerm_create').disabled = false;
                    document.getElementById('paymentTerm_edit').disabled = false;
                    document.getElementById('paymentTerm_delete').disabled = false;
                }
            }
        }
    }



    const handlesubmitdata = async (e) => {
        e.preventDefault();
        const role = document.getElementById('role').value;
        let role_id = role + Math.floor(Math.random() * 100000);
        const description = document.getElementById('description').value;
        const cust_view = document.getElementById('cust_view').checked === true ? 'true' : 'false';
        const cust_create = document.getElementById('cust_create').checked === true ? 'true' : 'false';
        const cust_edit = document.getElementById('cust_edit').checked === true ? 'true' : 'false';
        const cust_delete = document.getElementById('cust_delete').checked === true ? 'true' : 'false';

        const vend_view = document.getElementById('vend_view').checked === true ? 'true' : 'false';
        const vend_create = document.getElementById('vend_create').checked === true ? 'true' : 'false';
        const vend_edit = document.getElementById('vend_edit').checked === true ? 'true' : 'false';
        const vend_delete = document.getElementById('vend_delete').checked === true ? 'true' : 'false';

        const items_view = document.getElementById('items_view').checked === true ? 'true' : 'false';
        const items_create = document.getElementById('items_create').checked === true ? 'true' : 'false';
        const items_edit = document.getElementById('items_edit').checked === true ? 'true' : 'false';
        const items_delete = document.getElementById('items_delete').checked === true ? 'true' : 'false';

        const banking_view = document.getElementById('banking_view').checked === true ? 'true' : 'false';
        const banking_create = document.getElementById('banking_create').checked === true ? 'true' : 'false';
        const banking_edit = document.getElementById('banking_edit').checked === true ? 'true' : 'false';
        const banking_delete = document.getElementById('banking_delete').checked === true ? 'true' : 'false';

        const invoice_view = document.getElementById('invoice_view').checked === true ? 'true' : 'false';
        const invoice_create = document.getElementById('invoice_create').checked === true ? 'true' : 'false';
        const invoice_edit = document.getElementById('invoice_edit').checked === true ? 'true' : 'false';
        const invoice_delete = document.getElementById('invoice_delete').checked === true ? 'true' : 'false';

        const bills_view = document.getElementById('bills_view').checked === true ? 'true' : 'false';
        const bills_create = document.getElementById('bills_create').checked === true ? 'true' : 'false';
        const bills_edit = document.getElementById('bills_edit').checked === true ? 'true' : 'false';
        const bills_delete = document.getElementById('bills_delete').checked === true ? 'true' : 'false';

        const chartacct_view = document.getElementById('chartacct_view').checked === true ? 'true' : 'false';
        const chartacct_create = document.getElementById('chartacct_create').checked === true ? 'true' : 'false';
        const chartacct_edit = document.getElementById('chartacct_edit').checked === true ? 'true' : 'false';
        const chartacct_delete = document.getElementById('chartacct_delete').checked === true ? 'true' : 'false';

        const users_view = document.getElementById('users_view').checked === true ? 'true' : 'false';
        const users_create = document.getElementById('users_create').checked === true ? 'true' : 'false';
        const users_edit = document.getElementById('users_edit').checked === true ? 'true' : 'false';
        const users_delete = document.getElementById('users_delete').checked === true ? 'true' : 'false';

        const paymentTerm_view = document.getElementById('paymentTerm_view').checked === true ? 'true' : 'false';
        const paymentTerm_create = document.getElementById('paymentTerm_create').checked === true ? 'true' : 'false';
        const paymentTerm_edit = document.getElementById('paymentTerm_edit').checked === true ? 'true' : 'false';
        const paymentTerm_delete = document.getElementById('paymentTerm_delete').checked === true ? 'true' : 'false';
        const user_id = localStorage.getItem('User_id');
        const org = localStorage.getItem('Organisation');

        if (!role) {
            alert('Please enter the role')
        }
        else {
            const submitdata = await AddUserRole(org, role, role_id, description, cust_view, cust_create, cust_edit, cust_delete,
                vend_view, vend_create, vend_edit, vend_delete, items_view, items_create, items_edit, items_delete,
                banking_view, banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete,
                bills_view, bills_create, bills_edit, bills_delete, chartacct_view, chartacct_create, chartacct_edit, chartacct_delete,
                users_view, users_create, users_edit, users_delete, paymentTerm_view, paymentTerm_create, paymentTerm_edit, paymentTerm_delete, user_id)

            if (submitdata === 'Role Already') {
                setAlreadyrole(false)
            }
            else if (submitdata === 'Added') {
                alert("Data Added")
                window.location.reload();
            }
        }

    }

    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    <div>
                        <div className={`content-wrapper bg-${themeval}`}>
                            <div className="container-fluid">
                                <br /> <h3 className="text-left ml-5">New Role</h3>
                                <div className="row ">
                                    <div className="col ">
                                        <div className="card" >
                                            <article className={`card-body bg-${themeval}`} style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                                                <form autoComplete='off'>
                                                    <div className="form-row">
                                                        <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role <span style={{ color: "red" }}>*</span></label>
                                                        <div className="col form-group">
                                                            <input type="text" className="form-control col-md-4" id='role' />
                                                            {alreadyrole ? <small style={{ color: "red" }}>Role Already Exist</small> : null}
                                                        </div>
                                                    </div>

                                                    <div className="form-row">
                                                        <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Description </label>
                                                        <div className="col form-group">
                                                            <textarea className="form-control col-md-4 " id='description' rows='3' style={{ resize: "none" }} />
                                                        </div>
                                                    </div>
                                                    <div className="form-row col-md-10"  >
                                                        <table className="table table-borderless text-center">
                                                            <thead>
                                                                <tr className="table-active">
                                                                    <th scope="col" className="text-left"></th>
                                                                    <th scope="col" >Full Access</th>
                                                                    <th scope="col">View</th>
                                                                    <th scope="col">Create</th>
                                                                    <th scope="col">Edit</th>
                                                                    <th scope="col">Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Customers</th>
                                                                    <td><input type='checkbox' id='cust_full' style={checkboxstyle} onClick={() => fullaccess('cust')} /></td>
                                                                    <td><input type='checkbox' id='cust_view' style={checkboxstyle} onClick={() => viewoff('cust')} /></td>
                                                                    <td><input type='checkbox' id='cust_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='cust_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='cust_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Vendors</th>
                                                                    <td><input type='checkbox' id='vend_full' style={checkboxstyle} onClick={() => fullaccess('vend')} /></td>
                                                                    <td><input type='checkbox' id='vend_view' style={checkboxstyle} onClick={() => viewoff('vend')} /></td>
                                                                    <td><input type='checkbox' id='vend_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='vend_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='vend_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Item</th>
                                                                    <td><input type='checkbox' id='items_full' style={checkboxstyle} onClick={() => fullaccess('item')} /></td>
                                                                    <td><input type='checkbox' id='items_view' style={checkboxstyle} onClick={() => viewoff('item')} /></td>
                                                                    <td><input type='checkbox' id='items_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='items_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='items_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Banking</th>
                                                                    <td><input type='checkbox' id='banking_full' style={checkboxstyle} onClick={() => fullaccess('banking')} /></td>
                                                                    <td><input type='checkbox' id='banking_view' style={checkboxstyle} onClick={() => viewoff('banking')} /></td>
                                                                    <td><input type='checkbox' id='banking_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='banking_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='banking_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr className={`table-active `}>
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Sales</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Invoices</th>
                                                                    <td><input type='checkbox' id='invoice_full' style={checkboxstyle} onClick={() => fullaccess('invoice')} /></td>
                                                                    <td><input type='checkbox' id='invoice_view' style={checkboxstyle} onClick={() => viewoff('invoice')} /></td>
                                                                    <td><input type='checkbox' id='invoice_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='invoice_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='invoice_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr className="table-active">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Purchases</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Bills</th>
                                                                    <td><input type='checkbox' id='bills_full' style={checkboxstyle} onClick={() => fullaccess('bill')} /></td>
                                                                    <td><input type='checkbox' id='bills_view' style={checkboxstyle} onClick={() => viewoff('bill')} /></td>
                                                                    <td><input type='checkbox' id='bills_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='bills_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='bills_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                <tr className="table-active ">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Accountant</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Chart of Accounts</th>
                                                                    <td><input type='checkbox' id='chartacct_full' style={checkboxstyle} onClick={() => fullaccess('chartofaccount')} /></td>
                                                                    <td><input type='checkbox' id='chartacct_view' style={checkboxstyle} onClick={() => viewoff('chartofaccount')} /></td>
                                                                    <td><input type='checkbox' id='chartacct_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='chartacct_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='chartacct_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                <tr className="table-active ">
                                                                    <th scope="row" style={{ fontSize: "18px" }} colSpan="6">Settings</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Users</th>
                                                                    <td><input type='checkbox' id='users_full' style={checkboxstyle} onClick={() => fullaccess('users')} /></td>
                                                                    <td><input type='checkbox' id='users_view' style={checkboxstyle} onClick={() => viewoff('users')} /></td>
                                                                    <td><input type='checkbox' id='users_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='users_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='users_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row" className="text-left">Payment Terms</th>
                                                                    <td><input type='checkbox' id='paymentTerm_full' style={checkboxstyle} onClick={() => fullaccess('payment_term')} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_view' style={checkboxstyle} onClick={() => viewoff('payment_term')} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                    <div className="border-top card-body">
                                                        <button type='submit' className="btn btn-success" onClick={handlesubmitdata} >Add</button>
                                                        <button className="btn btn-light ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./ShowItem" }}>Cancel</button>
                                                    </div>
                                                </form>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer theme={themeval} />
                </div>
            </div>
        </>
    )
}


export default AddRoles;


