const sql = require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const { request } = require('http')
const uuidv1 = require("uuid/v1");


const AllCustomer = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_new_customer with (nolock) order by sno desc`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const AddCustomer = async (req, res) => {
    const User_id = req.body.User_id;
    const org = req.body.org;
    const mast_id = req.body.mast_id;
    const cust_id = req.body.cust_id;
    const cust_type = req.body.cust_type;
    const cust_name = req.body.cust_name;
    const company_name = req.body.company_name;
    const cust_display_name = req.body.cust_display_name;
    const cust_email = req.body.cust_email;
    const cust_work_phone = req.body.cust_work_phone ? req.body.cust_work_phone : null;
    const cust_phone = req.body.cust_phone ? req.body.cust_phone : null;
    const skype_detail = req.body.skype_detail;
    const designation = req.body.designation;
    const department = req.body.department;
    const website = req.body.website;
    const gst_treatment = req.body.gst_treatment;
    const gstin_uin = req.body.gstin_uin;
    const pan_no = req.body.pan_no;
    const place_of_supply = req.body.place_of_supply;
    const tax_preference = req.body.tax_preference;
    const exemption_reason = req.body.exemption_reason;
    const currency = req.body.currency;
    const opening_balance = req.body.opening_balance;
    const payment_terms = req.body.payment_terms;
    const enable_portal = req.body.enable_portal;
    const portal_language = req.body.portal_language;
    const facebook_url = req.body.facebook_url;
    const twitter_url = req.body.twitter_url;
    const billing_address_attention = req.body.billing_address_attention;
    const billing_address_country = req.body.billing_address_country;
    const billing_address_city = req.body.billing_address_city;
    const billing_address_state = req.body.billing_address_state;
    const billing_address_pincode = req.body.billing_address_pincode ? req.body.billing_address_pincode : null;
    const billing_address_phone = req.body.billing_address_phone ? req.body.billing_address_phone : '';
    const billing_address_fax = req.body.billing_address_fax;
    const contact_person_name = req.body.contact_person_name;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_work_phone = req.body.contact_person_work_phone ? req.body.contact_person_work_phone : null;
    const contact_person_phone = req.body.contact_person_phone ? req.body.contact_person_phone : null;
    const contact_person_skype = req.body.contact_person_skype;
    const contact_person_designation = req.body.contact_person_designation;
    const contact_person_department = req.body.contact_person_department;
    const remark = req.body.remark;
    const uuid = uuidv1()

    try {
        const result = await sql.query(`INSERT into ${org}.dbo.tbl_new_customer(mast_id,cust_id,cust_type,cust_name,
                company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,
                website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
                opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
                billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
                contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address,newcust_uuid)
                Values('${mast_id}','${cust_id}','${cust_type}','${cust_name}','${company_name}','${cust_display_name}','${cust_email}','${cust_work_phone}','${cust_phone}','${skype_detail}','${designation}',
                      '${department}','${website}','${gst_treatment}','${gstin_uin}','${pan_no}','${place_of_supply}','${tax_preference}','${exemption_reason}','${currency}','${opening_balance}','${payment_terms}','${enable_portal}','${portal_language}',
                      '${facebook_url}','${twitter_url}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}','${billing_address_pincode}','${billing_address_phone}','${billing_address_fax}','${contact_person_name}',
                      '${contact_person_email}','${contact_person_work_phone}','${contact_person_phone}','${contact_person_skype}','${contact_person_designation}','${contact_person_department}','${remark}','Active',getdate(),'${User_id}','${os.hostname()}',
                        '${req.ip}','${uuid}');`)

        res.send(result.rowsAffected)
    }
    catch (err) {
        res.send(err)
    }
}

const DeleteCustomer = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    const status = req.body.status;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_new_customer set status='${status}' where sno = ${sno}`)
        res.send('done')
    }
    catch (err) {
        res.send(err)
    }
}

