import React from 'react';


const Menu = (props) => {
  const currentorg = localStorage.getItem('Organisation Name');

  return (
    <div>
    {console.log(props)}
      <aside className={`main-sidebar sidebar-${props.theme}-${props.btncolor} elevation-4`} style={{height:"100%",position:"fixed"}}>
        <a href="/home" className="brand-link" >
          <img src={localStorage.getItem('Orglogo')} alt="Logo" className=" elevation-3 mr-2" style={{ opacity: '.8',height:"50px",width:"50px",borderRadius:"50%" ,overflow:"hidden"}} />
          <span className="brand-text " style={{ color: "red" }}>{currentorg}</span>
        </a>

        <div className="sidebar pb-3 " >
          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">{ username}</a>
        </div>
      </div> */}
          <div className="form-inline mt-3 pb-3 mb-3 d-flex">
            <div className="input-group" data-widget="sidebar-search">
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
              <li className="nav-item ">
                <a href="/Items" className="nav-link active">
                  <i className="fa fa-briefcase" aria-hidden="true"></i> &nbsp;
                  <p> Items </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  <i className="nav-icon material-icons" >shopping_cart</i>
                  <p >
                    Sales
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a href="/TotalCustomer" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> Customer</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/TotalCustAddress" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Addresses</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Estimates" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Estimates</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/SalesOrder" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Sales Order</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/DeliveryChallans" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Delivery Challans</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Invoices" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Invoices</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/PaymentsReceived" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Payments Received</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/RecurringInvoices" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Recurring Invoices</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/CreditNotes" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>CreditNotes</p>
                    </a>
                  </li>


                  <li className="nav-item">
                    {/* <a href="#" className="nav-link active">
                      &nbsp; &nbsp; &nbsp;
                      <p> Customer</p>
                      <i className="right fas fa-angle-left" />
                    </a> */}

                    {/* <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="/TotalCustomer" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p> Customer</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/TotalCustAddress" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Addresses</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/Estimates" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Estimates</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/SalesOrder" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Sales Order</p>
                        </a>
                      </li>     
                      <li className="nav-item">
                        <a href="/DeliveryChallans" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Delivery Challans</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/Invoices" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Invoices</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/PaymentsReceived" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Payments Received</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/RecurringInvoices" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Recurring Invoices</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/CreditNotes" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>CreditNotes</p>
                        </a>
                      </li>
                    </ul> */}
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/Customer" className="nav-link active">
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                  <p >
                    &nbsp;  Purchases
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">

                  <li className="nav-item">
                    <a href="/Showvendor" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> Vendor</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/TotalVendAddress" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Address</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/RecurringExpenses" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Recurring Expenses</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/PurchaseOrder" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Purchase Order</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/Bills" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Bills</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/RecurringBills" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Recurring Bills</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/VendorCredits" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Vendor Credits</p>
                    </a>
                  </li>



                  <li className="nav-item">
                    {/* <a href="#" className="nav-link active">

                      <p> Vendor</p>
                      <i className="right fas fa-angle-left" />
                    </a> */}
                    {/* <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="/Showvendor" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p> Vendor</p>
                        </a>
                      </li>  
                      <li className="nav-item">
                        <a href="/TotalVendAddress" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Address</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/RecurringExpenses" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Recurring Expenses</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/PurchaseOrder" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Purchase Order</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/Bills" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Bills</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/RecurringBills" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Recurring Bills</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/BillPayment" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Payment Made</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/VendorCredits" className="nav-link active">
                          <i className="far fa-circle nav-icon" />
                          <p>Vendor Credits</p>
                        </a>
                      </li>
                    </ul> */}

                  </li>

                </ul>
              </li>
              <li className="nav-item">
                <a href="/Customer" className="nav-link active">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                  <p >
                    &nbsp;  Accountant
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {/* <li className="nav-item">
                    <a href="/ChartOfAccount" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> Chart OF Account </p>
                    </a>
                  </li>*/}
                  <li className="nav-item">
                    <a href="/Currency-Adjustment" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> Currency Adjustments </p>
                    </a>
                  </li>


                  <li className="nav-item ">
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
              <li className="nav-item">
                <a href="/Customer" className="nav-link active">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                  <p >
                    &nbsp;  Master
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowCountry" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> Country</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowState" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> State</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/Showcity" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p> City</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowCurrency" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Currency</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowUnit" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Unit</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/TotalBank" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Bank</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowUser" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>User</p>
                    </a>
                  </li>
                </ul>
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/TotalLocation" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Location</p>
                    </a>
                  </li>
                </ul> */}
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/Showcompliances" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Compliances</p>
                    </a>
                  </li>
                </ul> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowcompliancesType" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Compliance Type</p>
                    </a>
                  </li>
                </ul>
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowAccountInfo" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Item Account Info</p>
                    </a>
                  </li>
                </ul> */}


                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowChartAccount" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Show Chart Account</p>
                    </a>
                  </li>
                </ul> */}


                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/TotalSubCode" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Sub Code</p>
                    </a>
                  </li>
                </ul>
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowPaymentTerm" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Terms Master</p>
                    </a>
                  </li>
                </ul> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/ShowItem" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Item Master</p>
                    </a>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/Reportdata" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Reports</p>
                    </a>
                  </li>
                </ul>
                

              </li>


              <li className="nav-header"></li>
              {/* <li className="nav-item">
            <a onClick={handleClick} style={{cursor:"pointer"}}className="nav-link active">
              <p>
                Logout
              </p>
            </a>
          </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </div>

  )
}


export default Menu
