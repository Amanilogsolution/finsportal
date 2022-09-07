import React from "react";

 const Footer =(props)=> {
  
    return (
      <footer className={`main-footer bg-${props.theme}`}>
      {console.log(props)}
        <strong>
          Copyright © 2022-2023 <a href="#">{localStorage.getItem('Organisation Name')}</a>.
        </strong>
        All rights reserved.
      </footer>
    );

}

export default Footer;