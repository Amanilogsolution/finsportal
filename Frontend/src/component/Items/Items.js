import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { TotalActiveUnit,InsertItems } from '../../api/index'
function Items() {
    const [unitdata, setUnitdata] = useState([]);
    const [sales,setSales] = useState(true);
    const [purchas,setPurchas] = useState(true);
    const [type,setType]= useState();
    const [mandatory,setMandatory] =useState(false);

    useEffect(async () => {
        const result = await TotalActiveUnit(localStorage.getItem("Organisation"));
        //    console.log(result);
        setUnitdata(result)


    }, [])

    const handlepurchases =()=>{
        setPurchas(!purchas)
    }
    const handlesales =()=>{
        setSales(!sales)
    }
    const handletype =(e)=>{
     const type= e.target.value;
    setType(type);
    }

    const handlesubmit = async()=>{
        const item_type= type;
        const item_name= document.getElementById("item_name").value;
        const item_unit= document.getElementById("unit").value;
        const item_selling_price= document.getElementById("Selling_price").value?document.getElementById("Selling_price").value:'';
        const sales_account= document.getElementById("sales_account").value? document.getElementById("sales_account").value:'';
        const sales_description= document.getElementById("sales_description").value?document.getElementById("sales_description").value:'';
        const item_cost_price= document.getElementById("cost_price").value? document.getElementById("cost_price").value:'';
        const purchase_account= document.getElementById("purchases_account").value?document.getElementById("purchases_account").value:'';
        const purchases_description= document.getElementById("purchases_description").value? document.getElementById("purchases_description").value:'';
        const add_user_name= localStorage.getItem("User_id");

        if(!item_name || !item_unit){
            setMandatory(true);
        }
        else{
            const result=await InsertItems(localStorage.getItem("Organisation"),item_type,item_name,item_unit,item_selling_price,sales_account,sales_description,item_cost_price,purchase_account,purchases_description,add_user_name);
            console.log(result);
            window.location.href='./home';
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
                    <Menu />
                    <div>
                        <div className="content-wrapper">
                            <div className="container-fluid">
                                <br /> <h3 className="text-left ml-5">New  Items </h3>
                                <div className="row ">
                                    <div className="col ml-5">
                                        <div className="card" style={{ width: "100%" }}>
                                            <article className="card-body">
                                                <form>
                                                    <div className="form-row" >
                                                        <label htmlFor="type" className="col-md-2 col-form-label font-weight-bold" >Type</label>
                                                        <div className="col-md-2 col-form-label " onChange={handletype}  >
                                                            <input className="col-mt-2"  type="radio" id="type" name="itemtype" value='Goods'/>  Goods  &nbsp; &nbsp;
                                                            <input className="col-mt-2" type="radio" id="type" name="itemtype" value='Service'/>  Service
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="item_name" className="col-md-2 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Name *</span></label>
                                                        <div className="col-md-2 col-form-label "  >
                                                            <input className="col-mt-2" type="text" id="item_name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-row" >
                                                        <label htmlFor="unit" className="col-md-2 col-form-label font-weight-bold " >Unit</label>
                                                        <div className="col col-form-label "  >
                                                            <select className="col p-1" style={{width:"30.5%"}}  id="unit" >
                                                                {
                                                                    unitdata.map((item) => (
                                                                        <option value={item.unit_symbol} >{item.unit_name}&nbsp;&nbsp;({item.unit_symbol})</option>

                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex",marginTop:"20px" }}>
                                                        <div style={{ width: "50%" }}>
                                                            <div className="form-row" >
                                                                <div className="colcol-form-label " style={{marginTop:"10px"}}>
                                                                    <input className="col-mt-3" type="checkbox" id="item_name" style={{height:"16px",width:"16px"}} defaultChecked onClick={handlesales}/>
                                                                </div>
                                                                <label htmlFor="" className="col col-form-label font-weight-bold" >Sales Information</label>

                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="Selling_price" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Selling Price *</span></label>
                                                                <div className="col-md-2 col-form-label "  >
                                                                    <input className="col-mt-2" type="text" id="Selling_price"  disabled={!sales}/>
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="sales_account" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Account *</span></label>
                                                                <div className="col col-form-label "  >
                                                                    <select className="col-md-8 p-1" type="text" id="sales_account"  disabled={!sales} >
                                                                        <option value=''>Select</option>
                                                                        <option>Account</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="sales_description" className="col-md-3 col-form-label font-weight-bold" >Description </label>
                                                                <div className="col col-form-label "  >
                                                                    <textarea className="col-md-8" type="text" id="sales_description" disabled={!sales}></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ width: "50%" }}>
                                                            <div className="form-row" >
                                                                <div className="colcol-form-label "  style={{marginTop:"10px"}} >
                                                                    <input className="col-mt-2" type="checkbox" id="item_name" style={{height:"16px",width:"16px"}} onClick={handlepurchases} />
                                                                </div>
                                                                <label htmlFor="item_name" className="col col-form-label font-weight-bold">Purchase Information</label>

                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="cost_price" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Cost Price *</span></label>
                                                                <div className="col-md-2 col-form-label "  >
                                                                    <input className="col-mt-2" type="text" id="cost_price" disabled={purchas}/>
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="purchases_account" className="col-md-3 col-form-label font-weight-bold" ><span style={{ color: "rgba(210,0,0,0.7)" }}>Account *</span></label>
                                                                <div className="col col-form-label "  >
                                                                    <select className="col-md-8 p-1" type="text" id="purchases_account" disabled={purchas}>
                                                                        <option value=''>Select</option>
                                                                        <option>Account </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-row" >
                                                                <label htmlFor="purchases_description" className="col-md-3 col-form-label font-weight-bold" >Description </label>
                                                                <div className="col col-form-label "  >
                                                                    <textarea className="col-md-8" type="text" id="purchases_description" disabled={purchas}></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </article>
                                           
                                            <div className="border-top card-body">
                                            {
                                                mandatory
                                                ?<p style={{color:'red'}}>Please! fill the mandatory field...</p>:null
                                            }
                                                <button className="btn btn-success" onClick={handlesubmit} >Save</button>
                                                <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowState" }}>Cancel</button>
                                            </div>
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