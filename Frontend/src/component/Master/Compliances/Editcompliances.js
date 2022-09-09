import React, { useState, useEffect } from 'react'
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {showcompliancesData,updatecompliance,showcompliancesType} from '../../../api'


function Editcompliances() {

    const [data,setData] = useState([])
    const[compliancetype,setComplianceType] = useState([])

    useEffect(async() => {
        const result = await showcompliancesData(localStorage.getItem('Organisation'), localStorage.getItem('ComplianceSno'))
        setData(result)
        const ComplianceType = await showcompliancesType(localStorage.getItem('Organisation'))
        setComplianceType(ComplianceType)
         }, [])

    const senddata = async(e)=>{
        e.preventDefault();
        const compliance_type =document.getElementById("compliancetype").value;
        const nature = document.getElementById("nature").value;
        const period = document.getElementById('period').value;
        const period_name = document.getElementById('period_name').value;
        const from_month = document.getElementById('from_month').value;
        const to_month = document.getElementById('to_month').value;
        const from_applicable = document.getElementById('from_applicable').value;
        const due_date = document.getElementById('due_date').value;
        const extended_date = document.getElementById('extended_date').value;

        const result= await updatecompliance(localStorage.getItem('Organisation'),compliance_type, nature, period, period_name, from_month, to_month, from_applicable, due_date, extended_date,localStorage.getItem('ComplianceSno'),localStorage.getItem('User_name'))
        if (result){
            window.location.href='/Showcompliances'
            localStorage.removeItem('ComplianceSno')
        }

    }


    const handleChangeNature = (e) => {
        setData({...data,nature:e.target.value})
    }

    const handleChangePeriod = (e) => {
        setData({...data,period:e.target.value})
    }
    const handleChangePeriodName = (e) => {
        setData({...data,period_name:e.target.value})
    }
    const handleChangeformMonth = (e) => {
        setData({...data,from_month:e.target.value})
    }
    const handleChangeToMonth = (e) => {
        setData({...data,to_month:e.target.value})
    }
    const handleChangefromApplicable = (e) => {
        setData({...data,from_applicable:e.target.value})
    }
    const handleChangeDueDate = (e) => {
        setData({...data,due_date:e.target.value})
    }
    const handleChangeExtendedDate = (e) => {
        setData({...data,extended_date:e.target.value})
    }


    return (
        <div>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <div className="spinner-border" role="status"> </div>
                </div>
                <Header />
                {/* <Menu /> */}
                <div>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">Edit Compliances</h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Compliances type</label>
                                                    <div className="col form-group">
                                                        <select
                                                            id="compliancetype"
                                                            className="form-control col-md-4"
                                                        >
                                                            <option selected default hidden >{data.compliance_type}</option>
                                                            {compliancetype.map((res)=>(
                                                            <option value={res.compliance_type} >{res.compliance_type}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='nature' value={data.nature} onChange={(e) => handleChangeNature(e)}/>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="period" className="col-md-2 col-form-label font-weight-normal">Period</label>
                                                    <div className="col form-group">
                                                        <input id="period" type="text" className="form-control col-md-4" disabled value={data.period} onChange={(e) => handleChangePeriod(e)}/>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="period_name" className="col-md-2 col-form-label font-weight-normal">Period Name</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='period_name' disabled value={data.period_name} onChange={(e) => handleChangePeriodName(e)}/>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="from_month" className="col-md-2 col-form-label font-weight-normal">From Month</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='from_month' value={data.from_month} onChange={(e) => handleChangeformMonth(e)}/>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>

                                                <div className="form-row">
                                                    <label htmlFor="to_month" className="col-md-2 col-form-label font-weight-normal">To Month</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='to_month' value={data.to_month} onChange={(e) => handleChangeToMonth(e)}/>
                                                    </div>
                                                    {/* form-group end.// */}
                                                </div>
                                                <div className="form-row">
                                                    <label htmlFor="from_applicable" className="col-md-2 col-form-label font-weight-normal">From Applicable</label>
                                                    <div className="col form-group">
                                                        <input type="text" className="form-control col-md-4" id='from_applicable' value={data.from_applicable} onChange={(e) => handleChangefromApplicable(e)}/>
                                                    </div>
                                                </div>
                                                {/* form-group end.// */}
                                                <div className="form-row">
                                                    <label htmlFor="due_date" className="col-md-2 col-form-label font-weight-normal"> Due Date</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='due_date' value={data.due_date} onChange={(e) => handleChangeDueDate(e)}/>
                                                    </div>
                                                </div>
                                                {/* form-group end.// */}

                                                <div className="form-row">
                                                    <label htmlFor="extended_date" className="col-md-2 col-form-label font-weight-normal"> Extended Date</label>
                                                    <div className="col form-group">
                                                        <input type="date" className="form-control col-md-4" id='extended_date' value={data.extended_date} onChange={(e) => handleChangeExtendedDate(e)}/>
                                                    </div>
                                                </div>
                                                {/* form-group end.// */}
                                               

                                            </form>
                                        </article>
                                        {/* card-body end .// */}
                                        <div className="border-top card-body">
                                            <button className="btn btn-success" onClick={senddata} >Update</button>
                                            <button className="btn btn-light ml-3" onClick={() => { window.location.href = "/Showcompliances";localStorage.removeItem('ComplianceSno')}}>Cancel</button>
                                        </div>
                                    </div>
                                    {/* card.// */}
                                </div>
                                {/* col.//*/}
                            </div>
                            {/* row.//*/}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Editcompliances
