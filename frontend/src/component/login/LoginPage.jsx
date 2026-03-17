import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import logoImg from "../../assets/cns_logo.png";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getAuthLoginUrl, getApiHeaders, warmUpBackend } from "../../utils/api";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [failureNotification, showFailureNotification] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (Cookies.get("token")) nav("/profile");
        else warmUpBackend();
    }, [nav]);

    const login = async () => {
        if (username === "" || password === "") {
            setShowWarning(true);
            setConnectionError(false);
            return;
        }
        setConnectionError(false);
        setShowWarning(false);
        showFailureNotification(false);
        try {
            const url = getAuthLoginUrl();
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 120000);
            const res = await fetch(url, {
                method: "POST",
                headers: getApiHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify({ username: username.trim(), password: password }),
                credentials: "omit",
                signal: ctrl.signal,
            });
            clearTimeout(t);

            const contentType = res.headers.get("content-type") || "";
            const text = await res.text();
            if (!res.ok) {
                setShowWarning(false);
                showFailureNotification(true);
                return;
            }
            if (!contentType.includes("application/json") || !text.trim()) {
                setConnectionError(true);
                return;
            }
            let data;
            try { data = JSON.parse(text); } catch {
                setConnectionError(true);
                return;
            }
            Cookies.set("token", data.token, { expires: 1, path: "/" });
            Cookies.set("id", data.userId, { expires: 1, path: "/" });
            Cookies.set("role", data.role || "USER", { expires: 1, path: "/" });
            nav(data.role === "ADMIN" ? "/admin" : "/profile");
        } catch (err) {
            console.error("Login error:", err);
            setConnectionError(true);
        }
    }

    return (<>
        <Navbar />
        <div className=" flex items-center justify-center bg-white mt-30">
            {/* Container Card */}
            <div className="w-full max-w-137.5 bg-[#f9f3f0] px-12 py-16 shadow-sm">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logoImg} alt="CNS Shop" className="h-16 object-contain" />
                </div>
                {/* Header */}
                <h1 className="text-center text-[#3e2b1d] font-serif text-3xl tracking-widest uppercase mb-10 font-medium">
                Đăng nhập
                </h1>

                <form className="flex flex-col">
                {/* Email Input */}
                <div className="mb-5">
                    <input
                    type="text"
                    placeholder="Tên tài khoản"
                    className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-base"
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-base"
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {/* Forgot Password Link */}
                <div className="mb-8">
                    <a href="#" className="text-[#a89c96] text-sm hover:text-[#3e2b1d] transition-colors pl-1">
                    Quên mật khẩu?
                    </a>
                </div>

                {showWarning && (<div className="text-base text-red-400 relative bottom-4 left-1">
                    <p>* Vui lòng điền đầy đủ thông tin trước khi đăng nhập</p>
                </div>)}

                {connectionError && (
                    <div className="text-base text-red-400 relative bottom-4 left-1 space-y-2">
                        <p>* Không kết nối được máy chủ. Kiểm tra: Backend + Ngrok đang chạy; VITE_API_BASE_URL đã cấu hình trong Vercel.</p>
                        <button type="button" onClick={() => { setConnectionError(false); warmUpBackend(); }} className="text-sm px-3 py-1.5 bg-[#463325] text-white rounded hover:bg-[#2e2118] transition">Thử lại</button>
                    </div>
                )}
                {failureNotification && (<div className="text-base text-red-400 relative bottom-4 left-1">
                    <p>* Thông tin tài khoản hoặc mật khẩu không chính xác</p>
                </div>)}

                {/* Login Button */}
                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        className="bg-[#463325] text-white text-center rounded-full px-16 py-3 text-base tracking-wide hover:bg-[#2e2118] transition-colors duration-300 w-3/4 hover:cursor-pointer"
                        onClick={login}
                    >
                        Đăng nhập
                    </button>
                </div>

                {/* Register Link */}
                <div className="text-center">
                    <Link to={"/register"} className="text-[#a89c96] text-sm hover:text-[#3e2b1d] hover:underline transition-colors">
                    <p>Đăng ký</p>
                    </Link>
                </div>
                </form>
            </div>
            </div>
    </>)
}