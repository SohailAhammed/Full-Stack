import React, { useState } from 'react';

const JobForm = ({ addJob }) => {
  const [job, setJob] = useState({ company: '', position: '', status: '' });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(job); // Add the job to the job list
    setJob({ company: '', position: '', status: '' }); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        value={job.company}
        onChange={handleChange}
        placeholder="Company Name"
        required
      />
      <input
        type="text"
        name="position"
        value={job.position}
        onChange={handleChange}
        placeholder="Job Position"
        required
      />
      <select name="status" value={job.status} onChange={handleChange} required>
        <option value="" disabled>Select Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
