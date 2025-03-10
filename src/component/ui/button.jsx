export function Button({ children, onClick, variant = "default" }) {
    const variants = {
      default: "bg-blue-500 hover:bg-blue-600 text-white",
      ghost: "bg-transparent hover:bg-gray-100",
    };
  
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded ${variants[variant]}`}
      >
        {children}
      </button>
    );
  }
  