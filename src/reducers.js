import {combineReducers} from "redux"
import undoable, {distinctState} from "redux-undo"

import {COMMIT_CHART, EDIT_CHART, REMOVE_CHART_PART, SET_SELECTED_KEY} from "./constants"


// Bench reducers


export const appInfo = (state = {}) => state


export const selectedKey = (state = "C", action) => {
  switch(action.type) {
    case SET_SELECTED_KEY:
      return action.selectedKey
    default:
      return state
  }
}


// Chart reducers


export const chart = (state = {}, action) => {
  switch(action.type) {
    case REMOVE_CHART_PART:
      return action.chartSlug === state.slug ?
        {
          ...state,
          structure: [
            ...state.structure.slice(0, action.partIndexInStructure),
            ...state.structure.slice(action.partIndexInStructure + 1),
          ],
        } :
        state
    default:
      return state
  }
}

const undoableChart = (slug) => undoable(chart, {
  // debug: true,
  filter: distinctState(),
  redoType: `REDO/${slug}`,
  undoType: `UNDO/${slug}`,
})


export const charts = (state = [], action) => state.map((chart1) => undoableChart(chart1.present.slug)(chart1, action))


// Edited charts reducers


export const editedChartSlugs = (state = [], action) => {
  switch(action.type) {
    case COMMIT_CHART:
      return state.filter((chartSlug) => chartSlug !== action.chartSlug)
    case EDIT_CHART:
      return state.includes(action.chartSlug) ?
        state :
        [...state, action.chartSlug]
    default:
      return state
  }
}


// Root reducer


export const rootReducer = combineReducers({
  appInfo,
  charts,
  editedChartSlugs,
  selectedKey,
})
