import * as React from "react";
import { CodeEditor } from "./code-editor";
import { Preview } from "./preview";
import { Resizable } from "./resizable";
import { bundle } from "../bundler";

export const CodeCell = () => {
  const [input, setInput] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
