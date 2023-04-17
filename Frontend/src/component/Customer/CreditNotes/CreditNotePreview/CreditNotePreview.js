import React, { useEffect, useState } from 'react'
import { showOrganisation } from '../../../../api'
import './CreditNotePreview.css'

const CreditNotePreview = ({ ChargeCodeSub, data, location,custname }) => {
    const [orgdata, setOrgdata] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            let org = localStorage.getItem('Organisation');
            const result = await showOrganisation(org)
            setOrgdata(result)
        }
        fetchdata()
    }, [])

    console.log('nhieh', ChargeCodeSub)
    return (
        <>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg cnPreview-modal " role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className='cnPreview-modalContainer'>
                                <div className='cnPreview-orgdetail d-flex'>
                                    <span className='cn-orgPreviewlogo'>
                                        <img className='cn-orgpreviewlogo' src={localStorage.getItem('Orglogo')} alt='' />
                                    </span>
                                    <span className='cn-orgPreviewdetails'>
                                        <h5><b>{localStorage.getItem('Organisation Name').toLocaleUpperCase()}</b></h5>
                                        <p> {orgdata.org_street} , {orgdata.org_city} , {orgdata.org_state}, {orgdata.org_country}</p>
                                        <div className=""><b>GST IN.</b> {orgdata.org_gst}</div>
                                    </span>
                                </div>
                                <div className='cn-detailminiPreview d-flex justify-content-between align-items-center px-4'>
                                    <span><span className='font-weight-bold'>Credit Note Date:</span> {data.cndate} </span>
                                    <span><span className='font-weight-bold'>Credit Note:</span> {data.cn_no} </span>
                                    <span><span className='font-weight-bold'>Amount:</span> {data.net_amt}</span>
                                </div>
                                <div className='cn-detailsPreview d-flex'>
                                    <div className='cn-detailsPreview1 '>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Customer Name: </span>
                                            <span>{custname}</span>
                                        </div>
                                        {/* <div>
                                            <span className='font-weight-bold detail-head' >Credit Note: </span>
                                            <span>{data.cn_no}</span>
                                        </div> */}
                                        {/* <div>
                                            <span className='font-weight-bold detail-head' >Invoice Date: </span>
                                            <span>{data.inv_Date}</span>
                                        </div> */}
                                    </div>
                                    <div className='cn-detailsPreview2 '>
                                        <div>
                                            <span className='font-weight-bold detail-head' >Location: </span>
                                            <span>{`${location.location_add1},${location.location_city},${location.location_state},${location.location_country}- ${location.location_pin}`}</span>
                                        </div>
                                        {/* <div>
                                            <span className='font-weight-bold detail-head' >Credit Note: </span>
                                            <span>{data.cn_no}</span>
                                        </div> */}

                                    </div>
                                </div>
                                <div className='cn-orgPreview-items'>
                                    <table className='table table-bordered border border-danger'>
                                        <thead>
                                            <tr className='text-center'>
                                                <th className='py-1'>Activity</th>
                                                {/* <th className='py-1'>Charge Code</th> */}
                                                <th className='py-1'>Amount</th>
                                                {/* <th className='py-1'>Amount Balance</th> */}
                                                <th className='py-1'>Pass Amount</th>
                                                {/* <th className='py-1'>Remark</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ChargeCodeSub.map((item, index) => (
                                                    <tr key={index}>
                                                        {/* <td>{item.activity}</td> */}
                                                        <td>{item.item}</td>
                                                        <td>{item.amount}</td>
                                                        {/* <td>{item.balance_amt}</td> */}
                                                        <td>{item.pass_amt}</td>
                                                        {/* <td>{item.remark}</td> */}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                                <div className='cn-detailsTotalPreview'>
                                    {/* <div className=''>
                                        <label>Remark</label>
                                        <textarea ></textarea>
                                    </div> */}
                                    <div className='cn-detailsTotalPreviewsub h-100 float-right rounded'>
                                        <table className='w-100 m-2'>
                                            <tbody>
                                                {/* <tr>
                                                    <th><h5>Net Amount: </h5></th>
                                                    <th>{data.total_amt}</th>
                                                </tr> */}
                                                <tr>
                                                    <th><h5>Approved Credit Note Amount:  </h5></th>
                                                    <th>{data.total_cn_amt}</th>
                                                </tr>
                                                <tr>
                                                    <th><h5>Total Pass Amount:  </h5></th>
                                                    {/* <th>{data.net_amt}</th> */}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success">Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreditNotePreview;