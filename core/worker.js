import { getNextRunnableJob, processResult } from './queueManager.js';
import { processJob } from "./jobProcessor.js";
import * as configRepo from "../db/repositories/configRepo.js";

// it will stop the code for given ms
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))



export const startWorker = async () => {
    const idleDelay = configRepo.get("worker_idle_delay") || 2000;

    console.log("Worker started with idle delay:", idleDelay)

    while (true) {
        const job = await getNextRunnableJob();

        if (!job) {
            // no job worker should sleep
            await sleep(idleDelay);
            continue;
        }
        console.log("Processing job:", job.id)

        const result = await processJob(job)

        await processResult(job, result.success, result.error)

        console.log("Completed job:", job.id)

        if (result.success) {
            console.log("Job succeeded:", job.id)
        } else {
            console.log("Job failed:", job.id, "Error:", result.error)
        }
    }
}