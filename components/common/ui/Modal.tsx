import React from "react";
import close from "../../../public/svgs/close.svg";
import Image from "next/image";

interface IProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: IProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={() => onClose()}
          className="cursor-pointer fixed z-30 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] min-w-[40%] cursor-default relative mx-8 py-16 bg-white p-6 rounded-md flex justify-center"
          >
            <button className="absolute top-8 right-8"  onClick={() => onClose()} >
              <Image width={14} src={close} alt="Close button." />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};