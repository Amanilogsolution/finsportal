const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const Totalcrm = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` SELECT * from ${org}.dbo.tbl_crm_master tcm`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}

const insertcrm = async (req, res) => {
    const org = req.body.org
    const user_name = req.body.user_name;
    const type = req.body.type;
    const cust_vend = req.body.cust_vend;
    const User_id= req.body.User_id;
    console.log(org,user_name,type,cust_vend,User_id)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` insert into ${org}.dbo.tbl_crm_master(user_name,type,cust_vend,add_date_time,add_user_name,
            add_system_name,add_ip_address,status)
            values('${user_name}','${type}','${cust_vend}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active');`)
        res.send('Added')
     
       
    }
    catch (err) {
        res.send(err)
    }
}

const deleteCrm = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(org,sno,status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_crm_master set status='${status}' where sno='${sno}' `)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const getcrm = async (req,res) => {
    const org = req.body.org
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` select * from ${org}.dbo.tbl_crm_master WHERE sno = '${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}

const updatecrm = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org
    const user_name = req.body.user_name;
    const type = req.body.type;
    const cust_vend = req.body.cust_vend;
    const User_id= req.body.User_id;
    console.log(sno,org,user_name,type,cust_vend,User_id)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_crm_master set user_name='${user_name}',type='${type}',cust_vend='${cust_vend}', update_date_time=getDate(),
        update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address ='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const Activecrm = async (req, res)=>{
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  uname  as CRMNAME from  NEWAWLDB.dbo.User_Rights  where  uDept in (6,1)
        and uActive=1    order by uName asc`)
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }

}

module.exports={Totalcrm,insertcrm,deleteCrm,getcrm,updatecrm,Activecrm}