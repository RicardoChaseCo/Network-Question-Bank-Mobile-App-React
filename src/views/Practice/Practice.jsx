import React, { Component } from "react";
import AndroidOutlinedIcon from "@material-ui/icons/AndroidOutlined";
import "./Practice.less";
import Goback from "@/components/Goback/Goback";
import Wenda from '@/components/Practice/Wenda'
import Panduan from '@/components/Practice/Panduan'
import Duoxuan from '@/components/Practice/Duoxuan'
import Danxuan from '@/components/Practice/Danxuan'
import Biancheng from '@/components/Practice/Biancheng'
import Fill from '@/components/Practice/Fill'
import {GetTimuListApi} from '@/request/api'

// 手指触摸点
let startX = -1;
// 手指松开点
let endX = -1;
// 当前li的索引值
let liIndex = 0;

export default class Practice extends Component {
  state = {
    timuArr: [],
    ulLeft: 0
  };
  render() {
    return (
      <div className="Practice">
        <div className="top">
          <AndroidOutlinedIcon />
          <div className="top_index">
            <b>{Math.abs(liIndex)+1}</b>
            <span>/</span>
            <span>{this.state.timuArr.length}</span>
          </div>
        </div>
        <ul
          className="timu"
          style={{
            width: this.state.timuArr.length * 100 + "%",
            left: this.state.ulLeft,
          }}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
        >
          {this.state.timuArr.map((item, index) => (
            <li className="timu_li" key={index}>
              <Wenda timu={item} actionCode={this.props.location.state.actionCode} />
              <Biancheng timu={item} actionCode={this.props.location.state.actionCode} />
              <Fill timu={item} actionCode={this.props.location.state.actionCode} />
              <Duoxuan timu={item} actionCode={this.props.location.state.actionCode} />
              <Panduan timu={item} actionCode={this.props.location.state.actionCode} />
              <Danxuan timu={item} actionCode={this.props.location.state.actionCode} />
            </li>
          ))}
        </ul>
        <Goback />
      </div>
    );
  }
  componentDidMount(){
    // console.log(this.props.location.state)
    let obj = this.props.location.state;
    GetTimuListApi(obj).then(res=>{
      if(res.errCode===0){
        this.setState({timuArr: res.data})
      }
    })
  }
  // 手指触摸到屏幕
  handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }
  // 手指滑动
  handleTouchMove(e) {
    endX = e.touches[0].clientX;
  }
  // 手指离开屏幕
  handleTouchEnd(e){
    let _this = this;
    // 获取滑动范围
    if(startX>-1 && endX>-1){
        let distance = Math.abs(startX - endX);
        if (distance > 50) {
            // 两个手指位置距离相差50px，即视为要滑动
            if (startX > endX) {
                liIndex--;
                // index是不能超过数组长度的
                if (Math.abs(liIndex) >= _this.state.timuArr.length-1) {
                    liIndex = -_this.state.timuArr.length+1;
                }
            } else {
                liIndex++;
                if(liIndex>=0){
                    liIndex=0;
                }
            }
            this.setState({ulLeft: 100*liIndex+'%'}, ()=>{
                startX = -1;
                endX = -1;
            });
        }else{
            return;
        }
    }
}
}
