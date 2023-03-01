import React from "react";
import { memo } from 'react'

const Footer = () => {
  const themedata = localStorage.getItem('themetype') || 'light';

  return (
    <footer className={`main-footer bg-${themedata}`}>
      <strong>
        Copyright © 2022-2023 <a href="#" className="text-uppercase">{localStorage.getItem('Organisation Name')}</a>.
      </strong>&nbsp;
      All rights reserved.
    </footer>
  );

}

export default memo(Footer);