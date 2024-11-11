import React from 'react';

const JobList = ({ jobs, deleteJob, updateStatus }) => {
  return (
    <div>
      <h2>Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <strong>{job.company}</strong> - {job.position} ({job.status})
              <button onClick={() => deleteJob(index)}>Delete</button>
              <select
                value={job.status}
                onChange={(e) => updateStatus(index, e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
