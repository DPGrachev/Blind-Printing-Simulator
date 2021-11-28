import { createReducer } from "@reduxjs/toolkit"
import { AuthStatus, GameMode } from "../const"
import { State } from "../types/types"
import { onLogin, onLogout, setGameMode, setResults, setUserName } from "./actions"


const initialState: State = {
  results: [],
  authStatus: AuthStatus.NoAuth,
  userName: '',
  gameMode: GameMode.None,
}

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(setResults, (state, action) => {
      state.results.push(action.payload.resultTrain);
    })
    .addCase(onLogin,(state)=>{
      state.authStatus = AuthStatus.Auth;
    })
    .addCase(onLogout,(state)=>{
      state.authStatus = AuthStatus.NoAuth;
    })
    .addCase(setUserName, (state, action)=>{
      state.userName = action.payload.userName;
    })
    .addCase(setGameMode,(state, action)=>{
      state.gameMode = action.payload.gameMode;
    })
})