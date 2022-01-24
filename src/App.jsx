import React, { Component } from "react";
import "./App.less";
import MyAlert from "@/components/MyAlert/MyAlert";
import {withRouter} from 'react-router-dom'
import Tabbar from '@/components/Tabbar/Tabbar'

class App extends Component {
  render() {
    return (
      <div>
        <MyAlert />
        {this.props.children}
        <Tabbar />
      </div>
    );
  }
  componentDidMount(){
    if(this.props.location.pathname==="/"){
      this.props.history.replace('/home');
    }
  }
}



export default withRouter(App);
