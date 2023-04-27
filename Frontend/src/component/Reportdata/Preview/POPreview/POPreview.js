import React, { useRef, useEffect, useState } from 'react'
import './PoPreview.css'
import DecamalNumber from 'decimal-number-to-words';
import jsPDF from "jspdf";
import { getPoDetailsPreview, getSubPoDetailsPreview, showOrganisation, ActiveSelectedVendor, showLocation } from '../../../../api/index'
import LoadingPage from '../../../loadingPage/loadingPage';

const POPreview = ({ponum}) => {
    const pdfRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({})
    const [subpo, setSubPo] = useState([])
    const [orgdata, setOrgdata] = useState([]);
    const [vendordata, setVendordata] = useState([]);
    const [locationdata, setLocationdata] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const preview = ponum
            const org = localStorage.getItem('Organisation')

            const result = await getPoDetailsPreview(org, preview)
            setData(result[0])
            const result1 = await getSubPoDetailsPreview(org, preview)
            setSubPo(result1)

            const orgdata = await showOrganisation(localStorage.getItem('Organisation'))
            setOrgdata(orgdata)

            const vendordata = await ActiveSelectedVendor(org, result[0].vendor_id);
            setVendordata(vendordata[0])

            const locationdata = await showLocation(org, result[0].po_location);
            setLocationdata(locationdata)
            setLoading(true)
        }
        fetch()

    }, [ponum])

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`PurchaseOrder-${data.po_number}.pdf`);
            },
            html2canvas: { scale: 0.233 },
            margin: [5, 0, 0, 5],


        });
    };
    return (
        <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog   modal-lg" role="document" >
                <div className="modal-content modelbillcard" >
                    {
                        loading ?
                            <>
                                <div className="modal-body" ref={pdfRef}>
                                    <div className="podiv_for_border" style={{ letterSpacing: '0.1px' }}>
                                        <div className="po_head_div d-flex justify-content-between border border-dark">
                                            <div className="po_company_logo">
                                                <img src={orgdata.org_logo} alt='Organisation Logo' />
                                            </div>
                                            <div className="po_company_details">
                                                <h3 className='my-2'>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                                <p className='mb-0'>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                                <p>GSTIN : {orgdata.org_gst}</p>
                                            </div>
                                        </div>
                                        <div className="purchases_order">
                                            <h1 className='mb-0 po_h1 text-center'>Purchase Order</h1>
                                            <table id="po_first_table">
                                                <tbody>
                                                    <tr >
                                                        <td><strong>Vendor Name :</strong> {vendordata.vend_name}</td>
                                                        <td><strong> Address :</strong> {locationdata.location_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Purchase Order No. :</strong> {data.po_number}</td>
                                                        <td><strong>Purchase Order Date :</strong> {data.po_date}</td>
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

                                                        subpo.map((item, index) => (
                                                            <tr key={index} className='text-center'>
                                                                <td>{index + 1}</td>
                                                                <td>{item.items}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.rate}</td>
                                                                <td>{item.amount}</td>
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
                                                            <td><strong> INR {data.poamount}</strong></td>
                                                        </tr>
                                                        <tr style={{ borderBottom: 'none' }}>
                                                            <td><strong>Total Amount in words : </strong></td>
                                                            <td>{DecamalNumber.toWords(Number(data.poamount)).toUpperCase()} Only</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
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
                            </>
                            : <LoadingPage />
                    }

                </div>
            </div>
        </div>
    )
}

export default POPreview
