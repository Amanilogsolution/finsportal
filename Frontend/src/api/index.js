import axios from 'axios';

export const register = async (org_name, org_country, org_state, org_street1, org_street2, org_city, org_pin, org_currency, org_lang, org_timezone, org_gst) => {
    const url = `${process.env.REACT_APP_APIURL}/org`
    return axios.post(url, {org_name, org_country, org_state, org_street1, org_street2, org_city, org_pin, org_currency, org_lang, org_timezone, org_gst}).then(response => response.data).catch(error => console.log(error));
}
export const addstates = async (state_name, country_name, state_code, state_short_name, select_type) => {
    console.log(state_name, country_name, state_code, state_short_name, select_type)
    const url = `${process.env.REACT_APP_APIURL}/api/state`
    return axios.post(url, {state_name, country_name, state_code, state_short_name, select_type}).then(response => response.data).catch(error => console.log(error));
}
export const getstates = async () => {
    const url = `${process.env.REACT_APP_APIURL}/api/Totalstate`
    console.log(url)
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const deletestate = async (sno,status) => {
    console.log(sno,status)
    const url = `${process.env.REACT_APP_APIURL}/api/deleteState`
    return axios.post(url, {sno,status}).then(response => response.data).catch(error => console.log(error));
}
export const showstate = async (sno) => {
    const url = `${process.env.REACT_APP_APIURL}/api/showstate`
    return axios.post(url, {sno}).then(response => response.data).catch(error => console.log(error));
}

export const updateState = async (sno, state_name, country_name, state_code, state_short_name, select_type) => {
    console.log(sno, state_name, country_name, state_code, state_short_name, select_type)
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