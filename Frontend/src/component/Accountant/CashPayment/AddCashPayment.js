import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import LoadingPage from "../../loadingPage/loadingPage";
import SubAddCashPayment from "./SubAddCashPayment";
import { ActiveAllChartofAccount, Getfincialyearid, ActiveCustomer, GetInvoicesByCustomer, ActiveBank, showOrganisation, SearchActiveChartofAccount, ActiveLocationAddress, SearchLocationAddress } from '../../../api'


const AddCashPayment = () => {
    const [loading, setLoading] = useState(false);
    const obj = {
        achead: '', glcode: '', custId: '', master_id: '', costCenter: '', invNo: '', invDate: '', invAmt: '', netamt: '', paytype: '', amtPaid: '', amtbal: ''
    }
    const [Cashrowdata, setCashrowdata] = useState([obj])
    const [chartofacctlist, setChartofacctlist] = useState([]);
    const [currentindex, setCurrentindex] = useState(0)
    const [customerlist, setCustomerlist] = useState([])
    const [locationstate, setLocationstate] = useState([]);
    const [cashPayIdCount, setCashPayIdCount] = useState(0)

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem("Organisation");
            const chartofacct = await ActiveAllChartofAccount(org);
            setChartofacctlist(chartofacct);

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
        const subBankRec = [...Cashrowdata]
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
        setCashrowdata(subBankRec);
    }

    const handlelocation = (location_id) => {
        let minorData = [...Cashrowdata];
        minorData[currentindex].costCenter = location_id;
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
        rowsInput[index][name] = value
        setCashrowdata(rowsInput);
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
                                        <label htmlFor="ref_no" className="col-md-2 col-form-label font-weight-normal">Ref No <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="text" className="form-control col-md-10" id="ref_no" /></div>
                                        <label htmlFor="ref_date" className="col-md-2 col-form-label font-weight-normal">Ref Date <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="date" className="form-control col-md-10 " id="ref_date" /></div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label htmlFor="check_amt" className="col-md-2 col-form-label font-weight-normal">Amount <span className="text-danger">*</span></label>
                                        <div className="d-flex col-md-4"> <input type="number" className="form-control col-md-10" id="check_amt" /></div>
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
                                // onClick={handleSubmitFormData}
                                >Submit</button>
                                <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = "/TotalJVoucher"; }} name="clear" className="btn btn-secondary ml-2" > Cancel </button>
                                <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target="#BankRecepPreview"  > Preview Receipts</button>
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
        </div>
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
                                    <th>City </th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    locationstate.length > 0 ?
                                        locationstate.map((items, index) => (
                                            <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                                onClick={(e) => { handlelocation(items.location_id) }}
                                            >
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
    </>)
}
export default AddCashPayment;