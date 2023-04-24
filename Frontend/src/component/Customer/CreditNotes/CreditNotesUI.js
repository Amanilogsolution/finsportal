import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GetInvoicesByCustomer, filterInvoicebyCN, ActiveCustomer, ActiveLocationAddress, getUserRolePermission, filterPO,AllCNData } from '../../../api/index'
import Select from 'react-select';
import CNReport from './Report/CNReport'
import CNDetails from './Report/CNDetails'

function CreditNotes() {
  const [loading, setLoading] = useState(false)
  const [customerlist, setCustomerlist] = useState([])
  const [custname, setcustname] = useState('all')
  const [locationlist, setLocationlist] = useState([])
  const [custInvoices, setCustInvoices] = useState([])
  const [vendlocation, setVendlocation] = useState('')
  const [invoiceno, setInvoiceNo] = useState('')
  const [data, setData] = useState([])
  const [cndata, setCndata] = useState([])

  const themebtncolor = localStorage.getItem('themebtncolor') || 'primary'

  useEffect(() => {
    const fetchData = async () => {
      const org = localStorage.getItem('Organisation')

      const customer = await ActiveCustomer(org)
      setCustomerlist(customer)
      const location = await ActiveLocationAddress(org)
      setLocationlist(location)

      const CNdetails = await AllCNData(org)
      setCndata(CNdetails)

      const UserRights = await getUserRolePermission(org, localStorage.getItem('Role'), 'salesorder')
      console.log(UserRights)
      Todaydate()
      setLoading(true)

    }
    fetchData()
  }, [])

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

  const handleCustomer = async (e) => {
    setcustname(e.value)
    const result = await GetInvoicesByCustomer(localStorage.getItem('Organisation'), e.value)
    setCustInvoices(result)
  }

  const handleCustlocation = (e) => {
    setVendlocation(e.value)
  }
  const handleInvoice = (e) => {
    setInvoiceNo(e.value)
  }



  let Invoice = custInvoices.map((ele) => {
    return { value: ele.invoice_no, label: `${ele.invoice_no} ` };
  })
  Invoice.unshift({ value: 'All', label: 'All' })

  let location = locationlist.map((ele) => {
    return { value: ele.location_id, label: `${ele.location_city} , ${ele.location_id}` };
  })
  location.unshift({ value: 'All', label: 'All' })

  let Customer = customerlist.map((ele) => {
    return { value: ele.cust_id, label: `${ele.cust_name} ` };
  })
  Customer.unshift({ value: 'all', label: 'All' })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const org = localStorage.getItem('Organisation')
    const startDate = document.getElementById('from_date').value
    const lastDate = document.getElementById('to_date').value

    const result = await filterInvoicebyCN(org, startDate, lastDate, custname, vendlocation, invoiceno)
    setData(result)
  }


  return (
    <div className="wrapper">
      <Header />
      {
        loading ?
          <>
            <div className='content-wrapper'>
              <div className="container-fluid">
                <div className='d-flex justify-content-between px-3 py-3'>
                  <h3 className="ml-5">Credit Notes</h3>
                  <button type="button" id='addcreditnotesbtn' className={`btn btn-${themebtncolor}`} data-toggle="modal" data-target="#exampleModal">
                    <i className="fa fa-filter" aria-hidden="true"></i> Generate Credit Note</button>
                </div>
                <div className="card w-100">
                  <article className={`card-body`}>
                    {
                      data.length > 0 ? (
                        <CNReport displaydata={data} />
                      )
                        : <CNDetails displaydata={cndata} />
                    }
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
                        <Select
                          className="col text-dark"
                          options={location}
                          isMulti={false}
                          placeholder="Select Location"
                          onChange={handleCustlocation}
                        />
                      </div>
                    </div>

                    <div className="form-row" id='customerdiv'>
                      <label htmlFor="customer" className="col-md-3 col-form-label font-weight-normal">Customer</label>
                      <div className="col form-group" >
                        <Select
                          className="col text-dark"
                          options={Customer}
                          isMulti={false}
                          placeholder="Select Customer"
                          onChange={handleCustomer}
                        />
                      </div>
                    </div>

                    <div className="form-row" id='customerdiv'>
                      <label htmlFor="customer" className="col-md-3 col-form-label font-weight-normal">Invoice</label>
                      <div className="col form-group" >
                        <Select
                          className="col text-dark"
                          options={Invoice}
                          isMulti={false}
                          placeholder="Select Invoice"
                          onChange={handleInvoice}

                        />
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
                      <button type="button" className={`btn btn-${themebtncolor}`} onClick={handleSubmit} data-dismiss="modal" >Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ########################## Modal End ################################### */}
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
