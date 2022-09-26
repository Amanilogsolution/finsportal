import axios from 'axios';


// ############################ For USER Login start #################################

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

export const UserLogout = async (user_id, user_name, btntheme, themetype) => {
    const url = 'http://localhost:3008/api/userlogout'
    return axios.post(url, { user_id, user_name, btntheme, themetype }).then(response => response.data).catch(error => console.log(error));
}

export const insertUserLogin = async (user_id, user_name, location, comp_name, user_password, org_db_name, user_profile_url,UserRole) => {
    const url = 'http://localhost:3008/api/InsertUserLogin'
    return axios.post(url, { user_id, user_name, location, comp_name, user_password, org_db_name, user_profile_url,UserRole }).then(response => response.data).catch(error => console.log(error));
}
export const updateImage = async (user_id, user_profile_url) => {
    const url = `http://localhost:3008/api/updateimage`
    return axios.post(url, { user_id, user_profile_url }).then(response => response.data).catch(error => console.log(error));
}
// ############################ For USER Login end #################################


// ############################For create  Db #################################

// export const Newdb = async (dbname) => {
//     const url = `http://localhost:3008/api/newdb`
//     return axios.get(url,{dbname}).then(response => response.data).catch(error => console.log(error));
// }

export const register = async (dbname, org_name, org_country, org_state, org_street, org_currency, org_lang, org_gst, org_contact_name, org_contact_phone, org_contact_email, org_city, org_pin, User_id, fins_year, last_year, startdate, toyear) => {
    const url = `http://localhost:3008/api/insertorg`
    return axios.post(url, { dbname, org_name, org_country, org_state, org_street, org_currency, org_lang, org_gst, org_contact_name, org_contact_phone, org_contact_email, org_city, org_pin, User_id, fins_year, last_year, startdate, toyear }).then(response => response.data).catch(error => console.log(error));
}


export const CreatenewDb = async (dbname) => {
    const url = `http://localhost:3008/api/newdb`
    return axios.post(url, { dbname }).then(response => response.data).catch(error => console.log(error));
}

export const CreateOrgTable = async (dbname, org_name, User_id, fins_year, last_year, startdate, toyear) => {
    const url = `http://localhost:3008/api/Org_table`
    return axios.post(url, { dbname, org_name, User_id, fins_year, last_year, startdate, toyear }).then(response => response.data).catch(error => console.log(error));

}


