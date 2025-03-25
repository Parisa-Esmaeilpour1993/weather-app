interface ButtonProps {
  children: string;
  type: "submit" | "reset" | "button";
  onClick: () => void;
  className: string;
}
export default function Button({
  children,
  type,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
}
