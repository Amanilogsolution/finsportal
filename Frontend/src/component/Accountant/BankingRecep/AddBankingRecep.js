import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveAllChartofAccount, ActiveCustomer, GetInvoicesByCustomer, ActiveBank, showOrganisation } from '../../../api'
import SubAddBankRec from './SubAddBankRec'
import BankRecepPreview from "./BankRecepPreview/BankRecepPreview";


function AddBankingReceipt() {
    const [loading, setLoading] = useState(false)
    const [orgdata, setOrgdata] = useState([])
    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [banklist, setBanklist] = useState([])
    const [customerlist, setCustomerlist] = useState([])
    const [customerInvlist, setCustomerInvlist] = useState([])
    const [currentindex, setCurrentindex] = useState(0)
    const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState([])
    const [selectedInvoiceData, setSelectedInvoiceData] = useState([])
    const obj = {
        achead: '', glcode: '', custId: '', costCenter: '', refNo: '', refDate: '', refAmt: '', deduction: '', tds: '', netAmt: '', payType: '', recAmt: '', balAmt: ''
    }
    const [Bankrowdata, setBankrowdata] = useState([obj])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem("Organisation");
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);
            const allank = await ActiveBank(org);
            setBanklist(allank)

            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)

            setLoading(true)
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

    const handleChangeChartofAcct = async (e, index) => {
        let { name, value } = e.target;
        let chartofact_arr = value.split('^')
        const chartofactname = chartofact_arr[0]
        const glcode = chartofact_arr[1]
        Bankrowdata[index].glcode = glcode;
        if (glcode == '5020001') {
            setCurrentindex(index)
            const org = localStorage.getItem('Organisation')
            const customers = await ActiveCustomer(org)
            setCustomerlist(customers)
            document.getElementById('SelectCustomerModal').style.display = 'block'
        }
        else {
            Bankrowdata[index].achead = chartofactname;

        }
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
    const handleClickCustomer = async (customer_id, customer_name) => {
        const invoices = await GetInvoicesByCustomer(localStorage.getItem('Organisation'), customer_id)
        setCustomerInvlist(invoices)
        offCustomModal('SelectCustomerModal');
        document.getElementById('InvCustomModal').style.display = "block"
        Bankrowdata[currentindex].custId = customer_id;
        Bankrowdata[currentindex].achead = customer_name;

    }
    const offCustomModal = (ids) => {
        document.getElementById(ids).style.display = 'none'
    }


    const handleSetInvoiceData = (index, inv_no, inv_date, inv_amt) => {
        const getcheckval =
            document.getElementById(`check-${index}`).checked === true ? true : false;

        if (getcheckval) {
            setSelectedInvoiceData([...selectedInvoiceData,
            {
                achead: Bankrowdata[currentindex].achead, glcode: Bankrowdata[currentindex].glcode,
                custId: Bankrowdata[currentindex].custId, costCenter: '',
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
    }
    const handleSubmitFormData = (e) => {
        e.preventDefault();
        console.log(Bankrowdata)
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
                                                <select type="date" className="form-control col-md-10 " id="bank" >
                                                    <option value='' hidden>Select Bank</option>
                                                    {banklist.map((bankdata, index) => (
                                                        <option key={index} value={bankdata.bank_name}> {bankdata.bank_name} ({bankdata.account_no}) </option>))
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
                                                        chartofacctlist={chartofacctlist}
                                                        handleDeleteRemove={handleDeleteRemove}
                                                        handleChangeRowData={handleChangeRowData}
                                                        handleBlurMethod={handleBlurMethod}
                                                        handleChangeChartofAcct={handleChangeChartofAcct}
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
                                            <div style={{ width: "40%" }}>
                                                <div className="form ">
                                                    <label htmlFor="remarks" className="col-md-7 col-form-label font-weight-normal" > Remarks </label>
                                                    <div className="d-flex col-md">
                                                        <textarea type="text" className="form-control " rows="4"
                                                            id="remarks" placeholder="Remarks" style={{ resize: "none" }}></textarea>
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
                    </div>
                ) : (
                    <LoadingPage />
                )}
                <Footer />
            </div>
            <BankRecepPreview orgdata={orgdata} />
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
                            <button type="button" className="btn btn-secondary" onClick={() => { offCustomModal('SelectCustomerModal') }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ############## Invoice Custome Modal ################################# */}
            <div className="position-absolute" id="InvCustomModal" style={{ top: "0%", backdropFilter: "blur(2px)", width: "100%", height: "100%", display: "none" }} tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Select Invoice</h5>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bored table-sm ">
                                <thead className="position-sticky bg-white  " style={{ top: '0' }}>
                                    <tr>
                                        <th>Select</th>
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
                                                // onClick={() => { handleSetBillInvData(inv.invoice_no, inv.Invdate, inv.invoice_amt) }} 
                                                >
                                                    <td><input type='checkbox' id={`check-${index}`} style={{ height: '15px', width: '15px' }} onChange={() => { handleSetInvoiceData(index, inv.invoice_no, inv.Invdate, inv.invoice_amt) }} /></td>
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