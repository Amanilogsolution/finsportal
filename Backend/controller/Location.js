const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const TotalLocation = async (req, res) => {
    const org = req.body.org
    console.log(org)
    // console.log(`select * from ${org}.dbo.tbl_countries order by sno desc`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_location_master order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}

const AddLocation = async (req, res) => {
    const org = req.body.org
    const location_name = req.body.location_name;
    const gstin_no = req.body.gstin_no;
    const contact_name1 = req.body.contact_name1; 
    const contact_name2 = req.body.contact_name2;
    const contact_phone_no1 = req.body.contact_phone_no1;
    const contact_phone_no2 = req.body.contact_phone_no2;

    const uuid = uuidv1()
    console.log(org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2)
    try {
        await sql.connect(sqlConfig)
  
    
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_location_master where location_name='${location_name}'`)
        // console.log(duplicate.recordset[0])
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into ${org}.dbo.tbl_location_master
            (location_name,gstin_no,location_id,contact_name1,
                contact_name2,contact_phone_no1,contact_phone_no2,
                add_date_time,add_user_name,add_system_name,add_ip_address,status)
                values('${location_name}','${gstin_no}','${uuid}','${contact_name1}','${contact_name2}',${contact_phone_no1},${contact_phone_no2},
                getdate(),'Rupesh','${os.hostname()}','${req.ip}','Active')`)
            res.send('Added')
        } else {
            res.send("Already")
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports={AddLocation,TotalLocation}