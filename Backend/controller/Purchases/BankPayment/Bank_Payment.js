const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertBillPayment = async (req, res) => {
    const org = req.body.org;
    const bank_payment_id = req.body.bank_payment_id;
    const bank_payment_date = req.body.bank_payment_date;
    const cheq_ref_no = req.body.cheq_ref_no;
    const cheq_date = req.body.cheq_date;
    const cheq_amt = req.body.cheq_amt;
    const bank_id = req.body.bank_id;
    const bank_sub_code = req.body.bank_sub_code;
    const bank = req.body.bank;
    const bank_glcode = req.body.bank_glcode;
    const on_account = req.body.on_account;
    const remarks = req.body.remarks;
    const username = req.body.username;
    const fins_year = req.body.fins_year;
    const uuid = uuidv1()


    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_bank_payment (
            bank_payment_id ,bank_payment_date ,cheq_ref_no ,cheq_date ,cheq_amt ,bank_id ,bank_sub_code ,bank ,
            bank_glcode ,on_account,remarks ,add_user_name ,add_system_name ,add_ip_address ,add_date_time ,status,
            fins_year ,bank_payment_uuid ) 
            values( '${bank_payment_id}' ,'${bank_payment_date}' ,'${cheq_ref_no}' ,'${cheq_date}' ,'${cheq_amt}' ,'${bank_id}' ,'${bank_sub_code}' ,'${bank}' ,
            '${bank_glcode}' ,'${on_account}','${remarks}' ,'${username}' ,'${os.hostname()}' ,'${req.ip}' ,getDate() ,'Active',
            '${fins_year}' ,'${uuid}' )`)
        res.status(201).json({ result: "Added successfully" })
    }
    catch (err) {
        console.log(err)
    }
}

const AllBillPayment = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * FROM ${org}.dbo.tbl_bank_payment `)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        console.log(err)
    }
}

const GetBillPayment = async (req, res) => {
    const org = req.body.org;
    const bank_payment_id = req.body.bank_payment_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT convert(varchar(15),bank_payment_date,121) as bankPaymentDate,* FROM ${org}.dbo.tbl_bank_payment where bank_payment_id='${bank_payment_id}'`)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        console.log(err)
    }
}

const UpdateBillPayment = async (req, res) => {
    const org = req.body.org;
    const bank_payment_id = req.body.bank_payment_id;
    const bank_payment_date = req.body.bank_payment_date;
    const cheq_ref_no = req.body.cheq_ref_no;
    const cheq_date = req.body.cheq_date;
    const cheq_amt = req.body.cheq_amt;
    const bank_id = req.body.bank_id;
    const bank_sub_code = req.body.bank_sub_code;
    const bank = req.body.bank;
    const bank_glcode = req.body.bank_glcode;
    const on_account = req.body.on_account;
    const remarks = req.body.remarks;
    const username = req.body.username;
    const fins_year = req.body.fins_year;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_bank_payment set bank_payment_date='${bank_payment_date}',cheq_ref_no='${cheq_ref_no}',cheq_date='${cheq_date}',cheq_amt='${cheq_amt}',
        bank_id='${bank_id}',bank_sub_code='${bank_sub_code}',bank='${bank}',bank_glcode='${bank_glcode}',remarks='${remarks}',update_user_name='${username}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time='getdate()' where bank_payment_id='${bank_payment_id}`)
        res.status(200).json({ result: "Updated" })

    }
    catch (err) {
        console.log(err)
    }
}

const DeleteBillPayment = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_bank_payment set status='${status}' where sno='${sno}'`)
        res.status(202).send('Deleted')
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { InsertBillPayment, AllBillPayment, GetBillPayment, UpdateBillPayment, DeleteBillPayment }