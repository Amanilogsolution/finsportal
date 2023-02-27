import React, { useEffect,useState } from 'react'
import  Footer from "../Footer/Footer";
import {ActiveCustomer} from '../../api'

import Header from "../Header/Header";

export default function CustomerNames() {
    const [activecustomer, setActiveCustomer] = useState([])
    useEffect(()=>{
        const fetchdata = async () => {
            const org = localStorage.getItem('Organisation')
        const result = await ActiveCustomer(org)
        setActiveCustomer(result)
        Todaydate()
        }
        fetchdata()
    },[])
    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        document.getElementById("date").value = today;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const org = localStorage.getItem('Organisation')
        const customerid = document.getElementById('customer_id').value
        const name = document.getElementById('name').value
        const date = document.getElementById('date').value
        console.log(customerid,name,date)
    }

  return (
    <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row pt-3" >
                            <div className="col">
                                <div className="card">
                                    <article
                                        className="card-body" >
                                        <h3 className="text-left"> New Customer Names</h3>
                                        <br />

                                        <form autoComplete="off">
                                            <div className="form-row ">
                                                <label htmlFor='ac_name' className="col-md-2 col-form-label font-weight-normal" >Customer Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                    <select
                                                        id="customer_id"
                                                        // onChange={handlcustomer}
                                                        className="form-control col-md-4">

                                                        <option value='' hidden>Select Customer</option>
                                                        {
                                                                activecustomer.map((items, index) => (
                                                                    <option key={index} value={items.cust_id} >{items.cust_name}</option>
                                                                ))
                                                            }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >New Name <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                <input type="text" className="form-control col-md-4 cursor-notallow" id="name" placeholder=""  />

                                                </div>
                                            </div>
                                            <div className="form-row mt-2">
                                                <label htmlFor='location' className="col-md-2 col-form-label font-weight-normal" >Date <span className='text-danger'>*</span> </label>
                                                <div className="d-flex col-md">
                                                <input type="date" className="form-control col-md-4 cursor-notallow" id="date" placeholder=""  />

                                                </div>
                                            </div>
                                            <hr />
                                           
                                            <hr />
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="save"></label>
                                                <div className="col-md-20" style={{ width: "100%" }}>
                                                    <button id="save" name="save" className="btn btn-danger"
                                                     onClick={handleSubmit}
                                                     >
                                                        Update
                                                    </button>
                                                    <button id="clear" 
                                                    // onClick={(e) => {
                                                    //     e.preventDefault(); window.location.href = '/home'
                                                    // }}
                                                     name="clear" className="btn ml-2 btn btn-secondary">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </article>
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
