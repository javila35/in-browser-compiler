import * as React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { CellListItem } from "./cell-list-item";
import { AddCell } from "../components";
import { useActions } from "../hooks/use-actions";
import "./cell-list.css";

export const CellList: React.FC = () => {
  const { fetchCells, saveCells } = useActions();

  React.useEffect(() => {
    fetchCells();
  }, []);

  React.useEffect(() => {
    saveCells();
  }, []);

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
    <div className="cell-list">
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};
