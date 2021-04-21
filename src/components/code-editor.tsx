import * as React from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";
import "./code-editor.css";
import "./syntax.css";

interface CodeEditorProps {
  /** String the code editor will load with */
  initialValue: string;
  /** Callback to set the code in state */
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editorRef = React.useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    /** The following code overwrites error logging while a user is typing and the code is invalid. */
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  /** Callback to format code inside editor using prettier */
  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };

  // TODO Set theme based on media query
  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="500px"
        language="javascript"
        theme="dark"
        options={{
          automaticLayout: true,
          folding: false,
          fontSize: 16,
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          showUnused: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
};
