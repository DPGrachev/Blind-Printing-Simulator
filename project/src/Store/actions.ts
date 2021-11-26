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

export const onLogin = createAction(ActionType.Authorization);

export const onLogout = createAction(ActionType.UnAuthorization);

export const setUserName = createAction(
  ActionType.SetUserName,
  (userName: string) => ({
    payload: {
      userName: userName,
    },
  }),
);