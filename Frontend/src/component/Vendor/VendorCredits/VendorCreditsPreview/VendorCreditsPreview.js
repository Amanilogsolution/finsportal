import React, { useEffect, useState, useRef } from 'react'
import { showOrganisation } from '../../../../api'
import './VendorCreditsPreview.css'
import jsPDF from "jspdf";

const VendorCreditsPreview = ({ data, Dndata, DebitCodeSub }) => {
    const [orgdata, setOrgdata] = useState([])

    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Invoice-${Dndata.dn_no}.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };

    useEffect(() => {
        const fetchdata = async () => {
            let org = localStorage.getItem('Organisation');
            const result = await showOrganisation(org)
            setOrgdata(result)
        }
        fetchdata()
    }, [DebitCodeSub])
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg cnPreview-modal " role="document">
                    <div className="modal-content">
                        <div className="modal-body" ref={pdfRef}>
                            <div className='cnPreview-modalContainer'>
                                <div className='cnPreview-orgdetail d-flex'>
                                    <span className='cn-orgPreviewlogo'>
                                        <img className='cn-orgpreviewlogo' src={localStorage.getItem('Orglogo')} alt='' />
                                    </span>
                                    <span className='cn-orgPreviewdetails'>
                                        <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                                        <p> {orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                        <div className=""><b>GST IN.</b> {orgdata.org_gst}</div>
                                    </span>
                                </div>
                                <div className='cn-detailminiPreview d-flex justify-content-between align-items-center px-4'>
                                    <span><span className='font-weight-bold'>Bill Date:</span> {data.billdate} </span>
                                    <span><span className='font-weight-bold'>Bill Number:</span> {data.bill_no} </span>
                                    <span><span className='font-weight-bold'>Amount:</span> {data.total_bill_amt}</span>
                                </div>
                                <div className='cn-detailsPreview d-flex'>
                                    <div className='cn-detailsPreview1 '>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Vendor Name: </span>
                                            <span>{data.vend_name}</span>
                                        </div>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Voucher Number : </span>
                                            <span>{data.vourcher_no}</span>
                                        </div>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Debit Note Number: </span>
                                            <span>{Dndata.dn_no}</span>
                                        </div>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Debit Note Date: </span>
                                            <span>{Dndata.dn_Date}</span>
                                        </div>
                                    </div>
                                    <div className='cn-detailsPreview2 '>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Location: </span>
                                            <span>{data.location}</span>
                                        </div>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Voucher Date: </span>
                                            <span>{data.voudate}</span>
                                        </div>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Debit Note Amount: </span>
                                            <span>{Dndata.total_dn_amt}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className='cn-orgPreview-items'>
                                    <table className='table table-bordered border border-danger'>
                                        <thead>
                                            <tr >
                                                <th className='py-1'>Item</th>
                                                <th className='py-1'>Gl Code</th>
                                                <th className='py-1'>Amount</th>
                                                <th className='py-1'>Balance Amount</th>
                                                <th className='py-1'>Pass Amount</th>
                                                <th className='py-1'>Remark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                DebitCodeSub.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.items}</td>
                                                        <td>{item.gl_code}</td>
                                                        <td>{item.amt}</td>
                                                        <td>{item.balance_amt}</td>
                                                        <td>{item.pass_amt}</td>
                                                        <td>{item.narration}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                                <div className='cn-detailsTotalPreview' style={{ height: '200px' }}>
                                    <div className='cn-detailsTotalPreviewsub h-100 float-right rounded'>
                                        <table className='w-100 m-2'>
                                            <tbody>
                                                <tr>
                                                    <th><h5>Net Amount: </h5></th>
                                                    <th>{data.total_bill_amt - data.taxable_amt}</th>
                                                </tr>
                                                <tr>
                                                    <th><h5>IGST:  </h5></th>
                                                    <th>{data.igst_amt}</th>
                                                </tr>
                                                <tr>
                                                    <th><h5>CGST:  </h5></th>
                                                    <th>{data.cgst_amt}</th>
                                                </tr>
                                                <tr>
                                                    <th><h5>SGST:  </h5></th>
                                                    <th>{data.sgst_amt}</th>
                                                </tr>
                                                <tr>
                                                    <th><h5>Total GST:  </h5></th>
                                                    <th>{data.taxable_amt}</th>
                                                </tr>
                                                <tr>
                                                    <th><h5>Total Amount:  </h5></th>
                                                    <th>{data.total_bill_amt}</th>
                                                </tr>
                                            </tbody>
                                        </table>
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
            </div>
        </>
    )
}

export default VendorCreditsPreview;