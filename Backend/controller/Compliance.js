const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const Showcompliances = async (req, res) => {
    const org_name = req.body.org_name
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select compliance_type,nature,period,period_name,convert(varchar(15),from_month,121) as from_month,convert(varchar(15),to_month,121) as to_month,from_applicable,convert(varchar(15),due_date,121) as due_date,convert(varchar(15),extended_date,121) as extended_date,status  from ${org_name}.dbo.tbl_compliance order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { Showcompliances}
