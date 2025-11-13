import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  command: { type: String, required: true },

  state: {
    type: String,
    enum: ["pending", "processing", "completed", "failed", "dead"],
    default: "pending"
  },

  attempts: { type: Number, default: 0 },
  max_retries: { type: Number, default: 3 },

  run_at: { type: Number, default: () => Date.now() },

  created_at: { type: Number, default: () => Date.now() },
  updated_at: { type: Number, default: () => Date.now() },

  last_error: { type: String }
});

export default mongoose.model("Job", jobSchema);