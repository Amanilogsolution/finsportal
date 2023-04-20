import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveVendor, ActiveSelectedVendor, ActivePurchesItems, Activeunit, ActivePaymentTerm, SelectVendorAddress, Getfincialyearid, InsertBill, ActiveUser, ActiveLocationAddress, InsertPurchaseorder, InsertSubPurchaseorder, Updatefinancialcount } from '../../../api'
import Preview from './PreviewPurchaseOrder/Preview';


function PurchaseOrder() {
    const [totalValues, setTotalValues] = useState([1])
    const [amount, setAmount] = useState([])
    const [vendorlist, setVendorlist] = useState([])
    // const [vendorlocation, setVendorLocation] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [location, setLocation] = useState([])
    const [itemlist, setItemlist] = useState([])
    const [items, setItems] = useState([]);
    const [index, setIndex] = useState();
    const [quantity, setQuantity] = useState([])
    const [rate, setRate] = useState([])
    const [unitlist, setUnitlist] = useState([])
    const [unit, setUnit] = useState([])
    const [pocount, setPOcount] = useState(0)

    const [poalldetail, setPOalldetail] = useState({
        po_number: '',
        vendor_id: '',
        po_location: '',
        po_date: '',
        poamount: ''
    })          
    const [poitem, setPOitems] = useState([])
    const [subtotal,setSubtotal] = useState()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation');
        const userid = localStorage.getItem('User_id');
        const vendorname = document.getElementById('vend_name').value
        const polocation = document.getElementById('polocation').value
        const ponumber = document.getElementById('po_no').value;
        const podate = document.getElementById('po_date').value;
        const poamount = document.getElementById('Subtotal').innerHTML;
        const flagsave = 'Save'
        console.log(poamount)

        const result = await InsertPurchaseorder(org, vendorname, polocation, ponumber, podate, userid, flagsave,poamount)
        if (result == "Insert") {
            const updatefintable = await Updatefinancialcount(org, 'po_count', pocount)
            alert("PO Generated")
            window.location.href = "/home"
        }
        location.map(async (value, index) => {
            const result1 = await InsertSubPurchaseorder(org, vendorname, ponumber, value, items[index], quantity[index], rate[index], amount[index], unit[index])
        })

    }

    const handleSubmitPost = async (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation');
        const userid = localStorage.getItem('User_id');
        const vendorname = document.getElementById('vend_name').value
        const polocation = document.getElementById('polocation').value
        const ponumber = document.getElementById('po_no').value;
        const podate = document.getElementById('po_date').value;
        const poamount = document.getElementById('Subtotal').value;

        const flagsave = 'Post'


        const result = await InsertPurchaseorder(org, vendorname, polocation, ponumber, podate, userid, flagsave,poamount)
        if (result == "Insert") {
            const updatefintable = await Updatefinancialcount(org, 'po_count', pocount)
            alert("PO Generated")
            window.location.href = "/home"
        }
        location.map(async (value, index) => {
            const result1 = await InsertSubPurchaseorder(org, vendorname, ponumber, value, items[index], quantity[index], rate[index], amount[index], unit[index])
        })
    }

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


    const handleChangeLocation = (value, i) => {
        location[i] = value
        console.log(poitem)
        var newvalue = [...poitem]

        var sum = 0
        amount.map((item) => sum += item)
        setSubtotal(sum)

        // setTimeout(()=>{
            newvalue[i] = {
                location:location[i],
                items:items[i],
                quantity:quantity[i],
                rate:rate[i],
                amount:amount[i],
                unit:unit[i],
                total:document.getElementById('Subtotal').innerHTML
    
            }
            setPOitems(newvalue)
       
    }

    const handleChangeItems = (value, i) => {
        items[i] = value
        console.log(poitem)
        var sum = 0
        amount.map((item) => sum += item)
        setSubtotal(sum)

        var newvalue = [...poitem]

        // setTimeout(()=>{
            newvalue[i] = {
                location:location[i],
                items:items[i],
                quantity:quantity[i],
                rate:rate[i],
                amount:amount[i],
                unit:unit[i],
                total:document.getElementById('Subtotal').innerHTML

    
            }
            setPOitems(newvalue)


        // },1000)

    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
    }
    const handleVendorName = (e) => {
        e.preventDefault()
        setPOalldetail({
            ...poalldetail,
            po_number: document.getElementById('po_no').value,
            vendor_id: e.target.value,
            po_location: document.getElementById('polocation').value,
            po_date: document.getElementById('po_date').value,
            poamount:document.getElementById('Subtotal').innerHTML
        })
    }

    const handleVendorLocation = (e) => {
        e.preventDefault()
        setPOalldetail({
            ...poalldetail,
            po_no: document.getElementById('po_no').value,
            vendor_id: document.getElementById('vend_name').value,
            po_location: e.target.value,
            po_date: document.getElementById('po_date').value,
            poamount:document.getElementById('Subtotal').innerHTML

        })
    }

    const handleChangeRate = (e) => {
        const total = quantity[index] * e.target.value;
        document.getElementById('Subtotal').innerHTML = total
        console.log(poitem)
        var newvalue = [...poitem]


        setTimeout(() => {
            var sum = 0
        amount.map((item) => sum += item)
        setSubtotal(sum)
            rate[index] = e.target.value
            amount[index] = total
            document.getElementById(`Amount${index}`).value = total
            newvalue[index] = {
                location:location[index],
                items:items[index],
                quantity:quantity[index],
                rate:rate[index],
                amount:amount[index],
                unit:unit[index],
                total:document.getElementById('Subtotal').innerHTML

    
            }
            setPOalldetail({
                ...poalldetail,
                poamount:document.getElementById('Subtotal').innerHTML
            })
            setPOitems(newvalue)

        }, 1000)
    }

    const handleChangeUnit = (value, i) => {
        unit[i] = value
        console.log(poitem)
        var newvalue = [...poitem]
        var sum = 0
        amount.map((item) => sum += item)
        console.log(document.getElementById('Subtotal').innerHTML)
        setSubtotal(sum)


        setTimeout(()=>{
            newvalue[i] = {
                location:location[i],
                items:items[i],
                quantity:quantity[i],
                rate:rate[i],
                amount:amount[i],
                unit:unit[i],
                total:document.getElementById('Subtotal').innerHTML

    
            }
            setPOalldetail({
                ...poalldetail,
                poamount:document.getElementById('Subtotal').innerHTML
            })
            setPOitems(newvalue)

        },500)
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        var newAmount = [...amount]
        var newrate = [...rate]
        var newquantity = [...quantity]
        var newitem = [...items]
        var newlocation = [...location]
        var newunit = [...unit]
        if (newvalue.length == 1) {
            setTotalValues(newvalue)
            setAmount(newAmount)
            setRate(newrate)
            setQuantity(newquantity)
            setItems(newitem)
            setLocation(newlocation)
            setUnit(newunit)

        } else {
            newvalue.pop()
            newAmount.pop()
            newrate.pop()
            newquantity.pop()
            newitem.pop()
            newlocation.pop()
            newunit.pop()

            setLocation(newlocation)
            setUnit(newunit)
            setItems(newitem)
            setQuantity(newquantity)
            setRate(newrate)
            setAmount(newAmount)
            setTotalValues(newvalue)
        }
    }
    return (
        <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
            </div>
            <Header />
            <div className="content-wrapper">
                <div className="container-fluid">
                    <h3 className="pt-3 pb-2 pl-5"> New Purchase Order</h3>
                    <div className="card">
                        <article className="card-body" >
                            <form autoComplete="off">
                                <div className="form-row ">
                                    <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <select
                                            id="vend_name"
                                            onChange={handleVendorName}
                                            className="form-control col-md-4">
                                            <option value='' hidden>select vendor</option>
                                            {
                                                vendorlist.length>0?
                                                vendorlist.map((item, index) =>
                                                    <option key={index} value={item.vend_id}>{item.vend_name}</option>)
                                                    :null
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Location <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <select
                                            onChange={handleVendorLocation}
                                            id="polocation"
                                            className="form-control col-md-4">
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

                                <hr />
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Location</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Quality</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            totalValues.map((element, index) => (
                                                <tr key={index}>
                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                        <select className="form-control ml-0" onChange={(e) => { handleChangeLocation(e.target.value, index) }}
                                                        >
                                                            <option value='' hidden>Select Location</option>
                                                            {
                                                                locationstate.map((item, index) => (
                                                                    <option key={index} value={item.location_id} >{item.location_name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                        <select className="form-control ml-0" onChange={(e) => { handleChangeItems(e.target.value, index) }}>
                                                            <option value='' hidden>Select Item</option>

                                                            {
                                                                itemlist.map((items, index) => (
                                                                    <option key={index} value={items.item_name} >{items.item_name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id={`Quantity${index}`} onChange={(e) => { setIndex(index); quantity[index] = e.target.value }} className="form-control" />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id="Rate" onChange={handleChangeRate} className="form-control" />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id={`Amount${index}`} value={amount[index]} className="form-control cursor-notallow" disabled />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <select className="form-control ml-0" onChange={(e) => { handleChangeUnit(e.target.value, index) }}>
                                                            <option value='' hidden>Select Unit</option>
                                                            {
                                                                unitlist.map((item, index) =>
                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>)
                                                            }
                                                        </select>
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
                        <hr />
                        <div className='d-flex'>
                                                    <div style={{ width: "40%" }}>
                                                       
                                                    </div>
                                                    <div className={`rounded py-1 px-2`} style={{ width: "55%"}}>
                                                        <table className='w-100'>
                                                            <tbody>
                                                                <tr>
                                                                    <td><button className="btn btn-primary" id='subtotalbtn'> Total</button></td>
                                                                    <td></td>
                                                                    <td id="Subtotal">{subtotal}</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>


                        <div className="card-footer border-top">
                            <button id="save" name="save" className="btn btn-danger" onClick={handleSubmit}>Save</button>
                            <button id="save" name="save" className="btn btn-danger ml-2" onClick={handleSubmitPost}>Post</button>
                            <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }} name="clear" className="btn btn-secondary ml-2">Cancel</button>
                            <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview PO</button>

                        </div>
                        <Preview data={poalldetail} Allitems={poitem}/>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PurchaseOrder
