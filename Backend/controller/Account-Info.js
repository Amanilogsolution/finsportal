const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const AllAccountInfo = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_account_info with (nolock);`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = { AllAccountInfo }
