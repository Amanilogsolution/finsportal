import img1 from '../../../../images/UserManual/Customers/img1.jpg'
import img2 from '../../../../images/UserManual/Customers/img2.jpg'
import img3 from '../../../../images/UserManual/Customers/img3.jpg'
import img5 from '../../../../images/UserManual/Customers/img5.jpg'
import img6 from '../../../../images/UserManual/Customers/img6.jpg'


const VendorUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='vendor p-4'>
                        <div className='vendor d-flex justify-content-around'>
                            <div className='m-auto' style={{ width: "70%" }}>
                                <h2>Vendor</h2>
                                <p>The first step is go onto sidebar click Purchases dropdown. You will see options select Vendor</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>
                        <div className='vendor2'>
                            <h2>Total Vendor</h2>
                            <p>After click on Vendor you will see the interface total vendor table</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                        </div>
                        <div className='vendor3 d-flex my-2'>
                            <div style={{ margin: "auto" }}>
                                <h4>Import Excel File</h4>
                                <p>If you want to import an excel file click on that button appears in the picture, then a modal will appear that is for choose to an Excel file, after upload it</p>
                            </div>
                            <div>
                                <img className='border' src={img3} style={{ width: "300px" }} />
                            </div>
                        </div>
                        <div className='vendor4'>
                            <div style={{ margin: "auto" }}>
                                <h4>Add new Vendor</h4>
                                <p>To add new Vendor click on Add Vendor button next to right of import excel file button. A new interface will appear you can see below, fill all the mandatory details than save this</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img className='border' src={img5} style={{ width: "720px" }} />
                            </div>
                        </div>
                        <div className='vendor5 d-flex my-4'>
                            <div style={{ margin: "auto" }}>
                                <h4>Update Vendor Detail</h4>
                                <p>If you want to update Vendor Details we also have option click on that edit button on total Vendor table, you will see new interface where vendor data are already fill which was fill you at add vendor.</p>
                                <p>Now you able to Change the vendor Detail and Save it.</p>
                            </div>
                            <div>
                                <img src={img6} className='border' style={{ width: "300px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorUserManual;