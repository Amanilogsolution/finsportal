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
                                <div className="bill-orgname" style={{ borderBottom: "2px dotted Black", padding: "10px 0px 0px 0px" }}>
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
                                                <th >Purchase Voucher No :</th>
                                                <td >PJ230001980</td>
                                            </tr>
                                            <tr >
                                                <th >Dated :</th>
                                                <td >2022-09-07</td>
                                            </tr>
                                            <tr >
                                                <th >Pay To M/s :</th>
                                                <td >GOPAL INFRACON PROJECT PRIVATE LIMITED</td>
                                            </tr>
                                        </table>

                                    </div>
                                    <div className='right-bill-detail ml-2' style={{ width: "48%" }}>
                                        <table >

                                            <tr >
                                                <th >Vide/Cash/Cheque/DD: </th>
                                                <td >GIP173/22-23/024</td>
                                            </tr>
                                            <tr >
                                                <th >Invoice Date:</th>
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
                                        <tr>
                                            <td>1</td>
                                            <td>70101001</td>
                                            <td>STORAGE & WAREHOUSING  CHARGES</td>
                                            <td>STORAGE & WAREHOUSING  CHARGES</td>
                                            <td>230000.00</td>
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
                                <hr className='m-0' />

                                <div className='bill-bottomdetail d-flex ' style={{justifyContent:"right"}}>

                                    <table className='table table-borderless m-0' style={{ width: "37%",borderTop: "1px solid #000"  }}>
                                        <tr style={{ borderBottom: "1px solid #000" }}>
                                            <th className='text-right' style={{ borderRight: "1px solid #000",borderLeft: "1px solid #000" }} >Net Amount</th>
                                            <td  className='text-center' style={{ width: "200px" }}>230000.00</td>
                                        </tr>
                                        <tr style={{lineHeight:"16px"}}>
                                            <th className='text-right ' style={{ borderRight: "1px solid #000",borderLeft: "1px solid #000"  }} >CGST</th>
                                            <td  className='text-center'>20700.00</td>
                                        </tr>
                                        <tr style={{lineHeight:"16px"}}>
                                            <th className='text-right' style={{ borderRight: "1px solid #000",borderLeft: "1px solid #000" }} >SGST</th>
                                            <td  className='text-center'>20700.00</td>
                                        </tr>
                                        <tr style={{ borderBottom: "1px solid #000",lineHeight:"16px" }} >
                                            <th className='text-right' style={{ borderRight: "1px solid #000",borderLeft: "1px solid #000"  }} >IGST</th>
                                            <td  className='text-center'>0.00</td>
                                        </tr>
                                        <tr style={{ borderBottom: "1px solid #000" }} >
                                            <th className='text-right' style={{ borderRight: "1px solid #000",borderLeft: "1px solid #000"  }} >Invoice Amount</th>
                                            <td  className='text-center'>271400.00</td>
                                        </tr>
                                        <tr style={{ borderBottom: "1px solid #000" }}>
                                            <th className='text-right' style={{ borderRight: "1px solid #000",borderLeft: "1px solid #000"  }} >TDS@ 10%</th>
                                            <td  className='text-center'>23000.00</td>
                                        </tr>
                                        <tr>
                                            <th className='text-right' style={{ borderRight: "1px solid #000" ,borderLeft: "1px solid #000" }} >Total Booked Amt</th>
                                            <td  className='text-center'>23000.00</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className='bill-footerdiv d-flex pt-3 pl-3' style={{ borderTop: "1px solid #000" }}>
                                    <h4>Naration: </h4>
                                    <h5> Being Inv No.GIP173/22-23/024 booked</h5>

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