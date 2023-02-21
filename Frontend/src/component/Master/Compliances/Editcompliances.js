import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { showcompliancesData, updatecompliance, showcompliancesType } from '../../../api'


function Editcompliances() {
    const [data, setData] = useState([])
    const [compliancetype, setComplianceType] = useState([])
    const themeval = localStorage.getItem('themetype')

    useEffect( () => {
        const fetchdata=async()=>{
            const result = await showcompliancesData(localStorage.getItem('Organisation'), localStorage.getItem('ComplianceSno'))
            setData(result)
            const ComplianceType = await showcompliancesType(localStorage.getItem('Organisation'))
            setComplianceType(ComplianceType)
        }
        fetchdata()
       
    }, [])


    const senddata = async (e) => {
        e.preventDefault();
        const compliance_type = document.getElementById("compliancetype").value;
        const nature = document.getElementById("nature").value;
        const period = document.getElementById('period').value;
        const period_name = document.getElementById('period_name').value;
        const from_month = document.getElementById('from_month').value;
        const to_month = document.getElementById('to_month').value;
        const from_applicable = document.getElementById('from_applicable').value;
        const due_date = document.getElementById('due_date').value;
        const extended_date = document.getElementById('extended_date').value;

        const result = await updatecompliance(localStorage.getItem('Organisation'), compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date, localStorage.getItem('ComplianceSno'), localStorage.getItem('User_name'))
        if (result) {
            window.location.href = '/Showcompliances'
            localStorage.removeItem('ComplianceSno')
        }

    }


    return (
        <div className="wrapper">
            <div className="preloader flex-column justify-content-center align-items-center">
                <div className="spinner-border" role="status"> </div>
            </div>
            <Header />
            <div className={`content-wrapper bg-${themeval}`}>
                <div className="container-fluid">
                    <h3 className="ml-5 py-2">Edit Compliances</h3>
                    <div className={`card mb-0 w-100 bg-${themeval}`}>
                        <form className="card-body" autoComplete='off'>
                            <div className="form-row">
                                <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Compliances type</label>
                                <div className="col form-group">
                                    <select
                                        id="compliancetype"
                                        className="form-control col-md-4"
                                    >
                                        <option value={data.compliance_type} hidden >{data.compliance_type}</option>
                                        {compliancetype.map((res, index) => (
                                            <option key={index} value={res.compliance_type} >{res.compliance_type}</option>

                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature</label>
                                <div className="col form-group">
                                    <input type="text" className="form-control col-md-4" id='nature' defaultValue={data.nature} />
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="period" className="col-md-2 col-form-label font-weight-normal">Period</label>
                                <div className="col form-group">
                                    <input id="period" type="text" className="form-control col-md-4 cursor-notallow" disabled defaultValue={data.period} />
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="period_name" className="col-md-2 col-form-label font-weight-normal">Period Name</label>
                                <div className="col form-group">
                                    <input type="text" className="form-control cursor-notallow col-md-4" id='period_name' disabled defaultValue={data.period_name} />
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="from_month" className="col-md-2 col-form-label font-weight-normal">From Month</label>
                                <div className="col form-group">
                                    <input type="date" className="form-control col-md-4" id='from_month' defaultValue={data.from_month} />
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="to_month" className="col-md-2 col-form-label font-weight-normal">To Month</label>
                                <div className="col form-group">
                                    <input type="date" className="form-control col-md-4" id='to_month' defaultValue={data.to_month} />
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="from_applicable" className="col-md-2 col-form-label font-weight-normal">From Applicable</label>
                                <div className="col form-group">
                                    <input type="text" className="form-control col-md-4" id='from_applicable' defaultValue={data.from_applicable} />
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="due_date" className="col-md-2 col-form-label font-weight-normal"> Due Date</label>
                                <div className="col form-group">
                                    <input type="date" className="form-control col-md-4" id='due_date' defaultValue={data.due_date} />
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="extended_date" className="col-md-2 col-form-label font-weight-normal"> Extended Date</label>
                                <div className="col form-group">
                                    <input type="date" className="form-control col-md-4" id='extended_date' defaultValue={data.extended_date} />
                                </div>
                            </div>

                        </form>
                        <div className="border-top card-body">
                            <button className="btn btn-success" onClick={senddata} >Update</button>
                            <button className="btn btn-light ml-3" onClick={() => { window.location.href = "/Showcompliances"; localStorage.removeItem('ComplianceSno') }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer theme={themeval}/>
        </div>
    )
}

export default Editcompliances
