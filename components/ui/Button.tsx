import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  link: string;
  mainButton?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, mainButton, link }) => {
  const buttonStyle = mainButton 
    ? "bg-blue-500 text-white px-4 py-2 rounded-full hidden md:block" 
    : "bg-white text-blue-500 px-4 py-2 rounded-full hidden md:block";

  return (
    <Link href={link} className={buttonStyle}>
      {children}
    </Link>
  );
};

export default Button;
