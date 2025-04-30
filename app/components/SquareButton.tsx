export const SquareButton = ({ children, type, className = '', ...props }) => {
  const baseClass =
    'text-[1rem] font-inherit border-none rounded-lg px-3 py-2 shadow-sm shadow-black/20 bg-white leading-[1.5] m-0 text-[#3992ff] font-medium hover:shadow-black/60 hover:shadow-sm active:shadow-black/40 active:shadow-sm active:translate-y-[1px] transition-all';
  return (
    <button className={`${className} ${baseClass}`} {...props}>
      {children}
    </button>
  );
};
