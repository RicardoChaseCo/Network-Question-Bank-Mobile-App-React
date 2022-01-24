import React, { Component } from "react";
import Loading from "@/components/Loading/Loading";
import xiaolang from '@/assets/images/home/xiaolang.png'
import books from '@/assets/images/home/books.png'
import examination from '@/assets/images/home/examination.png'
import practice from '@/assets/images/home/practice.png'
import './Home.less';
import {HomeDefaultApi} from '@/request/api'
import { connect } from "react-redux";
import {AlertMapDispatchToProps, showHideAlert} from '@/utils'
import List from '@/components/Home/List/List'

class Home extends Component {
  state = {
    showLoading: false,
    exam:{},
    // 学科题库列表
    exemItems:[],
    // 收藏题目
    collect:'',
    // 错题集
    wrong:'',
    // 已学
    study:''
  };
  render() {
    return (
      <div className="home" style={{paddingBottom: '56px'}}>
        <div className="title">
          <div className="subject">{this.state.exam.title}</div>
          <div className="testSubject">切换考试科目</div>
        </div>
        <div className="studyKu">
          <p className="welcome">欢迎使用IT猿题库！</p>
          <div className="down">
            <img src={xiaolang} alt="" />
            <div className="right">
              <div className="top">
                <span>已学{this.state.study}题</span>
                <span>|</span>
                <span>共{this.state.exam.itemCount}题</span>
              </div>
              <div className="down">
                <div className="err">
                  <div>{this.state.wrong}</div>
                  <div>错题</div>
                </div>
                <div className="shoucang">
                  <div>{this.state.collect}</div>
                  <div>收藏</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="category">
          <img src={examination} alt="" />
          <img src={books} alt="" />
          <img src={practice} alt="" />
        </div>
        <div className="tiku">
          <h3 className="subject_title">学科题库</h3>
          <span>坚持每一天，成长看得见</span>
        </div>
        <List listArr={this.state.exemItems} />
        <Loading showLoading={this.state.showLoading} />
      </div>
    );
  }
  componentDidMount() {
    let token = localStorage.getItem("x-auth-token");
    if (token) {
      // 做请求
      HomeDefaultApi().then(res=>{
        console.log(res);
        if(res.errCode===0){
          let {exam,exemItems,collect,wrong,study} = res.data;
          this.setState({
            exam:exam,
            exemItems:exemItems,
            collect:collect,
            wrong:wrong,
            study:study
          })
        }else{
          showHideAlert(this.props, {
            showAlert: true,
            alertType: "error",
            alertContent: res.message
          })
        }
      }).catch((err)=>{
        // console.log(err.response.data.errCode)
        if(err.response.data.errCode===1002){
          // 显示loading
          this.setState({
            showLoading: true,
          });
          // 跳转到登录页
          setTimeout(() => {
            this.props.history.push("/login");
          }, 1500);
        }
      })
    } else {
      // 显示loading
      this.setState({
        showLoading: true,
      });
      // 跳转到登录页
      setTimeout(() => {
        this.props.history.push("/login");
      }, 1500);
    }
  }
}

export default connect(null, AlertMapDispatchToProps)(Home)