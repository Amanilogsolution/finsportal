import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { InsertItems, ActiveAccountname, SelectSubAccountname, TotalActiveUnit } from "../../../api";


const AddItem = () => {
    const [data, setData] = useState([{}])
    const [chartofaccountlist, setChartofaccountlist] = useState([]);
    const [type, setType] = useState();
    const [unitdata, setUnitdata] = useState([]);
    const [gstvaluecount, setGstvaluecount] = useState()


    useEffect(() => {
        const fetchdata = async () => {
            const result = await ActiveAccountname(localStorage.getItem('Organisation'))
            setData(result)
            const result1 = await TotalActiveUnit(localStorage.getItem("Organisation"));
            setUnitdata(result1)
        }
        fetchdata()
    }, [])


    const handlegetchartofaccount = async (e) => {
        const chartofaccount = await SelectSubAccountname(localStorage.getItem('Organisation'), e.target.value)
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
        const major_code1 = document.getElementById('major_code');
        const major_code = major_code1.options[major_code1.selectedIndex].textContent;
        const major_code_val = major_code1.value;
        const chartofaccount = document.getElementById('chartof_account').value;
        const taxpreference = document.getElementById("taxpreference").value;
        const Purchase = document.getElementById("item_name_purchase").checked === true ? 'Purchase' : '';
        const Sales = document.getElementById("item_name_sales").checked === true ? 'Sales' : '';
        const gstrate = document.getElementById("gstrate").value;
        const org = localStorage.getItem('Organisation');
        const user_id = localStorage.getItem('User_id');


        if (!Name || !unit || !major_code || !chartofaccount || !taxpreference) {
            alert('Please Enter the mandatory field')
        }
        else {
            const result = await InsertItems(org, type, Name, unit, SACcode, HSNcode, major_code_val, major_code, chartofaccount, taxpreference, Sales, Purchase, gstrate, user_id);
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
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}
                <div>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">Add Item</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>
                                                <div className="form-row" >
                                                    <label htmlFor="type" className="col-md-2 col-form-label font-weight-normal"  >Type<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group " onChange={handletype} >
                                                        <input className="col-mt-2" type="radio" id="type" name="itemtype" value='Goods' defaultChecked={true} />  Goods  &nbsp; &nbsp;
                                                        <input className="col-mt-2 ml-3" type="radio" id="type" name="itemtype" value='Service' />  Service
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Name<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='name' />
                                                    </div>
                                                </div>
                                                <div className="form-row" >
                                                    <label htmlFor="unit" className="col-md-2 col-form-label font-weight-normal " >Unit<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id="unit">
                                                            <option value='' hidden>Select Unit</option>
                                                            {
                                                                unitdata.map((item, index) => (
                                                                    <option value={item.unit_symbol} key={index} >{item.unit_name}&nbsp;&nbsp;({item.unit_symbol})</option>
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
                                                {/* <div className="form-row">
                                                    <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='nature' />
                                                    </div>
                                                </div> */}
                                                <div className="form-row">
                                                    <label htmlFor="major_code" className="col-md-2 col-form-label font-weight-normal">Major Code<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id='major_code' onChange={handlegetchartofaccount}>
                                                            <option value='' hidden>select the major Code</option>
                                                            {
                                                                data.map((item, index) =>
                                                                    <option key={index} value={item.account_type_code}>{item.account_type}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="chartof_account" className="col-md-2 col-form-label font-weight-normal">Chart of Account<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id='chartof_account' >
                                                            <option value='' hidden>Select the Chart of Account</option>
                                                            {
                                                                chartofaccountlist.map((item, index) =>
                                                                    <option key={index} value={item.account_sub_name}>{item.account_sub_name}</option>)
                                                            }
                                                        </select>
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
                                                    <div className="form-group d-flex col-md-2" >
                                                        <input className="form-control mt-2" type="checkbox" id="item_name_purchase" style={{ height: "16px", width: "16px" }} />
                                                        <label htmlFor="item_name" className="col col-form-label font-weight-normal">Purchase</label>
                                                    </div>

                                                    <div className="form-group d-flex ml-5">
                                                        <input className="form-control mt-2" type="checkbox" id="item_name_sales" style={{ height: "16px", width: "16px" }} />
                                                        <label htmlFor="item_name" className="col col-form-label font-weight-normal">Sales</label>
                                                    </div>

                                                </div>
                                                {/* <div className="form-row">
                                                    <label htmlFor="activity" className="col-md-2 col-form-label font-weight-normal">Activity<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='activity' />
                                                    </div>
                                                </div> */}
                                                {/* <div className="form-row">
                                                    <label htmlFor="sacHsncoe" className="col-md-2 col-form-label font-weight-normal">SAC/HSN Code<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='sacHsncode' />
                                                    </div>
                                                </div> */}
                                                <div className="form-row" id="defaulttax" style={{ display: "none" }}>
                                                    <label htmlFor="gstrate" className="col-md-2 col-form-label font-weight-normal">GST Rate(in %)<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='gstrate' value={gstvaluecount} onChange={(e) => {
                                                            if (e.target.value >100) return false;
                                                            setGstvaluecount(e.target.value)
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="border-top card-body">
                                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Add</button>
                                                    <button className="btn btn-light ml-3" onClick={(e) => {e.preventDefault(); window.location.href = "./ShowItem" }}>Cancel</button>
                                                </div>
                                            </form>
                                        </article>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )

}

export default AddItem
