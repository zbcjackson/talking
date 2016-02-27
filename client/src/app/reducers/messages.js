export default function messages(state=[], action){
  if (action.type == 'SAY'){
    return [...state, action.payload]
  }
  return state;
}