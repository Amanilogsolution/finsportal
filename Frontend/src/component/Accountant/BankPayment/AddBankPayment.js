import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import {ActiveAllChartofAccount} from '../../../api'

function AddBankingPayment() {
    const [loading, setLoading] = useState(false)
    const [chartofacctlist, setChartofacctlist] = useState([]);
    
    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem("Organisation");
          
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);
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
      };
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
                                            <label htmlFor="check_amt" className="col-md-2 col-form-label font-weight-normal">Cheque amt<span className="text-danger">*</span></label>
                                            <div className="d-flex col-md-4"> <input type="number" className="form-control col-md-10 " id="check_amt" /></div>
                                            <label htmlFor="check_date" className="col-md-2 col-form-label font-weight-normal">Bank <span className="text-danger">*</span></label>
                                            <div className="d-flex col-md-4">
                                                <select type="date" className="form-control col-md-10 " id="check_date" >
                                                    <option value='' hidden>Select Bank</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="on_account" className="col-md-2 col-form-label font-weight-normal text-danger" > On Account</label>
                                            <div className="d-flex col-md-4"><input type="checkbox"  id="on_account"  /></div>
                                        </div>
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
                                                    <th scope="col">Inv Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                        <button className="btn btn-primary"> Add Row</button>
                                        &nbsp;
                                        <button className="btn btn-danger"> Remove</button>
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
                                    {/* <button id="post" name="save" className="btn btn-danger ml-2" onClick={() => { handleSubmit('post') }}>Post</button> */}
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

            </div>


        </>
    );
}

export default AddBankingPayment;
