import React, { Component } from "react";
import "./List.less";
import subject from "@/assets/images/home/subject.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withRouter } from "react-router";

class List extends Component {
  render() {
    return (
      <ul className="list">
        {this.props.listArr.map((item) => (
          <li key={item.id}>
            <img src={subject} alt="" />
            <section>
              <div className="list_title" style={{lineHeight: '30px'}}>{item.title}</div>
              <div className="list_desc">{item.itemCount}/{item.itemCount}题</div>
              <LinearProgress variant="determinate" value={100} />
            </section>
            <div className="btn" onClick={this.goChoosePage.bind(this, item.actionCode)}>练习</div>
          </li>
        ))}
      </ul>
    );
  }
  // 跳转到选择题目的页面
  goChoosePage(code){
    this.props.history.push('/choose/'+code)
  }
}

export default withRouter(List)