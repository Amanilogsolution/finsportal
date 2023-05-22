import React from 'react'
import './CustomerUserManual.css'

import img1 from '../../../../images/UserManual/Customers/img1.jpg'
import img2 from '../../../../images/UserManual/Customers/img2.jpg'
import img3 from '../../../../images/UserManual/Customers/img3.jpg'
import img5 from '../../../../images/UserManual/Customers/img5.jpg'
import img6 from '../../../../images/UserManual/Customers/img6.jpg'

export default function CustomerUserManual() {
  return (
    <div className='customer p-4'>
      <div className='customer1 d-flex justify-content-around'>
        <div className='m-auto' style={{ width: "70%" }}>
          <h2>Customers</h2>
          <p>The first step is go onto sidebar click onto sales dropdown. You will see three options select Customer</p>
        </div>
        <div className='d-flex justify-content-end' style={{ width: "30%" }}>
          <img style={{ width: "140px", height: "350px" }} src={img1} />
        </div>
      </div>
      <div className='customer2'>
        <h2>Total Customers</h2>
        <p>After click on customers you will see the interface total customer table</p>
        <div className='d-flex justify-content-center my-4'>
          <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
        </div>
      </div>
      <div className='customer3 d-flex my-2'>
        <div style={{ margin: "auto" }}>
          <h2>Import Excel File</h2>
          <p>If you want to import an excel file click on that button appears in the picture, then a modal will appear that is for choose to an Excel file, after upload it</p>
        </div>
        <div>
          <img className='border' src={img3} style={{ width: "300px" }} />
        </div>
      </div>
      <div className='customer4'>
        <div style={{ margin: "auto" }}>
          <h2>Add new Customer</h2>
          <p>To add new Customer click on Add customer button next to right of import excel file button. A new interface will appear you can see below, fill all the mandatory details than save this</p>
        </div>
        <div className='d-flex justify-content-center'>
          <img className='border' src={img5} style={{ width: "720px" }} />
        </div>
      </div>
      <div className='customer5 d-flex my-4'>
        <div style={{ margin: "auto" }}>
          <h2>Update Customer Name</h2>
          <p>If you want to update customer name we alos have option click on that button, you will see new interface you can see on the right side of text.</p>
          <p>Select Customer name,Fill new name and fill the date of name updated than click on update button your task in completed about customers</p>
        </div>
        <div>
          <img src={img6} className='border' style={{ width: "300px" }} />
        </div>
      </div>
    </div>
  )
}
