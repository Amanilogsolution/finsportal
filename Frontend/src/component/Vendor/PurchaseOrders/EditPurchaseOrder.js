import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Preview from './PreviewPurchaseOrder/Preview';
import { ActiveVendor, ActiveSelectedVendor, ActivePurchesItems, Activeunit, ActivePaymentTerm, SelectVendorAddress, Getfincialyearid, InsertBill, ActiveUser, ActiveLocationAddress, getPoDetailsPreview, getSubPoDetailsPreview } from '../../../api'

export default function EditPurchaseOrder() {
    const [data, setData] = useState({})
    const [vendorlist, setVendorlist] = useState([])
    const [unitlist, setUnitlist] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [itemlist, setItemlist] = useState([])
    const [pocount, setPOcount] = useState(0)
    const [totalValues, setTotalValues] = useState([1])
    const [subinv, setSubPo] = useState([])
    const [poitem, setPOitems] = useState([])
    const [poalldetail, setPOalldetail] = useState({})




    useEffect(() => {
        const fetchdata = async () => {

            const org = localStorage.getItem('Organisation');
            const po_no = localStorage.getItem('poNo');
            const result = await getPoDetailsPreview(org, po_no)
            setData(result[0])
            setPOalldetail(result[0])

            const result1 = await getSubPoDetailsPreview(org, po_no)
            console.log(result1)
            setSubPo(result1)
            setPOitems(result1)


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
            let po = id[0].po_ser + id[0].year + String(lastno).padStart(5, '0')
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
        // document.getElementById("po_date").value = today;
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
                                            // onChange={handleVendorName}
                                            className="form-control col-md-4">
                                            <option value={data.vendor_id} hidden>{data.vendor_id}</option>
                                            {
                                                vendorlist.map((item, index) =>
                                                    <option key={index} value={item.vend_id}>{item.vend_name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Location <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <select
                                            // onChange={handleVendorLocation}
                                            id="polocation"
                                            className="form-control col-md-4">
                                            <option value='' hidden>{data.po_location}</option>
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
                                        <input type="text" className="form-control col-md-10 cursor-notallow" id="po_no" value={data.po_number} placeholder="" disabled />
                                    </div>
                                    <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">P.O Date</label>
                                    <div className="d-flex col-md-4 " >
                                        <input type="date" className="form-control col-md-10 cursor-notallow" id="po_date" value={data.po_date} disabled />
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
                                            subinv.map((element, index) => (
                                                <tr key={index}>
                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                        <select className="form-control ml-0"
                                                        //  onChange={(e) => { handleChangeLocation(e.target.value, index) }}
                                                        >
                                                            <option value='' hidden>{element.location}</option>
                                                            {
                                                                locationstate.map((item, index) => (
                                                                    <option key={index} value={item.location_id} >{item.location_name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                        <select className="form-control ml-0"
                                                        //  onChange={(e) => { handleChangeItems(e.target.value, index) }}
                                                        >
                                                            <option value='' hidden>{element.items}</option>

                                                            {
                                                                itemlist.map((items, index) => (
                                                                    <option key={index} value={items.item_name} >{items.item_name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id={`Quantity${index}`}
                                                            value={element.quantity}
                                                            // onChange={(e) => { setIndex(index); quantity[index] = e.target.value }} 
                                                            className="form-control" />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id="Rate"
                                                            value={element.rate}
                                                            //  onChange={handleChangeRate} 
                                                            className="form-control" />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id={`Amount${index}`}  value={element.amount} className="form-control cursor-notallow" disabled />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <select className="form-control ml-0"
                                                        // onChange={(e) => { handleChangeUnit(e.target.value, index) }}
                                                        >
                                                            <option value='' hidden>{element.unit}</option>
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
                                {/* <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp; */}
                                {/* <button className="btn btn-danger" onClick={handleRemove}>Remove</button> */}
                            </form>
                        </article>
                        <hr />
                        <div className='d-flex'>
                            <div style={{ width: "40%" }}>

                            </div>
                            <div className={`rounded py-1 px-2`} style={{ width: "55%" }}>
                                <table className='w-100'>
                                    <tbody>
                                        <tr>
                                            <td><button className="btn btn-primary" id='subtotalbtn'> Total</button></td>
                                            <td></td>
                                            <td id="Subtotal">
                                                {/* {subtotal} */}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                        </div>


                        <div className="card-footer border-top">
                            {/* <button id="save" name="save" className="btn btn-danger" onClick={handleSubmit}>Save</button>
                    <button id="save" name="save" className="btn btn-danger ml-2" onClick={handleSubmitPost}>Post</button>
                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }} name="clear" className="btn btn-secondary ml-2">Cancel</button> */}
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
