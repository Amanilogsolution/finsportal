import React, { Component } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './component/Login/Login';
import Home from './component/Home/Home'
import Customer from './component/Customer/Customer'
// import Organisation from './organisation/Organisation'
import Org from './component/organisation/org'
import Vendor from './component/Vendor/Vendor'
import Showvendor from './component/Vendor/Showvendor'
import Editvendor from './component/Vendor/Editvendor'


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


export default class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/Customer" element={<Customer/>}/>
          {/* <Route path="/Organisation" element={<Organisation/>}/> */}
          <Route path="/org" element={<Org/>}/>
          <Route path="/vendor" element={<Vendor/>}/>
          <Route path="/Showvendor" element={<Showvendor/>}/>
          <Route path="/Editvendor" element={<Editvendor/>}/>

          <Route path="/StateMaster" element={<StateMaster/>}/>
          <Route path="/ShowState" element={<ShowState/>}/>
          <Route path="/EditState" element={<EditState/>}/>
          <Route path="/ShowCountry" element={<ShowCountry/>}/>
          <Route path="/AddCountry" element={<AddCountry/>}/>
          <Route path="/EditCountry" element={<EditCountry/>}/>
          <Route path="/ShowCurrency" element={<ShowCurrency/>}/>
          <Route path="/AddCurrency" element={<AddCurrency/>}/>
          <Route path="/EditCurrency" element={<EditCurrency/>}/>
          <Route path="/Showcity" element={<Showcity/>}/>
          <Route path="/Addcity" element={<Addcity/>}/>
          <Route path='/EditCity' element={<EditCity/>}/>
          <Route path="/ShowUnit" element={<ShowUnit/>}/>
          <Route path="/AddUnit" element={<AddUnit/>}/>
          <Route path="/EditUnit" element={<EditUnit/>}/>

          <Route path="/AddBank" element={<AddBank/>}/>
          <Route path="/TotalBank" element={<TotalBank/>}/>
          <Route path="/EditBank" element={<EditBank/>}/>
          <Route path="/AddBankList" element={<AddBankList/>}/>

          <Route path="/ShowUser" element={<ShowUser/>}/>
          <Route path="/AddUser" element={<AddUser/>}/>
          <Route path="/EditUser" element={<EditUser/>}/>
          <Route path="/Practice" element={<Practice/>}/>

          <Route path="/TotalCustomer" element={<TotalCustomer/>}/>
          <Route path="/EditCustomer" element={<EditCustomer/>}/>
          <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        
        </BrowserRouter>
        
      </div>
    )
  }
}
