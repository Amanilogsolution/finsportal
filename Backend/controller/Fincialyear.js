const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const Showfincialyear = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_fin_year order by sno desc;`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
     
    }
}

const Addfincialyear = async (req, res) => {
    const org = req.body.org;
    const fin_year = req.body.fin_year;
    const year = req.body.year;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
    // const mcust_id = req.body.mcust_id;
    // const cust_id = req.body.cust_id;
    // const vendmast = req.body.vendmast;
    // const vendid = req.body.vendid;
    const invoice= req.body.invoiceser;
    const voucher= req.body.voucher;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result1 = await sql.query(`UPDATE ${org}.dbo.tbl_fin_year set status ='Deactive' WHERE  status ='Active';`)
    
        if(result1.rowsAffected[0]>0){
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_fin_year(fin_year,year,from_date,to_date,mcust_count,
            cust_count,mvend_count,vend_count,invoice_ser,vouher_ser,location_count,add_user_name,add_system_name,
            add_ip_address,add_date_time,status)
            values('${fin_year}','${year}','${from_date}','${to_date}','0','0','0','0','0','${invoice}','${voucher}',
            '${User_id}','hp','::1',getdate(),'Active');`)
            res.send(result)
        }
        else{
            res.send("server error")
        }
  
    }
    catch (err) {
        res.send(err)
     
    }
}

const Updatefincialyear = async (req,res) =>{
    const org = req.body.org;
    const mcust_id = req.body.mcust_id;
    const cust_id = req.body.cust_id;
    const mvend_id = req.body.mvend_id;
    const vend_id = req.body.vend_id;
    const user_name = req.body.user_name;
    const sno = req.body.sno

    try {
        await sql.connect(sqlConfig)
  
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_fin_year set mcust_id='${mcust_id}',cust_id='${cust_id}',mvend_id='${mvend_id}',vend_id='${vend_id}',update_user_name='${user_name}',
        update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno='${sno}';`)
        // console.log(result)
        res.send(result)
    }
    catch (err) {
        res.send(err)
     
    }

}

const Statusfincialyear = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_fin_year set status ='Deactive' WHERE  status ='Active';`)

        if(result.rowsAffected[0]>0){
        const result1 = await sql.query(`UPDATE ${org}.dbo.tbl_fin_year set status ='Active' WHERE sno=${sno};`)
        res.send(result1)
 
        }
       else{
        res.send(result)
       }
    }
    catch (err) {
        res.send(err)
     
    }

}

const Selectfincialyear = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_fin_year where sno=${sno};`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
     
    }
}


const Getfincialyearid = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_fin_year where status='Active';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
     
    }
}
const Updatefinancialcount = async (req,res) =>{
    const org = req.body.org;
    const countkey = req.body.countkey;
    const countvalue = req.body.countvalue;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`Update ${org}.dbo.tbl_fin_year set ${countkey} = '${countvalue}' where status='Active'`)
        res.send("Updated")
    }
    catch (err){
        res.send(err)
    }
}

const UpdatefinancialTwocount = async (req,res) =>{
    const org = req.body.org;
    const countkey = req.body.countkey;
    const countkey2 = req.body.countkey2;
    const countvalue = req.body.countvalue;
    const countvalue2 = req.body.countvalue2;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`Update ${org}.dbo.tbl_fin_year set ${countkey} = '${countvalue}',${countkey2} = '${countvalue2}' where status='Active'`)
        res.send(result.rowsAffected)
    }
    catch (err){
        res.send(err)
    }
}



module.exports = { Showfincialyear,Addfincialyear,Updatefincialyear,Statusfincialyear,Selectfincialyear,Getfincialyearid,Updatefinancialcount,UpdatefinancialTwocount}
