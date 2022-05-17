const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const ShowcompliancesType = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *  from ${org}.dbo.tbl_compliances_type  where status='Active'`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
        // res.send(err)

    }
}

module.exports = { ShowcompliancesType}
