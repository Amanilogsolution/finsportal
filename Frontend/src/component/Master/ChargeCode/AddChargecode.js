import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {AddChargecodeapi} from "../../../api";


const AddChargecode = () => {
    const [data, setData] = useState({})

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
        const description = document.getElementById("description").value;
        const short_name = document.getElementById("short_name").value;
        const nature = document.getElementById("nature").value;
        const major_code = document.getElementById("major_code").value;
        const activity = document.getElementById("activity").value;
        const sacHsncode = document.getElementById("sacHsncode").value;
        const gstrate = document.getElementById("gstrate").value;

        const org=  localStorage.getItem('Organisation');
        const user_id=localStorage.getItem('User_id');

        console.log(description, short_name,nature,major_code,activity,sacHsncode,gstrate)
        if (!description || !short_name || !nature || !major_code || !activity  || !sacHsncode || !gstrate) {
            alert('Please Enter the mandatory field')
        }
        else {
            const result = await AddChargecodeapi(  org,description,short_name,nature,major_code,activity,sacHsncode,gstrate,user_id);
            if (result == "Added") {
                alert('Data Added')
                window.location.href = '/ShowChargecode'
                localStorage.removeItem('ChargecodeSno');
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
                <Menu />
                <div>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">Add Charge Code</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>

                                                <div className="form-row">
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Description</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='description'  />
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Short Name</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='short_name'   />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='nature'  />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="major_code" className="col-md-2 col-form-label font-weight-normal">Major Code</label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id='major_code' >
                                                            <option selected defaultValue hidden>select the major Code</option>
                                                            <option >select the major Code1</option>
                                                            <option >select the major Code2</option>
                                                            <option >select the major Code3</option>
                                                            <option >select the major Code4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="activity" className="col-md-2 col-form-label font-weight-normal">Activity</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='activity'   />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="sacHsncoe" className="col-md-2 col-form-label font-weight-normal">SAC/HSN Code</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='sacHsncode' />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="gstrate" className="col-md-2 col-form-label font-weight-normal">GST Rate(in %)</label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='gstrate' maxLength={3} />
                                                    </div>
                                                </div>

                                            </form>
                                        </article>
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" onClick={handleClick}>Add</button>
                                            <button className="btn btn-light ml-3" onClick={() => {  window.location.href = "./ShowChargecode" }}>Cancel</button>
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

export default AddChargecode
