import merge from 'lodash/object/merge'

export default function messages(state=[], action){
  if (action.type == 'SAY'){
    return [action.payload, ...state]
  }

}