import React, { useEffect, useState, useRef } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import './jvPreview.css'

const JvPreview = ({ orgdata }) => {

    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`JV.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };

    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="JvPreviewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg JvPreview-modal " role="document">
                    <div className="modal-content">
                        <div className="modal-body" ref={pdfRef}>
                            <div className="jv-main_div m-auto border border-dark p-2">
                                <div className="jvdiv_for_border ">
                                    <div className="jv-head_div d-flex border border-dark">
                                        <div className="company_logo">
                                            <img src={orgdata.org_logo} alt='Organisation Logo' />
                                        </div>
                                        <div className="company_details">
                                            <h3>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                            <p>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                            <p>GSTIN : {orgdata.org_gst}</p>
                                        </div>
                                    </div>
                                    <div className="journal_voucher">
                                        <h1 className='mb-0 border-top-0 border-bottom-0 text-center'>Journal Voucher</h1>
                                        <table id="jv_first_table" >
                                            <tbody>
                                                <tr>
                                                    <td><strong>JV No: </strong></td>
                                                    <td><strong>JV Date : </strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <table id="Jv_second_table" style={{ width: '100%' }}>
                                            <thead className='text-center'>
                                                <tr>
                                                    <th>SNo.</th>
                                                    <th>Activity</th>
                                                    <th>Amount</th>
                                                    <th>Pass Amt</th>
                                                    <th>CGST </th>
                                                    <th>SGST </th>
                                                    <th>IGST </th>
                                                </tr>
                                             
                                            </thead>
                                            <tbody>


                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="Total_div p-2">
                                        <strong>Total Amount Value (In Figure)</strong>
                                        <strong className='float-right'>Amt</strong>
                                    </div>
                                    <div className="Total_div p-2">
                                        <strong>Total Amount Value (In Words)</strong>
                                        <strong className='float-right'>{DecamalNumber.toWords(Number(232)).toUpperCase()} Only</strong>
                                    </div>

                                    <div className="Total_div px-2">
                                        <strong>Remarks :</strong>
                                    </div>
                                    <div className="Total_div px-2">
                                        <strong>Signature of Authorizated Representative :</strong>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-success" onClick={print}>Print</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JvPreview;