#!/usr/bin/env node

const fs = require('fs');

function omitEmpty (obj) {
    for (const key in obj) {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

const pkg = JSON.parse(fs.readFileSync('package.json').toString());
const lightPkg = omitEmpty({
    name: pkg.name,
    version: '0.0.1',
    dependencies: pkg.dependencies,
    devDependencies: pkg.devDependencies
});

fs.writeFileSync('package-light.json', JSON.stringify(lightPkg));

if (!fs.existsSync('package-lock.json')) {
    return;
}

const pkgLock = JSON.parse(fs.readFileSync('package-lock.json').toString());
const lightPkgLock = omitEmpty({
    ...pkgLock,
    version: '0.0.1'
});

fs.writeFileSync('package-light-lock.json', JSON.stringify(lightPkgLock));

// Yarn.lock does not require contain package version
