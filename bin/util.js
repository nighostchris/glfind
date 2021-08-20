const Conf = require('conf');
const prompts = require('prompts');

const config = new Conf();

const getGitlabHost = () => config.get('host');

const getGitlabToken = () => config.get('token');

const getProjects = () => config.get('projects');

const checkGitlabHostExists = () => config.has('host');

const checkGitlabTokenExists = () => config.has('token');

const checkProjectsExists = () => config.has('projects');

const promptForGitlabHost = async () => {
  const response = await prompts({
    type: 'text',
    name: 'host',
    message: 'Gitlab Host:',
    validate: host => typeof host === 'string' && host.length > 0
      ? true : 'Invalid Host.',
  });

  if (typeof response.host !== 'undefined') {
    config.set('host', response.host);
  }
}

const promptForGitlabToken = async () => {
  const response = await prompts({
    type: 'password',
    name: 'token',
    message: 'Gitlab Token:',
    validate: token => typeof token === 'string' && token.length > 0
      ? true : 'Invalid Token.',
  });

  if (typeof response.token !== 'undefined') {
    config.set('token', response.token);
  }

  return true;
}

const promptForPackageName = async () => {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Package Name:',
    validate: name => typeof name === 'string' && name.length > 0
      ? true : 'Invalid Name.',
  });

  return response;
}

const promptForUseLocalRepoCache = async () => {
  const response = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Use Local Cache of Repositories Records ?',
    initial: true,
    active: 'Y',
    inactive: 'N'
  });

  return response;
}

module.exports = {
  getGitlabHost,
  getGitlabToken,
  getProjects,
  checkGitlabHostExists,
  checkGitlabTokenExists,
  checkProjectsExists,
  promptForGitlabHost,
  promptForGitlabToken,
  promptForPackageName,
  promptForUseLocalRepoCache,
};
