// import React from 'react';
// import Header from "../../Header/Header";
// import Menu from "../../Menu/Menu";
// import Footer from "../../Footer/Footer";
// import {InsertAccountInfo} from '../../../api'

// function AddAccountInfo() {

//     const handleClick = async(e) => {
//         e.preventDefault();
//         const org = localStorage.getItem('Organisation');
//         const AccountinfoName = document.getElementById('AccountinfoName').value;
//         const AccountInfoType = document.getElementById('AccountInfoType').value;
//         const User_id = localStorage.getItem('User_id');

//         console.log(AccountinfoName,AccountInfoType)
//         const result = await InsertAccountInfo(org,AccountinfoName,AccountInfoType,User_id)
//       if(result){
//         alert('Account Info Added Successfully')
//         window.location.href = '/ShowAccountInfo'
//       }


//      }
    

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
//             <br /> <h3 className="text-left ml-5">Add Item Account Info</h3>
//             <div className="row ">
//               <div className="col ml-5">
//                 <div className="card" style={{ width: "100%" }}>
//                   <article className="card-body">
//                     <form>
//                       <div className="form-row">
//                         <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Info Name</label>
//                         <div className="col form-group">
//                           <input type="text" className="form-control col-md-4" id='AccountinfoName'   />
//                         </div>
//                         {/* form-group end.// */}
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="user_name" className="col-md-2 col-form-label font-weight-normal">Account Info Type</label>
//                         <div className="col form-group">
//                         <select id="AccountInfoType"
//                               className="form-control col-md-4" >
//                          <option selected default hidden>Select</option>
//                          <option value="Sales">Sales </option>
//                          <option value="Purchase">Purchase </option>
//                          </select>
//                         </div>
//                         {/* form-group end.// */}
//                       </div>

//                     </form>
//                   </article>
//                   {/* card-body end .// */}
//                   <div className="border-top card-body">
//                     <button className="btn btn-success" 
//                     onClick={handleClick} 
//                     >Save</button>
//                     <button className="btn btn-light ml-3" onClick={()=>{window.location.href="./ChartOfAccount"}}>Cancel</button>
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

// export default AddAccountInfo
