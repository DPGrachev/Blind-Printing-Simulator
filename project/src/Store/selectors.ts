import { ResultTrain, State } from "../types/types";

export const getResultsTrain = (state: State): ResultTrain[] => state.results;