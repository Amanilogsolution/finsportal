import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveAllChartofAccount, SearchActiveChartofAccount, showOrganisation, ActiveBank, ActiveVendor, ActiveLocationAddress, SearchLocationAddress, GetBillVendorID, ActiveEmployee, Getfincialyearid, InsertBillPayment, Updatefinancialcount, InsertSubBillPayment } from '../../../api'
import BankPayPreview from "./BankPayPreview/BankPayPreview";
import SubBankPayment from "./SubBankPayment";
import AlertsComp from '../../AlertsComp';

function AddBankingPayment() {
    const org = localStorage.getItem("Organisation");

    const [loading, setLoading] = useState(false)
    const [orgdata, setOrgdata] = useState([])
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [majorBankData, setMajorBankData] = useState([{
        bankrecpId: '',
        bankrecpDate: '',
        cheqNo: '',
        cheqDate: '',
        cheqAmt: '',
        bank: '',
        remarks: ''
    }])
    const minorBankPayobj = {
        chart_of_acct: '', achead: '', glcode: '', vendorId: '', masterId: '', costCenter: '', refNo: '', refDate: '', refAmt: '',
        pay_type: '', amt_paid: '', amt_bal: '', sub_cost_center: '', sub_cost_center_id: ''
    }
    const [bankPayMinData, setBankPayMinData] = useState([minorBankPayobj])


    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [banklist, setBanklist] = useState([])
    const [vendorlist, setVendorlist] = useState([])
    const [employeelist, setEmployeelist] = useState([])
    const [currentindex, setCurrentindex] = useState(0);
    const [locationstate, setLocationstate] = useState([]);
    const [vendorBilllist, setVendorBilllist] = useState([]);
    const [selectedBillData, setSelectedBillData] = useState([])
    const [selectedBillIndex, setSelectedBillIndex] = useState([])
    const [bankpayCount, setBankpayCount] = useState(0)

    useEffect(() => {
        const fetchdata = async () => {
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);
            const allbank = await ActiveBank(org);
            setBanklist(allbank)
            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)

            const locatonstateres = await ActiveLocationAddress(org);
            setLocationstate(locatonstateres);

            const emp_list = await ActiveEmployee(org)
            setEmployeelist(emp_list)

            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].bank_payment_count) + 1
            setBankpayCount(lastno)
            setLoading(true)
            document.getElementById('bank_recep_id').value = id[0].bank_payment_ser + id[0].year + String(lastno).padStart(5, '0')
            Todaydate()
        }

        fetchdata();
    }, [])

    const Todaydate = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        document.getElementById("bank_recep_date").defaultValue = today;
        document.getElementById("check_date").defaultValue = today;
    };

    const handleAddMinorDataRow = (e) => {
        e.preventDefault()
        setBankPayMinData([...bankPayMinData, minorBankPayobj])
    }


    const handleRemoveDeleteRow = (e, removetype, index = 0) => {
        e.preventDefault();
        if (bankPayMinData.length > 1) {
            let minorData = [...bankPayMinData];
            if (removetype === 'pop') {
                minorData.pop();
            }
            else if (removetype === 'splice') {
                minorData.splice(index, 1)
            }
            setBankPayMinData(minorData)
        }
    }

    const offCustomModal = (ids) => {
        document.getElementById(ids).style.display = 'none'
    }


    // ------------------------------ Bank Payment Major Data  -----------------------------------
    const handleSetMajorData = () => {
        const bank = document.getElementById('bank').value.split(',');
        const bank_name = bank[2];
        setMajorBankData({
            bankrecpId: document.getElementById('bank_recep_id').value,
            bankrecpDate: document.getElementById('bank_recep_date').value,
            cheqNo: document.getElementById('check_ref_no').value,
            cheqDate: document.getElementById('check_date').value,
            cheqAmt: document.getElementById('check_amt').value,
            bank: bank_name,
            remarks: document.getElementById('remarks').value
        })
    }



    // ###################### Handle Change Minor Data Start ###############################
    const handleChangeMiorData = (e, index) => {
        let minorData = [...bankPayMinData];
        if (e.target.name === 'sub_cost_center') {
            let sub_cost = e.target.value.split(',')
            minorData[index].sub_cost_center_id = sub_cost[0]
            minorData[index].sub_cost_center = sub_cost[1]
        }
        else {
            minorData[index][e.target.name] = e.target.value;
        }
        console.log(minorData)
        setBankPayMinData(minorData)
    }
    const handleCalculateMinorData = (fieldType, index) => {
        if (fieldType === 'refAmt') {
            let totalAmt = 0;
            for (let i = 0; i < bankPayMinData.length; i++) {
                totalAmt = totalAmt + Number(bankPayMinData[i].refAmt)
            }
            document.getElementById('totalamount').innerHTML = totalAmt;
        }
        else if (fieldType === 'amt_paid') {
            let totalAmtPad = 0;
            for (let i = 0; i < bankPayMinData.length; i++) {
                totalAmtPad = totalAmtPad + Number(bankPayMinData[i].amt_paid)
            }
            document.getElementById('totalAmtPad').innerHTML = totalAmtPad;
        }
        let amt_bal = Number(bankPayMinData[index].refAmt) - Number(bankPayMinData[index].amt_paid)
        let minorData = [...bankPayMinData];
        minorData[index].amt_bal = amt_bal;
        setBankPayMinData(minorData)
    }

    const handleChangePayType = (e, index) => {
        const pay_type = e.target.value;
        let minorData = [...bankPayMinData];
        minorData[index].pay_type = pay_type;
        if (pay_type === 'partial') {
            minorData[index].amt_paid = 0
            document.getElementById(`amt_paid-${index}`).disabled = false;
        }
        else if (pay_type === 'full') {
            minorData[index].amt_paid = bankPayMinData[index].refAmt
            minorData[index].amt_bal = 0
            document.getElementById(`amt_paid-${index}`).disabled = true;
        }
        setBankPayMinData(minorData)
        handleCalculateMinorData('amt_paid', index)
    }
    // ###################### Handle Change Minor Data End ###############################

    // ###################### Handle Change Ac Head Data Start ###############################
    const handleChnageAcHead = async (chartOfAcct, glCode) => {
        let minorData = [...bankPayMinData];
        minorData[currentindex].chart_of_acct = chartOfAcct;
        minorData[currentindex].achead = chartOfAcct;
        minorData[currentindex].glcode = glCode;
        setBankPayMinData(minorData)
        document.getElementById('on_account').disabled = true;
        if (glCode === '3020001') {
            // const org = localStorage.getItem('Organisation')
            const vendors = await ActiveVendor(org)
            setVendorlist(vendors)
            document.getElementById('SelectVendorModal').style.display = 'block'
        }
    }


    const handleClickVendor = async (id, name, mast_id) => {
        const onAccount = document.getElementById('on_account').checked === true ? true : false
        if (!onAccount) {
            const bills = await GetBillVendorID(localStorage.getItem('Organisation'), id)
            setVendorBilllist(bills)
            console.log(bills)
            offCustomModal('SelectVendorModal');
            document.getElementById('billCustomModal').style.display = "block"
            bankPayMinData[currentindex].vendorId = id;
        }
        else {
            offCustomModal('SelectVendorModal');
        }
        bankPayMinData[currentindex].masterId = mast_id;
        bankPayMinData[currentindex].achead = name;
    }

    const handleSetBillData = (index, bill_no, bill_date, bill_amt, location) => {
        const getcheckval =
            document.getElementById(`billcheck-${index}`).checked === true ? true : false;

        if (getcheckval) {
            setSelectedBillData([...selectedBillData,
            {
                chart_of_acct: bankPayMinData[currentindex].chart_of_acct, achead: bankPayMinData[currentindex].achead, glcode: bankPayMinData[currentindex].glcode, vendorId: bankPayMinData[currentindex].vendorId,
                masterId: bankPayMinData[currentindex].masterId, costCenter: location, refNo: bill_no, refDate: bill_date, refAmt: bill_amt,
                pay_type: '', amt_paid: '', amt_bal: '', sub_cost_center: '',
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

    const handleMergeInvoiceBillArry = () => {
        const rowsInput = [...bankPayMinData];
        rowsInput.pop()
        let newRowData;
        newRowData = [...rowsInput, ...selectedBillData]

        setSelectedBillData([]);
        selectedBillIndex.map((item)=>(
            document.getElementById(`billcheck-${item}`).checked=false
        ))
        setSelectedBillIndex([]);
        offCustomModal('billCustomModal')
     
        setBankPayMinData(newRowData)
        
        setTimeout(() => {
            for (let i = currentindex; i < newRowData.length; i++) {
                document.getElementById(`location-${i}`).disabled = true
                document.getElementById(`ref_no-${i}`).disabled = true
                document.getElementById(`ref_date-${i}`).disabled = true
                document.getElementById(`ref_amt-${i}`).disabled = true
            }
            let totalAmt = 0;
            for (let i = 0; i < newRowData.length; i++) {
                totalAmt = totalAmt + Number(newRowData[i].refAmt)
            }
            document.getElementById('totalamount').innerHTML = totalAmt;
        }, 1000)

    }
    // ###################### Handle Change  Ac Head  Data End ###############################

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

    const handlelocation = (location_id) => {
        let minorData = [...bankPayMinData];
        minorData[currentindex].costCenter = location_id;
        setBankPayMinData(minorData)
    }

    // ------------------------------ Submit Form ---------------------------------

    const handleSubmitForm = async () => {
        setLoading(false)
        const bank_payment_id = document.getElementById('bank_recep_id').value;
        const bank_recep_date = document.getElementById('bank_recep_date').value;
        const check_ref_no = document.getElementById('check_ref_no').value;
        const check_date = document.getElementById('check_date').value;
        const check_amt = document.getElementById('check_amt').value;
        const bank = document.getElementById('bank').value.split(',');
        const bank_id = bank[0];
        const bank_sub_code = bank[1];
        const bank_name = bank[2];
        const bank_glcode = bank[3]
        const onAccount = document.getElementById('on_account').checked === true ? true : false;
        const remarks = document.getElementById('remarks').value;
        const username = localStorage.getItem('User_id')
        const fins_year = localStorage.getItem('fin_year')

        if (!check_ref_no || !check_amt || !bank_id) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const result = await InsertBillPayment(org, bank_payment_id, bank_recep_date, check_ref_no, check_date, check_amt, bank_id, bank_sub_code, bank_name, bank_glcode, onAccount, remarks, username, fins_year)

            bankPayMinData.map(async (element) => {
                await InsertSubBillPayment(org, bank_payment_id, element.glcode, element.achead, element.glcode, element.costCenter, element.refNo, element.refDate, element.refAmt, element.pay_type, element.amt_paid, element.amt_bal, element.masterId, element.sub_cost_center_id, element.sub_cost_center)
            })
            await Updatefinancialcount(localStorage.getItem('Organisation'), 'bank_payment_count', bankpayCount)
            setLoading(true)
            if (result.result === 'Added successfully') {
                setAlertObj({ type: 'success', text: 'Bank Payment Done', url: '/TotalBankingPayment' })
            } else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }
    }
    return (
        <>
            <div className="wrapper positio-relative">
                <Header />
                {loading ? (
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <h3 className="pt-3 pb-2 pl-5">Add Banking (Payment)</h3>
                            <div className="card">
                                <article className="card-body">
                                    <form autoComplete="off">
                                        <div className="form-row ">
                                            <label htmlFor="bank_recep_id" className="col-md-2 col-form-label font-weight-normal" > Banking Payment ID</label>
                                            <div className="d-flex col-md-4"><input type="text" className="form-control col-md-10" id="bank_recep_id" disabled /></div>
                                            <label htmlFor="bank_recep_date" className="col-md-2 col-form-label font-weight-normal" > Banking Payment Date</label>
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
                                            <div className="d-flex col-md-4 pt-2"><input type="checkbox" id="on_account" style={{ height: '20px', width: '20px' }} /></div>
                                        </div>
                                        <div className="w-100 overflow-auto">
                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">AcHead</th>
                                                        <th scope="col">Cost Center</th>
                                                        <th scope="col">Ref no</th>
                                                        <th scope="col">Ref Date</th>
                                                        <th scope="col">Amount</th>
                                                        {/* <th scope="col">TDS</th> */}
                                                        {/* <th scope="col">Net amt</th> */}
                                                        <th scope="col">Pay Type</th>
                                                        <th scope="col">Amt Paid</th>
                                                        <th scope="col">Amt Bal</th>
                                                        <th scope="col">Gl code</th>
                                                        <th scope="col">Sub Cost center</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <SubBankPayment
                                                        bankPayMinData={bankPayMinData}
                                                        handleRemoveDeleteRow={handleRemoveDeleteRow}
                                                        handleChangeMiorData={handleChangeMiorData}
                                                        handleCalculateMinorData={handleCalculateMinorData}
                                                        handleChangePayType={handleChangePayType}
                                                        chartofacctlist={chartofacctlist}
                                                        handleChnageAcHead={handleChnageAcHead}
                                                        setCurrentindex={setCurrentindex}
                                                        employeelist={employeelist}
                                                    />
                                                    <tr>
                                                        <td colSpan={4} className="text-right">Total</td>
                                                        <td id='totalamount'></td>
                                                        <td></td>
                                                        <td id="totalAmtPad"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <input type='button' className="btn btn-primary" value='Add Row' onClick={handleAddMinorDataRow} />
                                        <input type='button' className="btn btn-danger ml-2" value='Remove' onClick={(e) => handleRemoveDeleteRow(e, 'pop')} />
                                        <div className="d-flex mb-2 justify-content-between">
                                            <div style={{ width: "45%" }}>
                                                <div className="form ">
                                                    <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
                                                    <div className="d-flex col-md">
                                                        <textarea type="text" className="form-control " rows="3"
                                                            id="remarks" placeholder="Remarks" style={{ resize: "none" }} onBlur={handleSetMajorData}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                         
                                        </div>
                                    </form>
                                </article>
                                <div className="card-footer border-top">
                                    <button id="save" name="save" className="btn btn-danger" onClick={() => { handleSubmitForm() }} >Submit</button>
                                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalBankingPayment"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                                    <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#BankPayPreview" > Preview Payment</button>
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
            <BankPayPreview orgdata={orgdata} bankPayMinData={bankPayMinData} majorBankData={majorBankData}/>

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
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary"
                                onClick={() => { offCustomModal('SelectVendorModal') }}
                            >Close</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* ############## Bill Custome Modal ################################# */}
            <div className="position-absolute" id="billCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "122%", display: "none"}} tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document" style={{ width: '55vw' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Select Purchase Journal</h5>
                        </div>
                        <div className="modal-body overflow-auto position-relative p-2" style={{ maxHeight: '40vh' }}>
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
                                                    onChange={() => { handleSetBillData(index, bill.voucher_no, bill.voudate, bill.total_bill_amt, bill.gst_location_id) }}
                                                /></td>

                                                <td className="pl-3 text-left">{bill.voucher_no}</td>
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
                                onClick={() => handleMergeInvoiceBillArry()}
                            >Procced</button>

                        </div>
                    </div>
                </div>
            </div>

            {/* ############## Invoice Custome Modal ################################# */}
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
                                        <tr key={index} className="cursor-pointer py-0" data-dismiss="modal" onClick={(e) => handleChnageAcHead(items.account_sub_name, items.account_sub_name_code)}>
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
                                                <tr key={index} className="cursor-pointer py-0" data-dismiss="modal" onClick={(e) => { handlelocation(items.location_id) }} >
                                                    <td>{items.location_city}</td>
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
        </>
    );
}

export default AddBankingPayment;