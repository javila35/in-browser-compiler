import * as React from "react";
import "./preview.css";

interface PreviewProps {
  /** Bundled code to execute and display */
  code: string;
}

const html = `
<html>
  <head><style>html {background-color: white}</style></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (messageEvent) => {
        try {
          eval(messageEvent.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = React.useRef<any>();

  React.useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="preview"
      />
    </div>
  );
};
