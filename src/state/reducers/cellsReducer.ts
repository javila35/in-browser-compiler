import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    /** Update the content of a cell */
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    /** Delete a cell */
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    /** Add a cell at a specific location */
    case ActionType.INSERT_CELL_AFTER:
      /** Newly created cell */
      const cell: Cell = {
        id: randomID(),
        type: action.payload.type,
        content: "",
      };

      /** Adding cell to data object */
      state.data[cell.id] = cell;
      /** Finding the index where the cell was inserted */
      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      /** If foundIndex < 0 the new cell is the last cell */
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        /** If foundIndex > 0 place the new cell in it's appropriate order */
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    /** Move cell up or down in order */
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex > 0 || targetIndex < state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    default:
      return state;
  }
});

/** Generate a random ID with number and string values */
const randomID = () => Math.random().toString(36).substr(2, 5);

export default reducer;
