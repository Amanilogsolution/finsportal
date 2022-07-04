const sql = require('mssql')
const sqlConfig = require('./config.js')
const os = require('os')

const InsertWhatsappdata = async (req, res) => {
    const datas = req.body.importdata;
    const message = req.body.message;
    const message_id = req.body.message_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`INSERT into FINSDB.dbo.tbl_whatsapp_data (phone_no,message_id,entryby_system,entry_date)
        VALUES ${datas.map(item => `('${item.phone_no}','${message_id}','${os.hostname()}',getDate())`)}
                         
                 INSERT into  FINSDB.dbo.tbl_message (message,message_id,entryby_system,entry_date)
                                   values('${message}','${message_id}','${os.hostname()}',getdate())
`)
        res.send(result.rowsAffected)
    }
    catch (err) {
        res.send(err)
    }
}

const GetLastMessageid = async (req, res) => {

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select top 1 message_id from FINSDB.dbo.tbl_message with (nolock) order by sno desc;`)
        res.send(result.rowsAffected)

    }
    catch (err) {
        res.send(err)
    }
}


module.exports = { InsertWhatsappdata, GetLastMessageid }
