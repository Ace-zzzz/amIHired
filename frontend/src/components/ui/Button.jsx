import cn from '../../utils/cn'

const Button = ({text, className ="", type="button", primary = true, onClick, form}) => {
    const primaryStyles = "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-500/40";
    const secondaryStyles = "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md";
    
    return (
        <button 
            form={form}
            onClick={onClick}
            type={type}
            className={cn(`cursor-pointer rounded-xl px-6 py-3.5 font-semibold text-base transition-all duration-200
            ${primary ? primaryStyles : secondaryStyles} ${className}`)}>
            {text}
        </button>
    )
}

export default Button;