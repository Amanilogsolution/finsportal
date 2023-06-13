import React,{useReducer} from 'react';
import { ToastContainer} from 'react-toastify';
const AlertsComp = () => {
  return (
    <>
      <ToastContainer
       position="bottom-center"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      />
    </>
  );
};

export default AlertsComp;
