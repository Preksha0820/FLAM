import fs from "fs";
import path from "path";
import fsExt from "fs-ext";

const basePath = path.resolve("db/data");

// Lock wrapper to avoid concurrent access
function withLock(filePath, callback) {
  const fd = fs.openSync(filePath, "r+");

  fsExt.flockSync(fd, "ex"); // lock file

  try {
    return callback(fd);
  } finally {
    fsExt.flockSync(fd, "un"); // unlock
    fs.closeSync(fd); // close file
  }
}

// Read JSON safely
export function readJSON(fileName) {
  const filePath = path.join(basePath, fileName);

  return withLock(filePath, () => {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  });
}

// Write JSON safely
export function writeJSON(fileName, data) {
  const filePath = path.join(basePath, fileName);

  return withLock(filePath, () => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
}