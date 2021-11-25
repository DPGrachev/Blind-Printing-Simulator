import { createAction } from "@reduxjs/toolkit";
import { ActionType } from "../const";
import { ResultTrain } from "../types/types";


export const setResults = createAction(
  ActionType.SetResults,
  (result: ResultTrain) => ({
    payload: {
      resultTrain: result,
    },
  }),
);