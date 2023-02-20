import React, { useEffect } from 'react';
import Finslogo from '../../images/finslogo.png'
import { getUserRole } from '../../api/index'


const Menu = (props) => {
  const currentorg = localStorage.getItem('Organisation Name');

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getUserRole(localStorage.getItem('Organisation'), localStorage.getItem('Role'))
      Rolefunction(result)
    }
    fetchdata()
  }, [])

  const Rolefunction = (result) => {
    // ################  Items Roles #############
    if (result.items_view === "true") {
      document.getElementById('itemsmenu').style.display = "block"
    }
    else {
      document.getElementById('itemsmenu').style.display = "none"
    }
    //  ###############  Sales ROle ###########
    if (result.sales_all === 'true') {
      document.getElementById('salesMenu').style.display = "block"
      if (result.customer_view === "true") {
        document.getElementById('CustomerMenu').style.display = "block"
        document.getElementById('custaddressMenu').style.display = "block"
      } else {
        document.getElementById('CustomerMenu').style.display = "none"
        document.getElementById('custaddressMenu').style.display = "none"
      }
      if (result.invoice_view === "true") {
        document.getElementById('Invoicemenu').style.display = "block"
      } else {
        document.getElementById('Invoicemenu').style.display = "none"
      }
    }
    else {
      document.getElementById('salesMenu').style.display = "none"

    }

    // Purchase Menu ROle Start
    if (result.purchases_all === 'true') {
      document.getElementById('purchasesMenu').style.display = "block"
      if (result.vendor_view === "true") {
        document.getElementById('vendMenu').style.display = "block"
        document.getElementById('vendaddMenu').style.display = "block"
      } else {
        document.getElementById('vendMenu').style.display = "none"
        document.getElementById('vendaddMenu').style.display = "none"
      }

      if (result.bills_view === "true") {
        document.getElementById('vendBillsMenu').style.display = "block"
      } else {
        document.getElementById('vendBillsMenu').style.display = "none"
      }
    }
    else {
      document.getElementById('purchasesMenu').style.display = "none"
    }
    // Purchase Menu ROle End

    // Master Menu Roles Start
    if (result.master_all === "true") {
      document.getElementById('masterMenu').style.display = "block";

      if (result.country_view === "true") {
        document.getElementById('countrymenu').style.display = "block"
      }
      else {
        document.getElementById('countrymenu').style.display = "none"
      }

      if (result.state_view === "true") {
        document.getElementById('statemenu').style.display = "block"
      }
      else {
        document.getElementById('statemenu').style.display = "none"
      }
      if (result.city_view === "true") {
        document.getElementById('citymenu').style.display = "block"
      }
      else {
        document.getElementById('citymenu').style.display = "none"
      }
      if (result.currency_view === "true") {
        document.getElementById('currencymenu').style.display = "block"
      }
      else {
        document.getElementById('currencymenu').style.display = "none"
      }

      if (result.unit_view === "true") {
        document.getElementById('unitmenu').style.display = "block"
      }
      else {
        document.getElementById('unitmenu').style.display = "none"
      }


      if (result.banking_view === "true") {
        document.getElementById('bankMenu').style.display = "block"
      } else {
        document.getElementById('bankMenu').style.display = "none"
      }

      if (result.users_view === "true") {
        document.getElementById('usermenu').style.display = "block"
      } else {
        document.getElementById('usermenu').style.display = "none"

      }

      if (result.comp_type_view === "true") {
        document.getElementById('comptypeMenu').style.display = "block"
      }
      else {
        document.getElementById('comptypeMenu').style.display = "none"
      }

      if (result.employee_view === "true") {
        document.getElementById('employeeMenu').style.display = "block"
      }
      else {
        document.getElementById('employeeMenu').style.display = "none"
      }

    }
    else {
      document.getElementById('masterMenu').style.display = "none"
    }
    // Master Menu Roles End





    // Accountant Menu ROle Start
    if (result.accountant_all === 'true') {
      document.getElementById('accountantMenu').style.display = "block";

      if (result.currency_addj_view === "true") {
        document.getElementById('currencyAdjMenu').style.display = "block"
      } else {
        document.getElementById('currencyAdjMenu').style.display = "none"
      }

      if (result.chartof_accounts_view === "true") {
        document.getElementById('coacctMenu').style.display = "block"
      } else {
        document.getElementById('coacctMenu').style.display = "none"
      }
    }
    else {
      document.getElementById('accountantMenu').style.display = "none"

    }
    // Accountant Menu ROle End

    // Report Menu Role Start
    if (result.reports_all === "true") {
      document.getElementById('reportMenu').style.display = "block"
    } else {
      document.getElementById('reportMenu').style.display = "none"
    }

    // Report Menu Role End
  }



  return (
      <aside className={`main-sidebar sidebar-${props.theme}-${props.btncolor} elevation-4`} style={{ height: "100%", position: "fixed" }}>
        <a href="/home" className="brand-link" >
          <img src={localStorage.getItem('Orglogo') || Finslogo} alt="Logo" className=" elevation-3 mr-2" style={{ opacity: '.8', height: "50px", width: "50px", borderRadius: "50%", overflow: "hidden" }} />
          <span className="brand-text " style={{ color: "red", fontSize: "18px" }}>{currentorg}</span>
        </a>

        <div className="sidebar pb-3 " >
          <div className="form-inline mt-3 pb-3 mb-3 d-flex">
            <div className="input-group " data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
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
                <a href="/home" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p> Dashboard </p>
                </a>
              </li>
              <li className="nav-item" style={{ display: "none" }} id="itemsmenu">
                <a href="/ShowItem" className="nav-link active p-1" >
                  <span className="material-symbols-outlined pt-1 pl-2">
                    category
                  </span>&nbsp;
                  <p > Items </p>
                </a>
              </li>

              {/* ################# Sales Section Start ############## */}
              <li className="nav-item"  id='salesMenu'>
                <a href="#" className="nav-link active">
                  <i className="nav-icon material-icons" style={{ marginLeft: "-5px" }}>shopping_cart</i>
                  <p >
                    Sales
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item" style={{ display: "none" }} id="CustomerMenu">
                    <a href="/TotalCustomer" className="nav-link active">
                      <i className="fa fa-user nav-icon" aria-hidden="true"></i>
                      <p> Customer</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }}  id="custaddressMenu">
                    <a href="/TotalCustAddress" className="nav-link active">
                      <i className="fa fa-address-book nav-icon" />
                      <p>Addresses</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='estimatesMenu'>
                    <a href="/Estimates" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Estimates</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='orderMenu'>
                    <a href="/SalesOrder" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Sales Order</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='deliverychallansmrnu'>
                    <a href="/DeliveryChallans" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Delivery Challans</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id="Invoicemenu">
                    <a href="/SaveInvoice" className="nav-link active">
                      <i className="far fa-file nav-icon" />
                      <p>Invoices</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='pmtRecMenu'>
                    <a href="/PaymentsReceived" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Payments Received</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='recInvoiceMenu'>
                    <a href="/RecurringInvoices" className="nav-link active">
                      <i className="far fa-file nav-icon" />
                      <p>Recurring Invoices</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='creditNoteMenu'>
                    <a href="/CreditNotes" className="nav-link active">
                      <i className="fa fa-credit-card nav-icon" />
                      <p>CreditNotes</p>
                    </a>
                  </li>

                </ul>
              </li>
              {/* Purchases Menu Start */}
              <li className="nav-item" style={{ display: "none" }} id='purchasesMenu'>
                <a href="/Customer" className="nav-link active">
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                  <p >
                    &nbsp;  Purchases
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item" id='vendMenu' style={{ display: "none" }} >
                    <a href="/Showvendor" className="nav-link active">
                      <i className="far fa-user nav-icon" />
                      <p> Vendor</p>
                    </a>
                  </li>
                  <li className="nav-item" id='vendaddMenu' style={{ display: "none" }} >
                    <a href="/TotalVendAddress" className="nav-link active">
                      <i className="far fa-address-book nav-icon" />
                      <p>Address</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='vendRecurrMenu'>
                    <a href="/RecurringExpenses" className="nav-link active">
                      <i className="far fa-circle nav-icon" aria-hidden="true" />
                      <p>Recurring Expenses</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id='purchaseOrderMenu'>
                    <a href="/PurchaseOrder" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Purchase Order</p>
                    </a>
                  </li>
                  <li className="nav-item" style={{ display: "none" }} id="vendBillsMenu">
                    <a href="/SaveBillReport" className="nav-link active">
                      <i className="fa fa-file nav-icon" />
                      <p>Bills</p>
                    </a>
                  </li>
                  <li className="nav-item" id='vendrecbillMenu' style={{ display: "none" }}>
                    <a href="/RecurringBills" className="nav-link active">
                      <i className="far fa-file nav-icon" />
                      <p>Recurring Bills</p>
                    </a>
                  </li>
                  <li className="nav-item" id='vendcredMenu' style={{ display: "none" }}>
                    <a href="/VendorCredits" className="nav-link active">
                      <i className="fa fa-credit-card nav-icon" />
                      <p>Vendor Credits</p>
                    </a>
                  </li>

                </ul>
              </li>
              {/* Accountant Master */}
              <li className="nav-item" style={{ display: "none" }} id="accountantMenu">
                <a href="/Customer" className="nav-link active">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                  <p >
                    &nbsp;  Accountant
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item" style={{ display: "none" }} id='currencyAdjMenu'>
                    <a href="/Currency-Adjustment" className="nav-link active">
                      <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;
                      <p>Currency Adjustments </p>
                    </a>
                  </li>

                  <li className="nav-item" style={{ display: "none" }} id='coacctMenu'>
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
                  </li>
                </ul>
              </li>
              {/* Master Menu */}
              <li className="nav-item" style={{ display: "none" }}   id='masterMenu'>
                <a href="/Customer" className="nav-link active">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                  <p >
                    &nbsp;  Master
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview"  >
                  <li className="nav-item" id='countrymenu' >
                    <a href="/ShowCountry" className="nav-link active">
                      <i className="fa fa-globe nav-icon" />
                      <p> Country</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview"  >
                  <li className="nav-item" id='statemenu' >
                    <a href="/ShowState" className="nav-link active">
                      <i className="fa fa-globe nav-icon" />
                      <p> State</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview"  >
                  <li className="nav-item" id='citymenu' >
                    <a href="/Showcity" className="nav-link active">
                      <i className="fa fa-globe nav-icon" />
                      <p> City</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview" >
                  <li className="nav-item"  id='currencymenu' >
                    <a href="/ShowCurrency" className="nav-link active">&nbsp;
                      <i className="nav-icon" >&#36;</i>&nbsp;&nbsp;&nbsp;
                      <p>Currency</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview"  >
                  <li className="nav-item"  id='unitmenu' >
                    <a href="/ShowUnit" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Unit</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview"  >
                  <li className="nav-item" id="bankMenu" >
                    <a href="/TotalBank" className="nav-link active">
                      <i className="fa fa-university nav-icon" />
                      <p>Bank</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview"  >
                  <li className="nav-item" id="usermenu" >
                    <a href="/ShowUser" className="nav-link active">
                      <i className="far fa-user nav-icon" />
                      <p>User</p>
                    </a>
                  </li>
                </ul>

                <ul className="nav nav-treeview" >
                  <li className="nav-item" id='comptypeMenu'>
                    <a href="/ShowcompliancesType" className="nav-link active">
                      <i className="fa fa-tasks nav-icon" />
                      <p>Compliance Type</p>
                    </a>
                  </li>
                </ul>

                {/* <ul className="nav nav-treeview" id='subcodeMenu' style={{display:"none"}}>
                  <li className="nav-item">
                    <a href="/TotalSubCode" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Sub Code</p>
                    </a>
                  </li>
                </ul> */}

                <ul className="nav nav-treeview" id='employeeMenu'>
                  <li className="nav-item"  style={{ display: "none" }} >
                    <a href="/showemployee" className="nav-link active">
                      <i className="far fa-file nav-icon" />
                      <p>Employee Master</p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* Report Menu  */}
              <li className="nav-item" id='reportMenu' style={{display:"none"}}>
                <a href="/Reportdata" className="nav-link active">
                  <i className="far ion-arrow-graph-up-right nav-icon" style={{ marginLeft: "-5px" }} />
                  <p > Report </p>
                </a>
              </li>

            </ul>
          </nav>
        </div>
      </aside>
  )
}


export default Menu
