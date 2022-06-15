import React, { useState } from 'react'
import { Insertcompliance } from '../../api'


const Practice = () => {
  const [total, setTotal] = useState(1)
  const [fromdate,setFromDate] = useState([])
  const [todate,setToDate] = useState([])
  const [periodname,setPeriodName] = useState([])
  const [fromapplicable,setFromApplicable] = useState([])
  const [duedate,setdueDate] = useState([])
  const [extenddate,setExtendDate] = useState([])
  const [period,setPeriod] = useState()



  const handleChange = (e) => {
    const value = e.target.value
    console.log(value)
    setTotal(parseInt(value))
  }

  const handleChangedate = (e) => {
   const date = e.target.value
   setFromDate([...fromdate,date])
   console.log(date)
  }

  const handleChangeTodate = (e) => {
    const date = e.target.value
    setToDate([...todate,date])  
   }

   const handleChangeduedate = (e) => {
    const date = e.target.value
    setdueDate([...duedate,date])  
   }

   const handleChangeextenddate = (e) => {
    const date = e.target.value
    setExtendDate([...extenddate,date])  
   }

   

   
const handleSelect = (e) =>{
  const values = e.target.value
  setPeriod(values)
  if(values === 'Quaterly'){
    setTotal(4)
  }else if(values === 'Semi_Annual'){
    setTotal(2)
  }
  console.log(values)
}

  const handlesave =()=>{
    const org = localStorage.getItem('Organisation')
    const ComplianceType = document.getElementById('compliancetype').value
    const nature =document.getElementById('nature').value
    console.log(periodname,fromdate,todate,duedate,fromapplicable,extenddate)
    periodname.map(async(name,index)=>{
      const result = await Insertcompliance(org,ComplianceType,nature,period,name,fromdate[index],todate[index],fromapplicable[index],duedate[index],extenddate[index])
          // console.log(ComplianceType,nature,period,name,fromdate[index],todate[index],duedate[index],fromapplicable[index],extenddate[index])
    })
   
  }

  const handlePeriodname =(e)=>{
  
     const data2 = e.target.value;
     setPeriodName([...periodname,data2])
  }

  const handleFromApplicable =(e)=>{

    const data2 = e.target.value;
    setFromApplicable([...fromapplicable,data2])
 }
  
  
  return (
    <div>
      <h1>Hello</h1>
      <select onChange={handleChange}>
        <option value='4'>4</option>
        <option value='3'>3</option>
      </select>
      <div className="content-wrapper">

        <div className="container-fluid">
          <br /> <h3 className="text-left ml-5">Add Compliances</h3>
          <div className="row ">
            <div className="col ml-5">
              <div className="card" >
                <article className="card-body">
                  <form>
                    <div className="form-row">
                      <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Compliances type</label>
                      <div className="col form-group">
                        <select
                          id="compliancetype"
                          className="form-control col-md-4"
                        >
                          <option selected default hidden >Select Compliances</option>


                        </select>
                      </div>
                      {/* form-group end.// */}
                    </div>

                    <div className="form-row">
                      <label htmlFor="nature" className="col-md-2 col-form-label font-weight-normal">Nature</label>
                      <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='nature' />
                      </div>
                      {/* form-group end.// */}
                    </div>

                   
                    <div className="form-row">    

                      <label htmlFor="Period" className="col-md-2 col-form-label font-weight-normal">Period</label>
                      <div className="col form-group">
                        <select
                          id="compliancetype"
                          className="form-control col-md-4"
                          onChange={handleSelect}
                          
                        >
                          <option selected default hidden >Select Compliances</option>
                          <option value='Quaterly'>Quaterly</option>
                          <option value='Annual'>Annual</option>
                          <option value='Monthly'>Monthly</option>
                          <option value='Semi_Annual'>Semi Annual</option>



                        </select>
                      </div>
                      {/* form-group end.// */}
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Period Name</th>
                          <th scope="col">From Month</th>
                          <th scope="col">To Month</th>
                          <th scope="col">From Applicable</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">Extended Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Array.from(Array(total).keys()).map((index) => (
                            <>
                              <tr>
                                <th ><input type="text" className="form-control " id="period_name" onBlur={handlePeriodname}  /></th>
                                <td><input type="date" className="form-control" id='from_date' onChange={handleChangedate}  /></td>
                                <td><input type="date" className="form-control " id='to_date' onChange={handleChangeTodate}  /></td>
                                <td><input type="text" className="form-control " id='From_Applicable' onBlur={handleFromApplicable}  /></td>
                                <td><input type="date" className="form-control " id='due_date' onChange={handleChangeduedate} /></td>
                                <td><input type="date" className="form-control " id='extended_date' onChange={handleChangeextenddate}  /></td>
                              </tr>
                            </>

                          ))
                        }
                      </tbody>
                    </table>
                  </form>
                </article>
                {/* card-body end .// */}
                <div className="border-top card-body">

                  <button className="btn btn-success"  onClick={handlesave}>Save</button>
                  <button className="btn btn-light ml-3" onClick={() => { window.location.href = "/Showcompliances" }}>Cancel</button>
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

  )

}
export default Practice
