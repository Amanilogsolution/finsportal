const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')

const Org_table = async(req,res)=>{
    const dbname = req.body.dbname;
    const org_name= req.body.org_name;
    const User_id= req.body.User_id;
    const fins_year = req.body.fins_year;
    const last_year= req.body.last_year;
    const startdate = req.body.startdate;
    const toyear= req.body.toyear;
   
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`SELECT org_name from FINSDB.dbo.org_name WHERE org_name ='${dbname}';`)
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into FINSDB.dbo.org_name(org_name,add_date_time,add_user_name,add_system_name,org_db_name,status)
            values ('${org_name}',getdate(),'${User_id}','${os.hostname()}','${dbname}','Active');`)

            if(result.rowsAffected[0]>0){
                const insertfinsyear= await sql.query(`insert  into ${dbname}.dbo.tbl_fin_year (fin_year,year,from_date,to_date,mcust_count,
                    cust_count,mvend_count,vend_count,invoice_ser,invoice_count,voucher_ser,voucher_count,location_count,
                    add_user_name,add_date_time,add_ip_address,add_system_name,status)
                    values ('${fins_year}','${last_year}','${startdate}','${toyear}','0','0','0','0','','0','','0','0','${User_id}',getdate(),
                    '${req.ip}','${os.hostname()}','Active')`)

                    if(insertfinsyear.rowsAffected[0]>0){
                        res.send('Added')
                    }
               
            }
                
        } 
        else {
            res.send("Already")
        }

    }
    catch (err){
        res.send(err)
    }
}
const TotalOrganisation = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT org_name,org_db_name from FINSDB.dbo.org_name`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

module.exports={Org_table,TotalOrganisation}