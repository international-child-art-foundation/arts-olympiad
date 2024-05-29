interface VerificationModalProps {
  children: React.ReactNode
}

export const VerificationModal: React.FC<VerificationModalProps> = ({children}) => {

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center h-auto"
    >
      <div className="bg-white rounded-3xl p-8 max-w-[95%] min-h-[400px] max-h-full grid grid-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};