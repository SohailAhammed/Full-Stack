import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch jobs from backend on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3030/jobs');
      setJobs(response.data);  // Use response.data to get the jobs from the backend
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const addJob = async (job) => {
    try {
      const response = await axios.post('http://localhost:3030/jobs', job, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        fetchJobs(); // Refresh the list
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const editJob = async (updatedJob) => {
    try {
      const response = await axios.put(`http://localhost:3030/jobs/${updatedJob.id}`, updatedJob, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        fetchJobs(); // Refresh the list
        setShowForm(false);
        setCurrentJob(null);
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3030/jobs/${id}`);
      if (response.status === 200) {
        fetchJobs(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const job = {
      id: currentJob ? currentJob.id : undefined, // Use undefined to let backend generate ID
      company: formData.get("company"),
      position: formData.get("position"),
      status: formData.get("status"),
    };
    currentJob ? editJob(job) : addJob(job);
    event.target.reset();
  };

  return (
    <div className="app">
      <h1>Job Tracker</h1>
      <nav>
        <button onClick={() => setShowForm(true)}>Add Job</button>
        <button onClick={() => setShowForm(false)}>View Jobs</button>
      </nav>

      {showForm && (
        <div className="add-job-form">
          <h2>{currentJob ? "Edit Job" : "Add Job"}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              defaultValue={currentJob ? currentJob.company : ""}
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              required
              defaultValue={currentJob ? currentJob.position : ""}
            />
            <select name="status" required defaultValue={currentJob ? currentJob.status : ""}>
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
            </select>
            <button type="submit">{currentJob ? "Update Job" : "Add Job"}</button>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="job-list">
          <h2>Job List</h2>
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <strong>{job.company}</strong> - {job.position} ({job.status})
                <button
                  onClick={() => {
                    setCurrentJob(job);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteJob(job.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer>
        <p>Job Tracker © 2024</p>
      </footer>
    </div>
  );
}
export default App;
