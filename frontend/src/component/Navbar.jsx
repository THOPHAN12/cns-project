import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/cns_logo.png';
import { IoSearch } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { BsBasket3 } from "react-icons/bs";
import { useState, useRef, useEffect } from 'react';
import LogoutModal from './LogoutModal';
import ProfileDropdown from './ProfileDropdown';
import NavbarMenu from './NavbarMenu';
import { getLocalCartCount, CART_UPDATED_EVENT } from '../utils/cartStorage';
import { getApiBaseUrl, getApiHeaders } from '../utils/api';
import Cookies from 'js-cookie';

/** Bỏ dấu tiếng Việt để tìm kiếm không dấu. */
function removeDiacritics(str) {
    if (!str) return "";
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

/** Lấy tổng số lượng sản phẩm trong giỏ từ API (khi đã đăng nhập). Trả về 0 nếu lỗi hoặc chưa đăng nhập. */
async function fetchApiCartCount() {
    const token = Cookies.get('token');
    const userId = Cookies.get('id');
    if (!token || !userId) return 0;
    const apiUrl = getApiBaseUrl();
    try {
        const cartRes = await fetch(`${apiUrl}/api/user/cart?userId=${encodeURIComponent(userId)}`, {
            headers: getApiHeaders({ Authorization: `Bearer ${token}` }),
        });
        if (!cartRes.ok) return 0;
        const cartData = await cartRes.json();
        const cartId = cartData?.cartId ?? cartData?.cart_id;
        if (!cartId) return 0;
        const res = await fetch(`${apiUrl}/api/cart/${cartId}`, {
            headers: getApiHeaders({ Authorization: `Bearer ${token}` }),
        });
        if (!res.ok) return 0;
        const data = await res.json();
        const items = Array.isArray(data) ? data : [];
        return items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    } catch {
        return 0;
    }
}

export default function Navbar() {
    const [searchToggle, setSearchToggle] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [apiCartCount, setApiCartCount] = useState(0);

    useEffect(() => {
        setCartCount(getLocalCartCount() + apiCartCount);
    }, [apiCartCount]);

    useEffect(() => {
        const update = async () => {
            const api = await fetchApiCartCount();
            setApiCartCount(api);
            setCartCount(getLocalCartCount() + api);
        };
        update();
        window.addEventListener(CART_UPDATED_EVENT, update);
        return () => window.removeEventListener(CART_UPDATED_EVENT, update);
    }, []);
    const profileRef = useRef(null);
    const searchBoxRef = useRef(null);
    const navigator = useNavigate();
    const menu = [
        {route: "/about-us", content: "Về chúng tôi"},
        {route: "/product", content: "Sản phẩm"},
        {route: "/collection", content: "Bộ sưu tập"},
        {route: "/blog", content: "Blog"},
        // {route: "/ar-ai", content: "CNS AI"},
        {route: "/login", content: "Tài khoản"},
        {route: "/support", content: "Hỗ trợ"},
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        }
        if (showProfileDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfileDropdown]);

    // Gợi ý sản phẩm theo từ khóa trên thanh tìm kiếm
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const handler = setTimeout(async () => {
            try {
                setSearchLoading(true);
                let products = allProducts;
                if (!products.length) {
                    const apiUrl = getApiBaseUrl();
                    const url = apiUrl ? `${apiUrl}/api/products` : "/api/products";
                    const res = await fetch(url, { headers: getApiHeaders() });
                    if (!res.ok) {
                        setSearchResults([]);
                        setSearchLoading(false);
                        return;
                    }
                    const ct = res.headers.get("content-type") || "";
                    if (!ct.includes("application/json")) {
                        setSearchResults([]);
                        setSearchLoading(false);
                        return;
                    }
                    const data = await res.json();
                    products = Array.isArray(data) ? data : [];
                    setAllProducts(products);
                }
                const q = removeDiacritics(searchQuery).toLowerCase();
                const suggestions = products
                    .filter(p => {
                        const name = removeDiacritics(p.productName || p.name || "").toLowerCase();
                        return name.includes(q);
                    })
                    .slice(0, 6);
                setSearchResults(suggestions);
            } catch {
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 200);
        return () => clearTimeout(handler);
    }, [searchQuery, allProducts]);

    const clearAllCookies = () => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    };

    return (
        <div className=' sticky top-0 z-50'>
            <div className='bg-black font-stretch-expanded text-white text-lg text-center py-2 overflow-hidden'>
                <p className="animate-marquee">Tại CNS, mọi thứ đều xuất phát từ sự tối giản và thấu hiểu – từ cách chúng tôi thiết kế, đến cách bạn mặc mỗi ngày.</p>
            </div>
            <div id="navbar" className='bg-white fixed w-full flex flex-row justify-between'>
                <LogoutModal
                    open={showLogoutModal}
                    onConfirm={() => {
                        clearAllCookies();
                        setShowLogoutModal(false);
                        setShowProfileDropdown(false);
                        navigator("/")
                    }}
                    onCancel={() => setShowLogoutModal(false)}
                />
                <div className='flex flex-row gap-2 items-center'>
                    <Link to={"/"}><img src={logo} alt="Logo" className='overflow-hidden w-27.5 object-fit hover:scale-130 transition'/></Link>
                    <NavbarMenu menu={menu} />
                </div>
                <div ref={searchBoxRef} className='flex flex-row jusitfy-between gap-5 items-center relative right-10'>
                    <div className="relative">
                        <input 
                            className={`
                                transition-all duration-500 ease-in-out outline-none bg-transparent
                                ${searchToggle ? 'w-64 opacity-100 border-b-2 p-2' : 'w-0 opacity-0 border-none p-0'}
                            `}
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchToggle(true)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && searchResults[0]) {
                                    navigator(`/product-detail/${searchResults[0].id}`);
                                    setSearchQuery("");
                                    setSearchResults([]);
                                    setSearchToggle(false);
                                }
                            }}
                        />
                        {searchToggle && searchQuery && (
                            <div className="absolute left-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-40 max-h-80 overflow-y-auto">
                                {searchLoading && (
                                    <div className="px-3 py-2 text-sm text-gray-500">
                                        Đang tìm kiếm...
                                    </div>
                                )}
                                {!searchLoading && searchResults.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50"
                                        onClick={() => {
                                            navigator(`/product-detail/${p.id}`);
                                            setSearchQuery("");
                                            setSearchResults([]);
                                            setSearchToggle(false);
                                        }}
                                    >
                                        {p.imageSrc && (
                                            <img
                                                src={p.imageSrc.startsWith("http") ? p.imageSrc : encodeURI(p.imageSrc)}
                                                alt={p.productName}
                                                className="w-8 h-8 rounded object-cover flex-shrink-0"
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/32?text=SP"; }}
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-900 line-clamp-1">{p.productName}</span>
                                            {typeof p.price === "number" && (
                                                <span className="text-xs text-gray-500">
                                                    {p.price.toLocaleString("vi-VN")} đ
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                                {!searchLoading && searchResults.length === 0 && (
                                    <div className="px-3 py-2 text-sm text-gray-500">
                                        Không tìm thấy sản phẩm phù hợp.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const next = !searchToggle;
                            setSearchToggle(next);
                            if (!next) {
                                setSearchQuery("");
                                setSearchResults([]);
                            }
                        }}
                    >
                        <IoSearch size={30} className='opacity-50 cursor-pointer hover:opacity-100 transition-opacity'/>
                    </button>
                    <div className='relative top-0.5' ref={profileRef}>
                        <button
                            onClick={() => setShowProfileDropdown((prev) => !prev)}
                            className='focus:outline-none cursor-pointer'
                        >
                            <CgProfile size={30} className='opacity-50 hover:opacity-100 transition-opacity'/>
                        </button>
                        <ProfileDropdown
                            open={showProfileDropdown}
                            isLoggedIn={!!Cookies.get('token')}
                            onLogout={() => setShowLogoutModal(true)}
                            onClose={() => setShowProfileDropdown(false)}
                            profileRef={null}
                        />
                    </div>
                    <Link
                        to="/cart"
                        className="relative"
                        title={cartCount > 0 ? `Đang có ${cartCount} đơn hàng` : 'Giỏ hàng'}
                    >
                        <BsBasket3 size={30} className="opacity-50 hover:opacity-100 transition-opacity" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-xs font-bold text-white bg-[#3a2415] rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}