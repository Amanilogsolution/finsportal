import React, { useRef } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import './BankRecepPreview.css'
import jsPDF from "jspdf";

const BankRecepPreview = ({ orgdata,bankRecpMajorData,Bankrowdata }) => {
    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Bank(Receipt).pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };
    console.log(bankRecpMajorData)
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="BankRecepPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <h1 className='mb-0 border-top-0 text-center'>Bank Receipt</h1>
                                        <div>
                                            <div className='d-flex border-top-0'>
                                                <div className='w-50 bankrec_cust_inner1  px-2 py-2'><strong>Receipt No.:</strong>{bankRecpMajorData.bankRecepId}</div>
                                                <div className='w-50 bankrec_cust_inner1  px-2 py-2'><strong>Receipt Date:</strong> {bankRecpMajorData.bankRecepDate} </div>
                                            </div>
                                            <div className=' d-flex'>
                                                <div className='w-50 bankrec_cust_inner1 bankrec_cust_inner2 px-2 py-2'><strong>Vide cash/cheque/DD.No::</strong> {bankRecpMajorData.cheq_no}</div>
                                                <div className='w-50 bankrec_cust_inner1 bankrec_cust_inner2 px-2 py-2'><strong>Customer.:</strong> { } </div>
                                            </div>
                                        </div>
                                        <table id="bankrec_second_table" className='text-center' style={{ width: '100%' }}>
                                            <thead style={{ background: "#cccccc" }}>
                                                <tr>
                                                    <th >Sno.</th>
                                                    <th >Inv no</th>
                                                    <th >Inv Amt</th>
                                                    <th >Tds</th>
                                                    <th >ReceiveAmt  </th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {/* {items.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.items}</td>
                                                        <td>{item.Quantity}</td>
                                                        <td>{item.rate}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.taxPer}</td>
                                                        <td>{item.taxAmt}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.total}</td>

                                                    </tr>)
                                                })} */}
                                                <tr>
                                                    <td colSpan='4'><strong>Total</strong></td>
                                                    <td>{bankRecpMajorData.cheq_amt}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="Total_so_div p-2">
                                        <strong>Total ReceiveAmt Value (In Figure)</strong>
                                        <strong className='float-right'>{}</strong>
                                    </div> */}
                                    <div className="Total_so_div py-2 px-0">
                                        <strong>Total Amt (In Words)</strong>
                                        <span className='float-right'>
                                            {DecamalNumber.toWords(Number(bankRecpMajorData.cheq_amt)).toUpperCase()} 
                                            Only</span>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>On Account of :</strong>
                                        <strong className='float-right'>Being amt received through UPI</strong>
                                    </div>
                                    <div className="bankrec_Amount_tax d-flex justify-content-between align-items-center px-4 py-2">
                                        <strong >Drawn On :</strong>
                                        <span>{bankRecpMajorData.bank_name}</span>

                                    </div>
                                    <div className="Total_bankrec_div p-2">
                                        <strong>Remarks :</strong>  {bankRecpMajorData.remark}
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

export default BankRecepPreview;