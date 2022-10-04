import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { GetItems, UpdateItems, ActiveAccountname, SelectSubAccountname, TotalActiveUnit } from "../../api";


const EditItem = () => {
    const [data, setData] = useState({})
    const [majorcodelist, setMajorcodelist] = useState([{}])
    const [chartofaccountlist, setChartofaccountlist] = useState([]);
    const [type, setType] = useState();
    const [unitdata, setUnitdata] = useState([]);

    const themetype = localStorage.getItem('themetype')


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');

            const result = await GetItems(org, localStorage.getItem('ItemsSno'))
            setData(result)

            if (result.item_type === 'Goods') {
                document.getElementById('typeGoods').checked = true
                setType('Goods')
            } else {
                document.getElementById('typeService').checked = true
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

            const result2 = await ActiveAccountname(org)
            setMajorcodelist(result2)

            const chartofaccount = await SelectSubAccountname(org,result.major_code_id)
            setChartofaccountlist(chartofaccount)

            const result1 = await TotalActiveUnit(org);
            setUnitdata(result1)
        }
        fetchdata()
    }, [])


    const getchartofaccountdata = async (e) => {
        setChartofaccountlist([])
        const chartofaccount = await SelectSubAccountname(localStorage.getItem('Organisation'), e.target.value)
        setChartofaccountlist(chartofaccount)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const Name = document.getElementById("name").value;
        const Unit = document.getElementById("unit").value;
        const hsncode = document.getElementById("hsncode").value;
        const saccode = document.getElementById("saccode").value
        const major_code1 = document.getElementById("major_code");
        const major_code = major_code1.options[major_code1.selectedIndex].textContent;
        const major_code_val = major_code1.value
        const chartofacc = document.getElementById('chartofaccount');

        const chartofaccount_id = chartofacc.value;
        const chartofaccount =  chartofacc.options[chartofacc.selectedIndex].textContent;

        const taxpreference = document.getElementById("taxpreference").value;
        const Purchase = document.getElementById("item_name_purchase").checked === true ? 'Purchase' : '';
        const Sales = document.getElementById("item_name_sales").checked === true ? 'Sales' : '';
        const gstrate = document.getElementById("gstrate").value;
        const sno = localStorage.getItem('ItemsSno');
        const org = localStorage.getItem('Organisation');
        const user_id = localStorage.getItem('User_id');

        if (!Name || !major_code || !chartofaccount_id || !taxpreference) {
            alert('Enter the Mandatory field...')
        }
        else {
            const result = await UpdateItems(sno, org, type, Name, Unit, saccode, hsncode, major_code_val, major_code, chartofaccount,chartofaccount_id, taxpreference, Sales, Purchase, gstrate, user_id);
            if (result === "updated") {
                alert('Data Updated')
                localStorage.removeItem('ItemsSno');
                window.location.href = '/ShowItem'
            }
            else {
                alert('Server error')
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

    const handleChangename = (e) => {
        setData({ ...data, item_name: e.target.value })
    }



    const handleChangehsn = (e) => {
        setData({ ...data, hsn_code: e.target.value })
    }

    const handleChangesac = (e) => {
        setData({ ...data, sac_code: e.target.value })
    }


    const handleGst_rate = (e) => {
        if (e.target.value > 100) return false;
        setData({ ...data, gst_rate: e.target.value })
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
                    <div className={`content-wrapper bg-${themetype}`}>
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">Edit Item</h3>
                            <div className="row ">
                                <div className="col ml-2">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className={`card-body bg-${themetype}`}>
                                            <form autoComplete='off'>
                                                <div className="form-row" >
                                                    <label htmlFor="type" className="col-md-2 col-form-label font-weight-normal"  >Type</label>
                                                    <div className="col form-group " onChange={handletype} >
                                                        <input className="col-mt-2" type="radio" id="typeGoods" name="itemtype" value='Goods' disabled/>  Goods  &nbsp; &nbsp;
                                                        <input className="col-mt-2" type="radio" id="typeService" name="itemtype" value='Service' disabled/>  Service
                                                    </div>
                                                </div>


                                                <div className="form-row">
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Name<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='name' value={data.item_name} onChange={(e) => handleChangename(e)} />
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
                                                <div className="form-row" id="hsncodetoogle">
                                                    <label htmlFor="hsncode" className="col-md-2 col-form-label font-weight-normal" >HSN CODE</label>
                                                    <div className="col form-group">
                                                        <input className="form-control col-md-4" type="text" id="hsncode" value={data.hsn_code} onChange={(e) => handleChangehsn(e)} />
                                                    </div>
                                                </div>
                                                <div className="form-row" id="saccodetoogle" style={{ display: "none" }} >
                                                    <label htmlFor="saccode" className="col-md-2 col-form-label font-weight-normal" >SAC</label>
                                                    <div className="col form-group">
                                                        <input className="form-control col-md-4" type="text" id="saccode" value={data.sac_code} onChange={(e) => handleChangesac(e)} />
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="major_code" className="col-md-2 col-form-label font-weight-normal">Major Code</label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id='major_code' onChange={getchartofaccountdata}  >
                                                            <option value={data.major_code_id} hidden>{data.major_code}</option>
                                                            {
                                                                majorcodelist.map((item, index) =>
                                                                    <option key={index} value={item.account_type_code}>{item.account_type}</option>)
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
                                                <div className="border-top card-footer">
                                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                                                    <button className="btn btn-light ml-3" onClick={() => { localStorage.removeItem('ChargecodeSno'); window.location.href = "./ShowItem" }}>Cancel</button>
                                                </div>
                                            </form>
                                        </article>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer theme={themetype}/>
            </div>
        </div>
    )

}

export default EditItem
