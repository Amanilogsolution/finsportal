import React, { useRef, useEffect, useState } from 'react'
import DecamalNumber from 'decimal-number-to-words';
import '../../../Customer/SalesOrders/PreviewSalesOrder/PreviewSalesOrder.css'
import jsPDF from "jspdf";
import { getSoDetails, SelectedCustomer, getSubSoDetails, showOrganisation } from '../../../../api'
import LoadingPage from '../../../loadingPage/loadingPage';

const SoPreview = ({ soNum }) => {
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([])
    const [items, setItems] = useState([])
    const [orgdata, setOrgdata] = useState([]);
    const [custName, setCustName] = useState('')

    const pdfRef = useRef(null);
    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`SalesOrder-${soNum}.pdf`);
            },
            html2canvas: { scale: 0.253 },
            margin: [5, 0, 0, 5],
        });
    };

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');

            const Sodata = await getSoDetails(org, soNum)
            setData(Sodata[0])

            const cust_name = await SelectedCustomer(org, Sodata[0].cust_id)
            setCustName(cust_name.cust_name)
            console.log('cust_name', cust_name)

            const Sosubdata = await getSubSoDetails(org, soNum)
            setItems(Sosubdata)
            console.log('Sosubdata', Sosubdata)

            const orgdata = await showOrganisation(localStorage.getItem('Organisation'))
            setOrgdata(orgdata)
            console.log('orgdata', orgdata)
            setLoading(true)

        }
        fetchdata()
    }, [soNum])
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="salesOrderPreview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg soPreview-modal " role="document">
                    <div className="modal-content ">
                        {
                            loading ?
                                <>
                                    <div className="modal-body" ref={pdfRef}>
                                        <div className="so-main_div m-auto" style={{ letterSpacing: '0.1px' }}>
                                            <div className="sodiv_for_border">
                                                <div className="so-head_div d-flex border border-dark">
                                                    <div className="so_company_logo">
                                                        <img src={orgdata.org_logo} alt='Organisation Logo' />
                                                    </div>
                                                    <div className="so_company_details">
                                                        <h3>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</h3>
                                                        <p>{orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                                        <p>GSTIN : {orgdata.org_gst}</p>
                                                    </div>
                                                </div>
                                                <div className="sales_order">
                                                    <h1 className='mb-0 border-top-0 text-center'>Sales Order</h1>
                                                    <div>
                                                        <div className='d-flex border-top-0'>
                                                            <div className='w-50 sales_order_cust_inner1  px-2 py-2'><strong>Customer Name:</strong>{custName}</div>
                                                            <div className='w-50 sales_order_cust_inner1  px-2 py-2'><strong>Address:</strong> {data.cust_addressid} </div>
                                                        </div>
                                                        <div className=' d-flex'>
                                                            <div className='w-50 sales_order_cust_inner1 sales_order_cust_inner2 px-2 py-2'><strong>Sales Order No:</strong> {soNum}</div>
                                                            <div className='w-50 sales_order_cust_inner1 sales_order_cust_inner2 px-2 py-2'><strong>Sales Order Date:</strong> {data.sodate} </div>
                                                        </div>
                                                    </div>
                                                    <table id="so_second_table" className='text-center' style={{ width: '100%' }}>
                                                        <thead style={{ background: "#cccccc" }}>
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
                                                                    <td>{item.item}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td>{item.rate}</td>
                                                                    <td>{item.net_amt}</td>
                                                                    <td>{item.gst_rate}</td>
                                                                    <td>{item.gst_amt}</td>
                                                                    <td>{item.unit}</td>
                                                                    <td>{item.total_amt}</td>

                                                                </tr>)
                                                            })}


                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="Total_so_div p-2">
                                                    <strong>Total Amount Value (In Figure)</strong>
                                                    <strong className='float-right'>{data.total_amt}</strong>
                                                </div>
                                                <div className="Total_so_div p-2">
                                                    <strong>Total Amount Value (In Words)</strong>
                                                    <strong className='float-right'>{DecamalNumber.toWords(Number(data.total_amt)).toUpperCase()} Only</strong>
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
                                                                <td>{data.gst_rate}</td>
                                                                <td>{data.gst_amt}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="Total_so_div p-2">
                                                    <strong>Remarks :</strong> {data.remark}
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
                                </>
                                : <LoadingPage />
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default SoPreview;