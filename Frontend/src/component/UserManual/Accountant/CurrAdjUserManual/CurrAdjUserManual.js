import img1 from '../../../../images/UserManual/CustAddress/img1.jpg'
import img4 from '../../../../images/UserManual/CustAddress/img4.jpg'

const CurrAdjUserManual = () => {
    return (
        <>
            <div className='pt-3'>
                <div className="container-fluid">
                    <div className='vendAddress1 d-flex justify-content-around'>
                        <div style={{ width: "70%", margin: "auto" }}>
                            <h2>Currency Adjustments</h2>
                            <p>The first step is go onto sidebar click accountant dropdown. You will see options select Currency Adjustments</p>
                        </div>
                        <div className='d-flex justify-content-end' style={{ width: "30%" }}>
                            <img style={{ width: "140px", height: "350px" }} src={img1} />
                        </div>
                    </div>

                    <div className=''>
                        <h2>Add Currency Adjustments</h2>
                        <p>After Select Currency Adjustments tab, Add Currency Adjustments Opened where you add Currency Details.</p>
                        <div className='d-flex justify-content-center my-4'>
                            <img className='border' style={{ width: "720px", height: "320px" }} src={img4} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrAdjUserManual;