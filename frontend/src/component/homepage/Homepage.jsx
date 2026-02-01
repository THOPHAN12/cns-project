import Navbar from '../Navbar'
import Button from '../Button'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

export default function Homepage() {
    return (<div id='homepage' className=''>
        <Navbar />
        <div id='homepage-body' className='flex flex-col items-center w-full h-screen gap-5 p-4'>
            <Link to={"/product"} className='relative top-70 left-12'><Button content={"Mua sắm ngay"} /></Link>
            <Link to={"/"} className='relative top-70 left-12'><Button content={"AR try-on"} /></Link>
        </div>
        <Footer />
    </div>)
}