const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const InsertInvoice = async (req, res) => {
    const org = req.body.org;
    const fin_year = req.body.fin_year;
    const invoice_no = req.body.invoice_no;
    const squence_no = req.body.squence_no;
    const invoice_date = req.body.invoice_date;
    const order_no= req.body.order_no;
    const invoice_amt = req.body.invoice_amt;
    const user_id = req.body.user_id;
    const periodfrom = req.body.periodfrom;
    const periodto = req.body.periodto;
    const major = req.body.major;
    const location= req.body.location;
    const custid= req.body .custid;
    const billsubtotal = req.body.billsubtotal;
    const total_tax = req.body.total_tax;
    const cust_locationid= req.body.cust_locationid;
    const remark= req.body.remark;
    const flagsave = req.body.flagsave;
    const location_name = req.body.location_name;
    const consignee = req.body.consignee;
    const cust_family = req.body.cust_family;
    const cgst_amt = req.body.cgst_amt;
    const sgst_amt = req.body.sgst_amt;
    const utgst_amt= req.body.utgst_amt;
    const igst_amt = req.body.igst_amt;
    const taxable_amt= req.body.taxable_amt;
    const currency_type = req.body.currency_type;
    const sales_person = '';
    // const subject = req.body.subject;
    const payment_term= req.body.payment_term;
    const due_date = req.body.due_date;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
         const result = await sql.query(`insert into ${org}.dbo.tbl_invoice(fin_year,invoice_no,squence_no ,invoice_date ,order_no ,invoice_amt,
            doe,user_id,periodfrom,periodto,major,location,custid,billsubtotal,total_tax,cust_locationid,remark,flagsave ,
            location_name ,consignee ,cust_family,cgst_amt,sgst_amt,utgst_amt ,igst_amt,taxable_amt,currency_type,sales_person,payment_term,due_date,add_date_time,add_user_name ,add_system_name ,
            add_ip_address ,status)
            values('${fin_year}','${invoice_no}','${squence_no}','${invoice_date}','${order_no}','${invoice_amt}',getdate(),'${user_id}','${periodfrom}','${periodto}',
            '${major}','${location}','${custid}','${billsubtotal}','${total_tax}','${cust_locationid}','${remark}','${flagsave}','${location_name}','${consignee}','${cust_family}',
            '${cgst_amt}','${sgst_amt}','${utgst_amt}','${igst_amt}','${taxable_amt}','${currency_type}','${sales_person}','${payment_term}','${due_date}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
        
       
    }
    catch (err) {
        res.send(err)
    }
}

const filterInvoice = async (req,res) =>{
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const custid = req.body.custid;
    const locationid = req.body.locationid;
 
    try {
        await sql.connect(sqlConfig)
         const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Joindate  from ${org}.dbo.tbl_invoice with (nolock) where convert(date,invoice_date) between '${startDate}' 
         and '${lastDate}' and custid='${custid}' and location ='${locationid}' and status='Active'`)
        res.send(result.recordset)   
    }
    catch (err) {
        res.send(err)
    }

}

const getInvoice = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    console.log(org,sno)

    try {
        await sql.connect(sqlConfig)
         const result = await sql.query(`select * from ${org}.dbo.tbl_invoice with (nolock) where invoice_no='${sno}' and status='Active'`)
        res.send(result.recordset)   
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = {InsertInvoice,filterInvoice,getInvoice}