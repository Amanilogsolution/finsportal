const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidV1 = require("uuid/v1");



const totaltdshead = async (req, res) => {
    const org = req.body.org

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_tds_head with (nolock) order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const inserttdshead = async (req, res) => {
    const org = req.body.org
    const tds_head = req.body.tds_head;
    const tds_section = req.body.tds_section;
    const User_id = req.body.User_id;
    const uuid = uuidV1()
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_tds_head (name,tds_section,tds_head_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${tds_head}','${tds_section}','${uuid}',getdate(),'${User_id}','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const deleteTdsHead = async (req, res) => {
    const org = req.body.org
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_tds_head set status='${status}' where sno=${sno}`)
        res.send('done')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function showTdsHead(req, res) {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_tds_head with (nolock) where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function updateTdsHead(req, res) {
    const org = req.body.org
    const tds_head = req.body.tds_head;
    const tds_section = req.body.tds_section;
    const User_id = req.body.User_id;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_tds_head set name='${tds_head}',tds_section='${tds_section}',
        update_date_time=getdate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = ${sno}`)
        res.send('Updated')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getActiveTdsHead = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_tds_head with (nolock) where  status='Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports = { totaltdshead, inserttdshead, deleteTdsHead, showTdsHead, updateTdsHead, getActiveTdsHead }