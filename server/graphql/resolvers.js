import { ApolloServerErrorCode } from '@apollo/server/errors';
import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World',
    getProjects: async () => {
      const project = await Project.find();
      return project;
    },
    getTasks: async () => {
      const task = await Task.find();
      return task;
    },
  },

  Mutation: {
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      const savedProject = await project.save();

      return savedProject;
    },

    createTask: async (_, { title, projectId }) => {
      const projectFound = await Project.findById(projectId);
      if (!projectFound) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT(
          "Project ID doesn't exist",
          {
            invalidArgs: projectId,
          }
        );
      }

      const task = new Task({
        title,
        projectId,
      });

      const savedTask = await task.save();

      return savedTask;
    },
  },
};
