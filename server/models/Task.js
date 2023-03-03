import mongoose from 'mongoose';
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', TaskSchema);
