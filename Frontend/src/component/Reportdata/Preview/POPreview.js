import React, { useRef, useEffect, useState } from 'react'
import './PoPreview.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { getPoDetailsPreview,getSubPoDetailsPreview } from '../../../api/index'


const POPreview = () => {
    const pdfRef = useRef(null);
    const [data, setData] = useState({})
    const [subinv, setSubPo] = useState([])
    // const [activity, setActivity] = useState('')

    useEffect(() => {
        const fetch = async () => {
          const preview = localStorage.getItem('preview')
          const org = localStorage.getItem('Organisation')
          console.log(preview,org)
          const result = await getPoDetailsPreview(org, preview)
          console.log(result[0])
          setData(result[0])
          const result1 = await getSubPoDetailsPreview(org, preview)
          console.log(result1)
          setSubPo(result1)
        //   setActivity(activity_code)
        //   const result1 = await GetSubInvoice(org, preview)
        //   setSubInv(result1)
        }
        fetch()

    }, [localStorage.getItem('preview')])

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Invoice.pdf`);
            },
            html2canvas: { scale: 0.21 },
            margin: [5, 0, 0, 5],


        });
    };
    return (
        <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog   modal-lg" role="document" >
                <div className="modal-content modeldivcard" >
                    <div className="modal-body text-dark" ref={pdfRef}>
                        <div className="modalinvoice">
                            <div className="topdiv mb-4">
                                <div className="topinnerdiv">
                                    <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                                    <p>
                                        {localStorage.getItem('Organisation Name').toLocaleUpperCase()} &nbsp;
                                        ADDRESS-GROUND FLOOR,TOWER B,VATIKA ATRIUM <br />GOLF COURSE  ROAD SECTOR 53,GURGOAN
                                    </p>
                                </div>
                            </div>
                            <hr />

                            <div className='bill-detail d-flex'>
                                <div className='left-bill-detail' style={{ width: "49%" }}>
                                    <table>
                                        <tbody>
                                            <tr >
                                                <th >PO No :</th>
                                                <td >{data.po_number}</td>
                                            </tr>
                                            <tr >
                                                <th >Dated :</th>
                                                <td >{data.po_date}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className='right-bill-detail ml-2' style={{ width: "48%" }}>
                                    <table >
                                        <tbody>
                                            <tr >
                                                <th >Vendor Name: </th>
                                                <td >{data.vendor_id}</td>
                                            </tr>
                                            <tr >
                                                <th >Location:</th>
                                                <td > {data.po_location}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            {/* Detail */}

                            {/* Second Table Start */}
                            <div className='bill-items '>
                                <table className='table items-table table-borderless m-0' >
                                    <tbody>
                                        <tr className='billitemrow'>
                                            <th className='first-col billitem text-center'>SNO.</th>
                                            <th className='second-col billitem text-center'>Location</th>
                                            <th className='third-col billitem text-center'>Item</th>
                                            <th className='four-col billitem text-center'>Quantity</th>
                                            <th className='five-col billitem text-center'>Rate</th>
                                            <th className='six-col billitem text-center'>Amount</th>
                                            <th className='seven-col billitem text-center'>Unit</th>
                                        </tr>
                                        {
                                        
                                        subinv.map((item, index) => (
                                            <tr key={index} className='billitemrow'>
                                                <td className='first-col billitem text-center'>{index + 1}</td>
                                                <td className='second-col billitem text-center'>{item.location}</td>
                                                <td className='third-col billitem text-center'>{item.items}</td>
                                                <td className='four-col billitem text-center'>{item.quantity}</td>
                                                <td className='five-col billitem text-center'>{item.rate}</td>
                                                <td className='six-col billitem text-center'>{item.amount}</td>
                                                <td className='seven-col billitem text-center'>{item.unit}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            {/* Second Table  End*/}

                            <div className='bill-bottomdetail d-flex justify-content-end' >
                                <table className='table table-borderless m-0' >
                                    <tbody>
                                        <tr id='billborderbottom'>
                                            <th className='text-right'  >Net Amount</th>
                                            <td className='text-center'></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        <button type="button" className="btn btn-success" onClick={print}>Print</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default POPreview
