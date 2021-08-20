const { Gitlab } = require('@gitbeaker/node');

getAllProjects = async (host, token) => {
  const api = new Gitlab({ host, token });

  const result = await api.Projects.all();

  return result.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
  }));
}

getFileByProjectId = async (host, token, id, filePath) => {
  let file = {};
  const api = new Gitlab({ host, token });

  try {
    file = await api.RepositoryFiles.showRaw(id, filePath, 'master');
  } catch (error) {
    return file;
  }

  return file;
}

module.exports = {
  getAllProjects,
  getFileByProjectId,
};
