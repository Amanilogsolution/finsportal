import React, { useRef } from 'react'
import './PreviewBill.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";


const PreviewBill = (props) => {
    const pdfRef = useRef(null);

     console.log(' data',props.data)
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
                                        {localStorage.getItem('Organisation Name').toLocaleUpperCase()} &nbsp;
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
                                                <td >{props.data.voucher_no}</td>
                                            </tr>
                                            <tr >
                                                <th >Dated :</th>
                                                <td >{props.data.voucher_date}</td>
                                            </tr>
                                            <tr >
                                                <th >Pay To :</th>
                                                <td >{props.data.pay_to}</td>
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
                                                <td > {props.data.invoice_date}</td>
                                            </tr>
                                        </table>

                                    </div>

                                </div>

                                <div className='bill-items '>
                                    <table className='table items-table table-borderless m-0' >
                                        <tr className='billitemrow'>
                                            <th className='first-col billitem'>SNO.</th>
                                            <th className='second-col billitem'>Item</th>
                                            <th className='third-col billitem'>Quantity</th>
                                            <th className='four-col billitem'>Rate</th>
                                            <th className='five-col billitem'>Amount</th>
                                            <th className='six-col billitem'>Deduction</th>
                                            <th className='seven-col billitem'>Unit</th>
                                            <th className='eight-col billitem'>Net Amt</th>
                                        </tr>
                                        <tr  className='billitemrow'>
                                            <td className='first-col billitem'>1</td>
                                            <td className='second-col billitem'>70101001</td>
                                            <td className='third-col billitem'>15</td>
                                            <td className='four-col billitem'>15</td>
                                            <td className='five-col billitem'>230000.00</td>
                                            <td className='six-col billitem'>Deduction</td>
                                            <td className='seven-col billitem'>Box</td>
                                            <td className='eight-col billitem'>230000.00</td>

                                        </tr>
                                        <tr  className='billitemrow' >
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
                                {/* <hr className='m-0' /> */}

                                <div className='bill-bottomdetail d-flex justify-content-end' >

                                    <table className='table table-borderless m-0' >
                                        <tr id='billborderbottom'>
                                            <th className='text-right'  >Net Amount</th>
                                            <td className='text-center'>{props.data.net_amt}</td>
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
                                            <th className='text-right'>Invoice Amount</th>
                                            <td className='text-center'>{props.data.invoice_amt}</td>
                                        </tr>
                                        <tr id='billborderbottom'>
                                            <th className='text-right' >TDS@ {props.data.tds_per}%</th>
                                            <td className='text-center'>{props.data.tds_amt}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-right' >Total Booked Amt</th>
                                            <td className='text-center'>{props.data.net_amt}</td>
                                        </tr>
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

export default PreviewBill;