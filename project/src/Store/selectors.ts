import { AuthStatus } from "../const";
import { ResultTrain, State } from "../types/types";

export const getResultsTrain = (state: State): ResultTrain[] => state.results;

export const getAuthStatus = (state: State): AuthStatus => state.authStatus;

export const getUserName = (state: State): string => state.userName;