const sql = require("mssql");
const sqlConfig = require("../config.js");
const os = require("os");
const uuidv1 = require("uuid/v1");

const InsertJV = async (req, res) => {
    const org = req.body.org;
    const jv_no = req.body.jv_no;
    const jv_date = req.body.jv_date;
    const location = req.body.location;
    const glcode = req.body.glcode;
    const account_head = req.body.account_head;
    const ref_no = req.body.ref_no;
    const ref_date = req.body.ref_date;
    const amt = req.body.amt;
    const amt_receive = req.body.amt_receive;
    const amt_bal = req.body.amt_bal;
    const dr_cr = req.body.dr_cr;
    const narration = req.body.narration;
    const cost_centre = '';
    const cust_family = '';
    const charge_code = req.body.charge_code;
    const tds_section = '';
    const tds_type = '';
    const tds_per = '';
    const flag = '';
    const master_id = '';
    const accural = '';
    const fin_year = req.body.fin_year;
    const jv_uuid = uuidv1();
    const add_user_name = req.body.add_user_name;

    try {
        await sql.connect(sqlConfig);
        const result =
            await sql.query(`insert into ${org}.dbo.tbl_journal_voucher (jv_no,jv_date,location,glcode,account_head,ref_no,ref_date,amt,amt_receive,amt_bal,dr_cr,narration,cost_centre,cust_family,
                                        charge_code,tds_section,tds_type,tds_per,flag,master_id,accural,fin_year,status,jv_uuid,add_user_name,add_system_name,add_ip_address,add_date_time)
                                        values ('${jv_no}','${jv_date}','${location}','${glcode}','${account_head}','${ref_no}','${ref_date}','${amt}','${amt_receive}','${amt_bal}','${dr_cr}','${narration}','${cost_centre}','${cust_family}',
                                        '${charge_code}','${tds_section}','${tds_type}','${tds_per}','${flag}','${master_id}','${accural}','${fin_year}','Active','${jv_uuid}','${add_user_name}','${os.hostname()}','${req.ip}',getDate())`);
        res.send(result);
    } catch (error) {
        res.status(500).send(err)
    }
};

const TotalJV = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(`select DISTINCT jv_no,convert(varchar(15),jv_date,121) as Jv_date,narration,status  from ${org}.dbo.tbl_journal_voucher tjv`)
        res.send(result.recordset)
    }
    catch (error) {
        res.status(500).send(err)
    }
}

const UpdateJVStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const jv_no = req.body.jv_no;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_journal_voucher set status='${status}' where jv_no='${jv_no}'`)
        res.send("done")
    } catch (err) {
        res.status(500).send(err)
    }
}

const GetJV = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT *,convert(varchar(15),jv_date,121) as Jv_date,convert(varchar(15),ref_date,121) as Ref_date from ${org}.dbo.tbl_journal_voucher tan2 with (nolock) where jv_no='${sno}'`)
        res.send(result.recordsets[0])
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { InsertJV, TotalJV, UpdateJVStatus, GetJV }
