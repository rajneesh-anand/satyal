import cn from "classnames";

type Props = {
  className?: string;
  [key: string]: unknown;
  children: React.ReactNode;
  onClick?: () => void;
};
const Card: React.FC<Props> = ({ children, className, onClick, ...props }) => {
  return (
    <div
      className={cn(" bg-light shadow rounded", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
