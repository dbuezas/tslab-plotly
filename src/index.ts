// David Buezas

type TPlotly = typeof import("plotly.js");
type Tslab = typeof import("tslab");

declare const window: {
  PlotlyPromise?: Promise<void>;
  define?: (...args: any[]) => void;
  Plotly?: TPlotly;
};

function ensurePlotly() {
  if (!window.PlotlyPromise) {
    const define = window.define;
    window.define = undefined; // avoid plotly thinking it is in a requirejs environment (vscode)
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", "plotly-lib-bundle");
    script.setAttribute("src", "https://cdn.plot.ly/plotly-latest.min.js");
    window.PlotlyPromise = new Promise((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Error loading " + script.getAttribute("src")));
  });
    document.head.appendChild(script);
    window.PlotlyPromise.catch().then(() => {
      window.define = define;
    });
  }
}

async function runPlotlyScript(
  plotId: string,
  data: Plotly.Data[],
  layout?: Partial<Plotly.Layout>,
  config?: Partial<Plotly.Config>
) {
  const plotContainer = document.getElementById(plotId)!;
  try {
    await window.PlotlyPromise
    window.Plotly!.newPlot(plotContainer, data, layout, config);
  } catch (e) {
    plotContainer.innerText = e.message + "\\n" + e.stack;
  }
}

const newPlot = (
  tslab: Tslab,
  data: Plotly.Data[],
  layout?: Partial<Plotly.Layout>,
  config?: Partial<Plotly.Config>
) => {
  layout = {
    margin: { l: 50, r: 50, b: 25, t: 50 },
    width: 600,
    height: 600,
    ...layout,
  };
  const width = layout.width;
  const height = layout.height;
  const plotId = "_plotly-dav" + Math.random().toString(36).substr(2, 9);
  const html = `
      <div
        id="${plotId}"
        style="width:${width}px;height:${height}px;">
      </div>
      <script>
      {
        ${ensurePlotly.toString()}
        ${runPlotlyScript.toString()}

        ensurePlotly();
        runPlotlyScript(...${JSON.stringify([plotId, data, layout, config])});
      }
      </script>
    `;
  tslab.display.html(html);
};

export default { newPlot };
