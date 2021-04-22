import * as React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  /** innerWidth and innerHeight manage min/max constraints value */
  const [innerHeight, setInnerHeight] = React.useState<number>(
    window.innerHeight
  );
  const [innerWidth, setInnerWidth] = React.useState<number>(window.innerWidth);
  /** width is to handle when the window is resized */
  const [width, setWidth] = React.useState<number>(window.innerWidth * 0.75);

  /** Set up listener for window resize */
  React.useEffect(() => {
    let timer: any;

    /** Callback to set height and width in state */
    const listener = () => {
      /** Debounce method for resize functionality */
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    /** Set event listener */
    window.addEventListener("resize", listener);

    /** Remove event listener on unmount */
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  /** Dynamically generate props for ResizableBox library component based on direction prop */
  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
