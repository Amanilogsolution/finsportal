const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const AllCashPayment = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_cash_payment with (nolock) order by sno DESC `)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.send(err)
    }
}


const InsertCashPayment = async (req, res) => {
    const org = req.body.org;
    const cash_payment_id = req.body.cash_payment_id;
    const cash_payment_date = req.body.cash_payment_date;
    const pymt_no = req.body.pymt_no;
    const pymt_date = req.body.pymt_date;
    const amt = req.body.amt;
    const remarks = req.body.remarks;
    const add_user_name = req.body.add_user_name;
    const fins_year = req.body.fins_year;
    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_cash_payment (
            cash_payment_id ,cash_payment_date ,pymt_no,pymt_date,amt,remarks,
            add_user_name,add_system_name,add_ip_address,add_date_time,status ,fins_year ,cash_payment_uuid )
        values('${cash_payment_id}','${cash_payment_date}','${pymt_no}','${pymt_date}','${amt}','${remarks}',
            '${add_user_name}','${os.hostname()}','${req.ip}',getdate(),'Active','${fins_year}','${uuid}')`)
        res.status(201).json({ result: "Added successfully" })
    }
    catch (err) {
        res.send(err)
    }
}

const GetCashPayment = async (req, res) => {
    const org = req.body.org;
    const cash_payment_id = req.body.cash_payment_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_cash_payment with (nolock) where cash_payment_id='${cash_payment_id}'`)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = {AllCashPayment,InsertCashPayment,GetCashPayment}
