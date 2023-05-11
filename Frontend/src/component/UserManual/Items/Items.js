import React from 'react'
import img1 from '../../../images/UserManual/items/img1.jpg'
import img2 from '../../../images/UserManual/items/img2.jpg'
import img3 from '../../../images/UserManual/items/img3.jpg'
import './Items.css'

export default function Items() {
  return (
    <div className='items' style={{padding:"20px"}}>
        <div className='d-flex'>
            <strong className='mx-1'>Note : -</strong><p className='mx-1' style={{color:"red"}}>Red Dot</p><p className='mx-1'>will indicate the cursor position</p> 
        </div>
        <div className='d-flex justify-content-between'>
            <div style={{width:"70%"}}>
                <h2>Items</h2>
                <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original 
            form,accompanied by English versions from the 1914 translation by H. Rackham.</p>
            <h2>Selected Items</h2>
                <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original 
            form,accompanied by English versions from the 1914 translation by H. Rackham.</p>
            </div>
            
            <img src={img1} style={{width:"150px",marginRight:"20px"}}/>
        </div>
        <div >
            <div>
                <h2>Add Items</h2>
                <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original 
            form,accompanied by English versions from the 1914 translation by H. Rackham.</p>
            </div>
            <div style={{padding:"20px 90px"}}>
        <img src={img2} style={{width:"100%",height:"450px",marginleft:"20px"}}/>
        </div>
            
        </div>
        <div >
            <div>
                <h2>Submit Form</h2>
                <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original 
            form,accompanied by English versions from the 1914 translation by H. Rackham. standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
            Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original 
            form,accompanied by English versions from</p>
            </div>
            <div style={{padding:"20px 90px"}}>
        <img src={img3} style={{width:"100%",height:"450px",marginleft:"20px"}}/>
        </div>
            
        </div>
    </div>
  )
}
