import axios from 'axios';

export const register = async (org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin) => {
    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin)
    const url = `${process.env.REACT_APP_APIURL}/org`
    return axios.post(url, {org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin}).then(response => response.data).catch(error => console.log(error));
}
export const addstates = async (state_name, country_name, state_code, state_short_name, select_type) => {
    const url = `http://192.168.146.103:3008/api/state`
    return axios.post(url, {state_name, country_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}
export const getstates = async () => {
    const url = `http://192.168.146.103:3008/api/Totalstate`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deletestate = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteState`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showstate = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showstate`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateState = async (sno, country_name,state_name, state_code, state_short_name, select_type) => {
    console.log(sno,country_name,state_name,state_code,state_short_name,select_type)
    const url = `http://192.168.146.103:3008/api/EditState`
    return axios.post(url, {sno,country_name, state_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}
export const showstateCity = async (country) => {
    console.log(country)
    const url = `${process.env.REACT_APP_APIURL}/api/showstateCity`
    return axios.post(url, {country}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcountry = async () => {
    const url = `http://192.168.146.103:3008/api/Totalcountry`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCountry = async (country_name, country_id, country_code, country_phonecode) => {
    const url = `http://192.168.146.103:3008/api/InsertCountry`
    return axios.post(url, {country_name, country_id, country_code, country_phonecode}).then(response => response.data).catch(error => console.log(error));
}

export const showcountry = async (sno) => {
    const url = `http://192.168.146.103:3008/api/Showcountry`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updatecountry = async (sno, country_name, country_id, country_code, country_phonecode) => {
    const url = `http://192.168.146.103:3008/api/Updatecountry`
    return axios.post(url, {sno, country_name, country_id, country_code, country_phonecode}).then(response => response.data).catch(error => console.log(error));
}
export const deletecountry = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteCountry`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const currency = async () => {
    const url = `http://192.168.146.103:3008/api/currency`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCurrency = async (country_name, country_code, currency_name, currency_code ) => {
    const url = `http://192.168.146.103:3008/api/InsertCurrecy`
    return axios.post(url, {country_name, country_code, currency_name, currency_code}).then(response => response.data).catch(error => console.log(error));
}

export const deleteCurrency = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteCurrency`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateCurrency = async (sno, country_name, country_code, currency_name, currency_code ) => {
    const url = `http://192.168.146.103:3008/api/UpdateCurrency`
    return axios.post(url, {sno, country_name, country_code, currency_name, currency_code}).then(response => response.data).catch(error => console.log(error));
}

export const showCurrency = async (sno) => {
    const url = `http://192.168.146.103:3008/api/ShowCurrency`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcity = async () => {
    const url = `http://192.168.146.103:3008/api/Totalcity`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCity = async (city_id, city_name,  state_name, country_name) => {
    console.log(city_id, city_name,  state_name, country_name)
    const url = `${process.env.REACT_APP_APIURL}/api/InsertCity`
    return axios.post(url, {city_id, city_name, state_name, country_name}).then(response => response.data).catch(error => console.log(error));
}

export const deleteCity = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/DeleteCity`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const showCity = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcity`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateCity = async (sno, city_id, city_name, state_name,country_name) => {
    const url = `${process.env.REACT_APP_APIURL}/api/UpdateCity`
    return axios.post(url, {sno, city_id, city_name, state_name,country_name}).then(response => response.data).catch(error => console.log(error));
}
export const getCity = async (state_name) => {
    const url = `${process.env.REACT_APP_APIURL}/api/getCity`
    return axios.post(url, {state_name}).then(response => response.data).catch(error => console.log(error));
}


export const TotalUnit = async () => {
    const url = `http://192.168.146.103:3008/api/TotalUnit`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Unit = async (unit_name,unit_symbol) => {
    const url = `http://192.168.146.103:3008/api/Unit`
    return axios.post(url, {unit_name, unit_symbol}).then(response => response.data).catch(error => console.log(error));
}

export const showunit = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showunit`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUnit = async (sno, unit_name, unit_symbol) => {
    const url = `http://192.168.146.103:3008/api/UpdateUnit`
    return axios.post(url, {sno, unit_name, unit_symbol}).then(response => response.data).catch(error => console.log(error));
}

export const deleteUnit = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteUnit`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}



export const insertBank = async (account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description) => {
    console.log(account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description)
    const url = `http://192.168.146.103:3008/api/AddBank`
    return axios.post(url, {account_code,bank_name, account_no, address_line1, address_line2, state,city,pincode,ifsc_code,actype,acname,description}).then(response => response.data).catch(error => console.log(error));
}
export const totalBank = async () => {
    const url = `http://192.168.146.103:3008/api/TotalBank`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deleteBank = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/DeleteBank`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showBank = async (sno) => {
    const url = `http://192.168.146.103:3008/api/ShowBank`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}
export const updateBank = async (sno,account_code,account_no,type,bank_name,address_line1,address_line2,state,city,pincode,ifsc_code,acname,description) => {
    const url = `http://192.168.146.103:3008/api/UpdateBank`
    return axios.post(url, {sno,account_code,account_no,type,bank_name,address_line1,address_line2,state,city,pincode,ifsc_code,acname,description}).then(response => response.data).catch(error => console.log(error));
}


export const TotalUser = async () => {
    const url = `http://192.168.146.103:3008/api/TotalUser`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


export const User = async (employee_name, role,warehouse,username,password,
    email_id,phone,operatemode,customer,reporting_to,designation,two_factor_authentication) => {
        console.log(employee_name, role,warehouse,username,password,
            email_id,phone,operatemode,customer,reporting_to,designation,two_factor_authentication)
    const url = `http://192.168.146.103:3008/api/InsertUser`
return axios.post(url, {employee_name, role,warehouse,username,password,email_id,phone,
    operatemode,customer,reporting_to,designation,two_factor_authentication}).then(response => response.data).catch(error => console.log(error));
}

export const showuser = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showuser`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUser = async (sno, employee_name, role,warehouse,user_name,password,
    email_id,phone,operate_mode,customer,reporting_to,designation,two_factor_authentication) => {
    const url = `http://192.168.146.103:3008/api/UpdateUser`
    return axios.post(url, {sno, employee_name, role,warehouse,user_name,password,email_id,phone,
        operate_mode,customer,reporting_to,designation,two_factor_authentication}).then(response => response.data).catch(error => console.log(error));
}

export const deleteUser = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/deleteUser`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}


export const TotalCustomers = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/TotalCustomer`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const DeleteCustomer = async (sno,status) => {
    const url = `${process.env.REACT_APP_APIURL}/api/DeleteCustomer`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const AddCustomer = async (mast_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
    opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
    billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
    contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
        console.log(mast_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
            opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
            billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
            contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
            contact_person_department,remark)
    const url = `${process.env.REACT_APP_APIURL}/api/AddCustomer`
    return axios.post(url, {mast_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
        opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustomer = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/ShowCustomer`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCustomer = async (sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
        console.log(sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
            contact_person_department,remark)
    const url = `${process.env.REACT_APP_APIURL}/api/UpdateCustomer`
    return axios.post(url, {sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
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
         
    const url = `http://localhost:3008/api/InsertVendor`
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
    const url = `http://localhost:3008/api/ShowVendor`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


export const DeleteVendor = async (sno,status) => {
    const url = `http://localhost:3008/api/DeleteVendor`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const showvendor = async (sno) => {
    const url = `http://localhost:3008/api/Vendor`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateVendor = async (sno,vend_email,vend_work_phone,vend_phone,contact_person_name,
    contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
    const url = `http://localhost:3008/api/UpdateVendor`
    return axios.post(url, {sno,vend_email,vend_work_phone,vend_phone,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}