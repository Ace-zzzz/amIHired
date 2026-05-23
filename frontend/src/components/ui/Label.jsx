const Label = ({label, requiredIcon = false}) => {
    return (
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} 
            { requiredIcon && (<span className="text-red-500"> * </span>) }
        </label>
    )
}

export default Label;