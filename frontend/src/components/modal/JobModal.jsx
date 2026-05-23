import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import api from '../../axios/api';
import useModalStore from "../../hooks/useModalStore";
import { toast } from "react-toastify";

const JobModal = ({ isOpen, onClose, data }) => {
  // ERROR MODAL
  const { onOpen } = useModalStore();

  // JOB INITIAL VALUE
  const jobInitialState = {
      company: null,
      position: null,
      jobUrl: null,
      salary: null,
      workModel: null,
      status: null,
      jobType: null,
      benefits: null,
      shiftSchedule: null,
      hoursRequired: null,
      isPaid: null
  };
  
  // STATE MANAGE OF JOB
  const [job, setJob] = useState(jobInitialState);

  useEffect(() => {
      if (!isOpen) {
          setJob(jobInitialState);
      }
  }, [isOpen]);

  // SETTING VALUE FOR JOB PROPERTY
  const handleOnchange = (field, value) => {
      setJob({...job, [field]: value});
  }

  /**
   * FILTER JOB PROPERTIES
   * REMOVE FIELD/S THAT IS NULL VALUE
   **/
  const filterJobProperties = () => {
    const filteredJob = Object.fromEntries(
      Object.entries(job).filter(([, value]) => value !== null)
    );

    return filteredJob;
  }

  // CREATE JOB
  const addJob = async (job) => {
      try {
          // SEND REQUEST TO THE SERVER TO CREATE JOB
          await api.post("/v1/job-application/jobs", job);

          // RE-FETCH JOB TO THE DASHBOARD
          data?.setJobCreated();

          // SHOW TOAST
          toast.success("Successfully Created");
      }
      catch (error) {
        // GET ERROR MESSAGE
        const errorMessage = error.response?.data || "Something Went Wrong!";
        
        // SHOW ERROR MODAL
        onOpen("error", errorMessage); 
    }
  }

  // PROCESS JOB CREATION
  const submitJob = async () => {
      await addJob(filterJobProperties());
      onClose();
  }

  // TRIGGERED ONCE SUBMIT BUTTON WAS CLICKED
  const handleSubmit = async (event) => {
    event.preventDefault();
    submitJob();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="animate-fade-in relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4  sm:max-w-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Job</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:grid grid-cols-4 gap-x-4">
                {/* Company Name */}
                <div>
                  <Label label="Company" requiredIcon={true} />
                  <Input
                    onChange={(e) => handleOnchange("company", e.target.value)}
                    type="text"
                    placeholder="e.g., Google"
                    required={true}
                  />
                </div>

                {/* Position */}
                <div>
                  <Label label="Position" requiredIcon={true} />
                  <Input
                    onChange={(e) => handleOnchange("position", e.target.value)}
                    type="text"
                    placeholder="e.g., Frontend Developer"
                    required={true}
                  />
                </div>

                {/* Job URL */}
                <div>
                  <Label label="Job URL" />
                  <Input
                    onChange={(e) => handleOnchange("jobUrl", e.target.value)}
                    type="text"
                    placeholder="https://..."
                  />
                </div>

                {/* Salary */}
                <div>
                  <Label label="Salary" requiredIcon={true} />
                  <Input
                    onChange={(e) => handleOnchange("salary", e.target.value)}
                    type="number"
                    placeholder="e.g., 8,000"
                    required={true}
                  />
                </div>

                {/* Work Model */}
                <div>
                  <Label label="Work Model" requiredIcon={true} />
                  <select
                    onChange={(e) => handleOnchange("workModel", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled className="hidden">Select</option>
                    <option value="onsite">On-site</option>
                    <option value="remote">Work From Home</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <Label label="Status" requiredIcon={true} />
                  <select
                    onChange={(e) => handleOnchange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled className="hidden">Select</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="wishlist">Wishlist</option>
                  </select>
                </div>

                {/* Job Type */}
                <div>
                  <Label label="Job Type" requiredIcon={true} />
                  <select
                    onChange={(e) => handleOnchange("jobType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled className="hidden">Select</option>
                    <option value="FULL TIME">Full-time</option>
                    <option value="PART TIME">Part-time</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>

                {job.jobType === "FULL TIME" && (
                    <div>
                      <Label label="Benefits" requiredIcon={true} />
                      <Input
                        onChange={(e) => handleOnchange("benefits", e.target.value)}
                        type="text"
                        placeholder="13th month pay"
                        required={true}
                      />
                    </div>
                )}

                {job.jobType === "PART TIME" && (
                    <div>
                      <Label label="Shift Schedule *" />
                      <Input
                        onChange={(e) => handleOnchange("shiftSchedule", e.target.value)}
                        type="text"
                        placeholder="Night Shift"
                        required={true}
                      />
                    </div>
                )} 

                {job.jobType === "INTERNSHIP" && (
                    <div>
                      <Label label="Hours Required" requiredIcon={true} />
                      <Input
                        onChange={(e) => handleOnchange("hoursRequired", e.target.value)}
                        type="number"
                        placeholder="500 hours"
                        required={true}
                      />
                      
                      <Label label="Paid" requiredIcon={true} />
                      <select   
                        onChange={(e) => handleOnchange("isPaid", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        defaultValue=""
                      > 
                        <option value="" disabled className="hidden">Select</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                text={"Cancel"}
                type="button"
                primary={false}
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
              />
              <Button
                text={"Submit"}
                type="submit"
                primary={false}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              />
            </div>
          </form>     
        </div>
      </div>
    </div>
  );
};

export default JobModal;
