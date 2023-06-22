[![npm](https://img.shields.io/npm/v/@deep-foundation/firebase-push-notification.svg)](https://www.npmjs.com/package/<PACKAGE_NAME>) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/<PACKAGE_NAME>) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

## Installation and setup

### Automatically

```bash
npx @deep-foundation/create-typescript-npm-package@latest --package-name="<PACKAGE_NAME>" --directory="<DIRECTORY>" --description="Provides links for having ability to notify devices by using firebase. Also provides library" --repository-url="https://github.com/deep-foundation/firebase-push-notification"
```
Note: change placeholders (`<>`) to your values

### Manually
- Replace `<PACKAGE_NAME>` in files to your package name
- Replace `<DESCRIPTION>` in files to your package description
- Replace `<REPOSITORY_URL>` in files to your package repository url

## Usage

Export anything you want to let users of your package use your package programatically by using Javascript.  
Use `npm run npm-pull` to pull data from npm. This should be used as often as possible because you or your teammate could have published a new version of the package by using deep's `npm-packager` package  and you can overwrite those changes if you do not pull them before  
Use  `npm run npm-release [NEW_VERSION]` to release new version. If you do not pass argument the version will be patched. Note that this script does not publish your package because github action will publish your package when you push your changes after using this command
