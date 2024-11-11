const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const jobs = require("./modals/jobModal"); // Import the jobs model

const app = express();

// Enable CORS for all routes to allow requests from the frontend
app.use(cors());

// Set up express to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Override HTTP methods to support PUT and DELETE in forms
app.use(methodOverride("_method"));

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Routes

// Home route for testing
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Display all jobs
app.get("/jobs", async (req, res) => {
  try {
    let AllJobs = await jobs.find({});
    res.render("jobs.ejs", { AllJobs });
  } catch (error) {
    res.status(500).send("Error fetching jobs.");
  }
});

// Render form to add a new job
app.get("/jobs/new", (req, res) => {
  res.render("form.ejs");
});

// Create a new job
app.post("/jobs", async (req, res) => {
  try {
    let { title, company, location, status } = req.body;
    await jobs.create({
      title: title,
      company: company,
      location: location,
      status: status,
    });
    res.redirect("/jobs");
  } catch (error) {
    res.status(500).send("Error creating job.");
  }
});

// Render form to edit a job
app.get("/jobs/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let reqJob = await jobs.findById(id);
    res.render("edit.ejs", { reqJob });
  } catch (error) {
    res.status(500).send("Error fetching job for editing.");
  }
});

// Update an existing job
app.put("/jobs/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { title, company, location, status } = req.body;
    await jobs.findByIdAndUpdate(id, {
      title: title,
      company: company,
      location: location,
      status: status,
    });
    res.redirect("/jobs");
  } catch (error) {
    res.status(500).send("Error updating job.");
  }
});

// Delete a job
app.delete("/jobs/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await jobs.findByIdAndDelete(id);
    res.redirect("/jobs");
  } catch (error) {
    res.status(500).send("Error deleting job.");
  }
});

// Start the server on port 3030
app.listen(3030, () => {
  console.log("Server started on port 3030");
});
