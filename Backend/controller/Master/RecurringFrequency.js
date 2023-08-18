const sql = require('mssql');
const sqlConfig = require('../../config.js');
const os = require('os')
const uuidv1 = require("uuid/v1");

async function TotalRecurringFreq(req, res) {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_recurring_freq with (nolock) order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function InsertRecurringFreq(req, res) {
    const org = req.body.org
    const recurring_type = req.body.recurring_type;
    const recurring_month = req.body.recurring_month;
    const remark = req.body.remark
    const User_id = req.body.User_id;
    const uuid = uuidv1()

    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_recurring_freq with (nolock) where recurring_type='${recurring_type}' `)

        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert INTO ilogsolution.dbo.tbl_recurring_freq (recurring_type,recurring_month,remark,
                add_date_time,add_user_name,add_system_name,add_ip_address,status,recurring_freq_uuid)
                values('${recurring_type}','${recurring_month}','${remark}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuid}')`)
            res.send('Added')
        } else {
            res.send("Already")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function UpdateRecurringFreq(req, res) {
    const org = req.body.org
    const recurring_type = req.body.recurring_type;
    const recurring_month = req.body.recurring_month;
    const remark = req.body.remark
    const User_id = req.body.User_id;
    const sno = req.body.sno

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_recurring_freq set recurring_type='${recurring_type}',recurring_month='${recurring_month}',remark='${remark}'
            ,update_date_time=getdate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' WHERE sno = '${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function ShowRecurringFreq(req, res) {
    const org = req.body.org
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_recurring_freq with (nolock) where sno='${sno}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function deleteRecurringFreq(req, res) {
    const sno = req.body.sno;
    const status = req.body.status;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_recurring_freq set status='${status}' where sno = ${sno}`)
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function ActiveRecurringFreq(req, res) {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_recurring_freq with (nolock) where status = 'Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { TotalRecurringFreq, InsertRecurringFreq, UpdateRecurringFreq, ShowRecurringFreq, deleteRecurringFreq, ActiveRecurringFreq }