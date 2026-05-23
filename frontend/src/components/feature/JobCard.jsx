import Button from "../ui/Button";
import CheckMark from "../ui/CheckMark";
import Link from '../ui/Link';
import useStoreModal from '../../hooks/useModalStore';

const JobCard = ({
    id,
    jobType,
    position,
    company,
    workModel,
    status,
    jobUrl,
    salary,
    callback,
}) => {
    const { onOpen } = useStoreModal();

    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{company}</h3>
                    <p className="text-gray-600 mt-1">{position}</p>
                </div>
                <CheckMark text={status}/>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
                {
                    jobUrl ?
                    <a href={jobUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                        <Link />
                        View Job
                    </a> : 
                    <span className="flex items-center text-sm text-red-600 hover:text-red-800 cursor-not-allowed">
                        <Link />
                        View Job
                    </span>
                }

                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {workModel}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {salary}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {jobType}
                </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-300">
                <Button text={"Edit"} primary={false} className="bg-blue-400 hover:bg-blue-500 text-xs p-2 px-3 font-bold text-white"/>
                <Button text={"Delete"} primary={false} onClick={() => onOpen("delete", { title: `${position} at ${company}`, id: id, callback: callback })}  className="bg-red-400 hover:bg-red-500 text-xs p-2 font-bold text-white"/>
            </div>
        </div>
    )
}

export default JobCard;