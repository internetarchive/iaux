![Build Status](https://github.com/internetarchive/iaux-typescript-wc-template/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/internetarchive/iaux-typescript-wc-template/branch/main/graph/badge.svg?token=ZOYRJ2BV9W)](https://codecov.io/gh/internetarchive/iaux-typescript-wc-template)

# Internet Archive Typescript WebComponent Template

This is a base template for creating Typescript WebComponents. It is based off of the [Open WebComponents generator](https://open-wc.org/docs/development/generator/) with some IA-specific customizations and some development niceities.

## Usage

1. Click the "Use this Template" button in GitHub to create a new repository based on this one.
2. Clone your new repo and update the things below:

### Things to update in your copy
1. Remove this section
2. Search for the strings `your-webcomponent` and `YourWebComponent` and those are most of the spots that need to be updated.
3. `README.md` (this file). Update the readme in general, but also the badge URLs
4. `package.json` Update the name and description
5. Rename the `your-webcomponent.ts` and its associated `.test` file

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

### Add Codecov
- after forking, add your repo to the authorized codecov list: `https://github.com/organizations/internetarchive/settings/installations/1268216`
- then, go to the badge maker page for your repo: `https://app.codecov.io/gh/internetarchive/<repo-name>/settings/badge`
- copy link & paste into top of README.md

## Steps to setup `gh-pages` static site generator

Let's start with creating a `gh-pages` branch.

This branch is where Github will look for the `index.html` to be hosted

```
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push origin gh-pages
```

### Additional setup 

- Go to repo `Settings` -> sidebar `Pages` 
- In the `Source` drop-down, choose the branch where you want to host your Github Pages and the `directory` where it was hosted
  - We'll use `gh-pages` branch for this but you can use other branch name for this
  - Just make sure that's the branch where the `index.html` that you want to host lives in

<p align="center">
  <img src="screenshot/gh-pages-settings.png" alt="Github Pages Settings" style="height:720px; width:890px;">
</p>

## Manual Deploy using `gh-pages`

You can update the current Github Page without pushing a commit by running:
```
yarn run ghpages:publish
```

This build script does the following, see `package.json`:
- `ghpages:publish` 
  - This executes `ghpages:prepare` in the current branch you are currently working on
    - Note: The branch name is required so that it will not override the whole Github Pages directory 
  - You can check it by navigating through the branch name files directory you set from the [step to setup `gh-pages` branch](#steps-to-setup-gh-pages)
    - You can checkout how it looks like in one of our projects here: [https://github.com/internetarchive/iaux-collection-browser/tree/gh-pages](https://github.com/internetarchive/iaux-collection-browser/tree/gh-pages)
 
- `ghpages:prepare` 
  - This executes `ghpages:build` that builds the project dependencies and generates `vite` build from it
  - We use [vite](https://vitejs.dev/) to bundle and generate the static assets that we host in Github Pages
    - See `vite.config.ts` related to this

- `ghpages:generate`
  - This executes `gh-pages` [npm package](https://www.npmjs.com/package/gh-pages) command to publish/upload the generated files from our `vite` build files
  - Upon executing this command:
    - This generates a commit message formatted from the most recent commit message of the branch
    - Push the commit to `gh-pages` branch that we setup earlier

The live demo app URL from current branch will look something like this: 
`https://<organization_name_or_username>.github.io/<repo_name>/<branch_name>/demo`

## Automatic Deploy of Demo App

Things that trigger automatic site generation:
- a merge to `main`
  - See workflow: `gh-pages-main.yml`
  - Example: `https://<organization_name_or_username>.github.io/<repo_name>/main`

- a pull request against `main`
  - See workflow: `pr-preview.yml`
    - The URL for your Pull Request will be deleted after merging to main but you can update that in the config
  - When you create a Pull Request, if your code passes codecov unit tests, it will be always served live at base URL/pull request number. 
  - Example: `https://<organization_name_or_username>.github.io/<repo_name>/pr/<pr-number>/demo`
    - Note that `demo` is another directory where the `index.html` lives in
    - You are free to playaround with it and set your desired file directory/structure on your end

Another thing to note: pushing a branch up alone will not trigger site creation. 

Happy devving ^_^ 🥳  🎉 
