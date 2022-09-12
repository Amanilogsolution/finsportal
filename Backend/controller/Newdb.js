const sql = require('mssql');
const sqlConfig = require('../config.js');
const os = require('os')


const Newdb = async (req, res) => {
    const dbname = req.body.dbname;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`CREATE DATABASE ${dbname}`)
        if (result) {
            const result = await sql.query(`

                CREATE TABLE ${dbname}.dbo.tbl_bankmaster 
                (sno bigint IDENTITY(1,1) NOT NULL,
                account_code nvarchar(50) NULL, 
                bank_name nvarchar(50) NULL,
                account_no nvarchar(50) NULL,
                address_line1 nvarchar(255) NULL,
                address_line2 nvarchar(255) NULL,
                branch nvarchar(50) NULL,
                country nvarchar(100) NULL
                state nvarchar(50) NULL,
                city nvarchar(30) NULL,
                pincode bigint NULL,
                ifsc_code nvarchar(30) NULL,
                status nvarchar(30) NULL,
                ac_type nvarchar(50) NULL,
                acname nvarchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL, 
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                description varchar(255) NULL,
                bank_uuid varchar(100) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_currency (
                sno bigint IDENTITY(1,1) NOT NULL,
                country_code  varchar(100) NULL,
                country_name varchar(100) NULL,
                currency_name varchar(100) NULL,
                currency_code varchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL,
                currency_uuid varchar(100) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_fin_year (
                sno bigint IDENTITY(1,1) NOT NULL,
                fin_year  varchar(50) NULL,
                year varchar(20) NULL,
                from_date varchar(20) NULL,
                to_date varchar(20) NULL,
                mcust_count varchar(100) NULL,
                cust_count varchar(100) NULL,
                mvend_count varchar(100) NULL,
                vend_count varchar(100) NULL,
                invoice_ser varchar(100) NULL,
                invoice_count varchar(100) NULL,
                voucher_ser varchar(100) NULL,
                voucher_count varchar(100) NULL,
                location_count varchar(100) NULL,
                add_user_name varchar(50) NULL,
                add_date_time datetime NULL,
                add_ip_address varchar(50) NULL,
                add_system_name varchar(50) NULL,
                update_user_name varchar(50) NULL,
                update_date_time datetime NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_unit (
                sno bigint IDENTITY(1,1) NOT NULL,
                unit_symbol  varchar(100) NULL,
                unit_name varchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL,
                unit_uuid varchar(100) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_cust_addresses (
                sno bigint IDENTITY(1,1) NOT NULL,
                cust_id varchar(50) NULL,
                cust_name varchar(100) NULL,
                cust_addressid varchar(100) NULL,
                gst_no  varchar(30) NULL,
                billing_address_attention varchar(300) NULL,
                billing_address_country nvarchar(100) NULL,
                billing_address_city varchar(100) NULL,
                billing_address_state varchar(100) NULL,
                billing_address_pincode varchar(100) NULL,
                billing_address_phone varchar(100) NULL,
                billing_address_fax varchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                custaddress_uuid varchar(100) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_vend_addresses (
                sno bigint IDENTITY(1,1) NOT NULL,
                vend_id varchar(30) NULL,
                vend_name varchar(150) NULL,
                vend_addressid varchar(100) NULL,
                gst_no  varchar(30) NULL,
                billing_address_attention varchar(100) NULL,
                billing_address_country varchar(50) NULL,
                billing_address_city varchar(50) NULL,
                billing_address_state varchar(50) NULL,
                billing_address_pincode bigint NULL,
                billing_address_phone bigint NULL,
                billing_address_fax varchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                vendaddress_uuid varchar(100) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_new_vendor (
                sno bigint IDENTITY(1,1) NOT NULL,
                mast_id varchar(50) NULL,
                vend_id varchar(50) NULL,
                vend_name varchar(300) NULL,
                company_name varchar(300) NULL,
                vend_display_name varchar(100) NULL,
                vend_email varchar(100) NULL,
                vend_work_phone varchar(100) NULL,
                vend_phone varchar(100) NULL,
                skype_detail varchar(100) NULL,
                designation varchar(100) NULL,
                department varchar(100) NULL,
                website varchar(255) NULL,
                gst_treatment varchar(50) NULL,
                gstin_uin varchar(50) NULL,
                pan_no  varchar(50) NULL,
                source_of_supply varchar(100) NULL,
                currency varchar(100) NULL,
                opening_balance varchar(100) NULL,
                payment_terms varchar(100) NULL,
                tds varchar(50) NULL,
                enable_portal varchar(50) NULL,
                portal_language varchar(50) NULL,
                facebook_url varchar(255) NULL,
                twitter_url varchar(255) NULL,
                billing_address_attention varchar(300) NULL,
                billing_address_country varchar(50) NULL,
                billing_address_city varchar(100) NULL,
                billing_address_state varchar(50) NULL,
                billing_address_pincode varchar(30) NULL,
                billing_address_phone varchar(100) NULL,
                billing_address_fax varchar(50) NULL,	
                contact_person_name varchar(100) NULL,
                contact_person_email varchar(100) NULL,
                contact_person_work_phone varchar(100) NULL,
                contact_person_phone varchar(100) NULL,
                contact_person_skype varchar(100) NULL,
                contact_person_designation varchar(100) NULL,
                contact_person_department varchar(100) NULL,
                remark varchar(255) NULL,
                fins_year varchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                newvend_uuid varchar(100) NULL
                );

                CREATE TABLE ${dbname}.dbo.tbl_new_customer (
                sno bigint IDENTITY(1,1) NOT NULL,
                mast_id varchar(50) NULL,
                cust_id varchar(50) NULL,
                cust_type varchar(50) NULL,
                cust_name varchar(100) NULL,
                company_name varchar(100) NULL,
                cust_display_name varchar(100) NULL,
                cust_email varchar(100) NULL,
                cust_work_phone varchar(100) NULL,
                cust_phone varchar(100) NULL,
                skype_detail varchar(100) NULL,
                designation varchar(100) NULL,
                department varchar(100) NULL,
                website varchar(255) NULL,
                gst_treatment varchar(50) NULL,
                gstin_uin varchar(50) NULL,
                pan_no  varchar(50) NULL,
                place_of_supply varchar(80) NULL,
                tax_preference varchar(50) NULL,
                exemption_reason varchar(50) NULL,
                currency varchar(50) NULL,
                opening_balance varchar(50) NULL,
                payment_terms varchar(50) NULL,
                enable_portal varchar(50) NULL,
                portal_language varchar(50) NULL,
                facebook_url varchar(255) NULL,
                twitter_url varchar(255) NULL,
                billing_address_attention varchar(100) NULL,
                billing_address_country varchar(50) NULL,
                billing_address_city varchar(50) NULL,
                billing_address_state varchar(50) NULL,
                billing_address_pincode varchar(100) NULL,
                billing_address_phone varchar(100) NULL,
                billing_address_fax varchar(50) NULL,	
                contact_person_name varchar(100) NULL,
                contact_person_email varchar(100) NULL,
                contact_person_work_phone varchar(100) NULL,
                contact_person_phone varchar(100) NULL,
                contact_person_skype varchar(100) NULL,
                contact_person_designation varchar(100) NULL,
                contact_person_department varchar(100) NULL,
                remark varchar(255) NULL,
                fins_year varchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(50) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL,
                newcust_uuid varchar(100) NULL
                );
          

            CREATE TABLE ${dbname}.dbo.tbl_location_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                location_name varchar(100) NULL,
                gstin_no varchar(20) NULL, 
                location_id varchar(50) NULL,
                country varchar(100) NULL,
                state varchar(100) NULL,
                contact_name1 varchar(100) NULL,
                contact_name2 varchar(100) NULL,
                contact_phone_no1 varchar(100) NULL,
                contact_phone_no2 varchar(100) NULL,
                fins_year varchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(100) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(30) NULL,
                status varchar(20) NOT NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_location_address  (
                sno bigint IDENTITY(1,1) NOT NULL,
                location_id varchar(100) NULL,
                location_name varchar(50) NULL,
                gstin_no varchar(30) NULL,
                location_add1 varchar(250) NULL,
                location_add2 varchar(250) NULL,
                location_city varchar(100) NULL,
                location_state varchar(50) NULL,
                location_pin varchar(20) NULL,
                location_country varchar(50) NULL,
                from_date date NULL,
                to_date date NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL
                
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_compliance (
                sno bigint IDENTITY(1,1) NOT NULL,
                compliance_type nvarchar(150) NULL,
                nature nvarchar(200) NULL,
                period nvarchar(50) NULL,
                period_name nvarchar(10) NULL,
                from_month date NULL,
                to_month date NULL,
                from_applicable nvarchar(50) NULL,
                due_date date NULL,
                extended_date date NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(30) NULL,
                document_url varchar(300) NULL,
                document_status varchar(100) NULL,
                remark varchar(300) NULL
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_compliances_type (
                sno bigint IDENTITY(1,1) NOT NULL,
                compliance_type varchar(30) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(30) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(20) NULL
            );
            CREATE TABLE  ${dbname}.dbo.tbl_items_account (
                sno bigint IDENTITY(1,1) NOT NULL,
                item_type nvarchar(100) NULL,
                item_name nvarchar(100) NULL,
                item_unit nvarchar (30) NULL,
                sac_code nvarchar(30) NULL,
                hsn_code nvarchar(30) NULL,
                major_code_id nvarchar (30) NULL,
                major_code nvarchar (30) NULL,
                chart_of_account nvarchar (30) NULL,
                tax_preference  nvarchar (30) NULL,
                sales_account nvarchar(100) NULL,
                purchase_account nvarchar(100) NULL,
                gst_rate nvarchar (30) NULL,
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                item_uuid nvarchar(350) NULL
            );
         
            
            CREATE TABLE ${dbname}.dbo.tbl_account_type (
                sno bigint IDENTITY(1,1) NOT NULL,
                account_type varchar(50) NULL,
                account_type_code varchar(30) NULL,
                account_description varchar(300) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(30) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(10) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_account_name (
                sno bigint IDENTITY(1,1) NOT NULL,
                account_type_code varchar(30) NULL,
                account_name varchar(50) NULL,
                account_name_code varchar(30) NULL,
                account_description varchar(300) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(30) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(10) NULL
            );

            CREATE TABLE ${dbname}.dbo.tbl_sub_account(
                sno bigint IDENTITY(1,1) NOT NULL,
                account_type_code varchar(30) NULL,
                account_name_code varchar(30) NULL,
                account_sub_name varchar(50) NULL,
                account_sub_name_code varchar(30) NULL,
                account_description varchar(300) NULL,
                add_user_name varchar(30) NULL,
                add_system_name varchar(30) NULL,
                add_ip_address varchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(50) NULL,
                update_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                status varchar(10) NULL
            );
            
      
            
            CREATE TABLE ${dbname}.dbo.tbl_gl_sub (
                sno bigint IDENTITY(1,1) NOT NULL,
                charge_code varchar(200) NULL,
                sub_code varchar(200) NULL,
                gl_code varchar(200) NULL,
                company_id varchar(200) NULL,
                add_user_name varchar(100) NULL,
                add_system_name varchar(100) NULL,
                add_ip_address varchar(100) NULL,
                add_date_time datetime NULL,
                update_user_name varchar(100) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(100) NULL,
                update_date_time datetime NULL,
                status varchar(30) NULL
            );
            
            CREATE TABLE ${dbname}.dbo.tbl_daily_curreny (
                sno bigint IDENTITY(1,1) NOT NULL,
                currency varchar(100) NULL,
                Rupee varchar(100) NULL,
                US varchar(100) NULL,
                EURO varchar(100) NULL,  
                UK varchar(100) NULL, 
                AUS varchar(100) NULL, 
                Japanese varchar(100) NULL ,
                Singapore varchar(100) NULL ,
                Reminbi varchar(100) NULL ,
                Taiwan varchar(100) NULL ,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL
            );
            CREATE TABLE ${dbname}.dbo.tbl_location_series(
                sno bigint IDENTITY(1,1) NOT NULL,
                fin_year  varchar(100) NULL,
                series_type varchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name varchar(50) NULL,
                add_system_name varchar(50) NULL,
                add_ip_address varchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name varchar(50) NULL,
                update_system_name varchar(100) NULL,
                update_ip_address varchar(50) NULL,
                status varchar(50) NULL
            );
            
            
                   CREATE TABLE ${dbname}.dbo.tbl_crm_master(
                     sno bigint IDENTITY(1,1) NOT NULL,
                     user_name  varchar(100) NULL,
                     type varchar(30) NULL,
                     cust_vend varchar(100) NULL,
                     from_date date NULL,
                     to_date date NULL,
                     add_date_time datetime NULL,
                     add_user_name varchar(50) NULL,
                     add_system_name varchar(50) NULL,
                     add_ip_address varchar(30) NULL,
                     update_date_time datetime NULL,
                     update_user_name varchar(50) NULL,
                     update_system_name varchar(100) NULL,
                     update_ip_address varchar(50) NULL,
                     status varchar(50) NULL
                  );
            
                  CREATE TABLE ${dbname}.dbo.tbl_payment_term(
                    sno bigint IDENTITY(1,1) NOT NULL,
                    term nvarchar(100) NULL,
                    term_days nvarchar(50) NULL,
                    add_date_time datetime NULL,
                    add_user_name nvarchar(50) NULL,
                    add_system_name nvarchar(50) NULL,
                    add_ip_address nvarchar(30) NULL,
                    update_date_time datetime NULL,
                    update_user_name nvarchar(50) NULL,
                    update_system_name nvarchar(100) NULL,
                    update_ip_address nvarchar(50) NULL,
                    status nvarchar(50) NULL
                 );
            
            
            
            CREATE TABLE ${dbname}.dbo.tbl_charge_code(
                sno bigint IDENTITY(1,1) NOT NULL,
                description nvarchar(100) NULL,
                short_name nvarchar(50) NULL,
                nature nvarchar(50) NULL,
                major_code nvarchar(50) NULL,
                major_code_id nvarchar(100) NULL,
                chartof_account nvarchar(100) NULL,
                activity nvarchar(50) NULL,
                sacHsn nvarchar(50) NULL,
                gst_rate nvarchar(50) NULL,
                add_date_time datetime NULL,
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(50) NULL,
                add_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name nvarchar(50) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(50) NULL,
                status nvarchar(50) NULL
              );
            
              CREATE TABLE ${dbname}.dbo.tbl_invoice(
                sno bigint IDENTITY(1,1) NOT NULL,
                fin_year nvarchar(50) NULL,
                invoice_no nvarchar(100) NULL,
                squence_no nvarchar(100) NULL,
                invoice_date date NULL,
                order_no  nvarchar(100) NULL,
                invoice_amt nvarchar(100) NULL,
                doe datetime  NULL,
                user_id nvarchar(100) NULL,
                periodfrom date NULL,
                periodto date NULL,
                major nvarchar(100) NULL,
                location nvarchar(100) NULL,
                custid nvarchar(100) NULL,
                billsubtotal nvarchar(100) NULL,
                total_tax nvarchar(100) NULL,
                cust_locationid nvarchar(100) NULL,
                remark nvarchar(300) NULL,
                flagsave nvarchar(30) NULL,
                location_name nvarchar(100) NULL,
                consignee nvarchar(100) NULL,
                insubmitedate nvarchar(100) NULL,
                cnflag nvarchar(100) NULL,
                cnamount nvarchar(100) NULL,
                cust_family nvarchar(50) NULL,
                cgst_amt nvarchar(100) NULL,
                sgst_amt nvarchar(100) NULL,
                utgst_amt nvarchar(100) NULL,
                igst_amt nvarchar(100) NULL,
                taxable_amt nvarchar(100) NULL,
                con_add nvarchar(100) NULL,
                currency_type nvarchar(100) NULL,
                payment_term nvarchar(100) NULL,
                due_date date NULL, 
                add_date_time datetime NULL,
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(50) NULL,
                add_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name nvarchar(50) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(50) NULL,
                status nvarchar(50) NULL
            );
            CREATE TABLE ${dbname}.dbo.tbl_subinvoice(
                sno bigint IDENTITY(1,1) NOT NULL,
                fin_year nvarchar(50) NULL,
                invoice_no nvarchar(100) NULL,
                major nvarchar(100) NULL,
                minor nvarchar(100) NULL,
                revgl_code nvarchar(100) NULL,
                billing_code nvarchar(100) NULL,
                quantity  nvarchar(100) NULL,
                rate  nvarchar(100) NULL,
                unit nvarchar(100) NULL,
                amount  nvarchar(100) NULL,
                consignee nvarchar(100) NULL,
                city nvarchar(100) NULL,
                custid nvarchar(100) NULL,
                cust_locationid nvarchar(100) NULL,
                taxable nvarchar(100) NULL,
                consignor nvarchar(100) NULL,
                cnamount nvarchar(100) NULL,
                cgst_rate nvarchar(100) NULL,
                sgst_rate nvarchar(100) NULL,
                utgst_rate nvarchar(100) NULL,
                igst_rate nvarchar(100) NULL,
                cgst_amt nvarchar(100) NULL,
                sgst_amt nvarchar(100) NULL,
                utgst_amt nvarchar(100) NULL,
                igst_amt nvarchar(100) NULL,
                add_date_time datetime NULL,
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(50) NULL,
                add_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                update_user_name nvarchar(50) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(50) NULL,
                status nvarchar(50) NULL
            );

            CREATE TABLE  ${dbname}.dbo.tbl_emp (
                sno bigint IDENTITY(1,1) NOT NULL,
                emp_name nvarchar(100) NULL,
                wh nvarchar (30) NULL,
                emp_id nvarchar(30) NULL,
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                emp_uuid nvarchar(350) NULL
               );          
                
            
            `)
            res.send('created')
        }
        else {
            res.send('Server Error')
        }


    }
    catch (err) {
        res.send(err)
    }
}


