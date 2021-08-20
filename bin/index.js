#!/usr/bin/env node

const { program } = require('commander');

const {
  repoSyncHandler, loginHandler, packageSearchHandler,
} = require('./handler');

program.version('0.1.1');

program
  .command('login')
  .description('Update Gitlab Host and Token information.')
  .action(async () => {
    await loginHandler();
  })

program
  .command('repo-sync')
  .alias('rs')
  .description('Sync the list of repositories hosted in Gitlab with local storage.')
  .action(async () => {
    await repoSyncHandler();
  });

program
  .command('package-search')
  .alias('ps')
  .description('Find the repositories that are using target npm package.')
  .action(async () => {
    await packageSearchHandler();
  });

program.parse(process.argv);
