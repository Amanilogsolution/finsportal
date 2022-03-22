import React, { Component } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './component/Login/Login';
import Home from './component/Home/Home'
import Customer from './component/Customer/Customer'
// import Organisation from './organisation/Organisation'
import Org from './component/organisation/org'
import Vendor from './component/Vendor/Vendor'

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
          </Routes>
        
        </BrowserRouter>
        
      </div>
    )
  }
}
