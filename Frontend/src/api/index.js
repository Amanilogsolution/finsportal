import axios from 'axios';

// ############################For create  Db #################################

// export const Newdb = async (dbname) => {
//     const url = `http://localhost:3008/api/newdb`
//     return axios.get(url,{dbname}).then(response => response.data).catch(error => console.log(error));
// }

export const register = async (org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin) => {
    console.log(org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin)
    const url = `http://localhost:3008/api/insertorg`
    return axios.post(url, {org_name, org_country, org_state, org_street,  org_currency, org_lang, org_gst,org_contact_name,org_contact_phone,org_contact_email,org_city, org_pin}).then(response => response.data).catch(error => console.log(error));
}


export const CreatenewDb = async (dbname) => {
    const url = `http://localhost:3008/api/newdb`
    return axios.post(url, { dbname }).then(response => response.data).catch(error => console.log(error));
}

export const CreateOrgTable = async (dbname) => {
    const url = `http://localhost:3008/api/Org_table`
    return axios.post(url, { dbname }).then(response => response.data).catch(error => console.log(error));

}


export const TotalOrganistion = async () => {
    const url = `http://localhost:3008/api/TotalOrganistion`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const showOrganisation = async (org_name) => {
    const url = `http://localhost:3008/api/ShowOrganisation`
    return axios.post(url, { org_name }).then(response => response.data).catch(error => console.log(error));
}

export const updateOrganisation = async (org_name, org_contact_name, org_contact_phone, org_contact_email, org_street, org_city, org_pincode, org_gst) => {
    const url = `http://localhost:3008/api/UpdateOrganisation`
    return axios.post(url, { org_name, org_contact_name, org_contact_phone, org_contact_email, org_street, org_city, org_pincode, org_gst }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For create  Db #################################

export const addstates = async (state_name, country_name, state_code, state_short_name, select_type) => {
    const url = `http://localhost:3008/api/state`
    return axios.post(url, { state_name, country_name, state_code, state_short_name, select_type }).then(response => response.data).catch(error => console.log(error));
}
export const getstates = async () => {
    const url = `http://192.168.146.103:3008/api/totalstate`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deletestate = async (sno, status) => {
    const url = `http://192.168.146.103:3008/api/deletestate`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}
export const showstate = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showstate`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updateState = async (sno, country_name, state_name, state_code, state_short_name, select_type) => {
    const url = `http://192.168.146.103:3008/api/editstate`
    return axios.post(url, { sno, country_name, state_name, state_code, state_short_name, select_type }).then(response => response.data).catch(error => console.log(error));
}
export const showactivestate = async (country) => {
    const url = `http://localhost:3008/api/showactivestate`
    return axios.post(url, { country }).then(response => response.data).catch(error => console.log(error));
}

export const Totalcountry = async () => {
    const url = `http://localhost:3008/api/totalcountry`
    return axios.post(url).then(response => response.data).catch(error => console.log(error));
}
export const Activecountries = async () => {
    const url = `http://localhost:3008/api/activecountries`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCountry = async (User_id,country_name, country_id, country_code, country_phonecode) => {
    const url = `http://localhost:3008/api/insertcountry`
    return axios.post(url, { User_id,country_name, country_id, country_code, country_phonecode }).then(response => response.data).catch(error => console.log(error));
}

export const showcountry = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcountry`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updatecountry = async (sno,User_id, country_name, country_id, country_code, country_phonecode) => {
    const url = `http://localhost:3008/api/updatecountry`
    return axios.post(url, { sno, User_id,country_name, country_id, country_code, country_phonecode }).then(response => response.data).catch(error => console.log(error));
}
export const deletecountry = async (sno, status) => {
    const url = `http://192.168.146.103:3008/api/deletecountry`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const currency = async (org) => {
    const url = `http://localhost:3008/api/currency`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const InsertCurrency = async (org,User_id,country_name, country_code, currency_name, currency_code) => {
    const url = `http://localhost:3008/api/insertcurrecy`
    return axios.post(url, {org,User_id, country_name, country_code, currency_name, currency_code }).then(response => response.data).catch(error => console.log(error));
}

export const deleteCurrency = async (org,sno, status) => {
    const url = `http://localhost:3008/api/deletecurrency`
    return axios.post(url, {org, sno, status }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateCurrency = async (org,User_id,sno, country_name, country_code, currency_name, currency_code) => {
    const url = `http://localhost:3008/api/updatecurrency`
    return axios.post(url, {org,User_id, sno, country_name, country_code, currency_name, currency_code }).then(response => response.data).catch(error => console.log(error));
}

export const showCurrency = async (sno,org) => {
    const url = `http://localhost:3008/api/showcurrency`
    return axios.post(url, { sno,org }).then(response => response.data).catch(error => console.log(error));
}

export const Totalcity = async () => {
    const url = `http://192.168.146.103:3008/api/totalcity`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCity = async (city_id, city_name, state_name, country_name,User_id) => {
    const url = `http://localhost:3008/api/insertcity`
    return axios.post(url, { city_id, city_name, state_name, country_name,User_id }).then(response => response.data).catch(error => console.log(error));
}

export const deleteCity = async (sno, status) => {
    const url = `http://192.168.146.103:3008/api/deletecity`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const showCity = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showcity`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updateCity = async (sno, city_id, city_name, state_name, country_name,User_id) => {
    const url = `http://localhost:3008/api/updatecity`
    return axios.post(url, { sno, city_id, city_name, state_name, country_name,User_id }).then(response => response.data).catch(error => console.log(error));
}
export const getCity = async (state_name) => {
    const url = `http://localhost:3008/api/getcity`
    return axios.post(url, { state_name }).then(response => response.data).catch(error => console.log(error));
}
export const TotalUnit = async (Token, org) => {
    const url = `http://localhost:3008/api/totalunit`
    return axios.post(url, { org }, { headers: { "Authorization": Token } }).then(response => response.data).catch(error => console.log(error));
}
export const TotalActiveUnit = async (org) => {
    const url = `http://localhost:3008/api/totalactiveunit`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Unit = async (unit_name, unit_symbol,org) => {
    const url = `http://localhost:3008/api/unit`
    return axios.post(url, { unit_name, unit_symbol,org }).then(response => response.data).catch(error => console.log(error));
}

export const showunit = async (sno, Token,org) => {
    const url = `http://localhost:3008/api/showunit`
    return axios.post(url, { sno ,org}, { headers: { "Authorization": Token } }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUnit = async (sno, unit_name, unit_symbol,org) => {
    const url = `http://localhost:3008/api/updateunit`
    return axios.post(url, { sno, unit_name, unit_symbol,org }).then(response => response.data).catch(error => console.log(error));
}

export const deleteUnit = async (sno, status,org) => {
    const url = `http://localhost:3008/api/deleteunit`
    return axios.post(url, { sno, status,org }).then(response => response.data).catch(error => console.log(error));
}


export const insertBank = async (account_code, bank_name, account_no, address_line1, address_line2, state, city, pincode, ifsc_code, actype, acname, description,org,User_id) => {
    console.log(account_code, bank_name, account_no, address_line1, address_line2, state, city, pincode, ifsc_code, actype, acname, description)
    const url = `http://localhost:3008/api/addbank`
    return axios.post(url, { account_code, bank_name, account_no, address_line1, address_line2, state, city, pincode, ifsc_code, actype, acname, description,org,User_id }).then(response => response.data).catch(error => console.log(error));
}

export const totalBank = async (org) => {
    const url = `http://localhost:3008/api/totalbank`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const deleteBank = async (sno, status,org) => {
    const url = `http://localhost:3008/api/deletebank`
    return axios.post(url, { sno, status ,org}).then(response => response.data).catch(error => console.log(error));
}
export const showBank = async (sno,org) => {
    const url = `http://localhost:3008/api/showbank`
    return axios.post(url, { sno,org }).then(response => response.data).catch(error => console.log(error));
}
export const updateBank = async (sno, account_code, account_no, type, bank_name, address_line1, address_line2, state, city, pincode, ifsc_code, acname, description,org,User_id) => {
    const url = `http://localhost:3008/api/updatebank`
    return axios.post(url, { sno, account_code, account_no, type, bank_name, address_line1, address_line2, state, city, pincode, ifsc_code, acname, description,org,User_id }).then(response => response.data).catch(error => console.log(error));
}

export const TotalUser = async () => {
    const url = `http://192.168.146.103:3008/api/totaluser`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const User = async (employee_name, role, warehouse, username, password,
    email_id, phone, operatemode, customer, reporting_to, designation, two_factor_authentication, user_profile_url) => {

    const url = `http://localhost:3008/api/insertuser`
    return axios.post(url, {
        employee_name, role, warehouse, username, password, email_id, phone,
        operatemode, customer, reporting_to, designation, two_factor_authentication, user_profile_url
    }).then(response => response.data).catch(error => console.log(error));
}

export const showuser = async (sno) => {
    const url = `http://192.168.146.103:3008/api/showuser`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUser = async (sno, employee_name, role, warehouse, user_name, password,
    email_id, phone, operate_mode, customer, reporting_to, designation, two_factor_authentication) => {
    const url = `http://localhost:3008/api/updateuser`
    return axios.post(url, {
        sno, employee_name, role, warehouse, user_name, password, email_id, phone,
        operate_mode, customer, reporting_to, designation, two_factor_authentication
    }).then(response => response.data).catch(error => console.log(error));
}

export const deleteUser = async (sno, status) => {
    const url = `http://localhost:3008/api/deleteuser`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}


export const TotalCustomers = async (org) => {
    const url = `http://localhost:3008/api/totalcustomer`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const DeleteCustomer = async (sno, status,org) => {
    const url = `http://localhost:3008/api/deletecustomer`
    return axios.post(url, { sno, status,org }).then(response => response.data).catch(error => console.log(error));
}

export const AddCustomer = async (User_id,org,getnewval, dateval, finyear, trimyear, year1, year2, mast_id, cust_id, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, currency,
    opening_balance, payment_terms, enable_portal, portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
    billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
    contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark) => {

    const url = `http://localhost:3008/api/addcustomer`
    return axios.post(url, {
        User_id,org,getnewval, dateval, finyear, trimyear, year1, year2, mast_id, cust_id, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, currency,
        opening_balance, payment_terms, enable_portal, portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
        billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
        contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark
    }).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustomer = async (sno,org) => {
    const url = `http://localhost:3008/api/showcustomer`
    return axios.post(url, { sno,org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCustomer = async (org,sno,User_id, cust_email, cust_work_phone, cust_phone, contact_person_name, contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark) => {
    const url = `http://localhost:3008/api/updatecustomer`
    return axios.post(url, {
        org,sno,User_id, cust_email, cust_work_phone, cust_phone, contact_person_name, contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark
    }).then(response => response.data).catch(error => console.log(error));
}

export const CustomerId = async (org) => {
    const url = `http://localhost:3008/api/customerid`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const Customername = async (org,cust_id) => {
    const url = `http://localhost:3008/api/customername`
    return axios.post(url,{org,cust_id}).then(response => response.data).catch(error => console.log(error));
}
export const InsertVendor = async (mast_id, vend_id, vend_name,
    company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation, department,
    website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency,
    opening_balance, payment_terms, tds, enable_portal, portal_language, facebook_url, twitter_url,
    billing_address_attention, billing_address_country,
    billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone,
    billing_address_fax, contact_person_name,
    contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark,org,User_id) => {

    const url = `http://localhost:3008/api/insertvendor`
    return axios.post(url, {
        mast_id, vend_id, vend_name,
        company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation, department,
        website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency,
        opening_balance, payment_terms, tds, enable_portal, portal_language, facebook_url, twitter_url,
        billing_address_attention, billing_address_country,
        billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone,
        billing_address_fax, contact_person_name,
        contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark,org,User_id
    }).then(response => response.data).catch(error => console.log(error));
}

export const Vendor = async (org) => {
    const url = `http://localhost:3008/api/vendor`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}


export const DeleteVendor = async (sno, status,org) => {
    const url = `http://localhost:3008/api/deletevendor`
    return axios.post(url, { sno, status,org }).then(response => response.data).catch(error => console.log(error));
}

export const Unique_Cust_id = async (org) => {
    const url = `http://localhost:3008/api/unique_cust_id`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const Lastcust_id = async (org) => {
    const url = `http://localhost:3008/api/lastcust_id`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));

}

export const showvendor = async (org,sno) => {
    const url = `http://localhost:3008/api/showvendor`
    return axios.post(url, {org, sno }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateVendor = async (sno, vend_email, vend_work_phone, vend_phone, contact_person_name,
    contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark,org,User_id) => {
    const url = `http://localhost:3008/api/updatevendor`
    return axios.post(url, {
        sno, vend_email, vend_work_phone, vend_phone, contact_person_name,
        contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark,org,User_id
    }).then(response => response.data).catch(error => console.log(error));
}
export const VendorId = async (org) => {
    const url = `http://localhost:3008/api/vendorid`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const VendorMastid = async (org) => {
    const url = `http://localhost:3008/api/vendormastid`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const TotalVendor = async (org) => {
    const url = `http://localhost:3008/api/totalvendor`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const TotalVendId = async (org,mast_id) => {
    const url = `http://localhost:3008/api/totalvendid`
    return axios.post(url,{org,mast_id}).then(response => response.data).catch(error => console.log(error));
}


export const CustInsertAddress = async (org,userid,cust_id,cust_name, gst_no, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax) => {
    const url = 'http://localhost:3008/api/insertcustaddress'
    return axios.post(url, {org,userid, cust_id,cust_name, gst_no, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax }).then(response => response.data).catch(error => console.log(error));
}
export const VendInsertAddress = async (vend_id, billing_address_gstno,billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax,org,User_id) => {
    const url = 'http://localhost:3008/api/insertvendaddress'
    return axios.post(url, { vend_id,billing_address_gstno, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax,org,User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustAddress = async (cust_id,org) => {
    const url = 'http://localhost:3008/api/showcustaddress'
    return axios.post(url, { cust_id,org }).then(response => response.data).catch(error => console.log(error));
}

export const ShowVendAddress = async (vend_id,org) => {
    const url = 'http://localhost:3008/api/showvendaddress'
    return axios.post(url, { vend_id,org }).then(response => response.data).catch(error => console.log(error));
}
export const DeleteCustAddress = async (sno, status,org) => {
    const url = 'http://localhost:3008/api/deletecustaddress'
    return axios.post(url, { sno, status,org }).then(response => response.data).catch(error => console.log(error));
}
export const SelectCustAddress = async (cust_name,org) => {
    const url = 'http://localhost:3008/api/selectcustaddress'
    return axios.post(url, { cust_name,org }).then(response => response.data).catch(error => console.log(error));
}

export const Importcustaddress = async (importdata,org,User_id) => {
    console.log('API',importdata,org,User_id)
    const url = 'http://localhost:3008/api/importcustaddress'
    return axios.post(url, { importdata,org,User_id }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendAddress = async (sno, status,org) => {
    const url = 'http://localhost:3008/api/deletevendaddress'
    return axios.post(url, { sno, status,org }).then(response => response.data).catch(error => console.log(error));
}
export const CustAddress = async (sno,org) => {
    const url = 'http://localhost:3008/api/custaddress'
    return axios.post(url, { sno,org }).then(response => response.data).catch(error => console.log(error));
}

export const EditCustAddress = async (org,sno, cust_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax) => {
    const url = 'http://localhost:3008/api/updatecustaddress'
    return axios.post(url, { org,sno, cust_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax }).then(response => response.data).catch(error => console.log(error));
}

export const VendAddress = async (sno,org) => {
    const url = 'http://localhost:3008/api/vendoraddress'
    return axios.post(url, { sno,org }).then(response => response.data).catch(error => console.log(error));
}

export const EditVendAddress = async (sno, vend_id,billing_address_gstno, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax,org,User_id) => {
    const url = 'http://localhost:3008/api/updatevendaddress'
    return axios.post(url, { sno, vend_id,billing_address_gstno, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax,org,User_id }).then(response => response.data).catch(error => console.log(error));
}


export const UserLogin = async (user_id, user_password) => {
    const url = 'http://localhost:3008/api/userlogin'
    return axios.post(url, { user_id, user_password }).then(response => response.data).catch(error => console.log(error));
}

export const UserChangePassword = async (user_id, password, CurrentPassword) => {
    const url = 'http://localhost:3008/api/ChangePassword'
    return axios.post(url, { user_id, password, CurrentPassword }).then(response => response.data).catch(error => console.log(error));
}
export const showUserLogin = async (user_id) => {
    const url = 'http://localhost:3008/api/ShowUserLogin'
    return axios.post(url, { user_id }).then(response => response.data).catch(error => console.log(error));
}

export const UserLogout = async (user_id) => {
    const url = 'http://localhost:3008/api/userlogout'
    return axios.post(url, { user_id }).then(response => response.data).catch(error => console.log(error));
}

export const insertUserLogin = async (user_id, user_name, location, comp_name, user_password, org_db_name, user_profile_url) => {
    const url = 'http://localhost:3008/api/InsertUserLogin'
    return axios.post(url, { user_id, user_name, location, comp_name, user_password, org_db_name, user_profile_url }).then(response => response.data).catch(error => console.log(error));
}

export const ImportCurrency = async (data,org,user_id) => {
    const url = `http://localhost:3008/api/ImportCurrency`
    return axios.post(url, { data,org,user_id }).then(response => response.data).catch(error => console.log(error));
}
export const ImportCustomer = async (data,org,User_id) => {
    const url = `http://localhost:3008/api/ImportCustomer`
    return axios.post(url, { data,org,User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ImportVendor = async (data,org,User_id) => {
    const url = `http://localhost:3008/api/importvendor`
    return axios.post(url, { data,org,User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ImportState = async (data) => {
    const url = `http://localhost:3008/api/importState`
    return axios.post(url, { data }).then(response => response.data).catch(error => console.log(error));
}

export const ImportCity = async (data,User_id) => {
    const url = `http://localhost:3008/api/importcity`
    return axios.post(url, { data,User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ImportUnit = async (data, org) => {
    const url = `http://localhost:3008/api/importunit`
    return axios.post(url, { data, org }).then(response => response.data).catch(error => console.log(error));
}

export const ImportBank = async (data, org,User_id) => {
    const url = `http://localhost:3008/api/importbank`
    return axios.post(url, { data, org ,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const ImportUser = async (data, org, org_name) => {
    const url = `http://localhost:3008/api/importuser`
    return axios.post(url, { data, org, org_name }).then(response => response.data).catch(error => console.log(error));
}
export const CheckimportCountry = async (data,User_id) => {
    const url = `http://localhost:3008/api/checkimportcountry`
    return axios.post(url, { data,User_id }).then(response => response.data).catch(error => console.log(error));
}



export const totalLocation = async (org) => {
    const url = `http://localhost:3008/api/totallocation`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const addLocation = async (org, Location_id,location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2,User_id) => {
    const url = `http://localhost:3008/api/addlocation`
    return axios.post(url, { org,Location_id, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2 ,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const updateLocation = async (org, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2, location_id,User_id) => {
    const url = `http://localhost:3008/api/updatelocation`
    return axios.post(url, { org, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2, location_id,User_id }).then(response => response.data).catch(error => console.log(error));
}
export const showLocation = async (org, location_id) => {
    console.log('api', org, location_id)
    const url = `http://localhost:3008/api/ShowLocation`
    return axios.post(url, { org, location_id }).then(response => response.data).catch(error => console.log(error));
}

export const LastLocationid = async (org) => {
    const url = `http://localhost:3008/api/lastlocationid`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const ImportLocationMaster = async (org,datas,User_id) => {
    const url = `http://localhost:3008/api/importlocationmaster`
    return axios.post(url, { org ,datas,User_id}).then(response => response.data).catch(error => console.log(error));
}


export const locationAddress = async (org, location_id) => {
    const url = `http://localhost:3008/api/LocationAddress`
    return axios.post(url, { org, location_id }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateLocationAddress = async (org, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin,User_id) => {
     console.log('Api',User_id)
    const url = `http://localhost:3008/api/UpdateLocationAddress`
    return axios.post(url, { org, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin,User_id }).then(response => response.data).catch(error => console.log(error));
}
export const InsertLocationAddress = async (org, location_name, gstin_no, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, to_date,User_id) => {
    console.log(org, location_name, gstin_no, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, to_date)
    const url = `http://localhost:3008/api/InsertLocationAddress`
    return axios.post(url, { org, location_name, gstin_no, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, to_date,User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ImportLocationAddress = async (org,datas,User_id) => {
    const url = `http://localhost:3008/api/importlocationaddress`
    return axios.post(url, { org ,datas,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const Locationstatus = async (org, location_id, status) => {
    const url = `http://localhost:3008/api/locationstatus`
    return axios.post(url, { org, location_id, status }).then(response => response.data).catch(error => console.log(error));
}


export const UploadData = async (data) => {
    console.log(data, 'abcd')
    const url = `http://localhost:3008/api/FileUpload`
    return axios.post(url, data).then(res => res.data).catch(err => console.log(err))
}

export const showcompliances = async (org) => {
    console.log(org)
    const url = `http://localhost:3008/api/Showcompliances`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Compliancesduedate = async (org) => {
    console.log(org)
    const url = `http://localhost:3008/api/compliancesduedate`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const Insertcompliance = async (org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, user_name) => {
    console.log(org)
    const url = `http://localhost:3008/api/insertcompliances`
    return axios.post(url, { org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, user_name }).then(response => response.data).catch(error => console.log(error));
}

export const showcompliancesData = async (org, sno) => {
    console.log(org, sno)
    const url = `http://localhost:3008/api/ShowcompliancesData`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const updatecompliance = async (org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, sno, user_name) => {
    console.log(org)
    const url = `http://localhost:3008/api/Updatecompliance`
    return axios.post(url, { org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, sno, user_name }).then(response => response.data).catch(error => console.log(error));
}
export const UploadDocumentCompliance = async (org,sno,document) => {
    console.log(org,sno,document)
    const url = `http://localhost:3008/api/uploaddocumentcompliance`
    return axios.post(url, { org,sno,document }).then(response => response.data).catch(error => console.log(error));
}


export const PendingCompliances = async (org) => {
    const url = `http://localhost:3008/api/pendingcompliances`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdatePendingCompliances = async (due_date,org,remark,sno,UploadLink) => {
    const url = `http://localhost:3008/api/updatependingcompliances`
    return axios.post(url, {due_date,org,remark,sno,UploadLink}).then(response => response.data).catch(error => console.log(error));
}


export const showcompliancesType = async (org) => {
    console.log(org)
    const url = `http://localhost:3008/api/ShowcompliancesType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Showactivecompliancestype = async (org) => {
    console.log("Api",org)
    const url = `http://localhost:3008/api/showactivecompliancestype`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Compliancestatus = async (org, sno, status) => {
    const url = `http://localhost:3008/api/compliancestatus`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}
export const ImportCompliances = async ( datas,User_id,org) => {
    const url = `http://localhost:3008/api/importcompliances`
    return axios.post(url, {datas,User_id,org }).then(response => response.data).catch(error => console.log(error));
}


export const InsertcomplianceType = async (org, compliance_type, user_name) => {
    // console.log(org)
    const url = `http://localhost:3008/api/InsertcomplianceType`
    return axios.post(url, { org, compliance_type, user_name }).then(response => response.data).catch(error => console.log(error));
}

export const ShowcompliancesTypeselect = async (org, sno) => {
    // console.log(org)
    const url = `http://localhost:3008/api/ShowcompliancesTypeselect`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdatecomplianceType = async (org, compliance_type, user_name, sno) => {
    // console.log(org)
    const url = `http://localhost:3008/api/UpdatecomplianceType`
    return axios.post(url, { org, compliance_type, user_name, sno }).then(response => response.data).catch(error => console.log(error));
}
export const Compliancesstatus = async (org, sno, status) => {
    // console.log(org)
    const url = `http://localhost:3008/api/compliancesstatus`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}



export const Showfincialyear = async (org) => {
    const url = `http://localhost:3008/api/showfincialyear`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const Addfincialyear = async (org,fin_year,year,from_date,to_date,mcust_id,cust_id,vendmast,vendid,User_id) => {
    const url = `http://localhost:3008/api/addfincialyear`
    return axios.post(url, {org,fin_year,year,from_date,to_date,mcust_id,cust_id,vendmast,vendid,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const Updatefincialyear = async (org,mcust_id,cust_id) => {
    const url = `http://localhost:3008/api/updatefincialyear`
    return axios.post(url, {org,mcust_id,cust_id }).then(response => response.data).catch(error => console.log(error));
}
export const Statusfincialyear = async (org,sno) => {
    console.log(org,sno)
    const url = `http://localhost:3008/api/statusfincialyear`
    return axios.post(url, {org,sno }).then(response => response.data).catch(error => console.log(error));
}



export const InsertItems = async (org,item_type,item_name,item_unit,item_selling_price,sales_account,sales_description,item_cost_price,purchase_account,purchases_description,add_user_name) => {
    const url = `http://localhost:3008/api/insertitems`
    return axios.post(url, { org,item_type,item_name,item_unit,item_selling_price,sales_account,sales_description,item_cost_price,purchase_account,purchases_description,add_user_name }).then(response => response.data).catch(error => console.log(error));
}

export const updateImage = async (user_id, user_profile_url) => {
    const url = `http://localhost:3008/api/updateimage`
    return axios.post(url, { user_id, user_profile_url }).then(response => response.data).catch(error => console.log(error));
}

export const ShowChartOfAccount = async (org) => {
    const url = `http://localhost:3008/api/showcoa`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const ChartOfAccountParentAccount = async (account_type_code,org) => {
    const url = `http://localhost:3008/api/parentaccount`
    return axios.post(url,{account_type_code,org}).then(response => response.data).catch(error => console.log(error));
}



export const ParentAccountNumber = async (account_type_code,account_name_code,org) => {
    const url = `http://localhost:3008/api/parentaccountNumber`
    return axios.post(url,{account_type_code,account_name_code,org}).then(response => response.data).catch(error => console.log(error));
}

export const AddAccountName = async (account_type_code,account_name,account_name_code,description,org,User_id) => {
    const url = `http://localhost:3008/api/addaccountname`
    return axios.post(url,{account_type_code,account_name,account_name_code,description,org,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const AddSubAccountName = async (account_type_code,account_name_code,org) => {
    const url = `http://localhost:3008/api/addsubaccountname`
    return axios.post(url,{account_type_code,account_name_code,org}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateSubAccountName = async (account_sub_name,account_sub_name_code,description,account_type_code,account_name_code,org,User_id) => {
    const url = `http://localhost:3008/api/updatesubaccountname`
    return axios.post(url,{account_sub_name,account_sub_name_code,description,account_type_code,account_name_code,org,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const AddNewSubAccountName = async (account_sub_name,account_sub_name_code,description,account_type_code,account_name_code,org,User_id) => {
    console.log(account_sub_name,account_sub_name_code,description,account_type_code,account_name_code)
    const url = `http://localhost:3008/api/addnewsubaccountname`
    return axios.post(url,{account_sub_name,account_sub_name_code,description,account_type_code,account_name_code,org,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const Insertaccounttype = async (org,account_type,account_type_code,accountTypedesc,User_id) => {
    const url = `http://localhost:3008/api/insertaccounttype`
    return axios.post(url,{org,account_type,account_type_code,accountTypedesc,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateAccountName = async (account_type,account_type_code,accountTypedesc,org,uniqueID,User_id) => {
    const url = `http://localhost:3008/api/updateaccountname`
    return axios.post(url,{account_type,account_type_code,accountTypedesc,org,uniqueID,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const TotalAccountName = async (org) => {
    const url = `http://localhost:3008/api/totalaccountname`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const AccountnameStatus = async (org,status,account_type_code) => {
    const url = `http://localhost:3008/api/accountnamestatus`
    return axios.post(url,{org,status,account_type_code}).then(response => response.data).catch(error => console.log(error));
}
export const SelectAccountName = async (org,account_type_code) => {
    const url = `http://localhost:3008/api/selectaccountname`
    return axios.post(url,{org,account_type_code}).then(response => response.data).catch(error => console.log(error));
}

export const ImportAccountName = async (datas,org,User_id) => {
    const url = `http://localhost:3008/api/importaccountname`
    return axios.post(url,{datas,org,User_id}).then(response => response.data).catch(error => console.log(error));
}



export const AllAccountInfo = async (org)=>{
    const url = `http://localhost:3008/api/allaccountinfo`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const AllAccountsalesInfo = async (org)=>{
    const url = `http://localhost:3008/api/allaccountsalesinfo`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const AllAccountpurchaseInfo = async (org)=>{
    const url = `http://localhost:3008/api/allaccountpurchaseinfo`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const AccountInfoStatus = async (org,status,sno)=>{
    const url = `http://localhost:3008/api/accountinfostatus`
    return axios.post(url,{org,status,sno}).then(response => response.data).catch(error => console.log(error));
}
export const InsertAccountInfo = async (org,account_info_name,account_info_type,User_id)=>{
    const url = `http://localhost:3008/api/insertaccountinfo`
    return axios.post(url,{org,account_info_name,account_info_type,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const SelectAccountInfo = async (org,sno)=>{
    const url = `http://localhost:3008/api/selectaccountinfo`
    return axios.post(url,{org,sno}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateAccountInfo = async (org,sno,account_info_name,account_info_type,User_id)=>{
    const url = `http://localhost:3008/api/updateaccountinfo`
    return axios.post(url,{org,sno,account_info_name,account_info_type,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const Importaccountinfo = async (datas,org,User_id)=>{
    const url = `http://localhost:3008/api/importaccountinfo`
    return axios.post(url,{datas,org,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const ShowGlCode = async (org)=>{
    const url = `http://localhost:3008/api/showglcode`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}
export const GlSubCode = async (org,glCode)=>{
    const url = `http://localhost:3008/api/glsubcode`
    return axios.post(url,{org,glCode}).then(response => response.data).catch(error => console.log(error));
}

export const InsertGlSubCode = async (org,glCode,SubCode,charge_code,company_id,User_id)=>{
    const url = `http://localhost:3008/api/insertglsubcode`
    return axios.post(url,{org,glCode,SubCode,charge_code,company_id,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const ShowTotalSubCode = async (org)=>{
    console.log(org)
    const url = `http://localhost:3008/api/showtotalsubcode`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const SubCodeStatus = async (org,status,sno)=>{
    console.log(org,status,sno)
    const url = `http://localhost:3008/api/subcodestatus`
    return axios.post(url,{org,status,sno}).then(response => response.data).catch(error => console.log(error));
}

export const GetSubCodeDetails = async (org,sno)=>{
    console.log(org,sno)
    const url = `http://localhost:3008/api/getsubcodedetails`
    return axios.post(url,{org,sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateSubCodeDetails = async (org,charge_code,sub_code,gl_code,sno,company_id,User_id)=>{
    const url = `http://localhost:3008/api/updatesubcodedetails`
    return axios.post(url,{org,charge_code,sub_code,gl_code,sno,company_id,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const ImportSubcode = async (data,org,User_id)=>{
    console.log("Api",data)
    const url = `http://localhost:3008/api/importsubcode`
    return axios.post(url,{data,org,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const TotalAccountMinorCode = async (org)=>{
    console.log(org)
    const url = `http://localhost:3008/api/totalaccountminorcode`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const AccountMinorCodeStatus = async (org,status,sno)=>{
    console.log(org,status,sno)
    const url = `http://localhost:3008/api/accountminorcodestatus`
    return axios.post(url,{org,status,sno}).then(response => response.data).catch(error => console.log(error));
}
export const GetAccountMinorCode = async (org,sno)=>{
    console.log(org,sno)
    const url = `http://localhost:3008/api/getaccountminorcode`
    return axios.post(url,{org,sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateAccountMinorCode = async (org,sno,account_name,User_id)=>{
    console.log(org,sno)
    const url = `http://localhost:3008/api/updateaccountminorcode`
    return axios.post(url,{org,sno,account_name,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const ImportAccountMinorCode = async (org,datas,User_id)=>{
    const url = `http://localhost:3008/api/importaccountminorcode`
    return axios.post(url,{org,datas,User_id}).then(response => response.data).catch(error => console.log(error));
}

export const TotalChartOfAccount = async (org)=>{
    console.log(org)
    const url = `http://localhost:3008/api/totalchartofaccount`
    return axios.post(url,{org}).then(response => response.data).catch(error => console.log(error));
}

export const ChartOfAccountStatus = async (org,status,sno)=>{
    const url = `http://localhost:3008/api/chartofaccountstatus`
    return axios.post(url,{org,status,sno}).then(response => response.data).catch(error => console.log(error));
}

export const GetChartOfAccount = async (org,sno)=>{
    const url = `http://localhost:3008/api/getchartofaccount`
    return axios.post(url,{org,sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateChartOfAccount = async (org,sno,account_sub_name,User_id)=>{
    const url = `http://localhost:3008/api/updatechartofaccount`
    return axios.post(url,{org,sno,account_sub_name,User_id}).then(response => response.data).catch(error => console.log(error));
}
export const ImportChartofAccount = async (datas,org,User_id)=>{
    console.log("API",datas)
    const url = `http://localhost:3008/api/importchartofaccount`
    return axios.post(url,{datas,org,User_id}).then(response => response.data).catch(error => console.log(error));
}


