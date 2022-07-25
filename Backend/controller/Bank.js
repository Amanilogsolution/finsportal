const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertBank = async (req, res) => {
    const account_code = req.body.account_code;
    const bank_name = req.body.bank_name;
    const account_no = req.body.account_no;
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;
    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const ifsc_code = req.body.ifsc_code;
    const actype = req.body.actype;
    const acname = req.body.acname;
    const description = req.body.description;
    const User_id = req.body.User_id;
    const org = req.body.org;
    const uuid = uuidv1()
    console.log(req.body)
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_bankmaster where account_no='${account_no}'`)
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into ${org}.dbo.tbl_bankmaster (account_code,bank_name,account_no,address_line1,address_line2,state,city,pincode,ifsc_code,description,bank_uuid,status,ac_type,acname,add_date_time,add_user_name,add_system_name,add_ip_address)
                    values('${account_code}','${bank_name}','${account_no}','${address_line1}','${address_line2}','${state}','${city}','${pincode}','${ifsc_code}','${description}','${uuid}','Active','${actype}','${acname}',getdate(),'${User_id}','${os.hostname()}','${req.ip}')`)
            res.send('Added')
        } else {
            res.send("Already")
        }

    }
    catch (err) {
        res.send(err)
    }
}

const TotalBanks = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_bankmaster`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const DeleteBank = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_bankmaster set status='${status}' where sno='${sno}'`)
        res.send('Deleted')
    }
    catch (err) {
        res.send(err)
    }
}

const ShowBank = async (req, res) => {
    const sno = req.body.sno
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_bankmaster where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}
const UpdateBank = async (req, res) => {
    const sno = req.body.sno;

    const account_code = req.body.account_code;
    const bank_name = req.body.bank_name;
    const account_no = req.body.account_no;
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;

    const state = req.body.state;
    const city = req.body.city;
    const pincode = req.body.pincode;
    const ifsc_code = req.body.ifsc_code;

    const type = req.body.type;
    const acname = req.body.acname;
    const description = req.body.description;
    const org = req.body.org;
    const User_id = req.body.User_id;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_bankmaster set account_code='${account_code}',bank_name='${bank_name}',account_no='${account_no}',address_line1='${address_line1}',address_line2='${address_line2}',state='${state}',city='${city}',pincode=${pincode},ifsc_code='${ifsc_code}',ac_type='${type}',acname='${acname}',description='${description}',update_date_time=getdate(),update_user_name='${User_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno='${sno}'`)
        res.send('Updated')
    }
    catch (err) {
        res.send(err)
    }
}



const ImportBank = (req, res) => {
    const datas = req.body.data;
    const org = req.body.org;
    const User_id = req.body.User_id;
      console.log(datas)
    sql.connect(sqlConfig).then(() => {

        sql.query(`select * from ${org}.dbo.tbl_bankmaster where account_no in ('${datas.map(data => data.account_no).join("', '")}') OR ifsc_code in ('${datas.map(data => data.ifsc_code).join("', '")}')`)
            .then((resp) => {
                if (resp.rowsAffected[0] > 0)
                    res.send(resp.recordset.map(item => ({ "account_no": item.account_no, "ifsc_code": item.ifsc_code })))
                else {

                    sql.query(`INSERT into ${org}.dbo.tbl_bankmaster (account_code,bank_name,account_no,address_line1,address_line2,branch,state,city,pincode,ifsc_code,description,bank_uuid,status,ac_type,acname,add_date_time,add_user_name,add_system_name,add_ip_address)
                        VALUES ${datas.map(item => `('${item.account_code}','${item.bank_name}','${item.account_no}','${item.address_line1}','${item.address_line2}','${item.branch}','${item.state}','${item.city}',${item.pincode},'${item.ifsc_code}','${item.description}','${uuidv1()}','Active','${item.ac_type}','${item.acname}',getdate(),'${User_id}','${os.hostname()}','${req.ip}')`).join(',')}
                        `)
                    res.send("Data Added")
                }
            })

 
    })
}




module.exports = { InsertBank, TotalBanks, DeleteBank, ShowBank, UpdateBank, ImportBank }