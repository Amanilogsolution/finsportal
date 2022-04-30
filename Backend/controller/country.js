const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const countries = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from FINSDB.dbo.tbl_countries order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}

const InsertCountry = async (req, res) => {
    const country_name = req.body.country_name;
    const country_id = req.body.country_id;
    const country_code = req.body.country_code;
    const country_phonecode = req.body.country_phonecode;
    const uuid = uuidv1()
    // console.log(country_name, country_id, country_code, country_phonecode)
    try {
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from tbl_countries where country_name='${country_name}' OR country_id='${country_id}' OR country_code='${country_code}' OR country_phonecode='${country_phonecode}'`)
        // console.log(duplicate.recordset[0])
        if (!duplicate.recordset.length) {
            const result = await sql.query(`insert into tbl_countries (country_name,country_id,country_code,country_phonecode,country_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${country_name}','${country_id}','${country_code}','${country_phonecode}','${uuid}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
            res.send('Added')
        } else {
            res.send("Already")
        }
    }
    catch (err) {
        console.log(err)
    }
}
async function showcountry(req, res) {
    const sno = req.body.sno
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_countries where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        console.log(err)
    }
}

async function updatecountry(req, res) {
    const sno = req.body.sno
    const country_name = req.body.country_name;
    const country_id = req.body.country_id;
    const country_code = req.body.country_code;
    const country_phonecode = req.body.country_phonecode;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_countries set country_name='${country_name}',country_id='${country_id}',country_code='${country_code}',country_phonecode='${country_phonecode}',update_date_time=getdate(),update_user_name='aman',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}

async function deletecountry(req, res) {
    const sno = req.body.sno
    const status = req.body.status
    console.log(sno, status)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_countries set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        console.log(err)
    }
}


// check excel dublicate value 
const CheckimportCountry = (req, res) => {
    const datas = req.body.data;
    let duplicatedata = [];

    try 
    {
        sql.connect(sqlConfig).then(() => {

            datas.forEach(async (item) => {

                await sql.query(`select * from FINSDB.dbo.tbl_countries where country_name='${item.country_name}' OR country_id='${item.country_id}' OR country_code='${item.country_code}' OR country_phonecode='${item.country_phonecode}'`)
                    .then((resp) =>
                    {
                        if (resp)
                        duplicatedata.push({ "country_name": item.country_name, "country_id": item.country_id, "country_code": item.country_code, "country_phonecode": item.country_phonecode, })
                    })
            })

            setTimeout(() => {
                res.send(duplicatedata)
            }, 1000);

            // if (dublicatedate.length > 0) {
            //     // console.log("already")
            //     // res.status(200).json({
            //     //     data: dublicatedate
            //     // })
            // }
            // else {
            //     console.log("done")

            //     // res.status(400).json({
            //     //     data: "test"
            //     // })
            // }
        })
    }
    catch (err) {
        console.log(err);
    }
  
}




const ImportCountry = async (req, res) => {
    const datas = req.body.data;
    console.log(datas)
    try {     
        datas.forEach(async (item) => {
            await sql.connect(sqlConfig)
            var result = await sql.query(`insert into tbl_countries 
            (country_name,country_id,country_code,country_phonecode,country_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${item.country_name}','${item.country_id}','${item.country_code}','${item.country_phonecode}','${uuidv1()}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
        }
        )
        res.send("data Imported")
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { countries, InsertCountry, showcountry, updatecountry, deletecountry, CheckimportCountry, ImportCountry }

     // if(duplicate) { 
            //        dublicatedate.push(duplicate)
            //     //    res.send(duplicate)
            // }
            // else
            // {
            //     var result = await sql.query(`insert into tbl_countries
            //     (country_name,country_id,country_code,country_phonecode,country_uuid,add_date_time,add_user_name,add_system_name,add_ip_address,status)
            //      values('${item.country_name}','${item.country_id}','${item.country_code}','${item.country_phonecode}','${uuidv1()}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
            //      dublicatedate.push()
            //      // res.send('Inserted')
            //     // if(result)
            //     //        {
            //     //           res.send("result")
            //     //        }
            // }