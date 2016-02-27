export default function messages(state=[], action){
  if (action.type == 'RECEIVE_MESSAGE' || action.type == 'SEND_MESSAGE_SUCCESS'){
    return [...state, action.payload.message]
  }
  if (action.type == 'LOAD_MESSAGES'){
    return [...state, ...action.payload.messages.reverse()]
  }
  return state;
}