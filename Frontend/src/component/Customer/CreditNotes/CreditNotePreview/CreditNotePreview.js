import React, { useEffect, useState,useRef } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import { showOrganisation } from '../../../../api'
import './CreditNotePreview.css'
import jsPDF from "jspdf";

const CreditNotePreview = ({ ChargeCodeSub, data, location, custname }) => {
    const [orgdata, setOrgdata] = useState([])

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
        }
        fetchdata()
    }, [])

console.log('wnl',ChargeCodeSub, data, location, custname)
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg cnPreview-modal " role="document">
                    <div className="modal-content">
                        <div className="modal-body" ref={pdfRef}>
                            <div className="cn-main_div m-auto">
                                <div className="div_for_border">
                                    <div className="cn-head_div d-flex border border-dark">
                                        <div className="company_logo">
                                            <img src={orgdata.org_logo} alt='Organisation Logo' />
                                        </div>
                                        <div className="company_details">
                                            <h3>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                            <p>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
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
                                                    <strong>Name: {custname}</strong><br />
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
                                                    <strong>Name: {custname}</strong><br />
                                                    <strong>Address: </strong><br />
                                                    GSTIN:
                                                </div>
                                            </div>
                                        </div>
                                        <table id="second_table" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th rowSpan="2">SNo.</th>
                                                    <th rowSpan="2">Activity</th>
                                                    <th rowSpan="2">Qty</th>
                                                    <th rowSpan="2">Rate</th>
                                                    <th rowSpan="2">Amount</th>
                                                    <th rowSpan="2">Taxable Amt</th>
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
                                                {ChargeCodeSub.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>{item.amount}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
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
                                        <strong>Remarks :</strong>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreditNotePreview;



// <div className='cnPreview-modalContainer'>
// <div className='cnPreview-orgdetail d-flex'>
//     <span className='cn-orgPreviewlogo'>
//         <img className='cn-orgpreviewlogo' src={localStorage.getItem('Orglogo')} alt='' />
//     </span>
//     <span className='cn-orgPreviewdetails'>
//         <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
//         <p> {orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
//         <div className=""><b>GST IN.</b> {orgdata.org_gst}</div>
//     </span>
// </div>
// <div className='cn-detailminiPreview d-flex justify-content-between align-items-center px-4'>
//     <span><span className='font-weight-bold'>Credit Note Date:</span> {data.cndate} </span>
//     <span><span className='font-weight-bold'>Credit Note:</span> {data.cn_no} </span>
//     <span><span className='font-weight-bold'>Amount:</span> {data.net_amt}</span>
// </div>
// <div className='cn-detailsPreview d-flex'>
//     <div className='cn-detailsPreview1 '>
//         <div>
//             <span className='font-weight-bold detail-head' >Customer Name: </span>
//             <span>{custname}</span>
//         </div>
//     </div>
//     <div className='cn-detailsPreview2 '>
//         <div>
//             <span className='font-weight-bold detail-head' >Location: </span>
//             <span>{`${location.location_add1},${location.location_city},${location.location_state},${location.location_country}- ${location.location_pin}`}</span>
//         </div>
//     </div>
// </div>
// <div className='cn-orgPreview-items'>
//     <table className='table table-bordered border border-danger'>
//         <thead>
//             <tr className='text-center'>
//                 <th className='py-1'>Activity</th>
//                 <th className='py-1'>Amount</th>
//                 <th className='py-1'>Pass Amount</th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//                 ChargeCodeSub.map((item, index) => (
//                     <tr key={index}>
//                         <td>{item.item}</td>
//                         <td>{item.amount}</td>
//                         <td>{item.pass_amt}</td>
//                     </tr>
//                 ))
//             }
//         </tbody>
//     </table>

// </div>
// <div className='cn-detailsTotalPreview'>
   
//     <div className='cn-detailsTotalPreviewsub h-100 float-right rounded'>
//         <table className='w-100 m-2'>
//             <tbody>
               
//                 <tr>
//                     <th><h5>Approved Credit Note Amount:  </h5></th>
//                     <th>{data.total_cn_amt}</th>
//                 </tr>
//                 <tr>
//                     <th><h5>Total Pass Amount:  </h5></th>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// </div>
// </div>