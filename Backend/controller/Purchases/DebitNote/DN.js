const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')

const InsertDebitNote = async (req, res) => {
    const org = req.body.org;
    const dn_no = req.body.dn_no;
    const dn_date = req.body.dn_date;
    const total_dn_amt = req.body.total_dn_amt;
    const remark = req.body.remark;
    const bill_no = req.body.bill_no;
    const voucher_no = req.body.voucher_no;
    const user_id = req.body.user_id

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_debitnote (dn_no,dn_type,dn_date,total_dn_amt,remark,dn_source,bill_no,voucher_no,dn_flag,reqtoappr_date_time,reqtoappr_user_name,
            reqtoappr_system_name,reqtoappr_ip_address,status) values('${dn_no}','DR','${dn_date}','${total_dn_amt}','${remark}','DJ','${bill_no}','${voucher_no}','Waiting',getdate(),'${user_id}','${os.hostname()}',
            '${req.ip}','Active')`)
        res.send('Added')
    }
    catch (err) {
        res.send(err)
    }
}

const AllDNData = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),dn_date,121) as Joindate  from ilogsolution.dbo.tbl_debitnote`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const ChangeDNStatus = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_debitnote set dn_flag='${status}' where sno = ${sno} `)
        if(result.recordset.length>0){
            res.send('Updated')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const getDNData = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),dn_date,121) as dn_Date from ${org}.dbo.tbl_debitnote where sno = ${sno} `)
        res.send(result.recordset[0]) 
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {InsertDebitNote,AllDNData,ChangeDNStatus,getDNData}