import React,{useEffect,useState} from 'react';
import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import {GetAccountMinorCode,UpdateAccountMinorCode} from '../../../api'

function EditAccountMinorCode() {
  const [data,setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetAccountMinorCode(localStorage.getItem('Organisation'),localStorage.getItem('AccountMinorCode'));
      setData(result)
      console.log(result)
    }
    fetchData();
  }, [] )
  
  const handleClick = async(e) => {
    e.preventDefault(); 
    const account_name = document.getElementById('account_name').value;
    // const account_name_code = document.getElementById('account_name_code').value;
    // const account_type_code = document.getElementById('account_type_code').value
    const org= localStorage.getItem('Organisation');
    const User_id= localStorage.getItem('User_id');

    const result = await UpdateAccountMinorCode(org,localStorage.getItem('AccountMinorCode'),account_name,User_id);
    if(result){
      alert('Account Minor Code Updated Successfully')
      window.location.href = 'ShowAccountMinorCode'
      localStorage.removeItem('AccountMinorCode')
    }
  }

  const handleChangeAccountName = (e) => {
    setData({...data,account_name:e.target.value})
}
// const handleChangeAccountNameCode = (e) => {
//     setData({...data,account_name_code:e.target.value})
// }
// const handleChangeAccountTypeCode = (e) => {
//     setData({...data,account_type_code:e.target.value})
// }

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
            <br /> <h3 className="text-left ml-5">Edit Account Info</h3>
            <div className="row ">
              <div className="col ml-5">
                <div className="card" style={{ width: "100%" }}>
                  <article className="card-body">
                    <form>
                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name</label>
                        <div className="col form-group">
                          <input type="text" className="form-control col-md-4" id='account_name'  value={data.account_name} onChange={(e) => handleChangeAccountName(e)} />
                        </div>
                    
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Name Code</label>
                        <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='account_name_code'  value={data.account_name_code} 
                        // onChange={(e) => handleChangeAccountNameCode(e)}
                         />
                        </div>
                      </div>

                      <div className="form-row">
                        <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Type Code</label>
                        <div className="col form-group">
                        <input type="text" className="form-control col-md-4" id='account_type_code'  value={data.account_type_code} 
                        // onChange={(e) => handleChangeAccountTypeCode(e)} 
                        />
                        </div>
                      </div>

                    </form>
                  </article>
                  {/* card-body end .// */}
                  <div className="border-top card-body">
                    <button className="btn btn-success" 
                    onClick={handleClick} 
                    >Update</button>
                    <button className="btn btn-light ml-3" 
                    onClick={()=>{window.location.href="./ShowAccountMinorCode";localStorage.removeItem('AccountMinorCode')
                }}>Cancel</button>
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

export default EditAccountMinorCode
