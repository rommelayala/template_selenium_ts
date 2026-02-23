module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/hooks/**/*.ts', 'src/steps/**/*.ts', 'src/support/**/*.ts'],
    format: ['progress-bar', 'summary'],
    parallel: 1,
    paths: ['src/features/**/*.feature']
  }
};
