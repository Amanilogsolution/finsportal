import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveLocationAddress, ActiveAllItems, Getfincialyearid, ActiveVendor, GetBillVendorID, ActiveCustomer, GetInvoicesByCustomer } from "../../../api/index";

function JVoucher() {
  const [loading, setLoading] = useState(false);
  const [totalValues, setTotalValues] = useState([1, 1]);
  const [locationstate, setLocationstate] = useState([]);
  const [itemlist, setItemlist] = useState([]);
  const [pocount, setPOcount] = useState(0)
  const [vendorlist, setVendorlist] = useState([])
  const [customerlist, setCustomerlist] = useState([])
  const [customerInvlist, setCustomerInvlist] = useState([])
  const [vendorBilllist, setVendorBilllist] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [jvminordata, setJvminordata] = useState([
    { locationId: '', locationName: '', item: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' },
    { locationId: '', locationName: '', item: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' },
  ])


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Organisation");
      const locatonstateres = await ActiveLocationAddress(org);
      setLocationstate(locatonstateres);
      const items = await ActiveAllItems(org);
      setItemlist(items);
      const id = await Getfincialyearid(org)
      const lastno = Number(id[0].jv_count) + 1
      setPOcount(lastno)
      setLoading(true)
      document.getElementById('jv_no').value = id[0].jv_ser + id[0].year + String(lastno).padStart(5, '0')
      Todaydate();
    };
    fetchdata();
  }, []);

  const Todaydate = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    document.getElementById("jv_date").defaultValue = today;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setTotalValues([...totalValues, 1]);
    let obj = { locationId: '', locationName: '', item: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' }
    jvminordata.push(obj)
  };

  const handleRemove = (e) => {
    e.preventDefault();
    var newvalue = [...totalValues];
    if (newvalue.length === 2) {
      setTotalValues(newvalue);
    }
    else {
      jvminordata.pop();
      newvalue.pop();
      setTotalValues(newvalue);
    }
  };

  const handlelocation = (e, index) => {
    let val = e.target.value;
    let loca_arr = val.split(',')

    jvminordata[index].locationId = loca_arr[1];
    jvminordata[index].locationName = loca_arr[0];
  }
  const handleChangeItem = async (e, index) => {
    e.preventDefault();
    setLoading(false)
    let val = e.target.value;
    console.log(val)
    let item_arr = val.split('^')
    const itemname = item_arr[0]
    const glcode = item_arr[1]

    setCurrentIndex(index)
    jvminordata[index].item = itemname;
    jvminordata[index].glcode = glcode;
    setLoading(true)
    const org = localStorage.getItem('Organisation')
    if (glcode == '3020001') {
      const vendors = await ActiveVendor(org)
      setVendorlist(vendors)
      document.getElementById('SelectVendorModal').style.display = 'block'
    }
    else if (glcode == '5020001') {
      const customers = await ActiveCustomer(org)
      setCustomerlist(customers)
      document.getElementById('SelectCustomerModal').style.display = 'block'
    }

  }

  const handleOpenInvoice = (e) => {
    e.preventDefault()
    offCustomModal('SelectVendorModal')
  }

  const offCustomModal = (ids) => {
    document.getElementById(ids).style.display = 'none'
  }


  const handleClickVendor = async (vendor_id, vendor_name) => {
    const bills = await GetBillVendorID(localStorage.getItem('Organisation'), vendor_id)
    setVendorBilllist(bills)
    offCustomModal('SelectVendorModal');
    document.getElementById('billCustomModal').style.display = "block"
    jvminordata[currentIndex].vendorId = vendor_id;
    jvminordata[currentIndex].vendorName = vendor_name;
  }


  const handleClickCustomer = async (customer_id, customer_name) => {
    const invoices = await GetInvoicesByCustomer(localStorage.getItem('Organisation'), customer_id)
    setCustomerInvlist(invoices)
    offCustomModal('SelectCustomerModal');
    document.getElementById('InvCustomModal').style.display = "block"
    jvminordata[currentIndex].customerId = customer_id;
    jvminordata[currentIndex].customerName = customer_name;
  }

  const handlePassAmt = (index) => {
    jvminordata[index].passAmt = document.getElementById(`passamt-${index}`).value
    handleCalculate(index)
  }
  const handleDrCr = (index, val) => {
    if (val !== 'DR' && val !== 'dr' && val !== 'CR' && val !== 'cr') {
      document.getElementById(`drcr-${index}`).value = ''
    }
    else {
      jvminordata[index].dr_cr = val;
      handleCalculate(index)
    }
  }

  const handleCalculate = (index) => {
    const cr_dr_type = jvminordata[index].dr_cr;
    if (cr_dr_type) {
      let sumOnlyDrPassamt = 0;
      let sumOnlyCrPassamt = 0;

      jvminordata.map((dndata) => {
        if (dndata.dr_cr === 'dr' || dndata.dr_cr === 'DR') {
          sumOnlyDrPassamt = sumOnlyDrPassamt + Number(dndata.passAmt)
        }
        else if (dndata.dr_cr === 'cr' || dndata.dr_cr === 'CR') {
          sumOnlyCrPassamt = sumOnlyCrPassamt + Number(dndata.passAmt)
        }
      })
      document.getElementById(`totalcrval`).innerHTML = sumOnlyCrPassamt || 0
      document.getElementById(`totaldrval`).innerHTML = sumOnlyDrPassamt || 0
      document.getElementById(`difference`).innerHTML = Math.abs(sumOnlyCrPassamt - sumOnlyDrPassamt)
    }
  }


  const handleSetBillInvData = (vou_inv_no, vou_inv_date, total_amt) => {
    jvminordata[currentIndex].bill_no = vou_inv_no;
    jvminordata[currentIndex].date = vou_inv_date;
    jvminordata[currentIndex].amt = total_amt;

    document.getElementById(`achead-${currentIndex}`).value = jvminordata[currentIndex].vendorName || jvminordata[currentIndex].customerName;
    document.getElementById(`invno-${currentIndex}`).value = vou_inv_no
    document.getElementById(`invdate-${currentIndex}`).value = vou_inv_date
    document.getElementById(`invamount-${currentIndex}`).value = total_amt

  }

  const handleSubmitJvdata = (e) => {
    e.preventDefault();
    console.log(jvminordata)
  }
  return (
    <>
      <div className="wrapper position-relative">
        <Header />
        {loading ? (
          <div className="content-wrapper">
            <div className="container-fluid">
              <h3 className="pt-3 pb-2 pl-5"> New Journal Voucher</h3>
              <div className="card">
                <article className="card-body">
                  <form autoComplete="off">
                    <div className="form-row ">
                      <label htmlFor="jv_date" className="col-md-2 col-form-label font-weight-normal" > JV Date <span className="text-danger">*</span></label>
                      <div className="d-flex col-md-4"><input type="date" className="form-control col-md-10" id="jv_date" /></div>
                    </div>
                    <div className="form-row mt-2">
                      <label htmlFor="jv_no" className="col-md-2 col-form-label font-weight-normal">  JV ID <span className="text-danger">*</span></label>
                      <div className="d-flex col-md-4"> <input type="text" className="form-control col-md-10 " id="jv_no" disabled /></div>
                    </div>
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th scope="col">Location</th>
                          <th scope="col">Items</th>
                          <th scope="col">AcHead</th>
                          <th scope="col">Inv No</th>
                          <th scope="col">Inv Date</th>
                          <th scope="col">Inv Amount</th>
                          <th scope="col">Balance Amount</th>
                          <th scope="col">PassAmt</th>
                          <th scope="col">DR/CR</th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          totalValues.map((element, index) => (

                            <tr key={index}>
                              <td className="p-1 pt-2" style={{ width: "180px" }}>
                                <select id={`location-${index}`} className="form-control ml-0" onChange={(e) => { handlelocation(e, index) }}>
                                  <option value="" hidden>  Select Location   </option>
                                  {locationstate.map((item, index) => (
                                    <option key={index} value={[item.location_name, item.location_id]}>  {item.location_name}  </option>))
                                  }
                                </select>
                              </td>
                              <td className="p-1 pt-2" style={{ width: "180px" }}>
                                <select id={`item-${index}`} className="form-control ml-0" onChange={(e) => { handleChangeItem(e, index) }} >
                                  <option value="" hidden> Select Item </option>
                                  {itemlist.map((items, index) => (
                                    <option key={index} value={`${items.item_name}^${items.glcode}`}> {items.item_name} </option>))
                                  }
                                </select>
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`achead-${index}`} className="form-control" disabled />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`invno-${index}`} className="form-control" disabled />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="date" id={`invdate-${index}`} className="form-control" disabled />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`invamount-${index}`} className="form-control" disabled />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="number" id={`balamt-${index}`} className="form-control " />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="number" id={`passamt-${index}`} className="form-control" onBlur={() => { handlePassAmt(index) }} />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`drcr-${index}`} className="form-control text-uppercase" onBlur={(e) => { handleDrCr(index, e.target.value) }} />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={handleAdd}> Add Item</button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={handleRemove}> Remove</button>
                    <div className="d-flex mb-2 justify-content-between">
                      <div style={{ width: "40%" }}>
                        <div className="form ">
                          <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
                          <div className="d-flex col-md">
                            <textarea type="text" className="form-control " rows="3"
                              id="remarks" placeholder="Remarks" style={{ resize: "none" }}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="rounded py-1 px-2" style={{ width: "50%", background: '#eee' }}>
                        <table className="w-100">
                          <tbody>
                            <tr>
                              <td>Total CR</td>
                              <td id="Subtotal"> <span id="totalcrval">0</span> </td>
                            </tr>
                            <tr>
                              <td> Total DR</td>
                              <td id="Subtotal"> <span id="totaldrval">0</span> </td>
                            </tr>
                            <tr>
                              <td className="text-danger">Difference </td>
                              <td id="Subtotal"> <span id="difference">0</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </form>
                </article>


                <div className="card-footer border-top">
                  <button id="save" name="save" className="btn btn-danger" onClick={handleSubmitJvdata}>Submit</button>
                  {/* <button id="post" name="save" className="btn btn-danger ml-2" onClick={() => { handleSubmit('post') }}>Post</button> */}
                  <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                  {/* <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter"  > Preview JV </button> */}
                </div>

              </div>
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}


        <Footer />

        {/* ############################### Vendor Custom Modal ########################## */}
        <div className="position-absolute" id="SelectVendorModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "93%", display: "none" }} tabIndex="-1" role="dialog" onClick={() => { offCustomModal('SelectVendorModal'); }}>
          <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '55vw' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Select Vendor Name</h5>
              </div>
              <div className="modal-body overflow-auto position-relative p-0" style={{ height: '40vh' }}>

                <table className="table  table-striped h-100 w-100">
                  <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                    <tr>
                    <th className="pl-4 " style={{ fontSize: '20px' }}>Sno</th>
                      <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Vendor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vendorlist.map((vendor, index) =>
                        <tr key={index} className="cursor-pointer" onClick={() => { handleClickVendor(vendor.vend_id, vendor.vend_name) }}>
                          <td className="pl-3 text-center">{index+1}</td>
                          <td className="pl-3 text-center">{vendor.vend_name}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleOpenInvoice}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ###################### Customer Custom Modal ############################### */}
      <div className="position-absolute" id="SelectCustomerModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "93%", display: "none" }} tabIndex="-1" role="dialog" onClick={() => { offCustomModal('SelectCustomerModal'); }}>
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '55vw' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Select Customer Name</h5>
            </div>
            <div className="modal-body overflow-auto position-relative p-0" style={{ height: '40vh' }}>
            <table className="table  table-striped h-100 w-100">
                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                  <tr>
                  <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Sno</th>
                    <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Customer Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    customerlist.map((customer, index) =>
                      <tr key={index} className="cursor-pointer"
                        onClick={() => { handleClickCustomer(customer.cust_id, customer.cust_name) }}
                      >
                       <td className="pl-3 text-center">{index+1}</td>
                        <td className="pl-3 text-center">{customer.cust_name}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleOpenInvoice}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* ############## Bill Custome Modal ################################# */}
      <div className="position-absolute" id="billCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" onClick={() => { offCustomModal('billCustomModal'); }}>
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Select Bill</h5>
            </div>
            <div className="modal-body">
              <table className="table  table-striped table-sm ">
                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                  <tr>
                    <th className="pl-4 text-left" style={{ fontSize: '20px' }}>Bill no</th>
                    <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Bill Date</th>
                    <th className="pl-4 text-right" style={{ fontSize: '20px' }}>Bill Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    vendorBilllist.map((bill, index) =>
                      <tr key={index} className="cursor-pointer" onClick={() => { handleSetBillInvData(bill.vourcher_no, bill.voudate, bill.total_bill_amt) }}>
                        <td className="pl-3 text-left">{bill.vourcher_no}</td>
                        <td className="pl-3 text-center">{bill.voudate}</td>
                        <td className="pl-3 text-right">{bill.total_bill_amt}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('billCustomModal'); }}>Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* ############## Invoice Custome Modal ################################# */}
      <div className="position-absolute" id="InvCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" onClick={() => { offCustomModal('InvCustomModal'); }}>
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Select Invoice</h5>
            </div>
            <div className="modal-body">
              <table className="table table-bored table-sm ">
                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                  <tr>
                    <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice no</th>
                    <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice Date</th>
                    <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    customerInvlist.length > 0 ?
                      customerInvlist.map((inv, index) =>
                        <tr key={index} className="cursor-pointer"
                          onClick={() => { handleSetBillInvData(inv.invoice_no, inv.Invdate, inv.invoice_amt) }} >
                          <td className="pl-3">{inv.invoice_no}</td>
                          <td className="pl-3">{inv.Invdate}</td>
                          <td className="pl-3">{inv.invoice_amt}</td>
                        </tr>
                      )
                      : <tr><td colSpan='3' className="text-center">This Customer have't any invoice</td></tr>
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('InvCustomModal'); }}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JVoucher;
