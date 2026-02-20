import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function RegisterPage() {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center bg-white mt-30">
                {/* Container Card */}
                <div className="w-full max-w-137.5 bg-[#f9f3f0] px-12 py-16 shadow-sm">
                    
                    {/* Header */}
                    <h1 className="text-center text-[#3e2b1d] font-serif text-3xl tracking-widest uppercase mb-10 font-medium">
                        Đăng ký
                    </h1>

                    <form className="flex flex-col">
                        {/* Name Input */}
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-5">
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                            />
                        </div>

                        {/* Username Input */}
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Tên tài khoản"
                                className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-5">
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-8">
                            <input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                            />
                        </div>

                        {/* Register Button */}
                        <div className="flex justify-center mb-6">
                            <Link to={"/success"} className="bg-[#463325] text-white text-center rounded-full px-16 py-3 text-sm tracking-wide hover:bg-[#2e2118] transition-colors duration-300 w-3/4">
                                <button type="submit">
                                    Đăng ký
                                </button>
                            </Link>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-[#a89c96] text-xs">
                                Đã có tài khoản?{" "}
                                <Link to={"/login"} className="text-[#3e2b1d] hover:underline font-medium transition-colors">
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}