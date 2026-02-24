import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import logoImg from "../../assets/logo transparent.png";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID || "";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [failureNotification, showFailureNotification] = useState(false);
    const [oAuthError, setOAuthError] = useState("");
    const [showGoogleLoginModal, setShowGoogleLoginModal] = useState(false);
    const [showFacebookLoginModal, setShowFacebookLoginModal] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (Cookies.get("token")) nav("/profile");
    }, [nav]);

    const handleGoogleCredential = useCallback(async (response) => {
        if (!response?.credential) return;
        setOAuthError("");
        try {
            const res = await fetch(`${apiUrl}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: response.credential }),
            });
            if (!res.ok) {
                setOAuthError("Đăng nhập Google thất bại.");
                return;
            }
            const data = await res.json();
            Cookies.set("token", data.token, { expires: 1 });
            Cookies.set("id", data.userId, { expires: 1 });
            nav("/profile");
        } catch (err) {
            setOAuthError("Không thể kết nối server.");
        }
    }, [nav, apiUrl]);

    useEffect(() => {
        if (!googleClientId) return;
        const initGoogle = () => {
            if (typeof window.google === "undefined") return;
            try {
                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: handleGoogleCredential,
                    ux_mode: "popup",
                    auto_select: false,
                });
            } catch (e) {
                console.warn("Google Sign-In init:", e);
            }
        };
        if (typeof window.google !== "undefined") {
            initGoogle();
        } else {
            const t = setInterval(() => {
                if (typeof window.google !== "undefined") {
                    clearInterval(t);
                    initGoogle();
                }
            }, 150);
            return () => clearInterval(t);
        }
    }, [googleClientId, handleGoogleCredential]);

    useEffect(() => {
        if (!facebookAppId) return;
        if (window.FB) return;
        window.fbAsyncInit = function () {
            window.FB.init({ appId: facebookAppId, cookie: true, xfbml: true, version: "v18.0" });
        };
        const script = document.createElement("script");
        script.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0&appId=${facebookAppId}`;
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
    }, [facebookAppId]);

    const handleFacebookLogin = () => {
        if (!facebookAppId) {
            setOAuthError("Chưa cấu hình. Thêm VITE_FACEBOOK_APP_ID vào file .env (xem docs/OAUTH_SETUP.md)");
            return;
        }
        if (typeof window.FB === "undefined") {
            setOAuthError("Đang tải Facebook SDK, vui lòng thử lại sau vài giây.");
            return;
        }
        setOAuthError("");
        window.FB.login(async (res) => {
            if (!res.authResponse?.accessToken) {
                setOAuthError("Đăng nhập Facebook bị hủy hoặc thất bại.");
                return;
            }
            try {
                const r = await fetch(`${apiUrl}/auth/facebook`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ accessToken: res.authResponse.accessToken }),
                });
                if (!r.ok) {
                    setOAuthError("Đăng nhập Facebook thất bại.");
                    return;
                }
                const data = await r.json();
                Cookies.set("token", data.token, { expires: 1 });
                Cookies.set("id", data.userId, { expires: 1 });
                nav("/profile");
            } catch (err) {
                setOAuthError("Không thể kết nối server.");
            }
        }, { scope: "public_profile,email" });
    };

    const login = async () => {
        if (username === "" || password === "") {
            setShowWarning(true);
            return;
        }

        const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })

        if (!res.ok) {
            console.log("Status code", res.status)
            setShowWarning(false);
            showFailureNotification(true);
            return;
        }
        const data = await res.json();
        Cookies.set("token", data.token, {
            expires: 1
        })
        Cookies.set("id", data.userId, {
            expires: 1
        })
        nav("/profile")
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
                    onChange={e => setTimeout(() => setUsername(e.target.value), 500)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full bg-transparent border border-[#d4c5bc] text-[#4a3b32] px-4 py-3 rounded-lg focus:outline-none focus:border-[#8c7365] placeholder-[#8c7365] text-base"
                    onChange={e => setTimeout(() => setPassword(e.target.value), 500)}
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

                {failureNotification && (<div className="text-base text-red-400 relative bottom-4 left-1">
                    <p>* Thông tin tài khoản hoặc mật khẩu không chính xác</p>
                </div>)}

                {/* Login Button */}
                <div className="flex justify-center mb-4">
                    <button
                        type="button"
                        className="bg-[#463325] text-white text-center rounded-full px-16 py-3 text-base tracking-wide hover:bg-[#2e2118] transition-colors duration-300 w-3/4 hover:cursor-pointer"
                        onClick={login}
                    >
                        Đăng nhập
                    </button>
                </div>

                {/* Đăng nhập Google & Facebook */}
                <div className="mb-6">
                    <p className="text-center text-sm text-[#a89c96] mb-3">Hoặc đăng nhập bằng mạng xã hội</p>
                    <div className="flex justify-center items-center gap-6 mb-2">
                        <button
                            type="button"
                            onClick={() => {
                                if (googleClientId && window.google?.accounts?.id) {
                                    window.google.accounts.id.prompt();
                                } else if (!googleClientId) {
                                    setShowGoogleLoginModal(true);
                                }
                            }}
                            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#d4c5bc] text-[#4285F4] cursor-pointer transition-all hover:border-[#4285F4] hover:shadow-md hover:scale-110 relative overflow-visible"
                            title="Đăng nhập với Google"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => facebookAppId ? handleFacebookLogin() : setShowFacebookLoginModal(true)}
                            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#d4c5bc] text-[#1877F2] cursor-pointer transition-all hover:border-[#1877F2] hover:shadow-md hover:scale-110"
                            title="Đăng nhập với Facebook"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </button>
                    </div>
                </div>

                {/* Modal mẫu đăng nhập Google */}
                {showGoogleLoginModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowGoogleLoginModal(false)}>
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center relative" onClick={e => e.stopPropagation()}>
                            <div className="mb-6">
                                <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                            </div>
                            <h2 className="text-xl font-normal text-gray-800 mb-2">Đăng nhập với Google</h2>
                            <p className="text-sm text-gray-500 mb-6">Dùng tài khoản Google của bạn</p>
                            <input type="text" placeholder="Email hoặc số điện thoại" className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-base" readOnly />
                            <div className="flex gap-3 w-full">
                                <button type="button" onClick={() => setShowGoogleLoginModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-md text-gray-700 font-medium">Hủy</button>
                                <button type="button" className="flex-1 py-2.5 bg-[#4285F4] text-white rounded-md font-medium">Tiếp theo</button>
                            </div>
                            <button type="button" onClick={() => setShowGoogleLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                    </div>
                )}

                {/* Modal mẫu đăng nhập Facebook */}
                {showFacebookLoginModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowFacebookLoginModal(false)}>
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center relative" onClick={e => e.stopPropagation()}>
                            <button type="button" onClick={() => setShowFacebookLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
                            <div className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-3xl font-bold mb-6">f</div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Đăng nhập Facebook</h2>
                            <p className="text-sm text-gray-500 mb-6 text-center">Đăng nhập để tiếp tục</p>
                            <input type="text" placeholder="Email hoặc số điện thoại" className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3 text-base" readOnly />
                            <input type="password" placeholder="Mật khẩu" className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 text-base" readOnly />
                            <button type="button" className="w-full py-3 bg-[#1877F2] text-white rounded-md font-semibold mb-3">Đăng nhập</button>
                            <button type="button" onClick={() => setShowFacebookLoginModal(false)} className="text-gray-500 text-sm">Hủy</button>
                        </div>
                    </div>
                )}

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