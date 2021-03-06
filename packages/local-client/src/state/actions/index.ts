import { ActionType } from "../action-types";
import { Cell, CellTypes, CellDirections } from "../cell";

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  /** ID of cell to delete */
  payload: string;
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionType.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: CellDirections;
  };
}

export interface SaveCellsErrorAction {
  type: ActionType.SAVE_CELLS_ERROR;
  payload: string;
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | BundleStartAction
  | BundleCompleteAction
  | DeleteCellAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | InsertCellAfterAction
  | MoveCellAction
  | SaveCellsErrorAction
  | UpdateCellAction;
