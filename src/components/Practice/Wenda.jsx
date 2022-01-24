import React, { Component } from "react";
import {SubmitApi} from '@/request/api'
import {showHideAlert1, AlertMapDispatchToProps} from "@/utils"
import { connect } from "react-redux";

class Wenda extends Component {
  state = {
    ifShowAnswer: false,
    answer: ""
  }
  render() {
    let timu = this.props.timu;
    return (
      <div
        className="wenda"
        style={{ display: timu.questionType === "qa" ? "block" : "none" }}
      >
        <div className="timu_title">
          <span>问答</span>
          <p>{timu.title}</p>
        </div>
        <div dangerouslySetInnerHTML={{__html: timu.content || "<div></div>"}}></div>
        <textarea className="timu_textarea" placeholder="请输入内容" value={this.state.answer} onChange={(e)=>this.setState({answer: e.target.value})}></textarea>
        <p className="timu_tips">此类型的题目暂不支持打分，按正确记分。</p>
        <div className="timu_submit" onClick={this.submitFn.bind(this, timu.id, timu.categoryCode)}>确认</div>
        <section style={{display: this.state.ifShowAnswer ? 'block' : 'none'}}>
          <div className="timu_answer">
            <span>答案：</span>
            <p dangerouslySetInnerHTML={{ __html: timu.answer || "<div></div>" }}></p>
          </div>
          <div className="timu_answer timu_analysis">
            <span>解析：</span>
            <p>{timu.analysis}</p>
          </div>
        </section>
      </div>
    );
  }
  // 提交答题内容
  submitFn(id, categoryCode){
    // if(this.state.answer.trim() !== ""){}
    SubmitApi({
      categoryCode,
      actionType: "exam_test",
      userAnswer: this.state.answer,
      actionCode: this.props.actionCode,
      id
    }).then(res=>{
      if(res.errCode===0){
        // 给出提示，提交成功
        showHideAlert1(this.props, "success", "提交成功");
        // 显示答案
        this.setState({
          ifShowAnswer: true
        })
      }
    })
  }
}

export default connect(null, AlertMapDispatchToProps)(Wenda)