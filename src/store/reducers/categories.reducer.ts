import {CategoriesState, CategoryTypes} from "../types/categories.types";
import {ActionWithPayload} from "../types/index.types";

const initialState: CategoriesState = {
  categories: [],
}

export const categoriesReducer = (state = initialState, action: ActionWithPayload<CategoryTypes>): CategoriesState => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, {...action.payload, tags: [], id: Date.now().toString()}]
      }
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload.id)
      }
    case 'ADD_TAG':
      return {
        ...state,
        categories: state.categories.map(category => category.id === action.payload.id ? {
          ...category,
          tags: [...category.tags, {...action.payload.tags[0], id: Date.now().toString(), isSelected: false}]
        } : category)
      }
    case 'DELETE_TAG':
      return {
        ...state,
        categories: state.categories.map(category => category.id === action.payload.id ? {
          ...category,
          tags: category.tags.filter(tag => tag.id !== action.payload.tags[0].id)
        } : category)
      }
    case 'SELECT_TAG':
      return {
        ...state,
        categories: state.categories.map(category => category.id === action.payload.id ? {
          ...category,
          tags: category.tags.map(tag => tag.id === action.payload.tags[0].id ? {
            ...tag,
            isSelected: !tag.isSelected
          } : tag)
        } : category)
      }
    default:
      return state;
  }
}
