const gulpBeautify = require('gulp-beautify');

const beautify = function () {
  this.registerTransformStream(
    gulpBeautify({ indent_size: 2 })
  );
};

const alphabeticalSort = (a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

const descriptions = {
  appName: 'The name of your app',
  reactExtension: 'Default react component extension',
  packageManager: 'Preferred package manager',
  packageName: 'The name of the package',
  moduleName: 'The name of your module',
  vulcanDependencies: 'The vulcan packages that your application depends on',
  isPackageAutoAdd: 'Set to true if you want your package to be added to .meteor/packages',
};

const messages = {
  appName: 'App name',
  reactExtension: 'React extension',
  packageManager: 'Package manager',
  packageName: 'Package name',
  moduleName: 'Module name',
  vulcanDependencies: 'Vulcan dependencies',
  isPackageAutoAdd: 'Add to .meteor/packages',
  storyBookStatus: 'Looks like you havent set up your react storybook. Would you like to do it now?',
};

const reactExtensions = ['jsx', 'js'];

const packageManagers = ['yarn', 'npm'];

const getDefaultChoiceIndex = (choices, option) => {
  const index = choices.findIndex((elem) => elem === option);
  return Math.max(index, 0);
};

const exposed = {
  beautify,
  alphabeticalSort,
  descriptions,
  messages,
  reactExtensions,
  packageManagers,
  getDefaultChoiceIndex,
};

module.exports = exposed;
