# Why

to reduce time you spent waiting your docker image is beign built.

# How to use?

install as a dev dependency

`npm i -d package-light`

or

`yarn add --dev package-light`

add `package-light.json` to  `.git-ignore`

add `pre` script for building docker image 
`npx package-light` which generate `package-light.json`

# Example

somewhere in your package.json
```
"scripts": {
"prebuild:docker": "npx package-light",
"postbuild:docker": "docker build -t my-image-tag .",
}
``` 

# Inside Dockerfile

instead of copying `package.json` your should copy  `package-light.json` then install dependencies. This will greatly help to cache dependencies layer.
after dependencies is installed you should copy the rest files & may override package-light.json with original package.json


// TODO:
- provide example of docker file
- with yarn
- with package-lock
- add example to folder
