import React, { Component } from 'react'

export default class Menu extends Component {
  render() {
    return (
   <div>
  <aside className="main-sidebar sidebar-light-primary elevation-4">
    <a href="index3.html" className="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">Fins</span>
    </a>

    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Aman Lohan</a>
        </div>
      </div>
      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw" />
            </button>
          </div>
        </div>
      </div>

      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item ">
            <a href="/home" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              </p>
            </a>
         
          </li>
          <li className="nav-item">
            <a href="/Customer" className="nav-link active">
              <i className="nav-icon material-icons" >shopping_cart</i>
              <p >
                Sales
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="#" className="nav-link active"> 
                &nbsp; &nbsp; &nbsp;   
                  <p> Customer</p>
                  <i className="right fas fa-angle-left" />
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
                </ul>
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
             <a href="#" className="nav-link active">
                  {/* <i className="far fa-circle nav-icon" /> */}
                  
                  <p> Vendor</p>
                 <i className="right fas fa-angle-left" />
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

                </ul>

              </li>
             
            </ul>
          </li>
          <li className="nav-item">
            <a href="/Customer" className="nav-link active">
              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
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
          </li>
        
          <li className="nav-header"></li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              <p>
                Logout
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</div>

    )
  }
}
