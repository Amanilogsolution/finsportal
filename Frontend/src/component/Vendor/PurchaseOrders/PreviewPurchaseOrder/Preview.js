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
            html2canvas: { scale: 0.233 },
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
                                                <td><strong>Vendor Name :</strong> {props.data.vendor_id}</td>
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




{/* <div className="modalbill border border-dark">

<div className="bill-orgname d-flex justify-content-around align-items-center " >
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
<div className="billorgbottomdiv text-center"><h5 className='m-0 font-weight-bold'>Purchase Order</h5></div>
<div className='bill-detail d-flex'>
    <div className='left-bill-detail' style={{ width: "49%" }}>
        <table>
            <tbody>
                <tr >
                    <th >PO No :</th>
                    <td >{props.data.po_number}</td>
                </tr>
                <tr >
                    <th >Dated :</th>
                    <td >{props.data.po_date}</td>
                </tr>
               
            </tbody>
        </table>

    </div>
    <div className='right-bill-detail ml-2' style={{ width: "48%" }}>
        <table >
            <tbody>
                <tr >
                    <th >Vendor Name: </th>
                    <td >{props.data.vendor_id}</td>
                </tr>
                <tr >
                    <th >Location:</th>
                    <td > {props.data.po_location}</td>
                </tr>
            </tbody>
        </table>

    </div>

</div>

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
        
            props.Allitems.map((item, index) => (
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

<div className='bill-bottomdetail d-flex justify-content-end' >

    <table className='table table-borderless m-0' >
    <tbody>
        <tr id='billborderbottom'>
            <th className='text-right'  >Net Amount</th>
            <td className='text-center'>{props.data.poamount}</td>
        </tr>
       
   
     
     
     
        </tbody>
    </table>
</div>
<div className='bill-footerdiv d-flex pt-3 pl-3' style={{ borderTop: "1px solid #000" }}>
    <h4>Naration: </h4>
</div>
</div> */}