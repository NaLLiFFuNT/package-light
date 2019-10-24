[![npm version](https://badge.fury.io/js/package-light.svg)](//npmjs.com/package/package-light)
[![dependencies Status](https://david-dm.org/nalliffunt/package-light/status.svg)](https://david-dm.org/nalliffunt/package-light)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/nalliffunt/package-light.svg)

# Why ?

to reduce time you spent waiting your docker image is being built.

# How to use?

- Install as a dev dependency

```
npm i -d package-light
```

or

```
yarn add --dev package-light
```

- Add to your  `.gitignore` file
 
```
package-light.json
package-light-lock.json
```
 

- Add `pre` script for building docker image `npx package-light` which generate `package-light.json` and `package-light-lock.json` in case your use npm.

# Example

somewhere in your package.json
```
"scripts": {
"prebuild:docker": "npx package-light",             // generate `package-light.json` and `package-light-lock.json` (if needed)
"build:docker": "docker build -t my-image-tag .",   // your command to build docker image
}
``` 

# Dockerfile example
## npm
```
FROM node:12.13

# Install app dependencies
COPY ./package-light.json ./package.json
COPY ./package-light-lock.json ./package-lock.json
RUN npm i
## <-- this layer is cached until your dependencies change

# App source
COPY . .
# do your stuff here
```

## yarn
```
FROM node:12.13

# Install app dependencies
COPY package-light.json package.json
COPY yarn.lock ./
RUN yarn
## <-- this layer is cached until your dependencies change
# App source
COPY . .
# do your stuff here
```

This will greatly help to cache dependencies layer.
After dependencies are installed you should copy the rest files and may override package-light.json with original package.json
you may change your scripts, package version or other fields in your package json, it does not matter, dependencies layer remain unchanged.


// TODO:
- add example for react-create-app
- add example for express app
