const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertBill = async (req, res) => {
    const org = req.body.org
    const voucher_no = req.body.voucher_no;
    const voucher_date = req.body.voucher_date;
    const vendor_id = req.body.vendor_id;
    const vend_name = req.body.vend_name;
    const vend_location = req.body.vend_location;
    const bill_no = req.body.bill_no;
    const bill_date = req.body.bill_date;
    const bill_amt = req.body.bill_amt;
    const po_no = req.body.po_no;
    const po_date = req.body.po_date;
    const total_bill_amt = req.body.total_bill_amt;
    const payment_term = req.body.payment_term;
    const due_date = req.body.due_date;
    const emp_id = req.body.emp_id;

    const amt_paid = req.body.amt_paid;
    const amt_balance = req.body.amt_balance;
    const amt_booked = req.body.amt_booked;
    const tds_section = req.body.tds_section;
    const tds_ctype = req.body.tds_ctype;
    const tds_per = req.body.tds_per;
    const tds_amt = req.body.tds_amt;
    const taxable_amt = req.body.taxable_amt;
    const non_taxable_amt = req.body.non_taxable_amt;
    const expense_amt = req.body.expense_amt;
    const remarks = req.body.remarks;
    const fins_year = req.body.fins_year;
    const cgst_amt = req.body.cgst_amt;
    const sgst_amt = req.body.sgst_amt;
    const igst_amt = req.body.igst_amt;
    const gst_location_id = req.body.gst_location_id;
    const discount = req.body.discount;
    const bill_url = req.body.bill_url;

    const userid = req.body.userid;
    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const dublicate_bill = await sql.query(`select * from ${org}.dbo.tbl_bill with (nolock) WHERE bill_no='${bill_no}'`)
        if (dublicate_bill.recordset.length === 0) {
            const result = await sql.query(`insert into ilogsolution.dbo.tbl_bill(
                voucher_no,voucher_date,vend_id,vend_name,vend_location,bill_no,bill_date ,
                bill_amt ,total_bill_amt,po_no,po_date,payment_term,due_date,emp_id,amt_paid ,
                amt_balance ,amt_booked,tds_section,tds_ctype,tds_per,tds_amt,
                taxable_amt,non_taxable_amt,expense_amt,confirm_flag,cgst_amt,sgst_amt,igst_amt,
                gst_location_id,dnflag,dn_amt,discount,bill_url,remarks,
                add_user_name,add_system_name,add_ip_address,add_date_time,status,fins_year,bill_uuid)

                values('${voucher_no}','${voucher_date}','${vendor_id}','${vend_name}','${vend_location}','${bill_no}','${bill_date}' ,
                '${bill_amt}' ,'${total_bill_amt}','${po_no}','${po_date}','${payment_term}','${due_date}','${emp_id}','${amt_paid}' ,
                '${amt_balance}' ,'${amt_booked}','${tds_section}','${tds_ctype}','${tds_per}','${tds_amt}',
                '${taxable_amt}','${non_taxable_amt}','${expense_amt}','flag','${cgst_amt}','${sgst_amt}','${igst_amt}',
                '${gst_location_id}','','','${discount}','${bill_url}','${remarks}',
                '${userid}','${os, os.hostname()}','${req.ip}',getDate(),'Actives','${fins_year}','${uuid}'))`)
            res.send('Added')
        }
        else {
            res.send('Already');
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}



const FilterBillReport = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const vendid = req.body.vendid;

    try {
        await sql.connect(sqlConfig)
        if (vendid === 'all') {
            const result = await sql.query(`select * ,convert(varchar(15),voucher_date,121) as voudate,
            convert(varchar(15),bill_date,121) as billdate
            from ${org}.dbo.tbl_bill with (nolock) where voucher_date between '${startDate}' 
             and '${lastDate}' and flagsave='post' order by sno desc`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select * ,convert(varchar(15),voucher_date,121) as voudate,
                convert(varchar(15),bill_date,121) as billdate
                from ${org}.dbo.tbl_bill with (nolock) where voucher_date between '${startDate}' 
                         and '${lastDate}' and vend_id='${vendid}' and flagsave='post' order by sno desc`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getSaveBill = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        sql.query(`select *,convert(varchar(15),voucher_date,121) as voudate, convert(varchar(15),bill_date,121) as billdate from ${org}.dbo.tbl_bill with (nolock) where flagsave='save' order by sno desc`, (err, result) => {
            if (!err) {
                res.status(200).send(result.recordset)
            }
            else {
                res.status(500).send('Internal Server Error')
            }
        })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const GetBillData = async (req, res) => {
    const org = req.body.org;
    const voucher_no = req.body.voucher_no;
    try {
        await sql.connect(sqlConfig)
        const Bill = await sql.query(`select *,convert(varchar(15),voucher_date,121) as voudate,convert(varchar(15),due_date,121) as duedate,
        convert(varchar(15),bill_date,121) as billdate from ${org}.dbo.tbl_bill with (nolock) WHERE vourcher_no='${voucher_no}' order by sno desc`)
        res.send(Bill.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const GetBillVendorID = async (req, res) => {
    const org = req.body.org;
    const vendor_id = req.body.vendor_id;
    try {
        await sql.connect(sqlConfig)
        const Bill = await sql.query(`select *,convert(varchar(15),voucher_date,121) as voudate from ${org}.dbo.tbl_bill where vend_id='${vendor_id}'`)
        res.status(200).send(Bill.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateSaveBillToPost = async (req, res) => {
    const org = req.body.org;
    const voucher_no = req.body.voucher_no;
    const new_voucher_no = req.body.new_voucher_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` update ${org}.dbo.tbl_bill set vourcher_no='${new_voucher_no}' ,flagsave='post' WHERE vourcher_no='${voucher_no}'`)
        if (result.rowsAffected > 0) {
            res.status(200).send('Updated')
        }
        else {
            res.status(500).send('Error')
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const filterInvoicebyDN = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const vendorid = req.body.vendorid;
    const locationid = req.body.locationid;
    const bill_no = req.body.bill_no;

    try {
        await sql.connect(sqlConfig)
        if (vendorid == 'all') {
            const result = await sql.query(`select *,convert(varchar(15),bill_date,121) as Joindate from ${org}.dbo.tbl_bill with (nolock) where (convert(date,bill_date) between '${startDate}'and '${lastDate}' or bill_no='${bill_no}' and flagsave = 'post') and (dnflag = '3' or dnflag is Null ) 
            order by sno desc`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select *,convert(varchar(15),bill_date,121) as Joindate from ${org}.dbo.tbl_bill with (nolock) where (convert(date,bill_date) between '${startDate}'and '${lastDate}' or vend_id='${vendorid}' or bill_no='${bill_no}' and flagsave = 'post') and (dnflag = '3' or dnflag is Null ) 
            order by sno desc`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const UpdateBillDNFlag = async (req, res) => {
    const org = req.body.org;
    const dnflag = req.body.dnflag;
    const dn_amt = req.body.dn_amt;
    const vourcher_no = req.body.vourcher_no;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_bill set dnflag='${dnflag}' ,dn_amt='${dn_amt}' WHERE vourcher_no='${vourcher_no}'`)
        if (result.rowsAffected > 0) {
            res.send('Updated')
        }
        else {
            res.send('Database Error')
        }
    }
    catch (err) {
        res.status(500).send('Error: ' + err)
    }

}



module.exports = { InsertBill, FilterBillReport, getSaveBill, GetBillData, UpdateSaveBillToPost, GetBillVendorID, filterInvoicebyDN, UpdateBillDNFlag } 