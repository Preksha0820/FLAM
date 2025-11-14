import { readJSON, writeJSON } from "../../utils/fileStorage.js";

const DLQ_FILE = "dlq.json";
const QUEUE_FILE = "queue.json";


// here we are moving the dead jobs to dlq and removing them from main queue
export const moveToDLQ = (jobId, error) => {
    const data = readJSON(DLQ_FILE);

    const queueData = readJSON(QUEUE_FILE);

    data.dlq.push({
        id: jobId,
        command: job.command,
        attempts: job.attempts,
        last_error: error,
        failed_at: Date.now()
    })

    writeJSON(DLQ_FILE, dlqData);

    queueData.jobs = queueData.jobs.filter((j) => j.id !== jobId);

    writeJSON(QUEUE_FILE, queueData);
}

// listing all the dlq jobs

export const listDLQJobs = () => {
    const data = readJSON(DLQ_FILE);
    return data.dlq;
}


export const getDLQById = () => {

    const data = readJSON(DLQ_FILE);
    const job = data.dlq.find((j) => j.id === id);
    return job;
}

export const deleteDLQById = (id) => {
    const data = readJSON(DLQ_FILE)

    data.dlq = data.dlq.filter((j) => j.id !== id)

    writeJSON(DLQ_FILE, data);
}

export const retryJob = (id) => {
    const data = readJSON(DLQ_FILE)
    const job = data.dlq.find((j) => j.id === id)

    if (!job) return null

    data.dlq = data.dlq.filter((j) => j.id !== id);

    const newJob = {
        id: job.id,
        command: job.command,
        state: "pending",
        attempts: 0,
        max_retries: 3,
        run_at: Date.now(),
        created_at: Date.now(),
        updated_at: Date.now(),
        last_error: null,
    }

    const queueData = readJSON(QUEUE_FILE)
    queueData.jobs.push(newJob)
    writeJSON(QUEUE_FILE, queueData);

    return newJob;
}




