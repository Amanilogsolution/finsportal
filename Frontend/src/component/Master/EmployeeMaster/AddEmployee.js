import React,{useEffect,useState} from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {  InsertEmployee,ActiveLocationAddress } from "../../../api";

const AddEmployee = () => {
  const [locationlist,setLocationlist] =useState([])

     useEffect(()=>{
        const fetchdata=async()=>{
            const location= await ActiveLocationAddress(localStorage.getItem('Organisation'))
            setLocationlist(location)
        }
        fetchdata()
     },[])


    const handleClick = async (e) => {
        e.preventDefault();
      const emp_name = document.getElementById('emp_name').value;
      const wh = document.getElementById('wh').value;

      const id = emp_name.slice(0, 3)
      const lastno = '' + Math.floor(Math.random() * 10000);
      const emp_id = id.toUpperCase() + lastno;


        if (!emp_name || !wh ) {
            alert('Enter data')
        }
        else {
            // org,emp_name,wh,emp_id,User_id
            const result = await InsertEmployee(localStorage.getItem('Organisation'),emp_name,wh,emp_id, localStorage.getItem('User_id'));
            if (result === "Added") {
                alert('Data Added')
                window.location.href = '/showemployee'
            }
            else {
                alert('Server not Response')
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
                <div>
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <br /> <h3 className="text-left ml-5">Add Employee </h3>
                            <div className="row ">
                                <div className="col ml-5">
                                    <div className="card" style={{ width: "100%" }}>
                                        <article className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <label htmlFor="emp_name" className="col-md-2 col-form-label font-weight-normal">Employee Name<span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <input type='text' className="form-control col-md-4" id='emp_name' required />

                                                    </div>
                                                </div>
                                      
                                                <div className="form-row">
                                                    <label htmlFor="wh" className="col-md-2 col-form-label font-weight-normal">warehouse <span style={{ color: "red" }}>*</span></label>
                                                    <div className="col form-group">
                                                        <select className="form-control col-md-4" id='wh' >
                                                        {
                                                            locationlist.map((item,index)=>
                                                            <option key={index} value={item.location_id}>{item.location_name}</option>)
                                                        }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="border-top card-body">
                                                    <button type='submit' className="btn btn-success" onClick={handleClick}>Add</button>
                                                    <button className="btn btn-light ml-3" onClick={() => { window.location.href = "./showemployee" }}>Cancel</button>
                                                </div>
                                            </form>
                                        </article>

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

export default AddEmployee
