import { program } from "commander";

// COMMANDS
import { enqueueCommand } from "./commands/enqueue.js";
import { workerStartCommand } from "./commands/worker-start.js";
import { workerStopCommand } from "./commands/worker-stop.js";
import { listJobsCommand } from "./commands/list.js";
import { statusCommand } from "./commands/status.js";
import { dlqListCommand } from "./commands/dlq-list.js";
import { dlqRetryCommand } from "./commands/dlq-retry.js";
import { configGetCommand } from "./commands/config-get.js";
import { configSetCommand } from "./commands/config-set.js";


program.version("1.0.0");

// ENQUEUE
program
  .command("enqueue <jobJson>")
  .description("Add a job to the queue")
  .action(enqueueCommand);

// WORKERS
program
  .command("worker-start")
  .option("--count <n>", "Number of workers", "1")
  .description("Start workers")
  .action(workerStartCommand);

program
  .command("worker-stop")
  .description("Stop all workers")
  .action(workerStop);

// LIST JOBS
program
  .command("list")
  .option("--state <state>", "Filter by state")
  .description("List jobs")
  .action(listJobsCommand);

// STATUS
program
  .command("status")
  .description("Queue + Worker status")
  .action(statusCommand);

// DLQ
program
  .command("dlq-list")
  .description("List DLQ jobs")
  .action(dlqListCommand);

program
  .command("dlq-retry <id>")
  .description("Retry job from DLQ")
  .action(dlqRetryCommand);

// CONFIG
program
  .command("config-get [key]")
  .description("Get config")
  .action(configGetCommand);

program
  .command("config-set <key> <value>")
  .description("Set config")
  .action(configSetCommand);

program.parse(process.argv);
