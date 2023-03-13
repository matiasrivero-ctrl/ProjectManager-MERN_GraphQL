import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query {
    projects {
      _id
      name
      description
    }
  }
`;

export const CREATE_PROJECTS = gql`
  mutation($name: String!, $description: String!) {
    createProject(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;