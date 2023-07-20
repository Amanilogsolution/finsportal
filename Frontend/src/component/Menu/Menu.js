import React, { useEffect, useState, useCallback } from 'react';
import Finslogo from '../../images/finslogo.png'
import { getUserRole, GetfincialyearNavbar } from '../../api/index'
import './menu.css'

const Menu = (props) => {
  const [financialyeardata, setFinancialYearData] = useState([])

  const currentorg = localStorage.getItem('Organisation Name');

  const styleDisplay = { display: "none" }
  // const handleKeyPress = useCallback((event) => {
  //   if(event.key == 'D'){
  //     window.location.href = 'Bills'
  //   }

  // }, []);

  useEffect(() => {
    // document.addEventListener('keydown', handleKeyPress);

    const fetchdata = async () => {
      const result = await getUserRole(localStorage.getItem('Organisation'), localStorage.getItem('Role'))
      Rolefunction(result)
      const financialyear = await GetfincialyearNavbar(localStorage.getItem('Organisation'))
      setFinancialYearData(financialyear)
    }
    fetchdata()
  }, [
    // handleKeyPress
  ])

  const Rolefunction = (result) => {
    // ------------------------------- ALL Access to Admin Start -----------------------------------------------
    if (localStorage.getItem('Role') === 'Admin') {
      document.getElementById('estimatesMenu').style.display = "block"
      document.getElementById('deliverychallansmrnu').style.display = "block"
      document.getElementById('pmtRecMenu').style.display = "block"
      // document.getElementById('recInvoiceMenu').style.display = "block"
      document.getElementById('vendRecurrMenu').style.display = "block"
      document.getElementById('vendrecbillMenu').style.display = "block"
    }
    else {
      // document.getElementById('estimatesMenu').style.display = "none"
      // document.getElementById('deliverychallansmrnu').style.display = "none"
      // document.getElementById('pmtRecMenu').style.display = "none"
      // document.getElementById('recInvoiceMenu').style.display = "none"

      // document.getElementById('vendRecurrMenu').style.display = "none"
      // document.getElementById('vendrecbillMenu').style.display = "none"
    }

    // -------------------------------- ALL Access to Admin End ------------------------------------------- 


    // --------------------------------  Items Roles -----------------------------------------
    if (result.items_view === "true") {
      document.getElementById('itemsmenu').style.display = "block"
    }
    // ----------------------------- Sales Role --------------------------------------------------
    if (result.sales_all === 'true') {
      document.getElementById('salesMenu').style.display = "block"
      if (result.customer_view === "true") {
        document.getElementById('CustomerMenu').style.display = "block"
        document.getElementById('custaddressMenu').style.display = "block"
      }
      // ---------------------------- Invoice Menu ----------------------------------------
      if (result.invoice_view === "true") {
        document.getElementById('Invoicemenu').style.display = "block"
      }
      // --------------------------- Recurring Invoice Menu -----------------------------------
      if (result.recurring_invoice_view === "true") {
        document.getElementById('recInvoiceMenu').style.display = "block"
      }
      // ---------------------------- Credit Notes ------------------------------------------

      if (result.creditnotes_view === "true") {
        document.getElementById('creditNoteMenu').style.display = "block"
      }
      // ---------------------- Sales Order  ---------------------------------------------------------
      if (result.salesorder_view === "true") {
        document.getElementById('orderMenu').style.display = "block"
      }
    }


    // --------------------------- Purchase Menu ROle Start ---------------------------------------------
    if (result.purchases_all === 'true') {
      document.getElementById('purchasesMenu').style.display = "block"
      if (result.vendor_view === "true") {
        document.getElementById('vendMenu').style.display = "block"
        document.getElementById('vendaddMenu').style.display = "block"
      }

      if (result.bills_view === "true") {
        document.getElementById('vendBillsMenu').style.display = "block"
      }
      if (result.purchasesorder_view === "true") {
        document.getElementById('purchaseOrderMenu').style.display = "block"
      }

      if (result.debitnote_view === "true") {
        document.getElementById('vendcredMenu').style.display = "block"
      }
    }
    // ------------------------------ Purchase Menu Role End ------------------------

    // ------------------------------ Master Menu Roles Start ------------------------------
    if (result.master_all === "true") {
      document.getElementById('masterMenu').style.display = "block";

      if (result.country_view === "true") {
        document.getElementById('countrymenu').style.display = "block"
      }

      if (result.state_view === "true") {
        document.getElementById('statemenu').style.display = "block"
      }

      if (result.city_view === "true") {
        document.getElementById('citymenu').style.display = "block"
      }

      if (result.currency_view === "true") {
        document.getElementById('currencymenu').style.display = "block"
      }
      if (result.unit_view === "true") {
        document.getElementById('unitmenu').style.display = "block"
      }

      if (result.banking_view === "true") {
        document.getElementById('bankMenu').style.display = "block"
      }

      if (result.users_view === "true") {
        document.getElementById('usermenu').style.display = "block"
      }

      if (result.comp_type_view === "true") {
        document.getElementById('comptypeMenu').style.display = "block"
      }

      if (result.employee_view === "true") {
        document.getElementById('employeeMenu').style.display = "block"
      }

      if (result.payment_terms_view === 'true') {
        document.getElementById('payment_term').style.display = "block"
      }

      if (result.recurring_freq_view === 'true') {
        document.getElementById('rec_freqMenu').style.display = "block"
      }

      if (result.tds_head_view === 'true') {
        document.getElementById('tds_headMenu').style.display = "block"
      }

    }

    //-------------------- Master Menu Roles End -------------------------------------


    // ------------------ Accountant Menu Role Start -----------------------
    if (result.accountant_all === 'true') {
      document.getElementById('accountantMenu').style.display = "block";

      if (result.currency_addj_view === "true") {
        document.getElementById('currencyAdjMenu').style.display = "block"
      }
      if (result.journal_voucher_view === "true") {
        document.getElementById('journal_voucherMenu').style.display = "block"
      }
      if (result.bank_recp_view === "true") {
        document.getElementById('banking_receMenu').style.display = "block"
      }
      if (result.bank_payt_view === "true") {
        document.getElementById('banking_paytMenu').style.display = "block"
      }

      if (result.chartof_accounts_view === "true") {
        document.getElementById('coacctMenu').style.display = "block"
      }
    }

    // -------------------------- Accountant Menu Role End -------------------------------

    // -------------------------- Report Menu Role Start ------------------------------------
    if (result.reports_all === "true") {
      document.getElementById('reportMenu').style.display = "block"
    }
    // ------------------------- Report Menu Role End ----------------------------------------
  }



  return (
    <aside className={`main-sidebar sidebar-${props.theme}-${props.btncolor} elevation-4`} style={{ height: "100%", position: "fixed" }}>
      <a href="/Home" className="brand-link" >
        <img src={localStorage.getItem('Orglogo') || Finslogo} alt="Logo" className=" elevation-3 mr-2" style={{ opacity: '.8', height: "50px", width: "50px", borderRadius: "50%", overflow: "hidden" }} />
        <span className="brand-text text-danger" style={{ fontSize: "18px" }}>{currentorg}</span>
      </a>

      <div className="sidebar pb-3 " >
        <div className="form-inline mt-3 pb-3 mb-3 d-flex">
          <div className="input-group text-danger" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar " type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-2 pb-5" >
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item ">
              <a href="/Home" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p> Dashboard </p>
              </a>
            </li>
            <li className="nav-item" style={styleDisplay} id="itemsmenu">
              <a href="/ShowItem" className="nav-link active p-1" >
                <span className="material-symbols-outlined pt-1 pl-2">
                  category
                </span>&nbsp;
                <p > Items </p>
              </a>
            </li>

            {/* ################# Sales Section Start ############## */}
            <li className="nav-item" id='salesMenu' style={styleDisplay}>
              <a href='#' className="nav-link active">
                <i className="nav-icon material-icons" style={{ marginLeft: "-5px" }}>shopping_cart</i>
                <p >
                  Sales
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" style={styleDisplay} id="CustomerMenu">
                  <a href="/TotalCustomer" className="nav-link active">
                    <i className="fa fa-user nav-icon" aria-hidden="true"></i>
                    <p> Customer</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id="custaddressMenu">
                  <a href="/TotalCustAddress" className="nav-link active">
                    <i className="fa fa-address-book nav-icon" />
                    <p>Addresses</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='estimatesMenu'>
                  <a href="/Estimates" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Estimates</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='orderMenu'>
                  <a href="/SaveSalesOrder" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Sales Order</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='deliverychallansmrnu'>
                  <a href="/DeliveryChallans" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Delivery Challans</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id="Invoicemenu">
                  <a href="/SaveInvoice" className="nav-link active">
                    <i className="far fa-file nav-icon" />
                    <p>Invoices</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='pmtRecMenu'>
                  <a href="/PaymentsReceived" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Payments Received</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='recInvoiceMenu'>
                  <a href="/TotalRecurringInvoice" className="nav-link active">
                    <i className="fa fa-retweet nav-icon" />
                    <p>Recurring Invoices</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='creditNoteMenu'>
                  <a href="/CreditNotesUI" className="nav-link active">
                    <i className="fa fa-credit-card nav-icon" />
                    <p>CreditNotes</p>
                  </a>
                </li>

              </ul>
            </li>
            {/* Purchases Menu Start */}
            <li className="nav-item" style={styleDisplay} id='purchasesMenu'>
              <a href='#' className="nav-link active">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                <p >
                  &nbsp;  Purchases
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" id='vendMenu' style={styleDisplay} >
                  <a href="/Showvendor" className="nav-link active">
                    <i className="far fa-user nav-icon" />
                    <p> Vendor</p>
                  </a>
                </li>
                <li className="nav-item" id='vendaddMenu' style={styleDisplay} >
                  <a href="/TotalVendAddress" className="nav-link active">
                    <i className="far fa-address-book nav-icon" />
                    <p>Address</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='vendRecurrMenu'>
                  <a href="/RecurringExpenses" className="nav-link active">
                    <i className="fa fa-retweet nav-icon" aria-hidden="true" />
                    <p>Recurring Expenses</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='purchaseOrderMenu'>
                  <a href="/SavePurchaseOrder" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Purchase Order</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id="vendBillsMenu">
                  <a href="/SaveBillReport" className="nav-link active">
                    <i className="fa fa-file nav-icon" />
                    <p>Bills</p>
                  </a>
                </li>
                <li className="nav-item" id='vendrecbillMenu' style={styleDisplay}>
                  <a href="/TotalRecurringBill" className="nav-link active">
                    <i className="fa fa-retweet nav-icon" />
                    <p>Recurring Bills</p>
                  </a>
                </li>
                <li className="nav-item" id='vendcredMenu' style={styleDisplay}>
                  <a href="/DebitNotes" className="nav-link active">
                    <i className="fa fa-credit-card nav-icon" />
                    <p>Debit Notes</p>
                  </a>
                </li>
              </ul>
            </li>
            {/* Accountant Master */}
            <li className="nav-item" style={styleDisplay} id="accountantMenu">
              <a href="#" className="nav-link active">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                <p>&nbsp;  Accountant<i className="right fas fa-angle-left" /></p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" style={styleDisplay} id='currencyAdjMenu'>
                  <a href="/Currency-Adjustment" className="nav-link active">
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                    <p>Currency Adjustments </p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='journal_voucherMenu'>
                  <a href="/TotalJVoucher" className="nav-link active">
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                    <p>Journal Voucher </p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='banking_receMenu'>
                  <a href="/TotalBankingReceipt" className="nav-link active">
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                    <p>Banking (Receipts)</p>
                  </a>
                </li>
                <li className="nav-item" style={styleDisplay} id='banking_paytMenu'>
                  <a href="/TotalBankingPayment" className="nav-link active">
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                    <p>Banking (Payment)</p>
                  </a>
                </li>
                {/* <li className="nav-item" style={styleDisplay} id='cash_paytMenu'> */}
                <li className="nav-item" id='cash_paytMenu'>
                  <a href="/TotalCashPayment" className="nav-link active">
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                    <p>Cash (Payment)</p>
                  </a>
                </li>
                <li className="nav-item" id='cash_recepMenu'>
                  <a href="/TotalCashReceipt" className="nav-link active">
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                    <p>Cash (Receipt)</p>
                  </a>
                </li>

                
                {/* 
                <li className="nav-item" style={styleDisplay} id='coacctMenu'>
                  <a href="#" className="nav-link active bg-success">
                    <p className=""> Chart Of Accounts</p>
                    <i className="right fas fa-angle-left" />
                  </a>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/ShowChartAccount" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p> Chart OF Account </p>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a href="/ShowAccountname" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p>Account Major code</p>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a href="/ShowAccountMinorCode" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p>Account Minor Code</p>
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </li>
            {/* Master Menu */}
            <li className="nav-item" style={styleDisplay} id='masterMenu'>
              <a href="#" className="nav-link active">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                <p >
                  &nbsp;  Master
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" id='countrymenu' style={styleDisplay}>
                  <a href="/ShowCountry" className="nav-link active">
                    <i className="fa fa-globe nav-icon" />
                    <p> Country</p>
                  </a>
                </li>

                <li className="nav-item" id='statemenu' style={styleDisplay}>
                  <a href="/ShowState" className="nav-link active">
                    <i className="fa fa-globe nav-icon" />
                    <p> State</p>
                  </a>
                </li>

                <li className="nav-item" id='citymenu' style={styleDisplay}>
                  <a href="/Showcity" className="nav-link active">
                    <i className="fa fa-globe nav-icon" />
                    <p> City</p>
                  </a>
                </li>

                <li className="nav-item" id='currencymenu' style={styleDisplay}>
                  <a href="/ShowCurrency" className="nav-link active">&nbsp;
                    <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;&nbsp;
                    <p>Currency</p>
                  </a>
                </li>

                <li className="nav-item" id='unitmenu' style={styleDisplay}>
                  <a href="/ShowUnit" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Unit</p>
                  </a>
                </li>

                <li className="nav-item" id="bankMenu" style={styleDisplay}>
                  <a href="/TotalBank" className="nav-link active">
                    <i className="fa fa-university nav-icon" />
                    <p>Bank</p>
                  </a>
                </li>

                <li className="nav-item" id="usermenu" style={styleDisplay}>
                  <a href="/ShowUser" className="nav-link active">
                    <i className="far fa-user nav-icon" />
                    <p>User</p>
                  </a>
                </li>

                <li className="nav-item" id='comptypeMenu' style={styleDisplay}>
                  <a href="/ShowcompliancesType" className="nav-link active">
                    <i className="fa fa-tasks nav-icon" />
                    <p>Compliance Type</p>
                  </a>
                </li>

                <li className="nav-item" id='payment_term' style={styleDisplay}>
                  <a href="/ShowPaymentTerm" className="nav-link active">
                    <i className="fa fa-university nav-icon" />
                    <p>Payment Terms</p>
                  </a>
                </li>

                <li className="nav-item" id='employeeMenu' style={styleDisplay}>
                  <a href="/showemployee" className="nav-link active">
                    <i className="far fa-file nav-icon" />
                    <p>Employee Master</p>
                  </a>
                </li>

                <li className="nav-item" id='coacctMenu' style={styleDisplay}>
                  <a href="/ShowChartAccount" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Chart of Account</p>
                  </a>
                </li>

                <li className="nav-item" id='rec_freqMenu' style={styleDisplay}>
                  <a href="/TotalRecurringFrequency" className="nav-link active">
                    <i className="fa fa-retweet nav-icon" ></i>
                    <p>Recurring Frequency</p>
                  </a>
                </li>

                <li className="nav-item" id='tds_headMenu' style={styleDisplay}>
                  <a href="/TotaltdsHead" className="nav-link active">
                    <i className="fa fa-file nav-icon" ></i>
                    <p>Tds Head</p>
                  </a>
                </li>
              </ul>


              {/* <li className="nav-item" style={styleDisplay} id='coacctMenu'>
                  <a href="#" className="nav-link active bg-success">
                    <p className=""> Chart Of Accounts</p>
                    <i className="right fas fa-angle-left" />
                  </a>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/ShowChartAccount" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p> Chart OF Account </p>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a href="/ShowAccountname" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p>Account Major code</p>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a href="/ShowAccountMinorCode" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p>Account Minor Code</p>
                      </a>
                    </li>
                  </ul>
                </li> */}
            </li>
            {/* ######################### Report Menu  ########################### */}
            <li className="nav-item" id='reportMenu' style={styleDisplay}>
              <a href="/Reportdata" className="nav-link active">
                <i className="far ion-arrow-graph-up-right nav-icon" style={{ marginLeft: "-5px" }} />
                <p> Report </p>
              </a>
            </li>


            <li className="nav-item financial-year-change" id="menu_finsyear" >
              <a className="nav-link active">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <p >
                  &nbsp;  Financial Year
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                {
                  financialyeardata.map((item, index) => (
                    <li key={index} className="nav-item"
                      onClick={() => {
                        localStorage.setItem('fin_year', item.fin_year);
                        localStorage.setItem('year', item.year);
                        localStorage.setItem('financialstatus', item.financial_year_lock);
                        window.location.reload()
                      }
                      }>
                      <a href="#" className="nav-link active">
                        <i className="fa fa-calendar" aria-hidden="true" ></i> &nbsp;
                        <span  >{item.fin_year}</span>
                      </a>
                    </li>
                  ))
                }
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}


export default Menu
