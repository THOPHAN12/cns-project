import { Link } from 'react-router-dom'
import logo from '../assets/cleannie_studio_logo_-removebg-preview.png'
import Button from './Button'

export default function Navbar() {
    return (
        <div id="navbar" className='flex flex-row justify-between'>
            <div className='flex flex-row gap-4 items-center'>
                <Link to={"/"}><img src={logo} alt="Logo" className='overflow-hidden height-64 width-48 object-fit'/></Link>
                
                <div><Button content={"Scan nhanh"} /></div>
                <div><Button content={"Mua sắm ngay"} /></div>
            </div>
            <div className='flex flex-row jusitfy-between gap-5 items-center relative right-10'>
                <Link to={"/product"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Sản phẩm</p></Link>
                <Link to={"/collection"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Bộ sưu tập</p></Link>
                <Link to={"/whats-new"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Tính năng mới</p></Link>
                <p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Về chúng tôi</p>
                <p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Tài khoản</p>
                <p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Hỗ trợ</p>
            </div>
        </div>
    );
}