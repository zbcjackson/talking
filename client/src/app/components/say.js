import React from 'react'
import {TextField, RaisedButton} from 'material-ui'

class Say extends React.Component{
  state={content: ''};
  submit(){
    var content = this.refs.content.getValue();
    this.props.onSubmit(content);
    this.setState({content: ''});
  }
  onChange(e){
    this.setState({content: e.target.value})
  }
  onKeyDown(e){
    if (e.which === 13){
      this.submit();
    }
  }
  render(){
    return (
      <div>
        <TextField ref='content' value={this.state.content} onChange={(e) => this.onChange(e)} onKeyDown={(e) => this.onKeyDown(e)}/>
        <RaisedButton label='发送' primary={true} onTouchTap={() => this.submit()} />
      </div>
    );
  }
}

export default Say