import { renderToString } from 'react-dom/server';
import React from 'react';

export default (renderMe, preloadedState) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Todo App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous"-->
    </head>
    <body>
        <div id="app">${renderToString(renderMe)}</div>
        ${preloadedState ? `
            <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};</script>
            <script src="/static/bundle.js"></script>
        ` : ''}
    </body>
</html>`;
