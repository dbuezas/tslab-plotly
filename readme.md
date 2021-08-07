# tslab-plotly

Plotly.js plots in typescript Jupyter Notebooks!

Also works in [Notebooks inside VSCode](https://code.visualstudio.com/docs/datascience/jupyter-notebooks).

And the plots are interactive, checkout the [example in notebook viewer](https://nbviewer.jupyter.org/github/dbuezas/tslab-plotly/blob/master/example/notebook.ipynb)

## installation

`npm i tslab-plotly`

## Usage

```typescript
import Plotly from "tslab-plot";
import * as tslab from "tslab";

Plotly.newPlot(tslab, [
  {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
  },
]);
```

![alt text](https://github.com/dbuezas/tslab-plotly/blob/master/screenshot.png "Screenshot")

## API

The API exposed is exactly the same as that of [plotly.js](https://plotly.com/javascript/), except that the first argument is `tslab` instead of the id of the HTML container element.

See example plots in [https://plotly.com/javascript/](https://plotly.com/javascript/).

## Requirements

Obviously [node](https://nodejs.org/), [npm](https://www.npmjs.com/) and [typescript](https://www.npmjs.com/package/typescript).
And the Jupyter lab environment:

#### Option 1

- [Jupyter lab](https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html)
- [TSLab](https://github.com/yunabe/tslab)

#### Option 2

- [vscode](https://code.visualstudio.com/)
- [typescript-notebook extension](https://github.com/DonJayamanne/typescript-notebook)

#### Option 3

- [Jupyter lab](https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html)
- [TSLab](https://github.com/yunabe/tslab)
- [vscode](https://code.visualstudio.com/)
- [vscode-jupyter extension](https://github.com/Microsoft/vscode-jupyter)

## How it works

This library uses tslab.display.html to inject:

- The DIV container for the plot
- A script tag that fetches plotly.js from a CDN
- Passess all the plot parameters to it in JSON format.
