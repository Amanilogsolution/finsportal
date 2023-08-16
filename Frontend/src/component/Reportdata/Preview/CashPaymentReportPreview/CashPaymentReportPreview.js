import React, { useState, useRef, useEffect } from "react";
import DecamalNumber from 'decimal-number-to-words';
import '../../../Accountant/BankPayment/BankPayPreview/BankPayPreview.css'
import jsPDF from "jspdf";
import { GetCashPayment, GetSubCashPayment } from '../../../../api'

const CashPaymentReportPreview = ({ cashPayId, orgdata }) => {
    const [cashPayMajorData, setCashPayMajorData] = useState([])
    const [CashSubdata, setCashSubdata] = useState([])

    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Cash Payment ${cashPayId}}.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const org = localStorage.getItem('Organisation');
            const cashPaymenttMajorData = await GetCashPayment(org, cashPayId)
            setCashPayMajorData(cashPaymenttMajorData.data)

            const cashPaymentSubData = await GetSubCashPayment(org, cashPayId)
            console.log(cashPaymentSubData.data)
            setCashSubdata(cashPaymentSubData.data)
        }
        fetchData();
    }, [])
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="CashPayPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg bankrecepPreview-modal " role="document">
                    <div className="modal-content ">
                        <div className="modal-body" ref={pdfRef}>
                            <div className="bankrec-main_div m-auto" style={{ letterSpacing: '0.1px' }}>
                                <div className="bankrec_for_border">
                                    <div className="bankrec-head_div d-flex border border-dark">
                                        <div className="bankrec_company_logo">
                                            <img src={orgdata.org_logo} alt='Organisation Logo' />
                                        </div>
                                        <div className="bankrec_company_details">
                                            <h3>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                            <p>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                            <p>GSTIN : {orgdata.org_gst}</p>
                                        </div>
                                    </div>
                                    <div className="bankrec">
                                        <h1 className='mb-0 border-top-0 text-center'>Cash Payment Voucher</h1>
                                        <div>
                                            <div className='d-flex border-top-0'>
                                                <div className='w-50 bankrec_cust_inner1  px-2 py-2'><strong>Voucher No.:</strong> {cashPayMajorData.cash_payment_id}</div>
                                                <div className='w-50 bankrec_cust_inner1  px-2 py-2'><strong>Voucher Date:</strong> {cashPayMajorData.cashPaymentDate} </div>
                                            </div>
                                            <div className=' d-flex'>
                                                <div className='w-50 bankrec_cust_inner1 bankrec_cust_inner2 px-2 py-2'><strong>Vide cash/cheque/DD.No:</strong> {cashPayMajorData.pymt_no}</div>
                                                <div className='w-50 bankrec_cust_inner1 bankrec_cust_inner2 px-2 py-2'>
                                                    <strong>Cheque Date:</strong> {cashPayMajorData.pymtDate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bankec_table'>
                                            <table id="bankrec_second_table" className='text-center' style={{ width: '100%' }}>
                                                <thead style={{ background: "#cccccc" }}>
                                                    <tr>
                                                        <th >Sno.</th>
                                                        <th >Inv no</th>
                                                        <th >Inv Amt</th>
                                                        <th >ReceiveAmt  </th>  
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CashSubdata.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.ref_no}</td>
                                                        <td>{item.amt}</td>
                                                        <td>{item.amt_paid}</td>
                                                    </tr>)
                                                })}  
                                                    <tr>
                                                        <td colSpan='3'><strong>Total</strong></td>
                                                        <td>{cashPayMajorData.amt}</td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>Total Payment Amt Value (In Figure)</strong>
                                        <strong className='float-right'>{cashPayMajorData.amt}</strong>
                                    </div>
                                    <div className="Total_bankrecp_div p-2">
                                        <strong>Total Amt (In Words):</strong>
                                        <span className='float-right'>
                                            {DecamalNumber.toWords(Number(cashPayMajorData.amt)).toUpperCase()}
                                            Only</span>
                                    </div>
                                    <div className="Total_bankrecp_div p-2">
                                        <strong>On Account of :</strong>
                                        <strong className='float-right'>Being amt received through UPI</strong>
                                    </div>
                                    {/* <div className="bankrec_Amount_tax d-flex justify-content-between align-items-center p-2">
                                        <strong >Drawn On :</strong>
                                        {/* <span>{bankRecpMajorData.bank_name}</span>
                                    </div> */}
                                    <div className="Total_bankrec_div py-2">
                                        <div><strong>Checked by :</strong>  </div>
                                        <div className='Total_bankrec_div_inner'>
                                            <div><strong>Authorised Signatory  :</strong> </div>
                                            <div><strong>Verified by :</strong> </div>
                                        </div>
                                    </div>
                                    <div className="Total_bankrec_div p-2">
                                        <strong>Signature of Authorizated Representative :</strong>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={print}>Print</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default CashPaymentReportPreview;