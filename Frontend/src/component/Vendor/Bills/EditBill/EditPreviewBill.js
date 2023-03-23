import React, { useRef,useState,useEffect } from 'react'
import '../PreviewBill/PreviewBill.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";

const EditPreviewBill = (props) => {
    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Bill-${props.data.vourcher_no}.pdf`);
            },
            html2canvas: { scale: 0.233 },
            margin: [5, 0, 0, 6],
        });
    };
    console.log(props)
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
                                <div className="billorgbottomdiv text-center"><h5 className='m-0 font-weight-bold'>Purchase Voucher</h5></div>
                                <div className='bill-detail d-flex'>
                                    <div className='left-bill-detail' style={{ width: "49%" }}>
                                        <table>
                                            <tbody>
                                                <tr >
                                                    <th >Voucher No :</th>
                                                    <td >{props.data.vourcher_no}</td>
                                                </tr>
                                                <tr >
                                                    <th >Dated :</th>
                                                    <td >{props.data.voudate}</td>
                                                </tr>
                                                <tr >
                                                    <th >Pay To :</th>
                                                    <td >{props.data.vend_name}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className='right-bill-detail ml-2' style={{ width: "48%" }}>
                                        <table >
                                            <tbody>
                                                <tr >
                                                    <th >Vide/Cash/Cheque/DD: </th>
                                                    <td >GIP173/22-23/024</td>
                                                </tr>
                                                <tr >
                                                    <th >Bill Date:</th>
                                                    <td > {props.data.billdate}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                                <div className='bill-items '>
                                    <table className='table items-table table-borderless m-0' >
                                        <tbody>
                                            <tr className='billitemrow'>
                                                <th className='first-col billitem text-center'>SNO.</th>
                                                <th className='second-col billitem text-center'>Item</th>
                                                <th className='third-col billitem text-center'>Quantity</th>
                                                <th className='four-col billitem text-center'>Rate</th>
                                                <th className='five-col billitem text-center'>Amount</th>
                                                <th className='six-col billitem text-center'>Deduction</th>
                                                <th className='seven-col billitem text-center'>Unit</th>
                                                <th className='eight-col billitem text-center'>Net Amt</th>
                                            </tr>
                                            {
                                                props.totalItemValues.map((item, index) => (
                                                    <tr key={index} className='billitemrow'>
                                                        <td className='first-col billitem text-center'>{index + 1}</td>
                                                        <td className='second-col billitem text-center'>{item.item_name}</td>
                                                        <td className='third-col billitem text-center'>{item.qty}</td>
                                                        <td className='four-col billitem text-center'>{item.rate}</td>
                                                        <td className='five-col billitem text-center'>{item.amt}</td>
                                                        <td className='six-col billitem text-center'>{item.deduction}</td>
                                                        <td className='seven-col billitem text-center'>{item.unit}</td>
                                                        <td className='eight-col billitem text-center'>{item.net_amt}</td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>

                                </div>

                                <div className='bill-bottomdetail d-flex justify-content-end' >

                                    <table className='table table-borderless m-0' >
                                        <tbody>
                                            <tr id='billborderbottom'>
                                                <th className='text-right'  >Net Amount</th>
                                                <td className='text-center'>{props.netamt}</td>
                                            </tr>
                                            <tr style={{ lineHeight: "16px" }}>
                                                <th className='text-right '  >CGST</th>
                                                <td className='text-center'>{props.data.cgst_amt}</td>
                                            </tr>
                                            <tr style={{ lineHeight: "16px" }}>
                                                <th className='text-right'  >SGST</th>
                                                <td className='text-center'>{props.data.sgst_amt}</td>
                                            </tr>
                                            <tr id='billborderbottom' style={{ lineHeight: "16px" }} >
                                                <th className='text-right'  >IGST</th>
                                                <td className='text-center'>{props.data.igst_amt}</td>
                                            </tr>
                                            <tr id='billborderbottom' >
                                                <th className='text-right'>Bill Amount</th>
                                                <td className='text-center'>{props.data.bill_amt}</td>
                                            </tr>
                                            <tr id='billborderbottom'>
                                                <th className='text-right' >TDS@ {props.data.tds_per}%</th>
                                                <td className='text-center'>{props.data.tds_amt}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-right' >Total Booked Amt</th>
                                                <td className='text-center'>{props.data.total_bill_amt}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='bill-footerdiv d-flex pt-3 pl-3' style={{ borderTop: "1px solid #000" }}>
                                    <h4>Naration: </h4>
                                    <h5 className='mt-1'>{props.data.remarks}</h5>

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

export default EditPreviewBill;