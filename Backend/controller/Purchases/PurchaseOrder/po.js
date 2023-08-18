const sql = require('mssql')
const sqlConfig = require('../../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");

const InsertPurchaseorder = async (req, res) => {
    const org = req.body.org;
    const vendor_id = req.body.poalldetail.vendor_id;
    const vendor_location = req.body.poalldetail.vendor_location;
    const bill_add_id = req.body.poalldetail.bill_add_id;
    const ship_add_id = req.body.poalldetail.ship_add_id;
    const ship_add = req.body.poalldetail.ship_add_location;
    const po_number = req.body.ponumber;
    const po_date = req.body.poalldetail.podate;
    const po_amt = req.body.poalldetail.po_amt;
    const User_id = req.body.userid;
    const uuid = uuidv1()
    const flagsave = req.body.btntype;
    const fins_year = req.body.fins_year;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query
            (`insert into ${org}.dbo.tbl_purchase_order (vendor_id, vendor_location, bill_add_id, ship_add_id, ship_add_location, po_number,
                po_date, po_amt,flagsave, add_date_time, add_user_name, add_system_name, add_ip_address, status,fins_year, po_uuid)
             values('${vendor_id}', '${vendor_location}', '${bill_add_id}', '${ship_add_id}', '${ship_add}', '${po_number}',
                '${po_date}','${po_amt}','${flagsave}', getDate(), '${User_id}', '${os.hostname()}', '${req.ip}', 'Active', '${fins_year}','${uuid}')`)

        res.send('Insert')
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const InsertSubPurchaseorder = async (req, res) => {
    const org = req.body.org;
    const vendor_id = req.body.vendor_id;
    const po_number = req.body.ponumber;
    const poitem = req.body.poitem;
    let values = '';
    for (let i = 0; i < poitem.length; i++) {
        values = values + `('${vendor_id}','${po_number}','${poitem[i].item}' ,'${poitem[i].glcode}','${poitem[i].qty}','${poitem[i].rate}','${poitem[i].amt}','${poitem[i].unit}','${poitem[i].sac_hsn}')`
        if (i !== poitem.length - 1) { values = values + ',' }
    }

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ilogsolution.dbo.tbl_sub_purchase_order(vendor_id  ,po_number,items ,glcode ,quantity ,rate ,amt ,unit,sac_hsn)
            values${values}`)
        res.send("Insert")
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getPoDetailsVendor = async (req, res) => {
    const org = req.body.org;
    const vendor_id = req.body.vendor_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_order WHERE  vendor_id = '${vendor_id}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getSavePO = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *, convert(varchar(15), po_date, 121) as podate from ${org}.dbo.tbl_purchase_order with (nolock) where flagsave = 'Save' order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
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
            const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_order tpo where po_date between '${startDate}' and '${lastDate}' and po_location = '${po_location}' and flagsave = 'post'`)
            res.send(result.recordset)
        }
        else {
            const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_order tpo where po_date between '${startDate}' and '${lastDate}' and vendor_id = '${vendor_id}'and po_location = '${po_location}' and flagsave = 'post'`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getPoDetailsPreview = async (req, res) => {
    const org = req.body.org;
    const po_number = req.body.po_number;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15), po_date, 121) as podate from ${org}.dbo.tbl_purchase_order WHERE  po_number = '${po_number}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getSubPoDetailsPreview = async (req, res) => {
    const org = req.body.org;
    const po_number = req.body.po_number;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_sub_purchase_order WHERE  po_number = '${po_number}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const EditPurchaseOrder = async (req, res) => {
    const org = req.body.org;
    const po_number = req.body.po_num;
    const status = req.body.status;
    const new_po_number = req.body.new_po_number;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_purchase_order set flagsave = '${status}', po_number = '${new_po_number}' where po_number = '${po_number}';
        UPDATE ${org}.dbo.tbl_sub_purchase_order set po_number = '${new_po_number}' where po_number = '${po_number}' `)

        if (result.rowsAffected[0] > 0) {
            res.send("Updated")
        }
        else {
            res.send("Error")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const getPoData = async (req, res) => {
    const org = req.body.org;
    const po_number = req.body.po_number;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *, convert(varchar(15), po_date, 121) as podate from ${org}.dbo.tbl_purchase_order tpo  where po_number = '${po_number}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports = { InsertPurchaseorder, InsertSubPurchaseorder, getPoDetailsVendor, getSavePO, filterPO, getPoDetailsPreview, getSubPoDetailsPreview, EditPurchaseOrder, getPoData }
