import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import './bill.css'
import { ActiveVendor, ActiveSelectedVendor, ActivePurchesItems, Activeunit, ActivePaymentTerm, SelectVendorAddress, Getfincialyearid, InsertBill, ActiveUser, ActiveLocationAddress, InsertSubBill, Updatefinancialcount, UploadData, GetPodetailsVendor, showOrganisation } from '../../../api'
import PreviewBill from './PreviewBill/PreviewBill';


function Bills() {
    const [totalValues, setTotalValues] = useState([1])
    const [vendorlist, setVendorlist] = useState([])
    const [unitlist, setUnitlist] = useState([])
    const [paymenttermlist, setPaymenttermlist] = useState([])
    const [vendorselectedlist, setVendorselectedlist] = useState([])
    const [vendorlocation, setVendorLocation] = useState([])
    const [vouchercount, setVouchercount] = useState(0)
    const [activeuser, setActiveUser] = useState([])
    const [itemlist, setItemlist] = useState([])
    const [locationstate, setLocationstate] = useState([])
    const [polist, setPolist] = useState([]);
    const [vendorlocations, setVendorLocations] = useState('')

    const [netTotal, setNetTotal] = useState(0);

    const [cgstval, setCgstval] = useState(0)
    const [sgstval, setSgstval] = useState(0)
    const [igstval, setIgstval] = useState(0)

    const [file, setFile] = useState('');
    const [img, setimage] = useState('')
    const [orgdata, setOrgdata] = useState([]);

    const [tdscomp, setTdscomp] = useState();


    const [billalldetail, setBillalldetail] = useState({
        voucher_no: '',
        voucher_date: '',
        bill_date: '',
        pay_to: '',
        net_amt: '',
        cgst_amt: '',
        sgst_amt: '',
        igst_amt: '',
        bill_amt: '',
        tds_per: '',
        tds_amt: '',
        remarks: ''
    })

    const [tabledata, setTabledata] = useState([
        {
            location: '',
            item: '',
            glcode: '',
            sac_hsn: '',
            employee: '',
            quantity: '',
            rate: '0',
            amount: '0',
            deduction: '0',
            ref_fileno: '',
            unit: '',
            netamount: '0'
        }
    ])


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const dataId = await ActiveVendor(org)
            setVendorlist(dataId)
            Todaydate()

            const units = await Activeunit(org)
            setUnitlist(units)
            const payment = await ActivePaymentTerm(org)
            setPaymenttermlist(payment)

            const locatonstateres = await ActiveLocationAddress(org)
            setLocationstate(locatonstateres)

            const result2 = await ActiveUser()
            setActiveUser(result2)
            const items = await ActivePurchesItems(org)
            setItemlist(items)
            console.log(items)
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].voucher_count) + 1
            setVouchercount(lastno)
            document.getElementById('voucher_no').defaultValue = id[0].voucher_ser + id[0].year + String(lastno).padStart(5, '0')

            const result = await showOrganisation(org)
            setOrgdata(result)

            document.getElementById('savebtn').disabled = true;
            document.getElementById('postbtn').disabled = true;
        }
        fetchdata();
    }, [])

    const Todaydate = () => {
        var date = new Date();
        // var myDate = new Date(new Date().getTime() + (180 * 24 * 60 * 60 * 1000));
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("voucher_date").defaultValue = today;
        document.getElementById("bill_date").defaultValue = today;    
    }

    const Duedate = (lastday) => {
        console.log(lastday)
        let [val, Ter] = lastday.split(" ")
        Ter = Number(lastday) || 45;
        let myDate = new Date(new Date().getTime() + (Ter * 24 * 60 * 60 * 1000));
        let day = myDate.getDate();
        let month = myDate.getMonth() + 1;
        let year = myDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        document.getElementById("due_date").defaultValue = today;
    }

    const handleAccountTerm = (e) => {
        const days = Number(e.target.value)
        Duedate(days)
    }

    const handlevendorselect = async (e) => {
        const result = await ActiveSelectedVendor(localStorage.getItem('Organisation'), e.target.value);
        setVendorselectedlist(result[0])
        console.log(result[0])

        Duedate(result[0].payment_terms);

        const result1 = await SelectVendorAddress(localStorage.getItem('Organisation'), e.target.value);
        setVendorLocation(result1)

        const po_number = await GetPodetailsVendor(localStorage.getItem('Organisation'), e.target.value)
        setPolist(po_number);
    }

    const handleChangeLocation = (e, index) => {
        tabledata[index].location = e.target.value
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTotalValues([...totalValues, 1])
        setTabledata([...tabledata, {
            location: '',
            item: '',
            glcode: '',
            sac_hsn: '',
            employee: '',
            quantity: '0',
            rate: '0',
            amount: '0',
            deduction: '0',
            ref_fileno: '',
            unit: '',
            netamount: '0'
        }])
    }

    const handleRemove = (e) => {
        e.preventDefault()
        var newvalue = [...totalValues]
        var newtablevalue = [...tabledata]
        if (newvalue.length === 1) {
            setTotalValues(newvalue)
            setTabledata(newtablevalue)
        } else {
            newvalue.pop()
            newtablevalue.pop()
            setTotalValues(newvalue)
            setTabledata(newtablevalue)
        }
    }

    const handleTdsCompany = (e) => {
        setTdscomp(e.target.value)
    }

    const handleChangeEmployee = (e, index) => {
        tabledata[index].employee = e.target.value
    }

    // Item Hadle Calculation

    const handleChangeItems = (e, index) => {
        let val = e.target.value;
        let item_arr = val.split('^')
        tabledata[index].item = item_arr[0]
        tabledata[index].glcode = item_arr[1]
        tabledata[index].sac_hsn = item_arr[2] || item_arr[3]
    }

    // Quantity Hadle Calculation
    const handleChangeQuantity = (e, index) => {
        tabledata[index].quantity = e.target.value

        document.getElementById(`Quantity${index}`).value = e.target.value;

        let amt = document.getElementById(`rate${index}`).value * e.target.value
        document.getElementById(`amount${index}`).value = amt;
        tabledata[index].amount = amt


        let netamt = document.getElementById(`amount${index}`).value - document.getElementById(`deduction${index}`).value
        document.getElementById(`netamt${index}`).value = netamt;
        tabledata[index].netamount = netamt

        setNetTotal(0)
        setCgstval(0)
        setSgstval(0)
        setIgstval(0)

        document.getElementById('cgst-inp').value = 0;
        document.getElementById('sgst-inp').value = 0;
        document.getElementById('igst-inp').value = 0;
    }

    // Rate Hadle Calculation
    const handleChangeRate = (e, index) => {
        tabledata[index].rate = e.target.value
        document.getElementById(`rate${index}`).value = e.target.value;


        let amt = document.getElementById(`Quantity${index}`).value * e.target.value
        document.getElementById(`amount${index}`).value = amt;
        tabledata[index].amount = amt

        let netamt = document.getElementById(`amount${index}`).value - document.getElementById(`deduction${index}`).value
        document.getElementById(`netamt${index}`).value = netamt;
        tabledata[index].netamount = netamt

        setNetTotal(0)
        setCgstval(0)
        setSgstval(0)
        setIgstval(0)

        document.getElementById('cgst-inp').value = 0;
        document.getElementById('sgst-inp').value = 0;
        document.getElementById('igst-inp').value = 0;
    }

    // Deduction Hadle Calculation
    const handleChangeDeduction = (e, index) => {
        tabledata[index].deduction = e.target.value
        document.getElementById(`deduction${index}`).value = e.target.value;

        let netamt = document.getElementById(`amount${index}`).value - e.target.value
        document.getElementById(`netamt${index}`).value = netamt;
        tabledata[index].netamount = netamt
    }
    // Ref no /File no Hadle Calculation
    const handleChangeFileno = (e, index) => {
        tabledata[index].ref_fileno = e.target.value;
        document.getElementById(`fileno${index}`).value = e.target.value;
    }
    // Unit Hadle Calculation
    const handleChangeUnit = (e, index) => {
        tabledata[index].unit = e.target.value;
    }

    //Toggle & Calculation of Gst Div
    const handletogglegstdiv = () => {
        var sum = 0
        tabledata.map((item) => sum += item.netamount)
        setNetTotal(sum)
        document.getElementById('totalamount').value = sum;
        if (document.getElementById('gstdiv').style.display == 'none') {
            document.getElementById('gstdiv').style.display = 'block';
        }
        else {
            document.getElementById('gstdiv').style.display = 'none';
        }
        const vendor_detail = document.getElementById('vend_name');
        const vendor_name = vendor_detail.options[vendor_detail.selectedIndex].text;
        setBillalldetail({
            ...billalldetail,
            voucher_no: document.getElementById('voucher_no').value,
            voucher_date: document.getElementById('voucher_date').value,
            pay_to: vendor_name,
            bill_date: document.getElementById('bill_date').value,
            bill_amt: document.getElementById('bill_amt').value,
        })
        document.getElementById('savebtn').disabled = false;
        document.getElementById('postbtn').disabled = false;
    }


    // ################################ Toggle & Calculation of Gst Div ##########################################
    const handlegst_submit = (e) => {
        e.preventDefault();
        console.log(tabledata)
        const gst_type = document.getElementById('gsttype').value;
        const totalvalue = document.getElementById('totalamount').value
        const gst = document.getElementById('gstTax').value
        let tax = totalvalue * gst / 100
        tax = Math.round(tax)
        const val = netTotal
        setNetTotal(val + tax)
        if (gst_type === 'Inter') {
            setCgstval(0)
            setSgstval(0)
            setIgstval(tax)

            document.getElementById('cgst-inp').value = 0;
            document.getElementById('sgst-inp').value = 0;
            document.getElementById('igst-inp').value = gst;

        }
        else if (gst_type === 'Intra') {
            setCgstval(Math.round(tax / 2))
            setSgstval(Math.round(tax / 2))
            setIgstval(0)

            document.getElementById('cgst-inp').value = Math.round(gst / 2);
            document.getElementById('sgst-inp').value = Math.round(gst / 2);
            document.getElementById('igst-inp').value = 0;
        }

        document.getElementById('gstdiv').style.display = 'none';
    }

    // Upload Document ##########################################
    const handleSendFile = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("images", file)
        const UploadLink = await UploadData(data)
        setimage(UploadLink)
    }

    // ################################ Toggle & Calculation of TDS Div ##########################################

    const handletds = () => {
        if (document.getElementById('tdsdiv').style.display === 'none') {
            document.getElementById('tdsdiv').style.display = 'block';
        }
        else {
            document.getElementById('tdsdiv').style.display = 'none';
        }

        setBillalldetail({
            ...billalldetail,
            cgst_amt: document.getElementById('cgstamt').innerHTML,
            sgst_amt: document.getElementById('sgstamt').innerHTML,
            igst_amt: document.getElementById('igstamt').innerHTML,

        })
        document.getElementById('savebtn').disabled = false;
        document.getElementById('postbtn').disabled = false;
    }

    const handletdsbtn = (e) => {
        e.preventDefault();
        const TdsAmount = document.getElementById('tds_amt').value
        const TdsPer = document.getElementById('tds_per').value
        const amount = TdsAmount * TdsPer / 100
        const value = netTotal
        setNetTotal(value - Math.round(amount))

        document.getElementById('tdsperinp').defaultValue = TdsPer;
        document.getElementById('tdstagval').innerHTML = Math.round(amount);

        document.getElementById('tdsdiv').style.display = 'none';

        setBillalldetail({
            ...billalldetail,
            tds_per: document.getElementById('tdsperinp').value,
            tds_amt: document.getElementById('tdstagval').innerHTML,
            net_amt: document.getElementById('total_bill_amt').innerHTML
        })
    }

    // ################################ Expense Div ##########################################

    const handlesetalldata = (e) => {
        e.preventDefault();
        const value = netTotal;
        setNetTotal(value - Number(e.target.value))
        document.getElementById('expense-amttd').innerHTML = e.target.value;
    }

    // ################################ Remark Div ##########################################

    const handlesetremark = (e) => {
        e.preventDefault();
        setBillalldetail({
            ...billalldetail,
            remarks: document.getElementById('remarks').value,
            net_amt: document.getElementById('total_bill_amt').innerHTML

        })
        document.getElementById('savebtn').disabled = false;
        document.getElementById('postbtn').disabled = false;
    }

    const handleClickAdd = async (e) => {
        e.preventDefault()
        document.getElementById('savebtn').disabled = true;
        document.getElementById('postbtn').disabled = true;
        const btn_type = e.target.value;
        let voucher_no = "";

        if (btn_type === 'save') {
            voucher_no = 'VOUCHER' + Math.floor(Math.random() * 10000) + 1;
        }
        else {
            voucher_no = document.getElementById('voucher_no').value
        }

        const voucher_date = document.getElementById('voucher_date').value
        const vendor_detail = document.getElementById('vend_name');
        const vendor_id = vendor_detail.value;
        const vendor_name = vendor_detail.options[vendor_detail.selectedIndex].text;

        const Location = vendorlocations
        const bill_no = document.getElementById('bill_no').value
        const bill_date = document.getElementById('bill_date').value
        const bill_amt = document.getElementById('bill_amt').value
        const po_no = document.getElementById('po_no').value
        const total_bill_amt = document.getElementById('total_bill_amt').innerText;

        const payment_t = document.getElementById('payment_term_select').value
        const due_date = document.getElementById('due_date').value;
        const amt_paid = '';
        const amt_balance = '';
        const amt_booked = '';

        const tds_head = document.getElementById('tds_head').value;
        const tds_per = document.getElementById('tds_per').value || 0;
        const tds_amt = document.getElementById('tds_amt').value || 0;

        const expense_amt = document.getElementById('expense_amt').value;
        const remarks = document.getElementById('remarks').value
        const fins_year = localStorage.getItem('fin_year')

        const cgst_amt = Number(cgstval)
        const sgst_amt = Number(sgstval)
        const igst_amt = Number(igstval)
        const taxable_amt = (cgst_amt + sgst_amt + igst_amt) || 0;
        const non_taxable_amt = ''
        const userid = localStorage.getItem('User_id')

        if (!voucher_no) {
            alert('Please Enter mandatory field')
            document.getElementById('savebtn').disabled = false;
            document.getElementById('postbtn').disabled = false;
        }
        else {
            if (bill_amt !== total_bill_amt) {
                alert('Bill Amount and Total Amount must be same')
                document.getElementById('savebtn').disabled = false;
                document.getElementById('postbtn').disabled = false;
            }
            else {
                const org = localStorage.getItem('Organisation')
                const result = await InsertBill(org, voucher_no, voucher_date, vendor_name, Location, bill_no,
                    bill_date, bill_amt, total_bill_amt, payment_t, due_date, amt_paid, amt_balance, amt_booked, tds_head, tdscomp, tds_per, tds_amt,
                    taxable_amt, non_taxable_amt, expense_amt, remarks, fins_year, cgst_amt, sgst_amt, igst_amt, userid, vendor_id, img, btn_type, po_no)

                if (result === 'Added') {
                    const result1 = await InsertSubBill(org, voucher_no, bill_no, tabledata, fins_year, userid)

                    if (btn_type !== 'save') {
                        await Updatefinancialcount(org, 'voucher_count', vouchercount)
                    }


                    if (result1 === 'Added') {
                        alert('Data Added')
                        window.location.href = './SaveBillReport';
                    }
                }
                else if (result === 'Already') {
                    alert('Bill no Already exists');
                    document.getElementById('savebtn').disabled = false;
                    document.getElementById('postbtn').disabled = false;
                }

                else {
                    alert('Server Not Response')
                    document.getElementById('savebtn').disabled = false;
                    document.getElementById('postbtn').disabled = false;
                }
            }
        }

    }



    return (
        <>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                <div className={`content-wrapper `}>
                    <div className="container-fluid ">
                        <h3 className="pt-3 pb-1 ml-5"> New Bill</h3>
                        <div className={`card mb-2 `}>
                            <article className="card-body">
                                <form autoComplete="off">
                                    <div className="form-row ">
                                        <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <select
                                                id="vend_name"
                                                onChange={handlevendorselect}
                                                className="form-control col-md-4">
                                                <option value='' hidden>select vendor</option>
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

                                            <button type="button" className="btn border" data-toggle="modal" data-target="#locationmodal">
                                                {
                                                    vendorlocations ? vendorlocations : 'Select Vendor Location'
                                                }
                                            </button>
                                        </div>

                                    </div>

                                    <div className="form-row mt-3" >
                                        <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >Voucher no </label>
                                        <div className="d-flex col-md-4" >
                                            <input type="text" className="form-control col-md-10 cursor-notallow" id="voucher_no" placeholder="" disabled />
                                        </div>
                                        <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">Voucher Date</label>
                                        <div className="d-flex col-md-4 " >
                                            <input type="date" className="form-control col-md-10 cursor-notallow" id="voucher_date" disabled />
                                        </div>
                                    </div>

                                    <div className="form-row mt-3">
                                        <label htmlFor='bill_no' className="col-md-2 col-form-label font-weight-normal" >Bill number<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="text" className="form-control col-md-4" id="bill_no" />
                                        </div>
                                    </div>

                                    <div className="form-row mt-3">
                                        <label className="col-md-2 col-form-label font-weight-normal" >P.O number</label>
                                        <div className="d-flex col-md">
                                            <select className="form-control col-md-4" id="po_no">
                                                <option hidden value=''>Select P.O number</option>
                                                {
                                                    polist.length > 0 ?
                                                        polist.map((item, i) => (
                                                            <option key={i} value={item.po_number}>{item.po_number}</option>
                                                        )) :
                                                        <option value=''>PO. is not Created in this vendor</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <label htmlFor='bill_amt' className="col-md-2 col-form-label font-weight-normal">Bill Amount<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="number" className="form-control col-md-4" id="bill_amt" />
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Bill Date<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md">
                                            <input type="date" className="form-control col-md-4" id="bill_date" max={`20${localStorage.getItem('year')}-04-01`} min={`20${localStorage.getItem('year')-1}-03-31`}/>
                                        </div>
                                    </div>

                                    <div className="form-row mt-3" >
                                        <label htmlFor='payment_term_select' className="col-md-2 col-form-label font-weight-normal" >Payment Terms<span className='text-danger'>*</span> </label>
                                        <div className="d-flex col-md-4" >
                                            <select
                                                id="payment_term_select"
                                                className="form-control col-md-10" onChange={handleAccountTerm}>
                                                <option value={vendorselectedlist.payment_terms} hidden>{vendorselectedlist.payment_terms}</option>
                                                {
                                                    paymenttermlist.map((item, index) => (
                                                        <option key={index} value={item.term}>{item.term}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <label htmlFor='due_date' className="col-md-1 col-form-label font-weight-normal" >Due Date</label>
                                        <div className="d-flex col-md-4 " >
                                            <input type="date" className="form-control col-md-10 cursor-notallow" id="due_date" disabled />
                                        </div>
                                    </div>

                                    <br />
                                    <table className="table table-striped table-bordered">
                                        <thead className='text-center'>
                                            <tr>
                                                <th scope="col">Location</th>
                                                <th scope="col">Item Details</th>
                                                <th scope="col">Employee</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Deduction</th>
                                                <th scope="col">Refno/FIleno</th>
                                                <th scope="col">Unit</th>
                                                <th scope="col">Net Amt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                totalValues.map((element, index) => (
                                                    <tr key={index}>
                                                        <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                            <select className="form-control ml-0" onChange={(e) => { handleChangeLocation(e, index) }}>
                                                                <option value='' hidden>Select Location</option>
                                                                {
                                                                    locationstate.map((item, index) => (
                                                                        <option key={index} value={item.location_name} >{item.location_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                            <select className="form-control ml-0" onChange={(e) => { handleChangeItems(e, index) }}>
                                                                <option value='' hidden>Select Item</option>
                                                                {
                                                                    itemlist.map((items, index) => (
                                                                        <option key={index} value={`${items.item_name}^${items.glcode}^${items.hsn_code}^ ${items.sac_code}`}>{items.item_name}</option>

                                                                    ))
                                                                }
                                                            </select>
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <select className="form-control ml-0" onChange={(e) => { handleChangeEmployee(e, index) }}>
                                                                <option value='' hidden>Select Employee</option>
                                                                {
                                                                    activeuser.map((items, index) => (
                                                                        <option key={index} value={items.employee_name} >{items.employee_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='number' id={`Quantity${index}`} onChange={(e) => { handleChangeQuantity(e, index) }} className="form-control" />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='number' id={`rate${index}`} onChange={(e) => handleChangeRate(e, index)} className="form-control" />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <input type='number' id={`amount${index}`} className="form-control cursor-notallow" disabled />
                                                        </td>

                                                        <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                            <input type='number' id={`deduction${index}`} className="form-control" defaultValue={0} onChange={(e) => handleChangeDeduction(e, index)} />

                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                            <input type='text' className="form-control" id={`fileno${index}`} onChange={(e) => handleChangeFileno(e, index)} />
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                            <select className="form-control ml-0" onChange={(e) => handleChangeUnit(e, index)} >
                                                                <option value='' hidden>Select Unit</option>
                                                                {
                                                                    unitlist.map((item, index) =>
                                                                        <option key={index} value={item.unit_name}>{item.unit_name}</option>)
                                                                }
                                                            </select>
                                                        </td>
                                                        <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                            <input type='number' id={`netamt${index}`} className="form-control cursor-notallow" disabled />
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    <button className="btn btn-primary" onClick={handleAdd}>Add Item</button>   &nbsp;
                                    <button className="btn btn-danger" onClick={handleRemove}>Remove</button>
                                    <hr />

                                    <div className='d-flex'>
                                        <div style={{ width: "40%" }}>
                                            <div className="form mt-2">
                                                <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                <div className="d-flex col-md">
                                                    <textarea type="text" className="form-control " rows="5" id="remarks" placeholder="Remarks" style={{ resize: "none" }} onBlur={handlesetremark}></textarea>
                                                </div>

                                            </div>
                                            <div className='mt-3'>
                                                <label className="font-weight-normal" >Attach file(s) to Estimate</label><br />
                                                <button type="button" className='btn btn-success' data-toggle="modal" data-target="#exampleModal">
                                                    <i className='ion-android-attach'></i> &nbsp;
                                                    Attach File</button>
                                            </div>
                                        </div>
                                        <div style={{ width: "55%", marginLeft: "3px", padding: "5px", background: '#eee', borderRadius: "7px" }}>
                                            <table className='table table-borderless' style={{ width: "100%" }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ position: "relative" }}>
                                                    <tr scope="row">
                                                        <td style={{ width: "150px" }} >
                                                            <a title='Click to Input GST Data' className='cursor-pointer' style={{ borderBottom: "1px dashed #000" }} onClick={handletogglegstdiv} >Total CGST Amt *
                                                            </a>
                                                            <div className="dropdown-menu-lg bg-white rounded" id='gstdiv' style={{ width: "750px", display: "none", boxShadow: "3px 3px 10px #000", position: "absolute", left: "-300px", top: "20px" }}>
                                                                <div className="card-body p-2">
                                                                    <i className="fa fa-times" aria-hidden="true" onClick={handletogglegstdiv}></i>
                                                                    <div className="form-group ">
                                                                        <label htmlFor='gsttype' className="col-form-label font-weight-normal" >Select GST Type <span className='text-danger'>*</span> </label>
                                                                        <div>
                                                                            <select
                                                                                id="gsttype"
                                                                                className="form-control col">
                                                                                <option value='' hidden>Select GST Type</option>
                                                                                <option value='Intra'>Intra</option>
                                                                                <option value='Inter' >Inter</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-row">
                                                                        <label htmlFor='location' className="col-md-5 form-label font-weight-normal" >Total Amt <span className='text-danger'>*</span> </label>
                                                                        <input type="number" className="form-control col-md-7 cursor-notallow" id="totalamount" defaultValue={netTotal} disabled />
                                                                    </div>
                                                                    <div className="form-row" >
                                                                        <label htmlFor='location' className="col-md-5 form-label font-weight-normal"  >GST Tax(%) <span className='text-danger'>*</span> </label>
                                                                        <input type="text" className="form-control col-md-7" id="gstTax" />
                                                                    </div>
                                                                    <br />
                                                                    <button className='btn btn-outline-primary float-right' onClick={handlegst_submit} >Submit</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='form-control col-md p-0 bg-transparent pb-1'>
                                                            <div className="input-group" >
                                                                <input type="number" className="form-control col-md-5 ml-5  cursor-notallow" id='cgst-inp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='cgstamt'>{cgstval}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total SGST Amt</td>
                                                        <td className='form-control col-md p-0 bg-transparent border-none'>
                                                            <div className="input-group" >
                                                                <input type="" className="form-control col-md-5 ml-5  cursor-notallow" id='sgst-inp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='sgstamt'>{sgstval}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total IGST Amt</td>
                                                        <td className='form-control col-md p-0 bg-transparent ' >
                                                            <div className="input-group" >
                                                                <input type='number' className="form-control col-md-5 ml-5  cursor-notallow" id='igst-inp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='igstamt'>{igstval}</td>
                                                    </tr>
                                                    <tr scope="row">
                                                        <td style={{ width: "150px" }}>
                                                            <a title='Click to Input TDS Data' className='cursor-pointer' style={{ borderBottom: "1px dashed #000" }} onClick={handletds}> TDS *
                                                            </a>
                                                            <div className="dropdown-menu-lg rounded bg-white" id='tdsdiv' style={{ display: "none", width: "750px", boxShadow: "3px 3px 10px #000", position: "absolute", top: "0px", left: "-300px" }}>
                                                                <div className="card-body" >
                                                                    <i className="fa fa-times" aria-hidden="true" onClick={handletds}></i>

                                                                    <div className="form-group" style={{ marginBottom: "0px" }} id='tdshead'>
                                                                        <label htmlFor='location' className="col-form-label font-weight-normal" >TDS Head <span className='text-danger'>*</span> </label>
                                                                        <div className="form-row m-0">

                                                                            <select className="form-control col" id='tds_head'>
                                                                                <option value='' hidden>Select Tds head</option>
                                                                                <option value='Cost'>Cost</option>
                                                                                <option value='Salary'>Salary</option>
                                                                                <option value='Rent'>Rent</option>
                                                                                <option value='Profit'>Profit</option>
                                                                                <option value='Brokerage'>Brokerage</option>

                                                                            </select>
                                                                        </div>

                                                                    </div>
                                                                    <div className="form-row m-0" >
                                                                        <input type="radio" id='tds_comp' name='comp_type' value='Company' onChange={handleTdsCompany} />
                                                                        <label htmlFor='company' className="col-md-4 form-label font-weight-normal mt-1"  >Company</label>

                                                                        <input type="radio" id='tds_comp' name='comp_type' value='Non-Company' onChange={handleTdsCompany} />&nbsp;
                                                                        <label htmlFor='non_company' className=" form-label font-weight-normal mt-1" > Non-Company</label>

                                                                    </div>
                                                                    <div className="form-row" >
                                                                        <label htmlFor='tds_amt' className="col-md-5 form-label font-weight-normal"  >TDS Amount <span className='text-danger'>*</span> </label>
                                                                        <input type="number" className="form-control col-md-7" id='tds_amt' />
                                                                    </div>
                                                                    <div className="form-row" >
                                                                        <label htmlFor='tds_per' className="col-md-5 form-label font-weight-normal"  >TDS(%) <span className='text-danger'>*</span> </label>
                                                                        <input type="number" className="form-control col-md-7" id='tds_per' />
                                                                    </div>
                                                                    <br />
                                                                    <button className='btn btn-outline-primary float-right' onClick={handletdsbtn}>Submit</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='form-control col-md p-0 bg-transparent '>
                                                            <div className="input-group" >
                                                                <input type="text" className="form-control col-md-5 ml-5 cursor-notallow" id='tdsperinp' disabled />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center' style={{ width: "150px" }} id='tdstagval'>0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Expense Amt </td>
                                                        <td className='form-control col-md p-0 bg-transparent '>
                                                            <input type="text" className="form-control col-md-6 ml-5" id='expense_amt' onBlur={handlesetalldata} />
                                                        </td>
                                                        <td className='text-center' id='expense-amttd' style={{ width: "150px" }}>0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td><h4>Total</h4></td>
                                                        <td></td>
                                                        <td className='text-center' style={{ width: "150px" }} id='total_bill_amt'>{netTotal}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <PreviewBill data={billalldetail} Allitems={tabledata} orgdata={orgdata} />

                                </form>
                            </article>
                            <div className="card-footer border-top">
                                <button id="savebtn" type='submit' name="save" className="btn btn-danger"
                                    onClick={handleClickAdd}
                                    value='save'>Save</button>
                                <button id="postbtn" name="save" className="btn btn-danger ml-2"
                                    onClick={handleClickAdd}
                                    value='post'>Post </button>
                                <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/home' }} name="clear" className="btn bg-secondary ml-2">Cancel</button>
                                <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" >Preview Bill</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                {/* modal  Start*/}
                <div className="modal fade bd-example-modal-lg" id="locationmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Vendor Location</h5>
                            </div>
                            <div className="modal-body overflow-auto px-5" style={{ maxHeight: '60vh' }}>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th><input type='radio' name='radiocity' /> <label>City</label> </th>
                                            <th><input type='radio' name='radiocity' /> <label>Address</label> </th>

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
                                                : 'Select Vendor'
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
                {/* modal  End*/}

            </div>

            {/* ----------------------- Attach File  Modal  Start --------------*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Attach Bill</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type='file' onChange={event => {
                                const document = event.target.files[0];
                                setFile(document)
                            }} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSendFile} data-dismiss="modal" >Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------- Attach File  Modal  End --------------*/}

        </>
    )
}

export default Bills
