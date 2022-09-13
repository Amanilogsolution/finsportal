const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const inserinvoice = async (req, res) => {
    const org = req.body.org
    const pj_id = req.body.pj_id;
    const pj_date = req.body.pj_date;
    const ac_name = req.body.ac_name;
    const loation= req.body.loation;
    const bill_no = req.body.bill_no;
    const bill_date = req.body.bill_date;
    const bill_amt = req.body.bill_amt;
    const payment_term = req.body.payment_term;
    const due_date = req.body.due_date;
    const amt_paid = req.body.amt_paid;
    const amt_balance = req.body.amt_balance;
    const tds_head = req.body.tds_head;
    const tds_ctype = req.body.tds_ctype;
    const tds_per = req.body.tds_per;
    const tds_amt = req.body.tds_amt;
    const amt_booked = req.body.amt_booked;
    const taxable_amt = req.body.taxable_amt;
    const non_taxable_amt = req.body.non_taxable_amt;
    const expense_amt = req.body.expense_amt;
    const remarks= req.body.remarks;
    const fins_year = req.body.fins_year;
    const confirm_flag = req.body.confirm_flag;
    const cgst_amt = req.body.cgst_amt;
    const sgst_amt= req.body.sgst_amt;
    const igst_amt = req.body.igst_amt;
    const userid = req.body.userid
 
    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`insert into ${org}.dbo.tbl_bill(pj_id,pj_date,ac_name,loation,bill_no,bill_date,
            bill_amt,payment_term,due_date,amt_paid,amt_balance,tds_head,
            tds_ctype,tds_per,tds_amt,amt_booked,taxable_amt,non_taxable_amt,expense_amt,remarks,fins_year,confirm_flag,cgst_amt,sgst_amt,igst_amt,
            add_user_name,add_system_name,add_ip_address,add_date_time,status,bill_uuid)
            values('${pj_id}','${pj_date}','${ac_name}','${loation}','${bill_no}','${bill_date}','${bill_amt}','${payment_term}','${due_date}','${amt_paid}','${amt_balance}','${tds_head}','${tds_ctype}','${tds_per}','${tds_amt}','${amt_booked}',
            '${taxable_amt}','${non_taxable_amt}','${expense_amt}','${remarks}','${fins_year}','${confirm_flag}','${cgst_amt}','${sgst_amt}','${igst_amt}','${userid}','${os.hostname()}','${req.ip}',getDate(),'Active','')
          `)
        res.send('Added')  
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={inserinvoice}