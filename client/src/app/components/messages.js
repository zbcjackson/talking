import React from 'react'
import {List} from 'material-ui'
import Message from './message'

class Messages extends React.Component {
  render(){
    const {messages} = this.props;
    return (
      <List>
        {messages.map((message, index) => {
          return (
            <Message key={index} message={message} />          
          );
        })}
      </List>
    );
  }
}

export default Messages