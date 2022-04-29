const sql =require('mssql')
const sqlConfig = require('../config.js')
const os = require('os')
const { request } = require('http')
const uuidv1 = require("uuid/v1");


const AllCustomer = async (req, res) => {
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from tbl_new_customer order by sno desc`)
        res.send(result.recordset)
    }
    catch(err){
        console.log(err)
        }
    }

    const AddCustomer = async (req, res) => {
        
        const getnewval = req.body.getnewval;
        const dateval = req.body.dateval;
        const finyear = req.body.finyear;
        const trimyear = req.body.trimyear;
        const year1= req.body.year1;
        const year2 = req.body.year2;
        const mast_id = req.body.mast_id;
        const cust_id = req.body.cust_id;
        const cust_type = req.body.cust_type;
        const cust_name = req.body.cust_name;
        const company_name = req.body.company_name;
        const cust_display_name = req.body.cust_display_name;
        const cust_email = req.body.cust_email;
        const cust_work_phone = req.body.cust_work_phone?req.body.cust_work_phone:null;
        const cust_phone = req.body.cust_phone?req.body.cust_phone:null;
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
        const billing_address_pincode = req.body.billing_address_pincode?req.body.billing_address_pincode:null;
        const billing_address_phone = req.body.billing_address_phone?req.body.billing_address_phone:'';
        const billing_address_fax = req.body.billing_address_fax;
        const contact_person_name = req.body.contact_person_name;
        const contact_person_email = req.body.contact_person_email;
        const contact_person_work_phone = req.body.contact_person_work_phone?req.body.contact_person_work_phone:null;
        const contact_person_phone = req.body.contact_person_phone?req.body.contact_person_phone:null;
        const contact_person_skype = req.body.contact_person_skype;
        const contact_person_designation = req.body.contact_person_designation;
        const contact_person_department = req.body.contact_person_department;
        const remark = req.body.remark;
        const uuid = uuidv1()
        console.log(billing_address_phone)
        // console.log(mast_id,cust_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
        //     opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
        //     billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
        //     contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        //     contact_person_department,remark)
        //     console.log(gst_treatment)
        //     console.log(place_of_supply)
        console.log(cust_id,getnewval,dateval,trimyear,finyear,year1,year2)
        console.log(cust_work_phone,cust_phone,billing_address_pincode,contact_person_work_phone,contact_person_phone)
        try{
            if(dateval=='true')
            {
            //  await sql.connect(sqlConfig)
            // const result2 = await sql.query(`INSERT into tbl_fin_year(fin_year,year,from_date,to_date,mc_totalid,cust_totalid)
            // Values('${finyear}','${trimyear}','${year2}','${year1}','0','${getnewval}')`)
            //   res.send('Fins row Added')

               await sql.connect(sqlConfig)
            const result = await sql.query(`INSERT into tbl_new_customer(mast_id,cust_id,cust_type,cust_name,
                company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,
                website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
                opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
                billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
                contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                contact_person_department,remark,newcust_uuid,status,add_date_time,add_user_name,add_system_name,add_ip_address)
                Values('${mast_id}','${cust_id}','${cust_type}','${cust_name}','${company_name}','${cust_display_name}','${cust_email}',${cust_work_phone},${cust_phone},'${skype_detail}','${designation}',
                      '${department}','${website}','${gst_treatment}','${gstin_uin}','${pan_no}','${place_of_supply}','${tax_preference}','${exemption_reason}','${currency}','${opening_balance}','${payment_terms}','${enable_portal}','${portal_language}',
                      '${facebook_url}','${twitter_url}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}',${billing_address_pincode},'${billing_address_phone}','${billing_address_fax}','${contact_person_name}',
                      '${contact_person_email}',${contact_person_work_phone},${contact_person_phone},'${contact_person_skype}','${contact_person_designation}','${contact_person_department}','${remark}','${uuid}','Active',getdate(),'Aman','${os.hostname()}',
                        '${req.ip}');`) 
                        const result2 = await sql.query(`INSERT into tbl_fin_year(fin_year,year,from_date,to_date,mc_totalid,cust_totalid)
                        Values('${finyear}','${trimyear}','${year2}','${year1}','0','${getnewval}')`)
            res.send('Added')

            }
            else
            {
             const result = await sql.query(`INSERT into tbl_new_customer(mast_id,cust_id,cust_type,cust_name,
                company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,
                website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
                opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
                billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
                contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address)
                Values('${mast_id}','${cust_id}','${cust_type}','${cust_name}','${company_name}','${cust_display_name}','${cust_email}',${cust_work_phone},${cust_phone},'${skype_detail}','${designation}',
                      '${department}','${website}','${gst_treatment}','${gstin_uin}','${pan_no}','${place_of_supply}','${tax_preference}','${exemption_reason}','${currency}','${opening_balance}','${payment_terms}','${enable_portal}','${portal_language}',
                      '${facebook_url}','${twitter_url}','${billing_address_attention}','${billing_address_country}','${billing_address_city}','${billing_address_state}',${billing_address_pincode},'${billing_address_phone}','${billing_address_fax}','${contact_person_name}',
                      '${contact_person_email}',${contact_person_work_phone},${contact_person_phone},'${contact_person_skype}','${contact_person_designation}','${contact_person_department}','${remark}','Active',getdate(),'Aman','${os.hostname()}',
                        '${req.ip}');`)
            const result2 = await sql.query(`update tbl_fin_year set cust_totalid='${getnewval}' where sno=(SELECT MAX(sno) FROM tbl_fin_year)`)
            res.send('Updated')
            
            res.send('Added')

            // await sql.connect(sqlConfig)
            
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const DeleteCustomer = async (req, res) => {
        const sno = req.body.sno;
        const status = req.body.status;
        console.log(sno, status)
        try {
            await sql.connect(sqlConfig)
            const result = await sql.query(`update tbl_new_customer set status='${status}' where sno = ${sno}`)
            res.send('done')
        }
        catch (err) {
            console.log(err)
        }
    }

        const Customer = async (req, res) => {
             const sno = req.body.sno;
                console.log(sno)
                try {
                    await sql.connect(sqlConfig)
                    const result = await sql.query(`select * from tbl_new_customer where sno = ${sno}`)
                    res.send(result.recordset[0])
                }
                catch (err) {
                    console.log(err)
                }

    }

    const UpdateCustomer = async (req, res) => {
        const sno = req.body.sno;
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
        console.log(sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                    contact_person_department,remark)
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(` UPDATE tbl_new_customer SET cust_email='${cust_email}',cust_work_phone=${cust_work_phone},cust_phone=${cust_phone},
            contact_person_name='${contact_person_name}',contact_person_email='${contact_person_email}',contact_person_work_phone=${contact_person_work_phone},
            contact_person_phone=${contact_person_phone},contact_person_skype='${contact_person_skype}',contact_person_designation='${contact_person_designation}',
            contact_person_department='${contact_person_department}',remark='${remark}',update_date_time=getdate(),update_user_name='Aman',
            update_system_name='${os.hostname()}',update_ip_address='${req.ip}'
         WHERE sno=${sno}`)
            res.send('Updated')
        }catch(err){
            console.log(err)
        }
    }

    const Customer_id = async (req, res) => {
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`SELECT cust_id FROM tbl_new_customer tnc `)
            res.send(result.recordset)
        }
        catch(err){
            console.log(err)
        }
    }

    const Unique_Cust_id = async (req,res) => {
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`SELECT cust_totalid,year FROM tbl_fin_year  WHERE sno=(SELECT MAX(sno) FROM tbl_fin_year)`)
            res.send(result.recordset[0])
           
        }
        catch(err){
            console.log(err)
        }
    }
    
    const Lastcust_id = async (req,res) => {
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`SELECT cust_id FROM tbl_new_customer  WHERE sno=(SELECT MAX(sno) FROM tbl_new_customer)`)
            
            res.send(result.recordset[0])
            
        }
        catch(err){
            console.log(err)
        }
    }

    const ImportCustomer = async(req,res) =>{
        const datas = req.body.data;
     
        console.log(datas)
        try{
            datas.forEach(async(item) => {
            await sql.connect(sqlConfig)
            var result = await sql.query(`INSERT into tbl_new_customer(mast_id,cust_id,cust_type,cust_name,
                company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,
                website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
                opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
                billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
                contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
                contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address)
                Values('${item.mast_id}','${item.cust_id}','${item.cust_type}','${item.cust_name}','${item.company_name}','${item.cust_display_name}','${item.cust_email}',${item.cust_work_phone},${item.cust_phone},'${item.skype_detail}','${item.designation}',
                      '${item.department}','${item.website}','${item.gst_treatment}','${item.gstin_uin}','${item.pan_no}','${item.place_of_supply}','${item.tax_preference}','${item.exemption_reason}','${item.currency}','${item.opening_balance}','${item.payment_terms}','${item.enable_portal}','${item.portal_language}',
                      '${item.facebook_url}','${item.twitter_url}','${item.billing_address_attention}','${item.billing_address_country}','${item.billing_address_city}','${item.billing_address_state}',${item.billing_address_pincode},'${item.billing_address_phone}','${item.billing_address_fax}','${item.contact_person_name}',
                      '${item.contact_person_email}',${item.contact_person_work_phone},${item.contact_person_phone},'${item.contact_person_skype}','${item.contact_person_designation}','${item.contact_person_department}','${item.remark}','Active',getdate(),'Aman','${os.hostname()}',
                        '${req.ip}');`)     
            }
            )
            res.send("data Imported")
        }
        catch (err){
            console.log(err)
        }
    }


    module.exports={AllCustomer,DeleteCustomer,AddCustomer,Customer,UpdateCustomer,Customer_id,Unique_Cust_id,Lastcust_id,ImportCustomer}