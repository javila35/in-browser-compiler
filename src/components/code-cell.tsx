import * as React from "react";
import { CodeEditor } from "./code-editor";
import { Preview } from "./preview";
import { bundle } from "../bundler";

export const CodeCell = () => {
  const [input, setInput] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue="" onChange={(value) => setInput(value)} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};
