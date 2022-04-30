const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')


const Newdb = async (req, res) => {
    const dbname= req.body.dbname;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`create database ${dbname} `)
        if(result)
        {
            const result = await sql.query(`CREATE TABLE ${dbname}.dbo.tbl_test (
                sno varchar(100) NULL);
             `)
        }
        // res.send("Created")

    } catch (err) {
        console.log(err)
    }
}


module.exports = {Newdb }
