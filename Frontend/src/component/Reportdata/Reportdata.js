import React, { useState,useEffect } from 'react'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import InvoiceReport from './Reports/InvoiceReport';
import {FilterInvoice,ActiveCustomer,ActiveLocationAddress} from '../../api'

const Reportdata = () => {
  const [data,setData] = useState([])
  const [customerlist,setCustomerlist] = useState([])
  const [locationlist,setLocationlist] = useState([])

  useEffect(()=>{
       const fetchData=async()=>{
          const customer=await ActiveCustomer(localStorage.getItem('Organisation'))
          setCustomerlist(customer)
          const location=await ActiveLocationAddress(localStorage.getItem('Organisation'))
          setLocationlist(location)
       }
       fetchData()
  },[])

  const handleapply=async()=>{
    const org = localStorage.getItem('Organisation');
    const fromdate= document.getElementById('from_date').value;
    const todate= document.getElementById('to_date').value;
    const Customerid= document.getElementById('customer').value;
    const locationid= document.getElementById('location').value;
    const result =await FilterInvoice();
  }
  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <Menu />
        <div>
          <div className="content-wrapper">
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            <i class="fa fa-filter" aria-hidden="true"></i> Filter</button>

            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Report</h3>
              <div className="row ">
                <div className="col">
                  <div className="card" style={{ width: "100%" }}>
                    <article className="card-body">
                      <form>
                       <InvoiceReport/>


                      </form>
                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Start */}
          <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Filter</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">

                  <div className="form-row" >
                    <label htmlFor="location" className="col-md-2 col-form-label font-weight-normal">Location</label>
                    <div className="col form-group" f>
                      <select type="text" className="form-control col" id='location' >
                        <option value='' hidden>Select Loaction</option>
                        {
                          locationlist.map((item,index)=>
                          <option value={item.location_id} key={index}>{item.location_city}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="form-row" >
                    <label htmlFor="customer" className="col-md-2 col-form-label font-weight-normal">Customer</label>
                    <div className="col form-group" f>
                      <select type="text" className="form-control col" id='customer' >
                        <option value='all'>All</option>
                        {
                          customerlist.map((item,index)=>
                          <option value={item.cust_id} key={index}>{item.cust_name}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="form-row" >
                    <label htmlFor="from_date" className="col-md-2 col-form-label font-weight-normal">From</label>
                    <div className="col form-group" f>
                      <input type="date" className="form-control col" id='from_date' />

                    </div>
                  </div>
                  <div className="form-row" >
                    <label htmlFor="to_date" className="col-md-2 col-form-label font-weight-normal">TO</label>
                    <div className="col form-group" f>
                      <input type="date" className="form-control col" id='to_date' />

                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleapply}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal End */}
        </div>
        <Footer />

      </div>
    </div>
  )
}

export default Reportdata
