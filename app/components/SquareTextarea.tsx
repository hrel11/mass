export const SquareTextarea = ({ className = '', ...props }) => {
  const baseClass =
    'text-base font-inherit border-none rounded-xl px-3 py-2 shadow-sm shadow-black/20 bg-white leading-6 m-0 hover:shadow hover:shadow-black/60';
  return <textarea className={`${className} ${baseClass}`} {...props} />;
};
