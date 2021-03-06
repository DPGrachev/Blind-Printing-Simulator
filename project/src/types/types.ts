import { AuthStatus, GameMode } from "../const"

export type ResultTrain = {
  passedTime: number,
  accuracy: number,
  speedPrint: number,
}

export type State = {
  results: ResultTrain[],
  authStatus: AuthStatus,
  userName: string,
  gameMode: GameMode,
}