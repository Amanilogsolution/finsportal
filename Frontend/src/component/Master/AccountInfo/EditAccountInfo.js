// import React,{useEffect,useState} from 'react';
// import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
// import Footer from "../../Footer/Footer";
// import {SelectAccountInfo,UpdateAccountInfo} from '../../../api'

// function EditAccountInfo() {
//   const [data,setData] = useState({})

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await SelectAccountInfo(localStorage.getItem('Organisation'),localStorage.getItem('AccountInfosno'));
//       setData(result)
//       console.log(result)
//     }
//     fetchData();
//   }, [] )
  
//   const handleClick = async(e) => {
//     e.preventDefault(); 
//     const account_info_name = document.getElementById('account_info_name').value;
//     const account_info_type = document.getElementById('AccountInfoType').value;
//     console.log(account_info_name,account_info_type)
//     const result = await UpdateAccountInfo(localStorage.getItem('Organisation'),localStorage.getItem('AccountInfosno'),account_info_name,account_info_type,localStorage.getItem("User_id"));
//     if(result){
//       alert('Account Info Updated Successfully')
//       window.location.href = 'ShowAccountInfo'
//     }
//   }

//   const handleChangeAccountInfo = (e) => {
//     setData({...data,account_info_name:e.target.value})
// }

//   return (
//     <div> 
//     <div className="wrapper">
//     <div className="preloader flex-column justify-content-center align-items-center">
//         <div className="spinner-border" role="status"> </div>
//       </div>
//       <Header />
//       <Menu />
//       <div>
//         <div className="content-wrapper">
//           <div className="container-fluid">
//             <br /> <h3 className="text-left ml-5">Edit Account Info</h3>
//             <div className="row ">
//               <div className="col ml-5">
//                 <div className="card" style={{ width: "100%" }}>
//                   <article className="card-body">
//                     <form>
//                       <div className="form-row">
//                         <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Info Name</label>
//                         <div className="col form-group">
//                           <input type="text" className="form-control col-md-4" id='account_info_name'  value={data.account_info_name} onChange={(e) => handleChangeAccountInfo(e)} />
//                         </div>
                    
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Info Type</label>
//                         <div className="col form-group">
//                         <select id="AccountInfoType"
//                               className="form-control col-md-4" >
//                          <option selected default hidden>{data.account_info_type}</option>
//                          <option value="Sales">Sales </option>
//                          <option value="Purchase">Purchase </option>
//                          </select>
//                         </div>
                   
//                       </div>

//                     </form>
//                   </article>
//                   {/* card-body end .// */}
//                   <div className="border-top card-body">
//                     <button className="btn btn-success" 
//                     onClick={handleClick} 
//                     >Update</button>
//                     <button className="btn btn-light ml-3" 
//                     onClick={()=>{window.location.href="./ChartOfAccount"}}>Cancel</button>
//                   </div>
//                 </div>
//                 {/* card.// */}
//               </div>
//               {/* col.//*/}
//             </div>
//             {/* row.//*/}
//           </div>   
//         </div>
//       </div>
//       <Footer />
//     </div>
//   </div>
//   )
// }

// export default EditAccountInfo
