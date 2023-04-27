import React, { useRef, useEffect, useState } from 'react'
import '../../../Vendor/Bills/PreviewBill/PreviewBill'
import jsPDF from "jspdf";
import { memo } from "react";
import { GetBillData, GetSubBillItems, showOrganisation } from '../../../../api'
import LoadingPage from '../../../loadingPage/loadingPage';


const BillPreview = (props) => {
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([])
    const [items, setItems] = useState([])
    const [netamt, setNetamt] = useState('')
    const [orgdata, setOrgdata] = useState([]);

    const pdfRef = useRef(null);

    const print = (e) => {
        e.preventDefault();
        const content = pdfRef.current;
        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save(`Bill-${data.vourcher_no}.pdf`);
            },
            html2canvas: { scale: 0.233 },
            margin: [5, 0, 0, 6],
        });
    };

    useEffect(() => {
        const fetchdata = async () => {
            const result = await GetBillData(localStorage.getItem('Organisation'), props.vouno)
            setData(result)

            const itemsData = await GetSubBillItems(localStorage.getItem('Organisation'), props.vouno)
            setItems(itemsData)

            let net_amt = 0;
            itemsData.map((item, index) => { net_amt = net_amt + Number(item.net_amt) })
            setNetamt(net_amt)

            const orgdata = await showOrganisation(localStorage.getItem('Organisation'))
            setOrgdata(orgdata)
            setLoading(true)

        }
        fetchdata()
    }, [props])
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

                <div className="modal-dialog   modal-lg" role="document" >
                    <div className="modal-content modelbillcard" >
                        {
                            loading ?
                                <>
                                    <div className="modal-body" ref={pdfRef}>
                                        <div className="modalbill border border-dark">

                                            <div className="bill-orgname d-flex justify-content-around align-items-center " >
                                                <div>
                                                    <img className='billorglogo' src={localStorage.getItem('Orglogo')} alt='' />
                                                </div>
                                                <div className="toporgname text-center " >
                                                    <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                                                    <p>
                                                        {orgdata.org_street},{orgdata.org_city},{orgdata.org_state},{orgdata.org_country}
                                                    </p>

                                                </div>
                                            </div>
                                            <div className="billorgbottomdiv text-center"><h5 className='m-0 font-weight-bold'>Purchase Voucher</h5></div>
                                            <div className='bill-detail d-flex'>
                                                <div className='left-bill-detail' style={{ width: "49%" }}>
                                                    <table>
                                                        <tbody>
                                                            <tr >
                                                                <th >Voucher No :</th>
                                                                <td >{data.vourcher_no}</td>
                                                            </tr>
                                                            <tr >
                                                                <th >Date :</th>
                                                                <td >{data.voudate}</td>
                                                            </tr>
                                                            <tr >
                                                                <th >Pay To :</th>
                                                                <td >{data.vend_name}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className='right-bill-detail ml-2' style={{ width: "48%" }}>
                                                    <table >
                                                        <tbody>
                                                            <tr >
                                                                <th >Vide/Cash/Cheque/DD: </th>
                                                                <td >GIP173/22-23/024</td>
                                                            </tr>
                                                            <tr >
                                                                <th >Bill Date:</th>
                                                                <td > {data.billdate}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>

                                            </div>

                                            <div className='bill-items '>
                                                <table className='table items-table table-borderless m-0' >
                                                    <tbody>
                                                        <tr className='billitemrow'>
                                                            <th className='first-col billitem text-center'>Sno.</th>
                                                            <th className='second-col billitem text-center'>Location</th>
                                                            <th className='second-col billitem text-center'>Item</th>
                                                            <th className='third-col billitem text-center'>Quantity</th>
                                                            <th className='four-col billitem text-center'>Rate</th>
                                                            <th className='five-col billitem text-center'>Amount</th>
                                                            <th className='six-col billitem text-center'>Deduction</th>
                                                            <th className='seven-col billitem text-center'>Unit</th>
                                                            <th className='eight-col billitem text-center'>Net Amt</th>
                                                        </tr>
                                                        {
                                                            items.map((item, index) => (
                                                                <tr key={index} className='billitemrow'>
                                                                    <td className='first-col billitem text-center'>{index + 1}</td>
                                                                    <td className='second-col billitem text-center'>{item.location}</td>
                                                                    <td className='second-col billitem text-center'>{item.item_name}</td>
                                                                    <td className='third-col billitem text-center'>{item.qty}</td>
                                                                    <td className='four-col billitem text-center'>{item.rate}</td>
                                                                    <td className='five-col billitem text-center'>{item.amt}</td>
                                                                    <td className='six-col billitem text-center'>{item.deduction}</td>
                                                                    <td className='seven-col billitem text-center'>{item.unit}</td>
                                                                    <td className='eight-col billitem text-center'>{item.net_amt}</td>
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
                                                            <td className='text-center'>{netamt}</td>
                                                        </tr>
                                                        <tr style={{ lineHeight: "16px" }}>
                                                            <th className='text-right '  >CGST</th>
                                                            <td className='text-center'>{data.cgst_amt}</td>
                                                        </tr>
                                                        <tr style={{ lineHeight: "16px" }}>
                                                            <th className='text-right'  >SGST</th>
                                                            <td className='text-center'>{data.sgst_amt}</td>
                                                        </tr>
                                                        <tr id='billborderbottom' style={{ lineHeight: "16px" }} >
                                                            <th className='text-right'  >IGST</th>
                                                            <td className='text-center'>{data.igst_amt}</td>
                                                        </tr>
                                                        <tr id='billborderbottom' >
                                                            <th className='text-right'>Bill Amount</th>
                                                            <td className='text-center'>{data.bill_amt}</td>
                                                        </tr>
                                                        <tr id='billborderbottom'>
                                                            <th className='text-right' >TDS@ {data.tds_per}%</th>
                                                            <td className='text-center'>{data.tds_amt}</td>
                                                        </tr>
                                                        <tr>
                                                            <th className='text-right' >Total Booked Amt</th>
                                                            <td className='text-center'>{data.total_bill_amt}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='bill-footerdiv d-flex pt-3 pl-3' style={{ borderTop: "1px solid #000" }}>
                                                <h4>Naration: </h4>
                                                <h5 className='mt-1'>{data.remarks}</h5>

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

export default memo(BillPreview);