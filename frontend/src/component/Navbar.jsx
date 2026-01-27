import { Link } from 'react-router-dom'
import logo from '../assets/cleannie_studio_logo_-removebg-preview.png'
import Button from './Button'

export default function Navbar() {
    return (
        <div className=' sticky top-0 z-50'>
            <div className='bg-black text-white text-center py-2'>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et</p>
            </div>
        
            <div id="navbar" className='bg-white flex flex-row justify-between'>
                <div className='flex flex-row gap-4 items-center'>
                    <Link to={"/"}><img src={logo} alt="Logo" className='overflow-hidden height-64 width-48 object-fit'/></Link>
                </div>
                <div className='flex flex-row jusitfy-between gap-5 items-center relative right-10'>
                    <Link to={"/product"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Sản phẩm</p></Link>
                    <Link to={"/collection"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Bộ sưu tập</p></Link>
                    <Link to={"/whats-new"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Tính năng mới</p></Link>
                    <Link to={"/about-us"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Về chúng tôi</p></Link>
                    <Link to={"/login"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Tài khoản</p></Link>
                    <Link to={"/support"}><p className='text-lg rounded-lg hover:bg-gray-200 py-5 px-2'>Hỗ trợ</p></Link>
                </div>
            </div>
        </div>
    );
}