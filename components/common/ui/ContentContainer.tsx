import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return (
    <div className="bg-neutral-white rounded-2xl p-10 shadow-md flex flex-col md:flex-row items-center mt-5 sm:mt-10 mx-auto w-11/12 lg:w-3/5">
      {children}
    </div>
  );
};

export default ContentContainer;