import Navbar from '../Navbar'
import Button from '../Button'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

export default function Homepage() {
    return (<div id='homepage' className=''>
        <Navbar />
        <div id='homepage-body' className='flex flex-col items-end w-full h-screen gap-5 p-4'>
            <Link to={"/product"}><Button content={"Mua sắm ngay"} /></Link>
        </div>
        <Footer />
    </div>)
}