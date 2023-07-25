import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import SubAddCashPayment from "./SubAddCashPayment";
import { ActiveAllChartofAccount, Getfincialyearid, ActiveCustomer, GetInvoicesByCustomer, ActiveBank, showOrganisation, SearchActiveChartofAccount, ActiveLocationAddress, SearchLocationAddress, ActiveVendor, ActiveEmployee } from '../../../api'
import CashPaymentPreview from './CashPaymentPreview/CashPaymentPreview'

const AddCashPayment = () => {
    const [loading, setLoading] = useState(false);
    const [cashPayMajorData, setCashPayMajorData] = useState({
        cashPayId: '',
        cashPayDate: '',
        refNo: '',
        refDate: '',
        amt: '',
        remarks: '',
        onAccount: false
    })
    const obj = {
        achead: '', glcode: '', vendorId: '', master_id: '', costCenter: '', costCenterName: '', invNo: '', invDate: '', invAmt: '', netamt: '', paytype: '', amtPaid: '', amtbal: '', sub_cost_center: '', sub_cost_centerName: ''
    }
    const [Cashrowdata, setCashrowdata] = useState([obj])
    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [currentindex, setCurrentindex] = useState(0)
    const [customerlist, setCustomerlist] = useState([])
    const [employeelist, setEmployeelist] = useState([])
    const [locationstate, setLocationstate] = useState([]);
    const [cashPayIdCount, setCashPayIdCount] = useState(0)
    const [vendorlist, setVendorlist] = useState([])
    const [orgdata, setOrgdata] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem("Organisation");
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);
            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)

            const emp_list = await ActiveEmployee(org)
            setEmployeelist(emp_list)

            const locatonstateres = await ActiveLocationAddress(org);
            setLocationstate(locatonstateres);
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].cash_payment_count) + 1;
            setCashPayIdCount(lastno)
            setLoading(true)
            document.getElementById('cash_payt_id').value = id[0].cash_payment_ser + id[0].year + String(lastno).padStart(5, '0');
            Todaydate()
        }

        fetchdata();
    }, [])
    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("cash_payt_date").defaultValue = today;
        document.getElementById("ref_date").defaultValue = today;
    };

    const handleAddRow = (e) => {
        e.preventDefault()
        setCashrowdata([...Cashrowdata, obj])
    }

    const handleDeleteRemove = (e, index, deleteType) => {
        e.preventDefault()
        if (Cashrowdata.length > 1) {
            let newarr = [...Cashrowdata];

            if (deleteType === 'pop') {
                newarr.pop()
            }
            else if (deleteType === 'splice') {
                newarr.splice(index, 1)
            }
            setCashrowdata(newarr);
            let totalRefAmt = 0;
            for (let i = 0; i < newarr.length; i++) {
                totalRefAmt = Number(totalRefAmt) + Number(newarr[i].refAmt)
            }
            document.getElementById('total_ref_amt').innerHTML = totalRefAmt

        }
    }

    const handleSetMajorData = () => {
        setCashPayMajorData({
            ...cashPayMajorData,
            cashPayId: document.getElementById('cash_payt_id').value,
            cashPayDate: document.getElementById('cash_payt_date').value,
            refNo: document.getElementById('ref_no').value,
            refDate: document.getElementById('ref_date').value,
            amt: document.getElementById('check_amt').value,
            remarks: document.getElementById('remarks').value,
        })
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

    const handleChangeChartofAcct = async (chartOfAcct, glcode) => {
        let minorData = [...Cashrowdata];
        minorData[currentindex].chart_of_acct = chartOfAcct;
        minorData[currentindex].achead = chartOfAcct;
        minorData[currentindex].glcode = glcode;
        setCashrowdata(minorData)
        if (glcode === '3020001') {
            const org = localStorage.getItem('Organisation')
            const vendors = await ActiveVendor(org)
            setVendorlist(vendors)
            document.getElementById('SelectVendorModal').style.display = 'block'
        }
    }
    const handleClickVendor = async (id, name, mast_id) => {
        let minorData = [...Cashrowdata];
        minorData[currentindex].vendorId = id;
        minorData[currentindex].master_id = mast_id;
        minorData[currentindex].achead = name;
        setCashrowdata(minorData)
        offCustomModal('SelectVendorModal');
    }

    const handlelocation = (location_id, location_name) => {
        let minorData = [...Cashrowdata];
        minorData[currentindex].costCenter = location_id;
        minorData[currentindex].costCenterName = location_name
        setCashrowdata(minorData)
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
    const handleChangeRowData = (e, index) => {
        e.preventDefault();
        let { name, value } = e.target;
        const rowsInput = [...Cashrowdata];
        if (name === 'sub_cost_center') {
            let emp = value.split('^')
            rowsInput[index].sub_cost_center = emp[0]
            rowsInput[index].sub_cost_centerName = emp[1]
        }
        else {
            rowsInput[index][name] = value
        }
        setCashrowdata(rowsInput);
    }
    const offCustomModal = (ids) => {
        document.getElementById(ids).style.display = 'none'
    }

    const handleBlurMethod = (e, index) => {
        let { name, value } = e.target;
        const rowsInput = [...Cashrowdata];
        if (name === 'invAmt') {
            let totalRefAmt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalRefAmt = Number(totalRefAmt) + Number(rowsInput[i].invAmt)
            }
            rowsInput[index][name] = value;
            rowsInput[index].amtPaid = 0
            rowsInput[index].amtbal = rowsInput[index].invAmt
            document.getElementById('total_ref_amt').innerHTML = totalRefAmt
        }
        else if (name === 'netamt') {
            let totalnetamt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalnetamt = Number(totalnetamt) + Number(rowsInput[i].netamt)
            }
            rowsInput[index][name] = value;
            document.getElementById('total_net_amt').innerHTML = totalnetamt
        }
        else if (name === 'paytype') {
            value = value.toUpperCase()
            if (value === 'P') {
                rowsInput[index][name] = value
                rowsInput[index].amtPaid = 0
                rowsInput[index].amtbal = rowsInput[index].invAmt
                document.getElementById(`amtpaid-${index}`).disabled = false
            }
            else if (value === 'F') {
                rowsInput[index][name] = value
                rowsInput[index].amtPaid = rowsInput[index].invAmt
                rowsInput[index].amtbal = 0
                document.getElementById(`amtpaid-${index}`).disabled = true
            }
            else {
                rowsInput[index][name] = ''
            }
        }


        else if (name === 'amtPaid') {
            // let totalrecAmt = 0;
            // for (let i = 0; i < rowsInput.length; i++) {
            //     totalrecAmt = Number(totalrecAmt) + Number(rowsInput[i].amtPaid)
            // }
            rowsInput[index].amtbal = rowsInput[index].invAmt - Number(value)
            // document.getElementById('total_amt_paid').innerHTML = totalrecAmt
            rowsInput[index][name] = value;
        }

        let totalrecAmt = 0;
        for (let i = 0; i < rowsInput.length; i++) {
            totalrecAmt = Number(totalrecAmt) + Number(rowsInput[i].amtPaid)
        }
        document.getElementById('total_amt_paid').innerHTML = totalrecAmt


        setCashrowdata(rowsInput);
    }

    const handleSubmitFormData = () => {
        console.log(cashPayMajorData, Cashrowdata)
    }
    return (<>
        <div className="wrapper position-relative">
            <Header />
            {loading ? (
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h3 className="pt-3 pb-2 pl-5">Add Cash (Payment)</h3>
                        <div className="card">
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row ">
                                        <label htmlFor="cash_payt_id" className="col-md-2 col-form-label font-weight-normal" > Cash Payment Id</label>
                                        <div className="d-flex col-md-4"><input type="text" className="form-control col-md-10" id="cash_payt_id" disabled /></div>
                                        <label htmlFor="cash_payt_date" className="col-md-2 col-form-label font-weight-normal">Cash Payment Date <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="date" className="form-control col-md-10" id="cash_payt_date" disabled /></div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label htmlFor="ref_no" className="col-md-2 col-form-label font-weight-normal">Cheque no/Ref no <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="text" className="form-control col-md-10" id="ref_no" onBlur={handleSetMajorData} /></div>
                                        <label htmlFor="ref_date" className="col-md-2 col-form-label font-weight-normal">Cheque/Ref Date<span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="date" className="form-control col-md-10 " id="ref_date" onBlur={handleSetMajorData} /></div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label htmlFor="check_amt" className="col-md-2 col-form-label font-weight-normal">Amount <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="number" className="form-control col-md-10" id="check_amt" onBlur={handleSetMajorData} /></div>
                                        <label htmlFor="onaccount" className="col-md-2 col-form-label font-weight-normal">on Account <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4 pt-2"> <input type="checkbox" id="onaccount" style={{ width: '20px', height: '20px' }}
                                            onChange={() => { setCashPayMajorData({ ...cashPayMajorData, onAccount: !cashPayMajorData.onAccount }) }}
                                        /></div>
                                    </div>
                                    <div className="w-100 overflow-auto">
                                        <table className="table table-bordered mt-3">
                                            <thead>
                                                <tr>
                                                    <th scope="col">AcHead/GlCode</th>
                                                    <th scope="col">Cost Center</th>
                                                    <th scope="col">InvNo</th>
                                                    <th scope="col">InvDate</th>
                                                    <th scope="col">InvAmt</th>
                                                    <th scope="col">NetAmt</th>
                                                    <th scope="col">PayType</th>
                                                    <th scope="col">AmtPaid</th>
                                                    <th scope="col">AmtBal</th>
                                                    <th scope="col">GlCode</th>
                                                    <th scope="col">Sub CostCentre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <SubAddCashPayment
                                                    Cashrowdata={Cashrowdata}
                                                    setCurrentindex={setCurrentindex}
                                                    handleDeleteRemove={handleDeleteRemove}
                                                    handleChangeRowData={handleChangeRowData}
                                                    handleBlurMethod={handleBlurMethod}
                                                    employeelist={employeelist}

                                                />
                                                <tr>
                                                    <td colSpan='4' className="text-right">Total</td>
                                                    <td id="total_ref_amt">0</td>
                                                    <td id="total_net_amt">0</td>
                                                    <td ></td>
                                                    <td id="total_amt_paid">0</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <input type='button' className="btn btn-primary" onClick={handleAddRow} value='Add Row' />
                                    <input type='button' className="btn btn-danger ml-2" onClick={(e) => handleDeleteRemove(e, 0, 'pop')} value='Remove' />
                                    <div className="d-flex mb-2 justify-content-between">
                                        <div style={{ width: "50%" }}>
                                            <div className="form ">
                                                <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="4"
                                                        id="remarks" placeholder="Remarks" style={{ resize: "none" }}
                                                        onBlur={handleSetMajorData}
                                                    // onClick={handleSetMajorData}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </article>


                            <div className="card-footer border-top">
                                <button id="save" name="save" className="btn btn-danger"
                                    onClick={handleSubmitFormData}
                                >Submit</button>
                                <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                                <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#CashPayPreview"> Payment Preview </button>
                            </div>

                        </div>
                    </div>
                    {

                    }
                </div>
            ) : (
                <LoadingPage />
            )}
            <Footer />
            <CashPaymentPreview orgdata={orgdata} cashPayMajorData={cashPayMajorData} Cashrowdata={Cashrowdata} />
        </div>
        {/* --------------------------- Modal for Chart of Account (Ac Head) ---------------------------- */}

        <div className="modal fade  bd-example-modal-lg" id="chartofaccountmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content " >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Chart of Account</h5>
                        <div className="form-group col-md-5">
                            <input type="text" className='form-control col' placeholder='Search Item' id="searchChartofAcct"
                                onChange={handleSearchChartofAccount}
                            />
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
                                    <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                        onClick={(e) => handleChangeChartofAcct(items.account_sub_name, items.account_sub_name_code)}
                                    >
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
        {/* ###################### Vendor Custom Modal ############################### */}
        <div className="position-absolute" id="SelectVendorModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "120%", display: "none" }} tabIndex="-1" role="dialog" >
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '55vw' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Select Vendor Name</h5>
                    </div>
                    <div className="modal-body overflow-auto position-relative p-0" style={{ height: '40vh' }}>
                        <table className="table  table-striped h-100 w-100">
                            <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                                <tr>
                                    <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Sno</th>
                                    <th className="pl-4 text-center" style={{ fontSize: '20px' }}>Vendor Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vendorlist.map((vendor, index) =>
                                        <tr key={index} className="cursor-pointer"
                                            onClick={() => { handleClickVendor(vendor.vend_id, vendor.vend_name, vendor.mast_id) }}
                                        >
                                            <td className="pl-3 text-center">{index + 1}</td>
                                            <td className="pl-3 text-center">{vendor.vend_name}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* --------------------------- Modal for Location (Cost Center) ---------------------------- */}
        <div className="modal fade  bd-example-modal-lg" id="locationmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content " >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Location</h5>
                        <div className="form-group col-md-5">
                            <input type="text" className='form-control col' placeholder='Search Address' id="searchLocation" onChange={handleSearchLocation} />
                        </div>
                    </div>
                    <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    locationstate.length > 0 ?
                                        locationstate.map((items, index) => (
                                            <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                                onClick={(e) => { handlelocation(items.location_id, items.location_name) }}
                                            >
                                                <td>{items.location_name}</td>
                                                <td style={{ fontSize: "15px" }}>{items.location_add1},{items.location_city},{items.location_country}</td>

                                            </tr>
                                        ))
                                        : <tr><td>Select Customer</td></tr>
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
    </>)
}
export default AddCashPayment;