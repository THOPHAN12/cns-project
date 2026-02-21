import React from 'react';

export default function LogoutModal({ open, onConfirm, onCancel }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-[#3e2b1d]">Bạn có chắc chắn muốn đăng xuất?</h2>
                <div className="flex gap-4 mt-2">
                    <button
                        className="bg-[#463325] text-white rounded-full px-6 py-2 text-sm hover:bg-[#2e2118] transition-colors duration-300"
                        onClick={onConfirm}
                    >
                        Có
                    </button>
                    <button
                        className="bg-gray-200 text-gray-800 rounded-full px-6 py-2 text-sm hover:bg-gray-300 transition-colors duration-300"
                        onClick={onCancel}
                    >
                        Không
                    </button>
                </div>
            </div>
        </div>
    );
}
