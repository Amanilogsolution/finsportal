import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveVendor, ActivePurchesItems, Activeunit, Getfincialyearid, ActiveLocationAddress, InsertPurchaseorder, InsertSubPurchaseorder, Updatefinancialcount,SearchVendAddress,SelectVendorAddress } from '../../../api'
import Preview from './PreviewPurchaseOrder/Preview';
import LoadingPage from '../../loadingPage/loadingPage';


function PurchaseOrder() {
    const [loading, setLoading] = useState(false)

    const [totalValues, setTotalValues] = useState([1])
    const [vendorlist, setVendorlist] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [itemlist, setItemlist] = useState([])
    const [unitlist, setUnitlist] = useState([])
    const [pocount, setPOcount] = useState(0)
    const [vendorlocations, setVendorLocations] = useState('');
    const [vendorlocation, setVendorLocation] = useState([]);



    const [poalldetail, setPOalldetail] = useState({
        po_number: '',
        vendor_id: '',
        vendor_name: '',
        po_location_id: '',
        po_location: '',
        po_date: '',
        poamount: ''
    })
    const [poitem, setPOitems] = useState([{
        location_id: '',
        location: '',
        item: '',
        qty: '',
        rate: '',
        amt: '',
        unit: '',
        glcode: ''
    }])

    useEffect(() => {
        const fetchdata = async () => {

            const org = localStorage.getItem('Organisation');
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


    const handleChangeLocation = (index) => {
        const location_data = document.getElementById(`location-${index}`)
        let location_name = location_data.options[location_data.selectedIndex].text;
        let location_id = location_data.value
        poitem[index].location_id = location_id
        poitem[index].location = location_name
    }

    const handleChangeItems = (index) => {
        const item_data = document.getElementById(`item-${index}`).value;
        const [item, glcodes] = item_data.split('^')
        poitem[index].item = item
        poitem[index].glcode = glcodes
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
        let obj = { location_id: '', location: '', item: '', qty: '', rate: '', amt: '', unit: '' }
        poitem.push(obj)
    }
    const handleChangeRate = (index) => {
        const qty = document.getElementById(`quantity-${index}`).value || 0;
        const rate = document.getElementById(`rate-${index}`).value || 0;
        let amt = Number(qty) * Number(rate)
        poitem[index].qty = qty
        poitem[index].rate = rate
        poitem[index].amt = amt
        document.getElementById(`amount-${index}`).value = amt
        let total_amt = 0
        poitem.map((d) => { total_amt = total_amt + Number(d.amt) })
        document.getElementById('subtotalval').innerHTML = total_amt;

        setPOalldetail({
            ...poalldetail,
            poamount: total_amt
        })
    }

    const handleRemove = (e) => {
        e.preventDefault()
        if (!(totalValues.length === 1)) {
            let newvalue = [...totalValues]
            newvalue.pop()
            setTotalValues(newvalue)
            poitem.pop()
            let total_amt = 0
            poitem.map((d) => { total_amt = total_amt + Number(d.amt) })
            document.getElementById('subtotalval').innerHTML = total_amt;
            setPOalldetail({
                ...poalldetail,
                poamount: total_amt
            })
        }
    }


    const handleVendorLocation = (e) => {
        e.preventDefault()
        const vendor_data = document.getElementById('vend_name')
        let vendor_name = vendor_data.options[vendor_data.selectedIndex].text;
        let venddor_id = vendor_data.value;
        const location_data = document.getElementById('polocation')
        let location_name = location_data.options[location_data.selectedIndex].text;
        let location_id = location_data.value;

        setPOalldetail({
            ...poalldetail,
            po_number: document.getElementById('po_no').value,
            po_date: document.getElementById('po_date').value,
            vendor_id: venddor_id,
            vendor_name: vendor_name,
            po_location_id: location_id,
            po_location: location_name,
            poamount: document.getElementById('subtotalval').innerHTML
        })
    }

    const handleChangeUnit = (index) => {
        const unit_data = document.getElementById(`unit-${index}`).value;
        let data = [...poitem]
        data[index].unit = unit_data
        setPOitems(data)

    }

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

    const handlevendorselect = async (e) => {
        // const result = await ActiveSelectedVendor(localStorage.getItem('Organisation'), e.target.value);
        // setVendorselectedlist(result[0])


        const result1 = await SelectVendorAddress(localStorage.getItem('Organisation'), e.target.value);
        setVendorLocation(result1)

       
    }

    const handleSubmit = async (btntype) => {
        setLoading(false)
        const org = localStorage.getItem('Organisation');
        const userid = localStorage.getItem('User_id');
        const vendorname = poalldetail.vendor_id
        const polocation = poalldetail.po_location_id
        let ponumber = poalldetail.po_number
        const podate = poalldetail.po_date
        const poamount = poalldetail.poamount

        if (!vendorname || !polocation) {
            alert('Please enter Mandatory Fields')
            setLoading(true)
        }
        else {
            if (btntype === 'save') {
                ponumber = 'Random' + Math.floor(Math.random() * 10000)
            }
            const result = await InsertPurchaseorder(org, vendorname, polocation, ponumber, podate, userid, btntype, poamount)

            if (result === "Insert") {
                if (btntype !== 'save') {
                    await Updatefinancialcount(org, 'po_count', pocount)
                }

                poitem.map(async (item) => {
                    await InsertSubPurchaseorder(org, vendorname, ponumber, item.location_id, item.item, item.qty, item.rate, item.amt, item.unit, item.glcode)
                })
                alert("PO Generated")
                window.location.href = "/SavePurchaseOrder"
            }
            else {
                alert('Server not Response')
                setLoading(true)
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
                                            <div className="form-row ">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        id="vend_name"
                                                        onChange={handlevendorselect}
                                                        className="form-control col-md-10">
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
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Billing Address <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        onChange={handleVendorLocation}
                                                        id="polocation"
                                                        className="form-control col-md-10">
                                                        <option value='' hidden>Select location</option>
                                                        {
                                                            locationstate.map((item, index) =>
                                                                <option key={index} value={item.location_id}>{item.location_name}</option>)
                                                        }
                                                    </select>
                                                </div>

                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Shipping Address <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select
                                                        id="polocation"
                                                        className="form-control col-md-10">
                                                        <option value='' hidden>Select location</option>
                                                        {
                                                            locationstate.map((item, index) =>
                                                                <option key={index} value={item.location_id}>{item.location_name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-3" >
                                                <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >P.O Number </label>
                                                <div className="d-flex col-md-4" >
                                                    <input type="text" className="form-control col-md-10 cursor-notallow" id="po_no" placeholder="" disabled />
                                                </div>
                                                <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">P.O Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="po_date" disabled />
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
                                                        totalValues.map((element, index) => (
                                                            <tr key={index}>
                                                                
                                                                <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                    <select id={`item-${index}`} className="form-control ml-0" onChange={(e) => { handleChangeItems(index) }}>
                                                                        <option value='' hidden>Select Item</option>
                                                                        {
                                                                            itemlist.map((items, index) => (
                                                                                <option key={index} value={`${items.item_name}^${items.glcode}`} >{items.item_name}</option>

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
                                                                    <select id={`unit-${index}`} className="form-control ml-0" onChange={() => { handleChangeUnit(index) }}>
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
                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/Home' }} name="clear" className="btn btn-secondary ml-2">Cancel</button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview PO</button>
                                    </div>
                                    <Preview data={poalldetail} Allitems={poitem} />

                                </div>
                            </div>
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