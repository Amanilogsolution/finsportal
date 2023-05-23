import MenuImg from '../../../../images/UserManual/salesOrder/so1.png'
import TotalScrImg from '../../../../images/UserManual/salesOrder/so2.png'
import AddScrImg from '../../../../images/UserManual/salesOrder/so3.png'
import UpdateScrImg from '../../../../images/UserManual/Customers/img6.jpg'
import ImportScrImg from '../../../../images/UserManual/Customers/img3.jpg'

const CityUserManual = () => {
    return (
        <>
            <div className='p-4'>
                <div className='d-flex justify-content-around'>
                    <div className='m-auto' style={{ width: "70%" }}>
                        <h2>City</h2>
                        <p>The first step is go onto sidebar click onto Master dropdown. You will see options select City</p>
                    </div>
                    <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                        <img style={{ width: "140px", height: "350px" }} src={MenuImg} />
                    </div>
                </div>
                <div className=''>
                    <h2>Total City</h2>
                    <p>After click on city you will see the interface total City table</p>
                    <div className='d-flex justify-content-center my-4'>
                        <img className='border' style={{ width: "720px", height: "320px" }} src={TotalScrImg} />
                    </div>
                </div>

                <div className=''>
                    <div >
                        <h2>Add new City</h2>
                        <p>To add new City click on Add City button. A new interface will appear you can see below, fill all the mandatory details than save this.</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img className='border' src={AddScrImg} style={{ width: "720px" }} />
                    </div>
                </div>
                <div className='d-flex justify-content-between my-2'>
                    <div >
                        <h2>Update City</h2>
                        <p>If you want to update City we also have option click on the city name at Total City table,</p>
                        <p>Fill mandatory Fields and than click on update button to update the City</p>
                    </div>
                    <div>
                        <img className='border' src={UpdateScrImg} style={{ width: "300px" }} />
                    </div>
                </div>
                <div className='d-flex my-2'>
                    <div style={{ margin: "auto" }}>
                        <h2>Import Excel File</h2>
                        <p>If you want to import an excel file click on that import button appears in the total City Page, then a modal will appear that is for choose to an Excel file, after upload it</p>
                    </div>
                    <div>
                        <img className='border' src={ImportScrImg} style={{ width: "300px" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CityUserManual;