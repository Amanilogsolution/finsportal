const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const TotalEmployee = async (req, res) => {
    const org = req.body.org
    console.log(org)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from  ${org}.dbo.tbl_emp`)
        res.send(result.recordset)
    } catch (err) {
        res.send(err)
    }
}


const deleteEmployee = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(org,sno,status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_emp set status='${status}' where sno='${sno}' `)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={TotalEmployee,deleteEmployee}