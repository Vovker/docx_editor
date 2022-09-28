
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const ADD_TAG = 'ADD_TAG';
const DELETE_TAG = 'DELETE_TAG';
const SELECT_TAG = 'SELECT_TAG';

export {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_TAG,
  DELETE_TAG,
  SELECT_TAG
}

export type CategoryTypes = {
  id: string;
  name: string;
  tags: TagsTypes[];
}

export type TagsTypes = {
  id: string;
  name: string;
  isSelected: boolean;
}

export type CategoriesState = {
  categories: CategoryTypes[];
}
