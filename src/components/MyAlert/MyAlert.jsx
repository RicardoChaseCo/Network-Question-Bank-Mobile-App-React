import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import "./MyAlert.less"
import {connect} from 'react-redux'

/* 
  error: 红色
  warning:黄色
  info:  蓝色
  success: 绿色
*/

class MyAlert extends Component {
  render() {
    return (
      <Alert style={{display: this.props.showAlert ? 'flex' : 'none'}} variant="filled" severity={this.props.alertType}>{this.props.alertContent}</Alert>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showAlert: state.showAlert,
    alertType: state.alertType,
    alertContent: state.alertContent
  }
}

export default connect(mapStateToProps, null)(MyAlert)