import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  link: string;
  mainButton?: boolean;
  nonNav?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, mainButton,nonNav, link }) => {
  const buttonStyle = mainButton 
    ? nonNav? "min-w-[90px] text-center bg-main-blue hover:bg-secondary-blue text-white px-4 py-2 rounded-full block": "min-w-[90px] text-center bg-main-blue hover:bg-secondary-blue text-white px-4 py-2 rounded-full hidden md:block" 
    : "bg-white text-blue-500 px-4 py-2 rounded-full hidden md:block";

  return (
    <Link href={link} className={buttonStyle}>
      {children}
    </Link>
  );
};

export default Button;
