import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
// import {updatePaymentterm,ShowPaymentTerm} from "../../../api";


const AddCrm = () => {
    const [crmtype, setCrmType] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            //   const result = await ShowPaymentTerm(localStorage.getItem('Organisation'),localStorage.getItem('TermSno'))
            //   setData(result)
            //   console.log(result)

        }
        fetchdata()
    }, [])
    const handleClick = async (e) => {
        e.preventDefault();
        const crmtype = document.getElementById("crmtype").value;
        const person_name = document.getElementById("person_name").value;
        const cust_vend_name = document.getElementById("cust_vend_name").value;

        console.log(crmtype, person_name, cust_vend_name)
        if (!crmtype || !person_name || !cust_vend_name) {
            // alert('Enter data')
        }
        else {
            // const result = await updatePaymentterm(localStorage.getItem('TermSno'), localStorage.getItem('Organisation'), paymentterm, paymentdays, localStorage.getItem('User_id'));
            // if (result == "Already") {
            //     alert('Already')
            // } else {
            //     window.location.href = '/ShowChargecode'
            //     localStorage.removeItem('ChargecodeSno');
            // }
        }

    }


    const handletype = (e) => {
      
        if (e.target.value === 'Customer') {
            setCrmType(true)
            document.getElementById('cust_vend_name').value='';
        }
        else {
            setCrmType(false)
            document.getElementById('cust_vend_name').value='';

        }

    }

    return (
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
                            <br /> <h3 className="text-left ml-5">Add CRM Master</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>

                                                <div className="form-row">
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Type<span style={{color:"red"}}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="radio" id='crmtype' name='crmtype' value='vendor' onChange={handletype} defaultChecked/> Vendor  &nbsp;
                                                        <input type="radio" id='crmtype' name='crmtype' value='Customer' onChange={handletype} /> Customer
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="person_name" className="col-md-2 col-form-label font-weight-normal">Person Name<span style={{color:"red"}}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='person_name' />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Customer/Vendor Name<span style={{color:"red"}}>*</span></label>
                                                    <div className="col form-group">
                                                        {
                                                            crmtype ?
                                                                <select type="text" className="form-control col-md-4" id='cust_vend_name'  >
                                                                    <option hidden value=''>Select the Customer</option>
                                                                    <option > Customer</option>
                                                                </select>
                                                                :
                                                                <select type="text" className="form-control col-md-4" id='cust_vend_name'  >
                                                                    <option hidden value=''>Select the vendor</option>
                                                                    <option >vendor</option>
                                                                </select>
                                                        }


                                                    </div>
                                                </div>



                                            </form>
                                        </article>
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" onClick={handleClick}>Add</button>
                                            <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./ShowCrm" }}>Cancel</button>
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
    )

}

export default AddCrm
