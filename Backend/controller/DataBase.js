const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const insertDB = async (req,res) => {
    // const Dbname = req.body.Dbname
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`Create database test`)
        res.status(200).send({
            status:"Logout"
        })
        }
        catch(err){
            console.log(err)
        }
    
}

        

module.exports = {insertDB}