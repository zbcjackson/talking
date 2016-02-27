import React from 'react'

class Say extends React.Component{
  submit(){
    var content = this.refs.content.getValue();
    this.props.onSubmit(content);
  }
  render(){
    return (
      <div>
        <TextField ref='content' />
        <RaisedButton label='发送' primary={true} onTouchTap={() => this.submit()} />
      </div>
    );
  }
}