import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveLocationAddress, ActiveAllChartofAccount, Getfincialyearid, ActiveVendor, GetBillVendorID, ActiveCustomer, GetInvoicesByCustomer, showOrganisation, InsertJV ,ActiveEmployee} from "../../../api/index";
import JvPreview from "./JVPreview/JvPreview";

function JVoucher() {
  const [loading, setLoading] = useState(false);
  const [orgdata, setOrgdata] = useState([])
  const [totalValues, setTotalValues] = useState([1]);
  const [locationstate, setLocationstate] = useState([]);
  const [chartofacctlist, setChartofacctlist] = useState([]);
  const [pocount, setPOcount] = useState(0)
  const [vendorlist, setVendorlist] = useState([])
  const [customerlist, setCustomerlist] = useState([])
  const [customerInvlist, setCustomerInvlist] = useState([])
  const [vendorBilllist, setVendorBilllist] = useState([])
  const [employeelist, setEmployeelist] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [jvminordata, setJvminordata] = useState([
    { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' },
    // { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' },
  ])


  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Organisation");
      const locatonstateres = await ActiveLocationAddress(org);
      setLocationstate(locatonstateres);
      const chartofacct = await ActiveAllChartofAccount(org);
      setChartofacctlist(chartofacct);
      const id = await Getfincialyearid(org)
      const lastno = Number(id[0].jv_count) + 1
      setPOcount(lastno)

      const emp = await ActiveEmployee(org)
      setEmployeelist(emp)

      const result = await showOrganisation(org)
      setOrgdata(result)
      
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
    let obj = { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' }
    jvminordata.push(obj)
  };

  const handleRemove = (e) => {
    e.preventDefault();
    var newvalue = [...totalValues];
    if (newvalue.length === 1) {
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
    jvminordata[index].chartofacct = itemname;
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


  const handleSetBillInvData = (vou_inv_no, vou_inv_date, total_amt, index) => {
    console.log(vou_inv_no, vou_inv_date, total_amt)

    var newvalue = [...totalValues];
    if (index !== 0) {
      if (document.getElementById(`invbillcheck${index}`).checked == true) {
        setTotalValues([...totalValues, 1]);
        let obj = { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' }
        jvminordata.push(obj)

        setTimeout(() => {
          jvminordata[index].bill_no = vou_inv_no;
          jvminordata[index].date = vou_inv_date;
          jvminordata[index].amt = total_amt;
          jvminordata[index].chartofacct = jvminordata[currentIndex].chartofacct;
          jvminordata[index].glcode = jvminordata[currentIndex].glcode;
        }, 1000)

      } else {
        if (newvalue.length === 1) {
          setTotalValues(newvalue);
        } else {
          jvminordata.splice(index, 1);
          newvalue.pop();
          setTotalValues(newvalue);
        }
      }
    } else {
      if (document.getElementById(`invbillcheck${index}`).checked == true) {

        jvminordata[index].bill_no = vou_inv_no;
        jvminordata[index].date = vou_inv_date;
        jvminordata[index].amt = total_amt;
        jvminordata[index].chartofacct = jvminordata[currentIndex].chartofacct;
        jvminordata[index].glcode = jvminordata[currentIndex].glcode;
      }

    }

  }
  const handleProcced = (e) => {
    e.preventDefault();

    console.log(jvminordata)

    jvminordata.map((item, index) => {
      console.log(item, index)
      document.getElementById(`achead-${index}`).value = jvminordata[0].customerName || jvminordata[0].vendorName;
      document.getElementById(`invno-${index}`).value = item.bill_no
      document.getElementById(`invdate-${index}`).value = item.date
      document.getElementById(`invamount-${index}`).value = item.amt

    })

    offCustomModal('billCustomModal');
    offCustomModal('InvCustomModal');
  }

  const handleSubmitJvdata = (e) => {
    e.preventDefault();
    const org = localStorage.getItem("Organisation");
    const jv_no = document.getElementById("jv_no").value;
    const jv_date = document.getElementById("jv_date").value;
    const fin_year = '2023'
    const add_user_name = localStorage.getItem("User_id");
    const Narration = document.getElementById("remarks").value

    console.log(jvminordata)

    jvminordata.forEach(async (item) => {
      const result = await InsertJV(org, jv_no, jv_date, item.locationId, item.glcode, item.chartofacct, item.bill_no, item.date, item.amt, item.passAmt, item.balanceAmt, item.dr_cr, Narration, 'Charge Code', fin_year, add_user_name)
    })


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
                    <div className="form-row mt-2">
                      <label htmlFor="jv_no" className="col-md-2 col-form-label font-weight-normal">  Employee<span className="text-danger">*</span></label>
                      <div className="d-flex col-md-4">
                        <select className="form-control col-md-10 " id="emp">
                          <option value='' hidden>Select Employee</option>
                          {
                            employeelist.map((emp,index)=>
                            <option value={emp.emp_id}>{emp.emp_name}</option>)
                          }
                        </select>
                      </div>
                    </div>
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th scope="col">Location</th>
                          <th scope="col">Items</th>
                          <th scope="col">AcHead</th>
                          <th scope="col">Ref No</th>
                          <th scope="col">Ref Date</th>
                          <th scope="col">Ref Amount</th>
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
                                  <option value="" hidden> {jvminordata[index].chartofacct.length > 0 ? jvminordata[index].chartofacct : "Select Value"} </option>
                                  {chartofacctlist.map((items, index) => (
                                    <option key={index} value={`${items.account_sub_name}^${items.account_sub_name_code}`}> {items.account_sub_name} </option>))
                                  }
                                </select>
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`achead-${index}`} className="form-control" />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`invno-${index}`} className="form-control" />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="date" id={`invdate-${index}`} className="form-control" />
                              </td>
                              <td className="p-1 pt-2" style={{ width: "160px" }}>
                                <input type="text" id={`invamount-${index}`} className="form-control" />
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
                  <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                  <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#JvPreviewModal"  > Preview JV </button>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}


        <Footer />
        <JvPreview orgdata={orgdata} />

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
                          <td className="pl-3 text-center">{index + 1}</td>
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
                        <td className="pl-3 text-center">{index + 1}</td>
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
      <div className="position-absolute" id="billCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Select Bill</h5>
            </div>
            <div className="modal-body">
              <table className="table  table-striped table-sm ">
                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                  <tr>
                    <th className="pl-4 text-left" style={{ fontSize: '20px' }}>Select</th>
                    <th className="pl-4 text-left" style={{ fontSize: '20px' }}>Bill no</th>
                    <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Bill Date</th>
                    <th className="pl-4 text-right" style={{ fontSize: '20px' }}>Bill Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    vendorBilllist.map((bill, index) =>
                      <tr key={index} className="cursor-pointer" >
                        <td className="pl-3"><input type="checkbox" id={`invbillcheck${index}`} onChange={() => { handleSetBillInvData(bill.vourcher_no, bill.voudate, bill.total_bill_amt, index) }} /></td>

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
              <button type="button" className="btn btn-success" onClick={handleProcced}>Procced</button>

            </div>
          </div>
        </div>
      </div>

      {/* ############## Invoice Custome Modal ################################# */}
      <div className="position-absolute" id="InvCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog"
      // onClick={() => { offCustomModal('InvCustomModal'); }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Select Invoice</h5>
            </div>
            <div className="modal-body">
              <table className="table table-bored table-sm ">
                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                  <tr>
                    <th className="pl-4 " style={{ fontSize: '20px' }}>Select</th>
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
                        >
                          <td className="pl-3"><input type="checkbox" id={`invbillcheck${index}`} onChange={() => { handleSetBillInvData(inv.invoice_no, inv.Invdate, inv.invoice_amt, index) }} /></td>
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
              <button type="button" className="btn btn-success" onClick={handleProcced}>Procced</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default JVoucher;
