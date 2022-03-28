import axios from 'axios';

export const register = async (org_name, org_country, org_state, org_street1, org_street2, org_city, org_pin, org_currency, org_lang, org_timezone, org_gst) => {
    const url = `${process.env.REACT_APP_APIURL}/org`
    return axios.post(url, {org_name, org_country, org_state, org_street1, org_street2, org_city, org_pin, org_currency, org_lang, org_timezone, org_gst}).then(response => response.data).catch(error => console.log(error));
}
export const addstates = async (state_name, country_name, state_code, state_short_name, select_type) => {
    const url = `${process.env.REACT_APP_APIURL}/api/state`
    return axios.post(url, {state_name, country_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}
export const getstates = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/Totalstate`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deletestate = async (sno,status) => {
    const url = `${process.env.REACT_APP_APIURL}/api/deleteState`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showstate = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/showstate`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateState = async (sno, state_name, country_name, state_code, state_short_name, select_type) => {
    const url = `${process.env.REACT_APP_APIURL}/api/EditState`
    return axios.post(url, {sno, state_name, country_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcountry = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/Totalcountry`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCountry = async (country_name, country_id, country_code, country_phonecode) => {
    const url = `${process.env.REACT_APP_APIURL}/api/InsertCountry`
    return axios.post(url, {country_name, country_id, country_code, country_phonecode}).then(response => response.data).catch(error => console.log(error));
}

export const showcountry = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/Showcountry`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updatecountry = async (sno, country_name, country_id, country_code, country_phonecode) => {
    const url = `${process.env.REACT_APP_APIURL}/api/Updatecountry`
    return axios.post(url, {sno, country_name, country_id, country_code, country_phonecode}).then(response => response.data).catch(error => console.log(error));
}
export const deletecountry = async (sno,status) => {
    const url = `${process.env.REACT_APP_APIURL}/api/deleteCountry`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const currency = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/currency`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const InsertCurrency = async (country_name, country_code, currency_name, currency_code ) => {
    const url = `${process.env.REACT_APP_APIURL}/api/InsertCurrecy`
    return axios.post(url, {country_name, country_code, currency_name, currency_code}).then(response => response.data).catch(error => console.log(error));
}

export const deleteCurrency = async (sno,status) => {
    const url = `${process.env.REACT_APP_APIURL}/api/deleteCurrency`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const UpdateCurrency = async (sno, country_name, country_code, currency_name, currency_code ) => {
    const url = `${process.env.REACT_APP_APIURL}/api/UpdateCurrency`
    return axios.post(url, {sno, country_name, country_code, currency_name, currency_code}).then(response => response.data).catch(error => console.log(error));
}

export const showCurrency = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/ShowCurrency`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const Totalcity = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/Totalcity`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const InsertCity = async (city_id, city_name, state_id, state_code, country_id, country_code) => {
    const url = `${process.env.REACT_APP_APIURL}/api/InsertCity`
    return axios.post(url, {city_id, city_name, state_id, state_code, country_id, country_code}).then(response => response.data).catch(error => console.log(error));
}

export const deleteCity = async (sno,status) => {
    const url = `${process.env.REACT_APP_APIURL}/api/DeleteCity`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const showCity = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/showcity`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateCity = async (sno, city_id, city_name, state_id, state_code, country_id, country_code) => {
    const url = `${process.env.REACT_APP_APIURL}/api/UpdateCity`
    return axios.post(url, {sno, city_id, city_name, state_id, state_code, country_id, country_code}).then(response => response.data).catch(error => console.log(error));
}




export const TotalUnit = async () => {
    const url = `http://localhost:3008/api/TotalUnit`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Unit = async (unit_name,unit_symbol) => {
    const url = `http://localhost:3008/api/Unit`
    return axios.post(url, {unit_name, unit_symbol}).then(response => response.data).catch(error => console.log(error));
}

export const showunit = async (sno) => {
    const url = `http://localhost:3008/api/showunit`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const UpdateUnit = async (sno, unit_name, unit_symbol) => {
    const url = `http://localhost:3008/api/UpdateUnit`
    return axios.post(url, {sno, unit_name, unit_symbol}).then(response => response.data).catch(error => console.log(error));
}

export const deleteUnit = async (sno,status) => {
    const url = `http://localhost:3008/api/deleteUnit`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}

export const insertBank = async (bank_id, subcode,bank_name, account_no, address_line1, address_line2, branch, state,city,pincode,ifsc_code,glcode,ac_type,acname,company_id) => {
    const url = `${process.env.REACT_APP_APIURL}/api/AddBank`
    return axios.post(url, {bank_id, subcode,bank_name, account_no, address_line1, address_line2, branch, state,city,pincode,ifsc_code,glcode,ac_type,acname,company_id}).then(response => response.data).catch(error => console.log(error));
}
export const totalBank = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/TotalBank`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deleteBank = async (sno,status) => {
    const url = `${process.env.REACT_APP_APIURL}/api/DeleteBank`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showBank = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/ShowBank`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}
export const updateBank = async (sno, bank_id, subcode,account_no, ac_type,bank_name, address_line1, address_line2, branch, state, city, pincode, ifsc_code, glcode, acname, company_id) => {
    const url = `${process.env.REACT_APP_APIURL}/api/UpdateBank`
    return axios.post(url, {sno, bank_id, subcode, bank_name ,account_no, ac_type, address_line1, address_line2, branch, state, city, pincode, ifsc_code, glcode, ac_type, acname, company_id}).then(response => response.data).catch(error => console.log(error));
}

