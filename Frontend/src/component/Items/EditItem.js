import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { GetItems, UpdateItems, ActiveAccountMinorCode, SelectSubAccountname, TotalActiveUnit } from "../../api";
import LoadingPage from '../loadingPage/loadingPage';
import AlertsComp from '../AlertsComp';

const EditItem = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [majorcodelist, setMajorcodelist] = useState([{}])
    const [chartofaccountlist, setChartofaccountlist] = useState([]);
    const [type, setType] = useState();
    const [unitdata, setUnitdata] = useState([]);
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const result = await GetItems(org, localStorage.getItem('ItemsSno'))
            setData(result)

            const result2 = await ActiveAccountMinorCode(org)
            setMajorcodelist(result2)
            const chartofaccount = await SelectSubAccountname(org, result.minor_code_id)
            setChartofaccountlist(chartofaccount)
            const result1 = await TotalActiveUnit(org);
            setUnitdata(result1)
            setLoading(true)

            if (result.item_type === 'Goods') {
                document.getElementById('typeGoods').checked = true
                document.getElementById('hsncodetoogle').style.display = 'flex';
                setType('Goods')
            } else {
                document.getElementById('typeService').checked = true
                document.getElementById('saccodetoogle').style.display = 'flex';
                setType('Service')
            }
            if (result.purchase_account === 'Purchase' && result.sales_account === 'Sales') {
                document.getElementById('item_name_purchase').checked = true
                document.getElementById('item_name_sales').checked = true
            } else if (result.purchase_account === 'Purchase') {
                document.getElementById('item_name_purchase').checked = true
            } else if (result.sales_account === 'Sales') {
                document.getElementById('item_name_sales').checked = true
            }


            if (result.tax_preference === "Taxable") {
                document.getElementById('defaulttax').style.display = "flex";
            } else {
                document.getElementById('defaulttax').style.display = "none";
            }

            if (result.glcode.length > 0) {
                document.getElementById('checkboxgst').checked = true
            }


        }
        fetchdata()
    }, [])


    const getchartofaccountdata = async (e) => {
        data.chart_of_account = 'Select Chart of Account';
        data.chart_of_acct_id = '';
        const minor_val = e.target.value;
        const minor_arr_val = minor_val.split('^')
        const chartofaccount = await SelectSubAccountname(localStorage.getItem('Organisation'), minor_arr_val[1])
        setChartofaccountlist(chartofaccount)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(false)

        const Name = document.getElementById("name").value;
        const Unit = document.getElementById("unit").value;
        const hsncode = type === 'Goods' ? document.getElementById("hsncode").value : ''
        const saccode = type === 'Service' ? document.getElementById("saccode").value : ''

        const minor_val = document.getElementById('major_code')
        const minor_arr_val = minor_val.value.split('^')

        const minor_code = minor_val.options[minor_val.selectedIndex].textContent;
        const major_code_id = minor_arr_val[0];
        const minor_code_id = minor_arr_val[1];

        const chartofacc = document.getElementById('chartofaccount');
        const chartofaccount_id = chartofacc.value;
        const chartofaccount = chartofacc.options[chartofacc.selectedIndex].textContent;
        const taxpreference = document.getElementById("taxpreference").value;
        const Purchase = document.getElementById("item_name_purchase").checked === true ? 'Purchase' : '';
        const Sales = document.getElementById("item_name_sales").checked === true ? 'Sales' : '';
        const gstrate = document.getElementById("gstrate").value;
        const sno = localStorage.getItem('ItemsSno');
        const org = localStorage.getItem('Organisation');
        const user_id = localStorage.getItem('User_id');

        if (!Name || !minor_code_id || !chartofaccount_id || !taxpreference) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const checkbox = document.getElementById('checkboxgst').checked || false
            let glcode = '';
            if (checkbox) { glcode = data.glcode }
            const result = await UpdateItems(sno, org, type, Name, Unit, hsncode, saccode, minor_code, major_code_id, minor_code_id, chartofaccount_id, chartofaccount, taxpreference, Purchase, Sales, gstrate, glcode, user_id);
            setLoading(true)
            if (result === "updated") {
                localStorage.removeItem('ItemsSno');
                setAlertObj({ type: 'success', text: 'Item Updated', url: '/ShowItem' })
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }

    }

    const handletaxprefrnce = (e) => {
        if (e.target.value === 'Taxable') {
            document.getElementById('defaulttax').style.display = "flex";
        }
        else if (e.target.value === 'Non-Taxable') {
            document.getElementById('defaulttax').style.display = "none";
        }
        else {
            document.getElementById('defaulttax').style.display = "none";
        }
    }

    const handletype = (e) => {
        const type = e.target.value;
        setType(type);
        if (type === 'Goods') {
            document.getElementById('hsncodetoogle').style.display = "flex";
            document.getElementById('saccodetoogle').style.display = "none";
        }
        else {
            document.getElementById('hsncodetoogle').style.display = "none";
            document.getElementById('saccodetoogle').style.display = "flex";
        }
    }

    const handleGst_rate = (e) => {
        if (e.target.value > 100) return false;
        setData({ ...data, gst_rate: e.target.value })
    }
    return (
        <div className="wrapper">
            <Header />
            {
                loading ?
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <h3 className="pt-3 ml-5">Edit Item</h3>
                            <div className="card w-100 mt-1">
                                <article className="card-body">
                                    <form autoComplete='off'>
                                        <div className="form-row" >
                                            <label htmlFor="type" className="col-md-2 col-form-label font-weight-normal"  >Type</label>
                                            <div className="col form-group " onChange={handletype} >
                                                <input className="col-mt-2" type="radio" id="typeGoods" name="itemtype" value='Goods' />  Goods  &nbsp; &nbsp;
                                                <input className="col-mt-2" type="radio" id="typeService" name="itemtype" value='Service' />  Service
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="major_code" className="col-md-2 col-form-label font-weight-normal">Minor Code</label>
                                            <div className="col form-group">
                                                <select className="form-control col-md-4" id='major_code' onChange={getchartofaccountdata}>
                                                    <option value={`${data.major_code_id}^${data.minor_code_id}`} hidden>{data.minor_code}</option>
                                                    {
                                                        majorcodelist.map((item, index) =>
                                                            <option key={index} value={`${item.account_type_code}^${item.account_name_code}`}>{item.account_name}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="chartofaccount" className="col-md-2 col-form-label font-weight-normal">Chart of Account</label>
                                            <div className="col form-group">
                                                <select className="form-control col-md-4" id='chartofaccount'   >
                                                    <option value={data.chart_of_acct_id} hidden>{data.chart_of_account}</option>
                                                    {
                                                        chartofaccountlist.map((item, index) =>
                                                            <option key={index} value={item.account_sub_name_code}>{item.account_sub_name}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <input type="text" className="form-control col-md-4" id='name' defaultValue={data.item_name} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal"></label>
                                            <div className="col form-group">
                                                <span className='text-danger '>Make this a sub-account</span>
                                                <input type="checkbox" id="checkboxgst" className='ml-4' style={{ height: '18px', width: '18px' }} />
                                            </div>
                                        </div>
                                        <div className="form-row" >
                                            <label htmlFor="unit" className="col-md-2 col-form-label font-weight-normal " >Unit</label>
                                            <div className="col form-group">
                                                <select className="form-control col-md-4" id="unit">
                                                    <option value={data.item_unit} hidden>{data.item_unit}</option>
                                                    {
                                                        unitdata.map((item, index) => (
                                                            <option value={item.unit_symbol} key={index} >{item.unit_name}&nbsp;&nbsp;({item.unit_symbol})</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row" id="hsncodetoogle" style={{ display: "none" }}>
                                            <label htmlFor="hsncode" className="col-md-2 col-form-label font-weight-normal" >HSN CODE</label>
                                            <div className="col form-group">
                                                <input className="form-control col-md-4" type="text" id="hsncode" defaultValue={data.hsn_code} />
                                            </div>
                                        </div>
                                        <div className="form-row" id="saccodetoogle" style={{ display: "none" }} >
                                            <label htmlFor="saccode" className="col-md-2 col-form-label font-weight-normal" >SAC</label>
                                            <div className="col form-group">
                                                <input className="form-control col-md-4" type="text" id="saccode" defaultValue={data.sac_code} />
                                            </div>
                                        </div>
                                        <div className="form-row" >
                                            <label htmlFor="taxpreference" className="col-md-2 col-form-label font-weight-normal " >Tax Preference<span style={{ color: "rgba(210,0,0,0.7)" }}> *</span></label>
                                            <div className="col form-group">
                                                <select className="form-control col-md-4" id="taxpreference" onChange={handletaxprefrnce}>
                                                    <option value={data.tax_preference} hidden>{data.tax_preference}</option>
                                                    <option value='Taxable' >Taxable</option>
                                                    <option value='Non-Taxable' >Non-Taxable</option>
                                                    <option value='Out-of-Scope' >Out of Scope</option>
                                                    <option value='Non-GST Supply' >Non-GST Supply </option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row col-md-6">
                                            <div className="form-group d-flex col-md-4" ></div>
                                            <div className="form-group " style={{ marginTop: "10px" }} >
                                                <input className="form-control" type="checkbox" id="item_name_purchase" style={{ height: "16px", width: "16px" }} />
                                            </div>
                                            <label htmlFor="item_name" className="col col-form-label font-weight-normal">Purchase</label>
                                            <div className="form-group " style={{ marginTop: "10px" }} >
                                                <input className="form-control" type="checkbox" id="item_name_sales" style={{ height: "16px", width: "16px" }} />
                                            </div>
                                            <label htmlFor="item_name" className="col col-form-label font-weight-normal">Sales</label>
                                        </div>
                                        <div className="form-row" id="defaulttax" style={{ display: "none" }}>
                                            <label htmlFor="gstrate" className="col-md-2 col-form-label font-weight-normal">GST Rate(in %)</label>
                                            <div className="col form-group">
                                                <input type="number" className="form-control col-md-4" id='gstrate' value={data.gst_rate} maxLength={3} onChange={handleGst_rate} />
                                            </div>
                                        </div>
                                    </form>
                                </article>
                                <div className="border-top card-footer">
                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                                    <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('ChargecodeSno'); window.location.href = "./ShowItem" }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        {
                            alertObj.type ? <AlertsComp data={alertObj} /> : null
                        }
                    </div>
                    : <LoadingPage />
            }
            <Footer />
        </div>
    )
}

export default EditItem
