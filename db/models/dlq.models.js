import mongoose from "mongoose";

const dlqSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  command: { type: String, required: true },
  attempts: { type: Number },
  error: { type: String },

  failed_at: { type: Number, default: () => Date.now() }
});

export default mongoose.model("DLQ", dlqSchema);