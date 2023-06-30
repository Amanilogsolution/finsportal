import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveVendor, ActivePurchesItems,showOrganisation, Activeunit, Getfincialyearid, ActiveLocationAddress, InsertPurchaseorder, InsertSubPurchaseorder, Updatefinancialcount, SearchVendAddress, SelectVendorAddress } from '../../../api'
import Preview from './PreviewPurchaseOrder/Preview';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

function PurchaseOrder() {
    const [loading, setLoading] = useState(false)
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })
    const [vendorlist, setVendorlist] = useState([])
    const [orgdata, setOrgdata] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [itemlist, setItemlist] = useState([])
    const [unitlist, setUnitlist] = useState([])
    const [pocount, setPOcount] = useState(0)
    const [vendorlocations, setVendorLocations] = useState('');
    const [vendorlocation, setVendorLocation] = useState([]);

    const [poalldetail, setPOalldetail] = useState({ po_number: '', podate: '', vendor_id: '', vendor_name: '', vendor_location: '', bill_add_id: '', bill_add: '', ship_add_id: '', ship_add_location: '', po_amt: '' })
    let itemObj = { items: '', glcode: '', sac_hsn: '', quantity: '', rate: '', amt: '', unit: '' }
    const [poitem, setPOitems] = useState([itemObj])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const orgData = await showOrganisation(org)
            setOrgdata(orgData)
            const dataId = await ActiveVendor(org)
            setVendorlist(dataId)
            const units = await Activeunit(org)
            setUnitlist(units)
            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)
            const items = await ActivePurchesItems(org)
            setItemlist(items)
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].po_count) + 1
            setPOcount(lastno)
            setLoading(true)
            document.getElementById('po_no').value = id[0].po_ser + id[0].year + String(lastno).padStart(5, '0')
            Todaydate();
        }
        fetchdata();
    }, [])

    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("po_date").value = today;
    }

    const handleAdd = (e) => {
        e.preventDefault()
        let newItemRow = [...poitem]
        newItemRow.push(itemObj)
        setPOitems(newItemRow)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        if (!(poitem.length === 1)) {
            poitem.pop()
            let total_amt = 0
            poitem.map((d) => { total_amt = total_amt + Number(d.amt) })
            document.getElementById('subtotalval').innerHTML = total_amt;
            setPOalldetail({
                ...poalldetail,
                po_amt: total_amt
            })
        }
    }
    // Vendor Select
    const handlevendorselect = async (e) => {
        const result1 = await SelectVendorAddress(localStorage.getItem('Organisation'), e.target.value);
        setVendorLocation(result1)
    }
    // Search Vendor Address
    const handleSearchVendid = async (e) => {
        const org = localStorage.getItem('Organisation')
        if (e.target.value.length > 2) {
            const get = await SearchVendAddress(org, poalldetail.vendor_id, e.target.value)
            setVendorLocation(get)
        }
        else if (e.target.value === 0) {
            const result1 = await SelectVendorAddress(org, poalldetail.vendor_id);
            setVendorLocation(result1)
        }
    }
    // Set Major Data
    const handleBillingLocation = (e) => {
        e.preventDefault()
        const vendor_data = document.getElementById('vend_name')
        let vendor_name = vendor_data.options[vendor_data.selectedIndex].text;
        let venddor_id = vendor_data.value;
        const billing_location = document.getElementById('billadd')
        let billing_location_name = billing_location.options[billing_location.selectedIndex].text;
        let billing_location_id = billing_location.value;
        const shipAdd_location = document.getElementById('shipAdd')
        let shipAdd_location_name = shipAdd_location.options[shipAdd_location.selectedIndex].text;
        let shipAdd_location_id = shipAdd_location.value;

        setPOalldetail({
            ...poalldetail,
            po_number: document.getElementById('po_no').value,
            podate: document.getElementById('po_date').value,
            vendor_id: venddor_id,
            vendor_name: vendor_name,
            vendor_location: vendorlocations,
            bill_add_id: billing_location_id,
            bill_add: billing_location_name,
            ship_add_id: shipAdd_location_id,
            ship_add_location: shipAdd_location_name,
            po_amt: document.getElementById('subtotalval').innerHTML
        })
    }
    // Change Item
    const handleChangeItems = (index) => {
        const item_data = document.getElementById(`item-${index}`).value;
        const itemArrData = item_data.split('^')
        poitem[index].items = itemArrData[0]
        poitem[index].glcode = itemArrData[1]
        poitem[index].sac_hsn = itemArrData[2]
    }
    const handleChangeRate = (index) => {
        const qty = document.getElementById(`quantity-${index}`).value || 0;
        const rate = document.getElementById(`rate-${index}`).value || 0;
        let amt = Number(qty) * Number(rate)
        poitem[index].quantity = qty
        poitem[index].rate = rate
        poitem[index].amt = amt
        document.getElementById(`amount-${index}`).value = amt
        let total_amt = 0
        poitem.map((d) => { total_amt = total_amt + Number(d.amt) })
        document.getElementById('subtotalval').innerHTML = total_amt;

        setPOalldetail({
            ...poalldetail,
            po_amt: total_amt
        })
    }

    const handleChangeUnit = (index, valu) => {
        const unit_data = valu
        let data = [...poitem]
        data[index].unit = unit_data
        setPOitems(data)
    }

    const handleSubmit = async (btntype) => {
        // console.log(poalldetail)
        // console.log(poitem)
        setLoading(false)
        const org = localStorage.getItem('Organisation');
        const userid = localStorage.getItem('User_id');
        const fins_year = localStorage.getItem('fin_year');

        let ponumber = poalldetail.po_number

        if (!poalldetail.vendor_id || !poalldetail.vendor_location || !poalldetail.bill_add_id || !poalldetail.ship_add_id) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            if (btntype === 'save') {
                ponumber = 'Random' + Math.floor(Math.random() * 10000)
            }
            const result = await InsertPurchaseorder(org, poalldetail, ponumber, userid, fins_year, btntype)
            if (result === "Insert") {
                await InsertSubPurchaseorder(org, poalldetail.vendor_id, ponumber, poitem)
                if (btntype !== 'save') {
                    await Updatefinancialcount(org, 'po_count', pocount)
                }
                setLoading(true)
                setAlertObj({ type: 'success', text: 'PO Generated', url: '/SavePurchaseOrder' })
            }
            else {
                setLoading(true)
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
                                <h3 className="pt-3 pb-2 pl-5"> New Purchase Order</h3>
                                <div className="card">
                                    <article className="card-body" >
                                        <form autoComplete="off">
                                            <div className="form-row">
                                                <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >P.O Number </label>
                                                <div className="d-flex col-md-4" >
                                                    <input type="text" className="form-control col-md-10 cursor-notallow" id="po_no" placeholder="" disabled />
                                                </div>
                                                <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">P.O Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="po_date" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="vend_name" onChange={handlevendorselect} className="form-control col-md-10">
                                                        <option value='' hidden>select vendor</option>
                                                        {
                                                            vendorlist.length > 0 ?
                                                                vendorlist.map((item, index) =>
                                                                    <option key={index} value={item.vend_id}>{item.vend_name}</option>)
                                                                : null
                                                        }
                                                    </select>
                                                </div>

                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Vendor  Location <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <button type="button" className="btn border col-md-10" data-toggle="modal" data-target="#locationmodal" onClick={(e) => {
                                                        e.preventDefault();
                                                        setTimeout(() => {
                                                            document.getElementById('searchLocation').focus()
                                                        }, 600)
                                                    }}>
                                                        {
                                                            vendorlocations ? vendorlocations : 'Select Vendor Location'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label htmlFor='billadd' className="col-md-2 col-form-label font-weight-normal" >Billing Address <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select onChange={handleBillingLocation} id="billadd" className="form-control col-md-10">
                                                        <option value='' hidden>Select location</option>
                                                        {
                                                            locationstate.map((item, index) =>
                                                                <option key={index} value={item.location_id}>{item.location_name}</option>)
                                                        }
                                                    </select>
                                                </div>

                                                <label htmlFor='shipAdd' className="col-md-2 col-form-label font-weight-normal" >Shipping Address <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="shipAdd" onChange={handleBillingLocation} className="form-control col-md-10">
                                                        <option value='' hidden>Select location</option>
                                                        {
                                                            locationstate.map((item, index) =>
                                                                <option key={index} value={item.location_id}>{item.location_name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <table className="table table-bordered mt-3">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col">Unit</th>
                                                        <th scope="col">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        poitem.map((element, index) => (
                                                            <tr key={index}>

                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <select id={`item-${index}`} className="form-control ml-0" onChange={(e) => { handleChangeItems(index) }}>
                                                                        <option value='' hidden>Select Item</option>
                                                                        {
                                                                            itemlist.map((items, index) => (
                                                                                <option key={index} value={`${items.item_name}^${items.glcode}^${items.sac_code}^${items.hsn_code}`} >{items.item_name}</option>

                                                                            ))
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`quantity-${index}`} onChange={() => { handleChangeRate(index) }} className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`rate-${index}`} onChange={() => { handleChangeRate(index) }} className="form-control" />
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <select id={`unit-${index}`} className="form-control ml-0" onChange={(e) => { handleChangeUnit(index, e.target.value) }}>
                                                                        <option value='' hidden>Select Unit</option>
                                                                        {
                                                                            unitlist.map((item, index) =>
                                                                                <option key={index} value={item.unit_name}>{item.unit_name}</option>)
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                    <input type='number' id={`amount-${index}`} className="form-control cursor-notallow" disabled />
                                                                </td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                            <button className="btn btn-danger" onClick={handleRemove}>Remove</button>
                                        </form>
                                    </article>
                                    <div className='d-flex justify-content-end '>
                                        <div className='rounded py-1 px-2' style={{ width: "35%" }}>
                                            <table className='w-100'>
                                                <tbody>
                                                    <tr>
                                                        <td><h4 id='subtotalbtn'>Total</h4> </td>
                                                        <td id="Subtotal">INR <span id="subtotalval">0</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card-footer border-top">
                                        <button id="save" name="save" className="btn btn-danger" onClick={() => { handleSubmit('save') }}>Save</button>
                                        <button id="post" name="save" className="btn btn-danger ml-2" onClick={() => { handleSubmit('post') }}>Post</button>
                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SavePurchaseOrder' }} name="clear" className="btn btn-secondary ml-2">Cancel</button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview PO</button>
                                    </div>
                                    <Preview data={poalldetail} Allitems={poitem} orgdata={orgdata} bill_add={poalldetail.bill_add} />

                                </div>
                            </div>
                            {
                                alertObj.type ? <AlertsComp data={alertObj} /> : null
                            }
                        </div>
                        : <LoadingPage />
                }
                <Footer />

                {/* #######################  modal Vendor Location  Start ###################################### */}
                <div className="modal fade bd-example-modal-lg" id="locationmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Vendor Location</h5>
                                <div className="form-group col-md-5">
                                    <input type="text" className='form-control col' placeholder='Search Vendor Location' id="searchLocation" onChange={handleSearchVendid} />
                                </div>
                            </div>
                            <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>
                                <table className='table table-sm table-hover'>
                                    <thead >
                                        <tr >
                                            <th>City</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vendorlocation.length > 0 ?
                                                vendorlocation.map((items, index) => (
                                                    <tr key={index} className="cursor-pointer py-0" data-dismiss="modal"
                                                        onClick={() => {
                                                            setVendorLocations(items.billing_address_attention)
                                                        }}>
                                                        <td>{items.billing_address_city}</td>
                                                        <td style={{ fontSize: "15px" }}>{items.billing_address_attention}</td>

                                                    </tr>
                                                ))
                                                : <tr><td colSpan='2' className='text-center'>Select Vendor Or this vendor have't multiple address</td></tr>
                                        }
                                    </tbody>
                                </table>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PurchaseOrder