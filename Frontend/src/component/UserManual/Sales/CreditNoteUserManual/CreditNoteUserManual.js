import img1 from '../../../../images/UserManual/Customers/img1.jpg'
import img2 from '../../../../images/UserManual/Customers/img2.jpg'
import img3 from '../../../../images/UserManual/Customers/img3.jpg'

const CreditNoteUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='p-4'>
                        <div className='d-flex justify-content-around'>
                            <div className='m-auto' style={{ width: "70%" }}>
                                <h2>Credit Notes</h2>
                                <p>The first step is go onto sidebar click sales dropdown. You will see options select Credit Notes</p>
                            </div>
                            <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                                <img style={{ width: "140px", height: "350px" }} src={img1} />
                            </div>
                        </div>
                        <div className=''>
                            <h2>Total Approved/waiting Cn</h2>
                            <p>After click on Credit Notes you will see the interface total Approved/waiting Cn table</p>
                            <div className='d-flex justify-content-center my-4'>
                                <img className='border' style={{ width: "720px", height: "320px" }} src={img2} />
                            </div>
                        </div>
                        <div className='d-flex my-2'>
                            <div className='m-auto'>
                                <h4>Generate Credit Notes</h4>
                                <p>If you want to Generate New Cn click on Generate Cn button, then a modal will appear that is for Fill Data, and send Approval request to admin.</p>
                            </div>
                            <div>
                                <img className='border' src={img3} style={{ width: "300px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreditNoteUserManual