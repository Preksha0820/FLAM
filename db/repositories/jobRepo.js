
import { readJSON,writeJSON } from "../../utils/fileStorage.js";

// here we are reading the json file and writing to it to store the jobs

const filePath="queue.json";
export const createJob=(job)=>{
    const data=readJSON(filePath);
    data.jobs.push(job);
    writeJSON(filePath,data);
    return data;
}


export const getNextRunnableJob=()=>{
    const data=readJSON(filePath);      
    const now=Date.now();

    const job=data.jobs.find(
        (j)=>j.state==="pending" && (j.runAt<=now)

    )

    // if koi job ni mili  so returning null
    if(!job){
        return null;
    }

    job.state="processing";
    job.updated_at=now;

    writeJSON("queue.json",data);
    return job;
}

export const markProcessing=(id)=>{
    const data=readJSON(filePath);
    const now=Date.now();
    
    const job=data.jobs.find((j)=>j.id===id);
    if(!job){
        return null
    }
    job.state="processing"
    job.updated_at=now;

    writeJSON(filePath,data);
    return job;
}

export const markCompleted=(id)=>{
    const data=readJSON(filePath);
    const now=Date.now();
    
    const job=data.jobs.find((j)=>j.id===id);
    if(!job){
        return null
    }
    job.state="completed"
    job.updated_at=now;

    writeJSON(filePath,data);
    return job;
}

export const markFailed=(id, error) => {
  const data = readJSON(filePath);
  const job = data.jobs.find((j) => j.id === id);
  if (!job) return null;

  job.state = "failed";
  job.last_error = error;
  job.updated_at = Date.now();

  writeJSON(filePath, data);
  return job;
}

export const incrementAttemps=(id)=>{
    const data=readJSON(filePath);
    const job=data.jobs.find((j)=>j.id===id);

    if(!job){
        return null;
    }

    job.attempts+=1;
    job.updated_at=Date.now();

    writeJSON(filePath,data);
    return job;
}

export const rescheduleJob=(id,runAt)=>{
    const data=readJSON(filePath);
    const job=data.jobs.find((j)=>j.id===id);
    if(!job){
        return null;
    }

    job.state = "pending";
    job.runAt=runAt;
    job.updated_at=Date.now();

    writeJSON(filePath,data);
    return job;
}

export const getJobById=(id)=>{
    const data=readJSON(filePath);
    return data.jobs.find((j)=>j.id===id) || null;
}

export const listByState=(state)=>{
    const data=readJSON(filePath);
    return data.jobs.filter((j)=>j.state===state);

}