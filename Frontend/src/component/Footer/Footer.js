import React from "react";

 const Footer =(props)=> {
   const themedata= props.theme || 'light';

  
    return (
      <footer className={`main-footer bg-${themedata}`}>
        <strong>
          Copyright © 2022-2023 <a href="#">{localStorage.getItem('Organisation Name')}</a>.
        </strong>
        All rights reserved.
      </footer>
    );

}

export default Footer;