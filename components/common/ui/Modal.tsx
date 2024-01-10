import React from "react";

interface IProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: IProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};