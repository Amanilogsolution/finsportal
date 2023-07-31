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
    const cash_receipt_id = req.body.cash_receiptData.cashRecepId;
    const cash_receipt_date = req.body.cash_receiptData.cashRecepDate;
    const ref_no = req.body.cash_receiptData.ref_no;
    const ref_date = req.body.cash_receiptData.ref_date;
    const amt = req.body.cash_receiptData.amt;
    const remarks = req.body.cash_receiptData.remark;
    const add_user_name = req.body.add_user_name;
    const fins_year = req.body.fins_year;
    const uuid = uuidv1()
    const on_account = req.body.cash_receiptData.onAccount;

    try {
        await sql.connect(sqlConfig)
        const checkRefNo = await sql.query(`select * from ${org}.dbo.tbl_cash_receipt tcr with (nolock) where ref_no ='${ref_no}'`)
        if (!(checkRefNo.rowsAffected[0] > 0)) {
            const result = await sql.query(`insert into ${org}.dbo.tbl_cash_receipt (
                cash_receipt_id ,cash_receipt_date ,ref_no,ref_date,amt,remarks,
                add_user_name,add_system_name,add_ip_address,add_date_time,status ,fins_year ,cash_receipt_uuid,on_account )
            values('${cash_receipt_id}','${cash_receipt_date}','${ref_no}','${ref_date}','${amt}','${remarks}',
                '${add_user_name}','${os.hostname()}','${req.ip}',getdate(),'Active','${fins_year}','${uuid}','${on_account}') `)

            res.status().json({ message: "Added successfully" })
        }
        else {
            res.status(201).json({ message: "Already Exist" })
        }


    }
    catch (err) {
        res.send(err)
    }
}

const GetCashReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_receipt_id = req.body.cash_receipt_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select convert(varchar(15),cash_receipt_date, 121) as cashReceiptDate,convert(varchar(15), ref_date, 121) as refDate,* from ${org}.dbo.tbl_cash_receipt with (nolock) where cash_receipt_id='${cash_receipt_id}'`)
        res.status(200).json({ data: result.recordset[0] })
    }
    catch (err) {
        res.send(err)
    }
}

const filterCashReceiptReport = async (req, res) => {
    const org = req.body.org;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select cash_receipt_id,convert(varchar(15), cash_receipt_date, 121) as cashReceiptDate,ref_no,convert(varchar(15), ref_date, 121) as refDate,amt
        from ${org}.dbo.tbl_cash_receipt tcr where cash_receipt_date BETWEEN '${from_date}' and '${to_date}'`)
        res.status(200).json({ data: result.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { AllCashReceipt, InsertCashReceipt, GetCashReceipt, filterCashReceiptReport }