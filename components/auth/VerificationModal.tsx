interface VerificationModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const VerificationModal: React.FC<VerificationModalProps> = ({children, isModalOpen, setIsModalOpen}) => {
  return (
    <>
      {isModalOpen && 
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center h-auto"
      >
        <div className="bg-white rounded-3xl p-8 max-w-[95%] min-h-[400px] max-h-full grid grid-col relative overflow-hidden">
          <span onClick={() => setIsModalOpen(false)} className="absolute top-0 right-0 text-5xl font-light p-4 cursor-pointer active:scale-90 z-10">&times;</span>
          {children}
        </div>
      </div>
      }
    </>
  );
};