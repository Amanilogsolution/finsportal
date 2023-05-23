import img1 from '../../../../images/UserManual/salesOrder/so1.png'
import img2 from '../../../../images/UserManual/salesOrder/so2.png'
import img3 from '../../../../images/UserManual/salesOrder/so3.png'
import img5 from '../../../../images/UserManual/Customers/img5.jpg'
import img6 from '../../../../images/UserManual/Customers/img6.jpg'

const RecBillUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='p-4'>
                        <div className='d-flex justify-content-around'>
                            <div className='m-auto' style={{ width: "70%" }}>
                                <h2>Recurring Bill</h2>
                                <p>The first step is go onto sidebar click onto Purchases dropdown. You will see options select Recurring Bill.</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>
                        <div className=''>
                            <h2>Total Recurring Bill</h2>
                            <p>After click on Recurring Bill you will see the interface total Recurring Bill table.</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                        </div>

                        <div className=''>
                            <div >
                                <h2>Add new Recurring Bill</h2>
                                <p>To add new Recurring Bill click on Add Recurring Bill button. A new interface will appear you can see below, fill all the mandatory details than save this.</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img className='border' src={img3} style={{ width: "720px" }} />
                            </div>
                        </div>

                        <div className='d-flex justify-content-between my-4'>
                            <div >
                                <h2>Active/ Deactive Recurring Bill</h2>
                                <p>If you want to Deactive Recurring Bill we also have option click on that Checkbox (Deactive) at Total saved Recurring Bill,
                                    Deactive means Bill is not longer in recurring Bases,
                                    then you are not able to changes any thing in that Bill. </p>
                            </div>
                            <div>
                                <img className='border' src={img6} style={{ width: "300px" }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RecBillUserManual;