import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-md flex">
      {children}
    </div>
  );
};

export default ContentContainer;