import React, { useState, useEffect } from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import InvoiceReport from './Reports/InvoiceReport';
import { FilterInvoice, ActiveCustomer, ActiveLocationAddress, ActiveVendor, FilterBillReport, getUserRolePermission, filterPO, filterSO, filterCN, filterDN } from '../../api'
import BillReport from './Reports/BillReport';
import POReport from './Reports/POReport';
import SOReport from './Reports/SOReport';
import CNReport from './Reports/CNReport';
import DNReport from './Reports/DNReport';
import Loading from '../loadingPage/loadingPage'

const Reportdata = () => {
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
      Todaydate()


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

  const Todaydate = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    setTimeout(() => {
      document.getElementById("from_date").value = today;
      document.getElementById("to_date").value = today;
    }, 500)
  }

  const handleapply = async () => {
    document.getElementById('report_type').disabled = true;
    const org = localStorage.getItem('Organisation');
    const report_type = document.getElementById('report_type').value;
    const fromdate = document.getElementById('from_date').value;
    const todate = document.getElementById('to_date').value;

    if (report_type === 'Invoice') {
      const Customer = document.getElementById('customer');
      const Customerid = Customer.value;
      const locationid = document.getElementById('location').value;
      setVendcustname(Customer.options[Customer.selectedIndex].text)
      const result = await FilterInvoice(org, fromdate, todate, Customerid, locationid);
      setData(result)
    }
    else if (report_type === 'Bills') {
      const vend = document.getElementById('vendor');
      const vendid = vend.value;
      setVendcustname(vend.options[vend.selectedIndex].text)
      const result = await FilterBillReport(org, fromdate, todate, vendid)
      setData(result)
    }
    else if (report_type === 'PO') {
      const vend = document.getElementById('vendor');
      const vendid = vend.value;
      const locationid = document.getElementById('location').value;

      setVendcustname(vend.options[vend.selectedIndex].text)
      const result = await filterPO(org, fromdate, todate, vendid, locationid)
      console.log(result)
      setData(result)

    }
    else if (report_type === 'SO') {
      const Customer = document.getElementById('customer');
      const Customerid = Customer.value;
      const locationid = document.getElementById('location').value;
      setVendcustname(Customer.options[Customer.selectedIndex].text)
      const result = await filterSO(org, fromdate, todate, Customerid)
      setData(result)
    }
    else if (report_type === 'CN') {
      const Customer = document.getElementById('customer');
      const Customerid = Customer.value;
      const locationid = document.getElementById('location').value;

      setVendcustname(Customer.options[Customer.selectedIndex].text)
      const result = await filterCN(org, fromdate, todate, Customerid, locationid)
      setData(result)
    }
    else if (report_type === 'DN') {
      const vend = document.getElementById('vendor');
      const vendid = vend.value;
      const locationid = document.getElementById('location').value;
      setVendcustname(vend.options[vend.selectedIndex].text)
      const result = await filterDN(org, fromdate, todate, vendid, locationid)
      setData(result)

    }

  }

  const handleChangetype = (e) => {
    if (e.target.value === 'Bills') {
      document.getElementById('locationdiv').style.display = 'none';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
    }
    else if (e.target.value === 'Invoice') {
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('locationdiv').style.display = 'flex';

    }
    else if (e.target.value === 'PO') {
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
    }
    else if (e.target.value === 'SO') {
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('locationdiv').style.display = 'none';
    }
    else if (e.target.value === 'CN') {
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
    }

    else if (e.target.value === 'DN') {
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
    }
  }
  return (
    <div className="wrapper">
      <Header />
      {
        loading ?
          <>
            <div className={`content-wrapper`}>
              <div className="container-fluid">
                <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className={`btn btn-${themebtncolor}`} data-toggle="modal" data-target="#exampleModal">
                  <i className="fa fa-filter" aria-hidden="true"></i> Generate Report</button>


                <br /> <h3 className="text-left ml-5">Report</h3>
                <div className="card w-100">
                  <article className={`card-body`}>
                    <form>
                      {
                        data ? (
                          (document.getElementById('report_type').value == 'Invoice') ?
                            <InvoiceReport displaydata={data} name={vendcustname} /> : (document.getElementById('report_type').value == 'Bills')
                              ? <BillReport displaydata={data} name={vendcustname} /> : (document.getElementById('report_type').value == 'PO') ?
                                <POReport displaydata={data} name={vendcustname} /> : (document.getElementById('report_type').value == 'SO') ?
                                  <SOReport displaydata={data} name={vendcustname} /> : (document.getElementById('report_type').value == 'CN') ?
                                    <CNReport displaydata={data} name={vendcustname} /> : (document.getElementById('report_type').value == 'DN') ?
                                      <DNReport displaydata={data} name={vendcustname} /> : null)
                          : <h3 className='text-center'>Filter to show data</h3>
                      }
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
                    <h5 className="modal-title" id="exampleModalLabel"><i className="fa fa-filter" aria-hidden="true"></i> Generate Report</h5>
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
                          <option id='invoicedropdown' style={{ display: "none" }} value='Invoice'>Invoice</option>
                          <option id='billdropdown' style={{ display: "none" }} value='Bills'>Bills</option>
                          <option id='podropdown' value='PO'>Purchase Order</option>
                          <option id="sodropdown" value='SO'>Sales Order</option>
                          <option id="codropdown" value='CN'>Credit Note</option>
                          <option id="dodropdown" value='DN'>Debit Note</option>

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

                    {/* <div className="form-row" id='customerdiv'>
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
                    </div> */}

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
                      <button type="button" className={`btn btn-${themebtncolor}`} data-dismiss="modal" onClick={handleapply}>Apply Filter</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ########################## Modal End ###################################3 */}
            <Footer />
          </>
          :
          <Loading />
      }
    </div >
  )
}

export default Reportdata
