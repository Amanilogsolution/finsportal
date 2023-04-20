import React, { useEffect, useState } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, ShowCustAddress, ActiveAccountMinorCode, ActiveItems, Activeunit } from '../../../api/index'

function SalesOrder() {
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

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const result = await ActiveCustomer(org)
            setActiveCustomer(result)

            const ActiveAccount = await ActiveAccountMinorCode(org)
            setActiveAccount(ActiveAccount)

            const ActiveUnit = await Activeunit(org)
            setActiveUnit(ActiveUnit)
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
        console.log(index, e.target.value)
        console.log(itemsrowval)
        e.preventDefault();
        itemtoggle[index] = true
        const datwe = e.target.value.split(',')
        console.log(datwe[1])
        itemsrowval[index].majorCode = datwe[1]
        const result2 = await ActiveItems(localStorage.getItem('Organisation'), datwe[0]);
        let value = [...itemsdata]
        value[index] = result2;
        setItemdata(value)
        let val = document.getElementById(`Activity-${index}`);
        let text = val.options[val.selectedIndex].text;
        itemsrowval[index].activity = text;
        // if (text === 'WAREHOUSING') {
        //     document.getElementById('FTdate').style.display = "flex"
        // }
        // else {
        //     document.getElementById('FTdate').style.display = "none"
        // }
    }

    const handleChangeItems = async (value, index) => {
        const [gstper, item, glcodes] = value.split('^')
        itemsrowval[index].items = item
        itemsrowval[index].taxPer = Number(gstper)
        itemsrowval[index].glcode = glcodes
        console.log(glcodes)
        if (gstper > 0) {
            itemsrowval[index].taxable = 'yes'
        } else {
            itemsrowval[index].taxable = 'No'
        }
        // document.getElementById('savebtn').disabled = true;
        // document.getElementById('postbtn').disabled = true;
    }

    const handleChangeQuantity_Rate = (index) => {
        console.log(index)
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
            console.log(Math.max(gstpercent))


            document.getElementById('subTotal').innerHTML = sum;
            document.getElementById('totalgst').innerHTML = gstamt;
            document.getElementById('totalgrand').innerHTML = grandamt;
            document.getElementById('gstper').innerHTML = `${Math.max(gstpercent)} %`



        }, 1000)
        // document.getElementById('savebtn').disabled = true;
        // document.getElementById('postbtn').disabled = true;
    }
    const handleChangeUnit = (index, e) => {
        itemsrowval[index].unit = e.target.value;
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
        console.log(newvalue.length)
        if (newvalue.length == 1) {
            setTotalValues(newvalue)
        } else {
            newvalue.pop()
            setTotalValues(newvalue)
        }
    }
    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}

                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row pt-3" >
                            <div className="col">
                                <div className="card">
                                    <article
                                        className="card-body"
                                    >
                                        <h3 className="text-left">New Sales Order</h3>
                                        <br />
                                        <form autoComplete="off">
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >Customer Name <span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="AccountType"
                                                        className="form-control col-md-5"
                                                        onChange={handleCustname}
                                                    >
                                                        <option defaultValue hidden>Select Customer</option>
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
                                                            custAddressLocation.length > 0 ? `${custAddressLocation[0]}, ${custAddressLocation[1]}, ${custAddressLocation[2]}` : 'Select Customer Address Location'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label className="col-md-2 col-form-label font-weight-normal" >SO Number<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="text" className="form-control col-md-5" id="Accountname" placeholder="SO-00001" />
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <label className="col-md-2 col-form-label font-weight-normal" >SO Date<span style={{ color: "red" }}>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-5" id="Sodate" placeholder="EST-00001" />
                                                </div>
                                            </div>
                                            <hr />
                                            <table className="table  table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Activity</th>
                                                        <th scope="col">Items</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col">Tax Amt</th>
                                                        <th scope="col">Unit</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Total</th>                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        totalValues.map((element, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <select id={`Activity-${index}`} className="form-control"
                                                                        onChange={(e) => handleChangeActivity(e, index)}
                                                                    >
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
                                                                                        <option key={index} value={`${item.gst_rate}^${item.item_name}^${item.chart_of_acct_id}`} >{item.item_name}</option>
                                                                                    ))
                                                                                    : null
                                                                            }
                                                                        </select>
                                                                    }
                                                                </td>
                                                                <td className='px-1' style={{ maxWidth: '10px' }}>
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
                                            <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                            <button className="btn btn-danger" onClick={handleRemove}>Remove</button>

                                            <div style={{ display: "flex" }}>
                                                <div style={{ width: "40%" }}>
                                                    <div className="form mt-3">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Customer Notes</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="3" id="Accountname" placeholder="Looking forward for your bussiness "></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ width: "55%", marginLeft: "3px", padding: "20px", backgroundColor: "#eee", borderRadius: "7px" }}>
                                                    <table style={{ width: "100%" }}>
                                                        <thead></thead>
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
                                            <hr />
                                            <div style={{ display: "flex" }}>
                                                <div style={{ width: "55%" }}>
                                                    <div className="form mt-3">
                                                        <label className="col-md-7 col-form-label font-weight-normal" >Terms & Conditions</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " id="Accountname" rows="3" placeholder=" "></textarea>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                                <div className="col-md-20" style={{ width: "100%" }}>
                                                    <button id="save" name="save" className="btn btn-danger">
                                                        Save and Send
                                                    </button>
                                                    <button id="clear" onClick={(e) => {
                                                        e.preventDefault(); window.location.href = '/home'
                                                    }} name="clear" className="btn ml-2">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                            : 'Select Customer'
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


        </div>
    )
}

export default SalesOrder
