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

const ShowLocation = async (req, res) => {
    const org = req.body.org
    const location_id = req.body.location_id
    console.log(org,location_id)
    // console.log(`select * from ${org}.dbo.tbl_countries order by sno desc`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT location_name,gstin_no from ${org}.dbo.tbl_location_master where location_id='${location_id}' and status='Active'`)
        res.send(result.recordset[0])
    } catch (err) {
        console.log(err)
    }
}


const LocationAddress = async (req, res) => {
    const org = req.body.org
    const location_id = req.body.location_id
    console.log(org,location_id)
    // console.log(`select * from ${org}.dbo.tbl_countries order by sno desc`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT location_name,gstin_no,location_add1,location_add2,location_city,location_pin,from_date ,location_state,location_country from ${org}.dbo.tbl_location_address where location_id='${location_id}' and status='Active'`)
        res.send(result.recordset[0])
    } catch (err) {
        console.log(err)
    }
}

const InsertLocationAddress = async(req, res)=> {
    const org = req.body.org;
    const location_name =req.body.location_name;
    const gstin_no = req.body.gstin_no
    const location_add1 = req.body.location_add1
    const location_add2 = req.body.location_add2;
    const location_city = req.body.location_city;
    const location_state = req.body.location_state;
    const location_country = req.body.location_country;
    const from_date = req.body.from_date
    const location_id = req.body.location_id
    const location_pin = req.body.location_pin
    const to_date = req.body.to_date
    console.log(to_date)
    console.log(org,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin)
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_location_address where location_id='${location_id}' and status = 'Active'`)
        console.log(duplicate)
        if (duplicate.rowsAffected>0){
        const update = await sql.query(`update ${org}.dbo.tbl_location_address set status='Deactive',to_date='${to_date}' where status='Active' and location_id='${location_id}'`)
        const insert = await sql.query(`insert into  ${org}.dbo.tbl_location_address (location_id,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_pin,location_country,from_date,add_date_time,add_user_name,add_system_name,add_ip_address,status)
                                                                             values('${location_id}','${location_name}','${gstin_no}','${location_add1}','${location_add2}','${location_city}','${location_state}','${location_pin}','${location_country}','${from_date}',getdate(),'Admin','${os.hostname()}','${req.ip}','Active')`) 
        }
        else{
            const insert = await sql.query(`insert into  ${org}.dbo.tbl_location_address (location_id,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_pin,location_country,from_date,add_date_time,add_user_name,add_system_name,add_ip_address,status)
            values('${location_id}','${location_name}','${gstin_no}','${location_add1}','${location_add2}','${location_city}','${location_state}','${location_pin}','${location_country}','${from_date}',getdate(),'Admin','${os.hostname()}','${req.ip}','Active')`)  
            res.send(insert)
        }
    }
    catch (err) {
        console.log(err)
    }
}

const UpdateLocationAddress = async(req, res)=> {
    const org = req.body.org
    const location_add1 = req.body.location_add1
    const location_add2 = req.body.location_add2;
    const location_city = req.body.location_city;
    const location_state = req.body.location_state;
    const location_country = req.body.location_country;
    const from_date = req.body.from_date
    const location_id = req.body.location_id
    const location_pin = req.body.location_pin
    console.log(org,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_location_address  set location_add1='${location_add1}',location_add2='${location_add2}',
        location_city='${location_city}',location_state='${location_state}',location_country='${location_country}', from_date='${from_date}',location_pin='${location_pin}'  WHERE location_id='${location_id}';`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}

module.exports={AddLocation,TotalLocation,LocationAddress,UpdateLocationAddress,ShowLocation,InsertLocationAddress}