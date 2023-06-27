import React, { useRef } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import './BankPayPreview.css'
import jsPDF from "jspdf";

const BankPayPreview = ({ orgdata, bankPayMinData, majorBankData }) => {
    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Bank(Payment).pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="BankPayPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg bankpayPreview-modal " role="document">
                    <div className="modal-content ">
                        <div className="modal-body" ref={pdfRef}>
                            <div className="bankpay-main_div m-auto" style={{ letterSpacing: '0.1px' }}>
                                <div className="bankpay_for_border">
                                    <div className="bankpay-head_div d-flex border border-dark">
                                        <div className="bankpay_company_logo">
                                            <img src={orgdata.org_logo} alt='Organisation Logo' />
                                        </div>
                                        <div className="bankpay_company_details">
                                            <h3>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                            <p>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                            <p>GSTIN : {orgdata.org_gst}</p>
                                        </div>
                                    </div>
                                    <div className="bankpay">
                                        <h1 className='mb-0 border-top-0 text-center'>Bank Payment</h1>
                                        <div>
                                            <div className='d-flex border-top-0'>
                                                <div className='w-50 bankpay_cust_inner1  px-2 py-1'><strong>Receipt No.:</strong> {majorBankData.bankrecpId}</div>
                                                <div className='w-50 bankpay_cust_inner1  px-2 py-1'><strong>Receipt Date:</strong> {majorBankData.bankrecpDate} </div>
                                            </div>
                                            <div className=' d-flex'>
                                                <div className='w-50 bankpay_cust_inner1 bankpay_cust_inner2 px-2 py-1'><strong>Cheq No. :</strong> {majorBankData.cheqNo}</div>
                                                <div className='w-50 bankpay_cust_inner1 bankpay_cust_inner2 px-2 py-1'><strong>Cheq Date:</strong> {majorBankData.cheqDate} </div>
                                            </div>
                                            <div className=' d-flex'>
                                                <div className='w-50 bankpay_cust_inner1 bankpay_cust_inner2 px-2 py-1'><strong>Cheq Amt :</strong> {majorBankData.cheqAmt}</div>
                                                <div className='w-50 bankpay_cust_inner1 bankpay_cust_inner2 px-2 py-1'><strong>Bank Name:</strong> {majorBankData.bank} </div>
                                            </div>
                                        </div>
                                        <table id="bankpay_second_table" className='text-center' style={{ width: '100%' }}>
                                            <thead style={{ background: "#cccccc" }}>
                                                <tr>
                                                    <th >Sno.</th>
                                                    <th >ACHead</th>
                                                    <th >Bill No.</th>
                                                    <th >Amount</th>
                                                    <th >Amount Paid</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bankPayMinData.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.achead}</td>
                                                        <td>{item.refNo}</td>
                                                        <td>{item.refAmt}</td>
                                                        <td>{item.amt_paid}</td>
                                                    </tr>)
                                                })}


                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>Total Amount Value (In Figure)</strong>
                                        <strong className='float-right'>{majorBankData.cheqAmt}</strong>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>Total Amount Value (In Words)</strong>
                                        <strong className='float-right'>{DecamalNumber.toWords(Number(majorBankData.cheqAmt)).toUpperCase()} Only</strong>
                                    </div>
                                    {/* <div className="bankpay_Amount_tax d-flex ">
                                        <strong style={{ margin: '12px 5px' }}>Amount Of Tax:</strong>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><strong>GST Rate</strong></td>
                                                    <td><strong>GST AMT</strong></td>
                                                </tr>
                                                <tr>
                                                    {/* <td>{somajorData.total_gst_rate}</td>
                                                    <td>{somajorData.total_gst_amt}</td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> */}
                                    <div className="Total_bankpay_div p-2">
                                        <strong>Remarks :</strong> {majorBankData.remarks}
                                    </div>
                                    <div className="Total_bankpay_div p-2">
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

export default BankPayPreview;