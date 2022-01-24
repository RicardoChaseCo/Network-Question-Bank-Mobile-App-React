import React, { Component } from 'react'
import { withRouter } from 'react-router'
import "./Goback.less"

class Goback extends Component {
  render() {
    return <div className="goback" onClick={this.gobackFn.bind(this)}>返回上一页</div>
  }
  gobackFn(){
    this.props.history.goBack();
  }
}

export default withRouter(Goback)