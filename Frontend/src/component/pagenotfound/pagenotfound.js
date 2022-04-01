import React from 'react'
import './pagenotfound.css'

const PageNotFound = () => {
    return (
        <div id="wrapper">
            <img className="pagenotfounfimage" src="https://i.imgur.com/qIufhof.png" alt="PagenotFound"/>
            <div id="info">
                <h1>404</h1>
                <h3>This page could not be found</h3>
            </div> 
        </div >
    )
}

export default PageNotFound