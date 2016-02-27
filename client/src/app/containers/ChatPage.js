import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Messages from '../components/messages'
import Say from '../components/say'
import * as ChatActions from '../actions/chat';

class ChatPage extends React.Component {
  render() {
    const {messages, say} = this.props;
    return (
      <div>
        <Messages messages={messages} />
        <Say onSubmit={say}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChatActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage)
