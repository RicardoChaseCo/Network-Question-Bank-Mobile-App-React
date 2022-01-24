import React, { Component } from "react";
import "./Choose.less";
import Goback from "@/components/Goback/Goback";
import { ChoosePageApi } from "@/request/api";
import {AlertMapDispatchToProps, showHideAlert1} from '@/utils'
import { connect } from "react-redux";

class Choose extends Component {
  state = {
    // 全部 未做 已做
    testType: "all",
    // 题目类型的数组
    timuArr: [],
    // 题目类型数组的当前项
    timuActive: "all",
    // 试题分类数组
    shitiArr: [
      {key: "all", cn: "全部"},
      {key: "err", cn: "错误"},
      {key: "done", cn: "已做"},
      {key: "notdone", cn: "没做"}
    ],
    // 试题分类当前项
    shitiActive: "all",
    // 试题数量
    numArr: [5, 10, 20, 30, 50, 100],
    // 试题数量当前项
    numActive: 5
  };
  // 给出提示，该功能暂未开放
  goToExam(){
    // showHideAlert(this.props, {
    //   showAlert: true,
    //   alertType: "warning",
    //   alertContent: "该功能暂未开放"
    // })

    showHideAlert1(this.props, "warning", "该功能暂未开放")
  }
  goToPracticePage(){
    this.props.history.push({
      pathname: '/practice',
      state: {
        testNum: this.state.numActive,
        testType: this.state.shitiActive,
        actionCode: this.props.match.params.code,
        questionType: this.state.timuActive
      }
    })
  }
  render() {
    return (
      <div className="choose">
        <div className="top_btns">
          <div className="top_btn1" onClick={this.goToPracticePage.bind(this)}>进入练习模式</div>
          <div className="top_btn2" onClick={this.goToExam.bind(this)}>进入考试模式</div>
        </div>
        <div className="mytitle">试题分类</div>
        <ul className="tabs">
          {
            this.state.shitiArr.map((item, index)=>(
              <li 
                key={index} 
                className={this.state.shitiActive===item.key ? 'active' : ''}
                onClick={()=>this.setState({shitiActive: item.key})}
              >{item.cn}</li>
            ))
          }
        </ul>
        <div className="mytitle">题目类型</div>
        <ul className="tabs">
          {
            // forEach没有返回值
            this.state.timuArr.map((item, index)=>{
              return <li 
                key={index} 
                className={this.state.timuActive===item.key ? 'active' : ''}
                onClick={()=>this.setState({timuActive: item.key})}
              >{item.cn} ({item.value})</li>
            })
          }
        </ul>
        <div className="mytitle">做题数量</div>
        <ul className="tabs">
        {
            this.state.numArr.map((item, index)=>(
              <li 
                key={index} 
                className={this.state.numActive===item ? 'active' : ''}
                onClick={()=>this.setState({numActive: item})}
              >{item}</li>
            ))
          }
        </ul>
        <Goback />
      </div>
    );
  }
  componentDidMount() {
    let actionCode = this.props.match.params.code;

    ChoosePageApi({
      testType: this.state.testType,
      actionCode,
    }).then((res) => {
      if (res.errCode === 0) {
        let newArr = JSON.parse(JSON.stringify(res.data));
        newArr.forEach((item) => {
          switch (item.key) {
            case "all":
              item.cn = "全部";
              break;
            case "qa":
              item.cn = "问答";
              break;
            case "code":
              item.cn = "编程";
              break;
            case "one":
              item.cn = "单选";
              break;
            case "check":
              item.cn = "判断";
              break;
            case "many":
              item.cn = "多选";
              break;
            case "fill":
              item.cn = "填空";
              break;
            default:
              break;
          }
        });
        this.setState({timuArr: newArr});
      }
    });
  }
}


export default connect(null, AlertMapDispatchToProps)(Choose)