import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isInvited, setIsInvited] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    <div className="w-full bg-[#3e2b20] text-[#ebe2d7] py-16 font-sans overflow-hidden">
      
      {/* 1. Background Watermark (Chữ CNS chìm) */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
        <span className="text-[25vw] font-bold text-white opacity-[0.02] leading-none whitespace-nowrap">
          CNS
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- CỘT TRÁI (Chiếm 5 phần) --- */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className='w-full'>
              <h2 className="text-4xl uppercase tracking-wide w-full font-normal mb-6">CNS</h2>
              <p className="text-lg leading-7 opacity-90">
                Thời trang tối giản cho lối sống hiện đại.<br />
                Thiết kế sạch, vừa vặn với cơ thể thật và được tạo nên từ sự chỉn chu của đội ngũ CNS.
              </p>
            </div>

            <div className="space-y-4 w-150">
              <p className="text-lg opacity-70 w-full">
                Hãy tham gia cộng đồng của chúng tôi để trở thành người đầu tiên cập nhật các bộ sưu tập mới nhất, chương trình ưu đãi đặc biệt và những điều sắp ra mắt
              </p>
              
              {/* Input Email Custom */}
              <div className="relative w-full group m-0.5">
                <input 
                  type="email" 
                  placeholder="Nhập email vào đây ..."
                  className="w-full bg-transparent border border-[#ebe2d7]/30 rounded-full py-3 px-6 pr-12 text-sm outline-none focus:border-[#ebe2d7]/80 transition-colors placeholder-[#ebe2d7]/50"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (showEmailWarning && e.target.value !== "") {
                      setShowEmailWarning(false);
                    }
                  }}
                />
                <input 
                  type='checkbox'
                  checked={isInvited && email !== "" && emailRegex.test(email)} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center bg-[#ebe2d7]/20 rounded-full hover:bg-[#ebe2d7]/30 transition-colors"
                  onClick={() => {
                    if (!emailRegex.test(email)) {
                      setShowEmailWarning(true);
                      return;
                    }
                    setIsInvited(true);
                  }}
                >                  
                </input>
              </div>
              {showEmailWarning && <p className='text-sm text-red-700'>
              Vui lòng kiểm tra lại định dạng email trước khi gửi
              </p>}
              {isInvited && <p className='text-sm text-gray-500'>
              CNS đã gửi lời mời tham gia cộng đồng qua email của bạn, chúng mình rất mong chờ bạn trở thành một thành viên của <b>CNS Besties!</b>  
              </p>}
            </div>

            <div className="mt-auto pt-4">
              <p className="text-xs opacity-60">Địa chỉ: TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>

          {/* Khoảng trống ở giữa (Chiếm 2 phần) */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* --- CỘT PHẢI (Chiếm 5 phần) --- */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left lg:text-right">
            <div>
              <h2 className="text-4xl font-normal mb-6">Kết Nối Với CNS</h2>
              <p className="text-lg leading-7 opacity-90 ml-auto">
                Theo dõi chúng tôi để cập nhật bộ sưu tập mới, câu chuyện phía sau từng sản phẩm mà chúng mình tâm huyết tạo ra, và hành trình theo đuổi thời trang bền vững.
              </p>
            </div>

            {/* Social Media & Contact */}
            <div className="flex flex-col items-start lg:items-end space-y-6 mt-8">
              <div className="text-left lg:text-right space-y-1">
                <p className="text-xs opacity-70 tracking-wide">Hotline: 09851800</p>
                <p className="text-xs opacity-70 tracking-wide">E-mail: cleannie.studio@gmail.com</p>
              </div>

              <div className="flex gap-4">

                <SocialIcon href="https://www.facebook.com/share/1GtEVZWN82/">
                   {/* Facebook Icon */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </SocialIcon>

                <SocialIcon href="https://www.instagram.com/cleannie.studio/">
                  {/* Instagram Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </SocialIcon>

                <SocialIcon href="https://www.tiktok.com/@cnsstudio?lang=en">
                   {/* TikTok Icon */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Component nhỏ tái sử dụng cho các nút mạng xã hội
const SocialIcon = ({ children, href }) => {
  return (
    <a 
      href={href}
      className="w-10 h-10 flex items-center justify-center rounded-md bg-[#ebe2d7]/20 hover:bg-[#ebe2d7]/30 transition-all duration-300 text-white"
    >
      {children}
    </a>
  );
};

export default Footer;