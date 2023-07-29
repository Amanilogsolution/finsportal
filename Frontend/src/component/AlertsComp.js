import React, { useState, useEffect } from 'react';
import './AlertsComp.css'
const AlertsComp = ({ data }) => {

  useEffect(() => {
    myFunction(color[data.type], data.text, data.url)
  }, [data])

  const [icon, setIocn] = useState({
    error: 'https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png',
    success: 'https://www.pngkit.com/png/full/776-7762350_download-transparent-check-mark-gif.png',
    warning: 'https://www.citypng.com/public/uploads/preview/png-orange-error-warning-icon-11639742699bjl3rmwkvw.png',
  });
  const [color, setColor] = useState({
    error: '#dc3d45',
    success: '#41a846',
    warning: '#fec239',
  });


  function myFunction(color, text, url) {
    let icons = icon[`${data.type}`]
    document.getElementById('alert_icons').src = icons
    var x = document.getElementById('snackbar');
    x.className = 'show';
    document.getElementById('snackbar').style.background = color;
    document.getElementById('textTag').innerHTML = text;



    setTimeout(function () {
      x.className = x.className.replace('show', '');
      if (url !== 'referece') {
        if (data.type !== 'warning') { window.location.href = url }
      }
      else{
        window.location.reload()
      }
    }, 1000);
  }
  return (
    <>
      <div>
        <div id="snackbar">
          <div id='snackbar_icons'>
            <img src='' alt='Alert Icons' id='alert_icons' />
          </div>
          <div id='textTag'>Some text some message..</div>
        </div>
      </div>
    </>
  );
};

export default AlertsComp;
