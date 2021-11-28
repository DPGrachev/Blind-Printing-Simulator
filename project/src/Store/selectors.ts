import { AuthStatus, GameMode } from "../const";
import { ResultTrain, State } from "../types/types";

export const getResultsTrain = (state: State): ResultTrain[] => state.results;

export const getAuthStatus = (state: State): AuthStatus => state.authStatus;

export const getUserName = (state: State): string => state.userName;

export const getGameMode = (state: State): GameMode => state.gameMode;