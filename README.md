# Introduction

[![npm version](https://img.shields.io/npm/v/@r3ps4j/i18next-cfx-backend.svg?style=flat-square)](https://www.npmjs.com/package/@r3ps4j/i18next-cfx-backend)

This is a i18next backend plugin for FXServer. It will load resources from the files of the invoking resource using the `LoadResourceFile` native.

# Getting started

Install the package via npm.

```
npm install @r3ps4j/i18next-cfx-backend
```

To make use of the package, import it and load the backend as a module using `i18next.use`:

```js
import i18next from "i18next";
import Backend from "@r3ps4j/i18next-cfx-backend";

i18next.use(Backend).init(i18nextOptions);
```

## Detector options

```js
{
    // Path where resources get loaded from
    // Defaults to "/locales/{{lng}}/{{ns}}.json"
    loadPath: "/locales/{{lng}}/{{ns}}.json",
}
```

Options can be passed in by setting `options.backend` in `i18next.init`:

```js
import i18next from "i18next";
import Backend from "@r3ps4j/i18next-cfx-backend";

i18next.use(Backend).init({
    backend: options,
});
```
