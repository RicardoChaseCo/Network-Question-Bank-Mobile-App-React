import React, { Component } from 'react'
import './User.less'
import head from '../../assets/images/user/avatar.png'
import collect_3 from '../../assets/images/user/collect_3.png'
import note_1 from '../../assets/images/user/note_1.png'
import examination_me from '../../assets/images/user/examination_me.png'
import data_me from '../../assets/images/user/data_me.png'
import Aboutus from '../../assets/images/user/About us.png'
import MyProfile from '../../assets/images/user/My Profile.png'
import Notice from '../../assets/images/user/Notice.png'
import { connect } from "react-redux"
import { AlertMapDispatchToProps, showHideAlert1 } from '@/utils'
class User extends Component {
  render() {
    return (
      <div>
        <div 
          className="banner" 
          onClick={()=>showHideAlert1(this.props, "error", "功能未开放！敬请期待！")}
        >
          <div className="usertxt">个人中心</div>
          <img src={head} alt="" />
          <h3>stiub</h3>
          <ul>
            <li>
              <img src={collect_3} alt="" />
              <span>23</span>
              <h4>收藏</h4>
            </li>
            <li>
              <img src={note_1} alt="" />
              <span>11</span>
              <h4>笔记</h4>
            </li>
            <li>
              <img src={examination_me} alt="" />
              <span>38</span>
              <h4>我的考试</h4>
            </li>
            <li>
              <img src={data_me} alt="" />
              <span>35</span>
              <h4>学习资料</h4>
            </li>
          </ul>
        </div>
        <ul>
          <li>
            <span href="!#" className="lastspan" onClick={() => this.props.openAlertFn("功能未开放！敬请期待！", "error")}>
              <img src={MyProfile} alt="" />
              <span className="txt">我的资料</span>
              <i className="iconfont icon-xiangyou1"></i>
            </span>
          </li>
          <li>
            <span href="!#" className="lastspan" onClick={() => this.props.openAlertFn("功能未开放！敬请期待！", "error")}>
              <img src={Notice} alt="" />
              <span className="txt">系统公告</span>
              <i className="iconfont icon-xiangyou1"></i>
            </span>
          </li>
          <li>
            <span href="!#" className="lastspan" onClick={() => this.props.openAlertFn("功能未开放！敬请期待！", "error")}>
              <img src={Aboutus} alt="" />
              <span className="txt">关于我们</span>
              <i className="iconfont icon-xiangyou1"></i>
            </span>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(null, AlertMapDispatchToProps)(User);