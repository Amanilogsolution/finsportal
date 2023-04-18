import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { InsertItems, ActiveAccountMinorCode, SelectSubAccountname, TotalActiveUnit } from "../../api";


const AddItem = () => {
    const [data, setData] = useState([{}])
    const [chartofaccountlist, setChartofaccountlist] = useState([]);
    const [type, setType] = useState('Goods');
    const [unitdata, setUnitdata] = useState([]);
    const [gstvaluecount, setGstvaluecount] = useState();

    useEffect(() => {
        const fetchdata = async () => {
            const result = await ActiveAccountMinorCode(localStorage.getItem('Organisation'))
            setData(result)
            const result1 = await TotalActiveUnit(localStorage.getItem("Organisation"));
            setUnitdata(result1)
        }
        fetchdata()
    }, [])


    const handlegetchartofaccount = async (e) => {
        e.preventDefault()
        const minor_val = e.target.value;
        const minor_arr_val = minor_val.split('^')
        const chartofaccount = await SelectSubAccountname(localStorage.getItem('Organisation'), minor_arr_val[1])
        setChartofaccountlist(chartofaccount)
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

    const handletaxprefrnce = (e) => {
        if (e.target.value === 'Taxable') {
            document.getElementById('defaulttax').style.display = "flex";
        }
        else {
            document.getElementById('defaulttax').style.display = "none";
        }
    }



    const handleClick = async (e) => {
        e.preventDefault();
        const Name = document.getElementById("name").value;
        const unit = document.getElementById("unit").value;
        const HSNcode = document.getElementById('hsncode').value
        const SACcode = document.getElementById('saccode').value


        const minor_val = document.getElementById('major_code')
        const minor_arr_val = minor_val.value.split('^')

        const minor_code = minor_val.options[minor_val.selectedIndex].textContent;
        const major_code_id = minor_arr_val[0];
        const minor_code_id = minor_arr_val[1];

        const chartofacct = document.getElementById('chartof_account');
        const chartofaccount_id = chartofacct.value;
        const chartofaccount = chartofacct.options[chartofacct.selectedIndex].textContent;
        const taxpreference = document.getElementById("taxpreference").value;
        const Purchase = document.getElementById("item_name_purchase").checked === true ? 'Purchase' : '';
        const Sales = document.getElementById("item_name_sales").checked === true ? 'Sales' : '';
        const gstrate = document.getElementById("gstrate").value;
        const org = localStorage.getItem('Organisation');
        const user_id = localStorage.getItem('User_id');

        if (!Name || !chartofaccount_id || !taxpreference || !minor_code_id) {
            alert('Please Enter the mandatory field')
        }
        else {
            const checkbox = document.getElementById('checkboxgst').checked || false
            let glcode = '';
            if (checkbox) {
                glcode = Name.slice(0, 3) + Math.floor(Math.random() * 10000)
            }

            const result = await InsertItems(type, Name, unit, HSNcode, SACcode, minor_code, major_code_id, minor_code_id, chartofaccount_id, chartofaccount, taxpreference, Purchase, Sales, gstrate, org, user_id, glcode);
            if (result === "Added") {
                alert('Data Added')
                localStorage.removeItem('ChargecodeSno');
                window.location.href = '/ShowItem'
            }
            else {
                alert('Server Error')
            }
        }

    }

    return (
        <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
            </div>
            <Header />
            <div className={`content-wrapper`}>
                <div className="container-fluid">
                    <h3 className="py-3 ml-5">Add Item</h3>
                    <div className="card mb-2" >
                        <article className={`card-body`}>
                            <form autoComplete='off'>
                                <div className="form-row" >
                                    <label htmlFor="type" className="col-md-2 col-form-label font-weight-normal"  >Type<span className='text-danger'> *</span></label>
                                    <div className="col form-group " onChange={handletype} >
                                        <input className="col-mt-2" type="radio" id="type" name="itemtype" value='Goods' defaultChecked={true} />  Goods  &nbsp; &nbsp;
                                        <input className="col-mt-2 ml-3" type="radio" id="type" name="itemtype" value='Service' />  Service
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="major_code" className="col-md-2 col-form-label font-weight-normal">Minor Code<span className='text-danger'>*</span></label>
                                    <div className="col form-group">
                                        <select className="form-control col-md-4" id='major_code' onChange={handlegetchartofaccount}>
                                            <option value='' hidden>select the minor Code</option>
                                            {
                                                data.map((item, index) =>
                                                    <option key={index} value={`${item.account_type_code}^${item.account_name_code}`}>{item.account_name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="chartof_account" className="col-md-2 col-form-label font-weight-normal">Chart of Account<span className='text-danger'>*</span></label>
                                    <div className="col form-group">
                                        <select className="form-control col-md-4" id='chartof_account' >
                                            <option value='' hidden>Select the Chart of Account</option>
                                            {
                                                chartofaccountlist.map((item, index) =>
                                                    <option key={index} value={item.account_sub_name_code}>{item.account_sub_name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Name<span className='text-danger'>*</span></label>
                                    <div className="col form-group">
                                        <input type="text" className="form-control col-md-4" id='name' />
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
                                            <option value='' hidden>Select Unit</option>
                                            {
                                                unitdata.map((item, index) => (
                                                    <option value={item.unit_name} key={index} >{item.unit_name}&nbsp;&nbsp;({item.unit_symbol})</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row" id="hsncodetoogle">
                                    <label htmlFor="hsncode" className="col-md-2 col-form-label font-weight-normal" >HSN CODE</label>
                                    <div className="col form-group">
                                        <input className="form-control col-md-4" type="text" id="hsncode" />
                                    </div>
                                </div>
                                <div className="form-row" id="saccodetoogle" style={{ display: "none" }} >
                                    <label htmlFor="saccode" className="col-md-2 col-form-label font-weight-normal" >SAC</label>
                                    <div className="col form-group">
                                        <input className="form-control col-md-4" type="text" id="saccode" />
                                    </div>
                                </div>


                                <div className="form-row" >
                                    <label htmlFor="taxpreference" className="col-md-2 col-form-label font-weight-normal " >Tax Preference<span style={{ color: "rgba(210,0,0,0.7)" }}> *</span></label>
                                    <div className="col form-group">
                                        <select className="form-control col-md-4" id="taxpreference" onChange={handletaxprefrnce}>
                                            <option value='' hidden>Select Tax Preference</option>
                                            <option value='Taxable' >Taxable</option>
                                            <option value='Non-Taxable' >Non-Taxable</option>
                                            <option value='Out-of-Scope' >Out of Scope</option>
                                            <option value='Non-GST Supply' >Non-GST Supply </option>

                                        </select>
                                    </div>
                                </div>

                                <div className="form-row col-md-6">
                                    <div className="form-group d-flex col-md-4" ></div>
                                    <div className="form-group d-flex col-md-3" >
                                        <input className="form-control mt-2" type="checkbox" id="item_name_purchase" style={{ height: "16px", width: "16px" }} />
                                        <label htmlFor="item_name" className="col col-form-label font-weight-normal">Purchase</label>
                                    </div>

                                    <div className="form-group d-flex ml-5">
                                        <input className="form-control mt-2" type="checkbox" id="item_name_sales" style={{ height: "16px", width: "16px" }} />
                                        <label htmlFor="item_name" className="col col-form-label font-weight-normal">Sales</label>
                                    </div>

                                </div>

                                <div className="form-row" id="defaulttax" style={{ display: "none" }}>
                                    <label htmlFor="gstrate" className="col-md-2 col-form-label font-weight-normal">GST Rate(in %)<span className='text-danger'>*</span></label>
                                    <div className="col form-group">
                                        <input type="number" className="form-control col-md-4" id='gstrate' value={gstvaluecount} onChange={(e) => {
                                            if (e.target.value > 100) return false;
                                            setGstvaluecount(e.target.value)
                                        }} />
                                    </div>
                                </div>

                            </form>
                        </article>
                        <div className="border-top card-footer">
                            <button type='submit' className="btn btn-success" onClick={handleClick}>Add</button>
                            <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./ShowItem" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default AddItem
