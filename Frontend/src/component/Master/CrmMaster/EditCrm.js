import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GetCrm, UpdateCrm, ActiveCustomer, ActiveVendor } from "../../../api";
import Select from 'react-select';
import LoadingPage from '../../loadingPage/loadingPage';
import AlertsComp from '../../AlertsComp';

const EditCrm = () => {
    const [loading, setLoading] = useState(false)
    const [crmtype, setCrmType] = useState(false)
    const [crmtypeval, setCrmtypeval] = useState('');
    const [data, setData] = useState([])
    const [customerlist, setCustomerlist] = useState([])
    const [vendorlist, setVendorlist] = useState([])
    const [custvendval, setCustvendval] = useState('');
    const [alertObj, setAlertObj] = useState({
        type: '', text: 'Done', url: ''
    })

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation');
            const customer = await ActiveCustomer(org)
            setCustomerlist(customer)
            const vendor = await ActiveVendor(org)
            setVendorlist(vendor)

            const result = await GetCrm(org, localStorage.getItem('CrmmasterSno'))
            setData(result)

            setLoading(true)
            if (result.type === "Vendor") {
                document.getElementById('vendorid').checked = true;
                setCrmtypeval(result.type)
                setCrmType(false)
            }
            else if (result.type === "Customer") {
                document.getElementById('customerid').checked = true;
                setCrmtypeval(result.type)
                setCrmType(true)
            }
            else {
                alert('Invalid Type')
            }
        }
        fetchdata()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(false)

        const crmtype = crmtypeval;
        const person_name = document.getElementById("person_name").value;
        const cust_vend_name = custvendval.value ? custvendval.value : data.cust_vend;
        const from_date = document.getElementById("from_date").value

        if (!crmtype || !person_name || !cust_vend_name) {
            setLoading(true)
            setAlertObj({ type: 'warning', text: 'Please Enter Mandatory fields !', url: '' })
        }
        else {
            const result = await UpdateCrm(localStorage.getItem('CrmmasterSno'), localStorage.getItem('Organisation'), person_name, crmtype, cust_vend_name, localStorage.getItem('User_id'), from_date);
            if (result === "Updated") {
                localStorage.removeItem('CrmmasterSno');
                setAlertObj({ type: 'success', text: 'Data updated', url: '/ShowCrm' })
            }
            else {
                setAlertObj({ type: 'error', text: 'Server Not response', url: '' })
            }
        }

    }


    const handlechangename = (e) => {
        setData({ ...data, user_name: e.target.value })
    }
    const handleChangeDate = (e) => {
        setData({ ...data, Joindate: e.target.value })
    }

    const handletype = (e) => {
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
        <div className="wrapper">
            {/* <div className="preloader flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"> </div>
      </div> */}
            <Header />
            {
                loading ?
                    <div className='content-wrapper'>
                        <div className="container-fluid">
                            <br /> <h3 className="ml-5">Edit CRM Master</h3><br />
                            <div className="card w-100">
                                <article className='card-body'>
                                    <form autoComplete='off'>
                                        <div className="form-row">
                                            <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Type<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <input type="radio" id='vendorid' name='crmtype' value='Vendor' onChange={handletype} /> Vendor  &nbsp;
                                                <input type="radio" id='customerid' name='crmtype' value='Customer' onChange={handletype} /> Customer
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="person_name" className="col-md-2 col-form-label font-weight-normal">Person Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                <input type='text' className="form-control col-md-4" id='person_name' onChange={handlechangename} value={data.user_name} required />

                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Customer/Vendor Name<span style={{ color: "red" }}>*</span></label>
                                            <div className="col form-group">
                                                {
                                                    crmtype ?
                                                        <Select
                                                            className="col-md-4 text-dark"
                                                            options={options}
                                                            isMulti={false}
                                                            onChange={handleCustvendval}
                                                            placeholder={data.cust_vend}
                                                        />
                                                        :

                                                        <Select
                                                            className="col-md-4 text-dark"
                                                            options={options2}
                                                            isMulti={false}
                                                            onChange={handleCustvendval}
                                                            placeholder={data.cust_vend}
                                                        />
                                                }
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Date</label>
                                            <div className="col form-group">
                                                <input type="Date" className="form-control col-md-4" id='from_date' value={data.Joindate}
                                                    onChange={(e) => handleChangeDate(e)}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </article>
                                <div className='border-top card-body'>
                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Update</button>
                                    <button className="btn btn-secondary ml-3" onClick={() => { localStorage.removeItem('CrmmasterSno'); window.location.href = "./ShowCrm" }}>Cancel</button>
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

export default EditCrm
