const Conf = require('conf');
const chalk = require('chalk');

const {
  getAllProjects, getFileByProjectId,
} = require('./gitlab');
const { progressBar } = require('./progress-bar');
const {
  getGitlabHost, getGitlabToken, promptForGitlabHost, promptForGitlabToken,
  checkGitlabHostExists, checkGitlabTokenExists, checkProjectsExists,
  promptForUseLocalRepoCache, getProjects, promptForPackageName,
} = require('./util');

const config = new Conf();

const log = console.log;

const loginHandler = async () => {
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

const repoSyncHandler = async () => {
  if (!checkGitlabHostExists() || !checkGitlabTokenExists()) {
    log(chalk.redBright('Please login before you sync repositories.'));
    return false;
  } else {
    const host = getGitlabHost();
    const token = getGitlabToken();
  
    try {
      log(chalk.yellow('Start Syncing Repositories. Might take some time depending on number of hosted repositories.'));

      const projects = await getAllProjects(host, token);
  
      config.set('projects', JSON.stringify(projects));
    
      log(chalk.greenBright('Gitlab Repositories Synced.'));

      return true;
    } catch (error) {
      log(chalk.redBright(error.message));

      return false;
    }
  }
}

const packageSearchHandler = async () => {
  if (!checkGitlabHostExists() || !checkGitlabTokenExists()) {
    log(chalk.redBright('Please login before you sync repositories.'));
    return false;
  } else {
    const host = getGitlabHost();
    const token = getGitlabToken();

    let packageName = undefined;
    packageName = await promptForPackageName();

    if (Object.keys(packageName).length) {
      let goodToProceed = false;
      const { name } = packageName;

      const useLocal = await promptForUseLocalRepoCache();
    
      if (useLocal.value) {
        if (checkProjectsExists()) {
          goodToProceed = true;
        } else {
          log(chalk.redBright('Please Sync Repositories with Gitlab first if you want to use local cache.'));
        }
      } else {
        goodToProceed = await repoSyncHandler();
      }
    
      if (goodToProceed) {
        const filteredProjects = [];
        const projects = JSON.parse(getProjects());

        progressBar.start(projects.length, 0, {
          task: 'Searching',
        });
    
        for (project of projects) {
          const file = await getFileByProjectId(host, token, project.id, 'package.json');
    
          try {
            if (Object.keys(file).length > 0) {
              const packageJsonInObject = JSON.parse(String(file));
      
              if (packageJsonInObject["dependencies"]) {
                const dependencies = Object.keys(packageJsonInObject["dependencies"]);
      
                if (dependencies.filter((dep) => dep === name).length) {
                  filteredProjects.push(project.name);
                }
              }
            }
          } catch (error) {}

          progressBar.increment(1);
        }
    
        log(chalk.greenBright(`\nRepositories that depending on package '${name}':`));
        log(chalk.blueBright(`${filteredProjects.join('\n')}`));
      }
    } else {
      log(chalk.redBright('Package Name not provided. Will not proceed.'));
    }
  }
}

module.exports = {
  loginHandler,
  repoSyncHandler,
  packageSearchHandler,
};
