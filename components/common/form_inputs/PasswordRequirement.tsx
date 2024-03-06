interface PasswordRequirementProps extends React.HTMLProps<HTMLParagraphElement> {
  isValid: boolean;
  id: string;
  text: string;
}

export const PasswordRequirement = ({ isValid, text, id, ...props }: PasswordRequirementProps) => {
  return (
    <p
      className={isValid ? "text-accent-green" : "text-accent-red"}
      aria-live="polite"
      aria-atomic="true"
      id={`${id}-${text.toLowerCase().replace(/\s+/g, "-")}`}
      {...props}
    >
      {text}
      <span className="sr-only">,</span>
      {isValid && <span aria-label="Condition met" className="sr-only">✅</span>}
      {!isValid && <span aria-label="Condition not met" className="sr-only">❌</span>}
      <span className="sr-only">.</span>

    </p>
  );
};