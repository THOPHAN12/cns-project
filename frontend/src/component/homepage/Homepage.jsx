import logo from './../../assets/cns_logo.png'
import bgImage from './../../assets/snapedit_1769088011261.jpeg'

export default function Homepage() {
    return (<div id='homepage' className='w-screen h-screen'>
        <div id="navbar" className='flex flex-row justify-between'>
            <img src={logo} alt="Logo"/>
            <div className='flex flex-row jusitfy-between gap-10 items-center relative right-10'>
                <p className='text-lg'>Shopping</p>
                <p className='text-lg'>Our collections</p>
                <p className='text-lg'>What's new</p>
                <p className='text-lg'>About us</p>
                <p className='text-lg'>Account</p>
                <p className='text-lg'>Support</p>
            </div>
        </div>
    </div>)
}