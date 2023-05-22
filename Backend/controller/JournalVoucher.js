const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertJV = async (req,res) =>{
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
    const charge_code= req.body.charge_code;
    const tds_section = req.body.tds_section;
    const tds_type = req.body.tds_type;
    const tds_per = req.body.tds_per;
    const flag = req.body.flag;
    const master_id= req.body.master_id;
    const accural = req.body.accural;
    const fin_year = req.body.fin_year;
    const status = req.body.status;
    const jv_uuid = req.body.jv_uuid





}