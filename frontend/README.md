# vue-app-starter
a vue app starter to quickly start any project at Anagraph

## prerequisite

### NODE + NPM VERSION
* As of right now we're experiencing diffuclties making this code compatible with node v16+, so ensure that you have:
  * maximum node version: `v14.19.3`
  * maximum npm version: `6.14.17`
### add github token to access private github packages
* Go into your github profile/settings/developer settings, and create a personal access token with the following permissions;
  * delete:packages, repo, workflow, write:packages
  * copy the access token as you won't be able to access it raw ever again.
* create an `~/.npmrc` if it doesn't already exist. (notice the ~ indicating your home user folder)
* add the following lines:
    ```
    @anagraph:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken={{ TOKEN YOU JUST COPIED }}
    ```
## start a new project
- clone this repo
- remove .git folder and run ```git init ``` to start a new one
- change package.json name
- change this README.md file
- see example/* branches to find inspiration

## add authentication
you will need a firebase project for authentication (could be one used for app hosting, but not necessary)
in firebase > project settings, create a firebase app, type : web
take the content of firebaseConfig variable, and put it in ```src/config.js```
set ```VUE_APP_AUTH_ENABLED=1``` in ```.env```  file
go to ```router/index.js``` and set private routes
## add private tile
set ```VUE_APP_PROTECTED_TILES_URL``` with the base url of protected tiles
add corresponding layers (see commented examples)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
