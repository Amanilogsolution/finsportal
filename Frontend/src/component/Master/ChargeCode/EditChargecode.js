import React, { useEffect, useState } from 'react';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import { GetChargecode, UpdateChargecode } from "../../../api";


const EditChargecode = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            const result = await GetChargecode(localStorage.getItem('Organisation'), localStorage.getItem('ChargecodeSno'))
            setData(result)
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

        const sno = localStorage.getItem('ChargecodeSno');
        const org = localStorage.getItem('Organisation');
        const user_id = localStorage.getItem('User_id');

        console.log(description, short_name, nature, major_code, activity, sacHsncode, gstrate)
        if (!description || !short_name || !nature || !major_code || !activity || !sacHsncode || !gstrate) {
            alert('Enter the Mandatory field...')
        }
        else {
            // sno,org,description,short_name,nature,major_code,activity,sacHsn,gst_rate,User_id
            const result = await UpdateChargecode(sno, org, description, short_name, nature, major_code, activity, sacHsncode, gstrate, user_id);
            console.log(result)
            if (result == "updated") {
                alert('Data Updated')
                localStorage.removeItem('ChargecodeSno');
                window.location.href = '/ShowChargecode'
            }
            else {
                alert('Server error')
            }
        }

    }

    const handleDescription = (e) => {
        setData({ ...data, description: e.target.value })
    }

    const handleShort_name = (e) => {
        setData({ ...data, short_name: e.target.value })
    }

    const handleNature = (e) => {
        setData({ ...data, nature: e.target.value })
    }
    const handleMajor_code = (e) => {
        setData({ ...data, major_code: e.target.value })
    }
    const handleActivity = (e) => {
        setData({ ...data, activity: e.target.value })
    }

    const handleSacHsn_code = (e) => {
        setData({ ...data, sacHsn: e.target.value })
    }
    const handleGst_rate = (e) => {
        setData({ ...data, gst_rate: e.target.value })
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
                            <br /> <h3 className="text-left ml-5">Edit Charge Code</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>

                                                <div className="form-row">
                                                    <label htmlFor="description" className="col-md-2 col-form-label font-weight-normal">Description</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='description' value={data.description} onChange={handleDescription} />
                                                    </div>
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="short_name" className="col-md-2 col-form-label font-weight-normal">Short Name</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='short_name' value={data.short_name} onChange={handleShort_name} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='nature' value={data.nature} onChange={handleNature} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="major_code" className="col-md-2 col-form-label font-weight-normal">Major Code</label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id='major_code' value={data.major_code} onChange={handleMajor_code} >
                                                            <option selected defaultValue hidden>{data.major_code}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="activity" className="col-md-2 col-form-label font-weight-normal">Activity</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='activity' value={data.activity} onChange={handleActivity} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="sacHsncoe" className="col-md-2 col-form-label font-weight-normal">SAC/HSN Code</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='sacHsncode' value={data.sacHsn} onChange={handleSacHsn_code} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="gstrate" className="col-md-2 col-form-label font-weight-normal">GST Rate(in %)</label>
                                                    <div className="col form-group">
                                                        <input type="number" className="form-control col-md-4" id='gstrate' value={data.gst_rate} maxLength={3} onChange={handleGst_rate} />
                                                    </div>
                                                </div>

                                            </form>
                                        </article>
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" onClick={handleClick}>Update</button>
                                            <button className="btn btn-light ml-3" onClick={() => { localStorage.removeItem('ChargecodeSno'); window.location.href = "./ShowChargecode" }}>Cancel</button>
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

export default EditChargecode
