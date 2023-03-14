import React, { useState, useEffect } from 'react'
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { GetBillData, GetSubBillItems, showOrganisation, Getfincialyearid, UpdateSaveBillToPost, UpdateSaveSubBillToPost, Updatefinancialcount } from '../../../../api'
import PreviewBill from './EditPreviewBill';


function Bills() {
    const [data, setData] = useState([])
    const [totalItemValues, setTotalItemValues] = useState([])
    const [orgdata, setOrgdata] = useState([]);
    const [netamt, setNetamt] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            let org = localStorage.getItem('Organisation');
            const bill_data = await GetBillData(org, localStorage.getItem('vourcher_no'))
            setData(bill_data)
            console.log(bill_data)

            const bill_item_data = await GetSubBillItems(org, localStorage.getItem('vourcher_no'))
            setTotalItemValues(bill_item_data)
            console.log(bill_item_data)

            let net_amt = 0;
            bill_item_data.map((item, index) => { net_amt = net_amt + Number(item.net_amt) })
            setNetamt(net_amt)

            const result = await showOrganisation(org)
            setOrgdata(result)

        }
        fetchdata();
    }, [])


    const handlePost = async (e) => {
        e.preventDefault();
        const org = localStorage.getItem('Organisation')
        let vouNo = localStorage.getItem('vourcher_no')

        const id = await Getfincialyearid(org)
        const lastno = Number(id[0].voucher_count) + 1
        let new_voucher_no = id[0].voucher_ser + id[0].year + String(lastno).padStart(5, '0')

        const update_vou_no = await UpdateSaveBillToPost(org, vouNo, new_voucher_no)
        if (update_vou_no === 'Updated') {
            const update_sub_vouno = await UpdateSaveSubBillToPost(org, vouNo, new_voucher_no)
            if (update_sub_vouno === 'Updated') {

                const invcount = await Updatefinancialcount(org, 'voucher_count', lastno)
                alert('Bill Posted');
                localStorage.removeItem('vourcher_no');
                window.location.href = '/SaveBillReport'
            }
        }
    }
    return (
        <>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div className={`content-wrapper `}>
                    <div className="container-fluid ">
                        <h3 className="pt-3 pb-1 ml-5"> New Bill</h3>
                        <div className={`card mb-2 `}>
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row ">
                                        <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <select
                                                id="vend_name"
                                                className="form-control col-md-4" disabled>
                                                <option value={data.vend_name} hidden>{data.vend_name}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Location <span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="text" className="form-control col-md-4 cursor-notallow" id="location" defaultValue={data.location} disabled />
                                        </div>

                                    </div>

                                    <div className="form-row mt-3" >
                                        <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >Voucher no </label>
                                        <div className="d-flex col-md-4" >
                                            <input type="text" className="form-control col-md-10 cursor-notallow" id="voucher_no" defaultValue={data.vourcher_no} disabled />
                                        </div>
                                        <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">Voucher Date</label>
                                        <div className="d-flex col-md-4 " >
                                            <input type="date" className="form-control col-md-10 cursor-notallow" id="voucher_date" disabled defaultValue={data.voudate} />
                                        </div>
                                    </div>

                                    <div className="form-row mt-3">
                                        <label htmlFor='bill_no' className="col-md-2 col-form-label font-weight-normal" >Bill number<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="text" className="form-control col-md-4" id="bill_no" defaultValue={data.bill_no} disabled />
                                        </div>
                                    </div>

                                    <div className="form-row mt-3">
                                        <label className="col-md-2 col-form-label font-weight-normal" >P.O number</label>
                                        <div className="d-flex col-md">
                                            <select className="form-control col-md-4" id="order_no" disabled>
                                                <option hidden value={data.po_no}>{data.po_no}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <label htmlFor='bill_amt' className="col-md-2 col-form-label font-weight-normal">Bill Amount<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="number" className="form-control col-md-4" id="bill_amt" defaultValue={data.bill_amt} disabled />
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Bill Date<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="date" className="form-control col-md-4" id="bill_date" defaultValue={data.billdate} disabled />
                                        </div>
                                    </div>

                                    <div className="form-row mt-3" >
                                        <label htmlFor='payment_term' className="col-md-2 col-form-label font-weight-normal" >Payment Terms<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md-4" >
                                            <select
                                                id="payment_term"
                                                className="form-control col-md-10" disabled>
                                                <option value={data.payment_term} hidden> {data.payment_term}</option>

                                            </select>
                                        </div>
                                        <label htmlFor='due_date' className="col-md-1 col-form-label font-weight-normal" >Due Date</label>
                                        <div className="d-flex col-md-4 " >
                                            <input type="date" className="form-control col-md-10 cursor-notallow" id="due_date" disabled defaultValue={data.duedate} />
                                        </div>
                                    </div>

                                    <br />
                                    <table className="table table-striped table-bordered">
                                        <thead className='text-center'>
                                            <tr>
                                                <th scope="col">Location</th>
                                                <th scope="col">Item Details</th>
                                                <th scope="col">Employee</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Deduction</th>
                                                <th scope="col">Refno/FIleno</th>
                                                <th scope="col">Unit</th>
                                                <th scope="col">Net Amt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                totalItemValues.map((element, index) => (
                                                    <tr key={index}>
                                                        <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                            <input className="form-control ml-0" defaultValue={element.location} disabled />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                            <input className="form-control ml-0" defaultValue={element.item_name} disabled />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input className="form-control ml-0" defaultValue={element.emp_name} disabled />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='number' id={`Quantity${index}`} className="form-control" disabled defaultValue={element.qty} />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='number' id="Rate" className="form-control" disabled defaultValue={element.rate} />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='number' id="Amount" className="form-control cursor-notallow" disabled defaultValue={element.amt} />
                                                        </td>

                                                        <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                            <input type='number' id={`deduction${index}`} className="form-control" disabled defaultValue={element.deduction} />

                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                            <input type='text' className="form-control" id={`fileno${index}`} disabled defaultValue={element.file_no} />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='text' className="form-control" id={`fileno${index}`} disabled defaultValue={element.unit} />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                            <input type='number' className="form-control cursor-notallow" disabled defaultValue={element.net_amt} />
                                                        </td>
                                                    </tr>

                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    <hr />

                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "40%" }}>
                                            <div className="form mt-2">
                                                <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="5" id="remarks" placeholder="Remarks" style={{ resize: "none" }}
                                                        defaultValue={data.remarks} disabled></textarea>
                                                </div>

                                            </div>
                                            <div className='mt-3'>
                                                <label className="font-weight-normal" >Attach file(s) to Estimate</label><br />
                                                <button type="button" className='btn btn-success' data-toggle="modal" data-target="#exampleModal">
                                                    <i className='ion-android-attach'></i> &nbsp;
                                                    Attach File</button>
                                            </div>
                                        </div>
                                        <div style={{ width: "55%", marginLeft: "3px", padding: "5px", background: '#eee', borderRadius: "7px" }}>
                                            <table className='table table-borderless' style={{ width: "100%" }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ position: "relative" }}>
                                                    <tr scope="row">
                                                        <td style={{ width: "150px" }} >Total CGST Amt </td>
                                                        <td className='form-control col-md p-0 bg-transparent pb-1'>
                                                            <div className="input-group" >
                                                                <input type="number" className="form-control col-md-5 ml-5  cursor-notallow" id='cgst-inp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='cgstamt' >{data.cgst_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total SGST Amt</td>
                                                        <td className='form-control col-md p-0 bg-transparent border-none'>
                                                            <div className="input-group" >
                                                                <input type="" className="form-control col-md-5 ml-5  cursor-notallow" id='sgst-inp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='sgstamt'>{data.sgst_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total IGST Amt</td>
                                                        <td className='form-control col-md p-0 bg-transparent ' >
                                                            <div className="input-group" >
                                                                <input type='number' className="form-control col-md-5 ml-5  cursor-notallow" id='igst-inp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='igstamt'>{data.igst_amt}</td>
                                                    </tr>
                                                    <tr scope="row">
                                                        <td style={{ width: "150px" }}>Total TDS *</td>
                                                        <td className='form-control col-md p-0 bg-transparent '>
                                                            <div className="input-group" >
                                                                <input type="text" className="form-control col-md-5 ml-5 cursor-notallow" id='tdsperinp' defaultValue={data.tds_per} disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='tdstagval'>{data.tds_amt}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Expense Amt</td>
                                                        <td className='form-control col-md p-0 bg-transparent '>
                                                            <input type="text" className="form-control col-md-6 ml-5" id='expense_amt' disabled defaultValue={data.expense_amt} />
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }}>0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td><h4>Total</h4></td>
                                                        <td></td>
                                                        <td className='text-center' style={{ width: "150px" }} id='total_bill_amt'>{data.total_bill_amt}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <PreviewBill data={data} totalItemValues={totalItemValues} orgdata={orgdata} netamt={netamt} />

                                </form>
                            </article>
                            <div className="card-footer border-top">
                                <button id="savebtn" type='submit' name="save" className="btn btn-danger" value='save'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert('Bill Saved');
                                        localStorage.removeItem('vourcher_no'); window.location.href = '/SaveBillReport'
                                    }}>Save</button>
                                <button id="postbtn" name="save" className="btn btn-danger ml-2" value='post' onClick={handlePost}>Post </button>
                                <button id="clear" onClick={(e) => { e.preventDefault(); localStorage.removeItem('vourcher_no'); window.location.href = '/SaveBillReport' }} name="clear" className="btn bg-secondary ml-2">Cancel</button>
                                <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview Bill</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />


            </div>



        </>
    )
}

export default Bills
