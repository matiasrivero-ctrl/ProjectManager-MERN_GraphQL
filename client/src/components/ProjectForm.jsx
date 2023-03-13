import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECTS, GET_PROJECTS } from "../graphql/projects";

export function ProjectForm() {
  const [projects, setProjects] = useState({
    name: "",
    description: "",
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECTS, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProjects",
    ],
  });

  const handleChange = ({ target: { name, value } }) => {
    setProjects({
      ...projects,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProject({
      variables: {
        name: projects.name,
        description: projects.description,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <h4>{error.message}</h4>}

        <input
          type="text"
          name="name"
          placeholder="Write a title"
          onChange={handleChange}
        />
        <textarea
          name="description"
          id="textarea"
          cols="5"
          rows="5"
          placeholder="Write a description"
          onChange={handleChange}
        ></textarea>
        <button disabled={!projects.name || !projects.description || loading}>
          Send
        </button>
      </form>
    </>
  );
}
