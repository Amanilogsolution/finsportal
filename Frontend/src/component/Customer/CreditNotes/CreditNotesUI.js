import React, { useState,useEffect } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { FilterInvoice, ActiveCustomer, ActiveLocationAddress, ActiveVendor, FilterBillReport, getUserRolePermission, filterPO } from '../../../api/index'


function CreditNotes() {
    const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [customerlist, setCustomerlist] = useState([])
  const [vendorlist, setVendorlist] = useState([])
  const [vendcustname, setVendcustname] = useState('')
  const [locationlist, setLocationlist] = useState([])

  const themebtncolor = localStorage.getItem('themebtncolor') || 'primary'

  useEffect(() => {
    const fetchData = async () => {
      const org = localStorage.getItem('Organisation')

      const customer = await ActiveCustomer(org)
      setCustomerlist(customer)
      const location = await ActiveLocationAddress(org)
      setLocationlist(location)


      const vend = await ActiveVendor(org)
      setVendorlist(vend)
    //   Todaydate()


      setLoading(true)
      const UserRights_invoice = await getUserRolePermission(org, localStorage.getItem('Role'), 'reports_invoice')
      if (UserRights_invoice.reports_invoice_view === 'true') {
        document.getElementById('invoicedropdown').style.display = 'block'
      }

      const UserRights_bill = await getUserRolePermission(org, localStorage.getItem('Role'), 'reports_bill')
      if (UserRights_bill.reports_bill_view === 'true') {
        document.getElementById('billdropdown').style.display = 'block'
      }
    }
    fetchData()
  }, [data])

  
    return (
        <div className="wrapper">
      {
        loading ?
          <>
            {/* <div className="preloader flex-column justify-content-center align-items-center">
              <div className="spinner-border" role="status"> </div>
            </div> */}
            <Header />
            <div className={`content-wrapper`}>
              <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className={`btn btn-${themebtncolor}`} data-toggle="modal" data-target="#exampleModal">
                <i className="fa fa-filter" aria-hidden="true"></i> Generate Credit Note</button>

              <div className="container-fluid">
                <br /> <h3 className="text-left ml-5">Invoices</h3>
                <div className="card w-100">
                  <article className={`card-body`}>
                    <form>
                     
                    </form>
                  </article>

                </div>
              </div>
            </div>

            {/* ######################## Modal Start ############################### */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className={`modal-content`}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"><i className="fa fa-filter" aria-hidden="true"></i>Credit Note Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">

                    <div className="form-row" >
                     
                    </div>
                    <div className="form-row" id='locationdiv'>
                      <label htmlFor="location" className="col-md-3 col-form-label font-weight-normal">Location</label>
                      <div className="col form-group" >
                        <select type="text" className="form-control col" id='location' >
                          <option value='' hidden>Select Loaction</option>
                          {
                            locationlist.map((item, index) =>
                              <option value={item.location_id} key={index}>{item.location_city}</option>)
                          }
                        </select>
                      </div>
                    </div>


                    <div className="form-row" id='customerdiv'>
                      <label htmlFor="customer" className="col-md-3 col-form-label font-weight-normal">Customer</label>
                      <div className="col form-group" >
                        <select className="form-control col" id='customer' >
                          <option value='all'>All</option>
                          {
                            customerlist.map((item, index) =>
                              <option value={item.cust_id} key={index}>{item.cust_name}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row" id='customerdiv'>
                      <label htmlFor="customer" className="col-md-3 col-form-label font-weight-normal">Invoice</label>
                      <div className="col form-group" >
                        <select className="form-control col" id='customer' >
                          <option value='all'>All</option>
                          {
                            customerlist.map((item, index) =>
                              <option value={item.cust_id} key={index}>{item.cust_name}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row" style={{ display: "none" }} id='vendordiv'>
                      <label htmlFor="vendor" className="col-md-3 col-form-label font-weight-normal">Vendor</label>
                      <div className="col form-group" >
                        <select className="form-control col" id='vendor' >
                          <option value='all'>All</option>
                          {
                            vendorlist.map((item, index) =>
                              <option value={item.vend_id} key={index}>{item.vend_name}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row" >
                      <label htmlFor="from_date" className="col-md-3 col-form-label font-weight-normal">From<span style={{ color: "red" }}>*</span></label>
                      <div className="col form-group" >
                        <input type="date" className="form-control col" id='from_date' />

                      </div>
                    </div>
                    <div className="form-row" >
                      <label htmlFor="to_date" className="col-md-3 col-form-label font-weight-normal">TO<span style={{ color: "red" }}>*</span></label>
                      <div className="col form-group" >
                        <input type="date" className="form-control col" id='to_date' />

                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className={`btn btn-${themebtncolor}`} data-dismiss="modal" >Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ########################## Modal End ###################################3 */}
            <Footer />
          </>
          :
          (<div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="spinner-border" role="status"> </div>
          </div>)
      }
    </div >
    )
}

export default CreditNotes
