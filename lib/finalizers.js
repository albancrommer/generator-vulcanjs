const pascalCase = require('pascal-case');
const camelCase = require('camelcase');
const filter = require('./filters').filter;
const pathFinder = require('./path-finder');
const store = require('./store');

let generator;

function setup(generatorSetup) {
  generator = generatorSetup;
}

function finalize(propName, ...args) {
  function getRaw(keyBeforeRaw, answers) {
    return generator.options[keyBeforeRaw] || (generator.props ? generator.props[keyBeforeRaw] : undefined) || answers[keyBeforeRaw];
  }

  function appName(answers) {
    const appNameRaw = getRaw.bind(this)('appName', answers);
    return filter('appName', appNameRaw);
  }

  function packageName(answers) {
    const packageNameRaw = getRaw('packageName', answers);
    return filter('packageName', packageNameRaw);
  }

  function moduleName(answers) {
    const moduleNameRaw = getRaw('moduleName', answers);
    return filter('moduleName', moduleNameRaw);
  }

  function componentName(answers) {
    const componentNameRaw = getRaw('componentName', answers);
    return filter('componentName', componentNameRaw);
  }

  function componentFileName(answers) {
    const filteredComponentName = filter('componentName', answers.componentName);
    return `${filteredComponentName}.${store.get('reactExtension')}`;
  }

  function componentPath(answers) {
    return pathFinder.get({ isAbsolute: false }, 'moduleInComponents', componentFileName(answers));
  }

  function pascalModuleName(answers) {
    const moduleNameRaw = getRaw('moduleName', answers);
    return pascalCase(moduleNameRaw);
  }

  function camelModuleName(answers) {
    const moduleNameRaw = getRaw('moduleName', answers);
    return camelCase(moduleNameRaw);
  }

  function moduleParts(answers) {
    return Object.keys(answers.moduleParts);
  }

  function collectionName(answers) {
    return pascalModuleName(answers);
  }

  function mutationName(mutationType, answers) {
    const moduleNamePart = camelModuleName(answers);
    return `${moduleNamePart}${mutationType}`;
  }

  function permissionName(permission, answers) {
    const camelModuleNamePart = camelModuleName(answers);
    const permissionAppendage = permission.join('.');
    return `${camelModuleNamePart}.${permissionAppendage}`;
  }

  function vulcanDependencies(answers) {
    const rawDependencies = getRaw('vulcanDependencies', answers);
    return rawDependencies.map(dep => `'${dep}'`);
  }

  function resolverName(resolverType, answers) {
    const resolverNamePart = camelModuleName(answers);
    return `${resolverNamePart}${resolverType}`;
  }

  function hasResolver(resolverType, answers) {
    const defaultResolvers = getRaw('defaultResolvers', answers);
    return defaultResolvers[resolverType];
  }

  function addRouteStatement(answers) {
    const routeName = getRaw('routeName', answers);
    const routePath = getRaw('routePath', answers);
    const layoutName = getRaw('layoutName', answers);
    const routeComponentName = componentName(answers);
    return `addRoute({
      name: '${routeName}',
      path: '${routePath}',
      component: Components.${routeComponentName},
      layoutName: '${layoutName}',
    });`;
  }

  switch (propName) {
    case 'appName':
      return appName(...args);
    case 'packageName':
      return packageName(...args);
    case 'moduleName':
      return moduleName(...args);
    case 'moduleParts':
      return moduleParts(...args);
    case 'componentName':
      return componentName(...args);
    case 'componentFileName':
      return componentFileName(...args);
    case 'componentPath':
      return componentPath(...args);
    case 'pascalModuleName':
      return pascalModuleName(...args);
    case 'camelModuleName':
      return camelModuleName(...args);
    case 'collectionName':
      return collectionName(...args);
    case 'mutationName':
      return mutationName(...args);
    case 'permissionName':
      return permissionName(...args);
    case 'vulcanDependencies':
      return vulcanDependencies(...args);
    case 'resolverName':
      return resolverName(...args);
    case 'hasResolver':
      return hasResolver(...args);
    case 'addRouteStatement':
      return addRouteStatement(...args);
    case 'raw':
      return getRaw(...args);
    default:
      return undefined;
  }
}

module.exports = {
  setup: setup,
  finalize: finalize
};