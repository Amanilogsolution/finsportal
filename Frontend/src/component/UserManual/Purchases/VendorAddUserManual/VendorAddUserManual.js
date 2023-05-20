import img1 from '../../../../images/UserManual/CustAddress/img1.jpg'
import img2 from '../../../../images/UserManual/CustAddress/img2.jpg'
import img3 from '../../../../images/UserManual/CustAddress/img3.jpg'
import img4 from '../../../../images/UserManual/CustAddress/img4.jpg'
import img5 from '../../../../images/UserManual/Customers/img6.jpg'

const VendorAddUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='vendAddress p-4'>
                        <div className='vendAddress1 d-flex justify-content-around'>
                            <div style={{ width: "70%", margin: "auto" }}>
                                <h2>Vendor Address</h2>
                                <p>The first step is go onto sidebar click purchases dropdown. You will see options select Address</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>

                        <div className=''>
                            <h2>Total Vendor Address</h2>
                            <p>After click on Address you will see the interface total Vendor Address table</p>
                            <p>If you want to see Vendor Address then type vendor name in search fields and select vendor which show in list.</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                        </div>

                        <div className='vendAddress3 d-flex my-2'>
                            <div style={{ margin: "auto" }}>
                                <h4>Import Address by Excel file</h4>
                                <p>If you have multiple data you can import excel file click on the button (Import vendor Address), You will see a model </p>
                                <p>choose Excel File and uplaod </p>
                            </div>
                            <div>
                                <img className='border' src={img3} style={{ width: "300px" }} />
                            </div>
                        </div>

                        <div className=''>
                            <h2>Add Address</h2>
                            <p>If you want to add new address for a customer click on Add Address Button you will see a new interface</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img4} />
                            </div>
                            <p>Select Vendor Name then fill all the details below. After fill the form click on add button, Your task is completed</p>
                        </div>
                        <div className=' d-flex my-4'>
                            <div style={{ margin: "auto" }}>
                                <h2>Update Vendor Address Detail</h2>
                                <p>If you want to update Vendor Address Details we also have option click on that edit button on total Vendor Address table.</p>
                                <p>Now you able to Change the vendor address Detail and Save it.</p>
                            </div>
                            <div>
                                <img src={img5} className='border' style={{ width: "300px" }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default VendorAddUserManual;