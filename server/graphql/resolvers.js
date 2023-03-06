import { GraphQLError } from 'graphql';
import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';

export const resolvers = {
  Query: {
    projects: async () => {
      const project = await Project.find();
      return project;
    },

    project: async (_, { _id }) => {
      const project = await Project.findById(_id);
      if (!project) return null;
      return project;
    },

    tasks: async () => {
      const task = await Task.find();
      return task;
    },

    task: async (_, { _id }) => {
      const task = await Task.findById(_id);
      if (!task) return null;

      return task;
    },
  },

  Mutation: {
    // Projects Mutation
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      const savedProject = await project.save();

      return savedProject;
    },

    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject)
        throw new GraphQLError('Project not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: _id,
          },
        });

      await Task.deleteMany({ projectId: deletedProject._id });

      return deletedProject;
    },

    updateProject: async (_, args) => {
      const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });

      if (!updatedProject) {
        throw new GraphQLError('Project not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args._id,
          },
        });
      }

      return updatedProject;
    },

    // Tasks Mutation
    createTask: async (_, { title, projectId }) => {
      const projectFound = await Project.findById(projectId);
      if (!projectFound) {
        throw new GraphQLError('Project not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: projectId,
          },
        });
      }

      const task = new Task({
        title,
        projectId,
      });

      const savedTask = await task.save();

      return savedTask;
    },

    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) {
        throw new GraphQLError('Task not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: _id,
          },
        });
      }
      return deletedTask;
    },

    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true,
      });

      if (!updatedTask) {
        throw new GraphQLError('Project not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args._id,
          },
        });
      }

      return updatedTask;
    },
  },
};
