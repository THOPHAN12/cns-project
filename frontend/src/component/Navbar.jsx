import { Link } from 'react-router-dom'
import logo from '../assets/cleannie_studio_logo_-removebg-preview.png'
import Button from './Button'

export default function Navbar() {
    const menu = [
        {
            route: "/product",
            content: "Sản phẩm",
        },
        {route: "/collection", content: "Bộ sưu tập"},
        {route: "/whats-new", content: "Tính năng mới"},
        {route: "/about-us", content: "Về chúng tôi"},
        {route: "/login", content: "Đăng nhập"},
        {route: "/support", content: "Hỗ trợ"},
    ]
    return (
        <div className=' sticky top-0 z-50'>
            <div className='bg-black font-stretch-expanded text-white text-lg text-center py-2'>
                <p className="animate-marquee">Tại CNS, mọi thứ đều xuất phát từ sự tối giản và thấu hiểu – từ cách chúng tôi thiết kế, đến cách bạn mặc mỗi ngày.</p>
            </div>
        
            <div id="navbar" className='bg-white flex flex-row justify-between'>
                <div className='flex flex-row gap-4 items-center relative bottom-2'>
                    <Link to={"/"}><img src={logo} alt="Logo" className='overflow-hidden height-64 width-48 object-fit hover:scale-130 transition'/></Link>
                </div>
                <div className='flex flex-row jusitfy-between gap-5 items-center relative right-10'>
                    {menu.map((item) => (<Link to={item.route}><p className='text-lg rounded-lg hover:scale-130 hover:font-bold transition-all py-5 px-2'>{item.content}</p></Link>))}
                </div>
            </div>
        </div>
    );
}