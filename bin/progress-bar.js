const _colors = require('colors');
const cliProgress = require('cli-progress');

const progressBar = new cliProgress.Bar({
  format: (options, params, payload) => {
    const bar = options.barCompleteString.substr(0, Math.round(params.progress * options.barsize));
    const incompleteBar = options.barIncompleteString.substr(Math.round(params.progress * options.barsize), options.barsize);

    if (params.value >= params.total){
        return '# ' + _colors.grey(payload.task) + '   ' + _colors.green(params.value + '/' + params.total) + ' --[' + bar + incompleteBar + ']-- ';
    }else{
        return '# ' + payload.task + '   ' + _colors.yellow(params.value + '/' + params.total) + ' --[' + bar + incompleteBar + ']-- ';
    }
  },
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  stopOnComplete: true,
  barsize: 100,
});

module.exports = {
  progressBar,
};
