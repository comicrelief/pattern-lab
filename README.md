# Comic Relief Pattern Lab [![NPM version][npm-image]][npm-url] [![Build Status][concourse-image]][concourse-url]
> A Node-based project to supply Sass components and a styleguide generator.

## The idea
To have a centralised hub supply common styling across Comic Relief products. 

## Quicklinks

[Styleguide](#styleguide)

[Workflow](#import-styling-to-a-project)

[Semantic Release Process](#semantic-release-process)

[Visual Regression](#visual-regression)

## Styleguide
* generated by [kss-node](https://github.com/kss-node/kss-node)
* support twig template
* multiple entries
* view on
  - `/dist/index.html`
  - `/dist/[project_name]/index.html`

## Import styling to a project
* run `npm install @comicrelief/pattern-lab --save`
* on local scss file, add `@import '~pattern-lab';` 

  (or use `includePaths: ['node_modules']` in grunt-sass `options` configuration)
* or copy css file straight to your project 

## Contribute styling to pattern-lab
### Development workflow 
#### Get it up and running in another project
* Clone this repository to a directory at the root level of your CR dev, alongside the other project. e.g. `git clone https://github.com/comicrelief/pattern-lab ~/cr_root/pattern-lab`
* Go to the npm root level of the project you want to use it in. E.g. for payin: `cd ~/cr_root/payin/web`
* If that project has a link script, just `yarn link-patternlab`
* Or if it doesn't, `npm install npm-link-local --global` and then e.g. `npm-link-local ~/cr_root/pattern-lab`

Either of the last 2 steps creates a symlink in the other project's `node_modules`, pointing to your local copy of `pattern-lab`.

#### Make code changes
* it follows same development process: create feature branch -> commit and push changes -> create pull request for code review
* run `yarn watch` to liveload file changes
* run `yarn build` to generate all themes in the styleguide
* run `yarn build-base` to only generate the base theme in the styleguide
* run `yarn build-cr17` to only generate the cr17 theme in the styleguide
* run `yarn build-frost` to only generate the frost theme in the styleguide
* run `yarn build-payin` to only generate the payin theme in the styleguide
* run `yarn build-rnd17` to only generate the rnd17 theme in the styleguide
* run `yarn build-sr18` to only generate the sr18 theme in the styleguide

#### Dev server
* run `yarn dev-server` or `yarn watch`
* go to `http://localhost:1337` to view styleguide

## Semantic Release Process
Git commit messages are used to automatically publish a new version of npm package. To achieve this, **every commit message** should have a **type** and a **message** in the format described below.

Travis CI will run a job automatically after PR is merged and analyze all commit messages since last npm release. Then semantic-release plugin will calculate new version according to this result.

To avoid commit loops, version numbers are not committed back to `package.json`. Versions are listed on [GitHub releases](https://github.com/comicrelief/pattern-lab/releases) and used in the modified package.json [published to npm](https://www.npmjs.com/package/@comicrelief/pattern-lab).

Commit messages are expected to be in this format:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
Minimally, only `type` and `subject` is required.

### Bugfix / patch
When there are no breaking changes or no new features. When we are fixing bugs or styles.
```
fix: A bug fix
```

### Minor / Feature
When there is a new feature / functionality is added to the library
```
feat: A new feature
```

### Major / breaking change
When there is a breaking change, we need to extend our commit message and add `BREAKING CHANGE: A 
description of the change` to its body. This message can be added to any type of commit. 
Example:
```
feat: A new feature

BREAKING CHANGE: A description of the change
```

### Automating commit message format
Commitizen library is added as npm dev dependency and it can be used to generate commit messages by 
answering a few questions and skipping the ones which are not relavent.
Example workflow:
- Make code changes in your feature branch
- Run **`git add .`** to add changed files and get ready to commit
- Run **`yarn commit`**
 
This will start an interactive process to build commit message. Simply answer all questions or
press `Enter` to skip.
 
 - Repeat and follow rest of the GitHub workflow

 ## CI Pipelines
We are using Concourse CI and Travis CI to run tasks, and Netlify and Cloud Foundry to deploy pattern-lab.
When a pull request is created, it triggers a Netlify preview deployment, which is at 
```
https://deploy-preview-[PULL_REQUEST_ID]--cr-pattern-lab.netlify.com/
```
Pull request commits and merge also trigger CI visual regression tests as explained below. Output is available at
```
https://ci.services.comicrelief.com/teams/main/pipelines/pattern-lab
```

 ## Visual Regression
- We're using [BackstopJS](https://github.com/garris/BackstopJS)
- CI runs tests on pull request
- backstop.json contains configration, currently the tests check against production
```
"url": "dist/index.html",
"referenceUrl": "http://cr-pattern-lab.netlify.com/index.html",
```
- Run visual regression test locally 
```
yarn backstop-test-local
```
- View pass/fail report in http://pattern-lab-visual-regression.netlify.com/html_report/

[npm-image]: https://badge.fury.io/js/%40comicrelief%2Fpattern-lab.svg
[npm-url]: https://www.npmjs.com/package/@comicrelief/pattern-lab
[concourse-image]: https://ci.services.comicrelief.com/api/v1/teams/main/pipelines/pattern-lab/jobs/pattern-lab-test/badge
[concourse-url]: https://ci.services.comicrelief.com/teams/main/pipelines/pattern-lab
