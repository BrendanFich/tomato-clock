import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistics.scss'
import Polygon from './Polygon'
import _ from 'lodash' 
import { format } from 'date-fns';

interface Props{
  todos: any[]
}

class Statistics extends Component<Props> {

  get finishedTodos(){
    return this.props.todos.filter( t => t.completed && !t.deleted)
  }

  get dailyTodos(){
    const obj = _.groupBy(this.finishedTodos, (todo)=>{
      return format(todo.updated_at, 'YYYY-MM-D')
    })
    return obj
  }

  render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
            </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics);