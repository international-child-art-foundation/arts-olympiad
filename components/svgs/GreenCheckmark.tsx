interface GreenCheckmarkProps {
  className?: string;
  scale?: number;
}

export const GreenCheckmark: React.FC<GreenCheckmarkProps> = ({
  className = "",
  scale = 1,
}) => {
  return (
    <svg
      className={className}
      width={32 * scale}
      height={32 * scale}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 50 L40 70 L80 30"
        stroke="green"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
