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
  const ref_date = req.body.ref_dateref_dateref_date;
  const amt = req.body.amt;
  const amt_receive = req.body.amt_receive;
  const amt_bal = req.body.amt_bal;
  const dr_cr = req.body.dr_cr;
  const narration = req.body.narration;
  const cost_centre = req.body.cost_centre;
  const cust_family = req.body.cust_family;
  const charge_code = req.body.charge_code;
  const tds_section = req.body.tds_section;
  const tds_type = req.body.tds_type;
  const tds_per = req.body.tds_per;
  const flag = req.body.flag;
  const master_id = req.body.master_id;
  const accural = req.body.accural;
  const fin_year = req.body.fin_year;
  const jv_uuid = uuidv1();
  const add_user_name = req.body.add_user_name;

  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query(`insert into ${org}.dbo.tbl_journal_voucher (jv_no,jv_date,location,glcode,account_head,ref_no,ref_date,amt,amt_receive,amt_bal,dr_cr,narration,cost_centre,cust_family,
                                        charge_code,tds_section,tds_type,tds_per,flag,master_id,accural,fin_year,status,jv_uuid,add_user_name,add_system_name,add_ip_address,add_date_time)
                                        values ('${jv_no}','${jv_date}','${location}','${glcode}','${account_head}','${ref_no}','${ref_date}','${amt}','${amt_receive}','${amt_bal}','${dr_cr}','${narration}','${cost_centre}','${cust_family}',
                                        '${charge_code}','${tds_section}','${tds_section}','${tds_type}','${tds_per}','${flag}','${master_id}','${accural}','${fin_year}','Active','${jv_uuid}','${add_user_name}','${os.hostname()}','${req.ip}','gatdate()')`);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const TotalJV = async(req,res) => {
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(`select * from ${org}.dbo.tbl_journal_voucher with (nolock);`)
        res.send(result.recordset)
    }
    catch (error) {
        console.log(err)
}
}

const UpdateJVStatus = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_journal_voucher set status='${status}' where sno='${sno}'`)
        res.send("done")
    } catch (err) {
        res.send(err)
    }
}

const GetJV = async(req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_journal_voucher tan2 with (nolock) where sno='${sno}'`)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {InsertJV,TotalJV,UpdateJVStatus,GetJV}
