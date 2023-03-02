import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model('Project', ProjectSchema);
