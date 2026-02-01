import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo transparent.png'
import Button from './Button'
import { IoSearch } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { CiHeart } from "react-icons/ci";
import { BsBasket3 } from "react-icons/bs";
import { useState } from 'react';

export default function Navbar() {
    const [searchToggle, setSearchToggle] = useState(false);
    const location = useLocation();
    const menu = [
        {route: "/about-us", content: "Về chúng tôi"},
        {
            route: "/product",
            content: "Sản phẩm",
        },
        {route: "/collection", content: "Bộ sưu tập"},
        {route: "/ar-ai", content: "AR-AI"},
        {route: "/whats-new", content: "Tính năng mới"},
        {route: "/login", content: "Tài khoản"},
        {route: "/support", content: "Hỗ trợ"},
    ]
    return (
        <div className=' sticky top-0 z-50'>
            <div className='bg-black font-stretch-expanded text-white text-lg text-center py-2'>
                <p className="animate-marquee">Tại CNS, mọi thứ đều xuất phát từ sự tối giản và thấu hiểu – từ cách chúng tôi thiết kế, đến cách bạn mặc mỗi ngày.</p>
            </div>
        
            <div id="navbar" className='bg-white fixed w-full flex flex-row justify-between'>
                <div className='flex flex-row gap-4 items-center'>
                    <Link to={"/"}><img src={logo} alt="Logo" className='overflow-hidden w-[110px] object-fit hover:scale-130 transition'/></Link>
                    {menu.map((item) => 
                        (<Link 
                            key={item.route} 
                            to={item.route}
                        >
                            <p className={'text-lg rounded-lg py-2 px-2 ' + (location.pathname === item.route || (location.pathname === '/success' && item.content === 'Tài khoản') ? 'font-bold' : 'hover:scale-120 hover:font-bold transition')}>{item.content}</p>
                        </Link>))
                    }
                </div>
                <div className='flex flex-row jusitfy-between gap-5 items-center relative right-10'>
                    <input 
                        className={`
                            transition-all duration-500 ease-in-out outline-none
                            ${searchToggle ? 'w-48 opacity-100 border-b-2 p-2' : 'w-0 opacity-0 border-none p-0'}
                        `}
                        placeholder="Tìm kiếm sản phẩm..."
                    />

                    {/* Nút Search - Sửa lại logic để có thể đóng mở (Toggle) */}
                    <button onClick={() => setSearchToggle(!searchToggle)}>
                        <IoSearch size={30} className='opacity-50 cursor-pointer hover:opacity-100 transition-opacity'/>
                    </button>
                    <Link to={'/login'}><CgProfile size={30} className='opacity-50'/></Link>
                    {/* <CiHeart size={30} className='opacity-50' /> */}
                    <Link to={'/cart'}><BsBasket3 size={30} className='opacity-50' /></Link>
                </div>
            </div>
        </div>
    );
}