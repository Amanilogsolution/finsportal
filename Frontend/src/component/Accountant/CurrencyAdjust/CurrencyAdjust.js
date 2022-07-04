import Header from '../../Header/Header';
import Menu from '../../Menu/Menu';
import Footer from '../../Footer/Footer';
import './currencyadjustment.css'

function CurrencyAdjust() {
    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <div className="spinner-border" role="status"> </div>
                    </div>
                    <Header />
                    <Menu />

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
                                                    {/* <td   style={{border:"2px solid black"}}  >Sno</td> */}
                                                    <td style={{ border: "2px solid black" }} >Currency</td>
                                                    <td style={{ border: "2px solid black" }} >Rupee ₹</td>
                                                    <td style={{ border: "2px solid black" }} >US $</td>
                                                    <td style={{ border: "2px solid black" }} >EURO €</td>
                                                    <td style={{ border: "2px solid black" }} >UK £</td>
                                                    <td style={{ border: "2px solid black" }} >AUS $</td>
                                                    <td style={{ border: "2px solid black" }} >Japanese ¥</td>
                                                    <td style={{ border: "2px solid black" }} >Singapore $</td>
                                                    <td style={{ border: "2px solid black" }} >Reminbi ¥</td>
                                                    <td style={{ border: "2px solid black" }} >Taiwan $</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >Rupee ₹</td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} > <input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >US $</td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >EURO €</td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >UK £ </td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >AUS $ </td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} > <input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} >
                                                    <input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >Japanese ¥ </td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}> <input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} >
                                                    <input type="button" className='btn btn-success' value="Save"/></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >Singapore $ </td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} ><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} >
                                                    <input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }} >Reminbi ¥ </td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} >
                                                    <input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }}>Taiwan $ </td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /> </td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }}><input type="text" /></td>
                                                    <td style={{ border: "1px solid black" }} >
                                                    <input type="button" className='btn btn-success' value="Save" /></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    <button className="btn btn-danger mt-4 ml-4">Insert Data</button>
                                          
                                       
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