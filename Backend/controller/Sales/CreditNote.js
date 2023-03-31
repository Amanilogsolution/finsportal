const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')

const InsertCreditNote = async (req, res) => {
    const org = req.body.org;
    const cn_no = req.body.cn_no;
    const cn_date = req.body.cn_date;
    const mast_id = req.body.mast_id;
    const cust_id = req.body.cust_id;
    const inv_no = req.body.inv_no;
    const inv_date = req.body.inv_date;
    const total_amt = req.body.total_amt;
    const net_amt = req.body.net_amt;
    const remark = req.body.remark;
    const location = req.body.location;
    const fins_year = req.body.fins_year;
    const userid = req.body.userid;
    const total_cn_amt = req.body.total_cn_amt

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_cn (cn_no,cn_type,cn_date,mast_id,
            cust_id,inv_no,inv_date,total_amt,net_amt,remark,location,cn_flag,fins_year,reqtoappr_date_time,
            reqtoappr_user_name,reqtoappr_system_name,reqtoappr_ip_address,status,total_cn_amt)
            values('${cn_no}','CR','${cn_date}','${mast_id}',
            '${cust_id}','${inv_no}','${inv_date}','${total_amt}','${net_amt}','${remark}','${location}','1','${fins_year}',getdate(),'${userid}',
            '${os.hostname()}','${req.ip}','Waiting','${total_cn_amt}')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const AllCNData = async (req, res) => {
    const org = req.body.org;
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),inv_date,121) as Joindate  from ${org}.dbo.tbl_cn `)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ChangeCNStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_cn set status='${status}' where sno = ${sno} `)
        if(result.recordset.length>0){
            res.send('Updated')
        }
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {InsertCreditNote,AllCNData,ChangeCNStatus}