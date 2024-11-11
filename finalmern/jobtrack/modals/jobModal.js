const mongoose = require('mongoose');

main().then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/jobTracker');
}

const jobSchema = mongoose.Schema({
    title: String,
    company: String,
    location: String,
    status: String,
    dateApplied: { type: Date, default: Date.now }
});

let jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;
