import {fork } from "child_process";

let workerProcesses=[];

// start worker processes

export const startWorker=(count=1)=>{
    console.log(`Starting ${count} worker processes...`);

    for(let i=0;i<count;i++){
        const worker=fork("./workerProcessor.js");

        workerProcesses.push(worker);

        console.log(`Worker ${i+1} started with PID: ${worker.pid}`);

        worker.on("exit",(code)=>{
            console.log(`Worker with PID: ${worker.pid} exited with code ${code}`);
        })
    }
}

// stop all worker processes
export const stopWorker=()=>{
    console.log("Stopping all worker processes...");

    workerProcesses.forEach((worker)=>{
        worker.send({type:"shutdown"});
    })

    workerProcesses=[];
}

// get total running workers

export const getRunningWorkerCount=()=>{
    return workerProcesses.length;
}   