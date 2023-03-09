import React from "react";
import { memo } from 'react'
import './footer.css'

const Footer = () => {
  const themedata = localStorage.getItem('themetype') || 'light';

  return (
    <footer className={`main-footer footer-div bg-${themedata}`}>
      <strong>
        Copyright © 2023-2024 <a href="#" className="text-uppercase">{localStorage.getItem('Organisation Name')}</a>.
      </strong>
      <span className="ml-1"> All rights reserved.</span>
    </footer>
  );

}

export default memo(Footer);