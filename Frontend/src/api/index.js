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


export const TotalUnit = async (Token) => {
    const url = `http://localhost:3008/api/totalunit`
    return axios.get(url,{ headers: {"Authorization" : Token} }).then(response => response.data).catch(error => console.log(error));
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
export const totalBank = async () => {
    const url = `http://192.168.146.103:3008/api/totalbank`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
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
    email_id,phone,operatemode,customer,reporting_to,designation,two_factor_authentication) => {
        console.log(employee_name, role,warehouse,username,password,
            email_id,phone,operatemode,customer,reporting_to,designation,two_factor_authentication)
    const url = `http://192.168.146.103:3008/api/insertuser`
return axios.post(url, {employee_name, role,warehouse,username,password,email_id,phone,
    operatemode,customer,reporting_to,designation,two_factor_authentication}).then(response => response.data).catch(error => console.log(error));
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
    const url = 'http://localhost:3008/api/userlogin'
    return axios.post(url, {user_id,user_password}).then(response => response.data).catch(error => console.log(error));
}

export const UserLogout = async(user_id) => {
    console.log(user_id)
    const url = 'http://localhost:3008/api/userlogout'
    return axios.post(url, {user_id}).then(response => response.data).catch(error => console.log(error));
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

export const ImportCountry = async (data) => {
    console.log('Api',{data})
    const url = `http://localhost:3008/api/importcountry`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}

export const CheckimportCountry = async (data) => {
    const url = `http://localhost:3008/api/checkimportcountry`
    return axios.post(url, {data}).then(response => response.data).catch(error => console.log(error));
}

