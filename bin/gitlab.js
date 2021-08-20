const { Gitlab } = require('@gitbeaker/node');

exports.getAllProjects = async (host, token) => {
  const api = new Gitlab({ host, token });

  const result = await api.Projects.all();

  return result.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
  }));
}
