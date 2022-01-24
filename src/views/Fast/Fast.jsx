import React, { Component } from 'react'
import subject from "@/assets/images/home/subject.png"
import "./Fast.less"
import { FastAnswerApi } from "@/request/api"

export default class Fast extends Component {
    state = {
        fastArr: []
    }
    render() {
        return (
            <div className="fast" style={{paddingBottom: '56px'}}>
                <ul>
                    {
                        this.state.fastArr.map((item) => (
                            <li key={item.id}>
                                <img src={subject} alt="" />
                                <h3>{item.title}</h3>
                                <div>刷题</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
    componentDidMount() {
        FastAnswerApi().then(res => {
            if (res.errCode === 0) {
                this.setState({
                    fastArr: res.data.records
                })
                console.log(res);
            }
        })
    }
}
