import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveLocationAddress, ActiveAllChartofAccount, Getfincialyearid, ActiveVendor, GetBillVendorID, ActiveCustomer, GetInvoicesByCustomer, showOrganisation, InsertJV, ActiveEmployee, Updatefinancialcount, SearchLocationAddress, SearchActiveChartofAccount } from "../../../api/index";
import JvPreview from "./JVPreview/JvPreview";
import SubJVoucher from "./SubJVoucher";


function JVoucher() {
  const [loading, setLoading] = useState(false);
  const [orgdata, setOrgdata] = useState([])
  const [jvSerCount, setJvSerCount] = useState()
  const [employeelist, setEmployeelist] = useState([])
  const [vendorlist, setVendorlist] = useState([])
  const [customerlist, setCustomerlist] = useState([])
  const [chartofacctlist, setChartofacctlist] = useState([]);
  const [customerInvlist, setCustomerInvlist] = useState([])
  const [vendorBilllist, setVendorBilllist] = useState([])
  const [currentIndex, setCurrentIndex] = useState()

  const [locationstate, setLocationstate] = useState([]);
  const minorJVObj = { accHead: '', glcode: '', subAccHead: '', subGlCode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', masterId: '', locationId: '', locationName: '', ref_no: '', ref_date: '', ref_amt: '', balanceAmt: '', passAmt: '', dr_cr: '' }

  const [JVMinorData, setJVMinorData] = useState([minorJVObj])
  const [selectedInvoiceData, setSelectedInvoiceData] = useState([])
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState([])
  const [selectedBillData, setSelectedBillData] = useState([])
  const [selectedBillIndex, setSelectedBillIndex] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Organisation");
      const emp = await ActiveEmployee(org)
      setEmployeelist(emp)
      const chartofacct = await ActiveAllChartofAccount(org);
      setChartofacctlist(chartofacct);

      const locatonstateres = await ActiveLocationAddress(org);
      setLocationstate(locatonstateres);

      const id = await Getfincialyearid(org)
      const lastno = Number(id[0].jv_count) + 1

      setJvSerCount(lastno)

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
    setJVMinorData([...JVMinorData, minorJVObj])
  };


  const handleDeleteRemove = (e, deleteType, index) => {
    e.preventDefault()
    if (JVMinorData.length > 1) {
      let newarr = [...JVMinorData];
      if (deleteType === 'pop') {
        newarr.pop()
      }
      else if (deleteType === 'splice') {
        newarr.splice(index, 1)
      }
      setJVMinorData(newarr);

      let sumOnlyDrPassamt = 0;
      let sumOnlyCrPassamt = 0;

      newarr.map((dndata) => {
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

  const handleChangeRowData = (e, index) => {
    e.preventDefault();
    let { name, value } = e.target;
    const rowsInput = [...JVMinorData];
    rowsInput[index][name] = value
    setJVMinorData(rowsInput);
  }

  const offCustomModal = (ids) => {
    document.getElementById(ids).style.display = 'none'
  }
  const handleDrCr = (index, val) => {
    if (val !== 'DR' && val !== 'dr' && val !== 'CR' && val !== 'cr') {
      document.getElementById(`drcr-${index}`).value = ''
    }
    else {
      JVMinorData[index].dr_cr = val;
      document.getElementById(`drcr-${index}`).value = val
      handleCalculate(index)
    }
  }

  const handleChangeItem = async (account_sub_name, account_sub_name_code) => {
    setLoading(false)

    JVMinorData[currentIndex].accHead = account_sub_name;
    JVMinorData[currentIndex].glcode = account_sub_name_code;
    setLoading(true)
    const org = localStorage.getItem('Organisation')
    if (account_sub_name_code == '3020001') {
      const vendors = await ActiveVendor(org)
      setVendorlist(vendors)
      document.getElementById('SelectVendorModal').style.display = 'block'
    }
    else if (account_sub_name_code == '5020001') {
      const customers = await ActiveCustomer(org)
      setCustomerlist(customers)
      document.getElementById('SelectCustomerModal').style.display = 'block'
    }

  }

  const handlelocation = (e, id, address, city, country) => {
    e.preventDefault()
    let location = address + ' , ' + ' , ' + city + ' , ' + country
    const minorData = [...JVMinorData]
    minorData[currentIndex].locationId = id;
    minorData[currentIndex].locationName = location
    setJVMinorData(minorData)
  }

  const handleSearchLocation = async (e) => {
    const org = localStorage.getItem('Organisation');
    if (e.target.value.length > 2) {
      const getLocation = await SearchLocationAddress(org, e.target.value);
      setLocationstate(getLocation)
    }
    else if (e.target.value.length === 0) {
      const locatonstateres = await ActiveLocationAddress(org)
      setLocationstate(locatonstateres)
    }
  }
  const handleSearchChartofAccount = async (e) => {
    const org = localStorage.getItem('Organisation');
    if (e.target.value.length > 2) {
      const chartofacct = await SearchActiveChartofAccount(org, e.target.value);
      setChartofacctlist(chartofacct)
    }
    else if (e.target.value.length === 0) {
      const chartofacct = await ActiveAllChartofAccount(org)
      setChartofacctlist(chartofacct)
    }
  }

  const handleClickCustomer = async (modeltype, id, name, mast_id) => {
    const onAccount = document.getElementById('onaccount').checked === true ? true : false
    if (!onAccount) {
      if (modeltype === 'customer') {
        const invoices = await GetInvoicesByCustomer(localStorage.getItem('Organisation'), id)
        setCustomerInvlist(invoices)
        offCustomModal('SelectCustomerModal');
        document.getElementById('InvCustomModal').style.display = "block"
        JVMinorData[currentIndex].customerId = id;
      }
      else if (modeltype === 'vendor') {
        const bills = await GetBillVendorID(localStorage.getItem('Organisation'), id)
        setVendorBilllist(bills)
        offCustomModal('SelectVendorModal');
        document.getElementById('billCustomModal').style.display = "block"
        JVMinorData[currentIndex].vendorId = id;
      }
    }
    else {
      offCustomModal('SelectCustomerModal');
      offCustomModal('SelectVendorModal');
    }
    JVMinorData[currentIndex].masterId = mast_id;
    JVMinorData[currentIndex].accHead = name;
  }

  const handleSetInvoiceData = (index, inv_no, inv_date, inv_amt, locationid, location_name) => {
    const getcheckval =
      document.getElementById(`invcheck-${index}`).checked === true ? true : false;

    if (getcheckval) {
      setSelectedInvoiceData([...selectedInvoiceData,
      {
        accHead: JVMinorData[currentIndex].accHead, glcode: JVMinorData[currentIndex].glcode, subAccHead: JVMinorData[currentIndex].subAccHead,
        subGlCode: JVMinorData[currentIndex].subGlCode,
        vendorId: JVMinorData[currentIndex].vendorId, customerId: JVMinorData[currentIndex].customerId,
        masterId: JVMinorData[currentIndex].masterId,
        locationId: locationid, locationName: location_name, ref_no: inv_no, ref_date: inv_date, ref_amt: inv_amt, balanceAmt: '', passAmt: '', dr_cr: ''
      }
      ]);
      setSelectedInvoiceIndex([...selectedInvoiceIndex, index]);
    }
    else {
      const inexvno = selectedInvoiceIndex.indexOf(index);

      if (inexvno > -1) {
        selectedInvoiceIndex.splice(inexvno, 1);
        selectedInvoiceData.splice(inexvno, 1);
      }
    }

  }


  const handleSetBillData = (index, bill_no, bill_date, bill_amt, location) => {
    const getcheckval =
      document.getElementById(`billcheck-${index}`).checked === true ? true : false;

    if (getcheckval) {
      setSelectedBillData([...selectedBillData,
      {
        accHead: JVMinorData[currentIndex].accHead, glcode: JVMinorData[currentIndex].glcode, subAccHead: JVMinorData[currentIndex].subAccHead,
        subGlCode: JVMinorData[currentIndex].subGlCode,
        vendorId: JVMinorData[currentIndex].vendorId, customerId: JVMinorData[currentIndex].customerId,
        masterId: JVMinorData[currentIndex].masterId,
        locationId: location, locationName: location, ref_no: bill_no, ref_date: bill_date, ref_amt: bill_amt, balanceAmt: '', passAmt: '', dr_cr: ''
      }
      ]);
      setSelectedBillIndex([...selectedBillIndex, index]);
    }
    else {
      const inexvno = selectedBillIndex.indexOf(index);

      if (inexvno > -1) {
        selectedBillIndex.splice(inexvno, 1);
        selectedBillData.splice(inexvno, 1);
      }
    }

  }

  const handleMergeInvoiceBillArry = (modalType) => {
    const rowsInput = [...JVMinorData];
    rowsInput.pop()
    let newRowData;
    if (modalType === 'bill') {
      newRowData = [...rowsInput, ...selectedBillData]
      setSelectedBillIndex([]);
      setSelectedBillData([]);
      offCustomModal('billCustomModal')
    }
    else if (modalType === 'invoice') {
      newRowData = [...rowsInput, ...selectedInvoiceData]
      setSelectedInvoiceIndex([]);
      setSelectedInvoiceData([]);
      offCustomModal('InvCustomModal')
    }

    setJVMinorData(newRowData)

    setTimeout(() => {
      for (let i = currentIndex; i < newRowData.length; i++) {
        document.getElementById(`location-${i}`).disabled = true
        document.getElementById(`ref_no-${i}`).disabled = true
        document.getElementById(`ref_date-${i}`).disabled = true
        document.getElementById(`ref_amt-${i}`).disabled = true
      }
    }, 1000)

  }

  const handlePassAmt = (e, index) => {
    e.preventDefault();
    const passAmt = document.getElementById(`passAmt-${index}`).value
    JVMinorData[index].passAmt = passAmt
    const balAmt = Number(JVMinorData[index].ref_amt) - Number(passAmt)
    JVMinorData[index].balanceAmt = balAmt
    document.getElementById(`balanaceAmt-${index}`).value = balAmt
    handleCalculate(index)
  }
  const handleCalculate = (index) => {
    const cr_dr_type = JVMinorData[index].dr_cr;
    if (cr_dr_type) {
      let sumOnlyDrPassamt = 0;
      let sumOnlyCrPassamt = 0;

      JVMinorData.map((dndata) => {
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



  const handleSubmitJvdata = async (e) => {
    e.preventDefault();
    console.log(JVMinorData)
    return 0
    const difference = document.getElementById(`difference`).innerHTML
    if (difference != '0') {
      alert('Difference between DR and CR is not 0')
    }
    else {
      // const org = localStorage.getItem("Organisation");
      // const jv_no = document.getElementById("jv_no").value;
      // const jv_date = document.getElementById("jv_date").value;
      // const fin_year = '2023'
      // const add_user_name = localStorage.getItem("User_id");
      // const Narration = document.getElementById("remarks").value


      // jvminordata.forEach(async (item) => {
      //   const result = await InsertJV(org, jv_no, jv_date, item.locationId, item.glcode, item.chartofacct, item.bill_no, item.date, item.amt, item.passAmt, item.balanceAmt, item.dr_cr, Narration, 'Charge Code', fin_year, add_user_name)
      // })
      await Updatefinancialcount(localStorage.getItem('Organisation'), 'jv_count', jvSerCount)
    }

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
                      <label htmlFor="jv_no" className="col-md-2 col-form-label font-weight-normal">  JV ID <span className="text-danger">*</span></label>
                      <div className="d-flex col-md-4">
                        <input type="text" className="form-control col-md-10 " id="jv_no" disabled />
                      </div>
                      <label htmlFor="jv_date" className="col-md-2 col-form-label font-weight-normal" > JV Date <span className="text-danger">*</span></label>
                      <div className="d-flex col-md-4">
                        <input type="date" className="form-control col-md-10" id="jv_date" />
                      </div>
                    </div>

                    <div className="form-row mt-2">
                      <label htmlFor="emp" className="col-md-2 col-form-label font-weight-normal">  Employee<span className="text-danger">*</span></label>
                      <div className="d-flex col-md-4">
                        <select className="form-control col-md-10 " id="emp">
                          <option value='' hidden>Select Employee</option>
                          {
                            employeelist.map((emp, index) =>
                              <option key={index} value={emp.emp_id}>{emp.emp_name}</option>)
                          }
                        </select>
                      </div>
                      <label htmlFor="onaccount" className="col-md-2 col-form-label font-weight-normal">  On Account </label>
                      <div className="d-flex pt-2 col-md-4 ">
                        <input type="checkbox" style={{ height: '18px', width: '18px' }} id="onaccount" />
                      </div>
                    </div>
                    <div className="form-row mt-3 w-100 overflow-auto">
                      <table className="table table-bordered ">
                        <thead>
                          <tr>
                            <th scope="col">AccHead</th>
                            <th scope="col">Location</th>
                            <th scope="col">Ref No</th>
                            <th scope="col">Ref Date</th>
                            <th scope="col">Ref Amount</th>
                            <th scope="col">PassAmt</th>
                            <th scope="col">Balance Amount</th>
                            <th scope="col">DR/CR</th>
                            <th scope="col">Sub AccHead</th>
                          </tr>
                        </thead>
                        <tbody>
                          <SubJVoucher
                            JVMinorData={JVMinorData}
                            locationstate={locationstate}
                            handleDeleteRemove={handleDeleteRemove}
                            chartofacctlist={chartofacctlist}
                            handleChangeRowData={handleChangeRowData}
                            handleDrCr={handleDrCr}
                            handleChangeItem={handleChangeItem}
                            setCurrentIndex={setCurrentIndex}
                            handlelocation={handlelocation}
                            handlePassAmt={handlePassAmt}
                          />
                        </tbody>
                      </table>
                    </div>
                    <input type='button' className="btn btn-primary" onClick={handleAdd} value='Add Row' />
                    <input type='button' className="btn btn-danger ml-2" onClick={(e) => handleDeleteRemove(e, 'pop')} value='Remove' />
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
                        <tr key={index} className="cursor-pointer"
                          onClick={() => { handleClickCustomer('vendor', vendor.vend_id, vendor.vend_name, vendor.mast_id) }}
                        >
                          <td className="pl-3 text-center">{index + 1}</td>
                          <td className="pl-3 text-center">{vendor.vend_name}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                // onClick={handleOpenInvoice}
                >Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ########################## modal Chart Of Account  Start ######################## */}
      <div className="modal fade  bd-example-modal-lg" id="chartofaccountmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content " >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Chart of Account</h5>
              <div className="form-group col-md-5">
                <input type="text" className='form-control col' placeholder='Search Item' id="searchChartofAcct" onChange={handleSearchChartofAccount} />
              </div>
            </div>
            <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '50vh' }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>

                  {chartofacctlist.map((items, index) => (
                    <tr key={index} className="cursor-pointer py-0" data-dismiss="modal" onClick={(e) => handleChangeItem(items.account_sub_name, items.account_sub_name_code)}>
                      <td>{index + 1}</td>
                      <td style={{ fontSize: "15px" }}>{items.account_sub_name}</td>

                    </tr>))
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* ########################### modal Chart Of Account End ################################################# */}

      {/* ########################## modal Location  Start ################################ */}
      <div className="modal fade  bd-example-modal-lg" id="locationmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content " >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Location</h5>
              <div className="form-group col-md-5">
                <input type="text" className='form-control col' placeholder='Search Address' id="searchLocation"
                  onChange={handleSearchLocation}
                />
              </div>
            </div>
            <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>City </th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    locationstate.length > 0 ?
                      locationstate.map((items, index) => (
                        <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                          onClick={(e) => { handlelocation(e, items.location_id, items.location_add1, items.location_city, items.location_country) }}

                        >
                          <td>{items.location_city}</td>
                          <td style={{ fontSize: "15px" }}>{items.location_add1},{items.location_city},{items.location_country}</td>

                        </tr>
                      ))
                      : 'Select Customer'
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* modal Location  End*/}

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
                        onClick={() => { handleClickCustomer('customer', customer.cust_id, customer.cust_name, customer.mast_id) }}
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
              <button type="button" className="btn btn-secondary"
              //  onClick={handleOpenInvoice}
              >Close</button>
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
                        <td className="pl-3"><input type="checkbox" id={`billcheck-${index}`}
                          onChange={() => { handleSetBillData(index, bill.vourcher_no, bill.voudate, bill.total_bill_amt, bill.location) }}
                        /></td>

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
              <button type="button" className="btn btn-secondary"
                onClick={() => { offCustomModal('billCustomModal'); }}
              >Close</button>
              <button type="button" className="btn btn-success"
                onClick={() => handleMergeInvoiceBillArry('bill')}
              >Procced</button>

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
                          <td className="pl-3"><input type="checkbox" id={`invcheck-${index}`}
                            onChange={() => { handleSetInvoiceData(index, inv.invoice_no, inv.Invdate, inv.invoice_amt, inv.location, inv.location_name) }}
                          /></td>
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
              <button type="button" className="btn btn-secondary"
                onClick={() => { offCustomModal('InvCustomModal'); }}
              >Close</button>
              <button type="button" className="btn btn-success"
                onClick={() => handleMergeInvoiceBillArry('invoice')}
              >Procced</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default JVoucher;





































// function JVoucher() {
//   const [loading, setLoading] = useState(false);
//   const [orgdata, setOrgdata] = useState([])
//   const [totalValues, setTotalValues] = useState([1]);
//   const [locationstate, setLocationstate] = useState([]);
//   const [chartofacctlist, setChartofacctlist] = useState([]);
//   const [pocount, setPOcount] = useState(0)
//   const [vendorlist, setVendorlist] = useState([])
//   const [customerlist, setCustomerlist] = useState([])
//   const [customerInvlist, setCustomerInvlist] = useState([])
//   const [vendorBilllist, setVendorBilllist] = useState([])
//   const [employeelist, setEmployeelist] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const [jvminordata, setJvminordata] = useState([
//     { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' },
//     // { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' },
//   ])


//   useEffect(() => {
//     const fetchdata = async () => {
//       const org = localStorage.getItem("Organisation");
//       const locatonstateres = await ActiveLocationAddress(org);
//       setLocationstate(locatonstateres);
//       const chartofacct = await ActiveAllChartofAccount(org);
//       setChartofacctlist(chartofacct);
//       const id = await Getfincialyearid(org)
//       const lastno = Number(id[0].jv_count) + 1
//       setPOcount(lastno)

//       const emp = await ActiveEmployee(org)
//       setEmployeelist(emp)

//       const result = await showOrganisation(org)
//       setOrgdata(result)

//       setLoading(true)
//       document.getElementById('jv_no').value = id[0].jv_ser + id[0].year + String(lastno).padStart(5, '0')
//       Todaydate();
//     };
//     fetchdata();
//   }, []);

//   const Todaydate = () => {
//     var date = new Date();
//     var day = date.getDate();
//     var month = date.getMonth() + 1;
//     var year = date.getFullYear();
//     if (month < 10) month = "0" + month;
//     if (day < 10) day = "0" + day;
//     var today = year + "-" + month + "-" + day;
//     document.getElementById("jv_date").defaultValue = today;
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     setTotalValues([...totalValues, 1]);
//     let obj = { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' }
//     jvminordata.push(obj)
//   };

//   const handleRemove = (e) => {
//     e.preventDefault();
//     var newvalue = [...totalValues];
//     if (newvalue.length === 1) {
//       setTotalValues(newvalue);
//     }
//     else {
//       jvminordata.pop();
//       newvalue.pop();
//       setTotalValues(newvalue);
//     }
//   };

//   const handlelocation = (e, index) => {
//     let val = e.target.value;
//     let loca_arr = val.split(',')

//     jvminordata[index].locationId = loca_arr[1];
//     jvminordata[index].locationName = loca_arr[0];
//   }
//   const handleChangeItem = async (e, index) => {
//     e.preventDefault();
//     setLoading(false)
//     let val = e.target.value;
//     console.log(val)
//     let item_arr = val.split('^')
//     const itemname = item_arr[0]
//     const glcode = item_arr[1]

//     setCurrentIndex(index)
//     jvminordata[index].chartofacct = itemname;
//     jvminordata[index].glcode = glcode;
//     setLoading(true)
//     const org = localStorage.getItem('Organisation')
//     if (glcode == '3020001') {
//       const vendors = await ActiveVendor(org)
//       setVendorlist(vendors)
//       document.getElementById('SelectVendorModal').style.display = 'block'
//     }
//     else if (glcode == '5020001') {
//       const customers = await ActiveCustomer(org)
//       setCustomerlist(customers)
//       document.getElementById('SelectCustomerModal').style.display = 'block'
//     }

//   }

//   const handleOpenInvoice = (e) => {
//     e.preventDefault()
//     offCustomModal('SelectVendorModal')
//   }

//   const offCustomModal = (ids) => {
//     document.getElementById(ids).style.display = 'none'
//   }


//   const handleClickVendor = async (vendor_id, vendor_name) => {
//     const bills = await GetBillVendorID(localStorage.getItem('Organisation'), vendor_id)
//     setVendorBilllist(bills)
//     offCustomModal('SelectVendorModal');
//     document.getElementById('billCustomModal').style.display = "block"
//     jvminordata[currentIndex].vendorId = vendor_id;
//     jvminordata[currentIndex].vendorName = vendor_name;
//   }


//   const handleClickCustomer = async (customer_id, customer_name) => {
//     const invoices = await GetInvoicesByCustomer(localStorage.getItem('Organisation'), customer_id)
//     setCustomerInvlist(invoices)
//     offCustomModal('SelectCustomerModal');
//     document.getElementById('InvCustomModal').style.display = "block"
//     jvminordata[currentIndex].customerId = customer_id;
//     jvminordata[currentIndex].customerName = customer_name;
//   }

//   const handlePassAmt = (index) => {
//     jvminordata[index].passAmt = document.getElementById(`passamt-${index}`).value
//     handleCalculate(index)
//   }
//   const handleDrCr = (index, val) => {
//     if (val !== 'DR' && val !== 'dr' && val !== 'CR' && val !== 'cr') {
//       document.getElementById(`drcr-${index}`).value = ''
//     }
//     else {
//       jvminordata[index].dr_cr = val;
//       handleCalculate(index)
//     }
//   }

//   const handleCalculate = (index) => {
//     const cr_dr_type = jvminordata[index].dr_cr;
//     if (cr_dr_type) {
//       let sumOnlyDrPassamt = 0;
//       let sumOnlyCrPassamt = 0;

//       jvminordata.map((dndata) => {
//         if (dndata.dr_cr === 'dr' || dndata.dr_cr === 'DR') {
//           sumOnlyDrPassamt = sumOnlyDrPassamt + Number(dndata.passAmt)
//         }
//         else if (dndata.dr_cr === 'cr' || dndata.dr_cr === 'CR') {
//           sumOnlyCrPassamt = sumOnlyCrPassamt + Number(dndata.passAmt)
//         }
//       })
//       document.getElementById(`totalcrval`).innerHTML = sumOnlyCrPassamt || 0
//       document.getElementById(`totaldrval`).innerHTML = sumOnlyDrPassamt || 0
//       document.getElementById(`difference`).innerHTML = Math.abs(sumOnlyCrPassamt - sumOnlyDrPassamt)
//     }
//   }


//   const handleSetBillInvData = (vou_inv_no, vou_inv_date, total_amt, index) => {
//     console.log(vou_inv_no, vou_inv_date, total_amt)

//     var newvalue = [...totalValues];
//     if (index !== 0) {
//       if (document.getElementById(`invbillcheck${index}`).checked == true) {
//         setTotalValues([...totalValues, 1]);
//         let obj = { locationId: '', locationName: '', chartofacct: '', glcode: '', vendorName: '', vendorId: '', customerName: '', customerId: '', bill_no: '', date: '', amt: '', balanceAmt: '', passAmt: '', dr_cr: '' }
//         jvminordata.push(obj)

//         setTimeout(() => {
//           jvminordata[index].bill_no = vou_inv_no;
//           jvminordata[index].date = vou_inv_date;
//           jvminordata[index].amt = total_amt;
//           jvminordata[index].chartofacct = jvminordata[currentIndex].chartofacct;
//           jvminordata[index].glcode = jvminordata[currentIndex].glcode;
//         }, 1000)

//       } else {
//         if (newvalue.length === 1) {
//           setTotalValues(newvalue);
//         } else {
//           jvminordata.splice(index, 1);
//           newvalue.pop();
//           setTotalValues(newvalue);
//         }
//       }
//     } else {
//       if (document.getElementById(`invbillcheck${index}`).checked == true) {

//         jvminordata[index].bill_no = vou_inv_no;
//         jvminordata[index].date = vou_inv_date;
//         jvminordata[index].amt = total_amt;
//         jvminordata[index].chartofacct = jvminordata[currentIndex].chartofacct;
//         jvminordata[index].glcode = jvminordata[currentIndex].glcode;
//       }

//     }

//   }
//   const handleProcced = (e) => {
//     e.preventDefault();
//     jvminordata.map((item, index) => {
//       console.log(item, index)
//       document.getElementById(`achead-${index}`).value = jvminordata[0].customerName || jvminordata[0].vendorName;
//       document.getElementById(`invno-${index}`).value = item.bill_no
//       document.getElementById(`invdate-${index}`).value = item.date
//       document.getElementById(`invamount-${index}`).value = item.amt

//     })

//     offCustomModal('billCustomModal');
//     offCustomModal('InvCustomModal');
//   }

//   const handleSubmitJvdata = (e) => {
//     e.preventDefault();
//     const org = localStorage.getItem("Organisation");
//     const jv_no = document.getElementById("jv_no").value;
//     const jv_date = document.getElementById("jv_date").value;
//     const fin_year = '2023'
//     const add_user_name = localStorage.getItem("User_id");
//     const Narration = document.getElementById("remarks").value

//     console.log(jvminordata)

//     jvminordata.forEach(async (item) => {
//       const result = await InsertJV(org, jv_no, jv_date, item.locationId, item.glcode, item.chartofacct, item.bill_no, item.date, item.amt, item.passAmt, item.balanceAmt, item.dr_cr, Narration, 'Charge Code', fin_year, add_user_name)
//     })


//   }
//   return (
//     <>
//       <div className="wrapper position-relative">
//         <Header />
//         {loading ? (
//           <div className="content-wrapper">
//             <div className="container-fluid">
//               <h3 className="pt-3 pb-2 pl-5"> New Journal Voucher</h3>
//               <div className="card">
//                 <article className="card-body">
//                   <form autoComplete="off">

//                     <div className="form-row ">
//                       <label htmlFor="jv_no" className="col-md-2 col-form-label font-weight-normal">  JV ID <span className="text-danger">*</span></label>
//                       <div className="d-flex col-md-4">
//                         <input type="text" className="form-control col-md-10 " id="jv_no" disabled />
//                       </div>
//                       <label htmlFor="jv_date" className="col-md-2 col-form-label font-weight-normal" > JV Date <span className="text-danger">*</span></label>
//                       <div className="d-flex col-md-4">
//                         <input type="date" className="form-control col-md-10" id="jv_date" />
//                       </div>
//                     </div>

//                     <div className="form-row mt-2">
//                       <label htmlFor="emp" className="col-md-2 col-form-label font-weight-normal">  Employee<span className="text-danger">*</span></label>
//                       <div className="d-flex col-md-4">
//                         <select className="form-control col-md-10 " id="emp">
//                           <option value='' hidden>Select Employee</option>
//                           {
//                             employeelist.map((emp, index) =>
//                               <option value={emp.emp_id}>{emp.emp_name}</option>)
//                           }
//                         </select>
//                       </div>
//                       <label htmlFor="onaccount" className="col-md-2 col-form-label font-weight-normal">  On Account </label>
//                       <div className="d-flex pt-2 col-md-4 ">
//                         <input type="checkbox" style={{ height: '18px', width: '18px' }} id="onaccount" />
//                       </div>
//                     </div>
//                     <div className="form-row mt-3 w-100 overflow-auto">
//                       <table className="table table-bordered ">
//                         <thead>
//                           <tr>
//                             <th scope="col">Items</th>
//                             <th scope="col">Location</th>
//                             <th scope="col">AcHead</th>
//                             <th scope="col">Ref No</th>
//                             <th scope="col">Ref Date</th>
//                             <th scope="col">Ref Amount</th>
//                             <th scope="col">Balance Amount</th>
//                             <th scope="col">PassAmt</th>
//                             <th scope="col">DR/CR</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <SubJVoucher totalValues={totalValues}
//                           locationstate={locationstate}
//                           handlelocation={handlelocation}
//                           handleChangeItem={handleChangeItem}
//                           handlePassAmt={handlePassAmt}
//                           handleDrCr={handleDrCr}
//                           jvminordata={jvminordata}
//                           chartofacctlist={chartofacctlist}
//                           />
//                         </tbody>
//                       </table>
//                     </div>
//                     <input type='button' className="btn btn-primary" onClick={handleAdd} value='Add Row' />
//                     <input type='button' className="btn btn-danger ml-2" onClick={handleRemove} value='Remove' />
//                     <div className="d-flex mb-2 justify-content-between">
//                       <div style={{ width: "40%" }}>
//                         <div className="form ">
//                           <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
//                           <div className="d-flex col-md">
//                             <textarea type="text" className="form-control " rows="3"
//                               id="remarks" placeholder="Remarks" style={{ resize: "none" }}></textarea>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="rounded py-1 px-2" style={{ width: "50%", background: '#eee' }}>
//                         <table className="w-100">
//                           <tbody>
//                             <tr>
//                               <td>Total CR</td>
//                               <td id="Subtotal"> <span id="totalcrval">0</span> </td>
//                             </tr>
//                             <tr>
//                               <td> Total DR</td>
//                               <td id="Subtotal"> <span id="totaldrval">0</span> </td>
//                             </tr>
//                             <tr>
//                               <td className="text-danger">Difference </td>
//                               <td id="Subtotal"> <span id="difference">0</span></td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </form>
//                 </article>


//                 <div className="card-footer border-top">
//                   <button id="save" name="save" className="btn btn-danger" onClick={handleSubmitJvdata}>Submit</button>
//                   <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
//                   <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#JvPreviewModal"  > Preview JV </button>
//                 </div>

//               </div>
//             </div>
//           </div>
//         ) : (
//           <LoadingPage />
//         )}


//         <Footer />
//         <JvPreview orgdata={orgdata} />

//         {/* ############################### Vendor Custom Modal ########################## */}
//         <div className="position-absolute" id="SelectVendorModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "93%", display: "none" }} tabIndex="-1" role="dialog" onClick={() => { offCustomModal('SelectVendorModal'); }}>
//           <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '55vw' }}>
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLongTitle">Select Vendor Name</h5>
//               </div>
//               <div className="modal-body overflow-auto position-relative p-0" style={{ height: '40vh' }}>

//                 <table className="table  table-striped h-100 w-100">
//                   <thead className="position-sticky bg-white  " style={{ top: '0' }}>
//                     <tr>
//                       <th className="pl-4 " style={{ fontSize: '20px' }}>Sno</th>
//                       <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Vendor Name</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       vendorlist.map((vendor, index) =>
//                         <tr key={index} className="cursor-pointer" onClick={() => { handleClickVendor(vendor.vend_id, vendor.vend_name) }}>
//                           <td className="pl-3 text-center">{index + 1}</td>
//                           <td className="pl-3 text-center">{vendor.vend_name}</td>
//                         </tr>
//                       )
//                     }
//                   </tbody>
//                 </table>

//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleOpenInvoice}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ###################### Customer Custom Modal ############################### */}
//       <div className="position-absolute" id="SelectCustomerModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "93%", display: "none" }} tabIndex="-1" role="dialog" onClick={() => { offCustomModal('SelectCustomerModal'); }}>
//         <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '55vw' }}>
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLongTitle">Select Customer Name</h5>
//             </div>
//             <div className="modal-body overflow-auto position-relative p-0" style={{ height: '40vh' }}>
//               <table className="table  table-striped h-100 w-100">
//                 <thead className="position-sticky bg-white  " style={{ top: '0' }}>
//                   <tr>
//                     <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Sno</th>
//                     <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Customer Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     customerlist.map((customer, index) =>
//                       <tr key={index} className="cursor-pointer"
//                         onClick={() => { handleClickCustomer(customer.cust_id, customer.cust_name) }}
//                       >
//                         <td className="pl-3 text-center">{index + 1}</td>
//                         <td className="pl-3 text-center">{customer.cust_name}</td>
//                       </tr>
//                     )
//                   }
//                 </tbody>
//               </table>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={handleOpenInvoice}>Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ############## Bill Custome Modal ################################# */}
//       <div className="position-absolute" id="billCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" >
//         <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLongTitle">Select Bill</h5>
//             </div>
//             <div className="modal-body">
//               <table className="table  table-striped table-sm ">
//                 <thead className="position-sticky bg-white  " style={{ top: '0' }}>
//                   <tr>
//                     <th className="pl-4 text-left" style={{ fontSize: '20px' }}>Select</th>
//                     <th className="pl-4 text-left" style={{ fontSize: '20px' }}>Bill no</th>
//                     <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Bill Date</th>
//                     <th className="pl-4 text-right" style={{ fontSize: '20px' }}>Bill Amt</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     vendorBilllist.map((bill, index) =>
//                       <tr key={index} className="cursor-pointer" >
//                         <td className="pl-3"><input type="checkbox" id={`invbillcheck${index}`} onChange={() => { handleSetBillInvData(bill.vourcher_no, bill.voudate, bill.total_bill_amt, index) }} /></td>

//                         <td className="pl-3 text-left">{bill.vourcher_no}</td>
//                         <td className="pl-3 text-center">{bill.voudate}</td>
//                         <td className="pl-3 text-right">{bill.total_bill_amt}</td>
//                       </tr>
//                     )
//                   }
//                 </tbody>
//               </table>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('billCustomModal'); }}>Close</button>
//               <button type="button" className="btn btn-success" onClick={handleProcced}>Procced</button>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ############## Invoice Custome Modal ################################# */}
//       <div className="position-absolute" id="InvCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog"
//       // onClick={() => { offCustomModal('InvCustomModal'); }}
//       >
//         <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLongTitle">Select Invoice</h5>
//             </div>
//             <div className="modal-body">
//               <table className="table table-bored table-sm ">
//                 <thead className="position-sticky bg-white  " style={{ top: '0' }}>
//                   <tr>
//                     <th className="pl-4 " style={{ fontSize: '20px' }}>Select</th>
//                     <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice no</th>
//                     <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice Date</th>
//                     <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice Amt</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     customerInvlist.length > 0 ?
//                       customerInvlist.map((inv, index) =>
//                         <tr key={index} className="cursor-pointer"
//                         >
//                           <td className="pl-3"><input type="checkbox" id={`invbillcheck${index}`} onChange={() => { handleSetBillInvData(inv.invoice_no, inv.Invdate, inv.invoice_amt, index) }} /></td>
//                           <td className="pl-3">{inv.invoice_no}</td>
//                           <td className="pl-3">{inv.Invdate}</td>
//                           <td className="pl-3">{inv.invoice_amt}</td>
//                         </tr>
//                       )
//                       : <tr><td colSpan='3' className="text-center">This Customer have't any invoice</td></tr>
//                   }
//                 </tbody>
//               </table>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('InvCustomModal'); }}>Close</button>
//               <button type="button" className="btn btn-success" onClick={handleProcced}>Procced</button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default JVoucher;
