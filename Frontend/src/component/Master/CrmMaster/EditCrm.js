import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { GetCrm, UpdateCrm, ActiveCustomer, ActiveVendor, } from "../../../api";
import Select from 'react-select';

const EditCrm = () => {
    const [crmtype, setCrmType] = useState(false)
    const [crmtypeval, setCrmtypeval] = useState('');
    const [data, setData] = useState([])
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
            
            const result = await GetCrm(org, localStorage.getItem('CrmmasterSno'))
            setData(result)
            console.log(result)

            if (result.type === "vendor") {
                document.getElementById('vendorid').checked = true;
                setCrmtypeval(result.type)
                setCrmType(false)
            }
            else {
                document.getElementById('customerid').checked = true;
                setCrmtypeval(result.type)
                setCrmType(true)
            }

        }
        fetchdata()
    }, [])
    const handleClick = async (e) => {
        e.preventDefault();
        const crmtype = crmtypeval;
        const person_name = document.getElementById("person_name").value;
        // const cust_vend_name = document.getElementById("cust_vend_name").value;
        const cust_vend_name = custvendval.value ? custvendval.value : data.cust_vend;


        console.log(crmtype, person_name, cust_vend_name)
        if (!crmtype || !person_name || !cust_vend_name) {
            // alert('Enter data')
        }
        else {
            // sno,org,user_name,type,cust_vend,User_id

            // const result = await UpdateCrm(localStorage.getItem('CrmmasterSno'), localStorage.getItem('Organisation'), paymentterm, paymentdays, localStorage.getItem('User_id'));
            // if (result == "Already") {
            //     alert('Already')
            // } else {
            //     window.location.href = '/ShowChargecode'
            //     localStorage.removeItem('CrmmasterSno');
            // }
        }

    }


    const handletype = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'Customer') {
            setCrmType(true)
            setCrmtypeval(e.target.value)
        }
        else {
            setCrmType(false)
            setCrmtypeval(e.target.value)
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
                            <br /> <h3 className="text-left ml-5">Edit Crm Master</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>

                                                <div className="form-row">
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Type<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="radio" id='vendorid' name='crmtype' value='vendor' onChange={handletype} /> Vendor  &nbsp;
                                                        <input type="radio" id='customerid' name='crmtype' value='Customer' onChange={handletype} /> Customer
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="person_name" className="col-md-2 col-form-label font-weight-normal">Person Name<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='person_name' value={data.user_name} />
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
                                                                    placeholder={data.cust_vend}
                                                                />
                                                                :

                                                                <Select
                                                                    className="col-md-4 "
                                                                    options={options2}
                                                                    isMulti={false}
                                                                    onChange={handleCustvendval}
                                                                    placeholder={data.cust_vend}
                                                                />

                                                        }


                                                    </div>
                                                </div>
                                            </form>
                                        </article>
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" onClick={handleClick}>Update</button>
                                            <button className="btn btn-light ml-3" onClick={() => { localStorage.removeItem('CrmmasterSno'); window.location.href = "./ShowCrm" }}>Cancel</button>
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

export default EditCrm
