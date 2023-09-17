import  cn from 'classnames';

interface ButtonProps {
    type?: "primary" | "secondary" | "optional";
    size?: "large" | "medium" | "small";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }
  export const Button = ({
    type = "primary",
    children,
    size = "medium",
    className,
    onClick,
  }: ButtonProps) => {
    const typeClasses =
      type === "primary"
        ? "bg-dark-footer text-white  hover:bg-white hover:text-dark-footer border-2 border-solid border-dark-footer "
        : type === "secondary"
        ? "bg-white text-dark-footer border-2 border-dark-footer border-solid hover:text-white hover:bg-dark-footer "
        : " ";
    const sizeClasses =
      size === "large"
        ? "text-md font-bold  py-1 sm:py-2"
        : size === "medium"
        ? "text-sm sm:text-md  font-semibold py-1"
        : "";
    return (
      <button
        onClick={onClick}
        className={cn(`rounded-lg transition-all duration-300  ease-in-out hover:transition-all  px-3 sm:px-4`, typeClasses, sizeClasses, className)}
      >
        {children}
      </button>
    );
  };
  