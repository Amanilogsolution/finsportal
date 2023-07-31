import React, { useRef, useEffect, useState } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import '../../../Accountant/BankingRecep/BankRecepPreview/BankRecepPreview.css'
import jsPDF from "jspdf";
import { GetCashReceipt, GetCashSubReceipt } from '../../../../api'

const CashReceiptRepPreview = ({ cashRecpId, orgdata }) => {
    const [cashRecpMajorData, SetCashRecpMajorData] = useState([])
    const [CashSubdata, setCashSubdata] = useState([])


    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Cash(Receipt)-${cashRecpId}.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const org = localStorage.getItem('Organisation');
            const cashRecepData = await GetCashReceipt(org, cashRecpId)
            SetCashRecpMajorData(cashRecepData.data)

            const cashRecepSubData = await GetCashSubReceipt(org, cashRecpId)
            setCashSubdata(cashRecepSubData.data)
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="CashRecepPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <h1 className='mb-0 border-top-0 text-center'>Receipt Voucher</h1>
                                        <div>
                                            <div className='d-flex border-top-0'>
                                                <div className='w-50 bankrec_cust_inner1  px-2 py-2'><strong>Receipt No.: </strong>{cashRecpId}</div>
                                                <div className='w-50 bankrec_cust_inner1  px-2 py-2'><strong>Receipt Date: </strong> {cashRecpMajorData.cashReceiptDate} </div>
                                            </div>
                                            <div className=' d-flex'>
                                                <div className='w-50 bankrec_cust_inner1 bankrec_cust_inner2 px-2 py-2'><strong>Vide cash/cheque/DD.No:</strong> {cashRecpMajorData.ref_no}</div>
                                                <div className='w-50 bankrec_cust_inner1 bankrec_cust_inner2 px-2 py-2'>
                                                    <strong>Cheque Date:</strong> {cashRecpMajorData.refDate}
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
                                                        <th >Tds</th>
                                                        <th >ReceiveAmt  </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CashSubdata.map((item, index) => {
                                                        return (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.chart_of_acct}</td>
                                                            <td>{item.ref_no}</td>
                                                            <td>{item.amt}</td>
                                                            <td>{item.rec_amt}</td>

                                                        </tr>)
                                                    })}
                                                    <tr>
                                                        <td colSpan='4'><strong>Total</strong></td>
                                                        <td>{cashRecpMajorData.amt}</td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>Total ReceiveAmt Value (In Figure)</strong>
                                        <strong className='float-right'>{cashRecpMajorData.amt}</strong>
                                    </div>
                                    <div className="Total_bankrecp_div p-2">
                                        <strong>Total Amt (In Words):</strong>
                                        <span className='float-right'>
                                            {DecamalNumber.toWords(Number(cashRecpMajorData.amt)).toUpperCase()} Only</span>
                                    </div>

                                    <div className="Total_bankrec_div py-2">
                                        <div><strong>Checked by :</strong>  </div>
                                        <div className='Total_bankrec_div_inner'>
                                            <div><strong>Authorised Signatory  :</strong> </div>
                                            <div><strong>Verified by :</strong> </div>
                                        </div>
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

export default CashReceiptRepPreview;