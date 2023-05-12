import React from 'react'
import './CustomerAddUserManual.css'
import img1 from '../../../../images/UserManual/CustAddress/img1.jpg'
import img2 from '../../../../images/UserManual/CustAddress/img2.jpg'
import img3 from '../../../../images/UserManual/CustAddress/img3.jpg'
import img4 from '../../../../images/UserManual/CustAddress/img4.jpg'

export default function CustomerAddUserManual() {
  return (
    <div className='custAddress'>
       <div className='custAddress1 d-flex justify-content-around'>
        <div style={{ width: "70%", margin: "auto" }}>
          <h2>Customers Address</h2>
          <p>The first step is go onto sidebar click onto sales dropdown. You will see three options select Address</p>
        </div>
        <div className='d-flex justify-content-end' style={{ width: "30%" }}>
          <img style={{ width: "140px", height: "350px" }} src={img1} />
        </div>
      </div>

      <div className='custAddress2'>
        <h2>Total Addresses Customers</h2>
        <p>After click on Address you will see the interface total customer table</p>
        <div className='d-flex justify-content-center my-4'>
          <img style={{ width: "720px", height: "320px",border:"1px solid silver" }} src={img2} />
        </div>
        <p>If you want to Locations of customer, Search customer name then you will be seen all the locations of customers</p>
      </div>

      <div className='custAddress3 d-flex my-2'>
        <div style={{margin:"auto"}}>
          <h4>Import Address by Excel file</h4>
          <p>If you have multiple data you can import excel file click on the button (Import Customer Address), You will see a model </p>
          <p>choose Excel File and uplaod </p>
        </div>
        <div>
          <img src={img3} style={{border:"1px solid silver",width:"300px"}}/>
        </div>
      </div>

      <div className='custAddress2'>
        <h2>Add Address</h2>
        <p>If you want to add new address for a customer click on Add Address Button you will see a new interface</p>
        <div className='d-flex justify-content-center my-4'>
          <img style={{ width: "720px", height: "320px",border:"1px solid silver" }} src={img4} />
        </div>
        <p>Select Customer ID then fill all the details below. After fill the form click on add button, Your task is completed</p>
      </div>
    </div>
  )
}
