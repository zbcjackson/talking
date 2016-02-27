export default function messages(state=[], action){
  if (action.type == 'SAY'){
    return [action.payload, ...state]
  }
  return state;
}