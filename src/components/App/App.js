// React
import React from "react"

// Components
import Header from "../Header/Header"
import Task from "../Task/Task"

// Libraries
import DatePicker from "react-datepicker"
import moment from 'moment'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// CSS
import 'react-datepicker/dist/react-datepicker.css'


// Sort tasks by date
function compare(a, b) {
  if (a.taskDate < b.taskDate)
    return -1;
  if (a.taskDate > b.taskDate)
    return 1;
  return 0;
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      inputValue: "",
      taskId: 0,
      startDate: moment(),
    }
    this.handleChange = this.handleChange.bind(this)
    this.state.taskList.sort(compare)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  componentWillMount() {
    const localStorageTaskList = JSON.parse(localStorage.getItem("taskList"))
    const localStorageObjectID = JSON.parse(localStorage.getItem("taskId"))
    if (localStorageTaskList) {
      this.setState({ taskList: localStorageTaskList })
      this.setState({ taskId: localStorageObjectID })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const taskListString = JSON.stringify(nextState.taskList)
    localStorage.setItem("taskList", taskListString)
    localStorage.setItem("taskId", (this.state.taskId + 1))
  }

  addTask(event) {
    event.preventDefault()
    this.setState({ taskId: (this.state.taskId + 1) })
    const taskDate = event.target.querySelector(".input--date").value

    const newTask = {
      taskTitle: this.state.inputValue,
      taskId: this.state.taskId,
      taskDate: taskDate,
    }

    const updatedTaskList = [...this.state.taskList]
    updatedTaskList.push(newTask)
    this.setState({ taskList: updatedTaskList, inputValue: "" })
  }

  removeTask(event, task) {
    event.target.parentElement.classList.add("animate", "bounce")
    const updatedTaskList = this.state.taskList.filter(item => item.taskId !== task.taskId)
    this.setState({ taskList: updatedTaskList })
  }

  updateInputValue(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    this.state.taskList.sort(compare)
    return (
      <div id="wrapperGlobal">
        <Header />
        <section id="task">
          <div className="task__wrapper">
            <form onSubmit={(event) => this.addTask(event)} className="task__form">
              <input
                type="text"
                value={this.state.inputValue}
                placeholder="What should I do next?"
                required
                onChange={(event) => this.updateInputValue(event)}
                className="input--task-title"
                />
              <DatePicker selected={this.state.startDate} onChange={this.handleChange} className="input--date" />
              <button type="submit" className="task__button">
                <i className="fas fa-plus"></i>
              </button>
            </form>
            <div className="task__list">
              {this.state.taskList.map(task => (
                <Task task={task} onClick={(event) => this.removeTask(event, task)} />
                // <div className="task" key={task.taskId} onClick={(event) => this.removeTask(event, task)}>
                //   <span className="task__title">
                //     {task.taskTitle}
                //   </span>
                //   <span className="task__date">
                //     <DisplayTaskDate taskDate={task.taskDate} />
                //   </span>
                //   <span className="task__mark">
                //     <p><i className="fas fa-check"></i></p>
                //   </span>
                // </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default App;
