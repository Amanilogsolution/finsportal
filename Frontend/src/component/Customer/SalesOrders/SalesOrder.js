import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, ShowCustAddress, ActiveAccountMinorCode, ActiveItems, Activeunit, InsertSalesorder, InsertSubSalesorder, showOrganisation, Getfincialyearid, Updatefinancialcount } from '../../../api/index'
import Preview from './PreviewSalesOrder/PreviewSalesOrder';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';
import './SalesOrder.css'
function SalesOrder() {
    const [loading, setLoading] = useState(false)
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [totalValues, setTotalValues] = useState([1])
    const [amount, setAmount] = useState()
    const [activecustomer, setActiveCustomer] = useState([])
    const [cutomerAddress, setCutomerAddress] = useState([])
    const [custAddressLocation, setCustAddressLocation] = useState([])
    const [Activeaccount, setActiveAccount] = useState([])
    const [itemsdata, setItemdata] = useState([])
    const [itemtoggle, setItemtoggle] = useState([false])
    const [activeunit, setActiveUnit] = useState([])

    const [subTotal, setSubTotal] = useState([])
    const [gstTotal, setGSTTotal] = useState([])
    const [grandTotal, setGrandTotal] = useState([])
    const [gstpercent, setGSTPercent] = useState([])

    const [orgdata, setOrgdata] = useState([])

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
    const [itemsrowval, setItemsrowval] = useState([{
        activity: '',
        majorCode: '',
        items: '',
        taxPer: 0,
        taxAmt: 0,
        taxable: '',
        glcode: '',
        Quantity: '',
        rate: '',
        unit: '',
        amount: '',
        total: ''
    }]);

    const [socount, setSocount] = useState(0)

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)

            const ActiveAccount = await ActiveAccountMinorCode(org)
            setActiveAccount(ActiveAccount)

            const ActiveUnit = await Activeunit(org)
            setActiveUnit(ActiveUnit)
            const orgdata = await showOrganisation(org)
            setOrgdata(orgdata)
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].so_count) + 1
            setLoading(true)
            document.getElementById('so_no').value = id[0].so_ser + id[0].year + String(lastno).padStart(5, '0')
            setSocount(lastno)

            Todaydate()
        }
        fetchdata()
    }, [])

    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("Sodate").value = today;
    }

    const handleCustname = async (e) => {
        e.preventDefault();
        const cust_id = e.target.value;
        const cust_add = await ShowCustAddress(cust_id, localStorage.getItem("Organisation"))
        setCutomerAddress(cust_add)
    }

    const handleChangeActivity = async (e, index) => {
        e.preventDefault();
        itemtoggle[index] = true
        const datwe = e.target.value.split(',')
        itemsrowval[index].majorCode = datwe[1]
        const result2 = await ActiveItems(localStorage.getItem('Organisation'), datwe[0]);
        let value = [...itemsdata]
        value[index] = result2;
        console.log(value)
        setItemdata(value)
        let val = document.getElementById(`Activity-${index}`);
        let text = val.options[val.selectedIndex].text;
        itemsrowval[index].activity = text;

    }

    const handleChangeItems = async (value, index) => {
        const [gstper, item, glcodes] = value.split('^')
        itemsrowval[index].items = item
        itemsrowval[index].taxPer = Number(gstper)
        itemsrowval[index].glcode = glcodes
        if (gstper > 0) {
            itemsrowval[index].taxable = 'yes'
        } else {
            itemsrowval[index].taxable = 'No'
        }
    }

    const handleChangeQuantity_Rate = (index) => {
        let qty = Number(document.getElementById(`Quality-${index}`).value) || 0
        let rate = Number(document.getElementById(`Rate-${index}`).value) || 0
        let gst = Number(itemsrowval[index].taxPer) || 0
        let amt = qty * rate
        let tax = Math.round(amt * gst / 100)
        let sum = 0
        let gstamt = 0
        let grandamt = 0

        setTimeout(() => {
            subTotal[index] = amt
            gstTotal[index] = tax
            grandTotal[index] = amt + tax
            gstpercent[index] = gst
            document.getElementById(`tax-${index}`).value = tax
            document.getElementById(`amount-${index}`).value = amt
            document.getElementById(`TotalAmount-${index}`).value = amt + tax
            itemsrowval[index].Quantity = qty;
            itemsrowval[index].rate = rate;
            itemsrowval[index].taxAmt = tax;
            itemsrowval[index].amount = amt;
            itemsrowval[index].total = amt + tax;

            subTotal.map(item => sum += Number(item))
            gstTotal.map(item => gstamt += Number(item))
            grandTotal.map(item => grandamt += Number(item))
            console.log(gstpercent)
            const maxgst = gstpercent.reduce((a, b) => Math.max(a, b), -Infinity);


            document.getElementById('subTotal').innerHTML = sum;
            document.getElementById('totalgst').innerHTML = gstamt;
            document.getElementById('totalgrand').innerHTML = grandamt;
            document.getElementById('gstper').innerHTML = `${maxgst} %`



        }, 1000)
    }
    const handleChangeUnit = (index, e) => {
        itemsrowval[index].unit = e.target.value;
        let cust_name = document.getElementById('cust_id')
        cust_name = cust_name.options[cust_name.selectedIndex].text;


        setSomajorData({
            customer_name: cust_name,
            cust_address: `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}`,
            salesOrder_no: document.getElementById('so_no').value,
            salesOrder_date: document.getElementById('Sodate').value,
            total_amt: document.getElementById('totalgrand').innerHTML,
            total_gst_rate: document.getElementById('gstper').innerHTML,
            total_gst_amt: document.getElementById('totalgst').innerHTML
        })
    }

    const handleClick = async (flag) => {
        setLoading(false)
        const org = localStorage.getItem('Organisation');
        const cust_id = document.getElementById('cust_id').value;
        const cust_addressid = `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}`
        let so_no = document.getElementById('so_no').value;
        const so_date = document.getElementById('Sodate').value
        const net_amt = document.getElementById('subTotal').innerHTML
        const gst_rate = document.getElementById('gstper').innerHTML
        const gst_amt = document.getElementById('totalgst').innerHTML
        const total_amt = document.getElementById('totalgrand').innerHTML
        const remark = document.getElementById('remark').value
        const User_id = localStorage.getItem('User_id')

        if (!cust_id || !cust_addressid) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {

            if (flag === 'save') {
                so_no = 'Random' + Math.floor(Math.random() * 10000)
            }

            const result = await InsertSalesorder(org, cust_id, cust_addressid, so_no, so_date, net_amt, gst_rate, gst_amt, total_amt, remark, User_id, flag)

            itemsrowval.forEach(async (item) => {
                const result1 = await InsertSubSalesorder(org, so_no, item.activity, item.items, item.Quantity, item.rate, item.taxPer, item.taxAmt, item.unit, item.amount, item.total, User_id, item.glcode, item.majorCode)
            })
            setLoading(true)

            if (result === "Insert") {
                if (flag !== 'save') {
                    await Updatefinancialcount(org, 'so_count', socount)
                }
                setAlertObj({ type: 'success', text: 'Sales Order Added', url: '/SaveSalesOrder' })
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })

            }
        }

    }
    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
        let obj = { activity: '', majorCode: '', items: '', taxPer: 0, taxAmt: 0, taxable: '', glcode: '', Quantity: '', rate: '', unit: '', amount: '', total: '' }
        itemsrowval.push(obj)
    }
    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        let objval = [...itemsrowval];
        objval.pop();
        setItemsrowval(objval)
        let subtotal = [...subTotal]
        subtotal.pop();
        setSubTotal(subtotal)
        let gstamt = [...gstTotal]
        gstamt.pop()
        setGSTTotal(gstamt)
        let grandtotalamt = [...grandTotal]
        grandtotalamt.pop()
        setGrandTotal(grandtotalamt)
        if (newvalue.length == 1) {
            setTotalValues(newvalue)
        } else {
            newvalue.pop()
            setTotalValues(newvalue)
        }
    }

    const handleRemark = (e) => {
        setSomajorData({ ...somajorData, remark: e.target.value })
    }
    return (
        <>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <div className="content-wrapper">
                            <h3 className="px-5 pt-3">New Sales Order</h3>
                            <div className="container-fluid">
                                <div className="card">
                                    <article className="card-body">
                                        <form autoComplete="off">
                                            <div className="form-row">
                                                <label className="col-md-2 col-form-label font-weight-normal" >SO Number</label>
                                                <div className="d-flex col">
                                                    <input type="text" className="form-control col-md-10" id="so_no" placeholder="SO-00001" disabled />
                                                </div>
                                                <label className="col-md-2 col-form-label font-weight-normal" >SO Date </label>
                                                <div className="d-flex col">
                                                    <input type="date" className="form-control col-md-10" id="Sodate" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col">
                                                    <select id="cust_id" className="form-control col-md-10" onChange={handleCustname}  >
                                                        <option value='' hidden>Select Customer</option>
                                                        {
                                                            activecustomer.map((items, index) => (
                                                                <option key={index} value={items.cust_id} >{items.cust_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Location <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col">
                                                    <button type="button" className="btn border col-md-10" data-toggle="modal" data-target="#custAddnmodal"
                                                        onClick={(e) => { e.preventDefault(); setTimeout(() => { document.getElementById('searchCustAddress').focus() }, 700) }}>
                                                        {
                                                            custAddressLocation.length > 0 ? `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}` : 'Select Customer Address Location'
                                                        }
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='overflow-auto w-100'>
                                                <table className="table  table-striped table-bordered mt-3">
                                                    <thead className='text-center'>
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
                                                    <tbody >
                                                        {
                                                            totalValues.map((element, index) => (
                                                                <tr key={index}>
                                                                    <td className='px-1' style={{ width: "200px" }}>
                                                                        <select id={`Activity-${index}`} className="form-control"
                                                                            onChange={(e) => handleChangeActivity(e, index)}>
                                                                            <option value='' hidden>Select Activity</option>
                                                                            {
                                                                                Activeaccount.map((items, index) => (
                                                                                    <option key={index} value={[items.account_type_code, items.account_name_code]}>{items.account_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className="col-md-2 px-1">
                                                                        {
                                                                            <select id={`items-${index}`} className='form-control col'
                                                                                onChange={(e) => { handleChangeItems(e.target.value, index) }}
                                                                            >
                                                                                <option value='' hidden > Select item</option>
                                                                                {
                                                                                    itemtoggle[index] == true ?
                                                                                        itemsdata[index].map((item, index) => (
                                                                                            <option key={index} value={`${item.gst_rate}^${item.item_name}^${item.glcode}`} >{item.item_name}</option>
                                                                                        ))
                                                                                        : null
                                                                                }
                                                                            </select>
                                                                        }
                                                                    </td>
                                                                    <td className='px-1' style={{ width: "140px" }}>
                                                                        <input className='form-control' type="number" id={`Quality-${index}`} placeholder="0" onChange={(e) => { handleChangeQuantity_Rate(index) }} />
                                                                    </td>
                                                                    <td className='px-1' style={{ maxWidth: '10px' }}>
                                                                        <input className="form-control" type="number" id={`Rate-${index}`} placeholder="0" onChange={() => { handleChangeQuantity_Rate(index) }} />
                                                                    </td>
                                                                    <td id="gst" className='col-md-1 px-1'>
                                                                        <input type='text' id={`tax-${index}`} className="form-control col cursor-notallow" disabled />
                                                                    </td>
                                                                    <td className='px-1 col-md-2'>
                                                                        <select className='form-control col' id={`unit-${index}`} onChange={(e) => { handleChangeUnit(index, e) }}>
                                                                            <option value='' hidden > Select Unit</option>
                                                                            {
                                                                                activeunit.map((item, index) => (
                                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td id="amountvalue" className='col-md-1 px-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`amount-${index}`} disabled />
                                                                    </td>
                                                                    <td id="Totalsum" className='col-md-1 px-1'>
                                                                        <input type='text' className="form-control col cursor-notallow" id={`TotalAmount-${index}`} disabled />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                            <button className="btn btn-danger" onClick={handleRemove}>Remove</button>

                                            <div className='d-flex justify-content-between so_bottom_sec'>
                                                <div className='so_bottom_remark_sec'>
                                                    <div className="form mt-3">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="3" id="remark" placeholder="Looking forward for your bussiness " onBlur={handleRemark}></textarea>
                                                        </div>
                                                        <label className="col-md-7 col-form-label font-weight-normal text-danger" >Terms & Conditions</label>
                                                    </div>
                                                </div>
                                                <div className='so_bottom_total_div'>
                                                    <table className='table table-borderless'>
                                                        <tbody>
                                                            <tr>
                                                                <td>Sub Total</td>
                                                                <td></td>
                                                                <td id="subTotal">0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total GST</td>
                                                                <td id="gstper"> </td>
                                                                <td id="totalgst">0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td><h3>Total(₹)</h3></td>
                                                                <td></td>
                                                                <td id="totalgrand">0.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </form>
                                    </article>

                                    <div className=" card-footer border border-top">
                                        <button id="save" name="save" className="btn btn-danger" onClick={(e) => { e.preventDefault(); handleClick("save") }}> Save </button>
                                        <button id="save" name="save" className="btn btn-danger ml-2" onClick={(e) => { e.preventDefault(); handleClick("post") }}>  Post </button>
                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SaveSalesOrder' }} name="clear" className="btn ml-2 btn-secondary">  Cancel </button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#salesOrderPreview" >Preview SO</button>
                                    </div>
                                    <Preview somajorData={somajorData} items={itemsrowval} org={orgdata} />
                                </div>
                            </div>
                            {
                                alertObj.type ? <AlertsComp data={alertObj} /> : null
                            }
                        </div>
                        : <LoadingPage />
                }
                <Footer />
            </div>

            {/* Address Modal Start */}
            <div className="modal fade  bd-example-modal-lg" id="custAddnmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content " >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Customer Address</h5>
                            <div className="form-group col-md-5">
                                <input type="text" className='form-control col' placeholder='Search Address' id="searchCustAddress"
                                // onChange={handleSearchCustLoc}
                                />
                            </div>
                        </div>
                        <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>Address </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cutomerAddress.length > 0 ?
                                            cutomerAddress.map((items, index) => (
                                                <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                                    onClick={() => {
                                                        // handleChangeCustomerAdd(items.billing_address_state, items.cust_addressid, items.gst_no);
                                                        setCustAddressLocation([items.billing_address_attention, items.billing_address_city, items.billing_address_country])
                                                    }}
                                                >
                                                    <td>{items.billing_address_city}</td>
                                                    <td style={{ fontSize: "15px" }}>{items.billing_address_attention},{items.billing_address_city},{items.billing_address_country}</td>

                                                </tr>
                                            ))
                                            : <tr><td>Select Customer</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Address Modal Stop */}


        </>
    )
}

export default SalesOrder
