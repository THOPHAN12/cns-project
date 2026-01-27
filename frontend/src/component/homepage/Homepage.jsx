import Navbar from '../Navbar'
import Button from '../Button'

export default function Homepage() {
    return (<div id='homepage' className='w-screen h-screen'>
        <Navbar />
        <div className='flex flex-col items-end w-full gap-5 p-4'>
            <div><Button content={"Scan nhanh"} /></div>
            <div><Button content={"Mua sắm ngay"} /></div>
        </div>
    </div>)
}