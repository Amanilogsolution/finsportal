import React, { useRef } from 'react'
import './PreviewBill.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";


const PreviewBill = () => {
    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
            const doc = new jsPDF();
            doc.html(content, {
              callback: function (doc) {
                  doc.save(`Purchases Vouchers.pdf`);
              },
              html2canvas: { scale: 0.21 },
              margin:[5,0,0,6],


          });
    };

    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                <div className="modal-dialog   modal-lg" role="document" >
                    <div className="modal-content modelbillcard" >

                        <div className="modal-body" ref={pdfRef}>
                            <div className="modalbill">

                                <div className="bill-orgname d-flex justify-content-around align-items-center" >
                                    <div>
                                        <img className='billorglogo' src={localStorage.getItem('Orglogo')} alt='' />
                                    </div>
                                    <div className="toporgname text-center " >
                                        <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                                        <p>
                                            AWL INDIA PVT LTD
                                            ADDRESS-GROUND FLOOR,TOWER B,VATIKA ATRIUM <br />GOLF COURSE  ROAD SECTOR 53,GURGOAN
                                        </p>

                                    </div>
                                </div>
                                <div className="billorgbottomdiv text-center"><h5 className='m-0 font-weight-bold'>Purchase Voucher</h5></div>
                                <div className='bill-detail d-flex'>
                                    <div className='left-bill-detail' style={{ width: "49%" }}>
                                        <table>
                                            <tr >
                                                <th >Voucher No :</th>
                                                <td >PJ230001980</td>
                                            </tr>
                                            <tr >
                                                <th >Dated :</th>
                                                <td >2022-09-07</td>
                                            </tr>
                                            <tr >
                                                <th >Pay To :</th>
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

                                <div className='bill-items' >
                                    <table className='table items-table'>
                                        <tr>
                                            <th className='first-col billitem'>SNO.</th>
                                            <th className='second-col billitem'>Item</th>
                                            <th className='third-col billitem'>Quantity</th>
                                            <th className='four-col billitem'>Rate</th>
                                            <th className='five-col billitem'>Amount</th>
                                            <th className='six-col billitem'>Deduction</th>
                                            <th className='seven-col billitem'>Unit</th>
                                            <th className='eight-col billitem'>Net Amt</th>
                                        </tr>
                                        <tr>
                                            <td className='first-col billitem'>1</td>
                                            <td className='second-col billitem'>70101001</td>
                                            <td className='third-col billitem'>15</td>
                                            <td className='four-col billitem'>15</td>
                                            <td className='five-col billitem'>230000.00</td>
                                            <td className='six-col billitem'>Deduction</td>
                                            <td className='seven-col billitem'>Box</td>
                                            <td className='eight-col billitem'>230000.00</td>

                                        </tr>
                                        <tr >
                                            <td className='first-col billitem'>1</td>
                                            <td className='second-col billitem'>70101001</td>
                                            <td className='third-col billitem'>15</td>
                                            <td className='four-col billitem'>15</td>
                                            <td className='five-col billitem'>230000.00</td>
                                            <td className='six-col billitem'>Deduction</td>
                                            <td className='seven-col billitem'>Box</td>
                                            <td className='eight-col billitem'>230000.00</td>

                                        </tr>
                                        <tr>
                                            <td className='first-col billitem'>1</td>
                                            <td className='second-col billitem'>70101001</td>
                                            <td className='third-col billitem'>15</td>
                                            <td className='four-col billitem'>15</td>
                                            <td className='five-col billitem'>230000.00</td>
                                            <td className='six-col billitem'>Deduction</td>
                                            <td className='seven-col billitem'>Box</td>
                                            <td className='eight-col billitem'>230000.00</td>

                                        </tr>
                                    </table>

                                </div>
                                <hr className='m-0' />

                                <div className='bill-bottomdetail d-flex justify-content-end' >

                                    <table className='table table-borderless m-0' >
                                        <tr id='billborderbottom'>
                                            <th className='text-right'  >Net Amount</th>
                                            <td className='text-center'>230000.00</td>
                                        </tr>
                                        <tr style={{ lineHeight: "16px" }}>
                                            <th className='text-right '  >CGST</th>
                                            <td className='text-center'>20700.00</td>
                                        </tr>
                                        <tr style={{ lineHeight: "16px" }}>
                                            <th className='text-right'  >SGST</th>
                                            <td className='text-center'>20700.00</td>
                                        </tr>
                                        <tr id='billborderbottom' style={{ lineHeight: "16px" }} >
                                            <th className='text-right'  >IGST</th>
                                            <td className='text-center'>0.00</td>
                                        </tr>
                                        <tr id='billborderbottom' >
                                            <th className='text-right'>Invoice Amount</th>
                                            <td className='text-center'>271400.00</td>
                                        </tr>
                                        <tr id='billborderbottom'>
                                            <th className='text-right' >TDS@ 10%</th>
                                            <td className='text-center'>23000.00</td>
                                        </tr>
                                        <tr>
                                            <th className='text-right' >Total Booked Amt</th>
                                            <td className='text-center'>23000.00</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className='bill-footerdiv d-flex pt-3 pl-3' style={{ borderTop: "1px solid #000" }}>
                                    <h4>Naration: </h4>
                                    <h5 className='mt-1'>Being Inv No.GIP173/22-23/024 booked</h5>

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