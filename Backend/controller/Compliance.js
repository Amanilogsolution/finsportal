const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const Showcompliances = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select compliance_type,nature,period,period_name,convert(varchar(15),from_month,121) as from_month,convert(varchar(15),to_month,121) as to_month,from_applicable,convert(varchar(15),due_date,121) as due_date,convert(varchar(15),extended_date,121) as extended_date,status  from ${org}.dbo.tbl_compliance order by sno desc`)
        res.send(result.recordset)
    } catch (err) {
        console.log(err)
    }
}

const Insertcompliance = async (req, res) =>{
    const org = req.body.org_name;
    const compliance_type=req.body.compliance_type;
    const nature=req.body.nature;
    const period=req.body.period;
    const period_name=req.body.period_name;
    const from_month=req.body.from_month;
    const to_month=req.body.to_month;
    const from_applicable=req.body.from_applicable;
    const due_date=req.body.due_date;
    const extended_date=req.body.extended_date;
    console.log(org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date)
    try{
        await sql.connect(sqlConfig)
        const result =await sql.query(`insert into ${org}.dbo.tbl_compliance (compliance_type ,nature,period ,period_name ,from_month,to_month ,
            from_applicable ,due_date ,extended_date ,add_date_time ,add_user_name ,add_system_name ,
            add_ip_address ,status )
            values('${compliance_type}','${nature}','${period}','${period_name}','${from_month}','${to_month}',
             '${from_applicable}','${due_date}','${extended_date}',getDate(),'Rupesh','${os.hostname()}','${req.ip}','Active')`);
        res.send(result)
    }
    catch(err)
    {
        res.send(err)

    }
    
}

module.exports = { Showcompliances,Insertcompliance}
