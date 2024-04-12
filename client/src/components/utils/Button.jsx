const Button = ({ children, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white font-medium px-2 py-1 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default Button;
