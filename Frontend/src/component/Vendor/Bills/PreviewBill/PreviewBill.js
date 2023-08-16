import React, { useRef } from 'react'
import './PreviewBill.css'
import DecimalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { memo } from "react";

const PreviewBill = ({ billalldetail, BillItems, orgdata, netamt }) => {
    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Bill-${billalldetail.voucher_no}.pdf`);
            },
            html2canvas: { scale: 0.233 },
            margin: [5, 0, 0, 6],
        });
    };
    console.log('props', billalldetail, BillItems, orgdata, netamt)
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog   modal-lg" role="document" >
                    <div className="modal-content modelbillcard" >
                        <div className="modal-body" ref={pdfRef}>
                            <div className="modalbill border border-dark">
                                <div className="bill-orgname d-flex justify-content-around align-items-center " >
                                    <div>
                                        <img className='billorglogo' src={localStorage.getItem('Orglogo')} alt='' />
                                    </div>
                                    <div className="toporgname text-center " >
                                        <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                                        <p>
                                            {orgdata.org_street},{orgdata.org_city},{orgdata.org_state},{orgdata.org_country}
                                        </p>

                                    </div>
                                </div>
                                <div className="billorgbottomdiv text-center py-2">
                                    <h5 className='m-0 font-weight-bold'>Purchase Voucher</h5>
                                </div>
                                <div className='bill-detail d-flex'>
                                    <div className='left-bill-detail' style={{ width: "55%" }}>
                                        <table>
                                            <tbody>
                                                <tr >
                                                    <th >Voucher No :</th>
                                                    <td >{billalldetail.voucher_no}</td>
                                                </tr>
                                                <tr >
                                                    <th >Date :</th>
                                                    <td >{billalldetail.voucher_date}</td>
                                                </tr>
                                                <tr >
                                                    <th >Pay To :</th>
                                                    <td >{billalldetail.vendor_name}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{billalldetail.vendor_location[1]}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className='right-bill-detail ml-2' style={{ width: "45%" }}>
                                        <table >
                                            <tbody>
                                                <tr >
                                                    <th >Bill no: </th>
                                                    <td >{billalldetail.bill_no}</td>
                                                </tr>
                                                <tr >
                                                    <th>Bill Date:</th>
                                                    <td> {billalldetail.bill_date}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                                <div className='bill-items '>
                                    <table className='table table-bordered table-sm items-table'>
                                        <thead className='text-center'>
                                            <tr className='item-table-row'>
                                                <th rowSpan="2">Sno.</th>
                                                <th rowSpan="2">Item</th>
                                                <th colSpan={2}>GST</th>
                                                <th rowSpan="2">Quantity</th>
                                                <th rowSpan="2">Rate</th>
                                                <th rowSpan="2">Unit</th>
                                                <th rowSpan="2">Amount</th>
                                            </tr>
                                            <tr>
                                                <th>Rate</th>
                                                <th>Amt</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-items-tbody'>
                                            {
                                                BillItems.map((item, index) => (
                                                    <tr key={index} className=' text-center item-table-row'>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item}</td>
                                                        <td>{item.gst_rate}</td>
                                                        <td>{item.gst_amt}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.rate}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.amount}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr className='item-table-row'>
                                                <th colSpan={7} className='text-right mx-2'>Total</th>
                                                <th className='text-center'>{billalldetail.amtWithoutTax}</th>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className='bottom-table d-flex justify-content-end'>
                                    <div className='bottominner-table'>
                                        <table className='text-center table-bordered' style={{ background: "#eee" }} >
                                            <thead>
                                                <tr>
                                                    <th className='px-2 py-1'>Taxable Value</th>
                                                    <th className='px-2 py-1'>CGST</th>
                                                    <th className='px-2 py-1'>SGST</th>
                                                    <th className='px-2 py-1'>IGST</th>
                                                    <th className='px-2 py-1'>TDS Amt</th>
                                                    <th className='px-2 py-1'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='px-2 py-1'>{billalldetail.amtWithoutTax}</td>
                                                    <td className='px-2 py-1'>{billalldetail.cgst_amt}</td>
                                                    <td className='px-2 py-1'>{billalldetail.sgst_amt}</td>
                                                    <td className='px-2 py-1'>{billalldetail.igst_amt}</td>
                                                    <td className='px-2 py-1'>{billalldetail.tds_amt}</td>
                                                    <td className='px-2 py-1'>{netamt}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <div className='bottominner-table-narration p-2 d-flex'>
                                    <h5><b>Total Amount (In Words):</b> </h5>
                                    <h5 className='bill-amt-inword'>&nbsp;{DecimalNumber.toWords(Number(netamt))} only</h5>
                                </div>
                                <div className='bottominner-table-narration p-2 d-flex'>
                                    <h5><b>Narration:</b></h5>
                                    <h5>&nbsp;{billalldetail.remarks}</h5>
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

export default memo(PreviewBill);