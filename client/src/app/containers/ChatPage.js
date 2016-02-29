import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {RaisedButton} from 'material-ui'
import Messages from '../components/messages'
import Say from '../components/say'
import * as ChatActions from '../actions/chat'

class ChatPage extends React.Component {
  render() {
    const {messages, say, pushState} = this.props;
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