export const TotalOrganistion = async () => {
    const url = `http://localhost:3008/api/TotalOrganistion`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const showOrganisation = async (org_name) => {
    const url = `http://localhost:3008/api/ShowOrganisation`
    return axios.post(url, { org_name }).then(response => response.data).catch(error => console.log(error));
}

export const updateOrganisation = async (org_name, org_contact_name, org_contact_phone, org_contact_email, org_street, org_city, org_pincode, org_gst, User_id, industry_type, fins_year, report_basic, company_id, tax_id, uploadimage) => {
    const url = `http://localhost:3008/api/UpdateOrganisation`
    return axios.post(url, { org_name, org_contact_name, org_contact_phone, org_contact_email, org_street, org_city, org_pincode, org_gst, User_id, industry_type, fins_year, report_basic, company_id, tax_id, uploadimage }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For create  Db End #################################

// ###################### State api start #############################


export const addstates = async (state_name, country_name, state_code, state_short_name, select_type, User_id) => {
    const url = `http://localhost:3008/api/state`
    return axios.post(url, { state_name, country_name, state_code, state_short_name, select_type, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const getstates = async () => {
    const url = `http://localhost:3008/api/totalstate`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deletestate = async (sno, status) => {
    const url = `http://localhost:3008/api/deletestate`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}
export const showstate = async (sno) => {
    const url = `http://localhost:3008/api/showstate`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updateState = async (sno, country_name, state_name, state_code, state_short_name, select_type, User_id) => {
    const url = `http://localhost:3008/api/editstate`
    return axios.post(url, { sno, country_name, state_name, state_code, state_short_name, select_type, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const showactivestate = async (country) => {
    const url = `http://localhost:3008/api/showactivestate`
    return axios.post(url, { country }).then(response => response.data).catch(error => console.log(error));
}

export const ImportState = async (data, User_id) => {
    const url = `http://localhost:3008/api/importState`
    return axios.post(url, { data, User_id }).then(response => response.data).catch(error => console.log(error));
}
// ###################### state api end #############################


// ###################### Country api start #############################

export const Totalcountry = async () => {
    const url = `http://localhost:3008/api/totalcountry`
    return axios.post(url).then(response => response.data).catch(error => console.log(error));
}
export const Activecountries = async () => {
    const url = `http://localhost:3008/api/activecountries`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCountry = async (User_id, country_name, country_id, country_code, country_phonecode) => {
    const url = `http://localhost:3008/api/insertcountry`
    return axios.post(url, { User_id, country_name, country_id, country_code, country_phonecode }).then(response => response.data).catch(error => console.log(error));
}

export const showcountry = async (sno) => {
    const url = `http://localhost:3008/api/showcountry`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updatecountry = async (sno, User_id, country_name, country_id, country_code, country_phonecode) => {
    const url = `http://localhost:3008/api/updatecountry`
    return axios.post(url, { sno, User_id, country_name, country_id, country_code, country_phonecode }).then(response => response.data).catch(error => console.log(error));
}
export const deletecountry = async (sno, status) => {
    const url = `http://localhost:3008/api/deletecountry`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const ImportCountry = async (data, User_id) => {
    const url = `http://localhost:3008/api/importcountry`
    return axios.post(url, { data, User_id }).then(response => response.data).catch(error => console.log(error));
}

// ###################### Country api end #############################


// ###################### Currency api start #############################

export const Totalcurrency = async (org) => {
    const url = `http://localhost:3008/api/totalcurrency`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const InsertCurrency = async (org, User_id, country_name, country_code, currency_name, currency_code) => {
    const url = `http://localhost:3008/api/insertcurrecy`
    return axios.post(url, { org, User_id, country_name, country_code, currency_name, currency_code }).then(response => response.data).catch(error => console.log(error));
}

export const deleteCurrency = async (org, sno, status) => {
    const url = `http://localhost:3008/api/deletecurrency`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateCurrency = async (org, User_id, sno, country_name, country_code, currency_name, currency_code) => {
    const url = `http://localhost:3008/api/updatecurrency`
    return axios.post(url, { org, User_id, sno, country_name, country_code, currency_name, currency_code }).then(response => response.data).catch(error => console.log(error));
}

export const showCurrency = async (sno, org) => {
    const url = `http://localhost:3008/api/showcurrency`
    return axios.post(url, { sno, org }).then(response => response.data).catch(error => console.log(error));
}

export const ImportCurrency = async (data, org, user_id) => {
    const url = `http://localhost:3008/api/ImportCurrency`
    return axios.post(url, { data, org, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveCurrency = async (org) => {
    const url = `http://localhost:3008/api/activecurrency`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// ###################### Currency api end #############################




// ###################### City api start #############################
export const Totalcity = async () => {
    const url = `http://localhost:3008/api/totalcity`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCity = async (city_id, city_name, state_name, country_name, User_id) => {
    const url = `http://localhost:3008/api/insertcity`
    return axios.post(url, { city_id, city_name, state_name, country_name, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const deleteCity = async (sno, status) => {
    const url = `http://localhost:3008/api/deletecity`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const showCity = async (sno) => {
    const url = `http://localhost:3008/api/showcity`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updateCity = async (sno, city_id, city_name, state_name, country_name, User_id) => {
    const url = `http://localhost:3008/api/updatecity`
    return axios.post(url, { sno, city_id, city_name, state_name, country_name, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const getCity = async (state_name) => {
    const url = `http://localhost:3008/api/getcity`
    return axios.post(url, { state_name }).then(response => response.data).catch(error => console.log(error));
}

export const ImportCity = async (data, User_id) => {
    const url = `http://localhost:3008/api/importcity`
    return axios.post(url, { data, User_id }).then(response => response.data).catch(error => console.log(error));
}

// ###################### City api end #############################

// ###################### Unit api start #############################

export const TotalUnit = async (Token, org) => {
    const url = `http://localhost:3008/api/totalunit`
    return axios.post(url, { org }, { headers: { "Authorization": Token } }).then(response => response.data).catch(error => console.log(error));
}
export const TotalActiveUnit = async (org) => {
    const url = `http://localhost:3008/api/totalactiveunit`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const InsertUnit = async (unit_name, unit_symbol, org, User_id) => {
    const url = `http://localhost:3008/api/insertunit`
    return axios.post(url, { unit_name, unit_symbol, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const showunit = async (sno, Token, org) => {
    const url = `http://localhost:3008/api/showunit`
    return axios.post(url, { sno, org }, { headers: { "Authorization": Token } }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUnit = async (sno, unit_name, unit_symbol, org, User_id) => {
    const url = `http://localhost:3008/api/updateunit`
    return axios.post(url, { sno, unit_name, unit_symbol, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const deleteUnit = async (sno, status, org) => {
    const url = `http://localhost:3008/api/deleteunit`
    return axios.post(url, { sno, status, org }).then(response => response.data).catch(error => console.log(error));
}

export const ImportUnit = async (data, org, User_id) => {
    const url = `http://localhost:3008/api/importunit`
    return axios.post(url, { data, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const Activeunit = async (org) => {
    const url = `http://localhost:3008/api/activeunit`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// ###################### Unit api end #############################


// ###################### Bank api start #############################

export const insertBank = async (account_code, bank_name, account_no, address_line1, address_line2, country, state, city, pincode, ifsc_code, actype, acname, description, org, User_id) => {
    const url = `http://localhost:3008/api/addbank`
    return axios.post(url, { account_code, bank_name, account_no, address_line1, address_line2, country, state, city, pincode, ifsc_code, actype, acname, description, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const totalBank = async (org) => {
    const url = `http://localhost:3008/api/totalbank`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const deleteBank = async (sno, status, org) => {
    const url = `http://localhost:3008/api/deletebank`
    return axios.post(url, { sno, status, org }).then(response => response.data).catch(error => console.log(error));
}
export const showBank = async (sno, org) => {
    const url = `http://localhost:3008/api/showbank`
    return axios.post(url, { sno, org }).then(response => response.data).catch(error => console.log(error));
}
export const updateBank = async (sno, account_code, account_no, type, bank_name, address_line1, address_line2, country, state, city, pincode, ifsc_code, acname, description, org, User_id) => {
    const url = `http://localhost:3008/api/updatebank`
    return axios.post(url, { sno, account_code, account_no, type, bank_name, address_line1, address_line2, country, state, city, pincode, ifsc_code, acname, description, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ImportBank = async (data, org, User_id) => {
    const url = `http://localhost:3008/api/importbank`
    return axios.post(url, { data, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

// ###################### Bank api end #############################


// ###################### User api start #############################
export const TotalUser = async () => {
    const url = `http://localhost:3008/api/totaluser`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertUser = async (employee_name, role, warehouse, username, password,
    email_id, phone, operatemode, customer, reporting_to, designation, two_factor_authentication, user_profile_url, User_id) => {
    const url = `http://localhost:3008/api/insertuser`
    return axios.post(url, {
        employee_name, role, warehouse, username, password, email_id, phone,
        operatemode, customer, reporting_to, designation, two_factor_authentication, user_profile_url, User_id
    }).then(response => response.data).catch(error => console.log(error));
}

export const showuser = async (sno) => {
    const url = `http://localhost:3008/api/showuser`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUser = async (sno, employee_name, role, warehouse, user_name, password,
    email_id, phone, operate_mode, customer, reporting_to, designation, two_factor_authentication, User_id) => {
    const url = `http://localhost:3008/api/updateuser`
    return axios.post(url, {
        sno, employee_name, role, warehouse, user_name, password, email_id, phone,
        operate_mode, customer, reporting_to, designation, two_factor_authentication, User_id
    }).then(response => response.data).catch(error => console.log(error));
}

export const deleteUser = async (sno, status) => {
    const url = `http://localhost:3008/api/deleteuser`
    return axios.post(url, { sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const ImportUser = async (data, org, org_name, User_id) => {
    const url = `http://localhost:3008/api/importuser`
    return axios.post(url, { data, org, org_name, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveUser = async () => {
    const url = `http://localhost:3008/api/activeuser`
    return axios.post(url, {}).then(response => response.data).catch(error => console.log(error));
}

// ###################### User api end      #############################




// ###################### Customer api start #############################

export const TotalCustomers = async (org) => {
    const url = `http://localhost:3008/api/totalcustomer`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteCustomer = async (sno, status, org) => {
    const url = `http://localhost:3008/api/deletecustomer`
    return axios.post(url, { sno, status, org }).then(response => response.data).catch(error => console.log(error));
}

export const AddCustomer = async (org, User_id, mast_id, cust_id, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, currency,
    opening_balance, payment_terms, enable_portal, portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
    billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
    contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark) => {

    const url = `http://localhost:3008/api/addcustomer`
    return axios.post(url, {
        org, User_id, mast_id, cust_id, cust_type, cust_name, company_name, cust_display_name, cust_email, cust_work_phone, cust_phone, skype_detail, designation, department, website, gst_treatment, gstin_uin, pan_no, place_of_supply, tax_preference, exemption_reason, currency,
        opening_balance, payment_terms, enable_portal, portal_language, facebook_url, twitter_url, billing_address_attention, billing_address_country,
        billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, contact_person_name,
        contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark
    }).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustomer = async (sno, org) => {
    const url = `http://localhost:3008/api/showcustomer`
    return axios.post(url, { sno, org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCustomer = async (org, sno, User_id, cust_email, cust_work_phone, cust_phone, contact_person_name, contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark) => {
    const url = `http://localhost:3008/api/updatecustomer`
    return axios.post(url, {
        org, sno, User_id, cust_email, cust_work_phone, cust_phone, contact_person_name, contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark
    }).then(response => response.data).catch(error => console.log(error));
}

// export const CustomerId = async (org) => {
//     const url = `http://localhost:3008/api/customerid`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }
// export const Customername = async (org, cust_id) => {
//     const url = `http://localhost:3008/api/customername`
//     return axios.post(url, { org, cust_id }).then(response => response.data).catch(error => console.log(error));
// }
export const CustomerMastId = async (org) => {
    const url = `http://localhost:3008/api/customermastid`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
// export const CustomerIdmid = async (org, masterid) => {
//     const url = `http://localhost:3008/api/customeridmid`
//     return axios.post(url, { org, masterid }).then(response => response.data).catch(error => console.log(error));
// }



// ######################   id controller
// export const IdcountMaster = async (org, masterid) => {
//     const url = `http://localhost:3008/api/idcountmaster`
//     return axios.post(url, { org, masterid }).then(response => response.data).catch(error => console.log(error));
// }
// export const InsertIdcountmaster = async (org,id_type, masterid,id_count) => {
//     const url = `http://localhost:3008/api/insertidcountmaster`
//     return axios.post(url, { org,id_type, masterid,id_count}).then(response => response.data).catch(error => console.log(error));
// }

// export const UpdateIdcountmaster = async (org, masterid,id_count) => {
//     const url = `http://localhost:3008/api/updateidcountmaster`
//     return axios.post(url, { org, masterid,id_count}).then(response => response.data).catch(error => console.log(error));
// }


// ######################   id controller

export const ImportCustomer = async (data, org, User_id) => {
    const url = `http://localhost:3008/api/ImportCustomer`
    return axios.post(url, { data, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveCustomer = async (org) => {
    const url = `http://localhost:3008/api/activecustomer`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const SelectedCustomer = async (org, cust_id) => {
    const url = `http://localhost:3008/api/selectedcustomer`
    return axios.post(url, { org, cust_id }).then(response => response.data).catch(error => console.log(error));
}



// ###################### Customer and Id controller  api start #############################

// ###################### Vendor api start #############################

export const InsertVendor = async (mast_id, vend_id, vend_name,
    company_name, vend_display_name, vend_email, vend_work_phone, vend_phone, skype_detail, designation, department,
    website, gst_treatment, gstin_uin, pan_no, source_of_supply, currency,
    opening_balance, payment_terms, tds, enable_portal, portal_language, facebook_url, twitter_url,
    billing_address_attention, billing_address_country,
    billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone,
    billing_address_fax, contact_person_name,
    contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark, org, User_id, year) => {

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
        contact_person_department, remark, org, User_id, year
    }).then(response => response.data).catch(error => console.log(error));
}

export const Vendor = async (org) => {
    const url = `http://localhost:3008/api/vendor`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const DeleteVendor = async (sno, status, org) => {
    const url = `http://localhost:3008/api/deletevendor`
    return axios.post(url, { sno, status, org }).then(response => response.data).catch(error => console.log(error));
}

// export const Unique_Cust_id = async (org) => {
//     const url = `http://localhost:3008/api/unique_cust_id`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }
// export const Lastcust_id = async (org) => {
//     const url = `http://localhost:3008/api/lastcust_id`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));

// }

export const showvendor = async (org, sno) => {
    const url = `http://localhost:3008/api/showvendor`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateVendor = async (sno, vend_email, vend_work_phone, vend_phone, contact_person_name,
    contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
    contact_person_department, remark, org, User_id) => {
    const url = `http://localhost:3008/api/updatevendor`
    return axios.post(url, {
        sno, vend_email, vend_work_phone, vend_phone, contact_person_name,
        contact_person_email, contact_person_work_phone, contact_person_phone, contact_person_skype, contact_person_designation,
        contact_person_department, remark, org, User_id
    }).then(response => response.data).catch(error => console.log(error));
}
// export const VendorId = async (org) => {
//     const url = `http://localhost:3008/api/vendorid`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }

export const VendorMastid = async (org) => {
    const url = `http://localhost:3008/api/vendormastid`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// export const TotalVendor = async (org) => {
//     const url = `http://localhost:3008/api/totalvendor`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }

// export const TotalVendId = async (org, mast_id) => {
//     const url = `http://localhost:3008/api/totalvendid`
//     return axios.post(url, { org, mast_id }).then(response => response.data).catch(error => console.log(error));
// }

export const ImportVendor = async (data, org, User_id) => {
    const url = `http://localhost:3008/api/importvendor`
    return axios.post(url, { data, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveVendor = async (org) => {
    const url = `http://localhost:3008/api/activevendor`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveSelectedVendor = async (org, vend_id) => {
    const url = `http://localhost:3008/api/activeselectedvendor`
    return axios.post(url, { org, vend_id }).then(response => response.data).catch(error => console.log(error));
}



export const CustInsertAddress = async (org, User_id, custid, custname, gst_no, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, custaddid) => {

    const url = 'http://localhost:3008/api/insertcustaddress'
    return axios.post(url, { org, User_id, custid, custname, gst_no, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, custaddid }).then(response => response.data).catch(error => console.log(error));
}
export const VendInsertAddress = async (vendid, vend_name, vendaddid, billing_address_gstno, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id) => {
    const url = 'http://localhost:3008/api/insertvendaddress'
    return axios.post(url, { vendid, vend_name, vendaddid, billing_address_gstno, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ShowCustAddress = async (cust_id, org) => {
    const url = 'http://localhost:3008/api/showcustaddress'
    return axios.post(url, { cust_id, org }).then(response => response.data).catch(error => console.log(error));
}

export const ShowVendAddress = async (vend_id, org) => {
    const url = 'http://localhost:3008/api/showvendaddress'
    return axios.post(url, { vend_id, org }).then(response => response.data).catch(error => console.log(error));
}
export const SelectVendAddress = async (vend_name, org) => {
    const url = 'http://localhost:3008/api/selectvendaddress'
    return axios.post(url, { vend_name, org }).then(response => response.data).catch(error => console.log(error));
}
export const Importvendaddress = async (importdata, org, User_id) => {
    const url = 'http://localhost:3008/api/importvendaddress'
    return axios.post(url, { importdata, org, User_id }).then(response => response.data).catch(error => console.log(error));
}


export const DeleteCustAddress = async (sno, status, org) => {
    const url = 'http://localhost:3008/api/deletecustaddress'
    return axios.post(url, { sno, status, org }).then(response => response.data).catch(error => console.log(error));
}
export const SelectCustAddress = async (cust_name, org) => {
    const url = 'http://localhost:3008/api/selectcustaddress'
    return axios.post(url, { cust_name, org }).then(response => response.data).catch(error => console.log(error));
}

export const SelectVendorAddress = async (org, vendor_id) => {
    const url = 'http://localhost:3008/api/selectvendoraddress'
    return axios.post(url, { org, vendor_id }).then(response => response.data).catch(error => console.log(error));
}


export const Importcustaddress = async (importdata, org, User_id) => {
    const url = 'http://localhost:3008/api/importcustaddress'
    return axios.post(url, { importdata, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendAddress = async (sno, status, org) => {
    const url = 'http://localhost:3008/api/deletevendaddress'
    return axios.post(url, { sno, status, org }).then(response => response.data).catch(error => console.log(error));
}
export const CustAddress = async (sno, org) => {
    const url = 'http://localhost:3008/api/custaddress'
    return axios.post(url, { sno, org }).then(response => response.data).catch(error => console.log(error));
}

export const EditCustAddress = async (org, sno, cust_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, User_id) => {
    const url = 'http://localhost:3008/api/updatecustaddress'
    return axios.post(url, { org, sno, cust_id, billing_address_attention, billing_address_country, billing_address_city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const VendAddress = async (sno, org) => {
    const url = 'http://localhost:3008/api/vendoraddress'
    return axios.post(url, { sno, org }).then(response => response.data).catch(error => console.log(error));
}

export const EditVendAddress = async (sno, vendid, vendname, billing_address_gstno, billing_address_attention, billing_address_country, city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id) => {
    const url = 'http://localhost:3008/api/updatevendaddress'
    return axios.post(url, { sno, vendid, vendname, billing_address_gstno, billing_address_attention, billing_address_country, city, billing_address_state, billing_address_pincode, billing_address_phone, billing_address_fax, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const Checkmidvalid = async (importdata, org, tbl_name) => {
    const url = `http://localhost:3008/api/checkmidvalid`
    return axios.post(url, { importdata, org, tbl_name }).then(response => response.data).catch(error => console.log(error));
}

//  ########################## Location api start ###############################

export const totalLocation = async (org) => {
    const url = `http://localhost:3008/api/totallocation`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const addLocation = async (org, Location_id, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2, User_id, fins_year, country, state) => {
    const url = `http://localhost:3008/api/addlocation`
    return axios.post(url, { org, Location_id, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2, User_id, fins_year, country, state }).then(response => response.data).catch(error => console.log(error));
}

export const updateLocation = async (org, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2, location_id, User_id, country, state) => {
    const url = `http://localhost:3008/api/updatelocation`
    return axios.post(url, { org, location_name, gstin_no, contact_name1, contact_name2, contact_phone_no1, contact_phone_no2, location_id, User_id, country, state }).then(response => response.data).catch(error => console.log(error));
}
export const showLocation = async (org, location_id) => {
    const url = `http://localhost:3008/api/ShowLocation`
    return axios.post(url, { org, location_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveLocation = async (org) => {
    const url = `http://localhost:3008/api/activelocation`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// export const LastLocationid = async (org) => {
//     const url = `http://localhost:3008/api/lastlocationid`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }

export const ImportLocationMaster = async (org, datas, User_id) => {
    const url = `http://localhost:3008/api/importlocationmaster`
    return axios.post(url, { org, datas, User_id }).then(response => response.data).catch(error => console.log(error));
}

//  ########################## Location api end ###############################


//  ########################## LocationAddress api start ###############################

export const locationAddress = async (org, location_id) => {
    const url = `http://localhost:3008/api/LocationAddress`
    return axios.post(url, { org, location_id }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateLocationAddress = async (org, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, User_id) => {
    const url = `http://localhost:3008/api/UpdateLocationAddress`
    return axios.post(url, { org, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const InsertLocationAddress = async (org, location_name, gstin_no, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, to_date, User_id) => {
    const url = `http://localhost:3008/api/InsertLocationAddress`
    return axios.post(url, { org, location_name, gstin_no, location_add1, location_add2, location_city, location_state, location_country, from_date, location_id, location_pin, to_date, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ImportLocationAddress = async (org, datas, User_id) => {
    const url = `http://localhost:3008/api/importlocationaddress`
    return axios.post(url, { org, datas, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveLocationAddress = async (org) => {
    const url = `http://localhost:3008/api/activelocationaddress`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Locationstatus = async (org, location_id, status) => {
    const url = `http://localhost:3008/api/locationstatus`
    return axios.post(url, { org, location_id, status }).then(response => response.data).catch(error => console.log(error));
}

//  ########################## LocationAddress api end ###############################


//  ########################## UploadData api start ###############################
export const UploadData = async (data) => {
    const url = `http://localhost:3008/api/FileUpload`
    return axios.post(url, data).then(res => res.data).catch(err => console.log(err))
}

//  ########################## UploadData api end ###############################

//  ########################## Compliance api start ###############################

export const showcompliances = async (org) => {
    const url = `http://localhost:3008/api/Showcompliances`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Compliancesduedate = async (org) => {
    const url = `http://localhost:3008/api/compliancesduedate`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const Insertcompliance = async (org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, user_name) => {
    const url = `http://localhost:3008/api/insertcompliances`
    return axios.post(url, { org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, user_name }).then(response => response.data).catch(error => console.log(error));
}

export const showcompliancesData = async (org, sno) => {
    const url = `http://localhost:3008/api/ShowcompliancesData`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const updatecompliance = async (org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, sno, user_name) => {
    const url = `http://localhost:3008/api/Updatecompliance`
    return axios.post(url, { org, compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, sno, user_name }).then(response => response.data).catch(error => console.log(error));
}
export const UploadDocumentCompliance = async (org, sno, document) => {
    const url = `http://localhost:3008/api/uploaddocumentcompliance`
    return axios.post(url, { org, sno, document }).then(response => response.data).catch(error => console.log(error));
}

export const PendingCompliances = async (org) => {
    const url = `http://localhost:3008/api/pendingcompliances`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdatePendingCompliances = async (due_date, org, remark, sno, UploadLink) => {
    const url = `http://localhost:3008/api/updatependingcompliances`
    return axios.post(url, { due_date, org, remark, sno, UploadLink }).then(response => response.data).catch(error => console.log(error));
}

export const showcompliancesType = async (org) => {
    const url = `http://localhost:3008/api/ShowcompliancesType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Showactivecompliancestype = async (org) => {
    const url = `http://localhost:3008/api/showactivecompliancestype`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Compliancestatus = async (org, sno, status) => {
    const url = `http://localhost:3008/api/compliancestatus`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}
export const ImportCompliances = async (datas, User_id, org) => {
    const url = `http://localhost:3008/api/importcompliances`
    return axios.post(url, { datas, User_id, org }).then(response => response.data).catch(error => console.log(error));
}


export const InsertcomplianceType = async (org, compliance_type, user_name) => {
    const url = `http://localhost:3008/api/InsertcomplianceType`
    return axios.post(url, { org, compliance_type, user_name }).then(response => response.data).catch(error => console.log(error));
}

export const ShowcompliancesTypeselect = async (org, sno) => {
    const url = `http://localhost:3008/api/ShowcompliancesTypeselect`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdatecomplianceType = async (org, compliance_type, user_name, sno) => {
    const url = `http://localhost:3008/api/UpdatecomplianceType`
    return axios.post(url, { org, compliance_type, user_name, sno }).then(response => response.data).catch(error => console.log(error));
}
export const Compliancesstatus = async (org, sno, status) => {
    const url = `http://localhost:3008/api/compliancesstatus`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}

//  ########################## Compliance api end ###############################



//  ########################## Fincialyear api start ###############################

export const Showfincialyear = async (org) => {
    const url = `http://localhost:3008/api/showfincialyear`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const Addfincialyear = async (org, fincialyear, year, from_date, to_date, invoice_ser, voucher_ser, User_id) => {
    const url = `http://localhost:3008/api/addfincialyear`
    return axios.post(url, { org, fincialyear, year, from_date, to_date, invoice_ser, voucher_ser, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateFincialyear = async (org, invoice_ser, voucher_ser, user_id, sno) => {
    const url = `http://localhost:3008/api/updatefincialyear`
    return axios.post(url, { org, invoice_ser, voucher_ser, user_id, sno }).then(response => response.data).catch(error => console.log(error));
}
export const Statusfincialyear = async (org, sno) => {
    const url = `http://localhost:3008/api/statusfincialyear`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}
export const Selectfincialyear = async (org, sno) => {
    const url = `http://localhost:3008/api/selectfincialyear`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Getfincialyearid = async (org) => {
    const url = `http://localhost:3008/api/getfincialyearid`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Updatefinancialcount = async (org, countkey, countvalue) => {
    const url = `http://localhost:3008/api/updatefinancialcount`
    return axios.post(url, { org, countkey, countvalue }).then(response => response.data).catch(error => console.log(error));
}
export const UpdatefinancialTwocount = async (org, countkey, countvalue, countkey2, countvalue2) => {
    const url = `http://localhost:3008/api/updatefinancialtwocount`
    return axios.post(url, { org, countkey, countvalue, countkey2, countvalue2 }).then(response => response.data).catch(error => console.log(error));
}

//  ########################## Fincialyear api END ###############################



//  ########################## Item api start ###############################

export const InsertItems = async (org, item_type, item_name, item_unit, sac_code, hsn_code, major_code_id, major_code, chart_of_account, chartofaccount_id, tax_preference, sales_account, purchase_account, gst_rate, add_user_name) => {
    const url = `http://localhost:3008/api/insertitems`
    return axios.post(url, { org, item_type, item_name, item_unit, sac_code, hsn_code, major_code_id, major_code, chart_of_account, chartofaccount_id, tax_preference, sales_account, purchase_account, gst_rate, add_user_name }).then(response => response.data).catch(error => console.log(error));
}
export const TotalItems = async (org) => {
    const url = `http://localhost:3008/api/totalitems`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const GetItems = async (org, sno) => {
    const url = `http://localhost:3008/api/getItems`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const deleteItems = async (org, sno, status) => {
    const url = `http://localhost:3008/api/deleteitems`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateItems = async (sno, org, item_type, item_name, item_unit, sac_code, hsn_code, major_code_id, major_code, chart_of_account, chartofaccount_id, tax_preference, sales_account, purchase_account, gst_rate, add_user_name) => {
    const url = `http://localhost:3008/api/updateItems`
    return axios.post(url, { sno, org, item_type, item_name, item_unit, sac_code, hsn_code, major_code_id, major_code, chart_of_account, chartofaccount_id, tax_preference, sales_account, purchase_account, gst_rate, add_user_name }).then(response => response.data).catch(error => console.log(error));
}
export const ActiveItems = async (org, major_code) => {
    const url = `http://localhost:3008/api/activeitems`
    return axios.post(url, { org, major_code }).then(response => response.data).catch(error => console.log(error));
}

export const ActivePurchesItems = async (org) => {
    const url = `http://localhost:3008/api/activepurchesitems`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


//  ########################## Item api End ###############################

//  ########################## Charge Code master api Start ###############################

export const ShowChartOfAccount = async (org) => {
    const url = `http://localhost:3008/api/showcoa`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const ChartOfAccountParentAccount = async (account_type_code, org) => {
    const url = `http://localhost:3008/api/parentaccount`
    return axios.post(url, { account_type_code, org }).then(response => response.data).catch(error => console.log(error));
}

export const SelectSubAccountname = async (org, account_type_code) => {
    const url = `http://localhost:3008/api/selectsubaccountname`
    return axios.post(url, { org, account_type_code }).then(response => response.data).catch(error => console.log(error));
}

export const ParentAccountNumber = async (account_type_code, account_name_code, org) => {
    const url = `http://localhost:3008/api/parentaccountNumber`
    return axios.post(url, { account_type_code, account_name_code, org }).then(response => response.data).catch(error => console.log(error));
}

export const AddAccountName = async (account_type_code, account_name, account_name_code, description, org, User_id) => {
    const url = `http://localhost:3008/api/addaccountname`
    return axios.post(url, { account_type_code, account_name, account_name_code, description, org, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const AddSubAccountName = async (account_type_code, account_name_code, org) => {
    const url = `http://localhost:3008/api/addsubaccountname`
    return axios.post(url, { account_type_code, account_name_code, org }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateSubAccountName = async (account_sub_name, account_sub_name_code, description, account_type_code, account_name_code, org, User_id) => {
    const url = `http://localhost:3008/api/updatesubaccountname`
    return axios.post(url, { account_sub_name, account_sub_name_code, description, account_type_code, account_name_code, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const AddNewSubAccountName = async (account_sub_name, account_sub_name_code, description, account_type_code, account_name_code, org, User_id) => {
    const url = `http://localhost:3008/api/addnewsubaccountname`
    return axios.post(url, { account_sub_name, account_sub_name_code, description, account_type_code, account_name_code, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const Insertaccounttype = async (org, account_type, account_type_code, accountTypedesc, User_id) => {
    const url = `http://localhost:3008/api/insertaccounttype`
    return axios.post(url, { org, account_type, account_type_code, accountTypedesc, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateAccountName = async (account_type, account_type_code, accountTypedesc, org, uniqueID, User_id) => {
    const url = `http://localhost:3008/api/updateaccountname`
    return axios.post(url, { account_type, account_type_code, accountTypedesc, org, uniqueID, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const TotalAccountName = async (org) => {
    const url = `http://localhost:3008/api/totalaccountname`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const AccountnameStatus = async (org, status, account_type_code) => {
    const url = `http://localhost:3008/api/accountnamestatus`
    return axios.post(url, { org, status, account_type_code }).then(response => response.data).catch(error => console.log(error));
}
export const SelectAccountName = async (org, account_type_code) => {
    const url = `http://localhost:3008/api/selectaccountname`
    return axios.post(url, { org, account_type_code }).then(response => response.data).catch(error => console.log(error));
}

export const SelectSubAcconameByType = async (org, account_type) => {
    const url = `http://localhost:3008/api/selectsubacconameytype`
    return axios.post(url, { org, account_type }).then(response => response.data).catch(error => console.log(error));
}

export const ImportAccountName = async (datas, org, User_id) => {
    const url = `http://localhost:3008/api/importaccountname`
    return axios.post(url, { datas, org, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ActiveAccountname = async (org) => {
    const url = `http://localhost:3008/api/activeaccountname`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

//  ########################## Charge Code master api End ###############################

// ###########################  AccountInfo api start ############################

// export const AllAccountInfo = async (org) => {
//     const url = `http://localhost:3008/api/allaccountinfo`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }

// export const AllAccountsalesInfo = async (org) => {
//     const url = `http://localhost:3008/api/allaccountsalesinfo`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }

// export const AllAccountpurchaseInfo = async (org) => {
//     const url = `http://localhost:3008/api/allaccountpurchaseinfo`
//     return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
// }
// export const AccountInfoStatus = async (org, status, sno) => {
//     const url = `http://localhost:3008/api/accountinfostatus`
//     return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
// }
// export const InsertAccountInfo = async (org, account_info_name, account_info_type, User_id) => {
//     const url = `http://localhost:3008/api/insertaccountinfo`
//     return axios.post(url, { org, account_info_name, account_info_type, User_id }).then(response => response.data).catch(error => console.log(error));
// }
// export const SelectAccountInfo = async (org, sno) => {
//     const url = `http://localhost:3008/api/selectaccountinfo`
//     return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
// }
// export const UpdateAccountInfo = async (org, sno, account_info_name, account_info_type, User_id) => {
//     const url = `http://localhost:3008/api/updateaccountinfo`
//     return axios.post(url, { org, sno, account_info_name, account_info_type, User_id }).then(response => response.data).catch(error => console.log(error));
// }

// export const Importaccountinfo = async (datas, org, User_id) => {
//     const url = `http://localhost:3008/api/importaccountinfo`
//     return axios.post(url, { datas, org, User_id }).then(response => response.data).catch(error => console.log(error));
// }

// ###########################  AccountInfo api end ############################


export const ShowGlCode = async (org) => {
    const url = `http://localhost:3008/api/showglcode`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const GlSubCode = async (org, glCode) => {
    const url = `http://localhost:3008/api/glsubcode`
    return axios.post(url, { org, glCode }).then(response => response.data).catch(error => console.log(error));
}

export const InsertGlSubCode = async (org, glCode, SubCode, charge_code, company_id, User_id) => {
    const url = `http://localhost:3008/api/insertglsubcode`
    return axios.post(url, { org, glCode, SubCode, charge_code, company_id, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ShowTotalSubCode = async (org) => {
    const url = `http://localhost:3008/api/showtotalsubcode`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const SubCodeStatus = async (org, status, sno) => {
    const url = `http://localhost:3008/api/subcodestatus`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetSubCodeDetails = async (org, sno) => {
    const url = `http://localhost:3008/api/getsubcodedetails`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateSubCodeDetails = async (org, charge_code, sub_code, gl_code, sno, company_id, User_id) => {
    const url = `http://localhost:3008/api/updatesubcodedetails`
    return axios.post(url, { org, charge_code, sub_code, gl_code, sno, company_id, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ImportSubcode = async (data, org, User_id) => {
    const url = `http://localhost:3008/api/importsubcode`
    return axios.post(url, { data, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const TotalAccountMinorCode = async (org) => {
    const url = `http://localhost:3008/api/totalaccountminorcode`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AccountMinorCodeStatus = async (org, status, sno) => {
    const url = `http://localhost:3008/api/accountminorcodestatus`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}
export const GetAccountMinorCode = async (org, sno) => {
    const url = `http://localhost:3008/api/getaccountminorcode`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateAccountMinorCode = async (org, sno, account_name, User_id) => {
    const url = `http://localhost:3008/api/updateaccountminorcode`
    return axios.post(url, { org, sno, account_name, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveAccountMinorCode = async (org) => {
    const url = `http://localhost:3008/api/activeaccountminorcode`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
// 
export const ImportAccountMinorCode = async (org, datas, User_id) => {
    const url = `http://localhost:3008/api/importaccountminorcode`
    return axios.post(url, { org, datas, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const TotalChartOfAccount = async (org) => {
    const url = `http://localhost:3008/api/totalchartofaccount`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const ChartOfAccountStatus = async (org, status, sno) => {
    const url = `http://localhost:3008/api/chartofaccountstatus`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetChartOfAccount = async (org, sno) => {
    const url = `http://localhost:3008/api/getchartofaccount`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateChartOfAccount = async (org, sno, account_sub_name, User_id) => {
    const url = `http://localhost:3008/api/updatechartofaccount`
    return axios.post(url, { org, sno, account_sub_name, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ImportChartofAccount = async (datas, org, User_id) => {
    const url = `http://localhost:3008/api/importchartofaccount`
    return axios.post(url, { datas, org, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const CurrencyAdjustment = async (org, currency) => {
    const url = `http://localhost:3008/api/addcurrencyadjust`
    return axios.post(url, { org, currency }).then(response => response.data).catch(error => console.log(error));

}
export const ActiveChartofAccountname = async (org, account_sub_name) => {
    const url = `http://localhost:3008/api/activechartofaccountname`
    return axios.post(url, { org, account_sub_name }).then(response => response.data).catch(error => console.log(error));

}


// ###########################  PaymentTerm api start ############################

export const TotalPaymentTerm = async (org) => {
    const url = `http://localhost:3008/api/totalpaymentterm`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeletePaymentTerm = async (org, status, sno) => {
    const url = `http://localhost:3008/api/deletepaymentterm`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertPaymentTerm = async (org, term, term_days, User_id) => {
    const url = `http://localhost:3008/api/insertpaymentterm`
    return axios.post(url, { org, term, term_days, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const ShowPaymentTerm = async (org, sno) => {
    const url = `http://localhost:3008/api/showpaymentterm`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const updatePaymentterm = async (sno, org, term, term_days, User_id) => {
    const url = `http://localhost:3008/api/updatepaymentterm`
    return axios.post(url, { sno, org, term, term_days, User_id }).then(response => response.data).catch(error => console.log(error));
}
export const ActivePaymentTerm = async (org) => {
    const url = `http://localhost:3008/api/activepaymentterm`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}



// ###########################  PaymentTerm api end ############################


// ###########################  Charge Code api start ############################



// export const AddChargecodeapi = async (org, description, short_name, nature, major_code, chartofaccount, activity, sacHsn, gst_rate, User_id, major_code_val) => {
//     const url = `http://localhost:3008/api/addchargecode`
//     return axios.post(url, { org, description, short_name, nature, major_code, chartofaccount, activity, sacHsn, gst_rate, User_id, major_code_val }).then(response => response.data).catch(error => console.log(error));
// }

// export const ActiveChargeCodeMajor = async (org,major_code_id) => {
//     const url = `http://localhost:3008/api/activechargecodemajor`
//     return axios.post(url, { org,major_code_id }).then(response => response.data).catch(error => console.log(error));
// }


// ###########################  Charge Code api End ############################



// ###########################  CRM Master api Start ############################


export const InsertCrm = async (org, user_name, type, cust_vend, User_id, from_date, to_date) => {
    const url = `http://localhost:3008/api/insertcrm`
    return axios.post(url, { org, user_name, type, cust_vend, User_id, from_date, to_date }).then(response => response.data).catch(error => console.log(error));
}

export const TotalCrm = async (org) => {
    const url = `http://localhost:3008/api/totalcrm`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const DeleteCrm = async (org, sno, status) => {
    const url = `http://localhost:3008/api/deletecrm`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}


export const GetCrm = async (org, sno) => {
    const url = `http://localhost:3008/api/getcrm`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateCrm = async (sno, org, user_name, type, cust_vend, User_id, from_date) => {
    const url = `http://localhost:3008/api/updatecrm`
    return axios.post(url, { sno, org, user_name, type, cust_vend, User_id, from_date }).then(response => response.data).catch(error => console.log(error));
}

// ###########################  CRM Master api END ############################

// ############################For Invoice api Start #################################

export const InsertInvoice = async (org, fin_year, invoice_no, squence_no, invoice_date, order_no, invoice_amt, user_id, periodfrom, periodto, major, location, custid, billsubtotal,
    total_tax, cust_locationid, remark, flagsave, location_name, consignee, cust_family, cgst_amt, sgst_amt, utgst_amt, igst_amt, taxable_amt, currency_type,
    payment_term, due_date, User_id, custaddrs, custAddgst, destination, origin) => {
    const url = `http://localhost:3008/api/insertinvoice`
    return axios.post(url, {
        org, fin_year, invoice_no, squence_no, invoice_date, order_no, invoice_amt, user_id, periodfrom, periodto, major, location, custid, billsubtotal,
        total_tax, cust_locationid, remark, flagsave, location_name, consignee, cust_family, cgst_amt, sgst_amt, utgst_amt, igst_amt, taxable_amt, currency_type,
        payment_term, due_date, User_id, custaddrs, custAddgst, destination, origin
    }).then(response => response.data).catch(error => console.log(error));
}

export const FilterInvoice = async (org, startDate, lastDate, custid, locationid) => {
    const url = `http://localhost:3008/api/filterinvoice`
    return axios.post(url, { org, startDate, lastDate, custid, locationid }).then(response => response.data).catch(error => console.log(error));
}

export const GetInvoice = async (org, invoiceno) => {
    console.log(org, invoiceno)
    const url = `http://localhost:3008/api/getinvoice`
    return axios.post(url, { org, invoiceno }).then(response => response.data).catch(error => console.log(error));
}
export const GetSaveInvoice = async (org) => {
    const url = `http://localhost:3008/api/getsaveinvoice`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}



// ###########################  For Invoice api End ############################

// ############################ For InvoiceSub api Start #################################

export const InsertInvoiceSub = async (org, fin_year, invoice_no, major, minor, revgl_code, billing_code, quantity, rate, unit, amount, consignee, city, custid, cust_locationid, taxable, cgst_rate, sgst_rate, utgst_rate, igst_rate, cgst_amt, sgst_amt, utgst_amt, igst_amt, User_id) => {
    const url = `http://localhost:3008/api/insertsubinvoice`
    return axios.post(url, { org, fin_year, invoice_no, major, minor, revgl_code, billing_code, quantity, rate, unit, amount, consignee, city, custid, cust_locationid, taxable, cgst_rate, sgst_rate, utgst_rate, igst_rate, cgst_amt, sgst_amt, utgst_amt, igst_amt, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetSubInvoice = async (org, invoiceno) => {
    const url = `http://localhost:3008/api/getsubinvoice`
    return axios.post(url, { org, invoiceno }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For InvoiceSub api END #################################


// ############################ For 2FAuth api Start #################################

export const OTPVerification = async (phoneno, otp) => {
    const url = `http://localhost:3008/sendotp`
    return axios.post(url, { phoneno, otp }).then(response => response.data).catch(error => console.log(error));
}

export const LoginLogs = async (user_id, user_name, comp_name, org_db_name) => {
    const url = `http://localhost:3008/api/loginlogs`
    return axios.post(url, { user_id, user_name, comp_name, org_db_name }).then(response => response.data).catch(error => console.log(error));
}

export const LogoutLogs = async (user_id, org_db_name) => {
    const url = `http://localhost:3008/api/logoutlogs`
    return axios.post(url, { user_id, org_db_name }).then(response => response.data).catch(error => console.log(error));
}


export const Login2fa = async (email, org) => {
    const url = `http://localhost:3008/api/Twofa`
    return axios.post(url, { email, org }).then(response => response.data).catch(error => console.log(error));
}

export const Verify2fa = async (secret, otp, userid, org, userAgent) => {
    const url = `http://localhost:3008/api/VerifyTwo`
    return axios.post(url, { secret, otp, userid, org, userAgent }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For 2FAuth api END #################################

// ############################ For Employee api Start #################################

export const TotalEmployee = async (org) => {
    const url = `http://localhost:3008/api/totalemployee`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const deleteEmployee = async (org, sno, status) => {
    const url = `http://localhost:3008/api/deleteemployee`
    return axios.post(url, { org, sno, status }).then(response => response.data).catch(error => console.log(error));
}

export const InsertEmployee = async (org, emp_name, wh, emp_id, User_id) => {
    const url = `http://localhost:3008/api/insertemployee`
    return axios.post(url, { org, emp_name, wh, emp_id, User_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetEmployee = async (org, sno) => {
    const url = `http://localhost:3008/api/getemployee`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateEmployee = async (sno, org, emp_name, wh, emp_id, User_id) => {
    const url = `http://localhost:3008/api/updateemployee`
    return axios.post(url, { sno, org, emp_name, wh, emp_id, User_id }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For Employee api End #################################


// ############################ For Purchases Bill api Start #################################

export const InsertBill = async (org, vourcher_no, voucher_date, vend_name, location, bill_no, bill_date, bill_amt, total_bill_amt, payment_term, due_date, amt_paid, amt_balance, amt_booked, tds_head, tds_ctype, tds_per, tds_amt, taxable_amt, non_taxable_amt, expense_amt, remarks, fins_year, cgst_amt, sgst_amt, igst_amt, userid, vendor_id, bill_url, flagsave) => {
    const url = `http://localhost:3008/api/insertbill`
    return axios.post(url, { org, vourcher_no, voucher_date, vend_name, location, bill_no, bill_date, bill_amt, total_bill_amt, payment_term, due_date, amt_paid, amt_balance, amt_booked, tds_head, tds_ctype, tds_per, tds_amt, taxable_amt, non_taxable_amt, expense_amt, remarks, fins_year, cgst_amt, sgst_amt, igst_amt, userid, vendor_id, bill_url, flagsave }).then(response => response.data).catch(error => console.log(error));
}

export const InsertVendorSubInvoice = async (org, voucher_no, voucher_date, bill_date, bill_no, vend_id, vend_name, location, item_name, emp_name, glcode, samt, qty,
    rate, amt, unit, file_no, deduction, gst_rate, sac_hsn, net_amt, remarks, cost_centre, fin_year, userid) => {
    const url = `http://localhost:3008/api/insertvendorsubinvoice`
    return axios.post(url, {
        org, voucher_no, voucher_date, bill_date, bill_no, vend_id, vend_name, location, item_name, emp_name, glcode, samt, qty,
        rate, amt, unit, file_no, deduction, gst_rate, sac_hsn, net_amt, remarks, cost_centre, fin_year, userid
    }).then(response => response.data).catch(error => console.log(error));
}

export const FilterBillReport = async (org, startDate, lastDate, vendid) => {
    console.log('api', org, startDate, lastDate, vendid)
    const url = `http://localhost:3008/api/filterbillreport`
    return axios.post(url, { org, startDate, lastDate, vendid }).then(response => response.data).catch(error => console.log(error));
}

export const GetSaveBill = async (org) => {
    const url = `http://localhost:3008/api/GetSaveBill`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For Purchases Bill api End #################################


// ############################ For Role api Start #################################


export const AddUserRole = async (org, roles,role_id, description, customer_view, customer_create, customer_edit, customer_delete, vendor_view, vendor_create, vendor_edit, vendor_delete, items_view, items_create, items_edit, items_delete, banking_view,
    banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete, bills_view, bills_create, bills_edit, bills_delete, chartof_accounts_view, chartof_accounts_create, chartof_accounts_edit,
    chartof_accounts_delete, users_view, users_create, users_edit, users_delete, payment_terms_view, payment_terms_create, payment_terms_edit, payment_terms_delete, user_id) => {

    console.log(org, roles,role_id, description, customer_view, customer_create, customer_edit, customer_delete, vendor_view, vendor_create, vendor_edit, vendor_delete, items_view, items_create, items_edit, items_delete, banking_view,
        banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete, bills_view, bills_create, bills_edit, bills_delete, chartof_accounts_view, chartof_accounts_create, chartof_accounts_edit,
        chartof_accounts_delete, users_view, users_create, users_edit, users_delete, payment_terms_view, payment_terms_create, payment_terms_edit, payment_terms_delete, user_id)

    const url = `http://localhost:3008/api/adduserrole`
    return axios.post(url, {
        org, roles,role_id, description, customer_view, customer_create, customer_edit, customer_delete, vendor_view, vendor_create, vendor_edit, vendor_delete, items_view, items_create, items_edit, items_delete, banking_view,
        banking_create, banking_edit, banking_delete, invoice_view, invoice_create, invoice_edit, invoice_delete, bills_view, bills_create, bills_edit, bills_delete, chartof_accounts_view, chartof_accounts_create, chartof_accounts_edit,
        chartof_accounts_delete, users_view, users_create, users_edit, users_delete, payment_terms_view, payment_terms_create, payment_terms_edit, payment_terms_delete, user_id
    }).then(response => response.data).catch(error => console.log(error));
}

// ############################ For Role api Start #################################
