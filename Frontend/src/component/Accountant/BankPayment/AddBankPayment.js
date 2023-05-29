import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import { ActiveAllChartofAccount, showOrganisation, ActiveBank } from '../../../api'
import BankPayPreview from "./BankPayPreview/BankPayPreview";
import SubBankPayment from "./SubBankPayment";

function AddBankingPayment() {
    const [loading, setLoading] = useState(false)
    const [orgdata, setOrgdata] = useState([])

    const minorBankPayobj = {
        achead: '', glcode: '', custId: '', masterId: '', costCenter: '', refNo: '', refDate: '', refAmt: '', tds: '', net_amt: '', pay_type: '', amt_paid: '', amt_bal: '', sub_cost_center: '',
    }
    const [bankPayMinData, setBankPayMinData] = useState([minorBankPayobj])
    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [banklist, setBanklist] = useState([])
   
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

    // ###################### Handle Change Minor Data Start ###############################
    const handleChangeMiorData = (e, index) => {
        let minorData = [...bankPayMinData];
        minorData[index][e.target.name] = e.target.value;
        setBankPayMinData(minorData)
    }
    // ###################### Handle Change Minor Data End ###############################

    // ###################### Handle Change Ac Head Data Start ###############################
    const handleChnageAcHead = (e, index) => {
        let minorData = [...bankPayMinData];
        let achead_arr = e.target.value.split('^')
        const glcode = achead_arr[1]

        minorData[index].achead = achead_arr[0];
        minorData[index].glcode = glcode;
        setBankPayMinData(minorData)
    }
    // ###################### Handle Change  Ac Head  Data End ###############################

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
                                            <div className="d-flex col-md-4"><input type="checkbox" id="on_account" /></div>
                                        </div>
                                        <div className="w-100 overflow-auto">
                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">AcHead</th>
                                                        <th scope="col">Cost Center</th>
                                                        <th scope="col">Ref no</th>
                                                        <th scope="col">Ref Date</th>
                                                        <th scope="col">Ref Amount</th>
                                                        <th scope="col">TDS</th>
                                                        <th scope="col">Net amt</th>
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
                                                        chartofacctlist={chartofacctlist}
                                                        handleChnageAcHead={handleChnageAcHead}
                                                    />
                                                </tbody>
                                            </table>
                                        </div>
                                        <input type='button' className="btn btn-primary" value='Add Row' onClick={handleAddMinorDataRow} />
                                        <input type='button' className="btn btn-danger ml-2" value='Remove' onClick={(e) => handleRemoveDeleteRow(e, 'pop')} />
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
                                    <button id="save" name="save" className="btn btn-danger" >Submit</button>
                                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                                    <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#BankPayPreview" > Preview Payment</button>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <LoadingPage />
                )}
                <Footer />

            </div>
            <BankPayPreview orgdata={orgdata} />


        </>
    );
}

export default AddBankingPayment;
