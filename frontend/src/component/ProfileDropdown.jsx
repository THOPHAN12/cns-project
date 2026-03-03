import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileDropdown({ open, isLoggedIn, onLogout, onClose, profileRef }) {
    if (!open) return null;
    return (
        <div className='absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-30 border border-gray-200' ref={profileRef}>
            {isLoggedIn ? (
                <>
                    <Link
                        to='/profile'
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors'
                        onClick={onClose}
                    >
                        Trang cá nhân
                    </Link>
                    <button
                        className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors'
                        onClick={onLogout}
                    >
                        Đăng xuất
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to='/login'
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors'
                        onClick={onClose}
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to='/register'
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors'
                        onClick={onClose}
                    >
                        Đăng ký
                    </Link>
                </>
            )}
        </div>
    );
}
