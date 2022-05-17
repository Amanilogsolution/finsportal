import axios from 'axios';

export const Newdb = async (dbname) => {
    const url = `http://localhost:3008/api/newdb`
    return axios.get(url,{dbname}).then(response => response.data).catch(error => console.log(error));
}


export const register = async (org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin) => {
    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin)
    const url = `http://192.168.146.103:3008/org`
    return axios.post(url, {org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin}).then(response => response.data).catch(error => console.log(error));
}

export const createSchema = async (org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin) => {
    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin)
    const url = `http://192.168.146.103:3008/org`
    return axios.post(url, {org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin}).then(response => response.data).catch(error => console.log(error));
}

export const addstates = async (state_name, country_name, state_code, state_short_name, select_type) => {
    const url = `http://localhost:3008/api/state`
    return axios.post(url, {state_name, country_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}
export const getstates = async () => {
    const url = `http://192.168.146.103:3008/api/totalstate`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deletestate = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletestate`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showstate = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showstate`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateState = async (sno, country_name,state_name, state_code, state_short_name, select_type) => {
    console.log(sno,country_name,state_name,state_code,state_short_name,select_type)
    const url = `http://192.168.146.103:3008/api/editstate`
    return axios.post(url, {sno,country_name, state_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}
export const showstateCity = async (country) => {
    console.log(country)
    const url = `http://192.168.146.103:3008/api/showstatecity`
    return axios.post(url, {country}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcountry = async (org) => {
    console.log(org)
    const url = `http://localhost:3008/api/totalcountry`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const InsertCountry = async (country_name, country_id, country_code, country_phonecode) => {
    const url = `http://localhost:3008/api/insertcountry`
    return axios.post(url, {country_name, country_id, country_code, country_phonecode}).then(response => response.data).catch(error => console.log(error));
}

export const showcountry = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcountry`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updatecountry = async (sno, country_name, country_id, country_code, country_phonecode) => {
    const url = `http://192.168.146.103:3008/api/updatecountry`
    return axios.post(url, {sno, country_name, country_id, country_code, country_phonecode}).then(response => response.data).catch(error => console.log(error));
}
export const deletecountry = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletecountry`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const currency = async (org) => {
    const url = `http://localhost:3008/api/currency`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const InsertCurrency = async (country_name, country_code, currency_name, currency_code ) => {
    const url = `http://localhost:3008/api/insertcurrecy`
    return axios.post(url, {country_name, country_code, currency_name, currency_code}).then(response => response.data).catch(error => console.log(error));
}

export const deleteCurrency = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletecurrency`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateCurrency = async (sno, country_name, country_code, currency_name, currency_code ) => {
    const url = `http://192.168.146.103:3008/api/updatecurrency`
    return axios.post(url, {sno, country_name, country_code, currency_name, currency_code}).then(response => response.data).catch(error => console.log(error));
}

export const showCurrency = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcurrency`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcity = async () => {
    const url = `http://192.168.146.103:3008/api/totalcity`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCity = async (city_id, city_name,  state_name, country_name) => {
    console.log(city_id, city_name,  state_name, country_name)
    const url = `http://localhost:3008/api/insertcity`
    return axios.post(url, {city_id, city_name, state_name, country_name}).then(response => response.data).catch(error => console.log(error));
}

export const deleteCity = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletecity`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const showCity = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcity`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateCity = async (sno, city_id, city_name, state_name,country_name) => {
    const url = `http://192.168.146.103:3008/api/updatecity`
    return axios.post(url, {sno, city_id, city_name, state_name,country_name}).then(response => response.data).catch(error => console.log(error));
}
export const getCity = async (state_name) => {
    const url = `http://192.168.146.103:3008/api/getcity`
    return axios.post(url, {state_name}).then(response => response.data).catch(error => console.log(error));
}


export const TotalUnit = async (Token,org) => {
    const url = `http://localhost:3008/api/totalunit`
    return axios.post(url,{org},{ headers: {"Authorization" : Token} }).then(response => response.data).catch(error => console.log(error));
}

export const Unit = async (unit_name,unit_symbol) => {
    const url = `http://localhost:3008/api/unit`
    return axios.post(url, {unit_name, unit_symbol}).then(response => response.data).catch(error => console.log(error));
}

export const showunit = async (sno,Token) => {
    console.log('Api',Token)
    const url = `http://localhost:3008/api/showunit`
    return axios.post(url, {sno},{ headers: {"Authorization" : Token} }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUnit = async (sno, unit_name, unit_symbol) => {
    const url = `http://192.168.146.103:3008/api/updateunit`
    return axios.post(url, {sno, unit_name, unit_symbol}).then(response => response.data).catch(error => console.log(error));
}

export const deleteUnit = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteunit`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}


export const insertBank = async (account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description) => {
    console.log(account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description)
    const url = `http://localhost:3008/api/addbank`
    return axios.post(url, {account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description}).then(response => response.data).catch(error => console.log(error));
}
export const totalBank = async (org) => {
    console.log('API',org)
    const url = `http://localhost:3008/api/totalbank`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const deleteBank = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletebank`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showBank = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showbank`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}
export const updateBank = async (sno,account_code,account_no,type,bank_name,address_line1,address_line2,state,city,pincode,ifsc_code,acname,description) => {
    const url = `http://192.168.146.103:3008/api/updatebank`
    return axios.post(url, {sno,account_code,account_no,type,bank_name,address_line1,address_line2,state,city,pincode,ifsc_code,acname,description}).then(response => response.data).catch(error => console.log(error));
}


export const TotalUser = async () => {
    const url = `http://192.168.146.103:3008/api/totaluser`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


export const User = async (employee_name, role,warehouse,username,password,
    email_id,phone,operatemode,customer,reporting_to,designation,two_factor_authentication,user_profile_url) => {
      
    const url = `http://localhost:3008/api/insertuser`
return axios.post(url, {employee_name, role,warehouse,username,password,email_id,phone,
    operatemode,customer,reporting_to,designation,two_factor_authentication,user_profile_url}).then(response => response.data).catch(error => console.log(error));
}

export const showuser = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showuser`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUser = async (sno, employee_name, role,warehouse,user_name,password,
    email_id,phone,operate_mode,customer,reporting_to,designation,two_factor_authentication) => {
    const url = `http://192.168.146.103:3008/api/updateuser`
    return axios.post(url, {sno, employee_name, role,warehouse,user_name,password,email_id,phone,
        operate_mode,customer,reporting_to,designation,two_factor_authentication}).then(response => response.data).catch(error => console.log(error));
}

export const deleteUser = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteuser`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}


export const TotalCustomers = async () => {
    const url = `http://192.168.146.103:3008/api/totalcustomer`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const DeleteCustomer = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletecustomer`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const AddCustomer = async (getnewval,dateval,finyear,trimyear,year1,year2,mast_id,cust_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
    opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
    billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
    contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
        console.log(getnewval,dateval,finyear,trimyear,year1,year2,mast_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
            opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
            billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
            contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
            contact_person_department,remark)
    const url = `http://localhost:3008/api/addcustomer`
    return axios.post(url, {getnewval,dateval,finyear,trimyear,year1,year2,mast_id,cust_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
        opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustomer = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcustomer`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCustomer = async (sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
        console.log(sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
            contact_person_department,remark)
    const url = `http://192.168.146.103:3008/api/updatecustomer`
    return axios.post(url, {sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}
export const CustomerId = async () => {
    const url = `http://localhost:3008/api/customerid`
    // console.log(url)
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertVendor = async (mast_id,vend_id,vend_name,
    company_name,vend_display_name,vend_email,vend_work_phone,vend_phone,skype_detail,designation,department,
    website,gst_treatment,gstin_uin,pan_no,source_of_supply,currency,
    opening_balance,payment_terms,tds,enable_portal,portal_language,facebook_url,twitter_url,
    billing_address_attention,billing_address_country,
    billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,
    billing_address_fax,contact_person_name,
    contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address) => {
         
    const url = `http://192.168.146.103:3008/api/insertvendor`
    return axios.post(url, {mast_id,vend_id,vend_name,
        company_name,vend_display_name,vend_email,vend_work_phone,vend_phone,skype_detail,designation,department,
        website,gst_treatment,gstin_uin,pan_no,source_of_supply,currency,
        opening_balance,payment_terms,tds,enable_portal,portal_language,facebook_url,twitter_url,
        billing_address_attention,billing_address_country,
        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,
        billing_address_fax,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark,status,add_date_time,add_user_name,add_system_name,add_ip_address}).then(response => response.data).catch(error => console.log(error));
}

export const ShowVendor = async () => {
    const url = `http://192.168.146.103:3008/api/showvendor`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


export const DeleteVendor = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deletevendor`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const Unique_Cust_id = async () => {
    const url = `http://localhost:3008/api/unique_cust_id`
    return axios.post(url).then(response => response.data).catch(error => console.log(error));
}
export const Lastcust_id = async () => {
    const url = `http://localhost:3008/api/lastcust_id`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));

}

export const showvendor = async (sno) => {
    const url = `http://192.168.146.103:3008/api/vendor`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateVendor = async (sno,vend_email,vend_work_phone,vend_phone,contact_person_name,
    contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
    const url = `http://192.168.146.103:3008/api/updatevendor`
    return axios.post(url, {sno,vend_email,vend_work_phone,vend_phone,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}
export const VendorId = async () => {
    const url = `http://localhost:3008/api/vendorid`
    console.log(url)
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const CustInsertAddress = async (cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
        const url = 'http://localhost:3008/api/insertcustaddress'
        return axios.post(url, {cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
    }
    export const VendInsertAddress = async (vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
        console.log(vend_id)
        const url = 'http://localhost:3008/api/insertvendaddress'
        return axios.post(url, {vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
    }

export const ShowCustAddress = async (cust_id) => {
    console.log(cust_id)
    const url = 'http://localhost:3008/api/showcustaddress'
    return axios.post(url,{cust_id}).then(response => response.data).catch(error => console.log(error));
}

export const ShowVendAddress = async (vend_id) => {
    console.log(vend_id)
    const url = 'http://localhost:3008/api/showvendaddress'
    return axios.post(url,{vend_id}).then(response => response.data).catch(error => console.log(error));
}
export const DeleteCustAddress = async (sno,status) => {
    const url = 'http://localhost:3008/api/deletecustaddress'
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const SelectCustAddress = async (cust_name) =>{
    console.log(cust_name)
    const url = 'http://localhost:3008/api/SelectCustAddress'
    return axios.post(url, {cust_name}).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendAddress = async (sno,status) => {
    const url = 'http://localhost:3008/api/deletevendaddress'
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const CustAddress = async (sno) => {
    const url = 'http://localhost:3008/api/custaddress'
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const EditCustAddress = async (sno,cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
    const url = 'http://localhost:3008/api/updatecustaddress'
    return axios.post(url, {sno,cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
}

export const VendAddress = async (sno) => {
    const url = 'http://localhost:3008/api/vendoraddress'
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const EditVendAddress = async (sno,vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
    const url = 'http://localhost:3008/api/updatevendaddress'
    return axios.post(url, {sno,vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
}


export const UserLogin = async(user_id,user_password) => {
    console.log(user_id,user_password)
    const url = 'http://localhost:3008/api/userlogin'
    return axios.post(url, {user_id,user_password}).then(response => response.data).catch(error => console.log(error));
}
export const showUserLogin = async(user_id) => {
    console.log(user_id)
    const url = 'http://localhost:3008/api/ShowUserLogin'
    return axios.post(url, {user_id}).then(response => response.data).catch(error => console.log(error));
}

export const UserLogout = async(user_id) => {
    console.log(user_id)
    const url = 'http://localhost:3008/api/userlogout'
    return axios.post(url, {user_id}).then(response => response.data).catch(error => console.log(error));
}

export const insertUserLogin = async(user_id,user_name,location,comp_name,user_password,org_db_name,user_profile_url) => {
    console.log(user_id,user_name,location,comp_name,user_password,org_db_name)
    const url = 'http://localhost:3008/api/InsertUserLogin'
    return axios.post(url, {user_id,user_name,location,comp_name,user_password,org_db_name,user_profile_url}).then(response => response.data).catch(error => console.log(error));
}

export const ImportCurrency = async (data) => {
    // console.log('Api',{data})
    const url = `http://localhost:3008/api/ImportCurrency`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}
export const ImportCustomer = async (data) => {
    console.log('Api',{data})
    const url = `http://localhost:3008/api/ImportCustomer`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}
export const ImportVendor = async (data) => {
    console.log('Api',{data})
    const url = `http://localhost:3008/api/importvendor`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}
export const ImportState = async (data) => {
    console.log('Api',{data})
    const url = `http://localhost:3008/api/importState`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}

export const ImportCity = async (data) => {
    console.log('Api',{data})
    const url = `http://localhost:3008/api/importcity`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}

export const ImportUnit = async (data,org) => {
    // console.log('Api',{data})
    console.log('ORG',org)
    const url = `http://localhost:3008/api/importunit`
    return axios.post(url, {data,org}).then(response => response.data).catch(error => console.log(error));
}

export const ImportBank = async (data,org) => {
    // console.log('Api',{data})
    const url = `http://localhost:3008/api/importbank`
    return axios.post(url, {data,org}).then(response => response.data).catch(error => console.log(error));
}
export const ImportUser = async (data,org,org_name) => {
    // console.log('Api',{data})
    console.log('ORG',org)
    const url = `http://localhost:3008/api/importuser`
    return axios.post(url, {data,org,org_name}).then(response => response.data).catch(error => console.log(error));
}
export const CheckimportCountry = async (data) => {
    const url = `http://localhost:3008/api/checkimportcountry`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}

export const CreatenewDb = async (dbname) => {
    console.log(dbname)
    const url = `http://localhost:3008/api/newdb`
    return axios.post(url, {dbname}).then(response => response.data).catch(error => console.log(error));
}

export const CreateOrgTable = async (dbname) => {
    console.log(dbname)
    const url = `http://localhost:3008/api/Org_table`
    return axios.post(url, {dbname}).then(response => response.data).catch(error => console.log(error));
}
export const TotalOrganistion = async () => {
    const url = `http://localhost:3008/api/TotalOrganistion`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const showOrganisation = async (org_name) => {
    const url = `http://localhost:3008/api/ShowOrganisation`
    return axios.post(url,{org_name}).then(response => response.data).catch(error => console.log(error));
}

export const updateOrganisation = async (org_name,org_contact_name,org_contact_phone,org_contact_email,org_street,org_city,org_pincode,org_gst) => {
    const url = `http://localhost:3008/api/UpdateOrganisation`
    return axios.post(url,{org_name,org_contact_name,org_contact_phone,org_contact_email,org_street,org_city,org_pincode,org_gst}).then(response => response.data).catch(error => console.log(error));
}

export const totalLocation = async (org) => {
    const url = `http://localhost:3008/api/TotalLocation`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const addLocation = async (org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2) => {
    console.log('api',org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2)
    const url = `http://localhost:3008/api/AddLocation`
    return axios.post(url,{org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2}).then(response => response.data).catch(error => console.log(error));
}

export const updateLocation = async (org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2,location_id) => {
    console.log('api',org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2,location_id)
    const url = `http://localhost:3008/api/UpdateLocation`
    return axios.post(url,{org,location_name,gstin_no,contact_name1,contact_name2,contact_phone_no1,contact_phone_no2,location_id}).then(response => response.data).catch(error => console.log(error));
}
export const showLocation = async (org,location_id) => {
    console.log('api',org,location_id)
    const url = `http://localhost:3008/api/ShowLocation`
    return axios.post(url,{org,location_id}).then(response => response.data).catch(error => console.log(error));
}

export const locationAddress = async (org,location_id) => {
    const url = `http://localhost:3008/api/LocationAddress`
    return axios.post(url,{org,location_id}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateLocationAddress = async (org,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin) => {
    const url = `http://localhost:3008/api/UpdateLocationAddress`
    return axios.post(url,{org,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin}).then(response => response.data).catch(error => console.log(error));
}
export const InsertLocationAddress = async (org,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin,to_date) => {
    console.log(org,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin,to_date)
    const url = `http://localhost:3008/api/InsertLocationAddress`
    return axios.post(url,{org,location_name,gstin_no,location_add1,location_add2,location_city,location_state,location_country,from_date,location_id,location_pin,to_date}).then(response => response.data).catch(error => console.log(error));
}

export const Locationstatus = async (org,location_id,status) =>{
    const url = `http://localhost:3008/api/locationstatus`
    return axios.post(url,{org,location_id,status}).then(response => response.data).catch(error => console.log(error));
}


export const UploadData = async (data) => {
    console.log(data, 'abcd')
    const url = `http://localhost:3008/api/FileUpload`
    return axios.post(url, data).then(res => res.data).catch(err => console.log(err))
}

export const showcompliances = async (org) => {
    console.log(org)
    const url = `http://localhost:3008/api/Showcompliances`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const Insertcompliance = async (org,compliance_type,nature,period,period_name,from_month,to_month,from_applicable,due_date,extended_date) => {
    console.log(org)
    const url = `http://localhost:3008/api/insertcompliances`
    return axios.post(url,{org,compliance_type,nature,period,period_name,from_month,to_month,from_applicable,due_date,extended_date}).then(response => response.data).catch(error => console.log(error));
}

export const showcompliancesData = async (org,sno) => {
    console.log(org,sno)
    const url = `http://localhost:3008/api/ShowcompliancesData`
    return axios.post(url,{org,sno}).then(response => response.data).catch(error => console.log(error));
}

export const updatecompliance = async (org,compliance_type,nature,period,period_name,from_month,to_month,from_applicable,due_date,extended_date,sno) => {
    console.log(org)
    const url = `http://localhost:3008/api/Updatecompliance`
    return axios.post(url,{org,compliance_type,nature,period,period_name,from_month,to_month,from_applicable,due_date,extended_date,sno}).then(response => response.data).catch(error => console.log(error));
}

export const showcompliancesType = async (org) => {
    console.log(org)
    const url = `http://localhost:3008/api/ShowcompliancesType`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const Compliancestatus = async (org,sno,status) => {
    // console.log(org)
    const url = `http://localhost:3008/api/compliancestatus`
    return axios.post(url,{org,sno,status}).then(response => response.data).catch(error => console.log(error));
}
