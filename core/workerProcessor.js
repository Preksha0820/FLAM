import { startWorker } from "./worker.js";

// Graceful shutdown listener
process.on("message", (msg) => {
  if (msg.type === "shutdown") {
    console.log(`Worker ${process.pid} shutting down...`);
    process.exit(0);
  }
});

// Start worker loop
startWorker();
