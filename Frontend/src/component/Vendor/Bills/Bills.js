import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import './bill.css'
import { ActiveVendor, ActiveSelectedVendor, ActivePurchesItems, Activeunit, ActivePaymentTerm, SelectVendorAddress, Getfincialyearid, InsertBill, ActiveUser, ActiveLocationAddress, InsertSubBill, Updatefinancialcount, UploadData, GetPodetailsVendor, showOrganisation, SearchVendAddress, getPoData, getActiveTdsHead, getSubPoDetailsPreview } from '../../../api'
import PreviewBill from './PreviewBill/PreviewBill';
import LoadingPage from '../../loadingPage/loadingPage';

function Bills() {
    const [loading, setLoading] = useState(false);
    const [vendorlist, setVendorlist] = useState([]);
    const [unitlist, setUnitlist] = useState([]);
    const [paymenttermlist, setPaymenttermlist] = useState([]);
    const [vendorselectedlist, setVendorselectedlist] = useState([]);
    const [vendorlocation, setVendorLocation] = useState([]);
    const [vouchercount, setVouchercount] = useState(0);
    const [activeuser, setActiveUser] = useState([]);
    const [itemlist, setItemlist] = useState([]);
    const [locationstate, setLocationstate] = useState([]);
    const [polist, setPolist] = useState([]);
    const [netTotal, setNetTotal] = useState('');
    const [billsubtotalamt, setBillsubtotalamt] = useState(0);
    const [file, setFile] = useState('');
    const [img, setimage] = useState('');
    const [orgdata, setOrgdata] = useState([]);
    const [netamt, setNetamt] = useState('');
    const [tdsheadlist, setTdsheadlist] = useState([])
    const [billalldetail, setBillalldetail] = useState({
        voucher_no: '', voucher_date: '', vendor_name: '', vendor_id: '', vendor_location: [], bill_date: '', net_amt: '', gst_location: '', gst_location_state: '', cgst_amt: 0, sgst_amt: 0, igst_amt: 0, bill_amt: '', tds_head: '', tds_comp_type: '', tds_per: '', tds_amt: '', remarks: '', amtWithoutTax: 0
    })
    const tableSubObj = {
        location_id: '', location: '', item: '', glcode: '', sac_hsn: '', quantity: 0, rate: 0, amount: 0, unit: '', netamount: 0, gst_rate: 0, gst_amt: 0, tds_check: false
    }
    const [tableRowData, setTableRowData] = useState([tableSubObj])

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const dataId = await ActiveVendor(org)
            setVendorlist(dataId)
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

            const tds_list = await getActiveTdsHead(org)
            setTdsheadlist(tds_list)
            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].voucher_count) + 1

            const result = await showOrganisation(org)
            setOrgdata(result)

            setLoading(true)
            Todaydate()

            let bill_no = id[0].voucher_ser + id[0].year + String(lastno).padStart(5, '0')
            document.getElementById('voucher_no').defaultValue = bill_no
            setVouchercount(lastno)
            // document.getElementById('savebtn').disabled = true;
            // document.getElementById('postbtn').disabled = true;
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
        let Ter = Number(lastday) || 45;
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

    // Handle Add And Remove Row 
    const handleAddRemoveRow = (invokeType) => {
        if (invokeType === 'add') {
            setTableRowData([...tableRowData, tableSubObj])
        }
        else if (invokeType === 'remove') {
            if (tableRowData.length !== 1) {
                let newtablevalue = [...tableRowData];
                newtablevalue.pop()
                setTableRowData(newtablevalue)
            }
        }
    }

    const handlevendorselect = async (e) => {
        let org = localStorage.getItem('Organisation')

        const selectedVendData = await ActiveSelectedVendor(org, e.target.value);
        setVendorselectedlist(selectedVendData[0])
        Duedate(selectedVendData[0].payment_terms);

        const result1 = await SelectVendorAddress(org, e.target.value);
        setVendorLocation(result1)

        const po_number = await GetPodetailsVendor(org, e.target.value)
        setPolist(po_number);
        setBillalldetail({
            ...billalldetail,
            voucher_no: document.getElementById('voucher_no').value,
            voucher_date: document.getElementById('voucher_date').value,
            vendor_name: selectedVendData[0].vend_name,
            vendor_id: selectedVendData[0].vend_id
        })
    }

    const handleGetPoData = async (e) => {
        e.preventDefault();
        let org = localStorage.getItem('Organisation')

        const podata = await getPoData(org, e.target.value)
        document.getElementById('po_date').value = podata[0].podate
        const subpodata = await getSubPoDetailsPreview(org, e.target.value)

        let subtable = []
        let total_amt = 0;
        for (let i = 0; i < subpodata.length; i++) {
            subtable.push({
                location_id: podata[0]["ship_add_id"], location: podata[0]["ship_add_location"], item: subpodata[i]["items"],
                glcode: subpodata[i]["glcode"], sac_hsn: subpodata[i]["sac_hsn"], quantity: subpodata[i]["quantity"], rate: subpodata[i]["rate"], amount: subpodata[i]["amt"], unit: subpodata[i]["unit"],
                netamount: subpodata[i]["amt"],
                gst_rate: 0, gst_amt: 0, tds_check: false
            })
            total_amt = total_amt + Number(subpodata[i]["amt"])
        }
        setTableRowData(subtable);
        setNetamt(total_amt)
        // setAmtWithoutTax(total_amt)
        billalldetail.amtWithoutTax = total_amt;
    }
    const handleGSTLocation = (e) => {
        let temp_val = e.target.value.split('^')
        setBillalldetail({ ...billalldetail, gst_location: temp_val[0], gst_location_state: temp_val[1] })
    }

    const handleChangeLocation = (e, index) => {
        let val = e.target.value;
        let location_arr = val.split('^')
        tableRowData[index].location_id = location_arr[0]
        tableRowData[index].location = location_arr[1]
    }

    const handleTdsCompany = (e) => {
        setBillalldetail({ ...billalldetail, tds_comp_type: e.target.value })
    }

    // Item Handle Calculation
    const handleChangeItems = (e, index) => {
        let val = e.target.value;
        let item_arr = val.split('^')
        tableRowData[index].item = item_arr[0]
        tableRowData[index].glcode = item_arr[1]
        tableRowData[index].sac_hsn = item_arr[2] || item_arr[3]
    }

    // Quantity Handle Calculation
    const handleChangeQuantity = (e, index) => {
        tableRowData[index].quantity = e.target.value
        tableRowData[index].amount = tableRowData[index].rate * e.target.value;
        calculateMinorTable(e, index)
    }

    // Handle Rate Calculation
    const handleChangeRate = (e, index) => {
        tableRowData[index].rate = e.target.value
        tableRowData[index].amount = tableRowData[index].quantity * e.target.value;
        calculateMinorTable(e, index)
    }


    // Handle Unit Calculation
    const handleChangeUnit = (e, index) => {
        tableRowData[index].unit = e.target.value;
    }

    // Toggle & Calculation of Gst Div
    // const handletogglegstdiv = () => {
    //     document.getElementById('gstdiv').style.display = 'block';

    //     const vendor_detail = document.getElementById('vend_name');
    //     const vendor_name = vendor_detail.options[vendor_detail.selectedIndex].text;
    //     setBillalldetail({
    //         ...billalldetail,
    //         voucher_no: document.getElementById('voucher_no').value,
    //         voucher_date: document.getElementById('voucher_date').value,
    //         pay_to: vendor_name,
    //         bill_date: document.getElementById('bill_date').value,
    //         bill_amt: document.getElementById('bill_amt').value,
    //     })
    //     document.getElementById('savebtn').disabled = false;
    //     document.getElementById('postbtn').disabled = false;
    // }


    // ################################ Toggle & Calculation of Gst Div ##########################################
    const handlegst_submit = (e, index) => {
        e.preventDefault();

        if (e.target.value <= 100) {
            tableRowData[index].gst_rate = e.target.value
            calculateMinorTable(e, index)
        }
    }

    const calculateMinorTable = (e, index) => {
        e.preventDefault();
        console.log(tableRowData)
        const totalvalue = tableRowData[index].amount
        const gst = tableRowData[index].gst_rate
        let tax = totalvalue * gst / 100;
        console.log(tax)
        tax = tax.toFixed(2)
        // document.getElementById(`netamt${index}`).value = Number(tax) + Number(totalvalue)

        tableRowData[index].gst_amt = tax
        tableRowData[index].netamount = (Number(totalvalue) + Number(tax)).toFixed(2)

        let net_amt = 0, without_tax_amt = 0, totalGst_amt = 0;

        for (let i = 0; i < tableRowData.length; i++) {
            net_amt = net_amt + Number(tableRowData[i].netamount)
            without_tax_amt = without_tax_amt + Number(tableRowData[i].amount);
            totalGst_amt = totalGst_amt + Number(tableRowData[i].gst_amt)
        }

        setNetamt(net_amt)
        // setAmtWithoutTax(without_tax_amt)
        billalldetail.amtWithoutTax = without_tax_amt
        if (billalldetail.gst_location_state !== '' || billalldetail.vendor_location.length > 0) {
            if (billalldetail.gst_location_state.toUpperCase() === billalldetail.vendor_location[0].toUpperCase()) {
                setBillalldetail({ ...billalldetail, cgst_amt: totalGst_amt / 2, sgst_amt: totalGst_amt / 2, igst_amt: 0 })
            }
            else {
                setBillalldetail({ ...billalldetail, cgst_amt: 0, sgst_amt: 0, igst_amt: totalGst_amt })
            }
        }
        else {
            alert('Please Select Vendor Or GST Location')
        }
        // document.getElementById('gstdiv').style.display = 'none';
    }



    // const handlegst_submit_txt = (e) => {
    //     e.preventDefault();
    //     const gst_type = document.getElementById(`gsttype`).value;

    //     let net_amt = 0;

    //     tableRowData.map((item, currentIndex) => { net_amt = net_amt + Number(item.gst_amt) })

    //     if (gst_type === 'Inter') {
    //         document.getElementById("cgstamt").innerHTML = 0
    //         document.getElementById("sgstamt").innerHTML = 0
    //         document.getElementById("igstamt").innerHTML = net_amt

    //     }
    //     else if (gst_type === 'Intra') {
    //         document.getElementById("cgstamt").innerHTML = net_amt / 2
    //         document.getElementById("sgstamt").innerHTML = net_amt / 2
    //         document.getElementById("igstamt").innerHTML = 0

    //     }
    //     document.getElementById('gstdiv').style.display = 'none';
    // }

    // Upload Document ##########################################
    const handleSendFile = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("images", file)
        const UploadLink = await UploadData(data)
        setimage(UploadLink)
    }

    // ################################ Toggle & Calculation of TDS Div ##########################################

    // const handletds = (e, index) => {
    //     // setCurrentIndex(index)
    //     // if (e.target.checked === true) {
    //     //     tableRowData[index].tds_check = 'Y'
    //     // }
    //     // else {
    //         tableRowData[index].tds_check = !tableRowData[index].tds_check
    //     // }
    // }

    const handletdsmodal = (e) => {
        e.preventDefault();
        document.getElementById('tdsdiv').style.display = 'block';
        setBillalldetail({
            ...billalldetail,
            bill_no: document.getElementById('bill_no').value,
            bill_date: document.getElementById('bill_date').value

        })
    }

    const handletdsbtn = (e) => {
        e.preventDefault();
        const TdsPer = document.getElementById('tds_per').value
        document.getElementById('tdsperinp').value = TdsPer
        const tds_head = document.getElementById('tds_head').value;

        let arr_after_tds = []
        let tds_amt = 0;

        for (let i = 0; i < tableRowData.length; i++) {
            if (tableRowData[i].tds_check) {
                arr_after_tds.push(tableRowData[i].amount * Number(TdsPer) / 100)
            }
        }

        for (let i = 0; i < arr_after_tds.length; i++) {
            tds_amt += arr_after_tds[i]
        }


        setNetamt(netamt - tds_amt)
        setBillalldetail({ ...billalldetail, tds_head: tds_head, tds_per: TdsPer, tds_amt: tds_amt })
        document.getElementById('tdstagval').innerHTML = -tds_amt;
        document.getElementById('tdsdiv').style.display = 'none';
    }

    // ################################ Expense Div ##########################################
    const handleExpenseAmt = (e) => {
        e.preventDefault();
        let net_amt = 0;
        // tableRowData.map((item) => { net_amt = net_amt + Number(item.netamount) })

        for (let i = 0; i < tableRowData.length; i++) {
            net_amt += Number(tableRowData[i].netamount)
        }

        const value = net_amt - Number(e.target.value) + Number(document.getElementById('tdstagval').innerHTML) + Number(document.getElementById('discount-amttd').innerHTML)
        setNetamt(value)
        document.getElementById('expense-amttd').innerHTML = -e.target.value;
    }

    const handleDiscount = (e) => {
        e.preventDefault();
        let net_amt = 0;
        // tableRowData.map((item) => { net_amt = net_amt + Number(item.netamount) })
        for (let i = 0; i < tableRowData.length; i++) {
            net_amt += Number(tableRowData[i].netamount)
        }

        const value = net_amt + Number(document.getElementById('tdstagval').innerHTML) + Number(document.getElementById('expense-amttd').innerHTML) - Number(e.target.value)
        setNetamt(value)
        document.getElementById('discount-amttd').innerHTML = -e.target.value;
    }

    // const roundOffFun = (e) => {
    //     let net_amt = 0;
    //     tableRowData.map((item) => { net_amt = net_amt + Number(item.netamount) })
    //     console.log('After GST', net_amt)
    //     let amount = net_amt + Number(document.getElementById('tdstagval').innerHTML)
    //     console.log('After TDS', amount)
    //     amount = amount + Number(2100.89)
    //     console.log('After Expence', amount)
    //     amount = amount + Number(document.getElementById('discount-amttd').innerHTML )
    //     console.log('After Discount', Math.floor(amount * 100) / 100, Number(e.target.value))
    //     amount = Number.parseFloat(e.target.value||0) + amount
    //     console.log('After Round Off', amount)

    //     document.getElementById('total_bill_amt').innerHTML = Number(amount * 100) / 100 || 0;
    // }

    // ################################ Remark Div ##########################################
    const handlesetremark = (e) => {
        e.preventDefault();
        setBillalldetail({
            ...billalldetail,
            remarks: document.getElementById('remarks').value
            // net_amt: document.getElementById('total_bill_amt').innerHTML
        })
        // document.getElementById('savebtn').disabled = false;
        // document.getElementById('postbtn').disabled = false;
    }

    // const handleCalNetAmt = () => {
    //     let net_amt = 0;
    //     tableRowData.map((item, currentIndex) => { net_amt = net_amt + Number(item.netamount) })
    //     setNetamt(net_amt)
    // }

    // const handleClickAdd = async (e) => {
    //     e.preventDefault()
    //     // document.getElementById('savebtn').disabled = true;
    //     // document.getElementById('postbtn').disabled = true;
    //     const btn_type = e.target.value;
    //     let voucher_no = "";
    //     if (btn_type === 'save') {
    //         voucher_no = 'VOUCHER' + Math.floor(Math.random() * 10000) + 1;
    //     }
    //     else {
    //         voucher_no = document.getElementById('voucher_no').value
    //     }
    //     const voucher_date = document.getElementById('voucher_date').value
    //     const vendor_detail = document.getElementById('vend_name');
    //     const vendor_id = vendor_detail.value;
    //     const vend_name = vendor_detail.options[vendor_detail.selectedIndex].text;

    //     const vend_location = vendorlocations
    //     const bill_no = document.getElementById('bill_no').value
    //     const bill_date = document.getElementById('bill_date').value
    //     const bill_amt = document.getElementById('bill_amt').value
    //     const po_no = document.getElementById('po_no').value
    //     const po_date = document.getElementById('po_date').value

    //     const total_bill_amt = document.getElementById('total_bill_amt').innerText;

    //     const payment_term = document.getElementById('payment_term_select').value
    //     const due_date = document.getElementById('due_date').value;
    //     const emp_id = document.getElementById('employee_name').value
    //     const amt_paid = '';
    //     const amt_balance = '';
    //     const amt_booked = '';

    //     const tds_section = document.getElementById('tds_head').value;
    //     const tds_per = document.getElementById('tds_per').value || 0;
    //     const tds_amt = document.getElementById('tds_amt').value || 0;

    //     const expense_amt = document.getElementById('expense_amt').value;

    //     const cgst_amt = Number(cgstval)
    //     const sgst_amt = Number(sgstval)
    //     const igst_amt = Number(igstval)

    //     const gst_location_id = document.getElementById('gstlocation').value

    //     const taxable_amt = (cgst_amt + sgst_amt + igst_amt) || 0;
    //     const non_taxable_amt = ''
    //     const discount = document.getElementById('discount_amt').value
    //     const remarks = document.getElementById('remarks').value
    //     const bill_url = ''
    //     const userid = localStorage.getItem('User_id')
    //     const org = localStorage.getItem('Organisation')
    //     const fins_year = localStorage.getItem('fin_year')

    //     if (!voucher_no) {
    //         alert('Please Enter mandatory field')
    //         document.getElementById('savebtn').disabled = false;
    //         document.getElementById('postbtn').disabled = false;
    //     }
    //     else {
    //         if (bill_amt !== total_bill_amt) {
    //             alert('Bill Amount and Total Amount must be same')
    //             document.getElementById('savebtn').disabled = false;
    //             document.getElementById('postbtn').disabled = false;
    //         }
    //         else {

    //             // const result = await InsertBill(voucher_no, voucher_date, vendor_id, vend_name, vend_location, bill_no, bill_date, bill_amt, po_no, po_date, total_bill_amt, 
    //             //     payment_term,due_date, emp_id,amt_paid,amt_balance,amt_booked,tds_section,tds_ctype,tds_per,tds_amt,taxable_amt,non_taxable_amt,expense_amt,remarks,cgst_amt,
    //             //     sgst_amt,igst_amt,gst_location_id,discount,bill_url,userid,fins_year,org)

    //             // if (result === 'Added') {
    //             //     const result1 = await InsertSubBill(org, voucher_no, bill_no, tableRowData, fins_year, userid)

    //             //     if (btn_type !== 'save') {
    //             //         await Updatefinancialcount(org, 'voucher_count', vouchercount)
    //             //     }


    //             //     if (result1 === 'Added') {
    //             //         alert('Data Added')
    //             //         window.location.href = './SaveBillReport';
    //             //     }
    //             // }
    //             // else if (result === 'Already') {
    //             //     alert('Bill no Already exists');
    //             //     document.getElementById('savebtn').disabled = false;
    //             //     document.getElementById('postbtn').disabled = false;
    //             // }

    //             // else {
    //             //     alert('Server Not Response')
    //             //     document.getElementById('savebtn').disabled = false;
    //             //     document.getElementById('postbtn').disabled = false;
    //             // }
    //         }
    //     }

    // }

    // const handleSearchVendid = async (e) => {
    //     const org = localStorage.getItem('Organisation')
    //     if (e.target.value.length > 2) {
    //         const get = await SearchVendAddress(org, vendorselectedlist.vend_id, e.target.value)
    //         setVendorLocation(get)
    //     }
    //     else if (e.target.value === 0) {
    //         const result1 = await SelectVendorAddress(org, vendorselectedlist.vend_id);
    //         setVendorLocation(result1)
    //     }
    // }

    const CloseModal = () => {
        document.getElementById('tdsdiv').style.display = 'none';
        // document.getElementById('gstdiv').style.display = 'none';
    }



    return (
        <>
            <div className="wrapper">
                <Header />
                {
                    loading ?
                        <div className='content-wrapper'>
                            <div className="container-fluid">
                                <h3 className="pt-3 pb-1 ml-3"> Purchase Journal</h3>
                                <div className='card mb-2'>
                                    <article className="card-body">
                                        <form autoComplete="off">
                                            <div className="form-row" >
                                                <label htmlFor='voucher_no' className="col-md-2 col-form-label font-weight-normal" >Voucher no </label>
                                                <div className="d-flex col-md-4" >
                                                    <input type="text" className="form-control col-md-10 cursor-notallow" id="voucher_no" disabled />
                                                </div>
                                                <label htmlFor='voucher_date' className="col-md-2 col-form-label font-weight-normal">Voucher Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="voucher_date" disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label htmlFor='vend_name' className="col-md-2 col-form-label font-weight-normal" >Vendor Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select id="vend_name" onChange={handlevendorselect} className="form-control col-md-10">
                                                        <option value='' hidden>select vendor</option>
                                                        {
                                                            vendorlist.map((item, index) =>
                                                                <option key={index} value={item.vend_id}>{item.vend_name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Vendor Location <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <button type="button" className="btn border col-md-10" data-toggle="modal" data-target="#locationmodal" onClick={(e) => {
                                                        e.preventDefault();
                                                        setTimeout(() => {
                                                            document.getElementById('searchLocation').focus()
                                                        }, 600)
                                                    }}>
                                                        {
                                                            billalldetail.vendor_location.length > 0 ? billalldetail.vendor_location[1] : 'Select Vendor Location'
                                                        }
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label htmlFor='po_no' className="col-md-2 col-form-label font-weight-normal" >P.O number</label>
                                                <div className="d-flex col-md-4" >
                                                    <select className="form-control col-md-10" id="po_no"
                                                        onChange={handleGetPoData}
                                                    >
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
                                                <label htmlFor='po_date' className="col-md-2 col-form-label font-weight-normal" >Po Date  </label>
                                                <div className="d-flex col-md-4" >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="po_date" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2" >
                                                <label htmlFor='payment_term_select' className="col-md-2 col-form-label font-weight-normal" >Payment Terms <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4" >
                                                    <select id="payment_term_select" className="form-control col-md-10"
                                                        onChange={handleAccountTerm}
                                                    >
                                                        <option value={vendorselectedlist.payment_terms} hidden> {vendorselectedlist.payment_terms ? `Net ${vendorselectedlist.payment_terms}` : 'Select Payment term'}</option>
                                                        {
                                                            paymenttermlist.map((item, index) => (
                                                                <option key={index} value={item.term_days}>{item.term}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <label htmlFor='due_date' className="col-md-2 col-form-label font-weight-normal" >Due Date</label>
                                                <div className="d-flex col-md-4 " >
                                                    <input type="date" className="form-control col-md-10 cursor-notallow" id="due_date" disabled />
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label htmlFor='bill_no' className="col-md-2 col-form-label font-weight-normal" >Bill number <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="text" className="form-control col-md-10" id="bill_no" />
                                                </div>
                                                <label htmlFor='bill_amt' className="col-md-2 col-form-label font-weight-normal">Bill Amount <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="number" className="form-control col-md-10" id="bill_amt" />
                                                </div>
                                            </div>


                                            <div className="form-row mt-2">
                                                <label htmlFor='bill_date' className="col-md-2  col-form-label font-weight-normal" >Bill Date <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4 ">
                                                    <input type="date" className="form-control col-md-10" id="bill_date" />
                                                </div>
                                                <label htmlFor='gst_location' className="col-md-2 col-form-label font-weight-normal" >GST Location <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <select className="form-control col-md-10" id="gst_location"
                                                        onChange={handleGSTLocation}>
                                                        <option value='' hidden>Select GST Location</option>
                                                        {
                                                            locationstate.map((item, index) => (
                                                                <option key={index} value={`${item.location_name}^${item.location_state}`} >{item.location_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label htmlFor='employee_name' className="col-md-2 col-form-label font-weight-normal">Employee</label>
                                                <div className="d-flex col-md-4">
                                                    <select className="form-control ml-0 col-md-10" id="employee_name">
                                                        <option value='' hidden>Select Employee</option>
                                                        {
                                                            activeuser.map((items, index) => (
                                                                <option key={index} value={items.employee_name} >{items.employee_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='mt-3 overflow-auto' style={{ position: "relative" }}>
                                                <table className="table  table-bordered">
                                                    <thead className='text-center'>
                                                        <tr>
                                                            <th scope="col">Location</th>
                                                            <th scope="col">Item Details</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Rate</th>
                                                            <th scope="col">Unit</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">GST %</th>
                                                            <th scope="col">TDS</th>
                                                            <th scope="col">Net Amt</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {
                                                            tableRowData.map((element, index) => (
                                                                <tr key={index}>
                                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                        <select className="form-control ml-0" id={`local${index}`} name='location'
                                                                            onChange={(e) => { handleChangeLocation(e, index) }}
                                                                        >
                                                                            <option value={element.location ? `${element.location_id}^${element.location}` : ''} hidden>{element.location ? element.location : 'Select Location'}</option>
                                                                            {
                                                                                locationstate.map((item, index) => (
                                                                                    <option key={index} value={`${item.location_id}^${item.location_name}`} >{item.location_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                        <select className="form-control ml-0" id={`items${index}`} name='item'
                                                                            onChange={(e) => { handleChangeItems(e, index) }}
                                                                        >
                                                                            <option value={element.item ? `${element.item}^${element.glcode}^${element.sac_hsn}` : ''} hidden>{element.item ? element.item : 'Select Item'}</option>
                                                                            {
                                                                                itemlist.map((items, index) => (
                                                                                    <option key={index}
                                                                                        value={`${items.item_name}^${items.glcode}^${items.hsn_code}^${items.sac_code}`}
                                                                                    >{items.item_name}</option>

                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <input type='number' id={`Quantity${index}`} name='quantity' min={0} value={element.quantity} onChange={(e) => { handleChangeQuantity(e, index) }} className="form-control" />
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <input type='number' id={`rate${index}`} min={0} name='rate' value={element.rate} onChange={(e) => handleChangeRate(e, index)} className="form-control" />
                                                                    </td>
                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <select className="form-control ml-0" id={`unit${index}`} name='unit' onChange={(e) => handleChangeUnit(e, index)} >
                                                                            <option value={element.unit ? element.unit : ''} hidden>{element.unit ? element.unit : 'Select Unit'}</option>
                                                                            {
                                                                                unitlist.map((item, index) =>
                                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>)
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <input type='number' id={`amount${index}`} name='amount' className="form-control cursor-notallow" value={element.amount} disabled />
                                                                    </td>


                                                                    <td className='p-1 pt-2' style={{ width: "100px" }}>
                                                                        <input type='number' id={`gst${index}`} className='form-control' min={0} max={100} name='gst_rate' value={element.gst_rate} onChange={(e) => { handlegst_submit(e, index) }} />
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "50px" }}>
                                                                        <input type='checkbox' id={`tds${index}`} className='mx-2 mt-2' style={{ height: '18px', width: '18px' }} defaultChecked={element.tds_check} onClick={(e) => { tableRowData[index].tds_check = !tableRowData[index].tds_check }} />
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                        <input type='number' id={`netamt${index}`} className="form-control cursor-notallow" value={element.netamount} disabled={true} />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <input type='button' className="btn btn-primary" onClick={() => { handleAddRemoveRow('add') }} value='Add Item' />
                                            <input type='button' className="btn btn-danger ml-2" onClick={() => { handleAddRemoveRow('remove') }} value='Remove' />
                                            <hr />

                                            <div className='d-flex justify-content-between bill_bottom_sec'>
                                                <div className='bill_remark_sec'>
                                                    <div className="form mt-2">
                                                        <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control" rows="4" id="remarks" placeholder="Remarks" style={{ resize: "none" }}
                                                                onBlur={handlesetremark}></textarea>
                                                        </div>

                                                    </div>
                                                    <div className='mt-3'>
                                                        <label className="font-weight-normal" >Attach file(s) </label><br />
                                                        <button type="button" className='btn btn-success' data-toggle="modal" data-target="#exampleModal">
                                                            <i className='ion-android-attach'></i> &nbsp;
                                                            Attach File</button>
                                                    </div>
                                                </div>
                                                <div className='bill_gsttds_sec px-1 '>
                                                    <table className='table table-borderless w-100 mt-3'>
                                                        <tbody className='position-relative'>
                                                            {/* <tr>
                                                                {/* <td className='btn btn-primary cursor-pointer'
                                                                // onClick={handletogglegstdiv} 
                                                                >Inter Or Intra</td> *
                                                                <td className='bill_gsttds_tablecol2'>
                                                                    <div className="dropdown-menu-lg bg-white rounded" id='gstdiv' style={{ display: "none", boxShadow: "3px 3px 10px #000", position: "absolute", left: "10px", top: "40px", zIndex: "1" }}>
                                                                        <div className="card-body p-2">
                                                                            <i className="fa fa-times cursor-pointer" aria-hidden="true"
                                                                            // onClick={CloseModal}
                                                                            ></i>
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

                                                                            <div className="form-group ">
                                                                                <label htmlFor='gstlocation' className="col-form-label font-weight-normal" >Select GST Location <span className='text-danger'>*</span> </label>
                                                                                <div>
                                                                                    <select id="gstlocation" className="form-control col">
                                                                                        <option value='' hidden>Select GST Location</option>
                                                                                        {
                                                                                            locationstate.map((item, index) => (
                                                                                                <option key={index} value={item.location_name} >{item.location_name}</option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                            <br />
                                                                            <button className='btn btn-outline-primary float-right'
                                                                            // onClick={handlegst_submit_txt} 
                                                                            >Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr> */}
                                                            <tr >
                                                                <td className='text-decoration-underline' >Taxable Amount</td>
                                                                <td className='bill_gsttds_tablecol2'></td>
                                                                <td className='text-center' id='taxableamount'>{billalldetail.amtWithoutTax}</td>
                                                            </tr>
                                                            <tr >
                                                                <td className='text-decoration-underline' >CGST Amt</td>
                                                                <td className='bill_gsttds_tablecol2'></td>
                                                                <td className='text-center' id='cgstamt'>{billalldetail.cgst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>SGST Amt</td>
                                                                <td className='bill_gsttds_tablecol2'></td>
                                                                <td className='text-center' id='sgstamt'>{billalldetail.sgst_amt}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>IGST Amt</td>
                                                                <td className='bill_gsttds_tablecol2' ></td>
                                                                <td className='text-center' id='igstamt'>{billalldetail.igst_amt}</td>
                                                            </tr>
                                                            <tr >
                                                                <td title='Calulate TDS' className='cursor-pointer text-primary'
                                                                    onClick={handletdsmodal}
                                                                ><span style={{ borderBottom: '1px dashed blue' }}> TDS *</span></td>
                                                                <td className='bill_gsttds_tablecol2'>
                                                                    <div className="rounded bg-white" id='tdsdiv' style={{ display: "none", boxShadow: "3px 3px 10px #000", position: "absolute", left: "3%", top: "20%", zIndex: "1" }}>
                                                                        <div className="card-body" >
                                                                            <i className="fa fa-times cursor-pointer" aria-hidden="true"
                                                                                onClick={CloseModal}
                                                                            ></i>

                                                                            <div className="form-group" id='tdshead'>
                                                                                <label htmlFor='location' className="col-form-label font-weight-normal" >TDS Head <span className='text-danger'>*</span> </label>
                                                                                <div className="form-row m-0">

                                                                                    <select className="form-control col" id='tds_head'>
                                                                                        <option value='' hidden>Select Tds head</option>
                                                                                        {
                                                                                            tdsheadlist.map((tds, index) =>
                                                                                                <option key={index} value={tds.tds_section}>{tds.name}- {tds.tds_section}</option>
                                                                                            )
                                                                                        }

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-row m-0" >
                                                                                <input type="radio" id='tds_comp' name='comp_type' value='Company'
                                                                                    onChange={handleTdsCompany}
                                                                                />
                                                                                <label htmlFor='company' className="col-md-4 form-label font-weight-normal mt-1"  >Company</label>

                                                                                <input type="radio" id='tds_comp' name='comp_type' value='Non-Company'
                                                                                    onChange={handleTdsCompany}
                                                                                />&nbsp;
                                                                                <label htmlFor='non_company' className=" form-label font-weight-normal mt-1" > Non-Company</label>

                                                                            </div>
                                                                            <div className="form-row" >
                                                                                <label htmlFor='tds_per' className="col-md-5 form-label font-weight-normal"  >TDS(%) <span className='text-danger'>*</span> </label>
                                                                                <input type="number" className="form-control col-md-7" id='tds_per' min={0} />
                                                                            </div>
                                                                            <br />
                                                                            <button type='button' className='btn btn-outline-primary float-right'
                                                                                onClick={handletdsbtn} >Submit</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-group" >
                                                                        <input type="text" className="form-control col cursor-notallow" id='tdsperinp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='text-center' id='tdstagval'>0.00</td>
                                                            </tr>

                                                            <tr >
                                                                <td><label htmlFor='expense_amt' className="form-check-label">Expense Amt</label></td>
                                                                <td className='bill_gsttds_tablecol2'>
                                                                    <input type="number" className="form-control col" id='expense_amt'
                                                                        onChange={handleExpenseAmt}
                                                                    />
                                                                </td>
                                                                <td className='text-center' id='expense-amttd' >0.00</td>
                                                            </tr>
                                                            <tr >
                                                                <td><label htmlFor='discount_amt' className="form-check-label">Discount</label></td>
                                                                <td className='bill_gsttds_tablecol2'>
                                                                    <input type="number" className="form-control col" id='discount_amt' min={0}
                                                                        onChange={handleDiscount}
                                                                    />
                                                                </td>
                                                                <td className='text-center' id='discount-amttd' >0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td><h4>Total</h4></td>
                                                                <td></td>
                                                                <td className='text-center' style={{ width: "150px" }} id='total_bill_amt'>{netamt}</td>
                                                            </tr>
                                                            <tr >
                                                                <td><label htmlFor='roundoff' className="form-check-label">Total Round Value (Optional)</label></td>
                                                                <td className='bill_gsttds_tablecol2'>
                                                                    <input type="number" className="form-control col" id='roundoff' min={0}
                                                                    // onChange={roundOffFun} 
                                                                    />
                                                                    <small className='text-danger'>This value is total value</small>
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <PreviewBill billalldetail={billalldetail} BillItems={tableRowData} orgdata={orgdata} netamt={netamt} />
                                        </form>
                                    </article>

                                    <div className="card-footer border-top">
                                        <button id="savebtn" type='submit' name="save" className="btn btn-danger"
                                            // onClick={handleClickAdd} 
                                            value='save'>Save</button>
                                        <button id="postbtn" name="save" className="btn btn-danger ml-2"
                                            // onClick={handleClickAdd} 
                                            value='post'>Post </button>
                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SaveBillReport' }} name="clear" className="btn bg-secondary ml-2">Cancel</button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter"
                                        // onClick={handleCalNetAmt}
                                        >Preview </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <LoadingPage />
                }
                <Footer />

                {/* #######################  modal Vendor Location  Start ###################################### */}
                <div className="modal fade bd-example-modal-lg" id="locationmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Vendor Location</h5>
                                <div className="form-group col-md-5">
                                    <input type="text" className='form-control col' placeholder='Search Vendor Location' id="searchLocation"
                                    // onChange={handleSearchVendid} 
                                    />
                                </div>
                            </div>
                            <div className="modal-body overflow-auto px-5 pt-0" style={{ maxHeight: '60vh' }}>
                                <table className='table table-sm table-hover'>
                                    <thead>
                                        <tr>
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
                                                            setBillalldetail({ ...billalldetail, vendor_location: [items.billing_address_state, items.billing_address_attention] })
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
                {/* #######################  modal Vendor Location  End ###################################### */}


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
                            <button type="button" className="btn btn-primary"
                                onClick={handleSendFile}
                                data-dismiss="modal" >Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------- Attach File  Modal  End --------------*/}

        </>
    )
}

export default Bills