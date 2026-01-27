import Navbar from '../Navbar'
import Button from '../Button'
import Footer from '../Footer'

export default function Homepage() {
    return (<div id='homepage' className=''>
        <Navbar />
        <div className='flex flex-col items-end w-full h-screen gap-5 p-4'>
            <div><Button content={"Mua sắm ngay"} /></div>
        </div>
        <Footer />
    </div>)
}