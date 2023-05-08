import ImageUrl from '../../images/Spinner.gif'

const LoadingPage = () => {
    return (
        <>
            <div className='d-flex flex-column justify-content-center ' style={{ height: '90vh' }}>
                <div className='d-flex flex-column justify-content-center align-items-center '>
                    <img src={ImageUrl} alt='Loading Image ' style={{ margin: "auto" }} />
                    <h5>Loading...</h5>
                </div>
            </div>
        </>
    )
}

export default LoadingPage;