const Customer = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_new_customer where sno = ${sno}`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}

const UpdateCustomer = async (req, res) => {
    const User_id = req.body.User_id;
    const sno = req.body.sno;
    const org = req.body.org;
    const cust_email = req.body.cust_email;
    const cust_work_phone = req.body.cust_work_phone;
    const cust_phone = req.body.cust_phone;
    const contact_person_name = req.body.contact_person_name;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_work_phone = req.body.contact_person_work_phone;
    const contact_person_phone = req.body.contact_person_phone;
    const contact_person_skype = req.body.contact_person_skype;
    const contact_person_designation = req.body.contact_person_designation;
    const contact_person_department = req.body.contact_person_department;
    const remark = req.body.remark;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` UPDATE ${org}.dbo.tbl_new_customer SET cust_email='${cust_email}',cust_work_phone='${cust_work_phone}',cust_phone='${cust_phone}',
            contact_person_name='${contact_person_name}',contact_person_email='${contact_person_email}',contact_person_work_phone='${contact_person_work_phone}',
            contact_person_phone='${contact_person_phone}',contact_person_skype='${contact_person_skype}',contact_person_designation='${contact_person_designation}',
            contact_person_department='${contact_person_department}',remark='${remark}',update_date_time=getdate(),update_user_name='${User_id}',
            update_system_name='${os.hostname()}',update_ip_address='${req.ip}'
         WHERE sno=${sno}`)
        res.send('Updated')
    } catch (err) {
        res.send(err)
    }
}

const Customer_id = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT cust_id FROM ${org}.dbo.tbl_new_customer with (nolock)`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const Customername = async (req, res) => {
    const org = req.body.org;
    const cust_id = req.body.cust_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select cust_name from ${org}.dbo.tbl_new_customer with (nolock) where cust_id='${cust_id}' and status='Active'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const Unique_Cust_id = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT cust_totalid,year FROM ${org}.dbo.tbl_fin_year  with (nolock) WHERE sno=(SELECT MAX(sno) FROM ${org}.dbo.tbl_fin_year)`)
        res.send(result.recordset[0])

    }
    catch (err) {
        res.send(err)
    }
}

const Lastcust_id = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT cust_id FROM ${org}.dbo.tbl_new_customer with (nolock) WHERE sno=(SELECT MAX(sno) FROM ${org}.dbo.tbl_new_customer)`)

        res.send(result.recordset[0])

    }
    catch (err) {
        res.send(err)
    }
}

const CustomerMastid = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT DISTINCT(mast_id) from ${org}.dbo.tbl_new_customer where  status='Active'`)
        res.send(result.recordset)

    }
    catch (err) {
        res.send(err)
    }
}
const CustomerIdMid = async (req, res) => {
    const org = req.body.org;
    const masterid = req.body.masterid;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select count(cust_id) as count from ${org}.dbo.tbl_new_customer tnv with (nolock) WHERE mast_id='${masterid}';`)
        res.send(result.recordset)


    }
    catch (err) {
        res.send(err)
    }
}

const Checkmidvalid = (req, res) => {
    const org = req.body.org;
    const importdata = req.body.importdata;
    const tbl_name= req.body.tbl_name;
    // console.log(importdata)
    // console.log(`select master_id from ${org}.dbo.tbl_id_controller where master_id in ('${importdata.map(data => data)
    //     .join("', '")}')`)

    try {
        sql.connect(sqlConfig).then(() => {
            sql.query(`select mast_id from ${org}.dbo.${tbl_name} where mast_id in ('${importdata.map(data => data)
                .join("', '")}')`)

                .then((resp) => {
                    if (resp.rowsAffected[0] > 0) {
                        res.send(resp.recordset.map(item => ({ "master_id": item.mast_id })))
                        // console.log(resp.recordset.map(item => ({ "master_id": item.mast_id })))
                    } else {
                        res.send(resp.rowsAffected)
                    }
                })
        })


    }
    catch (err) {
        res.send(err)
    }
}

const ImportCustomer = (req, res) => {
    const User_id = req.body.User_id;
    const datas = req.body.data;
    const org = req.body.org;
    // let duplicatedate = [];

    sql.connect(sqlConfig).then(() => {

        // sql.query(`select * from ${org}.dbo.tbl_new_customer where cust_email in ('${datas.map(data => data.cust_email)
        //     .join("', '")}') OR cust_work_phone in ('${datas.map(data => data.cust_work_phone)
        //         .join("', '")}') OR pan_no in ('${datas.map(data => data.pan_no).join("', '")}')`)

        // .then((resp) => {
        // if (resp.rowsAffected[0] > 0)
        //     res.send(resp.recordset.map(item => ({ "cust_email": item.cust_email, "cust_work_phone": item.cust_work_phone, "pan_no": item.pan_no, })))
        // else {

        const result = sql.query(`INSERT INTO  ${org}.dbo.tbl_new_customer(mast_id,cust_id,cust_type,cust_name,
                            company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department ,website,gst_treatment
                            ,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency, opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
                            billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
                            contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                             contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address,newcust_uuid)

                             VALUES ${datas.map(item => `('${item.mast_id}','${item.cust_id}','${item.cust_type}','${item.cust_name}','${item.company_name}','${item.cust_display_name}','${item.cust_email}','${item.cust_work_phone}','${item.cust_phone}','${item.skype_detail}','${item.designation}',
                             '${item.department}','${item.website}','${item.gst_treatment}','${item.gstin_uin}','${item.pan_no}','${item.place_of_supply}','${item.tax_preference}','${item.exemption_reason}','${item.currency}','${item.opening_balance}','${item.payment_terms}','${item.enable_portal}','${item.portal_language}',
                                      '${item.facebook_url}','${item.twitter_url}','${item.billing_address_attention}','${item.billing_address_country}','${item.billing_address_city}','${item.billing_address_state}','${item.billing_address_pincode}','${item.billing_address_phone}','${item.billing_address_fax}','${item.contact_person_name}',
                                      '${item.contact_person_email}','${item.contact_person_work_phone}','${item.contact_person_phone}','${item.contact_person_skype}','${item.contact_person_designation}',
                                      '${item.contact_person_department}','${item.remark}','Active',getdate(),'${User_id}','${os.hostname()}','${req.ip}','${uuidv1()}')`).join(', ')}`)
        res.send("Data Added")



    })
}

// const Idcountmaster = async (req, res) => {
//     const org = req.body.org;
//     const masterid = req.body.masterid;
//     // console.log(masterid)
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`select id_count from ${org}.dbo.tbl_id_controller where master_id='${masterid}';`)
//         res.send(result.recordset)
//     }
//     catch (err) {
//         res.send(err)
//     }
// }
// const InsertIdcountmaster = async (req, res) => {
//     const org = req.body.org;
//     const id_type = req.body.id_type;
//     const masterid = req.body.masterid;
//     const id_count = req.body.id_count;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`insert into ${org}.dbo.tbl_id_controller(id_type ,master_id ,id_count)
//         values ('${id_type}','${masterid}','${id_count}')`)
//         res.send(result.recordset)
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

// const UpdateIdcountmaster = async (req, res) => {
//     const org = req.body.org;
//     const masterid = req.body.masterid;
//     const id_count = req.body.id_count;
//     try {
//         await sql.connect(sqlConfig)
//         const result = await sql.query(`update ${org}.dbo.tbl_id_controller 
//         set id_count='${id_count}' WHERE master_id='${masterid}';`)
//         res.send(result.rowsAffected)
//     }
//     catch (err) {
//         res.send(err)
//     }
// }

const ActiveCustomer = async (req, res) => {
    const org = req.body.org
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT cust_name,cust_id  from ${org}.dbo.tbl_new_customer tnc where status='Active'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }


}


const SelectedCustomer = async (req, res) => {
    const org = req.body.org
    const cust_id = req.body.cust_id
    console.log(org,cust_id)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_new_customer where cust_id='${cust_id}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}


module.exports = { AllCustomer, DeleteCustomer, AddCustomer, Customer, UpdateCustomer, Customer_id, Unique_Cust_id, Lastcust_id, Checkmidvalid, ImportCustomer, Customername, CustomerMastid, CustomerIdMid, 
    // Idcountmaster, InsertIdcountmaster, UpdateIdcountmaster, 
    ActiveCustomer, SelectedCustomer }