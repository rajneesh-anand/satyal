export const RUFlag: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      className="h-full"
    >
      <path fill="#ce2a1d" d="M0 320h640v160H0z" />
      <path fill="#f7f7f7" d="M0 0h640v160H0z" />
      <path fill="#0037a1" d="M0 160h640v160H0z" />
    </svg>
  );
};
