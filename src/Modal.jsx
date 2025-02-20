import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] bg-opacity-50 flex justify-center items-center z-1000">
            <div className="bg-white p-5 rounded-lg shadow-md w-4/5 max-w-lg relative">
                <div onClick={onClose} className='flex gap-1 items-center cursor-pointer'>
                    <IoArrowBack /> Atrás
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;