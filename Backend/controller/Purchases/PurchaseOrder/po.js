const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertPurchaseorder = async (req, res) => {
    const org=req.body.org;
    const vendor_id=req.body.vendor_id;
    const po_location = req.body.po_location;
    const po_number = req.body.po_number;
    const po_date = req.body.po_date;
    const User_id = req.body.User_id
    const uuid = uuidv1()
    const flagsave = req.body.flagsave
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into ${org}.dbo.tbl_purchase_order (vendor_id,po_location,po_number,po_date,add_date_time,add_user_name,add_system_name,add_ip_address,status,po_uuid,flagsave)
            values('${vendor_id}','${po_location}','${po_number}','${po_date}',getDate(),'${User_id}','${os.hostname()}','${req.ip}','Active','${uuid}','${flagsave}')`)
        res.send('Insert')
    }
    catch (err) {
        res.send(err)
    }
}

const InsertSubPurchaseorder = async (req, res) => {
    const org=req.body.org;
    const vendor_id=req.body.vendor_id;
    const po_number = req.body.po_number;
    const location = req.body.location;
    const items = req.body.items;
    const quantity = req.body.quantity;
    const rate = req.body.rate;
    const amount = req.body.amount;
    const unit = req.body.unit;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into ${org}.dbo.tbl_sub_purchase_order (vendor_id,po_number,location,items,quantity,rate,amount,unit)
            values('${vendor_id}','${po_number}','${location}','${items}','${quantity}','${rate}','${amount}','${unit}')`)
        res.send("Insert")
    }
    catch (err) {
        res.send(err)
    }
}

const getPoDetailsVendor = async(req,res) => { 
    const org=req.body.org;
    const vendor_id=req.body.vendor_id;
    console.log(org, vendor_id)

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_order WHERE  vendor_id ='${vendor_id}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const getSavePO = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),po_date,121) as podate from ${org}.dbo.tbl_purchase_order with (nolock) where flagsave='Save'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}

const filterPO = async (req, res) => {
    const org = req.body.org;
    const startDate = req.body.startDate;
    const lastDate = req.body.lastDate;
    const vendor_id = req.body.vendor_id;
    const po_location = req.body.po_location;
    try {
        await sql.connect(sqlConfig)
        if (vendor_id === 'all') {
            const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_order tpo where   po_date between '${startDate}' and '${lastDate}' and po_location='${po_location}' and flagsave='post'`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_order tpo where   po_date between '${startDate}' and '${lastDate}' and vendor_id ='${vendor_id}'and po_location='${po_location}' and flagsave='post'`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)
    }

}

module.exports={InsertPurchaseorder,InsertSubPurchaseorder,getPoDetailsVendor,getSavePO,filterPO}
