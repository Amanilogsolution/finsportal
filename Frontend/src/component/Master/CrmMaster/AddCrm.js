import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { ActiveCustomer, ActiveVendor, InsertCrm } from "../../../api";
import Select from 'react-select';
import LoadingPage from '../../loadingPage/loadingPage';

const AddCrm = () => {
    const [loading, setLoading] = useState(false)
    const [crmtype, setCrmType] = useState(false)
    const [customerlist, setCustomerlist] = useState([])
    const [vendorlist, setVendorlist] = useState([])
    const [custvendval, setCustvendval] = useState('');
    const [typeselect, setTypeSelect] = useState('Vendor')

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const customer = await ActiveCustomer(org)
            setCustomerlist(customer)
            const vendor = await ActiveVendor(org)
            setVendorlist(vendor)
            setLoading(true)

        }
        fetchdata()
    }, [])
    const handleClick = async (e) => {
        e.preventDefault();
        const crmtypes = typeselect;
        const person_name = document.getElementById("person_name").value;
        const cust_vend_name = custvendval.value;
        const from_date = document.getElementById('from_date').value;
        const to_date = new Date(from_date);
        to_date.setDate(to_date.getDate() - 1);
        var day = to_date.getDate();
        var month = to_date.getMonth() + 1;
        var year = to_date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let formatted_date = year + "-" + month + "-" + day;
        // let formatted_date = to_date.getFullYear() + "-" + (to_date.getMonth() + 1) + "-" + to_date.getDate()

        if (!crmtypes || !person_name || !cust_vend_name) {
            alert('Enter data')
        }
        else {
            const result = await InsertCrm(localStorage.getItem('Organisation'), person_name, crmtypes, cust_vend_name, localStorage.getItem('User_id'), from_date, formatted_date);
            if (result === "Added") {
                alert('Data Added')
                window.location.href = '/ShowCrm'
            }
            else {
                alert('Server not Response')
            }
        }

    }


    const handletype = (e) => {
        setTypeSelect(e.target.value)

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
        <div className="wrapper">
            {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
            <Header />
            {
                loading ?
                    <div className='content-wrapper'>
                        <div className="container-fluid">
                            <br /> <h3 className="ml-5">Add CRM </h3><br />
                            <div className="card w-100">
                                <article className='card-body'>
                                    <form autoComplete='off'>
                                        <div className="form-row">
                                            <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Type<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <input type="radio" id='crmtype' name='crmtype' value='Vendor' onChange={handletype} defaultChecked /> Vendor  &nbsp;
                                                <input type="radio" id='crmtype' name='crmtype' value='Customer' onChange={handletype} /> Customer
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <label htmlFor="person_name" className="col-md-2 col-form-label font-weight-normal">Person Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <input type='text' className="form-control col-md-4" id='person_name' required />
                                            </div>
                                        </div>
                                        <div className="form-row" >
                                            <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Customer/Vendor Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group" >
                                                {
                                                    crmtype ?
                                                        <Select
                                                            className="col-md-4 text-dark"
                                                            options={options}
                                                            isMulti={true}
                                                            onChange={handleCustvendval}
                                                        />
                                                        :
                                                        <Select
                                                            className="col-md-4 m-0 p-0 text-dark"
                                                            options={options2}
                                                            isMulti={true}
                                                            onChange={handleCustvendval}
                                                        />
                                                }
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Date</label>
                                            <div className="col form-group">
                                                <input type="Date" className="form-control col-md-4" id='from_date' />
                                            </div>
                                        </div>

                                    </form>
                                </article>
                                <div className='border-top card-footer'>
                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Add</button>
                                    <button className="btn btn-secondary ml-3" onClick={(e) => { e.preventDefault(); window.location.href = "./ShowCrm" }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <LoadingPage />
            }
            <Footer />
        </div>
    )

}

export default AddCrm
