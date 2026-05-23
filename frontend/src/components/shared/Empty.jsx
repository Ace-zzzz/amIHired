const EmptyState = () => {
    return (
        <div className="flex flex-col justify-center items-center sm:h-[50vh] h-[30vh]">
            <div>
                <img src="/images/DoogieDoodle.svg" alt="EMPTY" className="sm:h-[30vh] h-[20vh]"/>
            </div>
            <div className="text-center">
                <p className="font-bold sm:text-3xl text-xl">You have no job application</p>
                <span className="text-gray-600 sm:text-sm text-xs">Start looking and track Your job apllication now.</span>
            </div>
        </div>
    );
}

export default EmptyState;