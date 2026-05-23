import cn from "../../utils/cn"

const Badge = ({status, className=""}) => {
    return (
        <span 
            className={cn(`px-3 py-1 rounded-full text-xs font-semibold border ${className}`)}>
            {status}
        </span>
    )
}

export default Badge;