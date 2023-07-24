import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveAllChartofAccount, Getfincialyearid, ActiveCustomer, GetInvoicesByCustomer, ActiveBank, showOrganisation, SearchActiveChartofAccount, ActiveLocationAddress, SearchLocationAddress } from '../../../api'
import SubAddBankRec from './SubAddBankRec'
import BankRecepPreview from "./BankRecepPreview/BankRecepPreview";
import AlertsComp from '../../AlertsComp';


function AddBankingReceipt() {
    const [loading, setLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [orgdata, setOrgdata] = useState([])
    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [banklist, setBanklist] = useState([])
    const [customerlist, setCustomerlist] = useState([])
    const [customerInvlist, setCustomerInvlist] = useState([])
    const [currentindex, setCurrentindex] = useState(0)
    const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState([])
    const [selectedInvoiceData, setSelectedInvoiceData] = useState([])
    const [bankRecpMajorData, setBankRecpMajorData] = useState({
        bankRecepId: '',
        bankRecepDate: '',
        cheq_no: '',
        cheq_Date: '',
        cheq_amt: '',
        bank_name: '',
        remark: ''
    })
    const obj = {
        achead: '', glcode: '', custId: '', master_id: '', costCenter: '',costCenterName:'', refNo: '', refDate: '', refAmt: '', deduction: '', tds: '', netAmt: '', payType: '', recAmt: '', balAmt: ''
    }
    const [Bankrowdata, setBankrowdata] = useState([obj])
    const [locationstate, setLocationstate] = useState([]);
    const [bankRepCount, setBankRepCount] = useState(0)
    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem("Organisation");
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);
            const allank = await ActiveBank(org);
            setBanklist(allank)

            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)
            const locatonstateres = await ActiveLocationAddress(org);
            setLocationstate(locatonstateres);

            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].bank_recep_count) + 1
            setBankRepCount(lastno)
            setLoading(true)
            document.getElementById('bank_recep_id').value = id[0].bank_recep_ser + id[0].year + String(lastno).padStart(5, '0');

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
        document.getElementById("bank_recep_date").defaultValue = today;
        document.getElementById("check_date").defaultValue = today;
    };


    const handleAddRow = (e) => {
        e.preventDefault()
        setBankrowdata([...Bankrowdata, obj])
    }

    const handleDeleteRemove = (e, index, deleteType) => {
        e.preventDefault()
        if (Bankrowdata.length > 1) {
            let newarr = [...Bankrowdata];

            if (deleteType === 'pop') {
                newarr.pop()
            }
            else if (deleteType === 'splice') {
                newarr.splice(index, 1)
            }
            setBankrowdata(newarr);
            let totalRefAmt = 0;
            for (let i = 0; i < newarr.length; i++) {
                totalRefAmt = Number(totalRefAmt) + Number(newarr[i].refAmt)
            }
            document.getElementById('total_ref_amt').innerHTML = totalRefAmt

        }
    }

    const handleChangeRowData = (e, index) => {
        e.preventDefault();
        let { name, value } = e.target;
        const rowsInput = [...Bankrowdata];
        rowsInput[index][name] = value
        setBankrowdata(rowsInput);
    }

    // ------------------------ Handle Major Data ---------------------------
    const handleSetMajorData = () => {
        let bank = document.getElementById('bank').value;
        bank = bank.split(',')
        let bank_name = bank[2]
        setBankRecpMajorData({
            bankRecepId: document.getElementById('bank_recep_id').value,
            bankRecepDate: document.getElementById('bank_recep_date').value,
            cheq_no: document.getElementById('check_ref_no').value,
            cheq_Date: document.getElementById('check_date').value,
            cheq_amt: document.getElementById('check_amt').value,
            bank_name: bank_name,
            remark: document.getElementById('remarks').value
        })
    }
    // -------------------------Handle Minor Data ---------------------------
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
        const subBankRec = [...Bankrowdata]
        subBankRec[currentindex].glcode = glcode;
        document.getElementById('on_account').disabled = true;
        if (glcode === '5020001') {
            const org = localStorage.getItem('Organisation')
            const customers = await ActiveCustomer(org)
            setCustomerlist(customers)
            document.getElementById('SelectCustomerModal').style.display = 'block'
        }
        else {
            subBankRec[currentindex].achead = chartOfAcct;

        }
        setBankrowdata(subBankRec);
    }

    const handleBlurMethod = (e, index) => {
        let { name, value } = e.target;
        const rowsInput = [...Bankrowdata];
        if (name === 'refAmt') {
            let totalRefAmt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalRefAmt = Number(totalRefAmt) + Number(rowsInput[i].refAmt)
            }
            rowsInput[index][name] = value;
            rowsInput[index].deduction = '';
            rowsInput[index].tds = '';
            rowsInput[index].recAmt = '';
            document.getElementById('total_ref_amt').innerHTML = totalRefAmt
        }
        else if (name === 'payType') {
            value = value.toUpperCase()
            if (value === 'P') {
                rowsInput[index][name] = value
                rowsInput[index].recAmt = 0
                document.getElementById(`recAmt-${index}`).disabled = false
            }
            else if (value === 'F') {
                rowsInput[index][name] = value
                rowsInput[index].recAmt = rowsInput[index].refAmt || 0
                rowsInput[index].balAmt = 0
                document.getElementById(`recAmt-${index}`).disabled = true
            }
            else {
                rowsInput[index][name] = ''
            }
        }
        else if (name === 'deduction') {
            let totaldeduction = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totaldeduction = Number(totaldeduction) + Number(rowsInput[i].deduction)
            }
            rowsInput[index][name] = value;
            document.getElementById('total_deduction').innerHTML = totaldeduction
        }
        else if (name === 'tds') {
            let totaltds = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totaltds = Number(totaltds) + Number(rowsInput[i].tds)
            }
            rowsInput[index][name] = value;
            document.getElementById('total_tds').innerHTML = totaltds
        }

        else if (name === 'netAmt') {
            let totalnetamt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalnetamt = Number(totalnetamt) + Number(rowsInput[i].netAmt)
            }
            rowsInput[index][name] = value;
            document.getElementById('total_net_amt').innerHTML = totalnetamt
        }
        else if (name === 'recAmt') {
            let totalrecAmt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalrecAmt = Number(totalrecAmt) + Number(rowsInput[i].recAmt)
            }
            rowsInput[index][name] = value;
            document.getElementById('total_rec_amt').innerHTML = totalrecAmt
        }

        setBankrowdata(rowsInput);
    }
    const handleClickCustomer = async (customer_id, customer_name, master_id) => {
        let rowsInputData = [...Bankrowdata];
        const onAccount = document.getElementById('on_account').checked === true ? true : false;
        if (!onAccount) {
            const invoices = await GetInvoicesByCustomer(localStorage.getItem('Organisation'), customer_id)
            setCustomerInvlist(invoices)
            document.getElementById('InvCustomModal').style.display = "block"

        }
        rowsInputData[currentindex].custId = customer_id;
        rowsInputData[currentindex].achead = customer_name;
        rowsInputData[currentindex].master_id = master_id;
        offCustomModal('SelectCustomerModal');
        setBankrowdata(rowsInputData)
    }

    const offCustomModal = (ids) => {
        document.getElementById(ids).style.display = 'none'
    }


    const handleSetInvoiceData = (index, inv_no, inv_date, inv_amt, location) => {
        const getcheckval =
            document.getElementById(`check-${index}`).checked === true ? true : false;

        if (getcheckval) {
            setSelectedInvoiceData([...selectedInvoiceData,
            {
                achead: Bankrowdata[currentindex].achead, glcode: Bankrowdata[currentindex].glcode,
                custId: Bankrowdata[currentindex].custId, costCenter: location,
                refNo: inv_no, refDate: inv_date, refAmt: inv_amt, deduction: '', tds: '', netAmt: '', payType: '', recAmt: '', balAmt: ''
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
    const handleMergeArry = () => {
        selectedInvoiceIndex.map((inv) => (
            document.getElementById(`check-${inv}`).checked = false
        ))
        const rowsInput = [...Bankrowdata];
        rowsInput.pop()
        const newRowData = [...rowsInput, ...selectedInvoiceData]
        setBankrowdata(newRowData)
        setSelectedInvoiceIndex([]);
        setSelectedInvoiceData([]);
        offCustomModal('InvCustomModal')
        let totalRefAmt = 0;
        for (let i = 0; i < newRowData.length; i++) {
            totalRefAmt = Number(totalRefAmt) + Number(newRowData[i].refAmt)
        }
        document.getElementById('total_ref_amt').innerHTML = totalRefAmt

        setTimeout(() => {
            for (let i = currentindex; i < newRowData.length; i++) {
                document.getElementById(`chartofacct-${i}`).disabled = true
                document.getElementById(`location-${i}`).disabled = true
                document.getElementById(`refNo-${i}`).disabled = true
                document.getElementById(`refDate-${i}`).disabled = true
                document.getElementById(`refAmt-${i}`).disabled = true
            }
        }, 1000)
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

    const handlelocation = (location_id,location_name) => {
        let minorData = [...Bankrowdata];
        minorData[currentindex].costCenter = location_id;
        minorData[currentindex].costCenterName = location_name;
        setBankrowdata(minorData)
    }
    // ----------------- Handle Submit ------------------------------
    const handleSubmitFormData = (e) => {
        e.preventDefault();
        console.log(Bankrowdata)
        // setLoading(false)
        const bank_recep_id = document.getElementById('bank_recep_id').value
        const bank_recep_date = document.getElementById('bank_recep_date').value
        const check_ref_no = document.getElementById('check_ref_no').value
        const check_date = document.getElementById('check_date').value
        const check_amt = document.getElementById('check_amt').value
        let bank = document.getElementById('bank').value;
        bank = bank.split(',')
        let bank_id = bank[0]
        let bank_sub_code = bank[1]
        let bank_name = bank[2]
        let bank_glcode = bank[3]
        let on_account = document.getElementById('on_account').checked === true ? true : false
        let remarks = document.getElementById('remarks').value;
        let fins_year = localStorage.getItem('fin_year')

        if (!check_ref_no || !check_amt || !bank_id) {
            // setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {

            // const result = await InsertBillPayment(org, bank_payment_id, bank_recep_date, check_ref_no, check_date, check_amt, bank_id, bank_sub_code, bank_name, bank_glcode, onAccount, remarks, username, fins_year)

            // bankPayMinData.map(async (element) => {
            //     await InsertSubBillPayment(org, bank_payment_id, element.glcode, element.achead, element.glcode, element.costCenter, element.refNo, element.refDate, element.refAmt, element.pay_type, element.amt_paid, element.amt_bal, element.masterId, element.sub_cost_center_id, element.sub_cost_center)
            // })
            // await Updatefinancialcount(localStorage.getItem('Organisation'), 'bank_payment_count', bankpayCount)
            // setLoading(true)
            // if (result.result === 'Added successfully') {
            //     setAlertObj({ type: 'success', text: 'Bank Payment Done', url: '/TotalBankingPayment' })
            // } else {
            //     setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            // }
        }

    }

    return (
        <>
            <div className="wrapper positio-relative">
                <Header />
                {loading ? (
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <h3 className="pt-3 pb-2 pl-5">Add Banking (Receipts)</h3>
                            <div className="card">
                                <article className="card-body">
                                    <form autoComplete="off">
                                        <div className="form-row ">
                                            <label htmlFor="bank_recep_id" className="col-md-2 col-form-label font-weight-normal" > Banking Receipt Id</label>
                                            <div className="d-flex col-md-4"><input type="text" className="form-control col-md-10" id="bank_recep_id" disabled /></div>
                                            <label htmlFor="bank_recep_date" className="col-md-2 col-form-label font-weight-normal" > Banking Receipt Date</label>
                                            <div className="d-flex col-md-4"><input type="date" className="form-control col-md-10" id="bank_recep_date" disabled /></div>
                                        </div>
                                        <div className="form-row mt-2">
                                            <label htmlFor="check_ref_no" className="col-md-2 col-form-label font-weight-normal">Cheque no/Ref no <span className="text-danger">*</span></label>
                                            <div className="d-flex col-md-4"> <input type="text" className="form-control col-md-10 " id="check_ref_no" /></div>
                                            <label htmlFor="check_date" className="col-md-2 col-form-label font-weight-normal">Cheque Date <span className="text-danger">*</span></label>
                                            <div className="d-flex col-md-4"> <input type="date" className="form-control col-md-10 " id="check_date" /></div>
                                        </div>
                                        <div className="form-row mt-2">
                                            <label htmlFor="check_amt" className="col-md-2 col-form-label font-weight-normal">Cheque amt <span className="text-danger">*</span></label>
                                            <div className="d-flex col-md-4"> <input type="number" className="form-control col-md-10 " id="check_amt" /></div>
                                            <label htmlFor="bank" className="col-md-2 col-form-label font-weight-normal">Bank <span className="text-danger">*</span></label>
                                            <div className="d-flex col-md-4">
                                                <select type="date" className="form-control col-md-10 " id="bank" onChange={handleSetMajorData}>
                                                    <option value='' hidden>Select Bank</option>
                                                    {banklist.map((bankdata, index) => (
                                                        <option key={index} value={[bankdata.bank_id, bankdata.sub_code, bankdata.bank_name, bankdata.chart_of_account]}> {bankdata.bank_name} ({bankdata.account_no}) </option>))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="on_account" className="col-md-2 col-form-label font-weight-normal text-danger" > On Account</label>
                                            <div className="d-flex col-md-4  align-items-center "><input type="checkbox" id="on_account" style={{ width: '18px', height: '18px' }} /></div>
                                        </div>
                                        <div className="w-100 overflow-auto">
                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">AcHead/GlCode</th>
                                                        <th scope="col">Cost Center</th>
                                                        <th scope="col">Ref no</th>
                                                        <th scope="col">Ref Date</th>
                                                        <th scope="col">Ref Amount</th>
                                                        <th scope="col">Deduction</th>
                                                        <th scope="col">TDS</th>
                                                        <th scope="col">Net amt</th>
                                                        <th scope="col">Pay Type</th>
                                                        <th scope="col">Rec Amt</th>
                                                        <th scope="col">Bal Amt</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <SubAddBankRec
                                                        Bankrowdata={Bankrowdata}
                                                        // chartofacctlist={chartofacctlist}
                                                        handleDeleteRemove={handleDeleteRemove}
                                                        handleChangeRowData={handleChangeRowData}
                                                        handleBlurMethod={handleBlurMethod}
                                                        // handleChangeChartofAcct={handleChangeChartofAcct}
                                                        setCurrentindex={setCurrentindex}
                                                    />
                                                    <tr>
                                                        <td colSpan='4' className="text-right">Total</td>
                                                        <td id="total_ref_amt">0</td>
                                                        <td id="total_deduction">0</td>
                                                        <td id="total_tds">0</td>
                                                        <td id="total_net_amt">0</td>
                                                        <td ></td>
                                                        <td id="total_rec_amt">0</td>
                                                        <td id="total_bal_amt">0</td>
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
                                                            id="remarks" placeholder="Remarks" style={{ resize: "none" }} onClick={handleSetMajorData}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="rounded py-1 px-2" style={{ width: "50%", background: '#eee' }}>
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
                                            </div> */}
                                        </div>
                                    </form>
                                </article>


                                <div className="card-footer border-top">
                                    <button id="save" name="save" className="btn btn-danger" onClick={handleSubmitFormData}>Submit</button>
                                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                                    <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#BankRecepPreview"  > Preview Receipts</button>
                                </div>

                            </div>
                        </div>
                        {
                            alertObj.type ? <AlertsComp data={alertObj} /> : null
                        }
                    </div>
                ) : (
                    <LoadingPage />
                )}
                <Footer />
            </div>
            <BankRecepPreview orgdata={orgdata} bankRecpMajorData={bankRecpMajorData} Bankrowdata={Bankrowdata} />

            {/* ########################## modal Chart Of Account  Start ######################## */}
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
            {/* ########################### modal Chart Of Account End ################################################# */}
            {/* ########################## modal Location  Start ################################ */}
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
                                                    onClick={(e) => { handlelocation(items.location_id,items.location_name) }}
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
            {/* modal Location  End*/}

            {/* ###################### Customer Custom Modal ############################### */}
            <div className="position-absolute" id="SelectCustomerModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" >
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
                                                onClick={() => { handleClickCustomer(customer.cust_id, customer.cust_name, customer.mast_id) }}
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
                            <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('SelectCustomerModal'); window.location.reload(); }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ############## Invoice Custome Modal ################################# */}
            <div className="position-absolute" id="InvCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document" style={{ width: '55vw' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Select Invoice</h5>
                        </div>
                        <div className="modal-body overflow-auto position-relative p-0 px-2" style={{ height: '50vh' }}>
                            <table className="table table-bored table-sm ">
                                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                                    <tr>
                                        <th>Select</th>
                                        <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice no</th>
                                        <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice Date</th>
                                        <th className="pl-4 " style={{ fontSize: '20px' }}>Invoice Amt</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        customerInvlist.length > 0 ?
                                            customerInvlist.map((inv, index) =>
                                                <tr key={index} className="cursor-pointer text-center"
                                                // onClick={() => { handleSetBillInvData(inv.invoice_no, inv.Invdate, inv.invoice_amt) }} 
                                                >
                                                    <td><input type='checkbox' id={`check-${index}`} style={{ height: '15px', width: '15px' }} onChange={() => { handleSetInvoiceData(index, inv.invoice_no, inv.Invdate, inv.invoice_amt, inv.location) }} /></td>
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
                            <button type="button" className="btn btn-success" onClick={() => { handleMergeArry() }}>Add</button>
                            <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('InvCustomModal'); }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBankingReceipt;
