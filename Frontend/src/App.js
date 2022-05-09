import React from 'react'
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivatRoute from './component/HOC/PrivateRoute';
import Login from './component/Login/Login';
import Home from './component/Home/Home'
import Customer from './component/Customer/Customer'
// import Organisation from './organisation/Organisation'
import Org from './component/organisation/org'
import Vendor from './component/Vendor/Vendor'
import Showvendor from './component/Vendor/Showvendor'
import Editvendor from './component/Vendor/Editvendor'
import AddCustAddress from './component/Customer/Addresses/AddAddress';
import AddVendAddress from './component/Customer/Addresses/AddVendorAddress.';
import TotalCustAddress from './component/Customer/Addresses/TotalAddress';
import TotalVendAddress from './component/Customer/Addresses/TotalVendorAddress';

import EditAddress from './component/Customer/Addresses/EditAddress';
import EditVendorAddress from './component/Customer/Addresses/EditVendorAddress';

import StateMaster from './component/Master/State/StateMaster';
import ShowState from './component/Master/State/ShowState';
import EditState from './component/Master/State/EditState';
import ShowCountry from './component/Master/Country/ShowCountry';
import AddCountry from './component/Master/Country/AddCountry';
import EditCountry from './component/Master/Country/EditCountry';
import ShowCurrency from './component/Master/Currency/ShowCurrency';
import AddCurrency from './component/Master/Currency/AddCurrency';
import EditCurrency from './component/Master/Currency/EditCurrency';
import Showcity from './component/Master/City/Showcity';
import Addcity from './component/Master/City/Addcity';
import EditCity from './component/Master/City/EditCity';
import ShowUnit from './component/Master/Unit/ShowUnit';
import AddUnit from './component/Master/Unit/AddUnit';
import EditUnit from './component/Master/Unit/EditUnit';

import AddBank from './component/Master/Bank/AddBank';
import TotalBank from './component/Master/Bank/TotalBank';
import EditBank from './component/Master/Bank/EditBank';
import AddBankList from './component/Master/Bank/AddBankList';

import ShowUser from './component/Master/User/ShowUser';
import AddUser from './component/Master/User/Adduser';
import EditUser from './component/Master/User/EditUser';
import Practice from './component/practice';

import TotalCustomer from './component/Customer/TotalCustomer';
import EditCustomer from './component/Customer/EditCustomer';

import PageNotFound from './component/pagenotfound/pagenotfound';


 const App = () => {

   setTimeout(() => {
    localStorage.removeItem('Token')
   },8000)

    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/" restricted={false} component={Login}/>
          <Route  exact path="/home" component={Home}/>
          <Route exact path="/Customer" component={Customer}/>
          {/* <Route exact path="/Organisation" component={<Organisation/>}/> */}
          <Route exact path="/org" component={Org}/>
          <Route exact path="/vendor" component={Vendor}/>
          <Route exact path="/Showvendor" component={Showvendor}/>
          <Route exact path="/Editvendor" component={Editvendor}/>
          <Route exact path="/StateMaster" component={StateMaster}/>
          <Route exact path="/ShowState" component={ShowState}/>
          <Route exact path="/EditState" component={EditState}/>
          
          <Route exact path="/ShowCountry" component={ShowCountry}/>
          <Route exact path="/AddCountry" component={AddCountry}/>
          <Route exact path="/EditCountry" component={EditCountry}/>
          <Route exact path="/ShowCurrency" component={ShowCurrency}/>
          <Route exact path="/AddCurrency" component={AddCurrency}/>
          <Route exact path="/EditCurrency" component={EditCurrency}/>
          <Route exact path="/Showcity" component={Showcity}/>
          <Route exact path="/Addcity" component={Addcity}/>
          <Route exact path='/EditCity' component={EditCity}/>
          <PrivatRoute exact path="/ShowUnit" component={ShowUnit}/>
          <Route exact path="/AddUnit" component={AddUnit}/>
          <PrivatRoute exact path="/EditUnit" component={EditUnit}/>

          <Route exact path="/AddBank" component={AddBank}/>
          <Route exact path="/TotalBank" component={TotalBank}/>
          <Route exact path="/EditBank" component={EditBank}/>
          <Route exact path="/AddBankList" component={AddBankList}/>

          <Route exact path="/ShowUser" component={ShowUser}/>
          <Route exact path="/AddUser" component={AddUser}/>
          <Route exact path="/EditUser" component={EditUser}/>
          <Route exact path="/Practice" component={Practice}/>

          <Route exact path="/TotalCustomer" component={TotalCustomer}/>
          <Route exact path="/EditCustomer" component={EditCustomer}/>
          <Route exact path="/AddCustAddress" component={AddCustAddress}/>
          <Route exact path="/TotalCustAddress" component={TotalCustAddress}/>
          <Route exact path="/EditAddress" component={EditAddress}/>

          <Route exact path="/AddVendAddress" component={AddVendAddress}/>
          <Route exact path="/TotalVendAddress" component={TotalVendAddress}/>
          <Route exact path="/EditVendorAddress" component={EditVendorAddress}/>
          <Route exact path="*" component={PageNotFound}/>
          </Switch>
        </Router>
        
      </div>
    )
  }
export default App
