import axios from 'axios';

export const register = async (org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin) => {
    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin)
    const url = `http://192.168.146.103:3008/org`
    return axios.post(url, {org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin}).then(response => response.data).catch(error => console.log(error));
}
export const addstates = async (state_name, country_name, state_code, state_short_name, select_type) => {
    const url = `http://localhost:3008/api/state`
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
    const url = `http://192.168.146.103:3008/api/showstateCity`
    return axios.post(url, {country}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcountry = async () => {
    const url = `http://localhost:3008/api/Totalcountry`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCountry = async (country_name, country_id, country_code, country_phonecode) => {
    const url = `http://localhost:3008/api/InsertCountry`
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
    const url = `http://localhost:3008/api/InsertCity`
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
    const url = `http://192.168.146.103:3008/api/UpdateCity`
    return axios.post(url, {sno, city_id, city_name, state_name,country_name}).then(response => response.data).catch(error => console.log(error));
}
export const getCity = async (state_name) => {
    const url = `http://192.168.146.103:3008/api/getCity`
    return axios.post(url, {state_name}).then(response => response.data).catch(error => console.log(error));
}


export const TotalUnit = async () => {
    const url = `http://192.168.146.103:3008/api/TotalUnit`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Unit = async (unit_name,unit_symbol) => {
    const url = `http://localhost:3008/api/Unit`
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
    const url = `http://192.168.146.103:3008/api/TotalCustomer`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const DeleteCustomer = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/DeleteCustomer`
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
    const url = `http://localhost:3008/api/AddCustomer`
    return axios.post(url, {getnewval,dateval,finyear,trimyear,year1,year2,mast_id,cust_id,cust_type,cust_name,company_name,cust_display_name,cust_email,cust_work_phone,cust_phone,skype_detail,designation,department,website,gst_treatment,gstin_uin,pan_no,place_of_supply,tax_preference,exemption_reason,currency,
        opening_balance,payment_terms,enable_portal,portal_language,facebook_url,twitter_url,billing_address_attention,billing_address_country,
        billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustomer = async (sno) => {
    const url = `http://192.168.146.103:3008/api/ShowCustomer`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCustomer = async (sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
        console.log(sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
            contact_person_department,remark)
    const url = `http://192.168.146.103:3008/api/UpdateCustomer`
    return axios.post(url, {sno,cust_email,cust_work_phone,cust_phone,contact_person_name,contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}
export const CustomerId = async () => {
    const url = `http://localhost:3008/api/CustomerId`
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
         
    const url = `http://192.168.146.103:3008/api/InsertVendor`
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
    const url = `http://192.168.146.103:3008/api/ShowVendor`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


export const DeleteVendor = async (sno,status) => {
    const url = `http://192.168.146.103:3008/api/DeleteVendor`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const Unique_Cust_id = async () => {
    const url = `http://localhost:3008/api/Unique_Cust_id`
    return axios.post(url).then(response => response.data).catch(error => console.log(error));
}
export const Lastcust_id = async () => {
    const url = `http://localhost:3008/api/Lastcust_id`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));

}

export const showvendor = async (sno) => {
    const url = `http://192.168.146.103:3008/api/Vendor`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateVendor = async (sno,vend_email,vend_work_phone,vend_phone,contact_person_name,
    contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
    contact_person_department,remark) => {
    const url = `http://192.168.146.103:3008/api/UpdateVendor`
    return axios.post(url, {sno,vend_email,vend_work_phone,vend_phone,contact_person_name,
        contact_person_email,contact_person_work_phone,contact_person_phone,contact_person_skype,contact_person_designation,
        contact_person_department,remark}).then(response => response.data).catch(error => console.log(error));
}
export const VendorId = async () => {
    const url = `http://localhost:3008/api/VendorId`
    console.log(url)
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const CustInsertAddress = async (cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
        const url = 'http://localhost:3008/api/InsertCustAddress'
        return axios.post(url, {cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
    }
    export const VendInsertAddress = async (vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
        console.log(vend_id)
        const url = 'http://localhost:3008/api/InsertVendAddress'
        return axios.post(url, {vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
    }

export const ShowCustAddress = async (cust_id) => {
    console.log(cust_id)
    const url = 'http://localhost:3008/api/ShowCustAddress'
    return axios.post(url,{cust_id}).then(response => response.data).catch(error => console.log(error));
}

export const ShowVendAddress = async (vend_id) => {
    console.log(vend_id)
    const url = 'http://localhost:3008/api/ShowVendAddress'
    return axios.post(url,{vend_id}).then(response => response.data).catch(error => console.log(error));
}
export const DeleteCustAddress = async (sno,status) => {
    const url = 'http://localhost:3008/api/DeleteCustAddress'
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendAddress = async (sno,status) => {
    const url = 'http://localhost:3008/api/DeleteVendAddress'
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const CustAddress = async (sno) => {
    const url = 'http://localhost:3008/api/CustAddress'
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const EditCustAddress = async (sno,cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
    const url = 'http://localhost:3008/api/UpdateCustAddress'
    return axios.post(url, {sno,cust_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
}

export const VendAddress = async (sno) => {
    const url = 'http://localhost:3008/api/VendorAddress'
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const EditVendAddress = async (sno,vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax) => {
    const url = 'http://localhost:3008/api/UpdateVendAddress'
    return axios.post(url, {sno,vend_id,billing_address_attention,billing_address_country,billing_address_city,billing_address_state,billing_address_pincode,billing_address_phone,billing_address_fax}).then(response => response.data).catch(error => console.log(error));
}
