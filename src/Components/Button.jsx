function Button({ children, type, className, ...props }) {
  return (
    <div>
      <button
        {...props}
        type={type}
        className={`${className} md:py-3 py-1.5 bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:from-violet-800 hover:to-fuchsia-800 transition disabled:opacity-50 flex items-center justify-center`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
