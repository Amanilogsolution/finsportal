import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveAllChartofAccount, Getfincialyearid, ActiveCustomer, showOrganisation, SearchActiveChartofAccount, ActiveLocationAddress, SearchLocationAddress, ActiveEmployee } from '../../../api'
import SubAddCashReceipt from "./SubAddCashReceipt";
import CashReceiptPreview from './CashReceiptPreview/CashReceiptPreview';
import AlertsComp from '../../AlertsComp';


const AddCashReceipt = () => {
    const [loading, setLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [orgdata, setOrgdata] = useState([])
    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [customerlist, setCustomerlist] = useState([])
    const [currentindex, setCurrentindex] = useState(0)
    const [cashRecpMajorData, setCashRecpMajorData] = useState({
        cashRecepId: '',
        cashRecepDate: '',
        ref_no: '',
        ref_date: '',
        amt: '',
        remark: ''
    })
    const obj = {
        achead: '', glcode: '', custId: '', master_id: '', costCenter: '', costCenterName: '', refNo: '', refDate: '', refAmt: '', netAmt: '', payType: '', recAmt: '', balAmt: '', subCostCenterId: '', subCostCenter: ''
    }
    const [CashSubdata, setCashSubdata] = useState([obj])
    const [locationstate, setLocationstate] = useState([]);
    const [cashRepIdCount, setCashRepIdCount] = useState(0)
    const [activeEmp, setActiveEmp] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem("Organisation");
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);

            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)
            const locatonstateres = await ActiveLocationAddress(org);
            setLocationstate(locatonstateres);
            const allEmp = await ActiveEmployee(org)
            setActiveEmp(allEmp);

            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].cash_recep_count) + 1;
            setCashRepIdCount(lastno)
            setLoading(true)
            document.getElementById('cash_recep_id').value = id[0].cash_recep_ser + id[0].year + String(lastno).padStart(5, '0');
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
        document.getElementById("cash_recep_date").defaultValue = today;
        document.getElementById("ref_date").defaultValue = today;
    };


    const handleAddRow = (e) => {
        e.preventDefault()
        setCashSubdata([...CashSubdata, obj])
    }

    const handleDeleteRemove = (e, index, deleteType) => {
        e.preventDefault()
        if (CashSubdata.length > 1) {
            let newarr = [...CashSubdata];
            if (deleteType === 'pop') {
                newarr.pop()
            }
            else if (deleteType === 'splice') {
                newarr.splice(index, 1)
            }
            setCashSubdata(newarr);
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
        const rowsInput = [...CashSubdata];
        rowsInput[index][name] = value
        setCashSubdata(rowsInput);
    }

    // ------------------------ Handle Major Data ---------------------------
    const handleSetMajorData = () => {
        setCashRecpMajorData({
            cashRecepId: document.getElementById('cash_recep_id').value,
            cashRecepDate: document.getElementById('cash_recep_date').value,
            amt: document.getElementById('cash_recep_amt').value,
            ref_no: document.getElementById('ref_no').value,
            ref_date: document.getElementById('ref_date').value,
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
        const subBankRec = [...CashSubdata]
        subBankRec[currentindex].glcode = glcode;
        if (glcode === '5020001') {
            const org = localStorage.getItem('Organisation')
            const customers = await ActiveCustomer(org)
            setCustomerlist(customers)
            document.getElementById('SelectCustomerModal').style.display = 'block'
        }
        else {
            subBankRec[currentindex].achead = chartOfAcct;
        }
        setCashSubdata(subBankRec);
    }

    const handleBlurMethod = (e, index) => {
        let { name, value } = e.target;
        const rowsInput = [...CashSubdata];
        if (name === 'refAmt') {
            let totalRefAmt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalRefAmt = Number(totalRefAmt) + Number(rowsInput[i].refAmt)
            }
            rowsInput[index][name] = value;
            rowsInput[index].recAmt = '';
            document.getElementById('total_ref_amt').innerHTML = totalRefAmt
        }
        else if (name === 'payType') {
            value = value.toUpperCase()
            if (value === 'P') {
                rowsInput[index][name] = value
                rowsInput[index].recAmt = 0
                rowsInput[index].balAmt = rowsInput[index].refAmt
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

        else if (name === 'netAmt') {
            let totalnetamt = 0;
            for (let i = 0; i < rowsInput.length; i++) {
                totalnetamt = Number(totalnetamt) + Number(rowsInput[i].netAmt)
            }
            rowsInput[index][name] = value;
            document.getElementById('total_net_amt').innerHTML = totalnetamt
        }
        else if (name === 'recAmt') {
            // let totalrecAmt = 0;
            // for (let i = 0; i < rowsInput.length; i++) {
            //     totalrecAmt = Number(totalrecAmt) + Number(rowsInput[i].recAmt)
            // }
            rowsInput[index][name] = value;
            rowsInput[index].balAmt = rowsInput[index].refAmt - e.target.value;
            // document.getElementById('total_rec_amt').innerHTML = totalrecAmt
        }

        else if (name === 'subCostCenter') {
            let spliteVal = value.split('^');
            rowsInput[index].subCostCenterId = spliteVal[0];
            rowsInput[index].subCostCenter = spliteVal[1];
        }

        let totalrecAmt = 0;
        for (let i = 0; i < rowsInput.length; i++) {
            totalrecAmt = Number(totalrecAmt) + Number(rowsInput[i].recAmt)
        }
        // rowsInput[index][name] = value;/
        // rowsInput[index].balAmt = rowsInput[index].refAmt - e.target.value;
        document.getElementById('total_rec_amt').innerHTML = totalrecAmt

        setCashSubdata(rowsInput);
    }
    const handleClickCustomer = async (customer_id, customer_name, master_id) => {
        let rowsInputData = [...CashSubdata];
        rowsInputData[currentindex].custId = customer_id;
        rowsInputData[currentindex].achead = customer_name;
        rowsInputData[currentindex].master_id = master_id;
        offCustomModal('SelectCustomerModal');
        setCashSubdata(rowsInputData)
    }

    const offCustomModal = (ids) => {
        document.getElementById(ids).style.display = 'none'
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

    const handlelocation = (location_id, location_name) => {
        let minorData = [...CashSubdata];
        minorData[currentindex].costCenter = location_id;
        minorData[currentindex].costCenterName = location_name;
        setCashSubdata(minorData)
    }
    // ----------------- Handle Submit ------------------------------
    const handleSubmitFormData = (e) => {
        e.preventDefault();
        console.log(CashSubdata)
        // setLoading(false)
        // const bank_recep_id = document.getElementById('bank_recep_id').value
        // const bank_recep_date = document.getElementById('bank_recep_date').value
        // const check_ref_no = document.getElementById('check_ref_no').value
        // const check_date = document.getElementById('check_date').value
        // const check_amt = document.getElementById('check_amt').value
        // let bank = document.getElementById('bank').value;
        // bank = bank.split(',')
        // let bank_id = bank[0]
        // let bank_sub_code = bank[1]
        // let bank_name = bank[2]
        // let bank_glcode = bank[3]
        // let on_account = document.getElementById('on_account').checked === true ? true : false
        // let remarks = document.getElementById('remarks').value;
        // let fins_year = localStorage.getItem('fin_year')

        // if (!check_ref_no || !check_amt || !bank_id) {
        //     // setLoading(true)
        //     setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        // }
        // else {

        //     // const result = await InsertBillPayment(org, bank_payment_id, bank_recep_date, check_ref_no, check_date, check_amt, bank_id, bank_sub_code, bank_name, bank_glcode, onAccount, remarks, username, fins_year)

        //     // bankPayMinData.map(async (element) => {
        //     //     await InsertSubBillPayment(org, bank_payment_id, element.glcode, element.achead, element.glcode, element.costCenter, element.refNo, element.refDate, element.refAmt, element.pay_type, element.amt_paid, element.amt_bal, element.masterId, element.sub_cost_center_id, element.sub_cost_center)
        //     // })
        //     // await Updatefinancialcount(localStorage.getItem('Organisation'), 'bank_payment_count', cashRepIdCount)
        //     // setLoading(true)
        //     // if (result.result === 'Added successfully') {
        //     //     setAlertObj({ type: 'success', text: 'Bank Payment Done', url: '/TotalBankingPayment' })
        //     // } else {
        //     //     setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
        //     // }
        // }

    }
    return (<>
        <div className="wrapper positio-relative">
            <Header />
            {loading ? (
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h3 className="pt-3 pb-2 pl-5">Add Cash (Receipts)</h3>
                        <div className="card">
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row ">
                                        <label htmlFor="cash_recep_id" className="col-md-2 col-form-label font-weight-normal" > Cash Receipt Id</label>
                                        <div className="d-flex col-md-4"><input type="text" className="form-control col-md-10" id="cash_recep_id" disabled /></div>
                                        <label htmlFor="cash_recep_date" className="col-md-2 col-form-label font-weight-normal" > Cash Receipt Date</label>
                                        <div className="d-flex col-md-4"><input type="date" className="form-control col-md-10" id="cash_recep_date" disabled /></div>
                                    </div>

                                    <div className="form-row mt-2">
                                        <label htmlFor="ref_no" className="col-md-2 col-form-label font-weight-normal">Ref No</label>
                                        <div className="d-flex col-md-4"> <input type="text" className="form-control col-md-10 " id="ref_no" onBlur={handleSetMajorData} /></div>
                                        <label htmlFor="ref_date" className="col-md-2 col-form-label font-weight-normal">Ref Date</label>
                                        <div className="d-flex col-md-4"> <input type="date" className="form-control col-md-10 " id="ref_date" onBlur={handleSetMajorData} /></div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label htmlFor="cash_recep_amt" className="col-md-2 col-form-label font-weight-normal">Amount <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="number" className="form-control col-md-10 " id="cash_recep_amt" onBlur={handleSetMajorData} /></div>

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
                                                    <th scope="col">Net amt</th>
                                                    <th scope="col">Pay Type</th>
                                                    <th scope="col">Rec Amt</th>
                                                    <th scope="col">Bal Amt</th>
                                                    <th scope="col">GlCode</th>
                                                    <th scope="col">Sub CostCenter</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <SubAddCashReceipt
                                                    CashSubdata={CashSubdata}
                                                    handleDeleteRemove={handleDeleteRemove}
                                                    handleChangeRowData={handleChangeRowData}
                                                    handleBlurMethod={handleBlurMethod}
                                                    setCurrentindex={setCurrentindex}
                                                    activeEmp={activeEmp}
                                                />
                                                <tr>
                                                    <td colSpan='4' className="text-right">Total</td>
                                                    <td id="total_ref_amt">0</td>
                                                    <td id="total_net_amt">0</td>
                                                    <td></td>
                                                    <td id="total_rec_amt">0</td>
                                                    <td id="total_bal_amt">0</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <input type='button' className="btn btn-primary" onClick={handleAddRow} value='Add Row' />
                                    <input type='button' className="btn btn-danger ml-2" onClick={(e) => handleDeleteRemove(e, 0, 'pop')} value='Remove' />
                                    <div className="d-flex mb-2 ">
                                        <div style={{ width: "50%" }}>
                                            <div className="form ">
                                                <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="4"
                                                        id="remarks" placeholder="Remarks" style={{ resize: "none" }} onClick={handleSetMajorData}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </article>


                            <div className="card-footer border-top">
                                <button id="save" name="save" className="btn btn-danger" onClick={handleSubmitFormData}>Submit</button>
                                <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                                <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#CashRecepPreview"> Preview Receipts</button>
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
        <CashReceiptPreview orgdata={orgdata} cashRecpMajorData={cashRecpMajorData} CashSubdata={CashSubdata} />

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
                                    <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                        onClick={(e) => handleChangeChartofAcct(items.account_sub_name, items.account_sub_name_code)} >
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

    </>)
}
export default AddCashReceipt;