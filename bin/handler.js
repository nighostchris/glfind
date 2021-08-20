const Conf = require('conf');
const chalk = require('chalk');

const { getAllProjects } = require('./gitlab');
const {
  getGitlabHost, getGitlabToken, promptForGitlabHost,
  promptForGitlabToken, checkGitlabHostExists, checkGitlabTokenExists,
} = require('./util');

const config = new Conf();

console.log(config.path);
const log = console.log;

exports.loginHandler = async () => {
  if (checkGitlabHostExists() && checkGitlabTokenExists()) {
    log(chalk.yellow(`Found Gitlab Host: ${getGitlabHost()}`));
    log(chalk.yellow(`Found Gitlab Token: ${getGitlabToken()}\n`));
    log(chalk.white('Going to update Gitlab Credential.\n'));
  }

  await promptForGitlabHost();

  if (checkGitlabHostExists()) {
    await promptForGitlabToken();

    if (checkGitlabTokenExists()) {
      log(chalk.greenBright('Gitlab Credential Updated.'));
    } else {
      log(chalk.redBright('Failed to get Gitlab Token.'));
    }
  } else {
    log(chalk.redBright('Failed to get Gitlab Host.'));
  }
}

exports.repoSyncHandler = async () => {
  if (!checkGitlabHostExists() || !checkGitlabTokenExists()) {
    log(chalk.redBright('Please login before you sync repositories.'));
  } else {
    const host = getGitlabHost();
    const token = getGitlabToken();
  
    try {
      log(chalk.yellow('Start Syncing Repositories. Might take some time depending on number of hosted repositories.'));

      const projects = await getAllProjects(host, token);
  
      config.set('projects', JSON.stringify(projects));
    
      log(chalk.greenBright('Gitlab Repositories Synced.'));
    } catch (error) {
      log(chalk.redBright(error.message));
    }
  }
}
