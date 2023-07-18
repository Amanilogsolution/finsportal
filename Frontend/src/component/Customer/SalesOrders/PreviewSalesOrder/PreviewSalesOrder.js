import React, {useRef } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import './PreviewSalesOrder.css'
import jsPDF from "jspdf";

const PreviewSalesOrder = ({ somajorData, items, org }) => {
    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`SalesOrder-${somajorData.salesOrder_no}.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="salesOrderPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg soPreview-modal " role="document">
                    <div className="modal-content ">
                        <div className="modal-body" ref={pdfRef}>
                            <div className="so-main_div m-auto" style={{letterSpacing:'0.1px'}}>
                                <div className="sodiv_for_border">
                                    <div className="so-head_div d-flex border border-dark">
                                        <div className="so_company_logo">
                                            <img src={org.org_logo} alt='Organisation Logo' />
                                        </div>
                                        <div className="so_company_details">
                                            <h3 className='so_com_name'>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                            <p>{org.org_street} , {org.org_city} , {org.org_state}, {org.org_country}</p>
                                            <p>GSTIN : {org.org_gst}</p>
                                        </div>
                                    </div>
                                    <div className="sales_order">
                                        <h1 className='mb-0 border-top-0 text-center'>Sales Order</h1>
                                        <div>
                                            <div className='d-flex border-top-0'>
                                                <div className='w-50 sales_order_cust_inner1  p-2'><strong>Customer Name:</strong>{somajorData.customer_name}</div>
                                                <div className='w-50 sales_order_cust_inner1  p-2'><strong>Address:</strong> {somajorData.cust_address} </div>
                                            </div>
                                            <div className=' d-flex'>
                                                <div className='w-50 sales_order_cust_inner1 sales_order_cust_inner2 p-2'><strong>Sales Order No:</strong> {somajorData.salesOrder_no}</div>
                                                <div className='w-50 sales_order_cust_inner1 sales_order_cust_inner2 p-2'><strong>Sales Order Date:</strong> {somajorData.salesOrder_date} </div>
                                            </div>
                                        </div>
                                        <table id="so_second_table" className='text-center' style={{ width: '100%' }}>
                                            <thead style={{background:"#cccccc"}}>
                                                <tr>
                                                    <th rowSpan="2">SNo.</th>
                                                    <th rowSpan="2">Item</th>
                                                    <th rowSpan="2">Qty</th>
                                                    <th rowSpan="2">Rate</th>
                                                    <th rowSpan="2">Amount</th>
                                                    <th colSpan="2">Taxable </th>
                                                    <th rowSpan="2">Unit</th>
                                                    <th rowSpan="2">Total Amt</th>

                                                </tr>
                                                <tr>
                                                    <td>Rate</td>
                                                    <td>Amt</td>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.items}</td>
                                                        <td>{item.Quantity}</td>
                                                        <td>{item.rate}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.taxPer}</td>
                                                        <td>{item.taxAmt}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.total}</td>

                                                    </tr>)
                                                })}


                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>Total Amount Value (In Figure)</strong>
                                        <strong className='float-right'>{somajorData.total_amt}</strong>
                                    </div>
                                    <div className="Total_so_div p-2 so_word_div">
                                        <strong>Total Amount Value (In Words)</strong>
                                        <strong className='float-right'>{DecamalNumber.toWords(Number(somajorData.total_amt)).toUpperCase()} Only</strong>
                                    </div>
                                    <div className="so_Amount_tax d-flex ">
                                        <strong style={{ margin: '12px 5px' }}>Amount Of Tax:</strong>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><strong>GST Rate</strong></td>
                                                    <td><strong>GST AMT</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>{somajorData.total_gst_rate}</td>
                                                    <td>{somajorData.total_gst_amt}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="Total_so_div p-2">
                                        <strong>Remarks :</strong> {somajorData.remark}
                                    </div>
                                    <div className="Total_so_div p-2">
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
            </div >
        </>
    )
}

export default PreviewSalesOrder;