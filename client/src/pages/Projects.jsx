import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { ProjectList } from "../components/ProjectList";
import { ProjectCard } from "../components/ProjectCard";

export function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <>
      <h1>Hola Mundo!</h1>
      <ProjectList />
      {data.projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </>
  );
}
