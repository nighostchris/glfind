const Conf = require('conf');
const prompts = require('prompts');

const config = new Conf();

const getGitlabHost = () => config.get('host');

const getGitlabToken = () => config.get('token');

const checkGitlabHostExists = () => config.has('host');

const checkGitlabTokenExists = () => config.has('token');

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
    type: 'text',
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

module.exports = {
  getGitlabHost,
  getGitlabToken,
  checkGitlabHostExists,
  checkGitlabTokenExists,
  promptForGitlabHost,
  promptForGitlabToken,
}
