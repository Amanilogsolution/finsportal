import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import React, { useState } from 'react'

import { AddUserRole } from '../../../api'

const AddRoles = () => {
    const [transition, setTransition] = useState(false)
    const [mastertoggle, setMastertoggle] = useState(false)
    const [reporttoggle, setReporttoggle] = useState(false)
    const [alreadyrole, setAlreadyrole] = useState(false);

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
        if (fullval === true) {
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
        if (view_val === false) {
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
        // const multiorg = document.getElementById('multiorg').checked === true ? true : false;
        const multiorg = ''


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

        const salesorder_view = document.getElementById('salesorder_view').checked === true ? true : false;
        const salesorder_create = document.getElementById('salesorder_create').checked === true ? true : false;
        const salesorder_edit = document.getElementById('salesorder_edit').checked === true ? true : false;
        const salesorder_delete = document.getElementById('salesorder_delete').checked === true ? true : false;

        const creditnotes_view = document.getElementById('creditnotes_view').checked === true ? true : false;
        const creditnotes_create = document.getElementById('creditnotes_create').checked === true ? true : false;
        const creditnotes_edit = document.getElementById('creditnotes_edit').checked === true ? true : false;
        const creditnotes_delete = document.getElementById('creditnotes_delete').checked === true ? true : false;

        const recurring_invoice_view = document.getElementById('recurring_invoice_view').checked === true ? true : false;
        const recurring_invoice_create = document.getElementById('recurring_invoice_create').checked === true ? true : false;
        const recurring_invoice_edit = document.getElementById('recurring_invoice_edit').checked === true ? true : false;
        const recurring_invoice_delete = document.getElementById('recurring_invoice_delete').checked === true ? true : false;

        const sales_all = cust_view || invoice_view || salesorder_view || creditnotes_view || recurring_invoice_view;

        // Purchases
        const vend_view = document.getElementById('vend_view').checked === true ? true : false;
        const vend_create = document.getElementById('vend_create').checked === true ? true : false;
        const vend_edit = document.getElementById('vend_edit').checked === true ? true : false;
        const vend_delete = document.getElementById('vend_delete').checked === true ? true : false;

        const bills_view = document.getElementById('bills_view').checked === true ? true : false;
        const bills_create = document.getElementById('bills_create').checked === true ? true : false;
        const bills_edit = document.getElementById('bills_edit').checked === true ? true : false;
        const bills_delete = document.getElementById('bills_delete').checked === true ? true : false;

        const purchasesorder_view = document.getElementById('purchasesorder_view').checked === true ? true : false;
        const purchasesorder_create = document.getElementById('purchasesorder_create').checked === true ? true : false;
        const purchasesorder_edit = document.getElementById('purchasesorder_edit').checked === true ? true : false;
        const purchasesorder_delete = document.getElementById('purchasesorder_delete').checked === true ? true : false;

        const debitnote_view = document.getElementById('debitnote_view').checked === true ? true : false;
        const debitnote_create = document.getElementById('debitnote_create').checked === true ? true : false;
        const debitnote_edit = document.getElementById('debitnote_edit').checked === true ? true : false;
        const debitnote_delete = document.getElementById('debitnote_delete').checked === true ? true : false;

        const recurring_bill_view = document.getElementById('recurring_bill_view').checked === true ? true : false;
        const recurring_bill_create = document.getElementById('recurring_bill_create').checked === true ? true : false;
        const recurring_bill_edit = document.getElementById('recurring_bill_edit').checked === true ? true : false;
        const recurring_bill_delete = document.getElementById('recurring_bill_delete').checked === true ? true : false;

        const purchases_all = vend_view || bills_view || purchasesorder_view || debitnote_view || recurring_bill_view;

        // Accountant

        const chartacct_view = document.getElementById('chartacct_view').checked === true ? true : false;
        const chartacct_create = document.getElementById('chartacct_create').checked === true ? true : false;
        const chartacct_edit = document.getElementById('chartacct_edit').checked === true ? true : false;
        const chartacct_delete = document.getElementById('chartacct_delete').checked === true ? true : false;

        const currency_addjustment_view = document.getElementById('currency_addjustment_view').checked === true ? true : false;
        const currency_addjustment_create = document.getElementById('currency_addjustment_create').checked === true ? true : false;
        const currency_addjustment_edit = document.getElementById('currency_addjustment_edit').checked === true ? true : false;
        const currency_addjustment_delete = document.getElementById('currency_addjustment_delete').checked === true ? true : false;

        const journal_voucher_view = document.getElementById('journal_voucher_view').checked === true ? true : false;
        const journal_voucher_create = document.getElementById('journal_voucher_create').checked === true ? true : false;
        const journal_voucher_edit = document.getElementById('journal_voucher_edit').checked === true ? true : false;
        const journal_voucher_delete = document.getElementById('journal_voucher_delete').checked === true ? true : false;

        const bank_receipt_view = document.getElementById('bank_receipt_view').checked === true ? true : false;
        const bank_receipt_create = document.getElementById('bank_receipt_create').checked === true ? true : false;
        const bank_receipt_edit = document.getElementById('bank_receipt_edit').checked === true ? true : false;
        const bank_receipt_delete = document.getElementById('bank_receipt_delete').checked === true ? true : false;

        const bank_payment_view = document.getElementById('bank_payment_view').checked === true ? true : false;
        const bank_payment_create = document.getElementById('bank_payment_create').checked === true ? true : false;
        const bank_payment_edit = document.getElementById('bank_payment_edit').checked === true ? true : false;
        const bank_payment_delete = document.getElementById('bank_payment_delete').checked === true ? true : false;

        const accountant_all = chartacct_view || currency_addjustment_view || journal_voucher_view || bank_receipt_view || bank_payment_view

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

        const recurring_freq_view = document.getElementById('recurring_freq_view').checked === true ? true : false;
        const recurring_freq_create = document.getElementById('recurring_freq_create').checked === true ? true : false;
        const recurring_freq_edit = document.getElementById('recurring_freq_edit').checked === true ? true : false;
        const recurring_freq_delete = document.getElementById('recurring_freq_delete').checked === true ? true : false;

        const tds_head_view = document.getElementById('tds_head_view').checked === true ? true : false;
        const tds_head_create = document.getElementById('tds_head_create').checked === true ? true : false;
        const tds_head_edit = document.getElementById('tds_head_edit').checked === true ? true : false;
        const tds_head_delete = document.getElementById('tds_head_delete').checked === true ? true : false;

        const master_all = country_view || state_view || city_view || currency_view || unit_view || banking_view || comptype_view || users_view || empmaster_view || recurring_freq_view || tds_head_view

        // -----------------------------------  Reports ------------------------------------------------------


        const reports_bills_view = document.getElementById('reports_bills_view').checked === true ? true : false;
        const reports_bills_create = document.getElementById('reports_bills_create').checked === true ? true : false;
        const reports_bills_edit = document.getElementById('reports_bills_edit').checked === true ? true : false;
        const reports_bills_delete = document.getElementById('reports_bills_delete').checked === true ? true : false;


        const reports_invoice_view = document.getElementById('reports_invoice_view').checked === true ? true : false;
        const reports_invoice_create = document.getElementById('reports_invoice_create').checked === true ? true : false;
        const reports_invoice_edit = document.getElementById('reports_invoice_edit').checked === true ? true : false;
        const reports_invoice_delete = document.getElementById('reports_invoice_delete').checked === true ? true : false;

        const reports_salesorder_view = document.getElementById('reports_salesorder_view').checked === true ? true : false;
        const reports_salesorder_create = document.getElementById('reports_salesorder_create').checked === true ? true : false;
        const reports_salesorder_edit = document.getElementById('reports_salesorder_edit').checked === true ? true : false;
        const reports_salesorder_delete = document.getElementById('reports_salesorder_delete').checked === true ? true : false;


        const reports_purchasesorder_view = document.getElementById('reports_purchasesorder_view').checked === true ? true : false;
        const reports_purchasesorder_create = document.getElementById('reports_purchasesorder_create').checked === true ? true : false;
        const reports_purchasesorder_edit = document.getElementById('reports_purchasesorder_edit').checked === true ? true : false;
        const reports_purchasesorder_delete = document.getElementById('reports_purchasesorder_delete').checked === true ? true : false;

        const reports_creditnote_view = document.getElementById('reports_creditnote_view').checked === true ? true : false;
        const reports_creditnote_create = document.getElementById('reports_creditnote_create').checked === true ? true : false;
        const reports_creditnote_edit = document.getElementById('reports_creditnote_edit').checked === true ? true : false;
        const reports_creditnote_delete = document.getElementById('reports_creditnote_delete').checked === true ? true : false;


        const reports_debitnote_view = document.getElementById('reports_debitnote_view').checked === true ? true : false;
        const reports_debitnote_create = document.getElementById('reports_debitnote_create').checked === true ? true : false;
        const reports_debitnote_edit = document.getElementById('reports_debitnote_edit').checked === true ? true : false;
        const reports_debitnote_delete = document.getElementById('reports_debitnote_delete').checked === true ? true : false;

        const reports_bankrecep_view = document.getElementById('reports_bankrecep_view').checked === true ? true : false;
        const reports_bankrecep_create = document.getElementById('reports_bankrecep_create').checked === true ? true : false;
        const reports_bankrecep_edit = document.getElementById('reports_bankrecep_edit').checked === true ? true : false;
        const reports_bankrecep_delete = document.getElementById('reports_bankrecep_delete').checked === true ? true : false;

        const reports_bankpymt_view = document.getElementById('reports_bankpymt_view').checked === true ? true : false;
        const reports_bankpymt_create = document.getElementById('reports_bankpymt_create').checked === true ? true : false;
        const reports_bankpymt_edit = document.getElementById('reports_bankpymt_edit').checked === true ? true : false;
        const reports_bankpymt_delete = document.getElementById('reports_bankpymt_delete').checked === true ? true : false;

        const reports_all = reports_bills_view || reports_invoice_view || reports_salesorder_view || reports_purchasesorder_view || reports_creditnote_view || reports_debitnote_view || reports_bankrecep_view || reports_bankpymt_view;

        const user_id = localStorage.getItem('User_id');
        const org = localStorage.getItem('Organisation');

        if (!role) {
            alert('Please enter the role')
        }
        else {
            const submitdata = await AddUserRole(org, role, role_id, description, multiorg,
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
                reports_invoice_view, reports_invoice_create, reports_invoice_edit, reports_invoice_delete, user_id,
                salesorder_view, salesorder_create, salesorder_edit, salesorder_delete, creditnotes_view, creditnotes_create, creditnotes_edit, creditnotes_delete,
                purchasesorder_view, purchasesorder_create, purchasesorder_edit, purchasesorder_delete, debitnote_view, debitnote_create, debitnote_edit, debitnote_delete,

                reports_salesorder_view, reports_salesorder_create, reports_salesorder_edit, reports_salesorder_delete,
                reports_purchasesorder_view, reports_purchasesorder_create, reports_purchasesorder_edit, reports_purchasesorder_delete,
                reports_creditnote_view, reports_creditnote_create, reports_creditnote_edit, reports_creditnote_delete,
                reports_debitnote_view, reports_debitnote_create, reports_debitnote_edit, reports_debitnote_delete,
                reports_bankrecep_view, reports_bankrecep_create, reports_bankrecep_edit, reports_bankrecep_delete,
                reports_bankpymt_view, reports_bankpymt_create, reports_bankpymt_edit, reports_bankpymt_delete,

                recurring_freq_view, recurring_freq_create, recurring_freq_edit, recurring_freq_delete,
                recurring_invoice_view, recurring_invoice_create, recurring_invoice_edit, recurring_invoice_delete,
                recurring_bill_view, recurring_bill_create, recurring_bill_edit, recurring_bill_delete,
                journal_voucher_view, journal_voucher_create, journal_voucher_edit, journal_voucher_delete,
                tds_head_view, tds_head_create, tds_head_edit, tds_head_delete,
                bank_receipt_view, bank_receipt_create, bank_receipt_edit, bank_receipt_delete,
                bank_payment_view, bank_payment_create, bank_payment_edit, bank_payment_delete,
            )

            if (submitdata === 'Role Already') {
                setAlreadyrole(true)
                alert("Data Already")
            }
            else if (submitdata === 'Added') {
                alert("Data Added")
                window.location.href = '/showroles';
            }
        }

    }

    const handletransition = () => {
        const innertransition = ['customer', 'invoise', 'vendor', 'bills', 'chartofaccount', 'currency_adjustment', 'salesorder', 'purchasesorder', 'creditnote', 'debitnote', 'recurring_invoice', 'recurring_bill', 'journal_voucher', 'bank_recpt', 'bank_payt'];
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
        const innermaster = ['country', 'state', 'city', 'currency', 'unit', 'banking', 'comp_type', 'users', 'employee', 'orgprofile', 'paymentterm', 'finsyear', 'branch', 'crmmaster', 'compliances', 'userrolesrow', 'itemsrow', 'recurring_frequency', 'tds_head'];
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

    const handleChangeAllAccess = (e) => {
        const arr1 = ['cust', 'invoice', 'vend', 'bills', 'salesorder', 'purchasesorder', 'creditnotes', 'debitnote', 'chartacct', 'currency_addjustment',
            'org', 'paymentTerm', 'financial', 'branch', 'crm', 'compliance', 'roles', 'items', 'country', 'state', 'city', 'currency', 'unit', 'banking', 'comptype',
            'users', 'empmaster', 'reports_bills', 'reports_invoice', 'reports_salesorder', 'reports_purchasesorder', 'reports_creditnote', 'reports_debitnote','reports_bankrecep','reports_bankpymt','recurring_freq', 'recurring_invoice', 'recurring_bill', 'journal_voucher', 'tds_head', 'bank_receipt', 'bank_payment']
        const arr2 = ['full', 'view', 'create', 'edit', 'delete']

        const innertransition = ['customer', 'invoise', 'vendor', 'bills', 'chartofaccount', 'currency_adjustment', 'salesorder', 'purchasesorder', 'creditnote', 'debitnote', 'recurring_invoice', 'recurring_bill', 'journal_voucher', 'bank_recpt', 'bank_payt'];
        const innermaster = ['country', 'state', 'city', 'currency', 'unit', 'banking', 'comp_type', 'users', 'employee', 'orgprofile', 'paymentterm', 'finsyear', 'branch', 'crmmaster', 'compliances', 'userrolesrow', 'itemsrow', 'recurring_frequency', 'tds_head'];
        const innerreport = ['reportbill', 'reportinvoice', 'reportsalesorder', 'reportpurchasesorder', 'reportdebitnote', 'reportcreditnote','reportbankreceipt','reportbankpymt'];


        if (e.target.checked === true) {
            for (var val of arr1) {
                for (let val2 of arr2) {
                    document.getElementById(`${val}_${val2}`).checked = true
                }
                fullaccess(`${val}_full`, `${val}_view`, `${val}_create`, `${val}_edit`, `${val}_delete`)
            }

            for (let i = 0; i < innertransition.length; i++) {
                document.getElementById(innertransition[i]).style.display = 'table-row'
            }

            for (let i = 0; i < innermaster.length; i++) {
                document.getElementById(innermaster[i]).style.display = 'table-row'
            }

            for (let i = 0; i < innerreport.length; i++) {
                document.getElementById(innerreport[i]).style.display = 'table-row'
            }
            setTransition(true)
            setMastertoggle(true)
            setReporttoggle(true)

        } else {
            for (var val of arr1) {
                for (let val2 of arr2) {
                    document.getElementById(`${val}_${val2}`).checked = false
                }
                fullaccess(`${val}_full`, `${val}_view`, `${val}_create`, `${val}_edit`, `${val}_delete`)
            }
            for (let i = 0; i < innertransition.length; i++) {
                document.getElementById(innertransition[i]).style.display = 'none'
            }

            for (let i = 0; i < innermaster.length; i++) {
                document.getElementById(innermaster[i]).style.display = 'none'
            }
            for (let i = 0; i < innerreport.length; i++) {
                document.getElementById(innerreport[i]).style.display = 'none'
            }
            setTransition(false)
            setMastertoggle(false)
            setReporttoggle(false)
        }
    }


    const handlereport = () => {
        const innerreport = ['reportbill', 'reportinvoice', 'reportsalesorder', 'reportpurchasesorder', 'reportdebitnote', 'reportcreditnote','reportbankreceipt','reportbankpymt'];
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
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div className={`content-wrapper `}>
                    <div className="container-fluid">
                        <br /> <h3 className="text-left ml-5">New Role</h3>
                        <div className="card" >
                            <article className={`card-body `} >
                                <form autoComplete='off'>
                                    <div className="form-row">
                                        <label htmlFor="role" className="col-md-2 col-form-label font-weight-normal">Role </label>
                                        <div className="col form-group">
                                            <input type="text" className={`form-control col-md-4 `} id='role' placeholder="Role" />
                                            {alreadyrole ? <small className="text-danger">Role Already Exist</small> : null}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Description <small>(Optional)</small> </label>
                                        <div className="col form-group">
                                            <textarea className={`form-control col-md-4 `} id='description' placeholder="Description" rows='3' style={{ resize: "none" }} />
                                        </div>
                                    </div>

                                    {/* <div className="form-row">
                                        <label htmlFor="multiorg" className="col-md-2 col-form-label font-weight-normal">Multiple Organisation</label>
                                        <div className="col form-group">
                                            <input type="checkbox" id='multiorg' style={{height:'20px',width:'20px'}}/>
                                        </div>
                                    </div> */}
                                    <div className="form-row col-md-10 p-0 overflow-auto" style={{ borderRadius: "5px 5px 0px 0px" }}>
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
                                                <tr>
                                                    <th className="text-left pl-4">All Rights <input type="checkbox" onChange={handleChangeAllAccess} /></th>
                                                </tr>
                                                <tr >
                                                    <th className="text-left pl-4" colSpan="6" style={fontandcursor} onClick={handletransition}>
                                                        {
                                                            transition ? <i className="ion-arrow-down-b"></i> :
                                                                <i className="ion-arrow-right-b"></i>
                                                        }
                                                        &nbsp;<span className="text-danger">Transaction</span>&nbsp;
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
                                                <tr id='salesorder' style={displaynone}>
                                                    <th className="text-left">Sales Order</th>
                                                    <td><input type='checkbox' id='salesorder_full' style={checkboxstyle} onClick={() => fullaccess('salesorder_full', 'salesorder_view', 'salesorder_create', 'salesorder_edit', 'salesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='salesorder_view' style={checkboxstyle} onClick={() => viewoff('salesorder_full', 'salesorder_view', 'salesorder_create', 'salesorder_edit', 'salesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='salesorder_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='salesorder_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='salesorder_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='purchasesorder' style={displaynone}>
                                                    <th className="text-left">Purchases Order</th>
                                                    <td><input type='checkbox' id='purchasesorder_full' style={checkboxstyle} onClick={() => fullaccess('purchasesorder_full', 'purchasesorder_view', 'purchasesorder_create', 'purchasesorder_edit', 'purchasesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='purchasesorder_view' style={checkboxstyle} onClick={() => viewoff('purchasesorder_full', 'purchasesorder_view', 'purchasesorder_create', 'purchasesorder_edit', 'purchasesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='purchasesorder_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='purchasesorder_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='purchasesorder_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='creditnote' style={displaynone}>
                                                    <th className="text-left">Credit Notes</th>
                                                    <td><input type='checkbox' id='creditnotes_full' style={checkboxstyle} onClick={() => fullaccess('creditnotes_full', 'creditnotes_view', 'creditnotes_create', 'creditnotes_edit', 'creditnotes_delete')} /></td>
                                                    <td><input type='checkbox' id='creditnotes_view' style={checkboxstyle} onClick={() => viewoff('creditnotes_full', 'creditnotes_view', 'creditnotes_create', 'creditnotes_edit', 'creditnotes_delete')} /></td>
                                                    <td><input type='checkbox' id='creditnotes_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='creditnotes_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='creditnotes_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='debitnote' style={displaynone}>
                                                    <th className="text-left">Debit Notes</th>
                                                    <td><input type='checkbox' id='debitnote_full' style={checkboxstyle} onClick={() => fullaccess('debitnote_full', 'debitnote_view', 'debitnote_create', 'debitnote_edit', 'debitnote_delete')} /></td>
                                                    <td><input type='checkbox' id='debitnote_view' style={checkboxstyle} onClick={() => viewoff('debitnote_full', 'debitnote_view', 'debitnote_create', 'debitnote_edit', 'debitnote_delete')} /></td>
                                                    <td><input type='checkbox' id='debitnote_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='debitnote_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='debitnote_delete' style={checkboxstyle} disabled /></td>
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
                                                <tr id='recurring_invoice' style={displaynone}>
                                                    <th className="text-left">Recurring Invoice</th>
                                                    <td><input type='checkbox' id='recurring_invoice_full' style={checkboxstyle} onClick={() => fullaccess('recurring_invoice_full', 'recurring_invoice_view', 'recurring_invoice_create', 'recurring_invoice_edit', 'recurring_invoice_delete')} /></td>
                                                    <td><input type='checkbox' id='recurring_invoice_view' style={checkboxstyle} onClick={() => viewoff('recurring_invoice_full', 'recurring_invoice_view', 'recurring_invoice_create', 'recurring_invoice_edit', 'recurring_invoice_delete')} /></td>
                                                    <td><input type='checkbox' id='recurring_invoice_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='recurring_invoice_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='recurring_invoice_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='recurring_bill' style={displaynone}>
                                                    <th className="text-left">Recurring Bill</th>
                                                    <td><input type='checkbox' id='recurring_bill_full' style={checkboxstyle} onClick={() => fullaccess('recurring_bill_full', 'recurring_bill_view', 'recurring_bill_create', 'recurring_bill_edit', 'recurring_bill_delete')} /></td>
                                                    <td><input type='checkbox' id='recurring_bill_view' style={checkboxstyle} onClick={() => viewoff('recurring_bill_full', 'recurring_bill_view', 'recurring_bill_create', 'recurring_bill_edit', 'recurring_bill_delete')} /></td>
                                                    <td><input type='checkbox' id='recurring_bill_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='recurring_bill_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='recurring_bill_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='journal_voucher' style={displaynone}>
                                                    <th className="text-left">Journal voucher</th>
                                                    <td><input type='checkbox' id='journal_voucher_full' style={checkboxstyle} onClick={() => fullaccess('journal_voucher_full', 'journal_voucher_view', 'journal_voucher_create', 'journal_voucher_edit', 'journal_voucher_delete')} /></td>
                                                    <td><input type='checkbox' id='journal_voucher_view' style={checkboxstyle} onClick={() => viewoff('journal_voucher_full', 'journal_voucher_view', 'journal_voucher_create', 'journal_voucher_edit', 'journal_voucher_delete')} /></td>
                                                    <td><input type='checkbox' id='journal_voucher_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='journal_voucher_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='journal_voucher_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='bank_recpt' style={displaynone}>
                                                    <th className="text-left">Bank Receipt</th>
                                                    <td><input type='checkbox' id='bank_receipt_full' style={checkboxstyle} onClick={() => fullaccess('bank_receipt_full', 'bank_receipt_view', 'bank_receipt_create', 'bank_receipt_edit', 'bank_receipt_delete')} /></td>
                                                    <td><input type='checkbox' id='bank_receipt_view' style={checkboxstyle} onClick={() => viewoff('bank_receipt_full', 'bank_receipt_view', 'bank_receipt_create', 'bank_receipt_edit', 'bank_receipt_delete')} /></td>
                                                    <td><input type='checkbox' id='bank_receipt_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='bank_receipt_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='bank_receipt_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='bank_payt' style={displaynone}>
                                                    <th className="text-left">Bank Payment</th>
                                                    <td><input type='checkbox' id='bank_payment_full' style={checkboxstyle} onClick={() => fullaccess('bank_payment_full', 'bank_payment_view', 'bank_payment_create', 'bank_payment_edit', 'bank_payment_delete')} /></td>
                                                    <td><input type='checkbox' id='bank_payment_view' style={checkboxstyle} onClick={() => viewoff('bank_payment_full', 'bank_payment_view', 'bank_payment_create', 'bank_payment_edit', 'bank_payment_delete')} /></td>
                                                    <td><input type='checkbox' id='bank_payment_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='bank_payment_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='bank_payment_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                {/* #############################  Master #################################################### */}

                                                <tr>
                                                    <th className="text-left pl-4" colSpan="6" style={fontandcursor} onClick={handlemaster}>
                                                        {mastertoggle ? <i className="ion-arrow-down-b"></i> :
                                                            <i className="ion-arrow-right-b"></i>}
                                                        &nbsp;<span className="text-danger">Master</span>
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
                                                <tr id='recurring_frequency' style={displaynone}>
                                                    <th className="text-left">Recurring Frequency</th>
                                                    <td><input type='checkbox' id='recurring_freq_full' style={checkboxstyle} onClick={() => fullaccess('recurring_freq_full', 'recurring_freq_view', 'recurring_freq_create', 'recurring_freq_edit', 'recurring_freq_delete')} /></td>
                                                    <td><input type='checkbox' id='recurring_freq_view' style={checkboxstyle} onClick={() => viewoff('recurring_freq_full', 'recurring_freq_view', 'recurring_freq_create', 'recurring_freq_edit', 'recurring_freq_delete')} /></td>
                                                    <td><input type='checkbox' id='recurring_freq_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='recurring_freq_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='recurring_freq_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='tds_head' style={displaynone}>
                                                    <th className="text-left">Tds Head</th>
                                                    <td><input type='checkbox' id='tds_head_full' style={checkboxstyle} onClick={() => fullaccess('tds_head_full', 'tds_head_view', 'tds_head_create', 'tds_head_edit', 'tds_head_delete')} /></td>
                                                    <td><input type='checkbox' id='tds_head_view' style={checkboxstyle} onClick={() => viewoff('tds_head_full', 'tds_head_view', 'tds_head_create', 'tds_head_edit', 'tds_head_delete')} /></td>
                                                    <td><input type='checkbox' id='tds_head_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='tds_head_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='tds_head_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                {/* #############################  Reports #################################################### */}

                                                <tr>
                                                    <th className="text-left pl-4" colSpan="6" style={fontandcursor} onClick={handlereport}>
                                                        {reporttoggle ? <i className="ion-arrow-down-b"></i> :
                                                            <i className="ion-arrow-right-b"></i>}
                                                        &nbsp;<span className="text-danger">Reports</span>
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
                                                <tr id='reportsalesorder' style={displaynone}>
                                                    <th className="text-left" >Reports Sales Order</th>
                                                    <td><input type='checkbox' id='reports_salesorder_full' style={checkboxstyle} onClick={() => fullaccess('reports_salesorder_full', 'reports_salesorder_view', 'reports_salesorder_create', 'reports_salesorder_edit', 'reports_salesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_salesorder_view' style={checkboxstyle} onClick={() => viewoff('reports_salesorder_full', 'reports_salesorder_view', 'reports_salesorder_create', 'reports_salesorder_edit', 'reports_salesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_salesorder_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_salesorder_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_salesorder_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='reportpurchasesorder' style={displaynone}>
                                                    <th className="text-left" >Reports Purchases Order</th>
                                                    <td><input type='checkbox' id='reports_purchasesorder_full' style={checkboxstyle} onClick={() => fullaccess('reports_purchasesorder_full', 'reports_purchasesorder_view', 'reports_purchasesorder_create', 'reports_purchasesorder_edit', 'reports_purchasesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_purchasesorder_view' style={checkboxstyle} onClick={() => viewoff('reports_purchasesorder_full', 'reports_purchasesorder_view', 'reports_purchasesorder_create', 'reports_purchasesorder_edit', 'reports_purchasesorder_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_purchasesorder_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_purchasesorder_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_purchasesorder_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='reportcreditnote' style={displaynone}>
                                                    <th className="text-left" >Reports Credit Note</th>
                                                    <td><input type='checkbox' id='reports_creditnote_full' style={checkboxstyle} onClick={() => fullaccess('reports_creditnote_full', 'reports_creditnote_view', 'reports_creditnote_create', 'reports_creditnote_edit', 'reports_creditnote_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_creditnote_view' style={checkboxstyle} onClick={() => viewoff('reports_creditnote_full', 'reports_creditnote_view', 'reports_creditnote_create', 'reports_creditnote_edit', 'reports_creditnote_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_creditnote_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_creditnote_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_creditnote_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='reportdebitnote' style={displaynone}>
                                                    <th className="text-left" >Reports Debit Note</th>
                                                    <td><input type='checkbox' id='reports_debitnote_full' style={checkboxstyle} onClick={() => fullaccess('reports_debitnote_full', 'reports_debitnote_view', 'reports_debitnote_create', 'reports_debitnote_edit', 'reports_debitnote_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_debitnote_view' style={checkboxstyle} onClick={() => viewoff('reports_debitnote_full', 'reports_debitnote_view', 'reports_debitnote_create', 'reports_debitnote_edit', 'reports_debitnote_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_debitnote_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_debitnote_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_debitnote_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='reportbankreceipt' style={displaynone}>
                                                    <th className="text-left" >Reports Bank Receipt</th>
                                                    <td><input type='checkbox' id='reports_bankrecep_full' style={checkboxstyle} onClick={() => fullaccess('reports_bankrecep_full', 'reports_bankrecep_view', 'reports_bankrecep_create', 'reports_bankrecep_edit', 'reports_bankrecep_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_bankrecep_view' style={checkboxstyle} onClick={() => viewoff('reports_bankrecep_full', 'reports_bankrecep_view', 'reports_bankrecep_create', 'reports_bankrecep_edit', 'reports_bankrecep_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_bankrecep_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_bankrecep_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_bankrecep_delete' style={checkboxstyle} disabled /></td>
                                                </tr>
                                                <tr id='reportbankpymt' style={displaynone}>
                                                    <th className="text-left" >Reports Bank Payment</th>
                                                    <td><input type='checkbox' id='reports_bankpymt_full' style={checkboxstyle} onClick={() => fullaccess('reports_bankpymt_full', 'reports_bankpymt_view', 'reports_bankpymt_create', 'reports_bankpymt_edit', 'reports_bankpymt_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_bankpymt_view' style={checkboxstyle} onClick={() => viewoff('reports_bankpymt_full', 'reports_bankpymt_view', 'reports_bankpymt_create', 'reports_bankpymt_edit', 'reports_bankpymt_delete')} /></td>
                                                    <td><input type='checkbox' id='reports_bankpymt_create' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_bankpymt_edit' style={checkboxstyle} disabled /></td>
                                                    <td><input type='checkbox' id='reports_bankpymt_delete' style={checkboxstyle} disabled /></td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>

                                </form>
                            </article>
                            <div className="border-top card-footer">
                                <button type='submit' className="btn btn-success" onClick={handlesubmitdata} >Add</button>
                                <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./ShowItem" }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


export default AddRoles;


