# generator-vulcanjs

## Installing
- To run this generator, you need to have `yo` and `@storybook/cli` installed globally.
- To install all, run `npm install -g generator-vulcanjs yo @storybook/cli`
- Or, if you use yarn, run `yarn global add generator-vulcanjs yo @storybook/cli`

## Usage

- Create new app: `yo vulcanjs`
- Create new package: `yo vulcanjs:package`
- Create new module: `yo vulcanjs:module`
- Create new component: `yo vulcanjs:component`

## Issues

- React components don't get generated properly.
- `vulcanjs:remove` is not implemented yet.

## Extra

- To see redux logs, set the environment variable `VULCANJS_SEE_REDUX_LOGS` to `true`. For example:  `VULCANJS_SEE_REDUX_LOGS=true yo vulcanjs:package`
- To turn the logs off, set the same environment variable to `false`. For example: `VULCANJS_SEE_REDUX_LOGS=false yo vulcanjs:package`
