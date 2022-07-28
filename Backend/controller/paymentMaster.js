const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const TotalPaymentTerm = async (req, res) => {
    const org = req.body.org;
    console.log(org)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_payment_term with (nolock) order by sno desc`)
        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err) {
        res.send(err)
    }
}


const DeletePaymentTerm = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(org,sno,status)
    console.log(`update ${org}.dbo.tbl_payment_term set status='${status}' where sno=${sno}`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_payment_term set status='${status}' where sno=${sno}`)
        console.log(result)
        res.send('Deleted')
    }
    catch (err) {
        res.send(err)
    }
}

const InsertPaymentTerm = async (req, res) => {
    const org = req.body.org;
    const term = req.body.term;
    const term_days = req.body.term_days;
    const User_id = req.body.User_id;
    console.log(org,term,term_days,User_id)

    try{
        await sql.connect(sqlConfig)
          const result = await sql.query(` insert into ${org}.dbo.tbl_payment_term  (term,term_days,add_date_time,
            add_user_name ,add_system_name ,add_ip_address,status)
            values('${term}','${term_days}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')  `)
        res.send('Added')

    }
    catch(err){
        console.log(err)
    }
}

async function ShowPaymentTerm(req, res) {
    const org = req.body.org;
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_payment_term with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const UpdatePaymentTerm = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    const term = req.body.term;
    const term_days = req.body.term_days;
    const User_id = req.body.User_id;
    console.log(sno,org,term,term_days,User_id)

    try{
        await sql.connect(sqlConfig)
          const result = await sql.query(` update ${org}.dbo.tbl_payment_term set term='${term}',term_days='${term_days}',update_date_time=getDate(),
          update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address ='${req.ip}' where sno='${sno}'`)
        res.send('Updated')

    }
    catch(err){
        console.log(err)
    }
}
const ActivePaymentTerm = async (req,res)=>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
          const result = await sql.query(`SELECT term,term_days from ${org}.dbo.tbl_payment_term `)
          res.send(result.recordset)

    }
    catch(err){
        console.log(err)
    }

}


module.exports={TotalPaymentTerm,DeletePaymentTerm,InsertPaymentTerm,ShowPaymentTerm,UpdatePaymentTerm,ActivePaymentTerm}