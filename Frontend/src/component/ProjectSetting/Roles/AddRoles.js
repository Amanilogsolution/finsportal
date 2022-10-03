import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import React, { useState, useEffect } from 'react'

import { AddUserRole } from '../../../api'

const AddRoles = () => {
    const [transition, setTransition] = useState(false)
    const [mastertoggle, setMastertoggle] = useState(false)
    const [reporttoggle, setReporttoggle] = useState(false)
    const [alreadyrole, setAlreadyrole] = useState(false);

    const themeval = localStorage.getItem('themetype')
    const checkboxstyle = {
        height: "17px",
        width: "17px"
    };
    const displaynone = {
        display: "none"
    }
    const fontandcursor = {
        fontSize: "18px",
        cursor: "pointer"
    }


    const fullaccess = (fullaccess, view, create, edit, deletecheck) => {
        const fullval = document.getElementById(fullaccess).checked === true ? true : false;
        if (fullval == true) {
            document.getElementById(create).disabled = false;
            document.getElementById(edit).disabled = false;
            document.getElementById(deletecheck).disabled = false;

            document.getElementById(view).checked = true;
            document.getElementById(create).checked = true;
            document.getElementById(edit).checked = true;
            document.getElementById(deletecheck).checked = true;
        }
        else {
            document.getElementById(create).disabled = true;
            document.getElementById(edit).disabled = true;
            document.getElementById(deletecheck).disabled = true;

            document.getElementById(view).checked = false;
            document.getElementById(create).checked = false;
            document.getElementById(edit).checked = false;
            document.getElementById(deletecheck).checked = false;
        }
    }

    const viewoff = (full, view, create, edit, deletecheck) => {
        const view_val = document.getElementById(view).checked === true ? true : false
        if (view_val == false) {
            document.getElementById(create).disabled = true;
            document.getElementById(edit).disabled = true;
            document.getElementById(deletecheck).disabled = true;

            document.getElementById(full).checked = false;
            document.getElementById(create).checked = false;
            document.getElementById(edit).checked = false;
            document.getElementById(deletecheck).checked = false;
        }
        else {
            document.getElementById(create).disabled = false;
            document.getElementById(edit).disabled = false;
            document.getElementById(deletecheck).disabled = false;
        }
    }

    const handlesubmitdata = async (e) => {
        e.preventDefault();
        const role = document.getElementById('role').value;
        let role_id = role + Math.floor(Math.random() * 100000);
        const description = document.getElementById('description').value;

        //  ########################################### Transition #########################################
        //  Sales

        const cust_view = document.getElementById('cust_view').checked === true ? true : false;
        const cust_create = document.getElementById('cust_create').checked === true ? true : false;
        const cust_edit = document.getElementById('cust_edit').checked === true ? true : false;
        const cust_delete = document.getElementById('cust_delete').checked === true ? true : false;

        const invoice_view = document.getElementById('invoice_view').checked === true ? true : false;
        const invoice_create = document.getElementById('invoice_create').checked === true ? true : false;
        const invoice_edit = document.getElementById('invoice_edit').checked === true ? true : false;
        const invoice_delete = document.getElementById('invoice_delete').checked === true ? true : false;

        const sales_all = cust_view || invoice_view;

        // Purchases
        const vend_view = document.getElementById('vend_view').checked === true ? true : false;
        const vend_create = document.getElementById('vend_create').checked === true ? true : false;
        const vend_edit = document.getElementById('vend_edit').checked === true ? true : false;
        const vend_delete = document.getElementById('vend_delete').checked === true ? true : false;

        const bills_view = document.getElementById('bills_view').checked === true ? true : false;
        const bills_create = document.getElementById('bills_create').checked === true ? true : false;
        const bills_edit = document.getElementById('bills_edit').checked === true ? true : false;
        const bills_delete = document.getElementById('bills_delete').checked === true ? true : false;

        const purchases_all = vend_view || bills_view;

        // Accountant

        const chartacct_view = document.getElementById('chartacct_view').checked === true ? true : false;
        const chartacct_create = document.getElementById('chartacct_create').checked === true ? true : false;
        const chartacct_edit = document.getElementById('chartacct_edit').checked === true ? true : false;
        const chartacct_delete = document.getElementById('chartacct_delete').checked === true ? true : false;

        const currency_addjustment_view = document.getElementById('currency_addjustment_view').checked === true ? true : false;
        const currency_addjustment_create = document.getElementById('currency_addjustment_create').checked === true ? true : false;
        const currency_addjustment_edit = document.getElementById('currency_addjustment_edit').checked === true ? true : false;
        const currency_addjustment_delete = document.getElementById('currency_addjustment_delete').checked === true ? true : false;

        const accountant_all = chartacct_view || currency_addjustment_view

        //  ########################################### Master #########################################
        // Setting

        const org_profile_view = document.getElementById('org_view').checked === true ? true : false;
        const org_profile_create = document.getElementById('org_create').checked === true ? true : false;
        const org_profile_edit = document.getElementById('org_edit').checked === true ? true : false;
        const org_profile_delete = document.getElementById('org_delete').checked === true ? true : false;

        const paymentTerm_view = document.getElementById('paymentTerm_view').checked === true ? true : false;
        const paymentTerm_create = document.getElementById('paymentTerm_create').checked === true ? true : false;
        const paymentTerm_edit = document.getElementById('paymentTerm_edit').checked === true ? true : false;
        const paymentTerm_delete = document.getElementById('paymentTerm_delete').checked === true ? true : false;

        const financial_view = document.getElementById('financial_view').checked === true ? true : false;
        const financial_create = document.getElementById('financial_create').checked === true ? true : false;
        const financial_edit = document.getElementById('financial_edit').checked === true ? true : false;
        const financial_delete = document.getElementById('financial_delete').checked === true ? true : false;


        const branch_view = document.getElementById('branch_view').checked === true ? true : false;
        const branch_create = document.getElementById('branch_create').checked === true ? true : false;
        const branch_edit = document.getElementById('branch_edit').checked === true ? true : false;
        const branch_delete = document.getElementById('branch_delete').checked === true ? true : false;

        const crm_view = document.getElementById('crm_view').checked === true ? true : false;
        const crm_create = document.getElementById('crm_create').checked === true ? true : false;
        const crm_edit = document.getElementById('crm_edit').checked === true ? true : false;
        const crm_delete = document.getElementById('crm_delete').checked === true ? true : false;

        const compliance_view = document.getElementById('compliance_view').checked === true ? true : false;
        const compliance_create = document.getElementById('compliance_create').checked === true ? true : false;
        const compliance_edit = document.getElementById('compliance_edit').checked === true ? true : false;
        const compliance_delete = document.getElementById('compliance_delete').checked === true ? true : false;

        const roles_view = document.getElementById('roles_view').checked === true ? true : false;
        const roles_create = document.getElementById('roles_create').checked === true ? true : false;
        const roles_edit = document.getElementById('roles_edit').checked === true ? true : false;
        const roles_delete = document.getElementById('roles_delete').checked === true ? true : false;

        let setting_all = org_profile_view || paymentTerm_view || financial_view || branch_view || crm_view || compliance_view || roles_view;

        // Items

        const items_view = document.getElementById('items_view').checked === true ? true : false;
        const items_create = document.getElementById('items_create').checked === true ? true : false;
        const items_edit = document.getElementById('items_edit').checked === true ? true : false;
        const items_delete = document.getElementById('items_delete').checked === true ? true : false;

        // Master

        const country_view = document.getElementById('country_view').checked === true ? true : false;
        const country_create = document.getElementById('country_create').checked === true ? true : false;
        const country_edit = document.getElementById('country_edit').checked === true ? true : false;
        const country_delete = document.getElementById('country_delete').checked === true ? true : false;

        const state_view = document.getElementById('state_view').checked === true ? true : false;
        const state_create = document.getElementById('state_create').checked === true ? true : false;
        const state_edit = document.getElementById('state_edit').checked === true ? true : false;
        const state_delete = document.getElementById('state_delete').checked === true ? true : false;

        const city_view = document.getElementById('city_view').checked === true ? true : false;
        const city_create = document.getElementById('city_create').checked === true ? true : false;
        const city_edit = document.getElementById('city_edit').checked === true ? true : false;
        const city_delete = document.getElementById('city_delete').checked === true ? true : false;

        const currency_view = document.getElementById('currency_view').checked === true ? true : false;
        const currency_create = document.getElementById('currency_create').checked === true ? true : false;
        const currency_edit = document.getElementById('currency_edit').checked === true ? true : false;
        const currency_delete = document.getElementById('currency_delete').checked === true ? true : false;

        const unit_view = document.getElementById('unit_view').checked === true ? true : false;
        const unit_create = document.getElementById('unit_create').checked === true ? true : false;
        const unit_edit = document.getElementById('unit_edit').checked === true ? true : false;
        const unit_delete = document.getElementById('unit_delete').checked === true ? true : false;

        const banking_view = document.getElementById('banking_view').checked === true ? true : false;
        const banking_create = document.getElementById('banking_create').checked === true ? true : false;
        const banking_edit = document.getElementById('banking_edit').checked === true ? true : false;
        const banking_delete = document.getElementById('banking_delete').checked === true ? true : false;

        const comptype_view = document.getElementById('comptype_view').checked === true ? true : false;
        const comptype_create = document.getElementById('comptype_create').checked === true ? true : false;
        const comptype_edit = document.getElementById('comptype_edit').checked === true ? true : false;
        const comptype_delete = document.getElementById('comptype_delete').checked === true ? true : false;

        const users_view = document.getElementById('users_view').checked === true ? true : false;
        const users_create = document.getElementById('users_create').checked === true ? true : false;
        const users_edit = document.getElementById('users_edit').checked === true ? true : false;
        const users_delete = document.getElementById('users_delete').checked === true ? true : false;

        const empmaster_view = document.getElementById('empmaster_view').checked === true ? true : false;
        const empmaster_create = document.getElementById('empmaster_create').checked === true ? true : false;
        const empmaster_edit = document.getElementById('empmaster_edit').checked === true ? true : false;
        const empmaster_delete = document.getElementById('empmaster_delete').checked === true ? true : false;


        const master_all = country_view || state_view || city_view || currency_view || unit_view || banking_view || comptype_view || users_view || empmaster_view;

        //  ########################################### Reports #########################################

        const reports_bills_view = document.getElementById('reports_bills_view').checked === true ? true : false;
        const reports_bills_create = document.getElementById('reports_bills_create').checked === true ? true : false;
        const reports_bills_edit = document.getElementById('reports_bills_edit').checked === true ? true : false;
        const reports_bills_delete = document.getElementById('reports_bills_delete').checked === true ? true : false;


        const reports_invoice_view = document.getElementById('reports_invoice_view').checked === true ? true : false;
        const reports_invoice_create = document.getElementById('reports_invoice_create').checked === true ? true : false;
        const reports_invoice_edit = document.getElementById('reports_invoice_edit').checked === true ? true : false;
        const reports_invoice_delete = document.getElementById('reports_invoice_delete').checked === true ? true : false;

        const reports_all = reports_bills_view || reports_invoice_view;

        const user_id = localStorage.getItem('User_id');
        const org = localStorage.getItem('Organisation');

        if (!role) {
            alert('Please enter the role')
        }
        else {
            const submitdata = await AddUserRole(org, role, role_id, description,
                sales_all, cust_view, cust_create, cust_edit, cust_delete,
                invoice_view, invoice_create, invoice_edit, invoice_delete,
                purchases_all,
                vend_view, vend_create, vend_edit, vend_delete,
                bills_view, bills_create, bills_edit, bills_delete,
                accountant_all,
                chartacct_view, chartacct_create, chartacct_edit, chartacct_delete,
                currency_addjustment_view, currency_addjustment_create, currency_addjustment_edit, currency_addjustment_delete,
                setting_all,
                org_profile_view, org_profile_create, org_profile_edit, org_profile_delete,
                paymentTerm_view, paymentTerm_create, paymentTerm_edit, paymentTerm_delete,
                financial_view, financial_create, financial_edit, financial_delete,
                branch_view, branch_create, branch_edit, branch_delete,
                crm_view, crm_create, crm_edit, crm_delete,
                compliance_view, compliance_create, compliance_edit, compliance_delete,
                roles_view, roles_create, roles_edit, roles_delete,
                items_view, items_create, items_edit, items_delete,
                master_all,
                country_view, country_create, country_edit, country_delete,
                state_view, state_create, state_edit, state_delete,
                city_view, city_create, city_edit, city_delete, currency_view, currency_create, currency_edit, currency_delete,
                unit_view, unit_create, unit_edit, unit_delete,
                banking_view, banking_create, banking_edit, banking_delete,
                comptype_view, comptype_create, comptype_edit, comptype_delete, users_view, users_create, users_edit, users_delete,
                empmaster_view, empmaster_create, empmaster_edit, empmaster_delete,
                reports_all, reports_bills_view, reports_bills_create, reports_bills_edit, reports_bills_delete,
                reports_invoice_view, reports_invoice_create, reports_invoice_edit, reports_invoice_delete, user_id)

            if (submitdata === 'Role Already') {
                setAlreadyrole(true)
                alert("Data Already")
            }
            else if (submitdata === 'Added') {
                alert("Data Added")
                window.location.reload();
            }
        }

    }

    const handletransition = () => {
        const innertransition = ['customer', 'invoise', 'vendor', 'bills', 'chartofaccount', 'currency_adjustment'];
        if (transition) {
            for (let i = 0; i < innertransition.length; i++) {
                document.getElementById(innertransition[i]).style.display = 'none'
            }
        }
        else {

            for (let i = 0; i < innertransition.length; i++) {
                document.getElementById(innertransition[i]).style.display = 'table-row'
            }
        }
        setTransition(!transition)
    }

    const handlemaster = () => {
        const innermaster = ['country', 'state', 'city', 'currency', 'unit', 'banking', 'comp_type', 'users', 'employee', 'orgprofile', 'paymentterm', 'finsyear', 'branch', 'crmmaster', 'compliances', 'userrolesrow', 'itemsrow'];
        if (mastertoggle) {
            for (let i = 0; i < innermaster.length; i++) {
                document.getElementById(innermaster[i]).style.display = 'none'
            }
        }
        else {
            for (let i = 0; i < innermaster.length; i++) {
                document.getElementById(innermaster[i]).style.display = 'table-row'
            }
        }
        setMastertoggle(!mastertoggle)
    }

    const handlereport = () => {
        const innerreport = ['reportbill', 'reportinvoice'];
        if (reporttoggle) {
            for (let i = 0; i < innerreport.length; i++) {
                document.getElementById(innerreport[i]).style.display = 'none'
            }
        }
        else {
            for (let i = 0; i < innerreport.length; i++) {
                document.getElementById(innerreport[i]).style.display = 'table-row'
            }
        }
        setReporttoggle(!reporttoggle)
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
                                                    <div className="form-row col-md-10 p-0 overflow-hidden" style={{ borderRadius: "5px 5px 0px 0px" }}>
                                                        <table className="table table-borderless text-center" >
                                                            <thead>
                                                                <tr className="table-active">
                                                                    <th scope="col" style={{ width: "30%" }}></th>
                                                                    <th scope="col">Full Access</th>
                                                                    <th scope="col">View</th>
                                                                    <th scope="col">Create</th>
                                                                    <th scope="col">Edit</th>
                                                                    <th scope="col">Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {/* #############################  Transition #################################################### */}

                                                                <tr >
                                                                    <th className="text-left pl-4" colSpan="6" style={fontandcursor} onClick={handletransition}>
                                                                        {
                                                                            transition ? <i className="ion-arrow-down-b"></i> :
                                                                                <i className="ion-arrow-right-b"></i>
                                                                        }
                                                                        &nbsp;<span style={{ color: "red" }}>Transition</span>&nbsp;
                                                                    </th>
                                                                </tr>

                                                                <tr id='customer' style={displaynone}>
                                                                    <th className="text-left">Customers</th>
                                                                    <td><input type='checkbox' id='cust_full' style={checkboxstyle} onClick={() => fullaccess('cust_full', 'cust_view', 'cust_create', 'cust_edit', 'cust_delete')} /></td>
                                                                    <td><input type='checkbox' id='cust_view' style={checkboxstyle} onClick={() => viewoff('cust_full', 'cust_view', 'cust_create', 'cust_edit', 'cust_delete')} /></td>
                                                                    <td><input type='checkbox' id='cust_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='cust_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='cust_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='invoise' style={displaynone}>
                                                                    <th className="text-left">Invoices</th>
                                                                    <td><input type='checkbox' id='invoice_full' style={checkboxstyle} onClick={() => fullaccess('invoice_full', 'invoice_view', 'invoice_create', 'invoice_edit', 'invoice_delete')} /></td>
                                                                    <td><input type='checkbox' id='invoice_view' style={checkboxstyle} onClick={() => viewoff('invoice_full', 'invoice_view', 'invoice_create', 'invoice_edit', 'invoice_delete')} /></td>
                                                                    <td><input type='checkbox' id='invoice_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='invoice_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='invoice_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                <tr id='vendor' style={displaynone}>
                                                                    <th className="text-left">Vendors</th>
                                                                    <td><input type='checkbox' id='vend_full' style={checkboxstyle} onClick={() => fullaccess('vend_full', 'vend_view', 'vend_create', 'vend_edit', 'vend_delete')} /></td>
                                                                    <td><input type='checkbox' id='vend_view' style={checkboxstyle} onClick={() => viewoff('vend_full', 'vend_view', 'vend_create', 'vend_edit', 'vend_delete')} /></td>
                                                                    <td><input type='checkbox' id='vend_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='vend_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='vend_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='bills' style={displaynone}>
                                                                    <th className="text-left">Bills</th>
                                                                    <td><input type='checkbox' id='bills_full' style={checkboxstyle} onClick={() => fullaccess('bills_full', 'bills_view', 'bills_create', 'bills_edit', 'bills_delete')} /></td>
                                                                    <td><input type='checkbox' id='bills_view' style={checkboxstyle} onClick={() => viewoff('bills_full', 'bills_view', 'bills_create', 'bills_edit', 'bills_delete')} /></td>
                                                                    <td><input type='checkbox' id='bills_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='bills_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='bills_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                <tr id='chartofaccount' style={displaynone}>
                                                                    <th className="text-left">Chart of Accounts</th>
                                                                    <td><input type='checkbox' id='chartacct_full' style={checkboxstyle} onClick={() => fullaccess('chartacct_full', 'chartacct_view', 'chartacct_create', 'chartacct_edit', 'chartacct_delete')} /></td>
                                                                    <td><input type='checkbox' id='chartacct_view' style={checkboxstyle} onClick={() => viewoff('chartacct_full', 'chartacct_view', 'chartacct_create', 'chartacct_edit', 'chartacct_delete')} /></td>
                                                                    <td><input type='checkbox' id='chartacct_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='chartacct_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='chartacct_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='currency_adjustment' style={displaynone}>
                                                                    <th className="text-left">Currency Adjustment</th>
                                                                    <td><input type='checkbox' id='currency_addjustment_full' style={checkboxstyle} onClick={() => fullaccess('currency_addjustment_full', 'currency_addjustment_view', 'currency_addjustment_create', 'currency_addjustment_edit', 'currency_addjustment_delete')} /></td>
                                                                    <td><input type='checkbox' id='currency_addjustment_view' style={checkboxstyle} onClick={() => viewoff('currency_addjustment_full', 'currency_addjustment_view', 'currency_addjustment_create', 'currency_addjustment_edit', 'currency_addjustment_delete')} /></td>
                                                                    <td><input type='checkbox' id='currency_addjustment_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='currency_addjustment_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='currency_addjustment_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                {/* #############################  Master #################################################### */}

                                                                <tr>
                                                                    <th className="text-left pl-4" colSpan="6" style={fontandcursor} onClick={handlemaster}>
                                                                        {mastertoggle ? <i className="ion-arrow-down-b"></i> :
                                                                            <i className="ion-arrow-right-b"></i>}
                                                                        &nbsp;<span style={{ color: "red" }}>Master</span>
                                                                    </th>
                                                                </tr>

                                                                <tr id='orgprofile' style={displaynone}>
                                                                    <th className="text-left">Organisatio Profile </th>
                                                                    <td><input type='checkbox' id='org_full' style={checkboxstyle} onClick={() => fullaccess('org_full', 'org_view', 'org_create', 'org_edit', 'org_delete')} /></td>
                                                                    <td><input type='checkbox' id='org_view' style={checkboxstyle} onClick={() => viewoff('org_full', 'org_view', 'org_create', 'org_edit', 'org_delete')} /></td>
                                                                    <td><input type='checkbox' id='org_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='org_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='org_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='paymentterm' style={displaynone}>
                                                                    <th className="text-left">Payment Terms</th>
                                                                    <td><input type='checkbox' id='paymentTerm_full' style={checkboxstyle} onClick={() => fullaccess('paymentTerm_full', 'paymentTerm_view', 'paymentTerm_create', 'paymentTerm_edit', 'paymentTerm_delete')} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_view' style={checkboxstyle} onClick={() => viewoff('paymentTerm_full', 'paymentTerm_view', 'paymentTerm_create', 'paymentTerm_edit', 'paymentTerm_delete')} /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='paymentTerm_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                <tr id='finsyear' style={displaynone}>
                                                                    <th className="text-left">Financial year</th>
                                                                    <td><input type='checkbox' id='financial_full' style={checkboxstyle} onClick={() => fullaccess('financial_full', 'financial_view', 'financial_create', 'financial_edit', 'financial_delete')} /></td>
                                                                    <td><input type='checkbox' id='financial_view' style={checkboxstyle} onClick={() => viewoff('financial_full', 'financial_view', 'financial_create', 'financial_edit', 'financial_delete')} /></td>
                                                                    <td><input type='checkbox' id='financial_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='financial_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='financial_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='branch' style={displaynone}>
                                                                    <th className="text-left">Branch</th>
                                                                    <td><input type='checkbox' id='branch_full' style={checkboxstyle} onClick={() => fullaccess('branch_full', 'branch_view', 'branch_create', 'branch_edit', 'branch_delete')} /></td>
                                                                    <td><input type='checkbox' id='branch_view' style={checkboxstyle} onClick={() => viewoff('branch_full', 'branch_view', 'branch_create', 'branch_edit', 'branch_delete')} /></td>
                                                                    <td><input type='checkbox' id='branch_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='branch_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='branch_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='crmmaster' style={displaynone}>
                                                                    <th className="text-left">Crm Master</th>
                                                                    <td><input type='checkbox' id='crm_full' style={checkboxstyle} onClick={() => fullaccess('crm_full', 'crm_view', 'crm_create', 'crm_edit', 'crm_delete')} /></td>
                                                                    <td><input type='checkbox' id='crm_view' style={checkboxstyle} onClick={() => viewoff('crm_full', 'crm_view', 'crm_create', 'crm_edit', 'crm_delete')} /></td>
                                                                    <td><input type='checkbox' id='crm_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='crm_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='crm_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='compliances' style={displaynone}>
                                                                    <th className="text-left">Compliance</th>
                                                                    <td><input type='checkbox' id='compliance_full' style={checkboxstyle} onClick={() => fullaccess('compliance_full', 'compliance_view', 'compliance_create', 'compliance_edit', 'compliance_delete')} /></td>
                                                                    <td><input type='checkbox' id='compliance_view' style={checkboxstyle} onClick={() => viewoff('compliance_full', 'compliance_view', 'compliance_create', 'compliance_edit', 'compliance_delete')} /></td>
                                                                    <td><input type='checkbox' id='compliance_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='compliance_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='compliance_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='userrolesrow' style={displaynone}>
                                                                    <th className="text-left">User Roles</th>
                                                                    <td><input type='checkbox' id='roles_full' style={checkboxstyle} onClick={() => fullaccess('roles_full', 'roles_view', 'roles_create', 'roles_edit', 'roles_delete')} /></td>
                                                                    <td><input type='checkbox' id='roles_view' style={checkboxstyle} onClick={() => viewoff('roles_full', 'roles_view', 'roles_create', 'roles_edit', 'roles_delete')} /></td>
                                                                    <td><input type='checkbox' id='roles_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='roles_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='roles_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='itemsrow' style={displaynone}>
                                                                    <th className="text-left">Item</th>
                                                                    <td><input type='checkbox' id='items_full' style={checkboxstyle} onClick={() => fullaccess('items_full', 'items_view', 'items_create', 'items_edit', 'items_delete')} /></td>
                                                                    <td><input type='checkbox' id='items_view' style={checkboxstyle} onClick={() => viewoff('items_full', 'items_view', 'items_create', 'items_edit', 'items_delete')} /></td>
                                                                    <td><input type='checkbox' id='items_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='items_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='items_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                <tr id='country' style={displaynone}>
                                                                    <th className="text-left">Country</th>
                                                                    <td><input type='checkbox' id='country_full' style={checkboxstyle} onClick={() => fullaccess('country_full', 'country_view', 'country_create', 'country_edit', 'country_delete')} /></td>
                                                                    <td><input type='checkbox' id='country_view' style={checkboxstyle} onClick={() => viewoff('country_full', 'country_view', 'country_create', 'country_edit', 'country_delete')} /></td>
                                                                    <td><input type='checkbox' id='country_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='country_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='country_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='state' style={displaynone}>
                                                                    <th className="text-left">State</th>
                                                                    <td><input type='checkbox' id='state_full' style={checkboxstyle} onClick={() => fullaccess('state_full', 'state_view', 'state_create', 'state_edit', 'state_delete')} /></td>
                                                                    <td><input type='checkbox' id='state_view' style={checkboxstyle} onClick={() => viewoff('state_full', 'state_view', 'state_create', 'state_edit', 'state_delete')} /></td>
                                                                    <td><input type='checkbox' id='state_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='state_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='state_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='city' style={displaynone}>
                                                                    <th className="text-left">City</th>
                                                                    <td><input type='checkbox' id='city_full' style={checkboxstyle} onClick={() => fullaccess('city_full', 'city_view', 'city_create', 'city_edit', 'city_delete')} /></td>
                                                                    <td><input type='checkbox' id='city_view' style={checkboxstyle} onClick={() => viewoff('city_full', 'city_view', 'city_create', 'city_edit', 'city_delete')} /></td>
                                                                    <td><input type='checkbox' id='city_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='city_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='city_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='currency' style={displaynone}>
                                                                    <th className="text-left">Curreny</th>
                                                                    <td><input type='checkbox' id='currency_full' style={checkboxstyle} onClick={() => fullaccess('currency_full', 'currency_view', 'currency_create', 'currency_edit', 'currency_delete')} /></td>
                                                                    <td><input type='checkbox' id='currency_view' style={checkboxstyle} onClick={() => viewoff('currency_full', 'currency_view', 'currency_create', 'currency_edit', 'currency_delete')} /></td>
                                                                    <td><input type='checkbox' id='currency_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='currency_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='currency_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='unit' style={displaynone}>
                                                                    <th className="text-left">Unit</th>
                                                                    <td><input type='checkbox' id='unit_full' style={checkboxstyle} onClick={() => fullaccess('unit_full', 'unit_view', 'unit_create', 'unit_edit', 'unit_delete')} /></td>
                                                                    <td><input type='checkbox' id='unit_view' style={checkboxstyle} onClick={() => viewoff('unit_full', 'unit_view', 'unit_create', 'unit_edit', 'unit_delete')} /></td>
                                                                    <td><input type='checkbox' id='unit_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='unit_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='unit_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='banking' style={displaynone}>
                                                                    <th className="text-left">Banking</th>
                                                                    <td><input type='checkbox' id='banking_full' style={checkboxstyle} onClick={() => fullaccess('banking_full', 'banking_view', 'banking_create', 'banking_edit', 'banking_delete')} /></td>
                                                                    <td><input type='checkbox' id='banking_view' style={checkboxstyle} onClick={() => viewoff('banking_full', 'banking_view', 'banking_create', 'banking_edit', 'banking_delete')} /></td>
                                                                    <td><input type='checkbox' id='banking_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='banking_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='banking_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='comp_type' style={displaynone}>
                                                                    <th className="text-left">Compliance Type</th>
                                                                    <td><input type='checkbox' id='comptype_full' style={checkboxstyle} onClick={() => fullaccess('comptype_full', 'comptype_view', 'comptype_create', 'comptype_edit', 'comptype_delete')} /></td>
                                                                    <td><input type='checkbox' id='comptype_view' style={checkboxstyle} onClick={() => viewoff('comptype_full', 'comptype_view', 'comptype_create', 'comptype_edit', 'comptype_delete')} /></td>
                                                                    <td><input type='checkbox' id='comptype_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='comptype_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='comptype_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='users' style={displaynone}>
                                                                    <th className="text-left">Users</th>
                                                                    <td><input type='checkbox' id='users_full' style={checkboxstyle} onClick={() => fullaccess('users_full', 'users_view', 'users_create', 'users_edit', 'users_delete')} /></td>
                                                                    <td><input type='checkbox' id='users_view' style={checkboxstyle} onClick={() => viewoff('users_full', 'users_view', 'users_create', 'users_edit', 'users_delete')} /></td>
                                                                    <td><input type='checkbox' id='users_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='users_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='users_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='employee' style={displaynone}>
                                                                    <th className="text-left">Employee Master</th>
                                                                    <td><input type='checkbox' id='empmaster_full' style={checkboxstyle} onClick={() => fullaccess('empmaster_full', 'empmaster_view', 'empmaster_create', 'empmaster_edit', 'empmaster_delete')} /></td>
                                                                    <td><input type='checkbox' id='empmaster_view' style={checkboxstyle} onClick={() => viewoff('empmaster_full', 'empmaster_view', 'empmaster_create', 'empmaster_edit', 'empmaster_delete')} /></td>
                                                                    <td><input type='checkbox' id='empmaster_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='empmaster_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='empmaster_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>

                                                                {/* #############################  Reports #################################################### */}

                                                                <tr>
                                                                    <th className="text-left pl-4" colSpan="6" style={fontandcursor} onClick={handlereport}>
                                                                        {reporttoggle ? <i className="ion-arrow-down-b"></i> :
                                                                            <i className="ion-arrow-right-b"></i>}
                                                                        &nbsp;<span style={{ color: "red" }}>Reports</span>
                                                                    </th>
                                                                </tr>

                                                                <tr id='reportbill' style={displaynone}>
                                                                    <th className="text-left">Reports Bills</th>
                                                                    <td><input type='checkbox' id='reports_bills_full' style={checkboxstyle} onClick={() => fullaccess('reports_bills_full', 'reports_bills_view', 'reports_bills_create', 'reports_bills_edit', 'reports_bills_delete')} /></td>
                                                                    <td><input type='checkbox' id='reports_bills_view' style={checkboxstyle} onClick={() => viewoff('reports_bills_full', 'reports_bills_view', 'reports_bills_create', 'reports_bills_edit', 'reports_bills_delete')} /></td>
                                                                    <td><input type='checkbox' id='reports_bills_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='reports_bills_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='reports_bills_delete' style={checkboxstyle} disabled /></td>
                                                                </tr>
                                                                <tr id='reportinvoice' style={displaynone}>
                                                                    <th className="text-left" >Reports Invoice</th>
                                                                    <td><input type='checkbox' id='reports_invoice_full' style={checkboxstyle} onClick={() => fullaccess('reports_invoice_full', 'reports_invoice_view', 'reports_invoice_create', 'reports_invoice_edit', 'reports_invoice_delete')} /></td>
                                                                    <td><input type='checkbox' id='reports_invoice_view' style={checkboxstyle} onClick={() => viewoff('reports_invoice_full', 'reports_invoice_view', 'reports_invoice_create', 'reports_invoice_edit', 'reports_invoice_delete')} /></td>
                                                                    <td><input type='checkbox' id='reports_invoice_create' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='reports_invoice_edit' style={checkboxstyle} disabled /></td>
                                                                    <td><input type='checkbox' id='reports_invoice_delete' style={checkboxstyle} disabled /></td>
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


