import React, { Component, useState } from 'react'
import Header from './Header'
import Menu from './Menu'
import './Customer.css'

const Customer = () => {
    const [show,setShow] = useState(true);
    const [address,setAddress] = useState(false)
    const [showremark,setShowremark] = useState(false)
    const [contactperson,setContactperson] = useState(false)
    const [addperson,setAddperson] = useState([1])

    return (
        <div>
            <Header />
            <Menu />
           
<div>
  <div className="container mr-0">
    <br />  <h3 className="text-left ml-5">New Customer</h3>
 
    <div className="row ">
      <div className="col ml-5">
        <div className="card"style={{width:"100%"}} >
        
          <article className="card-body">
            <form>

            <div className="form-row">
                <div className="col form-group">
                <label for="user_name" className="col-md-2 col-form-label font-weight-normal">Customer Type</label>
                <label className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" defaultValue="option1" />
                  <span className="form-check-label font-weight-normal"> Bussiness </span>
                </label>
                <label className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" defaultValue="option2" />
                  <span className="form-check-label font-weight-normal"> Individual</span>
                </label>
                </div>
              </div> {/* form-group end.// */}

              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Primary Contact</label>
                <div className="col form-group">
                  <select id="inputState" className="form-control">
                    <option selected> Salutation</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option >Ms.</option>
                    <option>Miss.</option>
                    <option>Dr.</option>
                  </select>
                </div> {/* form-group end.// */}
                <div className="col form-group">
                  <input type="text" className="form-control" placeholder="First name" />
                </div> {/* form-group end.// */}
                <div className="col form-group">
                  <input type="text" className="form-control" placeholder="Last name" />
                </div> {/* form-group end.// */}
              </div> {/* form-row end.// */}


              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Comapany Name</label>
                <div className="col form-group">
                <input type="text" className="form-control col-md-5" placeholder />
              </div> {/* form-group end.// */}
              </div>

              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Customer Display Name</label>
                <div className="col form-group">
                <input type="text" className="form-control col-md-5" placeholder />
              </div> {/* form-group end.// */}
              </div>

              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Customer Email</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-5" placeholder />
              </div> {/* form-group end.// */}
              </div>

              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Customer Phone</label>
                <div className="col form-group">
                  <input type="text" className="form-control" placeholder="Work Phone" />
                </div> {/* form-group end.// */}
                <div className="col form-group">
                  <input type="text" className="form-control" placeholder="Mobile" />
                </div> {/* form-group end.// */}
              </div> {/* form-row end.// */}
             
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Website</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-5" placeholder />
              </div> {/* form-group end.// */}
              </div>
           
              <div className="form-row bg-light">   
                <div className="col-md-2 form-group">
               <button className="btn btn-link" onClick ={(e)=> {e.preventDefault();setShow(true);setAddress(false);setShowremark(false);setContactperson(false)}}>Other Details</button>
                </div> {/* form-group end.// */}
                <div className="col-md-1 form-group">
               <button className="btn btn-link" onClick={(e)=>{e.preventDefault();setAddress(true);setShow(false);setShowremark(false);setContactperson(false)}}>Address</button>
                </div> {/* form-group end.// */} 
                 <div className="col-md-2 form-group">
               <button className="btn btn-link" onClick={(e)=>{e.preventDefault();setAddress(false);setShow(false);setShowremark(false);setContactperson(true)}}>Contact Persons</button>
                </div> {/* form-group end.// */}  
                <div className="col-md-2 form-group">
               <button className="btn btn-link">Custom Fields</button>
                </div> {/* form-group end.// */}  
                <div className="col-md-2 form-group">
               <button className="btn btn-link">Reporting Tags</button>
                </div> {/* form-group end.// */}
                <div className="col-md-2 form-group">
               <button className="btn btn-link" onClick={(e)=>{e.preventDefault();setShow(false);setAddress(false);setShowremark(true);setContactperson(false)}}>Remarks</button>
                </div> {/* form-group end.// */}
              </div> {/* form-row end.// */}

                    {/*----------------- Other Details--------- */}

            {show ? 
              <div className='Other_Details mt-3'>
              <div className="form-row">   
              <label for="user_name" class="col-md-2 col-form-label font-weight-normal">PAN</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-5" placeholder />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Currency</label>
                <div className="col-md-2 form-group">
                <select id="inputState" className="form-control">
                    <option selected> AED- UAE Dirham</option>
                    <option>AUD- Australian Dollar</option>
                    <option>CAD- Canadian Dollar</option>
                    <option >CNY- Yuan Renminbi</option>
                    <option>EUR- Euro</option>
                    <option>INR- Indian Rupee</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Opening Balance</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-5" placeholder />
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Payment Terms</label>
                <div className="col-md-2 form-group">
                <select id="inputState" className="form-control">
                    <option selected>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 45</option>
                    <option >Net 60</option>
                    <option>EUR- Euro</option>
                    <option>INR- Indian Rupee</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Opening Balance</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" for="flexCheckDefault">
                        Allow portal access for this customer
                   </label>
                  </div>
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Portal Language</label>
                <div className="col-md-2 form-group">
                <select id="inputState" className="form-control">
                    <option selected>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 45</option>
                    <option >Net 60</option>
                    <option>EUR- Euro</option>
                    <option>INR- Indian Rupee</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Facebook</label>
              <div className="col-md-4 form-group input-group">
    	     <div className="input-group-prepend">
		    <span className="input-group-text"></span>
		      </div>
             <input className="form-control" placeholder="" type="text"/>
            </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Twitter</label>
              <div className="col-md-4 form-group input-group">
    	     <div className="input-group-prepend">
		    <span className="input-group-text"></span>
		      </div>
             <input className="form-control" placeholder="" type="text"/>
            </div> 
              </div>

              </div>:null}

                 {/*------------- Address-------------- */}
                {address ?
                 <div className='Address mt-3'>
                     <div className="Address_left" style={{width:"50%",float:"left"}}>
                <label>BILLING ADDRESS</label>
                 <div className="form-row">   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">Attention</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row" >   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">Country / Region</label>
                <div className="col-md-6 form-group">
                <select id="inputState" className="form-control">
                    <option selected> Select</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">City</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder='Street 1' />
                <br/>
                <input type="email" className="form-control col-md-7" placeholder='Street 2' />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">City</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row" >   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">State</label>
                <div className="col-md-6 form-group">
                <select id="inputState" className="form-control">
                    <option selected> Select</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">Zip Code</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">Phone</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" class="col-md-2 col-form-label font-weight-normal">Fax</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>

                     </div>
                     <div className="Address_right" style={{width:"50%",float:'right'}}>
                <label>SHIPPING ADDRESS</label>
                 <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Attention</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row" >   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Country / Region</label>
                <div className="col-md-6 form-group">
                <select id="inputState" className="form-control">
                    <option selected> Select</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder='Street 1' />
                <br/>
                <input type="email" className="form-control col-md-7" placeholder='Street 2' />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">City</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row" >   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">State</label>
                <div className="col-md-6 form-group">
                <select id="inputState" className="form-control">
                    <option selected> Select</option>
                  </select>
              </div> {/* form-group end.// */}
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Zip Code</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Phone</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>
              <div className="form-row">   
              <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Fax</label>
                <div className="col form-group">
                <input type="email" className="form-control col-md-7" placeholder />
              </div> 
              </div>

                     </div>

                     </div>:null}

                     {/*--------- Remark ---------- */}
                     {showremark?
                     <div className="form-column">   
              <label htmlFor="user_name" className=" col-form-label font-weight-normal">Remarks</label>
                <div className="col form-group">
                <textarea name="text" className='col-md-9' id="" cols="30" rows="5"></textarea>
              </div> {/* form-group end.// */}
              </div>:null}
                {/*---------Add Contact Person ---------- */}
            {contactperson?
              <div>
              <table className="table">
  <thead className="thead-light">
    <tr>
      <th scope="col">	First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email Address</th>
      <th scope="col">	Work Phone</th>
      <th scope="col">Mobile</th>
       <th scope="col">Skype Name/Number</th>
        <th scope="col">Designation</th>
        <th scope="col">Department</th>
    </tr>
  </thead>
  <tbody>
      {addperson.map((element,index)=>(
    <tr>
      <td ><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
      <td><input className='inpfield'/></td>
    </tr>
))}
  </tbody>
</table>
<button className="btn btn-primary " onClick={(e)=>{e.preventDefault();setAddperson([...addperson,1])}}>Add Contact Person</button>
<button className="btn btn-danger ml-3" onClick={(e,index)=>{e.preventDefault();const list=[...addperson]; list.splice(index,1);setAddperson(list)}}>Delete</button>
              </div>:null}
            </form>
          </article> {/* card-body end .// */}
          <div className="border-top card-body">
            <button className="btn btn-success ">Save</button>
            <button className="btn btn-light ml-3">Cancel</button>
          </div>
        </div> {/* card.// */}
      </div> {/* col.//*/}
    </div> {/* row.//*/}
  </div> 
  <br /><br />

</div>
</div>

    )
}

export default Customer