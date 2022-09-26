const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");


const AddUserRole = async (req, res) => {
    const org = req.body.org
    const roles = req.body.roles;
    const role_id = req.body.role_id;
    const description = req.body.description;
    const customer_view = req.body.customer_view;
    const customer_create = req.body.customer_create;
    const customer_edit = req.body.customer_edit;
    const customer_delete = req.body.customer_delete;
    const vendor_view = req.body.vendor_view;
    const vendor_create = req.body.vendor_create
    const vendor_edit = req.body.vendor_edit;
    const vendor_delete = req.body.vendor_delete;
    const items_view = req.body.items_view;
    const items_create = req.body.items_create;
    const items_edit = req.body.items_edit;
    const items_delete = req.body.items_delete;
    const banking_view = req.body.banking_view;
    const banking_create = req.body.banking_create;
    const banking_edit = req.body.banking_edit;
    const banking_delete = req.body.banking_delete;
    const invoice_view = req.body.invoice_view;
    const invoice_create = req.body.invoice_create;
    const invoice_edit = req.body.invoice_edit;
    const invoice_delete = req.body.invoice_delete;
    const bills_view = req.body.bills_view;
    const bills_create = req.body.bills_create;
    const bills_edit = req.body.bills_edit;
    const bills_delete = req.body.bills_delete;
    const chartof_accounts_view = req.body.chartof_accounts_view;
    const chartof_accounts_create = req.body.chartof_accounts_create;
    const chartof_accounts_edit = req.body.chartof_accounts_edit;
    const chartof_accounts_delete = req.body.chartof_accounts_delete;
    const users_view = req.body.users_view;
    const users_create = req.body.users_create;
    const users_edit = req.body.users_edit;
    const users_delete = req.body.users_delete;
    const payment_terms_view = req.body.payment_terms_view;
    const payment_terms_create = req.body.payment_terms_create;
    const payment_terms_edit = req.body.payment_terms_edit;
    const payment_terms_delete = req.body.payment_terms_delete;
    const user_id = req.body.user_id
    console.log(org, roles, description, customer_view, customer_create, customer_edit, customer_delete, vendor_view, vendor_create, vendor_edit, vendor_delete, items_view, items_create, items_edit, items_delete, banking_view,
        banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete, bills_view, bills_create, bills_edit, bills_delete, chartof_accounts_view, chartof_accounts_create, chartof_accounts_edit,
        chartof_accounts_delete, users_view, users_create, users_edit, users_delete, payment_terms_view, payment_terms_create, payment_terms_edit, payment_terms_delete, user_id)


    try {
        await sql.connect(sqlConfig)

        const duplicate = await sql.query(`select * from ${org}.dbo.user_roles where roles='${roles}'`)
        console.log(duplicate.recordset.length)
        
        if(duplicate.recordset.length>0){

            res.send('Role Already')
      
           console.log('if')
        }else{
          
              const result = await sql.query(`
        insert into ${org}.dbo.user_roles(roles,roles_id,description,customer_view,customer_create,
            customer_edit,customer_delete,vendor_view,vendor_create,
            vendor_edit,vendor_delete,items_view,items_create,
            items_edit,items_delete,banking_view,banking_create,
            banking_edit,banking_delete,invoice_view,invoice_create ,
            invoice_edit ,invoice_delete , bills_view  ,bills_create  ,
            bills_edit  ,bills_delete ,chartof_accounts_view ,chartof_accounts_create  ,
            chartof_accounts_edit  ,chartof_accounts_delete  ,users_view  ,users_create  ,
           users_edit , users_delete ,payment_terms_view ,payment_terms_create ,
             payment_terms_edit ,payment_terms_delete,add_user_name,add_system_name,
             add_ip_address,add_date_time,status,roles_uuid)
            values('${roles}','${role_id}','${description}','${customer_view}','${customer_create}', 
           '${customer_edit}','${customer_delete}','${vendor_view}','${vendor_create}',
           '${vendor_edit}','${vendor_delete}','${items_view}','${items_create}',
           '${items_edit}','${items_delete}','${banking_view}','${banking_create}',
           '${banking_edit}','${banking_delete}','${invoice_view}','${invoice_create}',
           '${invoice_edit}','${invoice_delete}','${bills_view}','${bills_create}',
           '${bills_edit}','${bills_delete}','${chartof_accounts_view}','${chartof_accounts_create}',
           '${chartof_accounts_edit}','${chartof_accounts_delete}','${users_view}','${users_create}',
           '${users_edit}','${users_delete}','${payment_terms_view}','${payment_terms_create}',
           '${payment_terms_edit}','${payment_terms_delete}','${user_id}','${os.hostname()}',
           '${req.ip}',getDate(),'Active','${uuidv1()}')`)
            console.log(result)

            res.send('Added')

           
        }

    }
    catch (err) {
        res.send(err)
    }
}

const getUserRole = async(req,res)=>{
    const org = req.body.org;
    const role = req.body.role;
    console.log(`select * from ${org}.dbo.user_roles where roles='${role}'`)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.user_roles where roles='${role}'`)
        console.log(duplicate)
        res.send(duplicate.recordset[0])
    }
    catch(err){
        res.send(err)

    }

}



module.exports = { AddUserRole,getUserRole }