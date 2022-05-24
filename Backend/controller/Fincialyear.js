const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const Showfincialyear = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from FINSDB.dbo.tbl_fin_year;`)
        res.send(result.recordsets)
    }
    catch (err) {
        res.send(err)
        // console.log(err)
    }
}



module.exports = { Showfincialyear }