const sql =require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const inserSubInvoice = async (req, res) => {
    const org = req.body.org
    const pj_id = req.body.pj_id;
    const bill_date = req.body.bill_date;
    const bill_no = req.body.bill_no;
    const glcode = req.body.glcode;
    const samt = req.body.samt;
    const deduction= req.body.deduction;
    const net_amt = req.body.net_amt;
    const remarks = req.body.remarks;
    const file_no= req.body.file_no;
    const cost_centre = req.body.cost_centre;
    const location= req.body.location;
    const ac_name= req.body.ac_name;
    const costgl_code = req.body.costgl_code;
    const narration= req.body.narration;
    const pod_voucher= req.body.pod_voucher;
    const pass_amt= req.body.pass_amt;
    const pj_date= req.body.pj_date;
    const dr_amt = req.body.dr_amt;
    const fin_year= req.body.fin_year;
    const gst_rate = req.body.gst_rate;
    const sac_hsn = req.body.sac_hsn;
    const chrg_id = req.body.chrg_id;
    const qty = req.body.qty;
    const subcost_centre = req.body.subcost_centre;

 
    const userid = req.body.userid
 
    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`insert into ${org}.dbo.tbl_sub_bill(pj_id,bill_date,bill_no,glcode,samt,deduction,
            net_amt,remarks,file_no,cost_centre,location,ac_name,costgl_code,narration,pod_voucher,
            pass_amt,pj_date,dr_amt,fin_year,gst_rate,sac_hsn,chrg_id,qty,subcost_centre,
            add_user_name,add_system_name,add_ip_address,add_date_time,status,sub_bill_uuid)
            values('${pj_id}','${bill_date}','${bill_no}','${glcode}','${samt}','${deduction}','${net_amt}','${remarks}',
            '${file_no}','${cost_centre}','${location}','${ac_name}','${costgl_code}','${narration}','${pod_voucher}',
            '${pass_amt}','${pj_date}','${dr_amt}','${fin_year}','${gst_rate}','${sac_hsn}','${chrg_id}','${qty}',
            '${subcost_centre}','${userid}','${os.hostname()}','${req.ip}',getdate(),'Active','${uuidv1()}')`)
        res.send('Added')  
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={inserSubInvoice}