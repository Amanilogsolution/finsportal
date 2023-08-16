import React, { useState, useEffect } from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import InvoiceReport from './Reports/InvoiceReport';
import { FilterInvoice, ActiveCustomer, ActiveLocationAddress, ActiveVendor, FilterBillReport, getUserRolePermission, filterPO, filterSO, filterCN, filterDN, getUserRole, filterBankPayment, ActiveBank, filterCashReceiptReport, filterCashPaymentReport } from '../../api'
import BillReport from './Reports/BillReport';
import POReport from './Reports/POReport';
import SOReport from './Reports/SOReport';
import CNReport from './Reports/CNReport';
import DNReport from './Reports/DNReport';
import BankPayReport from './Reports/BankPayReport'
import Loading from '../loadingPage/loadingPage'
import CashReceiptReport from './Reports/CashReceipt';
import CashPaymentReport from './Reports/CashPaymentReport';

const Reportdata = () => {
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState()
  const [customerlist, setCustomerlist] = useState([])
  const [vendorlist, setVendorlist] = useState([])
  const [vendcustname, setVendcustname] = useState('')
  const [locationlist, setLocationlist] = useState([])
  const [activeBanklist, setActiveBanklist] = useState([])

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
      const allbank = await ActiveBank(org);
      setActiveBanklist(allbank)

      const role = await getUserRole(org, localStorage.getItem('Role'))
      setLoading(true)
      Todaydate()
      if (role.reports_invoice_view === 'true') {
        document.getElementById('invoicedropdown').style.display = 'block'
      }
      if (role.reports_bill_view === 'true') {
        document.getElementById('billdropdown').style.display = 'block'
      }
      if (role.reports_po_view === 'true') {
        document.getElementById('podropdown').style.display = 'block'
      }
      if (role.reports_so_view === 'true') {
        document.getElementById('sodropdown').style.display = 'block'
      }
      if (role.reports_cn_view === 'true') {
        document.getElementById('codropdown').style.display = 'block'
      }
      if (role.reports_dn_view === 'true') {
        document.getElementById('dodropdown').style.display = 'block'
      }
      if (role.reports_bankrecep_view === 'true') {
        document.getElementById('bankRecpdropdown').style.display = 'block'
      }
      if (role.reports_bankpymt_view === 'true') {
        document.getElementById('bankPaydropdown').style.display = 'block'
      }
      if (role.reports_cashrecep_view === 'true') {
        document.getElementById('cashRecpdropdown').style.display = 'block'
      }
      if (role.reports_cashpymt_view === 'true') {
        document.getElementById('cashPaydropdown').style.display = 'block'
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
      // setData(result)
    }
    else if (report_type === 'SO') {
      const Customer = document.getElementById('customer');
      const Customerid = Customer.value;
      // const locationid = document.getElementById('location').value;
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
    else if (report_type === 'bank_recp') {
      // const bank = document.getElementById('bank');
      // const locationid = document.getElementById('location').value;
      // setVendcustname(Customer.options[Customer.selectedIndex].text)
      // const result = await filterBank(org, fromdate, todate, bank)
      // console.log(result)
      // setData(result)
    }
    else if (report_type === 'bank_pymt') {
      const bank = document.getElementById('bank').value;
      if (bank !== 'all') {
        let bank_Name = bank.split(',')
        setVendcustname(bank_Name[2])
      }
      const result = await filterBankPayment(org, fromdate, todate, bank)
      setData(result.data)
    }
    else if (report_type === 'cash_recp') {
      const result = await filterCashReceiptReport(org, fromdate, todate)
      setData(result.data)
    }
    else if (report_type === 'cash_pymt') {
      const result = await filterCashPaymentReport(org, fromdate, todate)
      console.log(result.data)
      setData(result.data)
    }

  }

  const handleChangetype = (e) => {
    if (e.target.value === 'Bills') {
      document.getElementById('locationdiv').style.display = 'none';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
      document.getElementById('bankdiv').style.display = 'none';
    }
    else if (e.target.value === 'Invoice') {
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('bankdiv').style.display = 'none';
    }
    else if (e.target.value === 'PO') {
      // ---- Column Address Error -------- 
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
      document.getElementById('bankdiv').style.display = 'none';
    }
    else if (e.target.value === 'SO') {
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('locationdiv').style.display = 'none';
      document.getElementById('bankdiv').style.display = 'none';
    }
    else if (e.target.value === 'CN') {
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('customerdiv').style.display = 'flex';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('bankdiv').style.display = 'none';
    }

    else if (e.target.value === 'DN') {
      document.getElementById('locationdiv').style.display = 'flex';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'flex';
      document.getElementById('bankdiv').style.display = 'none';
    }
    else if (e.target.value === 'bank_recp' || e.target.value === 'bank_pymt') {
      document.getElementById('locationdiv').style.display = 'none';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('bankdiv').style.display = 'flex';
    }
    else if (e.target.value === 'cash_pymt' || e.target.value === 'cash_recp') {
      document.getElementById('locationdiv').style.display = 'none';
      document.getElementById('customerdiv').style.display = 'none';
      document.getElementById('vendordiv').style.display = 'none';
      document.getElementById('bankdiv').style.display = 'none';
    }
  }


  const reportType = () => {
    switch (document.getElementById('report_type').value) {
      case 'Invoice':
        return <InvoiceReport displaydata={data} name={vendcustname} />
      case 'Bills':
        return <BillReport displaydata={data} name={vendcustname} />
      case 'PO':
        return <POReport displaydata={data} name={vendcustname} />
      case 'SO':
        return <SOReport displaydata={data} name={vendcustname} />
      case 'CN':
        return <CNReport displaydata={data} name={vendcustname} />
      case 'DN':
        return <DNReport displaydata={data} name={vendcustname} />
      case 'bank_pymt':
        return <BankPayReport displaydata={data} name={vendcustname} />
      case 'cash_recp':
        return <CashReceiptReport displaydata={data} name={vendcustname} />
      case 'cash_pymt':
        return <CashPaymentReport displaydata={data} name={vendcustname} />
      default:
        return null;
    }
  }

  return (
    <div className="wrapper">
      <Header />
      {
        loading ?
          <>
            <div className='content-wrapper'>
              <div className="container-fluid">
                <button type="button" style={{ float: "right", marginRight: '10%', marginTop: '1%' }} className={`btn btn-${themebtncolor}`} data-toggle="modal" data-target="#exampleModal">
                  <i className="fa fa-filter" aria-hidden="true"></i> Generate Report</button>
                <br /> <h3 className="text-left ml-5">Report</h3>
                <div className="card w-100">
                  <article className='card-body'>
                    <form>
                      {
                        data ? reportType() : <h3 className='text-center'>Filter to show data</h3>
                      }
                    </form>
                  </article>

                </div>
              </div>
            </div>

            {/* ######################## Modal Start ############################### */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className='modal-content'>
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
                          <option id='billdropdown' style={{ display: "none" }} value='Bills'>Purchase Journal</option>
                          <option id='podropdown' style={{ display: "none" }} value='PO'>Purchase Order</option>
                          <option id="sodropdown" style={{ display: "none" }} value='SO'>Sales Order</option>
                          <option id="codropdown" style={{ display: "none" }} value='CN'>Credit Note</option>
                          <option id="dodropdown" style={{ display: "none" }} value='DN'>Debit Note</option>
                          <option id="bankRecpdropdown" style={{ display: "none" }} value='bank_recp'>Bank Receipt</option>
                          <option id="bankPaydropdown" style={{ display: "none" }} value='bank_pymt'>Bank Payment</option>
                          <option id="cashRecpdropdown" style={{ display: "none" }} value='cash_recp'>Cash Receipt</option>
                          <option id="cashPaydropdown" style={{ display: "none" }} value='cash_pymt'>Cash Payment</option>
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
                    <div className="form-row" style={{ display: "none" }} id='bankdiv'>
                      <label htmlFor="bank" className="col-md-3 col-form-label font-weight-normal">Bank</label>
                      <div className="col form-group" >
                        <select className="form-control col" id='bank' >
                          <option value='all'>All</option>
                          {activeBanklist.map((bankdata, index) => (
                            <option key={index} value={[bankdata.bank_id, bankdata.sub_code, bankdata.bank_name, bankdata.chart_of_account]}> {bankdata.bank_name} ({bankdata.account_no}) </option>))
                          }
                        </select>
                      </div>
                    </div>

                    <div className="form-row" >
                      <label htmlFor="from_date" className="col-md-3 col-form-label font-weight-normal">From<span className='text-danger'>*</span></label>
                      <div className="col form-group" >
                        <input type="date" className="form-control col" id='from_date' />

                      </div>
                    </div>
                    <div className="form-row" >
                      <label htmlFor="to_date" className="col-md-3 col-form-label font-weight-normal">TO<span className='text-danger'>*</span></label>
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

export default Reportdata;