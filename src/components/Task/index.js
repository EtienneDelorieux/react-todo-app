// React
import React from "react"

// Libraries
import moment from "moment"

// CSS
import "./task.css"


// Display "Today" or "Tomorrow" or the date
function DisplayTaskDate(props) {
  const dateToday = moment(new Date()).format("MM/DD/YYYY")
  const dateTomorrow = moment(new Date()).add(1,'days').format("MM/DD/YYYY")

  if (props.taskDate === dateToday) {
    return "Today";
  } else if (props.taskDate === dateTomorrow) {
    return "Tomorrow";
  } else
  return props.taskDate
}

class Task extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      taskList: this.props.taskList,
    }
  }

  updateTaskList(task) {
    const updatedTaskList = this.state.taskList.filter(item => item.taskId !== task.taskId)
    this.props.onRemoveTask(updatedTaskList);
  }

  render() {
    return (
      <div className="task" key={this.props.task.taskId} onClick={() => this.updateTaskList(this.props.task)}>
        <span className="task__title">
          {this.props.task.taskTitle}
        </span>
        <span className="task__date">
          <DisplayTaskDate taskDate={this.props.task.taskDate} />
        </span>
        <span className="task__mark">
          <p><i className="fas fa-check"></i></p>
        </span>
      </div>
    )
  }
}

export default Task
