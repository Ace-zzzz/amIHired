const Input = ({type, placeholder, onChange, required = false}) => {
    return (
        <input 
            onChange={onChange}
            required={required}
            type={type} 
            className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all duration-200 placeholder:text-gray-400" 
            placeholder={placeholder}
        />
    )
}

export default Input;