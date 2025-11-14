import * as jobRepo from '../db/repositories/jobRepo'
import * as dlqRepo from '../db/repositories/dlqRepo.js'
import * as configRepo from '../db/repositories/configRepo.js'

// enqueue a new job

export const enqueue = (job) => {
    const now = Date.now();

    const newJob = {
        ...job,
        state: "pending",
        attempts: 0,
        max_retries: configRepo.get("max_retries") || 3,
        run_at: now,
        created_at: now,
        updated_at: now,
        last_error: null,
    }

    return jobRepo.createJob(newJob)

}

// fetch new runnable job

export const getNextRunnableJob = () => {
    return jobRepo.getNextRunnableJob()
}

// mark completed 
export const markCompleted = (id) => {
    return jobRepo.markCompleted(id);
};


export const handleFailure = (job, error) => {
    const maxRetries = configRepo.get("max_retries") || 3
    const backOffBase = configRepo.get("backoff_base") || 2

    // incremnting attempts

    jobRepo.incrementAttemps(job.id)

    const updated = jobRepo.getJobById(job.id);

    const attempts = updated.attempts


    if (attempts > maxRetries) {
        dlqRepo.moveToDLQ(updated, error)
        return { movedToDLQ: true }

    }

    const delay = Math.pow(backOffBase, attempts) * 1000 // in seconds

    const nextRunAt = Date.now() + delay;

    jobRepo.rescheduleJob(job.id, nextRunAt);

    return {
        retryScheduled: true,
        nextRunAt,
        attempts
    }


}

export const processResult = (job, success, error) => {
    if (success) {
        return markCompleted(job.id)
    } else {
        return handleFailure(job, error)
    }
}