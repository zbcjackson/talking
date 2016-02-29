import {SOCKET} from '../middleware/socket'
function sendMessage(content){
  return {
    [SOCKET]: {
      types: ['SEND_MESSAGE_REQUEST', 'SEND_MESSAGE_SUCCESS', 'SEND_MESSAGE_FAILURE'],
      url: '/ChatMessage',
      data: {
        content
        , name: "青山老妖" 
        , avatar:"http://sailsjs.org/images/bookCover.png"
        , source: 0
        , channelId: "12"
        , userId: "134"
        , type: 1
        , extend: JSON.stringify({})
      }
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