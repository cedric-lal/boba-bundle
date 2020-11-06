###Boba bundle

Boba bundle is an application that let you know the impact of adding an NPM package to your bundle.
It bundle a the package with all its dependencies in order to let you know the real size impact of adding it to your project.\

Boba bundle also provides information about the size of previous versions of the package.

1. [ Description. ](#desc)
2. [ Usage tips. ](#usage)

<p align="center">
    <img src="https://cdn.rawgit.com/pastelsky/bundlephobia/bundlephobia/client/assets/site-logo.svg" alt="" width="290" height="235" />
</p>
<p align="center">
  <a href="https://travis-ci.org/pastelsky/bundlephobia"><img src="https://img.shields.io/travis/pastelsky/bundlephobia/bundlephobia.svg" /></a>
  <img src="https://img.shields.io/npm/v/package-build-stats.svg" />
  <img src="https://img.shields.io/npm/l/package-build-stats.svg" />
</p>
<p align="center">
  <a href="https://bundlephobia.com"> bundlephobia.com </a> <br />
</p>
<p align="center">
  Know the performance impact of including an npm package in your app's bundle.
</p>

<a name="desc"></a>

## 1. Description

Note that the contextAPI could have been used in order to simply story the state of the application. Redux has been use only as a technical demonstration.

Backend:

- better error management

- need a cache and a database

- For a better user experience, the application will always compare the latest package version with 3 other versions including at least 1 major version

Limitiation of the backend:

Some package cannot be bundle because webpack is missing a loader or because of some specific package error

Front end: short end;

- mock are duplicated
