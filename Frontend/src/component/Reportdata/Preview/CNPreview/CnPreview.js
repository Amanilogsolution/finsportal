import React, { useEffect, useState, useRef } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import { showOrganisation } from '../../../../api'
import '../../../Customer/CreditNotes/CreditNotePreview/CreditNotePreview.css'
import jsPDF from "jspdf";
import { getCNData, GetInvoice, locationAddress, GetSubInvoice, SelectCnSubDetails } from '../../../../api'
import LoadingPage from '../../../loadingPage/loadingPage'

const CnPreview = ({ cnSNum }) => {
    const [loading, setLoading] = useState(false)
    const [orgdata, setOrgdata] = useState([])
    const [data, setData] = useState([])
    const [subDetails, setSubDetails] = useState([])
    const [invoicedata, setInvoiceData] = useState({})
    const [location, setLocation] = useState([])

    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Invoice-${data.cn_no}.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };
    useEffect(() => {
        const fetchdata = async () => {
            let org = localStorage.getItem('Organisation');
            const result = await showOrganisation(org)
            setOrgdata(result)
            // console.log('nkj', cnSNum)
            const cn_result = await getCNData(org, cnSNum)
            setData(cn_result)
            // console.log('cnData', cn_result)
            const Invoice = await GetInvoice(org, cn_result.inv_no)
            setInvoiceData(Invoice[0])
            // console.log('bjkbnkjn', Invoice[0])
            const result1 = await GetSubInvoice(org, cn_result.inv_no)
            const result2 = await locationAddress(org, cn_result.location)
            setLocation(result2)
            // console.log('kiou', org, cn_result.cn_no, cn_result.inv_no, result1.length)
            const Subdata = await SelectCnSubDetails(org, cn_result.cn_no, cn_result.inv_no, result1.length)
            setSubDetails(Subdata)
            // console.log('wnjknkl', Subdata)
            setLoading(true)
        }
        fetchdata()
    }, [cnSNum])

    return (
        <>
            <div className="modal fade bd-example-modal-lg " id="CNPreviewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-lg cnPreview-modal " role="document">

                    <div className="modal-content">
                        {
                            loading ?
                                <>
                                    <div className="modal-body" ref={pdfRef}>
                                        <div className="cn-main_div m-auto">
                                            <div className="div_for_border">
                                                <div className="cn-head_div d-flex border border-dark">
                                                    <div className="company_logo">
                                                        <img src={orgdata.org_logo} alt='Organisation Logo' />
                                                    </div>
                                                    <div className="company_details">
                                                        <h3 className='my-2'>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                                        <p className='mb-0'>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                                        <p>GSTIN : {orgdata.org_gst}</p>
                                                    </div>
                                                </div>
                                                <div className="credit_Note">
                                                    <h1 className='mb-0 border-top-0 border-bottom-0 text-center'>Credit Note</h1>
                                                    <table id="cn_first_table" >
                                                        <tbody>
                                                            <tr>
                                                                <td><strong>Document No: </strong>{data.cn_no}</td>
                                                                <td><strong>Against Invoice : </strong>{data.inv_no}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Date of issue: </strong>{data.cndate}</td>
                                                                <td><strong>Invoice Date : </strong>{data.inv_Date}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="cn_bill_ship d-flex">
                                                        <div className="cn_bill">
                                                            <h3 className='text-center' style={{ borderBottom: '1px solid' }}>Bill to party</h3>
                                                            <div className='px-2'>
                                                                <strong>Name: {invoicedata.consignee}</strong><br />
                                                                <strong>Address: </strong>
                                                                {location.location_add1},{location.location_city}, {location.location_state},
                                                                {location.location_country} - {location.location_pin}
                                                                <br />
                                                                <strong>GSTIN: </strong>{location.gstin_no}
                                                            </div>
                                                        </div>
                                                        <div className="ship">
                                                            <h3 className='text-center' style={{ borderBottom: '1px solid' }}>Ship to party</h3>
                                                            <div className='px-2'>
                                                                <strong>Name: {invoicedata.consignee}</strong><br />
                                                                <strong>Address: </strong><br />
                                                                GSTIN:
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <table id="second_table" style={{ width: '100%' }}>
                                                        <thead className='text-center'>
                                                            <tr>
                                                                <th rowSpan="2">SNo.</th>
                                                                <th rowSpan="2">Activity</th>
                                                                <th rowSpan="2">Amount</th>
                                                                <th rowSpan="2">Pass Amt</th>
                                                                <th colSpan="2">CGST </th>
                                                                <th colSpan="2">SGST </th>
                                                                <th colSpan="2">IGST </th>
                                                            </tr>
                                                            <tr>
                                                                <th> Rate</th>
                                                                <th> Amt</th>
                                                                <th> Rate</th>
                                                                <th> Amt</th>
                                                                <th> Rate</th>
                                                                <th> Amt</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {subDetails.map((item, index) => {
                                                                return (<tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.items}</td>
                                                                    <td>{item.amt}</td>
                                                                    <td>{item.pass_amt}</td>
                                                                    <td>{item.cgst_rate}</td>
                                                                    <td>{item.cgst_amt}</td>
                                                                    <td>{item.sgst_rate}</td>
                                                                    <td>{item.sgst_amt}</td>
                                                                    <td>{item.igst_rate}</td>
                                                                    <td>{item.igst_amt}</td>
                                                                </tr>)
                                                            })}


                                                        </tbody></table>
                                                </div>
                                                <div className="Total_div p-2">
                                                    <strong>Total Amount Value (In Figure)</strong>
                                                    <strong className='float-right'>{data.total_cn_amt}</strong>
                                                </div>
                                                <div className="Total_div p-2">
                                                    <strong>Total Amount Value (In Words)</strong>
                                                    <strong className='float-right'>{DecamalNumber.toWords(Number(data.total_cn_amt)).toUpperCase()} Only</strong>
                                                </div>
                                                <div className="Amount_tax d-flex ">
                                                    <strong style={{ margin: '12px 5px' }}>Amount Of Tax:</strong>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td><strong>CGST AMT</strong></td>
                                                                <td><strong>SGST AMT</strong></td>
                                                                <td><strong>IGST AMT</strong></td>
                                                                <td><strong>TOTAL</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td>0</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="Total_div px-2">
                                                    <strong>Remarks :</strong>{data.remark}
                                                </div>
                                                <div className="Total_div px-2">
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
        </>
    )
}

export default CnPreview;