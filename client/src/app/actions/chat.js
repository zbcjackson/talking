import {SOCKET} from '../middleware/socket'
function sendMessage(content){
  return {
    [SOCKET]: {
      types: ['SEND_MESSAGE_REQUEST', 'SEND_MESSAGE_SUCCESS', 'SEND_MESSAGE_FAILURE'],
      url: '/ChatMessage',
      data: {content}
    }
  }

}

export function say(content){
  return (dispatch, getState) => {
    dispatch(sendMessage(content))
  }
}

export function receiveMessage(message){
  return {type: "RECEIVE_MESSAGE", payload: {message}}
}

export function loadMessages(messages){
  return {type: "LOAD_MESSAGES", payload: {messages}}
}