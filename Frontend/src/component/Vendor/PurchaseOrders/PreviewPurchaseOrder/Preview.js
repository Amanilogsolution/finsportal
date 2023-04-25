import React, { useEffect, useRef, useState } from 'react'
import './Preview.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { showOrganisation } from '../../../../api'


const PreviewPO = (props) => {
    const [orgdata, setOrgdata] = useState([])
    const pdfRef = useRef(null);

    useEffect(() => {
        const fetchdata = async () => {
            let org = localStorage.getItem('Organisation');
            const result = await showOrganisation(org)
            setOrgdata(result)
        }
        fetchdata()
    }, [])

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`PurchaseOrder-${props.data.po_number}.pdf`);
            },
            html2canvas: { scale: 0.23 },
            margin: [5, 0, 0, 6],
        });
    };
    
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                <div className="modal-dialog   modal-lg" role="document" >
                    <div className="modal-content modelbillcard" >

                        <div className="modal-body" ref={pdfRef}>
                            <div className="podiv_for_border">
                                <div className="po_head_div d-flex justify-content-between border border-dark">
                                    <div className="po_company_logo">
                                        <img src={orgdata.org_logo} alt='Organisation Logo' />
                                    </div>
                                    <div className="po_company_details">
                                        <h3>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                        <p>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                        <p>GSTIN : {orgdata.org_gst}</p>
                                    </div>
                                </div>
                                <div className="purchases_order">
                                    <h1 className='mb-0 po_h1 text-center'>Purchase Order</h1>
                                    <table id="po_first_table">
                                        <tbody>
                                            <tr >
                                                <td><strong>Vendor Name :</strong> {props.data.vendor_name}</td>
                                                <td><strong> Address :</strong> {props.data.po_location}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Purchase Order No. :</strong> {props.data.po_number}</td>
                                                <td><strong>Purchase Order Date :</strong> {props.data.po_date}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='items_top_div'></div>
                                    <table id="items_table" style={{ width: '100%' }}>
                                        <tbody>
                                            <tr className='text-center'>
                                                <th>SNo.</th>
                                                <th>Item</th>
                                                <th>Qty</th>
                                                <th>Rate</th>
                                                <th>Amount</th>
                                                <th>Unit</th>
                                            </tr>
                                            {

                                                props.Allitems.map((item, index) => (
                                                    <tr key={index} className='text-center'>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.rate}</td>
                                                        <td>{item.amt}</td>
                                                        <td>{item.unit}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody></table>

                                    <div className="Grand_po_Order border border-dark border-top-0 border-left-0">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Total Amount in Numbers :</strong></td>
                                                    <td><strong> INR {props.data.poamount}</strong></td>
                                                </tr>
                                                <tr style={{ borderBottom: 'none' }}>
                                                    <td><strong>Total Amount in words : </strong></td>
                                                    <td>{DecamalNumber.toWords(Number(props.data.poamount)).toUpperCase()} Only</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="total_po_amount d-flex border border-dark border-top-0">
                                        <strong className='total_po_amount_text mx-3 my-3' >Total</strong>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Amount : ₹ 40500.00</strong></td>
                                                    <td><strong>GST : 18%</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> */}
                                    <div className="Total_div px-2 py-3">
                                        <strong>Signature of Authorizated Representative :</strong>
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

export default PreviewPO