// David Buezas

// type Plotly = typeof import("plotly.js");
type Tslab = typeof import("tslab");

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
        async function runPlotlyScript(){
          if (!window.Plotly){
            const define = window.define
            window.define = undefined // avoid plotly thinking it is in a requirejs environment (vscode)
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('id', 'plotly-lib-bundle');
            script.setAttribute('src', 'https://cdn.plot.ly/plotly-latest.min.js');
            const loadPlotly = new Promise((resolve, reject)=>{
              script.onload = resolve;
              script.onerror = reject;
            })
            document.head.appendChild(script);
            loadPlotly.catch().then(() => {
              window.define = define;
            });
            await loadPlotly;
          }
          try {
            if (!window.Plotly){
              throw new Error("Couldn't load Plotly from CDN");
            }
            const plotContainer = document.getElementById("${plotId}")
            const args = ${JSON.stringify([data, layout, config])};
            window.Plotly.newPlot(plotContainer,...args)
          } catch (e){
            plotContainer.innerText = e.message + '\\n' + e.stack
          }
        }  
        runPlotlyScript();
      </script>
    `;
    tslab.display.html(html);
}

export default { newPlot };
