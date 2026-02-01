import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function LoginPage() {
    return (<>
        <Navbar />
        <div className=" flex items-center justify-center bg-white mt-30">
            {/* Container Card */}
            <div className="w-full max-w-[550px] bg-[#f9f3f0] px-12 py-16 shadow-sm">
                
                {/* Header */}
                <h1 className="text-center text-[#3e2b1d] font-serif text-3xl tracking-widest uppercase mb-10 font-medium">
                Đăng nhập
                </h1>

                <form className="flex flex-col">
                {/* Email Input */}
                <div className="mb-5">
                    <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-sm"
                    />
                </div>

                {/* Forgot Password Link */}
                <div className="mb-8">
                    <a href="#" className="text-[#a89c96] text-xs hover:text-[#3e2b1d] transition-colors pl-1">
                    Quên mật khẩu?
                    </a>
                </div>

                {/* Login Button */}
                <div className="flex justify-center mb-6">
                    <Link to={"/success"} className="bg-[#463325] text-white text-center rounded-full px-16 py-3 text-sm tracking-wide hover:bg-[#2e2118] transition-colors duration-300 w-3/4">
                        <button
                        type="submit"
                        
                        >
                        Đăng nhập
                        </button>
                    </Link>
                </div>

                {/* Register Link */}
                <div className="text-center">
                    <a href="#" className="text-[#a89c96] text-xs hover:text-[#3e2b1d] hover:underline transition-colors">
                    Đăng ký
                    </a>
                </div>
                </form>
            </div>
            </div>
    </>)
}