import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, ActiveVendor, InsertCrm } from "../../../api";
import Select from 'react-select';

const AddCrm = () => {
    const [crmtype, setCrmType] = useState(false)
    const [customerlist, setCustomerlist] = useState([])
    const [vendorlist, setVendorlist] = useState([])
    const [custvendval, setCustvendval] = useState('');

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const customer = await ActiveCustomer(org)
            setCustomerlist(customer)
            console.log(customer)
            const vendor = await ActiveVendor(org)
            setVendorlist(vendor)
            console.log(vendor)


        }
        fetchdata()
    }, [])
    const handleClick = async (e) => {
        e.preventDefault();
        const crmtype = document.getElementById("crmtype").value;
        const person_name = document.getElementById("person_name").value;
        // const cust_vend_name = document.getElementById("cust_vend_name").value;
        const cust_vend_name = custvendval.value;

        console.log(crmtype, person_name, cust_vend_name)
        if (!crmtype || !person_name || !cust_vend_name) {
            alert('Enter data')
        }
        else {
            // org,user_name,type,cust_vend,User_id
            // const result = await InsertCrm(localStorage.getItem('Organisation'), person_name, crmtype, cust_vend_name, localStorage.getItem('User_id'));
            // if (result === "Added") {
            //     alert('Data Added')
            //     // window.location.href = '/ShowCrm'
            // } else {

            // }
        }

    }


    const handletype = (e) => {

        if (e.target.value === 'Customer') {
            setCrmType(true)
            setCustvendval('')
        }
        else {
            setCrmType(false)
            setCustvendval('')
        }

    }

    let options = customerlist.map((ele) => {
        return { value: ele.cust_name, label: ele.cust_name };
    })
    let options2 = vendorlist.map((ele) => {
        return { value: ele.vend_name, label: ele.vend_name };
    })

    const handleCustvendval = (e) => {
        setCustvendval(e)
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
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Type<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="radio" id='crmtype' name='crmtype' value='vendor' onChange={handletype} defaultChecked /> Vendor  &nbsp;
                                                        <input type="radio" id='crmtype' name='crmtype' value='Customer' onChange={handletype} /> Customer
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="person_name" className="col-md-2 col-form-label font-weight-normal">Person Name<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='person_name' />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Customer/Vendor Name<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        {
                                                            crmtype ?
                                                                <Select
                                                                    className="col-md-4 "
                                                                    options={options}
                                                                    isMulti={false}
                                                                    onChange={handleCustvendval}
                                                                />
                                                                :

                                                                <Select
                                                                    className="col-md-4 "
                                                                    options={options2}
                                                                    isMulti={false}
                                                                    onChange={handleCustvendval}
                                                                />

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
