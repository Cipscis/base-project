# base-project

This is my base project to use when creating new projects.

## Install

You will need to install [Node.js](https://nodejs.org/en/) before using this project, because it relies on the [npm](https://www.npmjs.com/) package manager that comes bundled with Node.js

1. Click "[Use this template](https://github.com/Cipscis/base-project/generate)" to create a new repo based on this one
2. Update the `package.json` file to reflect your new project's details
3. Update the paths to assets in `index.html` to use your new project's name. See [GitHub Pages](#github-pages) for more info. You can do a global find/replace for `base-project`
4. Create a `.env` file. See [.env](#env) for more information
5. Run `npm install`

## Usage

This project creates four npm tasks:

* `server`
* `build`
* `watch`
* `start`

Usually, you will just want to run `npm start`. This will run both the `server` and `watch` tasks simultaneously.

The `server` task runs a Node.js server on the port specified in the [`.env`](#env) file, using [Express](https://expressjs.com/).

The `build` task compiles CSS files using [gulp-sass](https://www.npmjs.com/package/gulp-sass) and bundles JavaScript using [webpack-stream](https://www.npmjs.com/package/webpack-stream).

The `watch` task first runs the `build` task, then watches the relevant directories and reruns the `build` task if it sees any changes.

## Structure

### Frontend assets

Assets such as CSS and JavaScript are contained in `./assets`. In here, the contents of the `scss` folder are used to compile CSS files into the `css` folder.

The `assets/js` folder contains a `src` folder and a `dist` folder. The JavaScript files inside the `src` folder are bundled into the `dist` folder. By default, Webpack is configured to look for a single entry point at `./assets/js/src/main.js`.

### Backend assets

The Node.js server run using [Express](https://expressjs.com/) has its files inside the `./server` directory. By default, this just runs a static http server, but it can be extended to add additional functionality.

This server only runs locally, so any additional functionality will not be available on GitHub Pages.

## Configuration

### package.json

By default, the `package.json` file is configured to set the project to be of type `module`. This means NodeJS will use ES module syntax as opposed to the default CommonJS syntax, allowing the use of `import` and `export` keywords.

For more information on the differences, see [Differences between ES modules and CommonJS](https://nodejs.org/api/esm.html#esm_differences_between_es_modules_and_commonjs)

### gulpfile.js

This file tells [Gulp](https://gulpjs.com/) which files to watch and where to output compiled assets. Some configuration for JavaScript bundling is duplicated between here and [`webpack.config.js`](#webpackconfigjs)

### webpack.config.js

This file configures [Webpack](https://webpack.js.org/), telling it which entry points to use and where to output its bundled assets. Some configuration is duplicated between here and [`gulpfile.js`](#gulpfilejs)

### .env

The `.env` file contains the following environment variables:

* `PROJECT_NAME` (`string`)

If present, this is used by the local Node.js server to set up redirects for working with [GitHub Pages](#github-pages).

* `MODE` (`string 'development' | 'production'`)

This is used by Webpack to determine what optimisations to use and how to generate sourcemaps.

* `PORT` (`int`)

This is used by [Express](https://expressjs.com/) to determine which port to use when running a local Node.js server.

An example `.env` file you can use for development is:

```
PROJECT_NAME = "base-project"
MODE = "development"
PORT = "8080"
```

This file is intended to differ from environment to environment, so it is ignored by Git.

## GitHub Pages

This project is set up to use a GitHub Action every time new code is pushed to the `main` branch. This GitHub Action runs the `build` task, then deploys the contents of the `docs` directory by committing them to a `gh-pages` branch. This `gh-pages` branch should be configured to be published to GitHub Pages.

When publishing a project using [GitHub Pages](https://pages.github.com/), the project usually appears at a URL with a path, such as `https://cipscis.github.io/base-project`. This means using root relative URLs such as `/asssets/css/main.css` would work locally, but would break when the project is published on GitHub Pages.

To fix this, the local Node.js server looks for a `PROJECT_NAME` variable in your [`.env`](#env) file. If it finds one, it sets up redirects so URLs starting with `/<projectname>` can be used as though they were root relative, so they will find your assets.

By default, the `index.html` file is configured to be published to GitHub Pages under the project name `base-project`. When you use it as a base for your own project, you will need to update these URLs.

## Dependencies

### Development

These dependencies are used when working on the project locally.

* [Node.js](https://nodejs.org/en/): Runtime environment

* [npm](https://www.npmjs.com/): Package manager

* [Gulp](https://gulpjs.com/): Task runner

* [sass](https://www.npmjs.com/package/sass): Compiling CSS from [Sass](https://sass-lang.com/)

* [gulp-sass](https://www.npmjs.com/package/gulp-sass): Using the `sass` compiler with Gulp

* [webpack-stream](https://www.npmjs.com/package/webpack-stream): Using [Webpack](https://webpack.js.org/) (for JavaScript dependency management) with Gulp

* [Express](https://expressjs.com/): Running a Node.js server, accessed at `http://localhost:<PORT>`

* [Concurrently](https://www.npmjs.com/package/concurrently): Running server and development build tasks concurrently

* [dotenv](https://www.npmjs.com/package/dotenv): Reading environment variables from [`.env`](#env) file

### Deploy

These dependencies are used for deploying the project to GitHub Pages.

* [checkout](https://github.com/marketplace/actions/checkout): Used to check out the repository to a workspace so it can be built

* [Deploy to GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages): Used to deploy the project to GitHub pages once it has been built
