import React, { useRef } from 'react'
import './PreviewBill.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";


const PreviewBill = () => {
    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        //     const doc = new jsPDF();
        //     doc.html(content, {
        //       callback: function (doc) {
        //           doc.save(`Invoice-${props.Allinvoicedata.TaxInvoice}.pdf`);
        //       },
        //       html2canvas: { scale: 0.21 },
        //       margin:[5,0,0,5],


        //   });
    };

    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                <div className="modal-dialog   modal-lg" role="document" >
                    <div className="modal-content modelbillcard" >

                        <div className="modal-body" ref={pdfRef}>
                            <div className="modalbill">
                                <div className="bill-orgname" style={{ borderBottom: "2px dotted Black", padding: "10px 0px" }}>
                                    <div className="toporgname" style={{ textAlign: "center", width: "60%", margin: "auto" }}>
                                        <h5>AWL India PVT Ltd.</h5>
                                        <p>
                                            AWL INDIA PVT LTD
                                            ADDRESS-GROUND FLOOR,TOWER B,VATIKA ATRIUM <br />GOLF COURSE  ROAD SECTOR 53,GURGOAN
                                        </p>
                                        <div className="billorgbottomdiv"><b>Purchase Voucher</b></div>
                                    </div>
                                </div>
                                <div className='bill-detail' style={{ display: 'flex' }}>
                                    <div className='left-bill-detail' style={{ width: "49%" }}>
                                        <table>
                                            <tr >
                                                <td >Purchase Voucher No :</td>
                                                <td >PJ230001980</td>
                                            </tr>
                                            <tr >
                                                <td >Dated :</td>
                                                <td >2022-09-07</td>
                                            </tr>
                                            <tr >
                                                <td >Pay To M/s :</td>
                                                <td >GOPAL INFRACON PROJECT PRIVATE LIMITED</td>
                                            </tr>
                                        </table>

                                    </div>
                                    <div className='right-bill-detail ml-2' style={{ width: "48%" }}>
                                        <table >

                                            <tr >
                                                <td >Vide/Cash/Cheque/DD: </td>
                                                <td >GIP173/22-23/024</td>
                                            </tr>
                                            <tr >
                                                <td >Invoice Date:</td>
                                                <td > 2022-09-01</td>
                                            </tr>
                                        </table>

                                    </div>

                                </div>

                                <div className='bill-items pb-3' >
                                    <table className='table'>
                                        <tr>
                                            <th>SNO.</th>
                                            <th>GL Code</th>
                                            <th>GL Description</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>70101001</td>
                                            <td>STORAGE & WAREHOUSING  CHARGES</td>
                                            <td>STORAGE & WAREHOUSING  CHARGES</td>
                                            <td>230000.00</td>
                                        </tr>
                                    </table>

                                </div>
                                <hr />

                                <div className='bill-bottomdetail' style={{ border: "2px solid red" }}>
                                    <table className='table table-borderless'>
                                        <tr>
                                            <th>Net Amount</th>
                                            <td>230000.00</td>
                                        </tr>
                                        <tr>
                                            <th>CGST</th>
                                            <td>20700.00</td>
                                        </tr>
                                        <tr>
                                            <th>SGST</th>
                                            <td>20700.00</td>
                                        </tr>
                                        <tr>
                                            <th>IGST</th>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <th>Invoice Amount</th>
                                            <td>271400.00</td>
                                        </tr>
                                        <tr>
                                            <th>TDS@ 10%</th>
                                            <td>23000.00</td>
                                        </tr>
                                        <tr>
                                            <th>Total Booked Amt</th>
                                            <td>23000.00</td>
                                        </tr>
                                    </table>

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

export default PreviewBill;