import * as React from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { fetchPlugin, unpkgPathPlugin } from "./tools";

const App = () => {
  const [input, setInput] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const ref = React.useRef<any>();
  const iframe = React.useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  React.useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
			<html>
				<head></head>
				<body>
					<div id="root"></div>
					<script>
						window.addEventListener("message", (messageEvent) => {
							try {
								eval(messageEvent.data);
							} catch (err) {
								const root = document.querySelector("#root");
								root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
								console.error(err);
							}
						}, false)
					</script>
				</body>
			</html>
		`;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe sandbox="allow-scripts" srcDoc={html} ref={iframe} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
