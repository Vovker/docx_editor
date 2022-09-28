import {
  ADD_TEMPLATE, DELETE_TEMPLATE, DESELECT_ALL, DESELECT_BY_CATEGORY,
  GET_TEMPLATES_LIST, SELECT_BY_CATEGORY,
  SELECT_TEMPLATE,
  TemplatesState,
  TemplateTypes
} from "../types/templates.types";
import {ActionWithPayload} from "../types/index.types";


const initialState: TemplatesState = {
  templates: []
}

export const templatesReducer = (state = initialState, action: ActionWithPayload<TemplateTypes[]>): TemplatesState => {
  switch (action.type) {
    case ADD_TEMPLATE:
      return {
        ...state,
        templates: state.templates.find(template => template.name === action.payload[0].name) ? state.templates.map(
          template => template.name === action.payload[0].name ? {
            ...template,
            isSelected: false,
            tags: action.payload[0].tags
          } : template
        ) : [...state.templates, {
          ...action.payload[0],
          isSelected: false,
        }]
      }
    case GET_TEMPLATES_LIST:
      return {
        ...state,
        templates: action.payload
      }
    case SELECT_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map(template => template.name === action.payload[0].name ? {
          ...template,
          isSelected: !template.isSelected
        } : template)
      }
    case DELETE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter(template => template.name !== action.payload[0].name)
      }
    case SELECT_BY_CATEGORY:
      return {
        ...state,
        templates: state.templates.map(template => template.tags.includes(action.payload[0].name) ? {
          ...template,
          isSelected: true
        } : template)
      }
    case DESELECT_BY_CATEGORY:
      return {
        ...state,
        templates: state.templates.map(template => template.tags.includes(action.payload[0].name) ? {
          ...template,
          isSelected: false
        } : template)
      }
    case DESELECT_ALL:
      return {
        ...state,
        templates: state.templates.map(template => {
          return {
            ...template,
            isSelected: false
          }
        })
      }
    default:
      return state;
  }
}

