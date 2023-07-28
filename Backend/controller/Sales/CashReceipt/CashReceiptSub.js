const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const AllCashReceiptSub = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` select * from ${org}.dbo.tbl_cash_receipt_sub with (nolock) order by sno DESC `)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const InsertCashSubReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_receipt_id = req.body.cash_receipt_id;
    const chart_of_acct = req.body.chart_of_acct;
    const ac_head = req.body.ac_head;
    const ac_head_name = req.body.ac_head_name;
    const glcode = req.body.glcode;
    const location = req.body.location;
    const ref_no = req.body.ref_no;
    const ref_date = req.body.ref_date;
    const amt = req.body.amt;
    const net_amt = req.body.net_amt;
    const pay_type = req.body.pay_type;
    const rec_amt = req.body.rec_amt;
    const bal_amt = req.body.bal_amt;
    const master_id = req.body.master_id;
    const emp_id = req.body.emp_id;
    const emp_name= req.body.emp_name;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` insert into  ${org}.dbo.tbl_cash_receipt_sub (
            cash_receipt_id ,chart_of_acct ,ac_head ,ac_head_name,glcode,location,ref_no,ref_date,
            amt,net_amt,pay_type,rec_amt,bal_amt,master_id,emp_id,emp_name)
         values('${cash_receipt_id}' ,'${chart_of_acct}','${ac_head}' ,'${ac_head_name}','${glcode}' ,'${location}' ,'${ref_no}','${ref_date}',
            '${amt}','${net_amt}','${pay_type}','${rec_amt}','${bal_amt}','${master_id}','${emp_id}','${emp_name}'),
             `);  
        res.status(201).json({ result: "Added successfully" })
    }
    catch (err) {
        res.send(err)
    }
}

const GetSubCashReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_receipt_id = req.body.cash_receipt_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_cash_receipt_sub with (nolock) where cash_receipt_id='${cash_receipt_id}' `)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = {AllCashReceiptSub,InsertCashSubReceipt,GetSubCashReceipt}
