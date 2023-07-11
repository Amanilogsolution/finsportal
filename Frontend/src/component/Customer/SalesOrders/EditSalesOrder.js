import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, SelectedCustomer, ActiveAccountMinorCode, ActiveItems, Activeunit, getSoDetails, getSubSoDetails, EditsalesOrder, showOrganisation, Getfincialyearid, Updatefinancialcount } from '../../../api/index'
import Preview from './PreviewSalesOrder/PreviewSalesOrder'
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';
import './SalesOrder.css'

export default function EditSalesOrder() {
    const [loading, setLoading] = useState(false)
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [itemtoggle, setItemtoggle] = useState([false])
    const [itemsdata, setItemdata] = useState([])
    const [orgdata, setOrgdata] = useState([])

    const [activecustomer, setActiveCustomer] = useState([])
    const [Activeaccount, setActiveAccount] = useState([])
    const [activeunit, setActiveUnit] = useState([])
    const [custAddressLocation, setCustAddressLocation] = useState([])

    const [soData, setSoData] = useState({})
    const [soSubData, setSoSubData] = useState([])
    const [somajorData, setSomajorData] = useState({
        customer_name: '',
        cust_address: '',
        salesOrder_no: '',
        salesOrder_date: '',
        remark: '',
        total_amt: '',
        total_gst_rate: '',
        total_gst_amt: ''
    })
    const [itemsrowval, setItemsrowval] = useState([]);
    const [custName, setCustName] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const so_no = localStorage.getItem('soNo')
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)

            const ActiveAccount = await ActiveAccountMinorCode(org)
            setActiveAccount(ActiveAccount)

            const ActiveUnit = await Activeunit(org)
            setActiveUnit(ActiveUnit)

            const Sodata = await getSoDetails(org, so_no)
            setSoData(Sodata[0])

            const cust_name = await SelectedCustomer(org, Sodata[0].cust_id)
            setCustName(cust_name.cust_name)

            setSomajorData({
                ...somajorData,
                customer_name: cust_name.cust_name,
                cust_address: Sodata[0].cust_addressid,
                salesOrder_no: Sodata[0].so_no,
                salesOrder_date: Sodata[0].sodate,
                remark: Sodata[0].remark,
                total_amt: Sodata[0].total_amt,
                total_gst_rate: Sodata[0].gst_rate,
                total_gst_amt: Sodata[0].gst_amt,
            })
            const Sosubdata = await getSubSoDetails(org, so_no)
            setSoSubData(Sosubdata)

            Sosubdata.map((d, index) => {
                let obj = {
                    items: d.item,
                    taxPer: d.gst_rate,
                    taxAmt: d.gst_amt,
                    taxable: '',
                    Quantity: d.qty,
                    rate: d.rate,
                    unit: d.unit,
                    amount: d.net_amt,
                    total: d.total_amt
                }
                itemsrowval.push(obj)
            })

            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)
            setLoading(true)
        }
        fetchdata()
    }, [])



    const handleSubmit = async (btntype) => {
        setLoading(false)
        if (btntype === 'save') {
            setLoading(true)
            setAlertObj({ type: 'success', text: 'Data Saved', url: '/SaveSalesOrder' })
        }
        else {
            const org = localStorage.getItem('Organisation')
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].so_count) + 1
            let new_so_num = id[0].so_ser + id[0].year + String(lastno).padStart(5, '0')

            const result = await EditsalesOrder(localStorage.getItem('Organisation'), new_so_num, 'post', localStorage.getItem('soNo'));
            setLoading(true)
            if (result === "Updated") {
                await Updatefinancialcount(org, 'so_count', lastno)
                setAlertObj({ type: 'success', text: 'So Posted', url: '/SaveSalesOrder' })
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }
    }
    return (
        <>

            <div className="wrapper">

                <Header />
                {
                    loading ?
                        <div className="content-wrapper">
                            <div className="container-fluid">
                                <h3 className="pt-3 px-5">Edit Sales Order</h3>
                                <div className="card">
                                    <article className="card-body">
                                        <form autoComplete="off">
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >SO Number </label>
                                                <div className="d-flex col">
                                                    <input type="text" className="form-control col-md-10" id="so_no" value={soData.so_no} disabled />
                                                </div>

                                                <label className="col-md-2 col-form-label font-weight-normal" >SO Date</label>
                                                <div className="d-flex col">
                                                    <input type="date" className="form-control col-md-10" id="Sodate" value={soData.sodate} disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select id="cust_id" className="form-control col-md-10" disabled>
                                                        <option value={soData.cust_id} hidden>{custName}</option>
                                                        {
                                                            activecustomer.map((items, index) => (
                                                                <option key={index} value={items.cust_id} >{items.cust_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Location <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <button type="button" className="btn border col-md-10" data-toggle="modal" data-target="#custAddnmodal" disabled
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setTimeout(() => {
                                                                document.getElementById('searchCustAddress').focus()
                                                            }, 700)
                                                        }}>
                                                        {
                                                            custAddressLocation.length > 0 ? `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}` : `${soData.cust_addressid}`
                                                        }
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='overflow-auto'>
                                                <table className="table  table-striped table-bordered mt-2">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Activity</th>
                                                            <th scope="col">Items</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Rate</th>
                                                            <th scope="col">Tax Amt</th>
                                                            <th scope="col">Unit</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            soSubData.map((element, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <select id={`Activity-${index}`} className="form-control" disabled>
                                                                            <option value='' hidden>{element.activity}</option>
                                                                            {
                                                                                Activeaccount.map((items, index) => (
                                                                                    <option key={index} value={[items.account_type_code, items.account_name_code]}>{items.account_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className="col-md-2 px-1">
                                                                        {
                                                                            <select id={`items-${index}`} className='form-control col' disabled>
                                                                                <option value='' hidden >{element.item}</option>
                                                                                {
                                                                                    itemtoggle[index] == true ?
                                                                                        itemsdata[index].map((item, index) => (
                                                                                            <option key={index} value={`${item.gst_rate}^${item.item_name}^${item.chart_of_acct_id}`} >{item.item_name}</option>
                                                                                        ))
                                                                                        : null
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </td>
                                                                    <td className='px-1' style={{ maxWidth: '10px' }}>
                                                                        <input className='form-control' type="number" id={`Quality-${index}`} disabled defaultValue={element.qty} />
                                                                    </td>
                                                                    <td className='px-1' style={{ maxWidth: '10px' }}>
                                                                        <input className="form-control" type="number" id={`Rate-${index}`} disabled defaultValue={element.rate} />
                                                                    </td>
                                                                    <td id="gst" className='col-md-1 px-1'>
                                                                        <input type='text' id={`tax-${index}`} className="form-control col cursor-notallow" disabled defaultValue={element.gst_amt} />
                                                                    </td>
                                                                    <td className='px-1 col-md-2'>
                                                                        <select className='form-control col' id={`unit-${index}`} disabled>
                                                                            <option value='' hidden >{element.unit}</option>
                                                                            {
                                                                                activeunit.map((item, index) => (
                                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td id="amountvalue" className='col-md-1 px-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`amount-${index}`} disabled defaultValue={element.net_amt} />
                                                                    </td>
                                                                    <td id="Totalsum" className='col-md-1 px-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`TotalAmount-${index}`} disabled defaultValue={element.total_amt} />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='d-flex justify-content-between so_bottom_sec'>
                                                <div className='so_bottom_remark_sec'>
                                                    <div className="form mt-2">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Remark</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="3" id="remark" disabled defaultValue={soData.remark}></textarea>
                                                        </div>
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Terms & Conditions</label>

                                                    </div>
                                                </div>
                                                <div className='so_bottom_total_div'>
                                                    <table className='table table-borderless'>
                                                        <tbody>
                                                            <tr>
                                                                <td>Sub Total</td>
                                                                <td></td>
                                                                <td id="subTotal">{soData.net_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total GST</td>
                                                                <td id="gstper"> {soData.gst_rate}</td>
                                                                <td id="totalgst">{soData.gst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><h3>Total(₹)</h3></td>
                                                                <td></td>
                                                                <td id="totalgrand">{soData.total_amt}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>


                                        </form>
                                    </article>
                                    <div className="card-footer border border-top">
                                        <div >
                                            <button id="save" name="save" className="btn btn-danger" onClick={(e) => { e.preventDefault(); handleSubmit("save") }}>  Save</button>
                                            <button id="save" name="save" className="btn btn-danger ml-2" onClick={(e) => { e.preventDefault(); handleSubmit("post") }} > Post</button>
                                            <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SaveSalesOrder' }} name="clear" className="btn ml-2 btn-secondary">Cancel </button>
                                            <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#salesOrderPreview" >Preview SO</button>
                                        </div>
                                    </div>
                                </div>
                                {
                                    alertObj.type ? <AlertsComp data={alertObj} /> : null
                                }
                            </div>
                            <Preview somajorData={somajorData} items={itemsrowval} org={orgdata} />
                        </div>
                        : <LoadingPage />
                }
                <Footer />
            </div>

        </>
    )
}
