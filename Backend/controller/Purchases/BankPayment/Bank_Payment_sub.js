const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertSubBillPayment = async (req,res) => {
    const org = req.body.org
    const bank_payment_id = req.body.bank_payment_id;
    const chart_of_acct  = req.body.chart_of_acct;
    const ac_head = req.body.ac_head;
    const glcode = req.body.glcode;
    const location = req.body.location;
    const ref_no = req.body.ref_no;
    const ref_date= req .body.ref_date
    const amt = req.body.amt;
    const pay_type = req.body.pay_type;
    const amt_paid = req.body.amt_paid;
    const bal_amt = req.body.bal_amt;
    const master_id = req.body.master_id;
    const emp_id = req.body.emp_id;
    const emp_name = req.body.emp_name;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_bank_payment_sub (
            bank_payment_id ,chart_of_acct ,ac_head ,glcode ,location ,ref_no ,ref_date ,amt ,
            pay_type ,amt_paid ,bal_amt ,master_id ,emp_id ,emp_name)
        values(  '${bank_payment_id}' ,'${chart_of_acct}' ,'${ac_head}' ,'${glcode}' ,'${location}' ,'${ref_no}' ,'${ref_date}' ,'${amt}' ,
            '${pay_type}' ,'${amt_paid}' ,'${bal_amt}' ,'${master_id}' ,'${emp_id}' ,'${emp_name}')`)

            res.status(201).json({result:"Added"})

    }
    catch(err){
        console.log(err)
    }
}
const GetSubBillPayment = async (req,res) =>{
    const org = req.body.org
    const bank_payment_id = req.body.bank_payment_id

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_bank_payment_sub where bank_payment_id='${bank_payment_id}'`)
        res.status(200).json({result: result.recordset[0]})

    }
    catch(err){
        console.log(err)
    }

}

module.exports ={InsertSubBillPayment,GetSubBillPayment}