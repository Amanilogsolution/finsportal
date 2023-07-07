import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import './bill.css'
import { ActiveVendor, ActiveSelectedVendor, ActivePurchesItems, Activeunit, ActivePaymentTerm, SelectVendorAddress, Getfincialyearid, InsertBill, ActiveUser, ActiveLocationAddress, InsertSubBill, Updatefinancialcount, UploadData, GetPodetailsVendor, showOrganisation, SearchVendAddress, getPoData, getActiveTdsHead, getSubPoDetailsPreview } from '../../../api'
import PreviewBill from './PreviewBill/PreviewBill';
import LoadingPage from '../../loadingPage/loadingPage';

function Bills() {
    const [loading, setLoading] = useState(false);
    const [totalValues, setTotalValues] = useState([1]);
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
    const [vendorlocations, setVendorLocations] = useState('');
    const [netTotal, setNetTotal] = useState('');
    const [billsubtotalamt, setBillsubtotalamt] = useState(0);
    const [cgstval, setCgstval] = useState(0);
    const [sgstval, setSgstval] = useState(0);
    const [igstval, setIgstval] = useState(0);
    const [file, setFile] = useState('');
    const [img, setimage] = useState('');
    const [orgdata, setOrgdata] = useState([]);
    const [tdscomp, setTdscomp] = useState();
    const [netamt, setNetamt] = useState('');
    const [tdsheadlist, setTdsheadlist] = useState([])
    const [amt, setAmt] = useState('')

    const [index, setIndex] = useState()

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
            quantity: '',
            rate: 0,
            amount: 0,
            unit: '',
            netamount: 0,
            cgst_amt: 0,
            sgst_amt: 0,
            igst_amt: 0,
            cgst_per: 0,
            sgst_per: 0,
            igst_per: 0,
            tds_per: 0,
            tds_amt: 0,
            gst_amt: 0,
            tds_check: ''
        }
    ])

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
            console.log(items)
            const result = await showOrganisation(org)
            setOrgdata(result)
            const tds_list = await getActiveTdsHead(org)
            setTdsheadlist(tds_list)
            setLoading(true)
            Todaydate()

            console.log(tabledata)

            const id = await Getfincialyearid(org)
            const lastno = Number(id[0].voucher_count) + 1
            setVouchercount(lastno)
            document.getElementById('voucher_no').defaultValue = id[0].voucher_ser + id[0].year + String(lastno).padStart(5, '0')
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

    const handlevendorselect = async (e) => {
        const result = await ActiveSelectedVendor(localStorage.getItem('Organisation'), e.target.value);
        setVendorselectedlist(result[0])

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
            quantity: '',
            rate: 0,
            amount: 0,
            unit: '',
            netamount: 0,
            cgst_amt: 0,
            sgst_amt: 0,
            igst_amt: 0,
            cgst_per: 0,
            sgst_per: 0,
            igst_per: 0,
            tds_per: 0,
            tds_amt: 0,
            gst_amt: 0,
            tds_check: ''
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

    // const handleChangeEmployee = (e, index) => {
    //     tabledata[index].employee = e.target.value
    // }

    // Item Hadle Calculation

    const handleChangeItems = (e, index) => {
        let val = e.target.value;
        console.log(val);
        let item_arr = val.split('^')
        tabledata[index].item = item_arr[0]
        tabledata[index].glcode = item_arr[1]
        tabledata[index].sac_hsn = item_arr[2] || item_arr[3]
    }

    // Quantity Hadle Calculation
    const handleChangeQuantity = (e, index) => {

        document.getElementById(`Quantity${index}`).value = e.target.value;

        let amt = document.getElementById(`rate${index}`).value * e.target.value
        document.getElementById(`amount${index}`).value = amt;
        const sum = [Number(tabledata[index]["cgst_amt"]), Number(tabledata[index]["sgst_amt"]), Number(tabledata[index]["igst_amt"])].reduce((partialSum, a) => partialSum + a, 0);
        const tds = tabledata[index]["tds_amt"]

        document.getElementById(`netamt${index}`).value = sum + amt

        tabledata[index].amount = amt
        tabledata[index].quantity = Number(e.target.value)
        tabledata[index].rate = Number(document.getElementById(`rate${index}`).value)
        tabledata[index].netamount = sum + amt


        let net_amt = 0;
        tabledata.map((item, index) => { net_amt = net_amt + Number(item.netamount) })
        setNetamt(net_amt)

        let amtount = 0;
        tabledata.map((item, index) => { amtount = amtount + Number(item.amount) })
        setAmt(amtount)


    }

    // Rate Hadle Calculation
    const handleChangeRate = (e, index) => {
        tabledata[index].rate = e.target.value
        document.getElementById(`rate${index}`).value = e.target.value;


        let amt = document.getElementById(`Quantity${index}`).value * e.target.value
        document.getElementById(`amount${index}`).value = amt;

        const sum = [Number(tabledata[index]["cgst_amt"]), Number(tabledata[index]["sgst_amt"]), Number(tabledata[index]["igst_amt"])].reduce((partialSum, a) => partialSum + a, 0);
        const tds = tabledata[index]["tds_amt"]

        document.getElementById(`netamt${index}`).value = sum + amt - tds
        tabledata[index].amount = amt
        tabledata[index].quantity = Number(document.getElementById(`Quantity${index}`).value)
        tabledata[index].rate = Number(e.target.value)
        tabledata[index].netamount = sum + amt - tds

        let net_amt = 0;
        tabledata.map((item, index) => { net_amt = net_amt + Number(item.netamount) })
        setNetamt(net_amt)

        let amtount = 0;
        tabledata.map((item, index) => { amtount = amtount + Number(item.amount) })
        setAmt(amtount)


    }

    // Deduction Hadle Calculation
    // const handleChangeDeduction = (e, index) => {
    //     tabledata[index].deduction = e.target.value
    //     document.getElementById(`deduction${index}`).value = e.target.value;

    //     let netamt = document.getElementById(`amount${index}`).value - e.target.value
    //     document.getElementById(`netamt${index}`).value = netamt;
    //     tabledata[index].netamount = netamt
    // }
    // Ref no /File no Hadle Calculation
    // const handleChangeFileno = (e, index) => {
    //     tabledata[index].ref_fileno = e.target.value;
    //     document.getElementById(`fileno${index}`).value = e.target.value;
    // }
    // Unit Hadle Calculation
    const handleChangeUnit = (e, index) => {
        tabledata[index].unit = e.target.value;
    }

    //Toggle & Calculation of Gst Div
    const handletogglegstdiv = () => {
        // var sum = 0
        // tabledata.map((item) => sum += Number(item.netamount))
        // setNetTotal(sum)
        // setBillsubtotalamt(sum)
        // document.getElementById('totalamount').value = sum;
        // if (e.target.checked === true) {
        document.getElementById('gstdiv').style.display = 'block';
        // }
        // else {
        // document.getElementById(`netamt${index}`).value = document.getElementById(`amount${index}`).value
        // document.getElementById('gstdiv').style.display = 'none';
        // }


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
    const handlegst_submit = (e, index) => {
        e.preventDefault();
        const totalvalue = document.getElementById(`amount${index}`).value

        const gst = document.getElementById(`gst${index}`).value
        let tax = totalvalue * gst / 100
        document.getElementById(`netamt${index}`).value = Number(tax) + Number(totalvalue)

        console.log(tax)

        tabledata[index].gst_amt = tax
        tabledata[index].netamount = Number(tax) + Number(totalvalue)



        let net_amt = 0;
        tabledata.map((item, index) => { net_amt = net_amt + Number(item.netamount) })
        setNetamt(net_amt)

        document.getElementById('gstdiv').style.display = 'none';

    }



    const handlegst_submit_txt = (e) => {
        e.preventDefault();
        const gst_type = document.getElementById(`gsttype`).value;

        let net_amt = 0;

        tabledata.map((item, index) => { net_amt = net_amt + Number(item.gst_amt) })

        if (gst_type === 'Inter') {
            document.getElementById("cgstamt").innerHTML = 0
            document.getElementById("sgstamt").innerHTML = 0
            document.getElementById("igstamt").innerHTML = net_amt

        }
        else if (gst_type === 'Intra') {
            document.getElementById("cgstamt").innerHTML = net_amt / 2
            document.getElementById("sgstamt").innerHTML = net_amt / 2
            document.getElementById("igstamt").innerHTML = 0

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

    const handletds = (e, index) => {
        setIndex(index)

        if (e.target.checked === true) {
            // document.getElementById('tdsdiv').style.display = 'block';
            tabledata[index].tds_check = 'Y'

        }
        else {
            // document.getElementById('tdsdiv').style.display = 'none';  
            tabledata[index].tds_check = 'N'

        }

        // setBillalldetail({
        //     ...billalldetail,
        //     cgst_amt: document.getElementById('cgstamt').innerHTML,
        //     sgst_amt: document.getElementById('sgstamt').innerHTML,
        //     igst_amt: document.getElementById('igstamt').innerHTML,

        // })
        // document.getElementById('savebtn').disabled = false;
        // document.getElementById('postbtn').disabled = false;
    }

    const handletdsmodal = (e) => {
        e.preventDefault();
        document.getElementById('tdsdiv').style.display = 'block';

    }

    const handletdsbtn = (e) => {
        e.preventDefault();
        // const TdsAmount = document.getElementById('tds_amt').value
        const TdsPer = document.getElementById('tds_per').value
        document.getElementById('tdsperinp').value = TdsPer


        let arr = []
        let net_amt = 0;
        tabledata.map((item, index) => {
            if (item.tds_check == 'Y') {

                arr.push(item.amount * Number(TdsPer) / 100)

            } else {
                console.log('nooo')
            }
        })

        arr.map((item, i) => { net_amt += item })
        document.getElementById('total_bill_amt').innerHTML = netamt - net_amt
        document.getElementById('tdstagval').innerHTML = net_amt;
        document.getElementById('tdsdiv').style.display = 'none';
        // document.getElementById(`netamt${index}`).value = Aftertds
    }

    // ################################ Expense Div ##########################################

    const handlesetalldata = (e) => {
        e.preventDefault();

        let net_amt = 0;
        tabledata.map((item, index) => { net_amt = net_amt + Number(item.netamount) })
        const value = net_amt;

        setNetamt(value - Number(document.getElementById('expense_amt').value))

    }

    const handleDiscount = (e) => {
        e.preventDefault();

        let net_amt = 0;
        tabledata.map((item, index) => { net_amt = net_amt + Number(item.netamount) })
        const value = net_amt;

        setNetamt(value - Number(document.getElementById('expense_amt').value) - Number(document.getElementById('discount_amt').value))
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


    // 
    const handleCalNetAmt = () => {
        let net_amt = 0;
        tabledata.map((item, index) => { net_amt = net_amt + Number(item.netamount) })
        setNetamt(net_amt)
    }

    const handleClickAdd = async (e) => {
        e.preventDefault()
        // document.getElementById('savebtn').disabled = true;
        // document.getElementById('postbtn').disabled = true;
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
        const vend_name = vendor_detail.options[vendor_detail.selectedIndex].text;

        const vend_location = vendorlocations
        const bill_no = document.getElementById('bill_no').value
        const bill_date = document.getElementById('bill_date').value
        const bill_amt = document.getElementById('bill_amt').value
        const po_no = document.getElementById('po_no').value
        const po_date = document.getElementById('po_date').value

        const total_bill_amt = document.getElementById('total_bill_amt').innerText;

        const payment_term = document.getElementById('payment_term_select').value
        const due_date = document.getElementById('due_date').value;
        const emp_id = document.getElementById('employee_name').value
        const amt_paid = '';
        const amt_balance = '';
        const amt_booked = '';

        const tds_section = document.getElementById('tds_head').value;
        const tds_per = document.getElementById('tds_per').value || 0;
        const tds_amt = document.getElementById('tds_amt').value || 0;


        const expense_amt = document.getElementById('expense_amt').value;


        const cgst_amt = Number(cgstval)
        const sgst_amt = Number(sgstval)
        const igst_amt = Number(igstval)

        const gst_location_id = document.getElementById('gstlocation').value

        const taxable_amt = (cgst_amt + sgst_amt + igst_amt) || 0;
        const non_taxable_amt = ''
        const discount = document.getElementById('discount_amt').value
        const remarks = document.getElementById('remarks').value
        const bill_url = ''
        const userid = localStorage.getItem('User_id')
        const org = localStorage.getItem('Organisation')
        const fins_year = localStorage.getItem('fin_year')

        console.log(voucher_no, voucher_date, vendor_id, vend_name, vend_location, bill_no, bill_date, bill_amt, po_no, po_date, total_bill_amt, payment_term, due_date, emp_id,
            amt_paid, amt_balance, amt_booked, tds_section, tdscomp, tds_per, tds_amt, taxable_amt, non_taxable_amt, expense_amt, remarks, cgst_amt, sgst_amt, igst_amt,
            gst_location_id, discount, bill_url, userid, fins_year, org)

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

                // const result = await InsertBill(voucher_no, voucher_date, vendor_id, vend_name, vend_location, bill_no, bill_date, bill_amt, po_no, po_date, total_bill_amt, 
                //     payment_term,due_date, emp_id,amt_paid,amt_balance,amt_booked,tds_section,tds_ctype,tds_per,tds_amt,taxable_amt,non_taxable_amt,expense_amt,remarks,cgst_amt,
                //     sgst_amt,igst_amt,gst_location_id,discount,bill_url,userid,fins_year,org)

                // if (result === 'Added') {
                //     const result1 = await InsertSubBill(org, voucher_no, bill_no, tabledata, fins_year, userid)

                //     if (btn_type !== 'save') {
                //         await Updatefinancialcount(org, 'voucher_count', vouchercount)
                //     }


                //     if (result1 === 'Added') {
                //         alert('Data Added')
                //         window.location.href = './SaveBillReport';
                //     }
                // }
                // else if (result === 'Already') {
                //     alert('Bill no Already exists');
                //     document.getElementById('savebtn').disabled = false;
                //     document.getElementById('postbtn').disabled = false;
                // }

                // else {
                //     alert('Server Not Response')
                //     document.getElementById('savebtn').disabled = false;
                //     document.getElementById('postbtn').disabled = false;
                // }
            }
        }

    }

    const handleSearchVendid = async (e) => {
        const org = localStorage.getItem('Organisation')
        if (e.target.value.length > 2) {
            const get = await SearchVendAddress(org, vendorselectedlist.vend_id, e.target.value)
            setVendorLocation(get)
        }
        else if (e.target.value === 0) {
            const result1 = await SelectVendorAddress(org, vendorselectedlist.vend_id);
            setVendorLocation(result1)
        }
    }

    const CloseModal = (value) => {
        document.getElementById(`${value}`).style.display = 'none'
    }

    const handleGetPoData = async (e) => {
        const podata = await getPoData(localStorage.getItem('Organisation'), e.target.value)
        document.getElementById('po_date').value = podata[0].podate
        const subpodata = await getSubPoDetailsPreview(localStorage.getItem('Organisation'), e.target.value)
        let array = []
        let subtable = []

        for (let i = 0; i < subpodata.length; i++) {
            array.push(i)
            subtable.push({
                location: '',
                item: '',
                glcode: '',
                sac_hsn: '',
                quantity: '',
                rate: 0,
                amount: 0,
                unit: '',
                netamount: 0,
                cgst_amt: 0,
                sgst_amt: 0,
                igst_amt: 0,
                cgst_per: 0,
                sgst_per: 0,
                igst_per: 0,
                tds_per: 0,
                tds_amt: 0,
                gst_amt: 0,
                tds_check: ''
            })
        }
        setTotalValues(array)
        setTabledata(subtable)
        for (let i = 0; i < array.length; i++) {
            document.getElementById(`Quantity${i}`).value = subpodata[i]["quantity"]
            document.getElementById(`rate${i}`).value = subpodata[i]["rate"]
            document.getElementById(`unit${i}`).value = subpodata[i]["unit"]
            document.getElementById(`amount${i}`).value = subpodata[i]["amt"]
            document.getElementById(`local${i}`).value = podata[0]["ship_add_location"]
            document.getElementById(`items${i}`).value = `${subpodata[i]["items"]}^${subpodata[i]["glcode"]}^^${subpodata[i]["sac_hsn"]}`
        }
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
                                                            vendorlocations ? vendorlocations : 'Select Vendor Location'
                                                        }
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="form-row mt-2">
                                                <label htmlFor='po_no' className="col-md-2 col-form-label font-weight-normal" >P.O number</label>
                                                <div className="d-flex col-md-4" >
                                                    <select className="form-control col-md-10" id="po_no" onChange={handleGetPoData}>
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
                                                    <input type="date" className="form-control col-md-10" id="po_date" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row mt-2" >
                                                <label htmlFor='payment_term_select' className="col-md-2 col-form-label font-weight-normal" >Payment Terms<span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4" >
                                                    <select id="payment_term_select" className="form-control col-md-10" onChange={handleAccountTerm}>
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
                                                <label htmlFor='bill_no' className="col-md-2 col-form-label font-weight-normal" >Bill number<span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="text" className="form-control col-md-10" id="bill_no" />
                                                </div>
                                                <label htmlFor='bill_amt' className="col-md-2 col-form-label font-weight-normal">Bill Amount<span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md-4">
                                                    <input type="number" className="form-control col-md-10" id="bill_amt" />
                                                </div>
                                            </div>


                                            <div className="form-row mt-2">
                                                <label htmlFor='bill_date' className="col-md-2 col-form-label font-weight-normal" >Bill Date<span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <input type="date" className="form-control col-md-4" id="bill_date" />
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

                                            <div className='mt-3' style={{ position: "relative" }}>
                                                <table className="table table-striped table-bordered">
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
                                                            totalValues.map((element, index) => (
                                                                <tr key={index}>
                                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                        <select className="form-control ml-0" id={`local${index}`} onChange={(e) => { handleChangeLocation(e, index) }}>
                                                                            <option value='' hidden>Select Location</option>
                                                                            {
                                                                                locationstate.map((item, index) => (
                                                                                    <option key={index} value={item.location_name} >{item.location_name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className='p-1 pt-2' style={{ width: "180px" }}>
                                                                        <select className="form-control ml-0" id={`items${index}`} onChange={(e) => { handleChangeItems(e, index) }}>
                                                                            <option value='' hidden>Select Item</option>
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
                                                                        <input type='number' id={`Quantity${index}`} onChange={(e) => { handleChangeQuantity(e, index) }} className="form-control" />
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <input type='number' id={`rate${index}`} onChange={(e) => handleChangeRate(e, index)} className="form-control" />
                                                                    </td>
                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <select className="form-control ml-0" id={`unit${index}`} onChange={(e) => handleChangeUnit(e, index)} >
                                                                            <option value='' hidden>Select Unit</option>
                                                                            {
                                                                                unitlist.map((item, index) =>
                                                                                    <option key={index} value={item.unit_name}>{item.unit_name}</option>)
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td className='p-1 pt-2' style={{ width: "160px" }}>
                                                                        <input type='number' id={`amount${index}`} className="form-control cursor-notallow" disabled />
                                                                    </td>

                                                                    {/* <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='number' id={`deduction${index}`} className="form-control" defaultValue={0} onChange={(e) => handleChangeDeduction(e, index)} />

                                                                </td> */}
                                                                    {/* <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                    <input type='text' className="form-control" id={`fileno${index}`} onChange={(e) => handleChangeFileno(e, index)} />
                                                                </td> */}
                                                                    <td className='p-1 pt-2' style={{ width: "100px" }}>
                                                                        <input type='number' id={`gst${index}`} className='form-control' onChange={(e) => handlegst_submit(e, index)} />
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "20px" }}>
                                                                        <input type='checkbox' id={`tds${index}`} className='ml-2 mt-2' style={{ height: '18px', width: '18px' }} onClick={(e) => handletds(e, index)} />
                                                                    </td>

                                                                    <td className='p-1 pt-2' style={{ width: "150px" }}>
                                                                        <input type='number' id={`netamt${index}`} className="form-control cursor-notallow" disabled />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <input type='button' className="btn btn-primary" onClick={handleAdd} value='Add Item' />
                                            <input type='button' className="btn btn-danger ml-2" onClick={handleRemove} value='Remove' />
                                            <hr />

                                            <div className='d-flex'>
                                                <div style={{ width: "40%" }}>
                                                    <div className="form mt-2">
                                                        <label htmlFor='remarks' className="col-md-7 col-form-label font-weight-normal" >Remarks</label>
                                                        <div className="d-flex col-md">
                                                            <textarea type="text" className="form-control " rows="4" id="remarks" placeholder="Remarks" style={{ resize: "none" }} onBlur={handlesetremark}></textarea>
                                                        </div>

                                                    </div>
                                                    <div className='mt-3'>
                                                        <label className="font-weight-normal" >Attach file(s) </label><br />
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
                                                        <tbody className='position-relative'>
                                                            <tr>
                                                                <td style={{ width: "180px" }} className='btn btn-primary cursor-pointer' onClick={handletogglegstdiv}  >Inter Or Intra</td>

                                                            </tr>
                                                            <tr scope="row">
                                                                <td style={{ width: "150px" }} className='text-decoration-underline' >Taxable Amount</td>
                                                                <td className='form-control col-md p-0 bg-transparent pb-1'>

                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='taxableamount'>{amt}</td>
                                                            </tr>
                                                            <tr scope="row">
                                                                <td style={{ width: "150px" }} className='text-decoration-underline' >CGST Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent pb-1'>
                                                                    {/* <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-5 ml-5  cursor-notallow" id='cgst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div> */}
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='cgstamt'>{cgstval}</td>
                                                            </tr>

                                                            <div className="dropdown-menu-lg bg-white rounded" id='gstdiv' style={{ width: "950px", display: "none", boxShadow: "3px 3px 10px #000", position: "absolute", left: "10px", top: "40px", zIndex: "1" }}>
                                                                <div className="card-body p-2">
                                                                    <i className="fa fa-times" aria-hidden="true" onClick={(e) => { e.preventDefault(); CloseModal('gstdiv') }}></i>
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
                                                                    <button className='btn btn-outline-primary float-right' onClick={handlegst_submit_txt} >Submit</button>
                                                                </div>
                                                            </div>

                                                            <tr>
                                                                <td>SGST Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent border-none'>
                                                                    {/* <div className="input-group" >
                                                                        <input type="number" className="form-control col-md-5 ml-5  cursor-notallow" id='sgst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div> */}
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='sgstamt'>{sgstval}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>IGST Amt</td>
                                                                <td className='form-control col-md p-0 bg-transparent ' >
                                                                    {/* <div className="input-group" >
                                                                        <input type='number' className="form-control col-md-5 ml-5  cursor-notallow" id='igst-inp' disabled />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">%</span>
                                                                        </div>
                                                                    </div> */}
                                                                </td>
                                                                <td className='text-center' style={{ width: "150px" }} id='igstamt'>{igstval}</td>
                                                            </tr>
                                                            <tr scope="row">
                                                                <td style={{ width: "150px" }} className='cursor-pointer text-primary' onClick={handletdsmodal}>TDS</td>
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


                                                            <div className="dropdown-menu-lg rounded bg-white" id='tdsdiv' style={{ width: "750px", display: "none", boxShadow: "3px 3px 10px #000", position: "absolute", left: "10px", top: "120px", zIndex: "1" }}>
                                                                <div className="card-body" >
                                                                    <i className="fa fa-times" aria-hidden="true" onClick={(e) => { e.preventDefault(); CloseModal('tdsdiv') }}></i>

                                                                    <div className="form-group" style={{ marginBottom: "0px" }} id='tdshead'>
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
                                                                        <input type="radio" id='tds_comp' name='comp_type' value='Company' onChange={handleTdsCompany} />
                                                                        <label htmlFor='company' className="col-md-4 form-label font-weight-normal mt-1"  >Company</label>

                                                                        <input type="radio" id='tds_comp' name='comp_type' value='Non-Company' onChange={handleTdsCompany} />&nbsp;
                                                                        <label htmlFor='non_company' className=" form-label font-weight-normal mt-1" > Non-Company</label>

                                                                    </div>
                                                                    {/* <div className="form-row" >
                                                                                <label htmlFor='tds_amt' className="col-md-5 form-label font-weight-normal"  >TDS Amount <span className='text-danger'>*</span> </label>
                                                                                <input type="number" className="form-control col-md-7" id='tds_amt' />
                                                                            </div> */}
                                                                    <div className="form-row" >
                                                                        <label htmlFor='tds_per' className="col-md-5 form-label font-weight-normal"  >TDS(%) <span className='text-danger'>*</span> </label>
                                                                        <input type="number" className="form-control col-md-7" id='tds_per' />
                                                                    </div>
                                                                    <br />
                                                                    <button className='btn btn-outline-primary float-right' onClick={handletdsbtn}>Submit</button>
                                                                </div>
                                                            </div>


                                                            <tr>
                                                                <td>Expense Amt </td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="text" className="form-control col-md-7 ml-5" id='expense_amt' onChange={handlesetalldata} />
                                                                </td>
                                                                <td className='text-center' id='expense-amttd' style={{ width: "150px" }}>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Discount </td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="text" className="form-control col-md-7 ml-5" id='discount_amt'
                                                                        onChange={handleDiscount}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Round Off </td>
                                                                <td className='form-control col-md p-0 bg-transparent '>
                                                                    <input type="text" className="form-control col-md-7 ml-5" id='roundoff' onChange={(e) => { e.preventDefault(); let value = netamt + e.target.value; setNetamt(value) }} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><h4>Total</h4></td>
                                                                <td></td>
                                                                <td className='text-center' style={{ width: "150px" }} id='total_bill_amt'>{netamt}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <PreviewBill
                                                data={billalldetail}
                                                Allitems={tabledata}
                                                orgdata={orgdata}
                                                netamt={netamt} />

                                        </form>
                                    </article>

                                    <div className="card-footer border-top">
                                        <button id="savebtn" type='submit' name="save" className="btn btn-danger"
                                            onClick={handleClickAdd}
                                            value='save'>Save</button>
                                        <button id="postbtn" name="save" className="btn btn-danger ml-2"
                                            onClick={handleClickAdd}
                                            value='post'>Post </button>
                                        <button id="clear" onClick={(e) => { e.preventDefault(); window.location.href = '/SaveBillReport' }} name="clear" className="btn bg-secondary ml-2">Cancel</button>
                                        <button type='button' className="btn btn-success ml-2" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleCalNetAmt}>Preview </button>
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
