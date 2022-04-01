const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const allCustomer = async (req, res) => {
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from tbl_customer`)
        res.send(result.recordset)
    }
    catch(err){
        console.log(err)
        }
    }

    module.exports={allCustomer}