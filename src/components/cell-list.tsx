import * as React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { CellListItem } from "./cell-list-item";
import { AddCell } from "../components";

export const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </React.Fragment>
  ));

  return (
    <div>
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};
