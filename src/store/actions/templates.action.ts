import {ADD_TEMPLATE, DELETE_TEMPLATE, GET_TEMPLATES_LIST, SELECT_TEMPLATE} from "../types/templates.types";
import {Dispatch} from "@reduxjs/toolkit";
import fs from "fs";

export function addTemplate(name: string, tags: string[]): (dispatch: Dispatch) => void {

  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_TEMPLATE,
      payload: [{name, isSelected: true, tags}]
    })
  }
}

export function getTemplatesList(): (dispatch: Dispatch) => void {
  return async (dispatch: Dispatch) => {
    return fs.readdir('templates', (err, files) => {
      if (err) {
        console.log(err);
      } else {
        dispatch({
          type: GET_TEMPLATES_LIST,
          payload: files.map(file => ({name: file, isSelected: false, tags: []}))
        })
      }
    });
  }
}

export function selectTemplate(name: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SELECT_TEMPLATE,
      payload: [{name}]
    })
  }
}

export function deleteTemplate(name: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: DELETE_TEMPLATE,
      payload: [{name}]
    });
  };
}

export function selectByCategory(category: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'SELECT_BY_CATEGORY',
      payload: [{name: category}]
    })
  }
}

export function deselectByCategory(category: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'DESELECT_BY_CATEGORY',
      payload: [{name: category}]
    })
  }
}

export function deselectAll(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'DESELECT_ALL',
      payload: []
    })
  }
}