module.exports = { Newdb }





// CREATE TABLE  ${dbname}.dbo.tbl_items_account (
//     sno bigint IDENTITY(1,1) NOT NULL,
//     item_type varchar(100) NULL,
//     item_name varchar(100) NULL,
//     item_unit varchar(30) NULL,
//     item_selling_price float NULL,
//     sales_account varchar(100) NULL,
//     sales_description varchar(300) NULL,
//     item_cost_price float NULL,
//     purchase_account varchar(100) NULL,
//     purchases_description varchar(300) NULL,
//     add_user_name varchar(50) NULL,
//     add_system_name varchar(100) NULL,
//     add_ip_address varchar(30) NULL,
//     add_date_time datetime NULL,
//     update_user_name varchar(30) NULL,
//     update_system_name varchar(100) NULL,
//     update_ip_address varchar(30) NULL,
//     update_date_time datetime NULL,
//     status varchar(30) NULL
// );

// CREATE TABLE ${dbname}.dbo.tbl_account_info (
//     sno bigint IDENTITY(1,1) NOT NULL,
//     account_info_name varchar(100) NULL,
//     account_info_type varchar(50) NULL,
//     add_user_name varchar(30) NULL,
//     add_system_name varchar(50) NULL,
//     add_ip_address varchar(30) NULL,
//     add_date_time datetime NULL,
//     update_user_name varchar(50) NULL,
//     update_system_name varchar(50) NULL,
//     update_ip_address varchar(30) NULL,
//     update_date_time datetime NULL,
//     status varchar(20) NULL
// );