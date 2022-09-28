import {Dispatch} from "@reduxjs/toolkit";
import {ADD_CATEGORY} from "../types/categories.types";
import {toast} from "react-toastify";

export function addCategory(name: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_CATEGORY,
      payload: {name}
    })
    toast('Категория добавлена', {type: 'success'});
  }
}

export function deleteCategory(id: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'DELETE_CATEGORY',
      payload: {id}
    })
  }
}

export function addTag(id: string, name: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'ADD_TAG',
      payload: {id, tags: [{name}]}
    })
  }
}

export function deleteTag(id: string, tagId: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'DELETE_TAG',
      payload: {id, tags: [{id: tagId}]}
    })
  }
}

export function selectTag(categoryId: string, tagId: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'SELECT_TAG',
      payload: {id: categoryId, tags: [{id: tagId}]}
    })
  }
}
