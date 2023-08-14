import React, { useRef } from 'react'
import './PreviewBill.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { memo } from "react";

const PreviewBill = (props) => {
    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Bill-${props.data.voucher_no}.pdf`);
            },
            html2canvas: { scale: 0.233 },
            margin: [5, 0, 0, 6],
        });
    };
    console.log('props', props)
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
                                            {props.orgdata.org_street},{props.orgdata.org_city},{props.orgdata.org_state},{props.orgdata.org_country}
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
                                                    <td >{props.data.voucher_no}</td>
                                                </tr>
                                                <tr >
                                                    <th >Date :</th>
                                                    <td >{props.data.voucher_date}</td>
                                                </tr>
                                                <tr >
                                                    <th >Pay To :</th>
                                                    <td >PERFECT OFFICE BUSSINESS PVT LTD.</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, id modi</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className='right-bill-detail ml-2' style={{ width: "45%" }}>
                                        <table >
                                            <tbody>
                                                <tr >
                                                    <th >Bill no: </th>
                                                    <td >GIP173/22-23/024</td>
                                                </tr>
                                                <tr >
                                                    <th >Bill Date:</th>
                                                    <td > {props.data.bill_date}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                                <div className='bill-items '>
                                    <table className='table table-borderless items-table'>
                                        <tbody className='table-items-tbody'>
                                            <tr className='text-center item-table-row'>
                                                <th>Sno.</th>
                                                <th>Item</th>
                                                <th>GST Rate</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Unit</th>
                                                <th>Amount</th>
                                            </tr>
                                            {/* {
                                                props.Allitems.map((item, index) => (
                                                    <tr key={index} className=' text-center item-table-row'>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item}</td>
                                                        <td>{Number(item.cgst_per) + Number(item.igst_per) + Number(item.sgst_per)}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.rate}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.amount}</td>
                                                    </tr>
                                                ))
                                            } */}
                                            <tr className='item-table-row'>
                                                <th colSpan={6} className='text-right border border-dark border-bottom-0 border-left-0'>Total</th>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className='bottom-table d-flex justify-content-end'>
                                    <div className='bottominner-table'>
                                        <table className='text-center table-bordered' style={{background:"#eee"}} >
                                            <thead>
                                                <tr>
                                                    <th>Taxable Value</th>
                                                    <th>Central Tax</th>
                                                    <th>State Tax</th>
                                                    <th>TDS Amt</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2637</td>
                                                    <td>72838</td>
                                                    <td>782</td>
                                                    <td>782</td>
                                                    <td>2932</td>
                                                </tr>
                                            </tbody>
                                         
                                        </table>
                                    </div>
                                </div>
                                <div className='bottominner-table-narration p-2'>
                                    <h5><b>Total Amount (In Words):</b> </h5>
                                    <h6 >{props.data.remarks}</h6>
                                </div>
                                <div className='bottominner-table-narration p-2'>
                                    <h5>Narration: </h5>
                                    <h6 >{props.data.remarks}</h6>
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