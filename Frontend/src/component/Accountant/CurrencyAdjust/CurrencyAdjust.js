import Header from '../../Header/Header';
// import Menu from '../../Menu/Menu';
import Footer from '../../Footer/Footer';
import './currencyadjustment.css'
import React, { useState } from 'react';
import { CurrencyAdjustment } from '../../../api/index'

function CurrencyAdjust() {
    let arr = [];

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     for (let i = 1; i <= 9; i++) {
    //         let obj = {};
    //         for (let j = 0; j <= 9; j++) {
    //             let valval = document.getElementById("tr" + i + "td" + j).value;
    //             Object.assign(obj, { [document.getElementById("c" + j).innerText]: valval });
    //         }
    //         arr.push(obj);
    //     }
    // }
    const Import = async (e) => {
        e.preventDefault();
        for (let i = 1; i <= 9; i++) {
            let obj = {};
            for (let j = 0; j <= 9; j++) {
                let valval = document.getElementById("tr" + i + "td" + j).value;
                Object.assign(obj, { [document.getElementById("c" + j).innerText]: valval });
            }
            arr.push(obj);
        }
        console.log(arr)
        const result = await CurrencyAdjustment(localStorage.getItem('Organisation'),arr)
    }
    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    {/* <Menu /> */}

                    <div className="content-wrapper">

                        <div className="maindiv-row">
                            <div>
                                <h3 className='text-left ml-5'>Currency Adjustments</h3>

                                <div className="card maindiv-card" >

                                    <article
                                        className="card-body">
                                        <br />
                                        <table style={{ width: "100%" }}>
                                            <thead style={{ border: "2px solid black" }}>
                                                <tr>
                                                    <td style={{ border: "2px solid black" }} id="c0">Currency</td>
                                                    <td style={{ border: "2px solid black" }} id="c1">Rupee</td>
                                                    <td style={{ border: "2px solid black" }} id="c2" >US</td>
                                                    <td style={{ border: "2px solid black" }} id="c3">EURO</td>
                                                    <td style={{ border: "2px solid black" }} id="c4" >UK</td>
                                                    <td style={{ border: "2px solid black" }} id="c5">AUS</td>
                                                    <td style={{ border: "2px solid black" }} id="c6">Japanese</td>
                                                    <td style={{ border: "2px solid black" }} id="c7" >Singapore </td>
                                                    <td style={{ border: "2px solid black" }} id="c8">Reminbi </td>
                                                    <td style={{ border: "2px solid black" }} id="c9">Taiwan </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr id="t1">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td0" disabled value="Rupee" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} > <input id="tr1td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td3" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr1td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' onClick={handleClick} value="Save" /></td> */}
                                                </tr>
                                                <tr id="t2">
                                                    <td style={{ border: "1px solid black" }}  ><input id="tr2td0" disabled type="text" value={"US $"}/></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td3" type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr2td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                                <tr id="t3">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td0" disabled type="text" value={"EURO €"}/></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td3" type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr3td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                                <tr id="t4">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td0" disabled type="text" value={"UK £"}/></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td3" type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr4td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                                <tr id="t5">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td0" disabled type="text" value={"AUS $"}/></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr5td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr5td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}> <input id="tr5td3" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr5td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                                <tr id="t6">
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td0" disabled type="text" value={"Japanese ¥ "}/></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}> <input id="tr6td3" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr6td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} > <input type="button" className='btn btn-success' value="Save" /></td> */}
    </tr>
                                                <tr id="t7">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td0" disabled type="text" value={"Singapore $"} /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td3" type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr7td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr7td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input id="tr7td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr7td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} >
                                                        <input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                                <tr id="t8">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr8td0" disabled type="text" value={"Reminbi ¥"}/></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td3" type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr8td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} >
                                                        <input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                                <tr id="t9">
                                                    <td style={{ border: "1px solid black" }} ><input id="tr9td0" disabled type="text" value={"Taiwan $"}/> </td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td1" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td2" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td3" type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td4" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td5" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td6" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td7" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td8" type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input id="tr9td9" type="text" /></td>
                                                    {/* <td style={{ border: "1px solid black" }} >
                                                        <input type="button" className='btn btn-success' value="Save" /></td> */}

                                                </tr>
                                            </tbody>
                                        </table>
                                        <button onClick={Import} className="btn btn-danger mt-4 ml-4">Insert Data</button>


                                    </article>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default CurrencyAdjust;