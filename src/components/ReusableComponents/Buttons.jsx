

function Button({ children, className = '', type = 'button', onClick }) {
  
    return (
   
   <button type={type} className={`custom-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;