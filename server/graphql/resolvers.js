import { Project } from '../models/Project.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },

  Mutation: {
    saveProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      const savedProject = await project.save();

      return savedProject;
    },
  },
};
