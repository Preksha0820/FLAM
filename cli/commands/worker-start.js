import { startWorker } from "../../core/workerManager.js";

export const workerStartCommand=(count)=>{
    const numWorkers=parseInt(count) || 1;
    startWorker(numWorkers);
    console.log(`${numWorkers} worker(s) started.`);
}