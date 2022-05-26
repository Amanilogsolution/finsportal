const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')
const uuidv1 = require("uuid/v1");

async function TotalStates(req, res) {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_states order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteState(req, res) {
    const sno = req.body.sno;
    const status = req.body.status;
    console.log(sno, status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_states set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}



async function state(req, res) {
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const state_code = req.body.state_code;
    const state_short_name = req.body.state_short_name;
    const select_type = req.body.select_type;
    const system_name = os.hostname()
    const uuid = uuidv1()
    try {
        await sql.connect(sqlConfig)
        console.log(state_name, country_name, state_code, state_short_name, select_type)
        const duplicate = await sql.query(`select * from FINSDB.dbo.tbl_states where state_name='${state_name}' OR state_code='${state_code}' OR state_short_name='${state_short_name}'`)
        console.log(duplicate.recordset)
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into FINSDB.dbo.tbl_states (state_name,state_code,state_short_name,state_type,country_name,state_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                        values('${state_name}','${state_code}','${state_short_name}','${select_type}','${country_name}','${uuid}',getdate(),'admin','${system_name}','${req.ip}','Active')`)
            res.send('Added')
        } else {
            res.send("Already")
        }

        // const result = await sql.query(`insert into tbl_states (state_name,state_code,state_short_name,state_type,country_name,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        //                 values('${state_name}','${state_code}','${state_short_name}','${select_type}','${country_name}',getdate(),'admin','${system_name}','${req.ip}','Active')`)
        // res.send('Added')
    }
    catch (err) {
        console.log(err)
    }
}

async function showstate(req, res) {
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_states where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

async function showactivestate(req, res) {
    const country = req.body.country
    console.log('country', country)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_states where country_name = '${country}' and status='Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

async function EditState(req, res) {
    const sno = req.body.sno;
    const state_name = req.body.state_name;
    const country_name = req.body.country_name;
    const state_code = req.body.state_code;
    const state_short_name = req.body.state_short_name;
    const select_type = req.body.select_type;
    console.log(sno, state_name, country_name, state_code, state_short_name, select_type)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update FINSDB.dbo.tbl_states set state_name = '${state_name}',state_code = '${state_code}',state_short_name = '${state_short_name}',state_type = '${select_type}',country_name = '${country_name}'
                                                                      ,update_date_time=getdate(),update_user_name='Admin',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = '${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        console.log(err)
    }
}


const ImportState = (req, res) => {
    const datas = req.body.data;
    // let duplicatedate = [];

    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from FINSDB.dbo.tbl_states where state_name in ('${datas.map(data => data.state_name).join("', '")}') OR state_code in ('${datas.map(data => data.state_code).join(', ')}') OR state_short_name in ('${datas.map(data => data.state_short_name).join("', '")}')`)
            .then((resp) => {
                // console.log(resp.rowsAffected[0])
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "state_name": item.state_name, "state_code": item.state_code, "state_short_name": item.state_short_name })))
                else {

                    sql.query(`INSERT INTO FINSDB.dbo.tbl_states (state_name,state_code,state_short_name,state_type,country_name,status,add_date_time,add_user_name,add_system_name,add_ip_address,state_uuid) VALUES ${datas.map(item => `('${item.state_name}','${item.state_code}','${item.state_short_name}','${item.state_type}','${item.country_name}','Active',getdate(),'Admin','${os.hostname()}','${req.ip}','${uuidv1()}')`).join(', ')}`)
                    res.send("Data Added")
                }
            })

        // console.log(duplicatedate)

    })
}



module.exports = { TotalStates, deleteState, state, showstate, EditState, showactivestate, ImportState }
