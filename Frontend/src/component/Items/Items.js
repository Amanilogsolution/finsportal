import Header from "../Header/Header";
// import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { TotalActiveUnit, InsertItems, AllAccountsalesInfo, AllAccountpurchaseInfo } from '../../api/index'
function Items() {
    const [unitdata, setUnitdata] = useState([]);
    const [sales, setSales] = useState(true);
    const [salestype, setSalestype] = useState([]);
    const [purchas, setPurchas] = useState(true);
    const [type, setType] = useState();
    const [mandatory, setMandatory] = useState(false);
    const [purchase, setPurchase] = useState([]);

    useEffect(() => {
        const fetch = async () => {

            const result = await TotalActiveUnit(localStorage.getItem("Organisation"));
            setUnitdata(result)

            const result2 = await AllAccountsalesInfo(localStorage.getItem("Organisation"));
            setSalestype(result2)
            const purchaseinfo = await AllAccountpurchaseInfo(localStorage.getItem("Organisation"));

            setPurchase(purchaseinfo)
        }
        fetch();


    }, [])

    const handlepurchases = () => {
        setPurchas(!purchas)
    }
    const handlesales = () => {
        setSales(!sales)
    }

    const handletype = (e) => {
        const type = e.target.value;
        setType(type);
        if (type === 'Goods') {
            document.getElementById('hsncode').style.display = "flex";
            document.getElementById('saccode').style.display = "none";
            document.getElementById('exemptionreas').style.display = "none";
        }
        else {
            document.getElementById('hsncode').style.display = "none";
            document.getElementById('saccode').style.display = "flex";
            document.getElementById('exemptionreas').style.display = "flex";
        }
    }

    const handletaxprefrnce = (e) => {
        if (e.target.value === 'Taxable') {
            document.getElementById('exemptionreas').style.display = "none";
            document.getElementById('defaulttax').style.display = "block";
        }
        else if (e.target.value === 'Non-Taxable') {
            document.getElementById('exemptionreas').style.display = "flex";
            document.getElementById('defaulttax').style.display = "none";
        }
        else {
            document.getElementById('defaulttax').style.display = "none";
            document.getElementById('exemptionreas').style.display = "none";

        }
    }

    const handlesubmit = async () => {
        const item_type = type;
        const item_name = document.getElementById("item_name").value;
        const item_unit = document.getElementById("unit").value;
        const item_selling_price = document.getElementById("Selling_price").value ? document.getElementById("Selling_price").value : '';
        const sales_account = document.getElementById("sales_account").value ? document.getElementById("sales_account").value : '';
        const sales_description = document.getElementById("sales_description").value ? document.getElementById("sales_description").value : '';
        const item_cost_price = document.getElementById("cost_price").value ? document.getElementById("cost_price").value : '';
        const purchase_account = document.getElementById("purchases_account").value ? document.getElementById("purchases_account").value : '';
        const purchases_description = document.getElementById("purchases_description").value ? document.getElementById("purchases_description").value : '';
        const add_user_name = localStorage.getItem("User_id");

        if (!item_name || !item_unit) {
            setMandatory(true);
        }
        else {
            const result = await InsertItems(localStorage.getItem("Organisation"), item_type, item_name, item_unit, item_selling_price, sales_account, sales_description, item_cost_price, purchase_account, purchases_description, add_user_name);
            if (result === 'Added') {
                alert('Data Added')
                window.location.href = './home';
            }
        }
    }

    return (
        <>
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
                                <br /> <h3 className="text-left ml-5">  Items </h3>
                                <div className="row ">
                                    <div className="col ml-5">
                                        <div className="card" style={{ width: "100%" }}>
                                            <article className="card-body">
                                                <form>
                                                    <div className="form-row" >
                                                        <label htmlFor="type" className="col-md-2 col-form-label font-weight-bold" >Type</label>
                                                        <div className="col form-group " onChange={handletype}  >
                                                            <input className="col-mt-2" type="radio" id="type" name="itemtype" value='Goods' />  Goods  &nbsp; &nbsp;
                                                            <input className="col-mt-2" type="radio" id="type" name="itemtype" value='Service' />  Service
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Name *</span></label>
                                                        <div className="col form-group">
                                                            <input className="form-control col-md-4" type="text" id="item_name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold " >Unit</label>
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


                                                    <div className="form-row" id="hsncode">
                                                        <label htmlFor="hsncode" className="col-md-2 col-form-label font-weight-bold" >HSN CODE</label>
                                                        <div className="col form-group">
                                                            <input className="form-control col-md-4" type="text" id="hsncode" />
                                                        </div>
                                                    </div>
                                                    <div className="form-row" id="saccode" style={{display:"none"}} >
                                                        <label htmlFor="saccode" className="col-md-2 col-form-label font-weight-bold" >SAC</label>
                                                        <div className="col form-group">
                                                            <input className="form-control col-md-4" type="text" id="saccode" />
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold " ><span style={{ color: "rgba(210,0,0,0.7)" }}>Tax Preference *</span></label>
                                                        <div className="col form-group">
                                                            <select className="form-control col-md-4" id="unit" onChange={handletaxprefrnce}>
                                                                <option value='' hidden>Select Tax Preference</option>
                                                                <option value='Taxable' >Taxable</option>
                                                                <option value='Non-Taxable' >Non-Taxable</option>
                                                                <option value='Out-of-Scope' >Out of Scope</option>
                                                                <option value='Non-GST Supply' >Non-GST Supply </option>

                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-row" id="exemptionreas" style={{ display: "none" }}>
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold " ><span style={{ color: "rgba(210,0,0,0.7)" }}>Exemption Reason*</span></label>
                                                        <div className="col form-group">
                                                            <select className="form-control col-md-4" id="exemp">
                                                                <option value='' hidden>Select Tax Preference</option>

                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "flex", marginTop: "20px" }}>
                                                        <div style={{ width: "45%" }}>
                                                            <div className="form-row" >
                                                                <div className="form-group " style={{ marginTop: "10px" }}>
                                                                    <input className="form-control" type="checkbox" id="item_name" style={{ height: "16px", width: "16px" }} defaultChecked onClick={handlesales} />
                                                                </div>
                                                                <label htmlFor="" className="col col-form-label font-weight-bold" >Sales Information</label>

                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="Selling_price" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Selling Price *</span></label>
                                                                <div className="form-group col"  >
                                                                    <input className="form-control col-md-8" type="text" id="Selling_price" disabled={!sales} />
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="sales_account" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Account *</span></label>
                                                                <div className="col form-group "  >
                                                                    <select className="col-md-8 p-1 form-control" type="number" id="sales_account" disabled={!sales} >
                                                                        <option value='' hidden>Select</option>
                                                                        {
                                                                            salestype.map((item, index) => {
                                                                                return <option key={index} value={item.account_info_name}>{item.account_info_name}</option>
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="sales_description" className="col-md-3 col-form-label font-weight-bold" >Description </label>
                                                                <div className="col form-group "  >
                                                                    <textarea className="col-md-8 form-control" type="text" id="sales_description" disabled={!sales} rows="4" style={{ resize: "none" }}></textarea>
                                                                </div>
                                                            </div>

                                                            <div id="defaulttax" style={{ display: "none" }}>
                                                                <hr />
                                                                <div className="form-row" >
                                                                    <h4 className="col">Default Tax Rates</h4>

                                                                </div>

                                                                <div className="form-row md-2" >
                                                                    <label htmlFor="sales_account" className="col-md-3 col-form-label font-weight-500" >Intra State Tax Rate</label>
                                                                    <div className="col form-group "  >
                                                                        <select className="col-md-8 p-2 form-control" type="text" id="sales_account">
                                                                            <option value='' hidden>Select</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-row md-2" >
                                                                    <label htmlFor="sales_account" className="col-md-3 col-form-label font-weight-500" >Inter State Tax Rate</label>
                                                                    <div className="col form-group "  >
                                                                        <select className="col-md-8 p-2 form-control" type="text" id="sales_account" >
                                                                            <option value='' hidden>Select</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ width: "45%",paddingLeft:"10px" }}>
                                                            <div className="form-row" >
                                                                <div className="form-group " style={{ marginTop: "10px" }} >
                                                                    <input className="form-control" type="checkbox" id="item_name" style={{ height: "16px", width: "16px" }} onClick={handlepurchases} />
                                                                </div>
                                                                <label htmlFor="item_name" className="col col-form-label font-weight-bold">Purchase Information</label>

                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="cost_price" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Cost Price *</span></label>
                                                                <div className="col form-group "  >
                                                                    <input className="col-md-8  p-1 form-control" type="number" id="cost_price" disabled={purchas} />
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="purchases_account" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Account *</span></label>
                                                                <div className="col form-group "  >
                                                                    <select className="col-md-8 p-1 form-control" type="text" id="purchases_account" disabled={purchas}>
                                                                        <option value='' hidden>Select</option>
                                                                        {
                                                                            purchase.map((item, index) => {
                                                                                return <option key={index} value={item.account_info_name}>{item.account_info_name}</option>
                                                                            })
                                                                        }

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="purchases_description" className="col-md-3 col-form-label font-weight-bold" >Description </label>
                                                                <div className="col col-form-group "  >
                                                                    <textarea className="col-md-8 form-control " type="text" id="purchases_description" disabled={purchas} rows="4" style={{ resize: "none" }}></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-top card-body">
                                                {
                                                    mandatory
                                                        ? <p style={{ color: 'red' }}>Please! fill the mandatory field...</p> : null
                                                }
                                                <button type="submit" className="btn btn-success" onClick={handlesubmit} >Save</button>
                                                <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
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
        </>
    )
}

export default Items;