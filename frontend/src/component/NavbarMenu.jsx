import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavbarMenu({ menu }) {
    const location = useLocation();
    return (
        <>
            {menu.map((item) => (
                <Link key={item.route} to={item.route}>
                    <p className={'text-lg rounded-lg py-2 px-2 ' + (location.pathname === item.route || (location.pathname === '/success' && item.content === 'Tài khoản') ? 'font-bold' : 'hover:scale-120 hover:font-bold transition')}>{item.content}</p>
                </Link>
            ))}
        </>
    );
}
