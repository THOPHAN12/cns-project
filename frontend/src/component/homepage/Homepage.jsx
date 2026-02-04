import Navbar from '../Navbar'
import Button from '../Button'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import ctaVideo from '../../assets/homepage/cta-vid.MOV'

export default function Homepage() {
    return (<div id='homepage' className=''>
        <Navbar />
        <div id='homepage-body' className='flex flex-col items-center w-full h-screen gap-5 p-4'>
            <Link to={"/product"} className='relative top-70 left-12'><Button content={"Mua sắm ngay"} /></Link>
            <Link to={"/"} className='relative top-70 left-12'><Button content={"AR try-on"} /></Link>
        </div>
        <div className='px-40 py-15'>
            <div className="overflow-hidden shadow-lg">
                <video 
                className="w-full h-auto" 
                controls 
                autoPlay 
                muted 
                loop
                >
                {/* Replace with your video path. If in 'public', use '/video.mp4' */}
                <source src={ctaVideo} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <Footer />
    </div>)
}