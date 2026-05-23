import Button from "../components/ui/Button";
import JobCard from "../components/feature/JobCard";
import useModalStore from "../hooks/useModalStore";
import useAuth from "../hooks/useAuth";
import ProfileDropdown from "../components/feature/ProfileDropdown";
import Empty from "../components/shared/Empty";
import { useEffect, useState } from "react";
import api from '../axios/api';

const Dashboard = () => {
    // CUSTOM HOOKS
    const { onOpen } = useModalStore();
    const { user, isLoading } = useAuth(); // USER HAS ONLY EMAIL AND USERNAME PROPERTIES

    const [ jobs, setJobs ] = useState([]);
    const [ isJobFetching, setJobFetching ] = useState(true);
    const [jobCreated, setJobCreated] = useState(0);
    const [jobDeleted, setJobDeleted] = useState(0);

    // FETCH JOBS
    useEffect(() => {
        if (user?.username) {
            api.get("/v1/job-application/jobs")
               .then(response => setJobs(response.data))
               .catch(error => console.log(error.response?.data))
               .finally(() => setJobFetching(false));
        }

    }, [user, jobCreated, jobDeleted]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Add Skeleton later</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Profile Section */}
                { user && (
                    <div className="flex justify-center mb-8">
                        <ProfileDropdown {...user} />
                    </div> 
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Job Tracker</h1>
                        <p className="text-gray-600 mt-1">Manage your job applications</p>
                    </div>
                    <Button 
                        onClick={() => onOpen("createJob", { setJobCreated: () => setJobCreated((prev) => prev + 1) })}
                        text="+ Add New Job" 
                        className="shadow-lg"
                    />
                </div>

                {/* Jobs Section */}
                { 
                    !isJobFetching && jobs.length === 0 ? <Empty /> : 
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {
                            jobs.map((job) => (
                                <JobCard key={job.id} {...job} callback={ { setJobDeleted: () => setJobDeleted((prev) => prev + 1) } } />
                            ))
                        }
                    </div> 
                }
            </div>
        </div>
    );
};

export default Dashboard;