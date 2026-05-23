import cn from "../../utils/cn";

const ClickableSpan = ({text, onClick, className=""}) => {
    return (
        <span onClick={onClick} 
            className={cn(`cursor-pointer text-yellow-500 hover:text-yellow-600 font-semibold transition-colors ${className}`)}>
            { text }
        </span>
    )
}

export default ClickableSpan;