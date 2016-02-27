import React from 'react'
import Message from './message'

class Messages extends React.Component {
  render(){
    const {messages} = this.props;
    return (
      <div>
        {messages.map((message, index) => {
          return (
            <Message key={index} message={message} />          
          );
        })}
      </div>
    );
  }
}

export default Messages