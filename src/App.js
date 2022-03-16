import React, { Component } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Customer from './Customer'
// import Organisation from './organisation/Organisation'
import Org from './organisation/org'

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
          </Routes>
        
        </BrowserRouter>
        
      </div>
    )
  }
}
