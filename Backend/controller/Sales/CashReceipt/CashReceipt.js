const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const AllCashReceipt = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_cash_receipt with (nolock) order by sno DESC `)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

const InsertCashReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_receipt_id = req.body.cash_receipt_id;
    const cash_receipt_date = req.body.cash_receipt_date;
    const ref_no = req.body.ref_no;
    const ref_date = req.body.ref_date;
    const amt = req.body.amt;
    const remarks = req.body.remarks;
    const add_user_name = req.body.add_user_name;
    const fins_year = req.body.fins_year;
    const uuid = uuidv1()
    const on_account = req.body.on_account;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_cash_receipt (
            cash_receipt_id ,cash_receipt_date ,ref_no,ref_date,amt,remarks,
            add_user_name,add_system_name,add_ip_address,add_date_time,status ,fins_year ,cash_receipt_uuid,on_account )
        values('${cash_receipt_id}','${cash_receipt_date}','${ref_no}','${ref_date}','${amt}','${remarks}',
            '${add_user_name}','${os.hostname()}','${req.ip}',getdate(),'Active','${fins_year}','${uuid}','${on_account}') `)
        res.status(201).json({ result: "Added successfully" })
    }
    catch (err) {
        res.send(err)
    }
}

const GetCashReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_payment_id = req.body.cash_payment_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_cash_receipt with (nolock) where cash_receipt_id='${cash_payment_id}'`)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = {AllCashReceipt,InsertCashReceipt,GetCashReceipt}