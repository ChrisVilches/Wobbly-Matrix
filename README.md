# Wobbly matrix

[![Netlify Status](https://api.netlify.com/api/v1/badges/220699b2-33e8-41ea-aab0-0cf7befd2a47/deploy-status)](https://app.netlify.com/sites/wobbly-matrix/deploys)

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

[Live demo](https://wobbly-matrix.netlify.app/)

## What is this?

A geometric algorithm inspired by Ubuntu's wobbly windows.

## How to use

Clone repository, then execute:

```
npm install
npm run dev
```

This starts the development server.

Build the production distribution with:

```
npm run build
```

## Future work

### UI Configuration

As of now, the matrix cannot be configured from the UI.

For now, the matrix (size, speed of movement, etc) can only be configured from the source code by modifying the file:

`src/config/default-grid-config.json`

### Image mapping

Map the matrix to an image and perform transformations to make the image wobble.

For example: https://open.gl/transformations
