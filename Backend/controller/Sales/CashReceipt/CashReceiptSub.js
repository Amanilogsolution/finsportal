const sql = require('mssql')
const sqlConfig = require('../../../config.js')

const AllCashReceiptSub = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` select * from ${org}.dbo.tbl_cash_receipt_sub with (nolock) order by sno DESC `)
        res.status(200).json({ result: result.recordset })
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const InsertCashSubReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_receipt_id = req.body.cashRecepId;
    const json_data = req.body.cash_receiptSubData;

    try {
        let colName = `insert into  ${org}.dbo.tbl_cash_receipt_sub (cash_receipt_id ,chart_of_acct ,ac_head ,ac_head_name,glcode,location,ref_no,ref_date,
            amt,net_amt,pay_type,rec_amt,bal_amt,master_id,emp_id,emp_name)values`

        for (let i = 0; i < json_data.length; i++) {
            colName = colName + `('${cash_receipt_id}' ,'${json_data[i].chartOfAcct}','${json_data[i].custId}' ,'${json_data[i].achead}',
    '${json_data[i].glcode}','${json_data[i].costCenter}' ,'${json_data[i].refNo}','${json_data[i].refDate}','${json_data[i].refAmt}','${json_data[i].netAmt}',
    '${json_data[i].payType}','${json_data[i].recAmt}','${json_data[i].balAmt}','${json_data[i].master_id}','${json_data[i].subCostCenterId}','${json_data[i].subCostCenter}')`

            if (i != (json_data.length - 1)) { colName = colName + ',' }
        }

        await sql.connect(sqlConfig)
        const result = await sql.query(colName)
        res.status(201).json({ message: "Added successfully" })
    }
    catch (err) {
        res.send(err)
    }
}

const GetSubCashReceipt = async (req, res) => {
    const org = req.body.org;
    const cash_receipt_id = req.body.cashRecepId;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select convert(varchar(15),ref_date, 121) as refDate,* from ${org}.dbo.tbl_cash_receipt_sub with (nolock) where cash_receipt_id='${cash_receipt_id}' `)
        res.status(200).json({ data: result.recordset })
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = { AllCashReceiptSub, InsertCashSubReceipt, GetSubCashReceipt }
