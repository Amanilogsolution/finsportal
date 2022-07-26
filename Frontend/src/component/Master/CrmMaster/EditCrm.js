import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
// import {updatePaymentterm,ShowPaymentTerm} from "../../../api";


const EditCrm = () => {
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
        const description = document.getElementById("description").value;
        const short_name = document.getElementById("short_name").value;
        const nature = document.getElementById("nature").value;

        console.log(description, short_name, nature)
        if (!description || !short_name || !nature) {
            // alert('Enter data')
        }
        else {
            // const result = await updatePaymentterm(localStorage.getItem('TermSno'), localStorage.getItem('Organisation'), paymentterm, paymentdays, localStorage.getItem('User_id'));
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
        }
        else {
            setCrmType(false)
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
                            <br /> <h3 className="text-left ml-5">Edit Crm Master</h3>
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
                                                    <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Person Name<span style={{color:"red"}}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='short_name' />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Customer/Vendor Name<span style={{color:"red"}}>*</span></label>
                                                    <div className="col form-group">
                                                        {
                                                            crmtype ?
                                                                <select type="text" className="form-control col-md-4" id='short_name'  >
                                                                    <option hidden>Select the Customer</option>
                                                                </select>
                                                                :
                                                                <select type="text" className="form-control col-md-4" id='short_name'  >
                                                                    <option hidden>Select the vendor</option>
                                                                </select>
                                                        }


                                                    </div>
                                                </div>
                                            </form>
                                        </article>
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" onClick={handleClick}>Update</button>
                                            <button className="btn btn-light ml-3" onClick={() => {localStorage.removeItem('CrmmasterSno'); window.location.href = "./ShowCrm" }}>Cancel</button>
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
