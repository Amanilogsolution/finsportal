const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const TotalChartOfAccount = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_sub_account tsa  with (nolock);`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ChartOfAccountStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_sub_account set status='${status}' where sno='${sno}';`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const GetChartOfAccount = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_sub_account tan2 with (nolock) where sno='${sno}'`)
        res.send(result.recordset[0])
    }   catch (err) {       
        res.send(err)
    }
}

const UpdateChartOfAccount = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const account_sub_name = req.body.account_sub_name
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_sub_account  set account_sub_name='${account_sub_name}' ,update_user_name='Aman',update_system_name ='${os.hostname()}',
        update_ip_address ='${req.ip}',update_date_time=GETDATE() WHERE sno='${sno}';`)
        res.send(result.recordset[0])
    }   catch (err) {       
        res.send(err)
    }
}

module.exports={TotalChartOfAccount,ChartOfAccountStatus,GetChartOfAccount,UpdateChartOfAccount}