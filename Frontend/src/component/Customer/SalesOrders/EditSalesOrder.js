import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, ShowCustAddress, ActiveAccountMinorCode, ActiveItems, Activeunit, getSoDetails, getSubSoDetails } from '../../../api/index'

export default function EditSalesOrder() {
    const [totalValues, setTotalValues] = useState([1])
    const [itemtoggle, setItemtoggle] = useState([false])
    const [itemsdata, setItemdata] = useState([])

    const [activecustomer, setActiveCustomer] = useState([])
    const [Activeaccount, setActiveAccount] = useState([])
    const [activeunit, setActiveUnit] = useState([])
    const [custAddressLocation, setCustAddressLocation] = useState([])

    const [soData, setSoData] = useState({})
    const [soSubData, setSoSubData] = useState([])


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

            const Sosubdata = await getSubSoDetails(org, so_no)
            setSoSubData(Sosubdata)
        }
        fetchdata()
    }, [])

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
        // let obj = { activity: '', majorCode: '', items: '', taxPer: 0, taxAmt: 0, taxable: '', glcode: '', Quantity: '', rate: '', unit: '', amount: '', total: '' }
        // itemsrowval.push(obj)
    }
    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        // let objval = [...itemsrowval];
        // objval.pop();
        // setItemsrowval(objval)
        // let subtotal = [...subTotal]
        // subtotal.pop();
        // setSubTotal(subtotal)
        // let gstamt = [...gstTotal]
        // gstamt.pop()
        // setGSTTotal(gstamt)
        // let grandtotalamt = [...grandTotal]
        // grandtotalamt.pop()
        // setGrandTotal(grandtotalamt)
        console.log(newvalue.length)
        if (newvalue.length == 1) {
            setTotalValues(newvalue)
        } else {
            newvalue.pop()
            setTotalValues(newvalue)
        }
    }



    const handleSubmit = async (btntype) => {
        if (btntype === 'save') {
            alert('Data Saved')
            window.location.href = "./SaveSalesOrder"
        }
        else {
            // const org = localStorage.getItem('Organisation')
            // const id = await Getfincialyearid(org)
            // const lastno = Number(id[0].po_count) + 1
            // setPOcount(lastno)
            // let new_po_num = id[0].po_ser + id[0].year + String(lastno).padStart(5, '0')

            // const result = await Editpurchaseorder(localStorage.getItem('Organisation'), new_po_num, 'post', localStorage.getItem('poNo'));

            // if (result === "Updated") {
            //     await Updatefinancialcount(org, 'po_count', lastno)
            //     alert('Po Posted')
            //     window.location.href = "./SavePurchaseOrder"
            // }
        }
    }
    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />

                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h3 className="pt-3 px-5">Edit Sales Order</h3>
                        <div className="card">
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row mt-2">
                                        <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span style={{ color: "red" }}>*</span> </label>
                                        <div className="d-flex col-md">
                                            <select id="cust_id" className="form-control col-md-5">
                                                <option value={soData.cust_id} hidden>{soData.cust_id}</option>
                                                {
                                                    activecustomer.map((items, index) => (
                                                        <option key={index} value={items.cust_id} >{items.cust_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row mt-2">
                                        <label className="col-md-2 col-form-label font-weight-normal" >Customer Location <span style={{ color: "red" }}>*</span> </label>
                                        <div className="d-flex col-md">
                                            <button type="button" className="btn border col-md-5" data-toggle="modal" data-target="#custAddnmodal"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTimeout(() => {
                                                        document.getElementById('searchCustAddress').focus()
                                                    }, 700)
                                                }}
                                            >
                                                {
                                                    custAddressLocation.length > 0 ? `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}` : `${soData.cust_addressid}`
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label className="col-md-2 col-form-label font-weight-normal" >SO Number </label>
                                        <div className="d-flex col-md">
                                            <input type="text" className="form-control col-md-5" id="so_no" value={soData.so_no} disabled />
                                        </div>
                                    </div>
                                    <div className="form-row mt-2">
                                        <label className="col-md-2 col-form-label font-weight-normal" >SO Date</label>
                                        <div className="d-flex col-md">
                                            <input type="date" className="form-control col-md-5" id="Sodate" value={soData.sodate} disabled />
                                        </div>
                                    </div>
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
                                                            <select id={`Activity-${index}`} className="form-control">
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
                                                                <select id={`items-${index}`} className='form-control col'>
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
                                                            <input className='form-control' type="number" id={`Quality-${index}`} placeholder="0" value={element.qty} />
                                                        </td>
                                                        <td className='px-1' style={{ maxWidth: '10px' }}>
                                                            <input className="form-control" type="number" id={`Rate-${index}`} value={element.rate} />
                                                        </td>
                                                        <td id="gst" className='col-md-1 px-1'>
                                                            <input type='text' id={`tax-${index}`} className="form-control col cursor-notallow" disabled value={element.gst_amt} />
                                                        </td>
                                                        <td className='px-1 col-md-2'>
                                                            <select className='form-control col' id={`unit-${index}`}>
                                                                <option value='' hidden >{element.unit}</option>
                                                                {
                                                                    activeunit.map((item, index) => (
                                                                        <option key={index} value={item.unit_name}>{item.unit_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </td>
                                                        <td id="amountvalue" className='col-md-1 px-1'>
                                                            <input type='text' className="form-control col cursor-notallow" id={`amount-${index}`} disabled value={element.net_amt} />
                                                        </td>
                                                        <td id="Totalsum" className='col-md-1 px-1'>
                                                            <input type='text' className="form-control col cursor-notallow" id={`TotalAmount-${index}`} disabled value={element.total_amt} />
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    {/* <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                    <button className="btn btn-danger" onClick={handleRemove}>Remove</button> */}

                                    <div className='d-flex justify-content-between'>
                                        <div style={{ width: "40%" }}>
                                            <div className="form mt-2">
                                                <label className="col-md-7 col-form-label font-weight-normal" >Remark</label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="2" id="remark" value={soData.remark}></textarea>
                                                </div>
                                                <label className="col-md-7 col-form-label font-weight-normal" >Terms & Conditions</label>

                                            </div>
                                        </div>
                                        <div style={{ width: "55%", marginLeft: "3px", padding: "20px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                            <table style={{ width: "100%" }}>
                                                <thead></thead>
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
                                    <button id="save" name="save" className="btn btn-danger" onClick={(e) => { e.preventDefault(); handleSubmit("Save") }}>  Save</button>
                                    <button id="save" name="save" className="btn btn-danger ml-2" onClick={(e) => { e.preventDefault(); handleSubmit("Post") }} > Post</button>
                                    <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SaveSalesOrder' }} name="clear" className="btn ml-2 btn-secondary">Cancel </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}