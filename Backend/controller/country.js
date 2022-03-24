const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')

const countries = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_countries order by sno desc`)
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
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into tbl_countries (country_name,country_id,country_code,country_phonecode,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${country_name}','${country_id}','${country_code}','${country_phonecode}',getdate(),'admin','${os.hostname()}','${req.ip}','Active')`)
        res.send('Added')
    }
    catch(err){
        console.log(err)
    }
}
async function showcountry(req,res){
    const sno = req.body.sno
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from tbl_countries where sno = ${sno}`)
        res.send(result.recordset[0])
        }
        catch(err){
            console.log(err)
            }
          }

async function updatecountry(req,res){
    const sno = req.body.sno
    const country_name = req.body.country_name;
    const country_id = req.body.country_id;
    const country_code = req.body.country_code;
    const country_phonecode = req.body.country_phonecode;
    const status = req.body.status;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_countries set country_name='${country_name}',country_id='${country_id}',country_code='${country_code}',country_phonecode='${country_phonecode}',update_date_time=getdate(),update_user_name='aman',update_system_name='${os.hostname()}',update_ip_address='${req.ip}' where sno = ${sno}`)
        res.send('done')
        }
        catch(err){
            console.log(err)
            }
              }

async function deletecountry(req,res){
    const sno = req.body.sno
    const status = req.body.status
    console.log(sno,status)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update tbl_countries set status='${status}' where sno = ${sno}`)
        res.send('done')
        }
        catch(err){
            console.log(err)
            }
                }



//INSERT INTO tbl_countries (country_name,country_id,country_code,country_phonecode
// ,add_user_name,add_system_name,add_date_time,add_ip_address ,status)
// VALUES ('India',1,'IND',91,'Rupesh','hp',getdate(),'1','Active');
    
module.exports={countries,InsertCountry,showcountry,updatecountry,deletecountry}