const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')

const Org_table = async(req,res)=>{
    const dbname = req.body.dbname;
    const org_name= req.body.org_name;
    const User_id= req.body.User_id;
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`SELECT org_name from FINSDB.dbo.org_name WHERE org_name ='${dbname}';`)
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into FINSDB.dbo.org_name(org_name,add_date_time,add_user_name,add_system_name,org_db_name)
            values ('${org_name}',getdate(),'${User_id}','${os.hostname()}','${dbname}');`)
                res.send('Added')
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