import React from 'react'

class Message extends React.Component {
  render(){
    const {message} = this.props;
    return (
      <div>
        <span>message.content</span>      
      </div>
    )
  }
}