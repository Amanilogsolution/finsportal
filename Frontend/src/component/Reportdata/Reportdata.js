import React, { useState, useEffect } from 'react'
import Header from "../Header/Header";
// import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import InvoiceReport from './Reports/InvoiceReport';
import { FilterInvoice, ActiveCustomer, ActiveLocationAddress, ActiveVendor, FilterBillReport } from '../../api'
import BillReport from './Reports/BillReport';

const Reportdata = () => {
  const [data, setData] = useState()
  const [customerlist, setCustomerlist] = useState([])
  const [vendorlist, setVendorlist] = useState([])
  const [vendcustname,setVendcustname] = useState('')
  const [locationlist, setLocationlist] = useState([])

  const themeval = localStorage.getItem('themetype')
  const themebtncolor = localStorage.getItem('themebtncolor')

  useEffect(() => {
    const fetchData = async () => {
      const org = localStorage.getItem('Organisation')

      const customer = await ActiveCustomer(org)
      setCustomerlist(customer)
      const location = await ActiveLocationAddress(org)
      setLocationlist(location)
    

      const vend = await ActiveVendor(org)
      setVendorlist(vend)
    }
    fetchData()
  }, [data])

  const handleapply = async () => {
    document.getElementById('report_type').disabled=true;
    
    const org = localStorage.getItem('Organisation');
    const report_type = document.getElementById('report_type').value;
    const fromdate = document.getElementById('from_date').value;
    const todate = document.getElementById('to_date').value;

    if (report_type == 'Invoice') {
      const Customer = document.getElementById('customer');
      const Customerid = Customer.value;
      const locationid = document.getElementById('location').value;
      console.log(locationid)
      setVendcustname(Customer.options[Customer.selectedIndex].text)

      const result = await FilterInvoice(org, fromdate, todate, Customerid, locationid);
      console.log(result)
      setData(result)
    }
    else if (report_type == 'Bills') {
      const vend = document.getElementById('vendor');
      const vendid = vend.value;
      setVendcustname(vend.options[vend.selectedIndex].text)

      const result = await FilterBillReport(org, fromdate, todate, vendid)
      setData(result)
    }

  }

  const handleChangetype = (e) => {
    if (e.target.value == 'Bills') {
      
      document.getElementById('locationdiv').style.display = 'none';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
    }
    else if (e.target.value == 'Invoice') {
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
    }
  }
  return (
    <div>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <div className="spinner-border" role="status"> </div>
        </div>
        <Header />
        <div>
          <div className={`content-wrapper bg-${themeval}`}>
            <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              <i className="fa fa-filter" aria-hidden="true"></i> Filter</button>

            <div className="container-fluid">
              <br /> <h3 className="text-left ml-5">Report</h3>
              <div className="row ">
                <div className="col">
                  <div className="card" style={{ width: "100%" }}>
                    <article className={`card-body bg-${themeval}`}>

                      <form>
                        {
                          data ? (
                            (document.getElementById('report_type').value == 'Invoice') ?
                              <InvoiceReport displaydata={data} name={vendcustname} /> : (document.getElementById('report_type').value == 'Bills')
                                ? <BillReport displaydata={data} name={vendcustname}/> : null)
                            : <h3 className='text-center'>Filter for show data</h3>
                        }
                      </form>
                    </article>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ######################## Modal Start ############################### */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel"><i className="fa fa-filter" aria-hidden="true"></i> Filter</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">

                  <div className="form-row" >
                    <label htmlFor="report_type" className="col-md-3 col-form-label font-weight-normal">Report Type<span style={{ color: "red" }}>*</span></label>
                    <div className="col form-group" >
                      <select className="form-control col" id='report_type' onChange={handleChangetype}>
                        <option value='' hidden>Select Type</option>
                        <option value='Invoice'>Invoice</option>
                        <option value='Bills'>Bills</option>
                      </select>
                    </div>
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
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleapply}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ########################## Modal End ###################################3 */}
        </div>
        <Footer theme={themeval}/> 

      </div>
    </div>
  )
}

export default Reportdata
