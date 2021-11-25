import { createReducer } from "@reduxjs/toolkit"
import { State } from "../types/types"
import { setResults } from "./actions"


const initialState: State = {
  results: [],
}

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(setResults, (state, action) => {
      state.results.push(action.payload.resultTrain);
    })
})