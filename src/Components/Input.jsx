const Input = ({
  label,
  icon,
  className,
  placeholder,
  error,
  value,
  fullWidth,
  type,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor="name"
        className={`md:text-sm text-[12px] font-bold text-gray-200 relative top-4 left-1`}
      >
        {label}
      </label>
      <div className="relative md:top-9 top-8 left-3 w-0">{icon}</div>
      <input
        {...props}
        className={`${className} pl-12 pr-2 ${fullWidth ? 'w-full' : ''} p-3 md:text-[16px] text-[12px] md:text-base bg-gray-800 border border-gray-700 rounded-2xl text-start text-white outline-0
          ${error ? 'border-red-500' : 'focus:border-violet-500'}`}
        placeholder={placeholder}
        type={type}
        error={error}
        value={value}
      />
    </div>
  );
};

export default Input;
