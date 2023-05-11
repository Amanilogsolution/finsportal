import React from 'react'
import './CustInvoiceUserManual.css'
import img1 from '../../../images/UserManual/CustInvoice/img1.jpg'
import img2 from '../../../images/UserManual/CustInvoice/img2.jpg'
import img3 from '../../../images/UserManual/CustInvoice/img3.jpg'

export default function CustInvoiceUserManual() {
  return (
    <div className='custInvoice'>

       <div className='custInvoice1'>
        <div style={{ width: "70%", margin: "auto" }}>
          <h2>Invoice</h2>
          <p>The first step is go onto sidebar click onto sales dropdown. You will see three options select Invoice</p>
        </div>
        <div style={{ width: "30%", display: "flex", justifyContent: "end" }}>
          <img style={{ width: "140px", height: "350px" }} src={img1} />
        </div>
      </div>

      <div className='custInvoice2'>
        <h2>Total Invoice</h2>
        <p>After click on Invoice you will see new interface total Invoice table</p>
        <div className='d-flex justify-content-center my-4'>
          <img style={{ width: "720px", height: "320px",border:"1px solid silver" }} src={img2} />
        </div>
        <p>You can see all Invoice in the table, We also have filter on this page you can search Invoice by Vendor Name, Invoice Number, Invoice Amount, Branch</p>
      </div>

      <div className='custInvoice3'>
        <h2>Add Invoice</h2>
        <p>To add new Invoice click on add invoice button, you will see new interface</p>
        <div className='d-flex justify-content-center my-4'>
          <img style={{ width: "720px", height: "400px",border:"1px solid silver" }} src={img3} />
        </div>
        <p>Fill all the details, as you can see in the image and save, You can also see preview of Innvoice on click preview Invoice</p>
      </div>
    </div>
  )
}
