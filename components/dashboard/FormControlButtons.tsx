
interface FormControlButtonProps { 
  setEditMode: (editMode: boolean) => void;
}

export const FormControlButtons: React.FC<FormControlButtonProps> = ({ setEditMode }) => {

  return (
    <>
      <div className="my-8 justify-around grid grid-cols-2 gap-4 ">
        <button type="button"
          onClick={() => setEditMode(false)}
          className="py-3 text-center bg-neutral-white border-new-blue border rounded text-base font-normal text-new-blue w-full cursor-pointer"
        >
          Cancel
        </button>
        <button type="submit"
          className="py-3 border rounded text-center text-base font-normal w-full cursor-pointer bg-neutral-white border-new-blue bg-new-blue text-white"
        >
          Save
        </button>
      </div>
    </>
  );
};