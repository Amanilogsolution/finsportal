import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Preview from './PreviewPurchaseOrder/Preview';
import { ActiveVendor, ActiveSelectedVendor, ActivePurchesItems, Activeunit, Updatefinancialcount, showLocation, Getfincialyearid, Editpurchaseorder, ActiveLocationAddress, getPoDetailsPreview, getSubPoDetailsPreview } from '../../../api'

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
    const [vendordata, setVendordata] = useState([]);
    const [locationdata, setLocationdata] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const po_no = localStorage.getItem('poNo');

            const result = await getPoDetailsPreview(org, po_no)
            setData(result[0])
            setPOalldetail(result[0])

            const result1 = await getSubPoDetailsPreview(org, po_no)
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

            const vendordata = await ActiveSelectedVendor(org, result[0].vendor_id);
            setVendordata(vendordata[0])

            const locationdata = await showLocation(org, result[0].po_location);
            setLocationdata(locationdata)

        }
        fetchdata();
    }, [])


    const handleSubmit = async (btntype) => {

        if (btntype === 'save') {
            alert('Data Saved')
            window.location.href = "./SavePurchaseOrder"
        }
        else {
            const org = localStorage.getItem('Organisation')
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].po_count) + 1
            setPOcount(lastno)
            let new_po_num = id[0].po_ser + id[0].year + String(lastno).padStart(5, '0')

            const result = await Editpurchaseorder(localStorage.getItem('Organisation'), new_po_num, 'post', localStorage.getItem('poNo'));

            if (result === "Updated") {
                await Updatefinancialcount(org, 'po_count', lastno)
                alert('Po Posted')
                window.location.href = "./SavePurchaseOrder"
            }
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
                    <h3 className="pt-3 pb-2 pl-5"> Edit Purchase Order</h3>
                    <div className="card">
                        <article className="card-body" >
                            <form autoComplete="off">
                                <div className="form-row ">
                                    <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                    <div className="d-flex col-md">
                                        <select
                                            id="vend_name"
                                            className="form-control col-md-4" disabled>
                                            <option value={data.vendor_id} hidden>{vendordata.vend_name}</option>
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
                                            id="polocation"
                                            className="form-control col-md-4" disabled>
                                            <option value='' hidden>{locationdata.location_name}</option>
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

                                <table className="table mt-4 table-bordered">
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
                                                        <select className="form-control ml-0" disabled>
                                                            <option value='' hidden>{element.location}</option>
                                                            {
                                                                locationstate.map((item, index) => (
                                                                    <option key={index} value={item.location_id} >{item.location_name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                        <select className="form-control ml-0" disabled>
                                                            <option value='' hidden>{element.items}</option>
                                                            {
                                                                itemlist.map((items, index) => (
                                                                    <option key={index} value={items.item_name} >{items.item_name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id={`Quantity${index}`} value={element.quantity} className="form-control" disabled />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id="Rate"
                                                            value={element.rate} className="form-control" disabled />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <input type='number' id={`Amount${index}`} value={element.amount} className="form-control cursor-notallow" disabled />
                                                    </td>
                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                        <select className="form-control ml-0" disabled>
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
                            </form>
                        </article>
                        <div className='d-flex justify-content-end '>
                            <div className='rounded py-1 mx-5' style={{ width: "25%" }}>
                                <table className='w-100'>
                                    <tbody>
                                        <tr>
                                            <td><h4 id='subtotalbtn'> Total</h4></td>
                                            <td id="Subtotal"><h5>INR {data.poamount}</h5></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="card-footer border-top">
                            <button id="save" name="save" className="btn btn-danger" onClick={() => { handleSubmit('save') }}>Save</button>
                            <button id="save" name="save" className="btn btn-danger ml-2" onClick={() => { handleSubmit('post') }}>Post</button>
                            <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SavePurchaseOrder' }} name="clear" className="btn btn-secondary ml-2">Cancel</button>
                            <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview PO</button>
                        </div>
                        <Preview data={poalldetail} Allitems={poitem} vendordata={vendordata.vend_name} locationdata={locationdata.location_name} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
