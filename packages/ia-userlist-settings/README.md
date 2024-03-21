# Profile Page Userlist Settiings Component
This is component being used on /details/@user?tab=lists page where are allowing user to create new lists and add any item there.

## Usage
```html
<iaux-userlist-settings
  .userList=${{
    id: 'hello', // id should provided while edit list
    list_name: 'my first list',
    description: 'my first list description',
    is_private: true,
  }}
  .baseAPIUrl=${'https://archive.org/services/users'}
  @listModalClosed=${() => {
    this.modalManager.closeModal();
  }}
  @userListSaved=${(e: CustomEvent) => {
    console.log(e.detail);
    this.modalManager.closeModal();
  }}
  @userListError=${(e: CustomEvent) => {
    console.log(e);
  }}
></iaux-userlist-settings>
```

## Properties
```html
userList: { type: Object }, // { id: 'list-id', list_name: 'your list name', description: 'list description', is_private: bool }
baseAPIUrl: { type: String }, // api URL for user lists
```

## CustomEvents
```html
@listModalClosed // dispatch when modal is closed
@userListSaving // dispatch when list is saving
@userListSaved // dispatch list is saved successfully
@userListError // dispatch when an error occured while saving list
```

## Local Demo with `web-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
yarn run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
yarn run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```
```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```
```bash
yarn run format:prettier
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
