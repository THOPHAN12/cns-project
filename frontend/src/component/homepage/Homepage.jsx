import logo from './../../assets/cleannie_studio_logo_-removebg-preview.png'
import bgImage from './../../assets/snapedit_1769088011261.jpeg'
import Button from './Button'

export default function Homepage() {
    return (<div id='homepage' className='w-screen h-screen'>
        <div id="navbar" className='flex flex-row justify-between'>
            <div className='flex flex-row gap-4 items-center'>
                <img src={logo} alt="Logo" className='overflow-hidden height-64 width-48 object-fit'/>
                <div><Button content={"Scan nhanh"} /></div>
                <div><Button content={"Mua sắm ngay"} /></div>
            </div>
            <div className='flex flex-row jusitfy-between gap-10 items-center relative right-10'>
                <p className='text-lg'>Sản phẩm</p>
                <p className='text-lg'>Bộ sưu tập</p>
                <p className='text-lg'>Tính năng mới</p>
                <p className='text-lg'>Về chúng tôi</p>
                <p className='text-lg'>Tài khoản</p>
                <p className='text-lg'>Hỗ trợ</p>
            </div>
        </div>
    </div>)
}