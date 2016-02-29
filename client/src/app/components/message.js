import React from 'react'
import {Avatar, ListItem} from 'material-ui'

class Message extends React.Component {
  sentByMe() {
    return false;
  }
  render(){
    const {message} = this.props;
    if(this.sentByMe()){
      return (
        <ListItem rightAvatar={<Avatar src={message.avatar} />}>
          <span style={{display: 'inline-block', float: 'right', marginRight: 10}}>{message.content}</span>
        </ListItem>
      )  
    }
    else{
      return (
        <ListItem leftAvatar={<Avatar src={message.avatar} />}>
          <span>{message.content}</span>
        </ListItem>
      )
    }
    
  }
}

export default Message