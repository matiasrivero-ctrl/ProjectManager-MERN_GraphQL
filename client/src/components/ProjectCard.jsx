export function ProjectCard({ project }) {
  return (
    <>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </>
  );
}
