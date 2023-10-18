interface IProps {
  mobile?: boolean
  inversed?: boolean
}
export const TimePointDescription = ({mobile, inversed}: IProps) => {
  return (
    <div className={`self-end flex flex-col h-full w-[50%] ${inversed ? "pl-12 text-right " : "pr-12"}`}>
      <p>When does it start?</p>
      <hr className=" border-1 my-4 border-black" />
      <p>#MyFavoriteSport event kicks off at an interactive exhibition in Paris. </p>
    </div>
  );
};
