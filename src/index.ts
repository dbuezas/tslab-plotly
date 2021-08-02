// David Buezas

declare var Plotly: typeof import('plotly.js');

type Tslab = typeof import('tslab')

function plot(
  tslab: Tslab,
  plotfn: Function,
  data: Plotly.Data[],
  layout?: Partial<Plotly.Layout>,
  config?: Partial<Plotly.Config>
) {
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
    <div
      id="${plotId}__"
    </div>
    <script>
      if (!window.__PlotlyPromise){
        window.__PlotlyPromise = fetch('https://cdn.plot.ly/plotly-latest.min.js')
        .then(response => response.text().then(script => {
          // define = undefined so that requirejs doesn't interfere in vscode
          eval('{var define = undefined;'+script+'}');
          return window.Plotly;
        }))
      }
      {
        const plotId = "${plotId}";

        const plotContainer = document.getElementById("${plotId}")
        const countEl = document.getElementById("${plotId}__")
        window.__PlotlyPromise.then(Plotly => {
          countEl.innerText = (countEl.innerText||0)+1
            const args = ${JSON.stringify([data, layout, config])};
            (${plotfn.toString()})(plotContainer,...args)
        }).catch(e => {
          plotContainer.innerText = e.message + '\\n' + e.stack
        })

      }  
    </script>
    `;
  tslab.display.html(html);
}
const plotfn: typeof Plotly.newPlot = (container, data, layout) => {
  return Plotly.newPlot(container, data, layout);
};

const newPlot = (
  tslab: Tslab,
  data: Plotly.Data[],
  layout?: Partial<Plotly.Layout>,
  config?: Partial<Plotly.Config>
) => plot(tslab, plotfn, data, layout, config);

export default { newPlot };
